const config = require("./config");

const CONSTANTS = {
  OS_PLATFORMS: {
    MAC_OS: "darwin",
    WINDOWS: "win32",
    LINUX: "linux",
    AIX: "aix",
    FREEBSD: "freebsd",
    OPENBSD: "openbsd",
    SUN_OS: "sunos",
  },
  THEME_OPTIONS: {
    DARK: 'dark',
    LIGHT: 'light',
  },
};

// Use frameless title shift only on MacOS.Use os specific titlebar for other OS's.
const TITLE_BAR_HEIGHT =
  config.osPlatform === CONSTANTS.OS_PLATFORMS.MAC_OS ? 20 : 0;

module.exports = { TITLE_BAR_HEIGHT, CONSTANTS };
