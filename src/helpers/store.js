const Store = require("electron-store");

module.exports = () => {
  const schema = {
    theme: {
      type: "string",
      enum: ["auto", "light", "dark"],
      default: "auto",
    },
  };

  return new Store({ schema });
};
