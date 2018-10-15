const { app} = require('electron')

let win

const { createMainWindow } = require('./build/javascripts/mainwindow')

app.on('ready', () => {
  createMainWindow()
})

app.on('window-all-closed', () => {
  // log.info('Windows All Closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createMainWindow()
  }
})