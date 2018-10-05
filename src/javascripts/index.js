const log = require('electron-log');

require('../javascripts/menu')
const { createChildWindow } = require('../javascripts/childwindow')

// workaround for no cursor bug
const $webview = $('webview')

// $webview.on('did-navigate-in-page', () => {
//   $webview.insertCSS('* { -webkit-app-region: no-drag; }');
// })

$webview.on('new-window', createChildWindow);
