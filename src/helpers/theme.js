const { webContents, nativeTheme } = require("electron");

const store = require("./store");
const {
  CONSTANTS: { THEME_OPTIONS, USER_PREF_KEYS },
} = require("./util");

// Select which theme to change to
const selectTheme = () => {
  const userTheme = store.get(USER_PREF_KEYS.THEME);
  const OSTheme = nativeTheme.shouldUseDarkColors
    ? THEME_OPTIONS.DARK
    : THEME_OPTIONS.LIGHT;

  // If theme is auto, select os theme.
  // Else theme is manually selected, choose user's selection
  return userTheme === THEME_OPTIONS.AUTO ? OSTheme : userTheme;
};

const setThemeOnAllWindows = () => {
  const toThemeStyle = selectTheme();
  // Send to all webcontents at once. This triggers an appwide theme change.
  const allWebContents = webContents.getAllWebContents();
  Promise.all(allWebContents.map((wc) => wc.send("theme-reply", toThemeStyle)));
};

module.exports = { selectTheme, setThemeOnAllWindows };
