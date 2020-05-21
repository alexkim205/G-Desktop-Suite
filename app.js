// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");

const createStore = require("./src/helpers/store");
const config = require("./src/helpers/config");
const { CONSTANTS } = require("./src/helpers/util");
const { createMainWindow } = require("./src/js/mainwindow");

// Create store only once in app root.
let store = createStore();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, view;
let childwin, childview;

// Send page title to window
ipcMain.on("title-request", function (e) {
  if (!win && !view) {
    return;
  }
  win.webContents.send(
    "title-reply",
    view.webContents.getTitle().split(" - ")[0]
  );
});

// Send theme to window or view, 
// Pass in webcontents of window/view you would like to send theme to.
ipcMain.on("theme-request", function (e, webContents) {
  webContents.send("theme-reply", view.webContents.getTitle().split(" - ")[0]);
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
  if (config.osPlatform !== CONSTANTS.OS_PLATFORMS.MAC_OS) app.quit();
});

// Make store accessible for easy access in other files.
module.exports = { store };
