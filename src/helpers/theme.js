const DarkReader = require("darkreader");

// const { store } = require("../../app");
const { CONSTANTS } = require("./util");

const { THEME_OPTIONS } = CONSTANTS;

// Set OS theme. This script will be run in the respective
// document contexts provided by preload.js.
const setOSTheme = async (toThemeStyle) => {
  DarkReader.setFetchMethod(window.fetch);

  if (toThemeStyle === THEME_OPTIONS.DARK) {
    // Enable dark theme if userTheme is dark
    DarkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 10,
    });
  } else {
    // Otherwise default to light.
    DarkReader.disable();
  }
};

const toggleDarkMode = () => {

}

module.exports = { setOSTheme, toggleDarkMode };
