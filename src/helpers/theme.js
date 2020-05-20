const path = require("path");
const fs = require("file-system");
const { nativeTheme } = require("electron");

// Set OS theme in specified window's or view's web contents.
const setOSTheme = async (webContents, cssPath) => {
  console.log("trying to set ostheme", webContents, cssPath);
  // Fetch correct theme
  let OSTheme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  window.localStorage.os_theme = OSTheme;
  let userTheme = window.localStorage.user_theme;
  let defaultTheme = "light";
  let changeToTheme = userTheme || OSTheme || defaultTheme;

  if (changeToTheme === "dark") {
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
