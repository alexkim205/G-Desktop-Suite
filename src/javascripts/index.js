const url = require('url')
const {
  remote
} = require('electron')
const {
  BrowserWindow,
  Menu,
  app
} = remote
const thisWindow = remote.getCurrentWindow()

require('../javascripts/menu')

// workaround for no cursor bug
const $webview = $('webview')

// $webview.on('did-navigate-in-page', () => {
//   $webview.insertCSS('* { -webkit-app-region: no-drag; }');
// })

function createWindow(e) {

  console.log(e)
  goToURL = e.originalEvent.url

  e.preventDefault()

  if (goToURL === "about:blank") {
    return;
  }

  childwin = new BrowserWindow({
    width: 1300,
    height: 900,
    titleBarStyle: 'hidden',
    minWidth: 300,
    minHeight: 300,
    scrollBounce: false,
    // parent: thisWindow,
    show: false,
    // modal: false
  })

  windowSettings = {
    'url': goToURL
  }

  console.log(url.format({
    protocol: 'file',
    pathname: `${__dirname}/index.html`,
    slashes: true,
    search: Object.keys(windowSettings).map(key => key + '=' + encodeURIComponent(windowSettings[key])).join('&')
  }))
  childwin.loadURL(url.format({
    protocol: 'file',
    pathname: `${__dirname}/index.html`,
    slashes: true,
    search: Object.keys(windowSettings).map(key => key + '=' + encodeURIComponent(windowSettings[key])).join('&')
  }))

  childwin.once('ready-to-show', () => {
    childwin.show()
    childwin.focus()
  })

  if (process.env.NODE_ENV.trim() === "development") {
    childwin.webContents.openDevTools()
  }

  childwin.on('closed', () => {
    childwin = null
  })
}

$webview.on('new-window', createWindow);

//file:///Users/alexkim/Dropbox/Developer/ElectronJS/google_drive/build/templatesindex.html?url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1wqW2e1PWLJ50bx-pOHsgu_aTxoknfDZMCeT8W23Crw8%2Fedit%3Fusp%3Ddrive_web%26ouid%3D100197594438859105289