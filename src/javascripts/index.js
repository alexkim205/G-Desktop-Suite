const log = require('electron-log');

const { createChildWindow } = require('../javascripts/childwindow')

// workaround for no cursor bug
const $webview = $('webview')

$webview.on('new-window', createChildWindow);
