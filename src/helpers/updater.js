const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

// Send update info to main window.
autoUpdater.on("update-available", () => {
  console.log("update avaliable");
  dialog.showMessageBox(
    {
      type: "info",
      title: "Found Updates",
      message: "Found updates, do you want update now?",
      buttons: ["Sure", "No"],
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater.enabled = true;
        updater = null;
      }
    }
  );
});
// autoUpdater.on("update-not-available", () => {
//   console.log("update not avaliable");
//   dialog.showMessageBox({
//     title: "No Updates",
//     message: "Current version is up-to-date.",
//   });
//   updater.enabled = true;
//   updater = null;
// });

autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox(
    {
      title: "Install Updates",
      message: "Updates downloaded, application will quit for an update...",
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  );
});

const checkForUpdates = () => {
  autoUpdater.checkForUpdates();
};

module.exports = { checkForUpdates };
