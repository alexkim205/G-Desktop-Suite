![splash](static/gd_electron_logo.png)

<div style="text-align:center;">

![GitHub stars](https://img.shields.io/github/stars/alexkim205/Google-Drive-Desktop?style=social)
![GitHub forks](https://img.shields.io/github/forks/alexkim205/Google-Drive-Desktop?style=social)
![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Ftext%3DCheck%25out%25Google%25Drive%25Electron%25to%25start%25using%25Google%25Drive%25as%25a%25desktop%25app%21%25%26url%3Dhttps%253A%252F%252Fgithub.com%252Falexkim205%252FGoogle-Drive-Electron%252Ftree%252Fmaster%26hashtags%3Delectron%2Celectronjs%2Cgoogle%2Cgoogledrive)

![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/alexkim205/Google-Drive-Desktop/dev/electron?style=flat-square)
![David](https://img.shields.io/david/alexkim205/Google-Drive-Desktop?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/alexkim205/Google-Drive-Desktop?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/alexkim205/Google-Drive-Desktop?style=flat-square)

![GitHub All Releases](https://img.shields.io/github/downloads/alexkim205/Google-Drive-Desktop/total?style=flat-square)
![Platforms](https://img.shields.io/badge/platform-macos%20%7C%20windows%20%7C%20linux-lightgrey?style=flat-square)
![GitHub](https://img.shields.io/github/license/alexkim205/Google-Drive-Desktop?style=flat-square)

</div>

---

Have you ever wished you had a no-frills, word-processing desktop app dedicated to just Google Drive? Annoyed at having to click the Go to My Drive button everytime you visit [https://drive.google.com](https://drive.google.com)? Want a Microsoft Word experience for your Google Drive files? Or simply looking to separate Google Drive from the other bajillion tabs that you opened for your research paper? Look no further!

Google Drive Desktop is a desktop wrapper for Google Drive built with [ElectronJS](https://github.com/electron/electron). Give it a try, and if you like what you see, share it with your friends!

![demo](static/gd_demo.gif)

### 🌙 Dark Mode is here!

As of `v.conscious-club/0.2.0`, the app will automatically adjust to your OS's dark mode settings.

![darkmodedemo](static/gd_darkmode_demo.gif)

## 📀 Installation

Download the [latest releases](https://github.com/alexkim205/Google-Drive-Desktop/releases) for **Windows**, **Linux**, or **MacOS**. Inside the zipped folder will be an executable that can be run.

- v.conscious-club / 0.2.0
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
git clone https://github.com/alexkim205/Google-Drive-Desktop.git
cd Google-Drive-Desktop
yarn install
```

```sh
$ yarn run
yarn run v1.22.4
   - dev
      cross-env NODE_ENV=development electron .
   - package-all
      npm run package-mac && npm run package-win && npm run package-lin
   - package-lin
      electron-packager . 'Google Drive Electron' --overwrite --asar=true --platform=linux --arch=x64 --icon=static/gd.png --prune=true --out=release-builds
   - package-mac
      electron-packager . --overwrite --platform=darwin --arch=x64 --icon=static/gd.icns --prune=true --out=release-builds
   - package-win
      electron-packager . 'Google Drive Electron' --overwrite --asar=true --platform=win32 --arch=ia32 --icon=static/gd.ico --prune=true --out=release-builds --version-string.CompanyName='Alex Gyujin Kim' --version-string.FileDescription='A Google Drive desktop app made with Electron.' --version-string.ProductName='Google Drive Electron'
   - package-zip
      find ./release-builds -type d -depth 1 -exec zip -r {}.zip {} \;
   - start
      electron .
```

To build production ready applications for macos (dmg), windows (exe), and linux (sh), run `yarn package-all`.

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
