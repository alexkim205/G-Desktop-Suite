const { ipcRenderer, remote } = require("electron");
const path = require("path");

const { setOSTheme } = require("../helpers/theme");

const currentWindow = remote.getCurrentWindow();

if (!window.chrome) {
  window.chrome = {};
}

/* Title reply and request */
currentWindow.webContents.on("did-finish-load", () => {
  const titleBar = document.getElementById("titlebar");

  // Receive title from child preload view
  ipcRenderer.on("title-reply", function (_, title) {
    console.log("got title reply, setting title", title);
    titleBar.innerHTML = title;
  });

  ipcRenderer.send("title-request");
});

/* Theme reply and request */
currentWindow.webContents.on("did-finish-load", () => {
  ipcRenderer.on("theme-reply", function (_, toThemeStyle) {
    setOSTheme(toThemeStyle);
  });

  ipcRenderer.send("theme-request", currentWindow.webContents.id);
});
