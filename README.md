![splash](static/gd_electron_logo.png)

**If you like what you see, consider buying me a [coffee](https://www.buymeacoffee.com/alexgkim) ☕.**

![GitHub stars](https://img.shields.io/github/stars/alexkim205/G-Desktop-Suite?style=social)
![GitHub forks](https://img.shields.io/github/forks/alexkim205/G-Desktop-Suite?style=social)

![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/alexkim205/G-Desktop-Suite/dev/electron?style=flat-square)
![David](https://img.shields.io/david/alexkim205/G-Desktop-Suite?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/alexkim205/G-Desktop-Suite?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/alexkim205/G-Desktop-Suite?style=flat-square)

![GitHub All Releases](https://img.shields.io/github/downloads/alexkim205/G-Desktop-Suite/total?style=flat-square)
![Platforms](https://img.shields.io/badge/platform-macos%20%7C%20windows%20%7C%20linux-lightgrey?style=flat-square)
![GitHub](https://img.shields.io/github/license/alexkim205/G-Desktop-Suite?style=flat-square)

---

Have you ever wished you had a no-frills, word-processing desktop app dedicated to just Google Drive? Annoyed at having to click the Go to My Drive button everytime you visit [https://drive.google.com](https://drive.google.com)? Want a Microsoft Word-esque experience for your Google Drive? Or simply looking to separate Google Drive from the other bajillion tabs that you opened for your research paper? Look no further!

G Desktop Suite is a desktop wrapper for Google Drive built with [ElectronJS](https://github.com/electron/electron). Give it a try, and if you like what you see, share it with your friends!

![demo](static/gd_demo.gif)

### 🌙 Dark Mode is here!

As of `v.conscious-club/0.2.0`, the app will automatically adjust to your OS's dark mode settings.

![darkmodedemo](static/gd_darkmode_demo.gif)

## 📀 Installation

### Release page

Download the [latest releases](https://github.com/alexkim205/G-Desktop-Suite/releases) for **Windows**, **Linux**, or **MacOS**.

### For MacOS/Linux users with Homebrew + Homebrew Cask

This method is highly recommended for users who want the latest release without the hassle of downloading the executable each time. Learn more about how to get [`homebrew`](https://brew.sh/) and [`homebrew-cask`](https://github.com/Homebrew/homebrew-cask).

Tap the repository URL and install the app as follows. This will install `G Desktop Suite.app` in your `Applications/` folder.

```sh
brew tap alexkim205/G-Desktop-Suite https://github.com/alexkim205/G-Desktop-Suite
brew cask install gsuite
```

Simply run `brew cask update` to get the latest version of the app.

### 🎶 Versions

- v.conscious-club / 0.2.0-0.2.1
- v.fugue-state / 0.1.0
- v.dean-town / 0.0.3
- v.funky-duck / 0.0.2
- v.aunt-leslie / 0.0.1

Version names inspired by Vulfpeck songs. They're a great band, check them out [here](https://vulfpeck.com/).

## 📸 Action Shots

![two-window](static/two-window-shot.png)

![dark-shot](static/dark-shot.png)

## ✏️ Development

To build the app locally, clone the repository, install all dependencies, and run the available npm scripts.

```sh
git clone https://github.com/alexkim205/G-Desktop-Suite.git
cd G-Desktop-Suite
yarn install
```

```sh
$ yarn run
yarn run v1.22.4
   - dev
      cross-env NODE_ENV=development electron .
   - dist
      electron-builder -mwl
   - pack
      electron-builder --dir
   - start
      electron .
```

To build production ready applications for macos (dmg), windows (exe), and linux (sh), run `yarn dist`.

🛎️ **Have suggestions?** Feel free to create an issue or make a pull request.

🤝 **Want to contribute?** Check out the `TODO.md`!

### Dependencies

- [about-window](https://ghub.io/about-window): &#39;About App&#39; window for Electron application
- [electron-localshortcut](https://ghub.io/electron-localshortcut): register/unregister a keyboard shortcut locally to a BrowserWindow instance, without using a Menu
- [electron-window-state](https://ghub.io/electron-window-state): Simple module that helps to save and restore size and position of Electron windows.
- [file-system](https://ghub.io/file-system): Strengthen the ability of file system

### Dev Dependencies

- [cross-env](https://ghub.io/cross-env): Run scripts that set and use environment variables across platforms
- [del](https://ghub.io/del): Delete files and directories
- [electron](https://ghub.io/electron): Build cross platform desktop apps with JavaScript, HTML, and CSS
- [electron-packager](https://ghub.io/electron-packager): Customize and package your Electron app with OS-specific bundles (.app, .exe, etc.) via JS or CLI

## 📜 MIT License

_Disclaimer: Not affiliated with Google._
