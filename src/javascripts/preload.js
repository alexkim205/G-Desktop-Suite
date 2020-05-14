const { ipcRenderer } = require("electron");

if (!window.chrome) {
  window.chrome = {};
}

window.addEventListener("DOMContentLoaded", (event) => {
  const titleBar = document.getElementById("titlebar");

  ipcRenderer.send("title-request");

  ipcRenderer.on("title-reply", function (event, title) {
    titleBar.innerHTML = title;
  });
});
