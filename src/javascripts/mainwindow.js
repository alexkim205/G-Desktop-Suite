const { app, BrowserWindow} = require('electron')
const url = require('url')
// const log = require('electron-log');

var encode_search = (json) => {
  return Object.keys(json).map(key => key + '=' + encodeURIComponent(json[key])).join('&')
}

var createMainWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1300,
    height: 900,
    titleBarStyle: 'hidden',
    minWidth: 300,
    minHeight: 300,
    scrollBounce: false,
    show: false
  })

  windowSettings = {
    'url': 'https://drive.google.com/drive/'
  }

  var file_url = url.format({
    protocol: 'file',
    pathname: `${app.getAppPath()}/build/templates/index.html`,
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

  if (process.env.NODE_ENV.trim() === "development") {
    win.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })

}

module.exports = { createMainWindow: createMainWindow }