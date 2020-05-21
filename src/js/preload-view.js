const { ipcRenderer, remote } = require("electron");
const path = require("path");

const { setOSTheme } = require("../helpers/theme");

const currentWindow = remote.getCurrentWindow();
const currentView = currentWindow.getBrowserViews()[0];

/* Title reply and request */
window.addEventListener("DOMContentLoaded", () => {
  // Send page title to parent window
  const sendTitleToParent = (newTitle) => {
    const parsedTitle = (
      currentView.webContents.getTitle() || "Google Drive"
    ).split(" - ")[0];
    ipcRenderer.sendTo(currentWindow.webContents.id, "title-reply", parsedTitle);
  };

  // On title request send to parent window
  ipcRenderer.on("title-request", (e) => {
    sendTitleToParent(currentView.webContents.getTitle());
  });

  // On update send title to parent window
  currentView.webContents.on("page-title-updated", (e, updatedTitle) =>
    sendTitleToParent(updatedTitle)
  );

  sendTitleToParent();
});

/* Theme reply and request */
window.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.on("theme-reply", function (_, toThemeStyle) {
    setOSTheme(toThemeStyle);
  });

  ipcRenderer.send("theme-request", currentView.webContents.id);
});
