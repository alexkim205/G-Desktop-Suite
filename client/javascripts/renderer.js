const $webview = $('webview')
const $loader = $('.loader')
let isInitialLoad = true

$webview.on('did-start-loading', () => {
  
  if(isInitialLoad) {
    $webview.addClass('webview-hide')
    $loader.removeClass('loader-hide')
  }
})