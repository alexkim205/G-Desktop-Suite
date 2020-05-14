const { screen, BrowserView, BrowserWindow, Menu } = require("electron");
const windowState = require("electron-window-state");
const electronLocalshortcut = require("electron-localshortcut");
const path = require("path");

const { signInURL, userAgent } = require("../config");
const { TITLE_BAR_HEIGHT } = require("../util");
const { createChildWindow } = require("./childwindow");
var { template } = require("./menu");

var createMainWindow = () => {
  // Get information about the screen size.
  const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
  // Load the previous state with fall-back to defaults
  const mainWindowState = windowState({
    defaultWidth: workAreaSize.width - 200,
    defaultHeight: workAreaSize.height - 100,
  });

  // Create the browser window.
  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 300,
    minHeight: 300,
    backgroundColor: "#FFF",
    titleBarStyle: "hidden",
    center: true,
    scrollBounce: false,
  });

  /**
   * Let us register listeners on the window, so we can update the state
   * automatically (the listeners will be removed when the window is closed)
   * and restore the maximized or full screen state
   */
  mainWindowState.manage(win);

  // Load template containing title bar
  win.loadFile(path.join(__dirname, "../templates/index.html"));

  windowSettings = {
    url: signInURL,
  };

  // Create the browser window.
  /**
   * Google requires a supported browser for oauth sign in's. I can use
   * the setUserAgent() function or app.userAgentFallback to trick
   * Google's Oauth servers into thinking that the electron window is
   * Chrome.
   * https://pragli.com/blog/how-to-authenticate-with-google-in-electron/
   * https://stackoverflow.com/questions/35672602/how-to-set-electron-useragent
   *
   */
  // win.loadURL(windowSettings.url, { userAgent });
  let view = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  win.setBrowserView(view);
  view.setBounds({
    x: 0,
    y: TITLE_BAR_HEIGHT,
    width: mainWindowState.width,
    height: mainWindowState.height - TITLE_BAR_HEIGHT,
  });
  view.setAutoResize({
    width: true,
    height: true,
  });
  view.webContents.loadURL(windowSettings.url, { userAgent });

  view.webContents.on("before-input-event", (event, input) => {
    // For example, only enable application menu keyboard shortcuts when
    // Ctrl/Cmd are down.
    console.log(event, input);
  });

  // Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  view.once("ready-to-show", () => {
    win.show();
    view.focus();
  });

  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }

  win.on("close", (e) => {
    if (BrowserWindow.getAllWindows().length > 1) {
      e.preventDefault();
    }
  });

  // Emitted when the window is closed.
  win.on("closed", () => {
    win = null;
    view = null;
  });

  // On new window, create child window
  view.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options) => {
      createChildWindow(event, url, frameName, disposition, {
        ...options,
        pos: win.getPosition(),
        size: win.getSize(),
      });
    }
  );

  electronLocalshortcut.register(view, ["CmdOrCtrl+R", "F5"], () => {
    // No reload API for browserview yet.
    view.webContents.loadURL(windowSettings.url, { userAgent });
  });

  // win.webContents.openDevTools();
};

module.exports = { createMainWindow: createMainWindow };
