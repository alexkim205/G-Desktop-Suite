const {
  app,
  BrowserWindow
} = require('electron')

const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createMainWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1300,
    height: 900,
    titleBarStyle: 'hidden',
    minWidth: 1200,
    minHeight: 600,
    scrollBounce: false,
    show: false
  })

  windowSettings = {
    'url': 'https://drive.google.com/drive/'
  }

  // console.log(`file://${__dirname}/build/templates/index.html`)

  // win.loadURL(`file://${__dirname}/build/templates/index.html`)

  win.loadURL(url.format({
    protocol: 'file',
    pathname: `${__dirname}/build/templates/index.html`,
    slashes: true,
    search:  Object.keys(windowSettings).map(key => key + '=' + encodeURIComponent(windowSettings[key])).join('&')
  }))

  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createMainWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createMainWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.