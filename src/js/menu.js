const openAboutWindow = require("about-window").default;
const path = require("path");

const appInfo = require("../../package.json");
const config = require("../helpers/config");
const { CONSTANTS } = require("../helpers/util");

const about = () => {
  openAboutWindow({
    product_name: appInfo.productName,
    icon_path: `${__dirname}/../../build/icon.png`,
    copyright: appInfo.copyright,
    package_json_dir: `${__dirname}/../../`,
    bug_report_url: appInfo.repository.report,
    license: appInfo.license,
    win_options: {
      titleBarStyle: "hidden",
      resizable: false,
      open_devtools: true,
    },
  });
};

const template = [
  {
    label: "Application",
    submenu: [
      { label: `About ${appInfo.productName}`, click: about },
      { type: "separator" },
      { label: "Quit", accelerator: "CmdOrCtrl+Q", role: "quit" },
    ],
  },
  {
    label: "File",
    submenu: [
      { role: "minimize" },
      { role: "close" },
      {
        label: "Toggle Full Screen",
        accelerator:
          config.osPlatform === CONSTANTS.OS_PLATFORMS.MAC_OS
            ? "Cmd+Ctrl+F"
            : "Ctrl+Alt+F",
        role: "toggleFullScreen",
      },
    ],
  },
  {
    label: "Edit",
    role: "editMenu",
  },
  {
    label: "View",
    submenu: [
      {
        label: "Toggle Dark Mode",
        accelerator: "CmdOrCtrl+T",
        click: () => {},
      },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { role: "resetZoom" },
    ],
  },
];

if (config.isDev) {
  template.push({
    label: "Debug",
    submenu: [
      {
        label: "Print All Windows",
        accelerator: "CmdOrCtrl+P",
        // click: print_windows,
      },
    ],
  });
}

module.exports = { template };
