// Use frameless title shift only on MacOS.Use os specific titlebar for other OS's.

const TITLE_BAR_HEIGHT = process.platform === "darwin" ? 20 : 0;

module.exports = { TITLE_BAR_HEIGHT };
