const openAboutWindow = require("about-window").default;
const path = require("path");

const appInfo = require("../../package.json");

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
    // role: 'windowMenu'
    submenu: [
      { role: "minimize" },
      { role: "close" },
      // { label: "Reload Window", accelerator: "CmdOrCtrl+R", click: reload },
      {
        label: "Toggle Full Screen",
        accelerator: "CmdOrCtrl+F",
        role: "toggleFullScreen",
      },
      // { label: "Minimize", accelerator: "CmdOrCtrl+M", role: 'minimize' },
      // { label: "Close Window", accelerator: "CmdOrCtrl+W", role: 'close' }
    ],
  },
  {
    label: "Edit",
    role: "editMenu",
    // submenu: [
    //   { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
    //   { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
    //   { type: "separator" },
    //   { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
    //   { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
    //   { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
    //   { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    // ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Toggle Dark Mode",
        accelerator: 'CmdOrCtrl+T',
        click: () => {

        }
      },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { role: "resetZoom" }
    ],
  },
];

module.exports = { template };
