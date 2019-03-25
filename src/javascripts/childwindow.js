const url = require('url')
const path = require('path')
const electronLocalshortcut = require('electron-localshortcut');
const { remote } = require('electron')
const { BrowserWindow, app} = remote

// Menu
var { template } = require(path.join(app.getAppPath(), 'build/javascripts/menu'))

var encode_search = (json) => {
  return Object.keys(json).map(key => key + '=' + encodeURIComponent(json[key])).join('&')
}

var createChildWindow = function(e) {

  goToURL = e.originalEvent.url

  e.preventDefault()

  if (goToURL === "about:blank") {
    return;
  }

  childwin = new BrowserWindow({
    x: e.data.pos[0] + 20,
    y: e.data.pos[1] + 20,
    width: e.data.size[0],
    height: e.data.size[1],
    titleBarStyle: 'hidden',
    minWidth: 300,
    minHeight: 300,
    scrollBounce: false,
    show: false,
    webPreferences: {
      preload: path.join(path.join(app.getAppPath(), 'build/javascripts/preload')),
    }
  })

  windowSettings = {
    'url': goToURL
  }

  var file_url = url.format({
    protocol: 'file',
    pathname: `${app.getAppPath()}/build/templates/index.html`,
    slashes: true,
    search: encode_search(windowSettings)
  })
  console.log(file_url)
  childwin.loadURL(file_url)

  // Load main menu 

  childwin.once('ready-to-show', () => {
    childwin.show()
    childwin.focus()
  })

  // if (process.env.NODE_ENV === "development") {
  //   childwin.webContents.openDevTools()
  // }

  childwin.on('closed', () => {
    childwin = null
  })

  electronLocalshortcut.register(childwin, ['CmdOrCtrl+R', 'F5'], () => {
    console.log('You reloaded the child page!')
    childwin.reload()
  });
}

module.exports = { createChildWindow: createChildWindow }