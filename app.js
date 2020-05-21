// Modules to control application life and create native browser window
const {
  BrowserWindow,
  webContents,
  ipcMain,
  nativeTheme,
  app,
} = require("electron");

const createStore = require("./src/helpers/store");
const config = require("./src/helpers/config");
const {
  CONSTANTS: { OS_PLATFORMS, THEME_OPTIONS },
} = require("./src/helpers/util");
const { createMainWindow } = require("./src/js/mainwindow");

// Create store only once in app root.
let store = createStore();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, view;
let childwin, childview;

// Select which theme to change to
const selectTheme = () => {
  const userTheme = store.get("theme");
  const OSTheme = nativeTheme.shouldUseDarkColors
    ? THEME_OPTIONS.DARK
    : THEME_OPTIONS.LIGHT;

  // If theme is auto, select os theme.
  // Else theme is manually selected, choose user's selection
  return userTheme === THEME_OPTIONS.AUTO ? OSTheme : userTheme;
};

// Listen for theme requests from windows to set theme
ipcMain.on("theme-request", function (_, webContentsId) {
  const toThemeStyle = selectTheme();
  webContents.fromId(webContentsId).send("theme-reply", toThemeStyle);
});

// Listen for changes in native os theme to set theme
nativeTheme.on("updated", () => {
  // Don't change theme if not set to auto.
  if (store.get("theme") !== THEME_OPTIONS.AUTO) {
    return;
  }
  const toThemeStyle = selectTheme();
  // Send to all webcontents at once. This triggers an appwide theme change.
  const allWebContents = webContents.getAllWebContents();
  Promise.all(allWebContents.map((wc) => wc.send("theme-reply", toThemeStyle)));
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (config.osPlatform !== OS_PLATFORMS.MAC_OS) app.quit();
});

// Make store accessible for easy access in other files.
module.exports = { store };
