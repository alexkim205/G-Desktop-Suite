const { ipcRenderer, remote } = require("electron");
const path = require("path");

const { setOSTheme } = require("../helpers/theme");

const currentWindow = remote.getCurrentWindow();

if (!window.chrome) {
  window.chrome = {};
}

// Receive title from child preload view
currentWindow.webContents.on("did-finish-load", (e) => {
  const titleBar = document.getElementById("titlebar");

  ipcRenderer.on("title-reply", function (event, title) {
    titleBar.innerHTML = title;
  });

  ipcRenderer.send("title-request");
});

// const { nativeTheme } = remote;
// const currentWindow = remote.getCurrentWindow();

// nativeTheme.on("updated", () => {
//   setOSTheme();
// });

// // renderer process gets current theme from main process.

// currentWindow.webContents.on("did-finish-load", () => {
//   setOSTheme();
// });

// // window.addEventListener("DOMContentLoaded", (event) => {
// //   setOSTheme(currentWindow.webContents);
// // });
