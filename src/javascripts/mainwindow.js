const url = require('url')
const path = require('path')

const electron = require('electron')
const { Menu, app } = electron
const windowState = require('electron-window-state')
const electronLocalshortcut = require('electron-localshortcut');

// Menu
var { template } = require(path.join(app.getAppPath(), 'build/javascripts/menu'))

var encode_search = (json) => {
  return Object.keys(json).map(key => key + '=' + encodeURIComponent(json[key])).join('&')
}

var createMainWindow = () => {

  const workAreaSize = electron.screen.getPrimaryDisplay().workAreaSize
  // Load the previous state with fall-back to defaults
  const mainWindowState = windowState({
    defaultWidth: workAreaSize.width - 200,
    defaultHeight: workAreaSize.height - 100,
  })
  // Create the browser window.
  win = new electron.BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    minWidth: 300,
    minHeight: 300,
    scrollBounce: false,
    show: false,
    webPreferences: {
      preload: path.join(path.join(app.getAppPath(), 'build/javascripts/preload')),
    }
  })

  /**
   * Let us register listeners on the window, so we can update the state
   * automatically (the listeners will be removed when the window is closed)
   * and restore the maximized or full screen state
   */
  mainWindowState.manage(win)

  windowSettings = {
    'url': 'https://drive.google.com/drive/'
  }

  var file_url = url.format({
    protocol: 'file',
    pathname: `${electron.app.getAppPath()}/build/templates/index.html`,
    slashes: true,
    search: encode_search(windowSettings)
  })
  // log.info(encode_search(windowSettings))
  // log.info(file_url)
  win.loadURL(file_url)

  // Load main menu 
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })

  // if (process.env.NODE_ENV === "development") {
  //   win.webContents.openDevTools()
  // }

  win.on('close', (e) => {
    if (electron.BrowserWindow.getAllWindows().length > 1) {
      e.preventDefault()
    }
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })

  electronLocalshortcut.register(win, ['CmdOrCtrl+R', 'F5'], () => {
    console.log('You reloaded the page!')
    win.reload()
  });
  // electronLocalshortcut.register(win, ['CmdOrCtrl+-'], () => {
  //   console.log('You zoomed out of the page!')
  //   win
  // });
  // electronLocalshortcut.register(win, ['CmdOrCtrl+Shift+='], () => {
  //   console.log('You zoomed in to the page!')
  //   win.reload()
  // });

}

module.exports = { createMainWindow: createMainWindow }