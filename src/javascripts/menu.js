// Replace '..' with 'about-window'
const { remote } = require('electron')
const { BrowserWindow, app, Menu } = remote
const thisWindow = remote.getCurrentWindow()

const openAboutWindow = require("about-window").default;

var about = () => {
  openAboutWindow({
    product_name: "Google Drive Electron",
    icon_path: `${__dirname}/../../static/gd.png`,
    copyright: "Copyright (c) 2018 Alex Kim",
    package_json_dir: `${__dirname}/../../`,
    license: "MIT",
    open_devtools: process.env.NODE_ENV !== "production",
    win_options: {
      titleBarStyle: "hidden"
    }
  })
}

var quit = () => {
  console.log("Closing All Windows");
  BrowserWindow.getAllWindows().forEach(window => {
    if (window.isDestroyed()) {return}
    window.close();
  });
  console.log("Quitting Application");
  app.quit();
}

var toggle_fs = () => {
  console.log("Toggling Full Screen");
  if (thisWindow.isFullScreen()) {
    thisWindow.setFullScreen(false);
  } else {
    thisWindow.setFullScreen(true);
  }
}

var minimize = () => {
  console.log("Minimizing Window");
  thisWindow.minimize();
}

var close = () => {
  console.log("Closing Window");
  thisWindow.close();
}

var reload = () => {
  console.log("Reloading Window");
  thisWindow.reload();
}

var print_windows = () => {
  console.log("Printing All Windows");
  console.log(BrowserWindow.getAllWindows())
}

var template = [{
    label: "Application",
    submenu: [
      { label: "About Google Drive Desktop", click: about },
      { type: "separator" },
      { label: "Quit", accelerator: "CmdOrCtrl+Q", click: quit }
    ]
  },
  {
    label: "File",
    submenu: [
      { label: "Toggle Full Screen", accelerator: "Cmd+Ctrl+F", click: toggle_fs },
      { label: "Minimize", accelerator: "CmdOrCtrl+M", click: minimize },
      { label: "Close Window", accelerator: "CmdOrCtrl+W", click: close },
      { label: "Reload Window", accelerator: "CmdOrCtrl+R", click: reload }
    ]
  },
  {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  }
];

if (process.env.NODE_ENV.trim() === "development") {
  template.push({
    label: "Debug",
    submenu: [
      { label: "Print All Windows", accelerator: "CmdOrCtrl+P", click: print_windows }
    ]
  })
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);