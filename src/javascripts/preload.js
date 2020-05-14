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
let currentWindow = remote.getCurrentWindow();
let currentView = currentWindow.getBrowserViews()[0];

const setOSTheme = () => {
  let OSTheme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  window.localStorage.os_theme = OSTheme;

  //
  // Defined in index.html, so undefined when launching the app.
  // Will be defined for `systemPreferences.subscribeNotification` callback.
  //

  if ("__setTheme" in window) {
    window.__setTheme();
  }
};

nativeTheme.on("updated", function theThemeHasChanged() {
  setOSTheme();
});

setOSTheme();
