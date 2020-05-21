const Store = require("electron-storage");

const createStore = () => {
  // Default is light theme.
  return new Store({ theme: "light" });
};

module.exports = { createStore };
