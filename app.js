const { app, Menu } = require('electron')
const log = require('electron-log');

// Menu

var { template } = require('./build/javascripts/menu')

let win

const { createMainWindow } = require('./build/javascripts/mainwindow')

log.info(createMainWindow)


app.on('ready', () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  createMainWindow()
})

app.on('window-all-closed', () => {
  log.info('Windows All Closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createMainWindow()
  }
})