const { nativeTheme } = require("electron");
const openAboutWindow = require("about-window").default;

const appInfo = require("../../package.json");
const config = require("../helpers/config");
const store = require("../helpers/store");
const {
  CONSTANTS: { OS_PLATFORMS, THEME_OPTIONS },
  openUrlInBrowser,
} = require("../helpers/util");

const about = () => {
  openAboutWindow({
    product_name: appInfo.productName,
    icon_path: `${__dirname}/../../build/icon.png`,
    copyright: appInfo.copyright,
    package_json_dir: `${__dirname}/../../`,
    bug_report_url: appInfo.repository.report,
    license: appInfo.license,
    win_options: {
      titleBarStyle: "hidden",
      resizable: false,
      open_devtools: true,
    },
  });
};

const toggleDarkMode = () => {
  // Code can probably be a lot cleaner than this.
  const currentTheme = store.get("theme");
  let toTheme;

  if (currentTheme === THEME_OPTIONS.AUTO) {
    // If auto, set theme to opposite of os theme and go manual
    toTheme = nativeTheme.shouldUseDarkColors
      ? THEME_OPTIONS.LIGHT
      : THEME_OPTIONS.DARK;
  } else if (currentTheme === THEME_OPTIONS.DARK) {
    toTheme = THEME_OPTIONS.LIGHT;
  } else {
    toTheme = THEME_OPTIONS.DARK;
  }

  // Set theme store to manual, and trigger style change
  store.set("theme", toTheme);
};

const toggleOpenLinksInBrowser = () => {
  store.set("openLinksInBrowser", !store.get("openLinksInBrowser"));
}

const openAppRepoUrlInBrowser = async () => {
  openUrlInBrowser({ url: appInfo.repository.url, });
};

const template = [
  {
    label: "Application",
    submenu: [
      { label: `About ${appInfo.productName}`, click: about },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { label: "Quit", accelerator: "CmdOrCtrl+Q", role: "quit" },
    ],
  },
  {
    label: "File",
    submenu: [
      { role: "minimize" },
      { role: "close" },
      {
        label: "Toggle Full Screen",
        accelerator:
          config.osPlatform === OS_PLATFORMS.MAC_OS
            ? "Cmd+Ctrl+F"
            : "Ctrl+Alt+F",
        role: "toggleFullScreen",
      },
    ],
  },
  {
    label: "Edit",
    role: "editMenu",
  },
  {
    label: "View",
    submenu: [
      { role: "zoomIn" },
      { role: "zoomOut" },
      { role: "resetZoom" },
      { type: "separator" },
      {
        label: "Toggle Dark Mode",
        accelerator: "CmdOrCtrl+T",
        click: toggleDarkMode,
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      {
        label: "Open links in browser",
        type: 'checkbox',
        click: toggleOpenLinksInBrowser,
        checked: store.get("openLinksInBrowser")
      },
      ...(config.osPlatform === OS_PLATFORMS.MAC_OS
        ? [{ role: "front" }]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: openAppRepoUrlInBrowser,
      },
    ],
  },
];

if (config.isDev) {
  template.push({
    label: "Debug",
    submenu: [
      {
        label: "Print All Windows",
        accelerator: "CmdOrCtrl+P",
        // click: print_windows,
      },
    ],
  });
}

module.exports = { template };
