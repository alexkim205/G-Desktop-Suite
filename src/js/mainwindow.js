const { screen, BrowserView, BrowserWindow, Menu } = require("electron");
const windowState = require("electron-window-state");
const electronLocalshortcut = require("electron-localshortcut");
const path = require("path");

const { signInURL, userAgent, isDev } = require("../helpers/config");
const { TITLE_BAR_HEIGHT, openUrlInBrowser } = require("../helpers/util");
const { checkForUpdates } = require("../helpers/updater");
const { createChildWindow } = require("./childwindow");
const { template } = require("./menu");
const store = require('../helpers/store');

const createMainWindow = () => {
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
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  /**
   * Let us register listeners on the window, so we can update the state
   * automatically (the listeners will be removed when the window is closed)
   * and restore the maximized or full screen state
   */
  mainWindowState.manage(win);

  const windowSettings = {
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
      preload: path.join(__dirname, "preload-view.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.setBrowserView(view);
  view.setBounds({
    x: 0,
    // y: 800,
    y: TITLE_BAR_HEIGHT,
    width: win.getContentBounds().width,
    height: win.getContentBounds().height - TITLE_BAR_HEIGHT,
  });
  view.setAutoResize({
    width: true,
    height: true,
  });
  view.webContents.loadURL(windowSettings.url, { userAgent });

  // Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Load template containing title bar
  win.loadFile(path.join(__dirname, "../templates/index.html"));

  view.webContents.once("did-finish-load", () => {
    win.show();
    view.webContents.focus();

    // Check for updates when main window is ready
    checkForUpdates();
  });

  // On new window, create child window
  view.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options) => {
      const shouldOpenLinkInBrowser = store.get('openLinksInBrowser');

      if (shouldOpenLinkInBrowser) {
        openUrlInBrowser({ event, url });
      } else {
        createChildWindow(event, url, frameName, disposition, {
          ...options,
          pos: win.getPosition(),
          size: win.getSize(),
        });
      }
    }
  );

  win.on("close", (e) => {
    if (BrowserWindow.getAllWindows().length > 1) {
      e.preventDefault();
    }
    if (win?.webContents) {
      electronLocalshortcut.unregister(win, ["CmdOrCtrl+R", "F5"]);
    }
    if (view?.webContents) {
      electronLocalshortcut.unregister(view, ["CmdOrCtrl+R", "F5"]);
    }
  });

  // Emitted when the window is closed.
  win.on("closed", () => {
    win = null;
    view.destroy();
    view = null;
  });

  // When window is refocused, focus on webview to persist focus
  win.on("focus", () => {
    if (view?.webContents) {
      view.webContents.focus();
    }
  });

  electronLocalshortcut.register(view, ["CmdOrCtrl+R", "F5"], () => {
    // No reload API for browserview yet.
    view.webContents.loadURL(windowSettings.url, { userAgent });
  });
  electronLocalshortcut.register(win, ["CmdOrCtrl+R", "F5"], () => {
    // No reload API for browserview yet.
    view.webContents.loadURL(windowSettings.url, { userAgent });
  });

  if (isDev) {
    win.webContents.openDevTools();
    view.webContents.openDevTools();
  }
};

module.exports = { createMainWindow: createMainWindow };
