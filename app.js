const { app } = require('electron')
const log = require('electron-log');

let win

const { createMainWindow } = require('./build/javascripts/mainwindow.js')

log.info(createMainWindow)

app.on('ready', async () => {
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
