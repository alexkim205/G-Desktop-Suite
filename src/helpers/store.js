const Store = require("electron-store");

const schema = {
  theme: {
    type: "string",
    enum: ["auto", "light", "dark"],
    default: "auto",
  },
  openLinkInBrowser: {
    type: "boolean",
    default: true,
  },
};

module.exports = new Store({ schema });
