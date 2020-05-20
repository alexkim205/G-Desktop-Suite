const path = require("path");

const darkCssPath = path.join(__dirname, "../../stylesheets/dark-base.css");

class Theme {
    constructor() {
        if (!Theme.default) {
            Theme.default = this;
        }

        return Theme.default;
    }

    toggleDarkMode = () => {
        if (this.darkModeTurnedOn) {

        } else {

        }
    }

    turnOffDarkMode = () => {

    }

    turnOnDarkMode = () => {

    }

    updateCssKey = (cssKey) => {
        
    }
}

const theme = new Theme();

export default theme;