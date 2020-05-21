const DarkReader = require("darkreader");
const { nativeTheme } = require("electron");

// const { store } = require("../../app");
const { CONSTANTS } = require("./util");

const { THEME_OPTIONS } = CONSTANTS;

const enableDark = () => {
  DarkReader.enable({
    brightness: 100,
    contrast: 90,
    sepia: 10,
  });
};

const enableLight = () => {
  DarkReader.disable();
};

// Set OS theme in specified window's or view's web contents.
const setOSTheme = async () => {
  DarkReader.setFetchMethod(window.fetch);

  const userTheme = store.get("theme");
  const OSTheme = nativeTheme.shouldUseDarkColors
    ? THEME_OPTIONS.DARK
    : THEME_OPTIONS.LIGHT;

  console.log("usertheme", userTheme, "ostheme", OSTheme);

  switch (userTheme) {
    case THEME_OPTIONS.AUTO:
      if (OSTheme === THEME_OPTIONS.DARK) {
        enableDark();
      } else {
        enableLight();
      }
      break;
    case THEME_OPTIONS.DARK:
      enableDark();
      break;
    case THEME_OPTIONS.LIGHT:
    default:
      enableLight();
      break;
  }

  // Fetch correct theme
  // let OSTheme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  // window.localStorage.os_theme = OSTheme;
  // let userTheme = window.localStorage.user_theme;
  // let defaultTheme = "light";
  // let changeToTheme = userTheme || OSTheme || defaultTheme;

  // if (changeToTheme === "dark") {
  //   // Execute dark reader script
  //   await webContents.executeJavaScript(`
  //   const DarkReader = require("darkreader")
  //   DarkReader.enable({
  //       brightness: 100,
  //       contrast: 90,
  //       sepia: 10
  //   });
  //   `);
  // } else {
  //   // remove dark style
  //   await webContents.executeJavaScript(`
  //   const DarkReader = require("darkreader")
  //   DarkReader.disable();
  //   `);
  // }
};

module.exports = { setOSTheme };
