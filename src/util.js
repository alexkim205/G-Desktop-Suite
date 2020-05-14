const fs = require("file-system");

const TITLE_BAR_HEIGHT = 20;

// const injectCSS = () => {
//   fs.readFile(`${__dirname}/stylesheets/base.css`, "utf-8", function (
//     error,
//     data
//   ) {
//     if (!error) {
//       var formattedData = data.replace(/\s{2,10}/g, " ").trim();
//       win.webContents.insertCSS(formattedData);
//     }
//   });
// };

module.exports = { TITLE_BAR_HEIGHT };
