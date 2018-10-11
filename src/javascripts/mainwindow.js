const electron = require('electron')
const url = require('url')
const windowState = require('electron-window-state')
// const log = require('electron-log');

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
    show: false
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

  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })

  // if (process.env.NODE_ENV === "development") {
  //   win.webContents.openDevTools()
  // }

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })

}

module.exports = { createMainWindow: createMainWindow }