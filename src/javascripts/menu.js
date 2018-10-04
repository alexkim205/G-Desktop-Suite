// Replace '..' with 'about-window'
const openAboutWindow = require('about-window').default;

var template = [{
    label: "Application",
    submenu: [{
        label: "About Google Drive Desktop",
        click: () => openAboutWindow({
          icon_path: `${__dirname}/../../static/gd.png`,
          copyright: 'Copyright (c) 2018 Alex Kim',
          package_json_dir: `${__dirname}/../../`,
          license: "MIT",
          open_devtools: process.env.NODE_ENV !== 'production',
          win_options: {
            titleBarStyle: 'hidden'
          }
        })
      },
      {
        type: "separator"
      },
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click: function () {
          console.log("Quitting Application")
          thisWindow.close()
          app.quit()
        }
      }
    ]
  }, {
    label: "File",
    submenu: [{
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        click: function () {
          console.log("Minimizing Window")
          thisWindow.minimize();
        }
      },
      {
        label: "Toggle Full Screen",
        accelerator: "Cmd+Ctrl+F",
        click: function () {
          console.log("Toggling Full Screen")
          if (thisWindow.isFullScreen()) {
            thisWindow.setFullScreen(false);
          } else {
            thisWindow.setFullScreen(true);
          }
        }
      },
      {
        label: "Close Window",
        accelerator: "CmdOrCtrl+W",
        click: function () {
          console.log("Closing Window")
          thisWindow.close()
        }
      }
    ]
  },
  {
    label: "Edit",
    submenu: [{
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        selector: "undo:"
      },
      {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        selector: "redo:"
      },
      {
        type: "separator"
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        selector: "cut:"
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        selector: "copy:"
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        selector: "paste:"
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:"
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)