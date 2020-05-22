const Store = require("electron-store");

const schema = {
  theme: {
    type: "string",
    enum: ["auto", "light", "dark"],
    default: "auto",
  },
  openLinksInBrowser: {
    type: "boolean",
    default: true,
  },
};

module.exports = new Store({ schema });
