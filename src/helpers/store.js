const Store = require("electron-store");

const schema = {
  theme: {
    type: "string",
    enum: ["auto", "light", "dark"],
    default: "auto",
  },
};

module.exports = new Store({ schema });
