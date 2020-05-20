const { remote } = require("electron");
const path = require("path");

const { setOSTheme } = require("../helpers/theme");

// https://medium.com/missive-app/make-your-electron-app-dark-mode-compatible-c23dcfdd0dfa
const darkCssPath = path.join(__dirname, "../css/dark-drive.css");
// Key is used to keep track of css that is in the scope of this window.
let cssKey;

const { nativeTheme } = remote;
const currentView = remote.getCurrentWindow().getBrowserViews()[0];

nativeTheme.on("updated", function theThemeHasChanged() {
  setOSTheme(currentView.webContents, darkCssPath);
});

window.addEventListener("DOMContentLoaded", (event) => {
  setOSTheme(currentView.webContents, darkCssPath);
});
