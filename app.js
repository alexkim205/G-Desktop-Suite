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

// Send theme to window or view,
// Pass in webcontentId of window/view you would like to send theme to.
ipcMain.on("theme-request", function (e, webContentsId) {
  const userTheme = store.get("theme");
  const OSTheme = nativeTheme.shouldUseDarkColors
    ? THEME_OPTIONS.DARK
    : THEME_OPTIONS.LIGHT;

  console.log("usertheme", userTheme, "ostheme", OSTheme);

  if (userTheme === THEME_OPTIONS.AUTO) {
    // If theme is auto, select os theme.
    webContents.fromId(webContentsId).send("theme-reply", OSTheme);
  } else {
    // If theme is manually selected, choose user's selection
    webContents.fromId(webContentsId).send("theme-reply", userTheme);
  }
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
