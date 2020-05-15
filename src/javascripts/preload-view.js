const { remote } = require("electron");
const path = require("path");
const fs = require("file-system");

// https://medium.com/missive-app/make-your-electron-app-dark-mode-compatible-c23dcfdd0dfa
const { nativeTheme } = remote;
const darkCssPath = path.join(__dirname, "../stylesheets/dark-drive.css");
let cssKey;
let currentView = remote.getCurrentWindow().getBrowserViews()[0];

const setOSTheme = async () => {
  // Fetch correct theme
  let OSTheme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  window.localStorage.os_theme = OSTheme;
  let userTheme = window.localStorage.user_theme;
  let defaultTheme = "light";
  let changeToTheme = userTheme || OSTheme || defaultTheme;

  if (changeToTheme === "dark") {
    cssKey = await currentView.webContents.insertCSS(
      fs.readFileSync(path.join(darkCssPath), "utf8")
    );
  } else {
    // remove dark stylesheet
    currentView.webContents.removeInsertedCSS(cssKey);
  }
};

nativeTheme.on("updated", function theThemeHasChanged() {
  setOSTheme();
});

window.addEventListener("DOMContentLoaded", (event) => {
  setOSTheme();
});
