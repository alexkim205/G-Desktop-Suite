const { ipcRenderer, remote } = require("electron");
const path = require("path");

const { setOSTheme } = require("../helpers/theme");

// // https://medium.com/missive-app/make-your-electron-app-dark-mode-compatible-c23dcfdd0dfa
// const darkCssPath = path.join(__dirname, "../css/dark-drive.css");
// // Key is used to keep track of css that is in the scope of this window.
// let cssKey;

const currentWindow = remote.getCurrentWindow();
const currentView = currentWindow.getBrowserViews()[0];

// nativeTheme.on("updated", () => {
//   setOSTheme();
// });

currentView.webContents.on("did-finish-load", () => {
  // Send page title to parent window
  const parsedTitle = currentView.webContents.getTitle().split(" - ")[0];

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
