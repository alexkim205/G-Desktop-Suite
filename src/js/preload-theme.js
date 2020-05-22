const DarkReader = require("darkreader");

const {
  CONSTANTS: { THEME_OPTIONS },
} = require("../helpers/util");

DarkReader.setFetchMethod(window.fetch);

// Save enable and disable dark theme functions in view.
const enableDark = () => {
  // Enable dark theme if userTheme is dark
  DarkReader.enable({
    brightness: 100,
    contrast: 90,
    sepia: 10,
  });
};

const enableLight = () => {
  // Otherwise default to light.
  DarkReader.disable();
};

// Set OS theme. This script will be run in the respective
// document contexts provided by preload.js.
const setOSTheme = async (toThemeStyle) => {
  if (toThemeStyle === THEME_OPTIONS.DARK) {
    enableDark();
  } else {
    enableLight();
  }
};

module.exports = { setOSTheme };
