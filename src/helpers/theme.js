const path = require("path");
const fs = require("file-system");
const { nativeTheme } = require("electron");

const { CONSTANTS } = require('./util');

const { THEME_OPTIONS } = CONSTANTS;

// Set OS theme in specified window's or view's web contents.
const setOSTheme = async (webContents, cssPath) => {
  console.log("trying to set ostheme", webContents, cssPath);
  // Fetch correct theme
  let OSTheme = nativeTheme.shouldUseDarkColors ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT;
  window.localStorage.os_theme = OSTheme;
  let userTheme = window.localStorage.user_theme;
  let defaultTheme = THEME_OPTIONS.LIGHT;
  let changeToTheme = userTheme || OSTheme || defaultTheme;

  if (changeToTheme === THEME_OPTIONS.DARK) {
    // insert dark stylesheet
    await webContents.insertCSS(
      fs.readFileSync(path.join(cssPath), "utf8")
    );
  } else {
    // remove dark stylesheet
    webContents.removeInsertedCSS(cssKey);
  }
};

const toggleDarkMode = () => {

}

module.exports = { setOSTheme, toggleDarkMode };
