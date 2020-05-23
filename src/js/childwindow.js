const { screen, BrowserView, BrowserWindow } = require("electron");
const windowState = require("electron-window-state");
const electronLocalshortcut = require("electron-localshortcut");
const path = require("path");

const { isDev } = require("../helpers/config");
const {
  TITLE_BAR_HEIGHT,
  openUrlInBrowser,
  shouldOpenLinkInBrowser,
} = require("../helpers/util");

var createChildWindow = function (event, url, frameName, disposition, options) {
  event.preventDefault();

  if (url === "about:blank") {
    return;
  }

  // Get information about the screen size.
  const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
  // Load the previous state with fall-back to defaults
  const childWindowState = windowState({
    defaultWidth: workAreaSize.width - 200,
    defaultHeight: workAreaSize.height - 100,
  });

  // Create the browser window.
  // Load options defined from parent window, or set defaults
  childwin = new BrowserWindow({
    x: options.pos ? options.pos[0] + 20 : childWindowState.x,
    y: options.pos ? options.pos[1] + 20 : childWindowState.x,
    width: options.size ? options.size[0] : childWindowState.width,
    height: options.size ? options.size[1] : childWindowState.height,
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
  childWindowState.manage(childwin);

  const windowSettings = { url };

  // Create the browser window.
  let childview = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, "preload-view.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  childwin.setBrowserView(childview);
  childview.setBounds({
    x: 0,
    // y: 800,
    y: TITLE_BAR_HEIGHT,
    width: childwin.getContentBounds().width,
    height: childwin.getContentBounds().height - TITLE_BAR_HEIGHT,
  });
  childview.setAutoResize({
    width: true,
    height: true,
  });
  childview.webContents.loadURL(windowSettings.url);

  // Load template containing title bar
  childwin.loadFile(path.join(__dirname, "../templates/index.html"));

  childview.webContents.once("ready-to-show", () => {
    childwin.show();
    childview.focus();
  });

  // On new window, create another window
  childview.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options) => {
      if (shouldOpenLinkInBrowser(url)) {
        openUrlInBrowser({ event, url });
      } else {
        createChildWindow(event, url, frameName, disposition, {
          ...options,
          pos: childwin.getPosition(),
          size: childwin.getSize(),
        });
      }
    }
  );

  childwin.on("close", (e) => {
    if (childwin?.webContents) {
      electronLocalshortcut.unregister(childwin, ["CmdOrCtrl+R", "F5"]);
    }
    if (childview?.webContents) {
      electronLocalshortcut.unregister(childview, ["CmdOrCtrl+R", "F5"]);
    }
  });

  childwin.on("closed", () => {
    childwin = null;
    childview.destroy();
    childview = null;
  });

  // When window is refocused, focus on webview to persist focus
  childwin.on("focus", () => {
    if (childview?.webContents) {
      childview.webContents.focus();
    }
  });

  electronLocalshortcut.register(childview, ["CmdOrCtrl+R", "F5"], () => {
    childview.webContents.loadURL(windowSettings.url);
  });
  electronLocalshortcut.register(childwin, ["CmdOrCtrl+R", "F5"], () => {
    childview.webContents.loadURL(windowSettings.url);
  });

  if (isDev) {
    childwin.webContents.openDevTools();
    childview.webContents.openDevTools();
  }
};

module.exports = { createChildWindow: createChildWindow };
