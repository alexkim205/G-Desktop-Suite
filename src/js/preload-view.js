const { ipcRenderer, remote } = require("electron");
const path = require("path");

const { setOSTheme } = require("../helpers/theme");

const currentWindow = remote.getCurrentWindow();
const currentView = currentWindow.getBrowserViews()[0];

/* Title reply and request */
currentView.webContents.on("did-finish-load", () => {
  const parsedTitle = currentView.webContents.getTitle().split(" - ")[0];

  // Send page title to parent window
  const sendTitleToParent = () => {
    ipcRenderer.sendTo(currentWindow.id, "title-reply", parsedTitle);
  };

  // On title request send to parent window
  ipcRenderer.on("title-request", (e) => {
    sendTitleToParent();
  });

  // On update send title to parent window
  currentView.webContents.on("page-title-updated", (e) => {
    sendTitleToParent();
  });

  sendTitleToParent();
});

/* Theme reply and request */
currentView.webContents.on("did-finish-load", () => {
  ipcRenderer.on("theme-reply", function (_, toThemeStyle) {
    console.log("change view to ", toThemeStyle);
  });

  ipcRenderer.send("theme-request", currentView.id);
});
