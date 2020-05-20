const { ipcRenderer, remote } = require("electron");
const path = require("path");
const fs = require("file-system");

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
const darkCssPath = path.join(__dirname, "../stylesheets/dark-base.css");
const currentWindow = remote.getCurrentWindow();
let cssKey;

const setOSTheme = async () => {
  // Fetch correct theme
  let OSTheme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  window.localStorage.os_theme = OSTheme;
  let userTheme = window.localStorage.user_theme;
  let defaultTheme = "light";
  let changeToTheme = userTheme || OSTheme || defaultTheme;

  if (changeToTheme === "dark") {
    // insert dark stylesheet
    cssKey = await currentWindow.webContents.insertCSS(
      fs.readFileSync(path.join(darkCssPath), "utf8")
    );
  } else {
    // remove dark stylesheet
    currentWindow.webContents.removeInsertedCSS(cssKey);
  }
};

nativeTheme.on("updated", function theThemeHasChanged() {
  setOSTheme();
});

window.addEventListener("DOMContentLoaded", (event) => {
  setOSTheme();
});
