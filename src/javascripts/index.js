const {
  remote
} = require('electron')

const {
  Menu,
  BrowserWindow
} = remote

const url = require('url')

const thisWindow = remote.getCurrentWindow()

const template = [{
    label: 'Google Drive',
    submenu: [{
      label: 'System Preferences',
      click() {
        require('electron').shell.openExternal('https://electronjs.org')
      }
    }]
  }

]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

dimensions = thisWindow.webContents.getOwnerBrowserWindow().getBounds()

// $('body').height(dimensions.height)

console.log(dimensions)

const $webview = $('webview')

function createWindow(e) {

  console.log(e)
  goToURL = e.originalEvent.url

  e.preventDefault()

  childwin = new BrowserWindow({
    width: 1300,
    height: 900,
    titleBarStyle: 'hidden',
    minWidth: 1200,
    minHeight: 600,
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

  childwin.webContents.openDevTools()

  childwin.on('closed', () => {
    childwin = null
  })
}

$webview.on('new-window', createWindow);

//file:///Users/alexkim/Dropbox/Developer/ElectronJS/google_drive/build/templatesindex.html?url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1wqW2e1PWLJ50bx-pOHsgu_aTxoknfDZMCeT8W23Crw8%2Fedit%3Fusp%3Ddrive_web%26ouid%3D100197594438859105289