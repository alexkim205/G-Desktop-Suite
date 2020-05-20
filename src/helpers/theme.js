const path = require("path");
const fs = require("file-system");
const nativeTheme = require("electron").remote.nativeTheme;

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
    cssKey = await webContents.insertCSS(
      fs.readFileSync(path.join(cssPath), "utf8")
    );
  } else {
    // remove dark stylesheet
    webContents.removeInsertedCSS(cssKey);
  }
};

module.exports = { setOSTheme };
