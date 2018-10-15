// const log = require('electron-log');
const { getCurrentWindow } = require('electron').remote
const { createChildWindow } = require('../javascripts/childwindow')

// workaround for no cursor bug
const $webview = $('webview')
const prevWindowData = {
  pos: getCurrentWindow().getPosition(),
  size: getCurrentWindow().getSize()
}

$webview.on('new-window', prevWindowData, createChildWindow);