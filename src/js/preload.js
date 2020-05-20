const { ipcRenderer, remote } = require("electron");
const path = require("path");

const { setOSTheme } = require("../helpers/theme");

if (!window.chrome) {
  window.chrome = {};
}

// Set titlebar name when embedded view replies to ipc request.
window.addEventListener("DOMContentLoaded", (event) => {
  const titleBar = document.getElementById("titlebar");

  ipcRenderer.send("title-request");

  ipcRenderer.on("title-reply", function (event, title) {
    titleBar.innerHTML = title;
  });
});

// https://medium.com/missive-app/make-your-electron-app-dark-mode-compatible-c23dcfdd0dfa
const darkCssPath = path.join(__dirname, "../css/dark-base.css");
// Key is used to keep track of css that is in the scope of this window.
let cssKey;

const { nativeTheme } = remote;
const currentWindow = remote.getCurrentWindow();

nativeTheme.on("updated", function theThemeHasChanged() {
  setOSTheme(currentWindow.webContents, darkCssPath);
});

window.addEventListener("DOMContentLoaded", (event) => {
  setOSTheme(currentWindow.webContents, darkCssPath);
});
