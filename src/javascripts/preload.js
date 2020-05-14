const { ipcRenderer, remote } = require("electron");

if (!window.chrome) {
  window.chrome = {};
}

window.addEventListener("DOMContentLoaded", (event) => {
  const titleBar = document.getElementById("titlebar");

  ipcRenderer.send("title-request");

  ipcRenderer.on("title-reply", function (event, title) {
    titleBar.innerHTML = title;
  });
});

// https://medium.com/missive-app/make-your-electron-app-dark-mode-compatible-c23dcfdd0dfa
const { nativeTheme } = remote;
const setOSTheme = () => {
  let OSTheme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  window.localStorage.os_theme = OSTheme;

  let userTheme = window.localStorage.user_theme;
  let defaultTheme = "light";
  let changeToTheme = userTheme || OSTheme || defaultTheme;
  console.log("PRELOAD", changeToTheme);

  const scriptToChangeTheme =
    changeToTheme === "dark"
      ? `
  const DarkReader = require("darkreader");
  console.log("todark");
  DarkReader.setFetchMethod(window.fetch);
  DarkReader.enable({
    brightness: 100,
    contrast: 90,
    sepia: 10,
    engine: "dynamicTheme",
  });
  `
      : `
  const DarkReader = require("darkreader");
  console.log("tolight");
  DarkReader.disable();
  `;

  // //
  // // Defined in index.html, so undefined when launching the app.
  // // Will be defined for `systemPreferences.subscribeNotification` callback.
  // //
  // if ("__setTheme" in window) {
  //   window.__setTheme(changeToTheme);
  // }
  let currentWindow = remote.getCurrentWindow();
  let currentView = currentWindow.getBrowserViews()[0];
  currentWindow.webContents.executeJavaScript(scriptToChangeTheme);
  currentView.webContents.executeJavaScript(scriptToChangeTheme);
};

nativeTheme.on("updated", function theThemeHasChanged() {
  setOSTheme();
});

setOSTheme();
