const Store = require("electron-store");

const createStore = () => {
  // Default is light theme.
  return new Store({ theme: "light" });
};

module.exports = { createStore };
