# Google Drive Electron

This is a Google Drive desktop app made with ElectronJS.

Ever wish you didn't have to go to [https://drive.google.com](https://drive.google.com), click the blue button, and log in every single time you wanted to open and view a google document? Do you miss the good old days of solid cloudless desktop apps? Well you're in luck!

![demo](static/gdelectron_demo.gif)

## Setup & Usage

Click [here](https://github.com/alexkim205/Google-Drive-Electron/releases) to download the app for Windows, Linux, and MacOS!

## Releases

* v.funky-duck / 0.0.2
* v.aunt-leslie / 0.0.1

## Troubleshooting and Contact

### Developing and Pull Requests

To build the app locally, clone the repository, install all dependencies, and run the available npm scripts.

```sh
git clone https://github.com/alexkim205/Google-Drive-Electron.git
cd Google-Drive-Electron
npm install
```

```sh
$ npm run
Lifecycle scripts included in gdelectron:
  start
    gulp build && electron .

available via `npm run-script`:
  package-all
    npm run package-mac && npm run package-win && npm run package-lin
  package-mac
    electron-packager . --overwrite --platform=darwin --arch=x64 --icon=static/gd.icns --prune=true --out=release-builds
  package-win
    electron-packager . 'Google Drive Electron' --overwrite --asar=true --platform=win32 --arch=ia32 --icon=static/gd.ico --prune=true --out=release-builds --version-string.CompanyName='Alex Gyujin Kim' --version-string.FileDescription='A Google Drive desktop app made with Electron.' --version-string.ProductName='Google Drive Electron'
  package-lin
    electron-packager . 'Google Drive Electron' --overwrite --asar=true --platform=linux --arch=x64 --icon=static/gd.png --prune=true --out=release-builds
```

I used gulp to streamline development. Run `gulp` (default) to build and run the app on localhost. Run `gulp watch` to build and run the app on localhost with hot reloading using `browserify`.

To build production ready applications for macos (dmg), windows(exe), and linux (sh), run `npm run package-all`.

See any improvements that can be made? Feel free to submit a pull request.

### Dependencies

- [about-window](https://ghub.io/about-window): &#39;About App&#39; window for Electron application
- [jquery](https://ghub.io/jquery): JavaScript library for DOM operations

### Dev Dependencies

- [browser-sync](https://ghub.io/browser-sync): Live CSS Reload &amp; Browser Syncing
- [del](https://ghub.io/del): Delete files and folders
- [electron](https://ghub.io/electron): Build cross platform desktop apps with JavaScript, HTML, and CSS
- [electron-packager](https://ghub.io/electron-packager): Customize and package your Electron app with OS-specific bundles (.app, .exe, etc.) via JS or CLI
- [gulp](https://ghub.io/gulp): The streaming build system.
- [gulp-csso](https://ghub.io/gulp-csso): Minify CSS with CSSO.
- [gulp-minify](https://ghub.io/gulp-minify): Js minify plugin for gulp
- [gulp-pug](https://ghub.io/gulp-pug): Gulp plugin for compiling Pug templates
- [gulp-rename](https://ghub.io/gulp-rename): Rename files
- [gulp-replace](https://ghub.io/gulp-replace): A string replace plugin for gulp
- [gulp-run](https://ghub.io/gulp-run): Pipe to shell commands in gulp
- [gulp-run-electron](https://ghub.io/gulp-run-electron): Gulp plugin for starting Electron.
- [gulp-sass](https://ghub.io/gulp-sass): Gulp plugin for sass
- [gulp-sourcemaps](https://ghub.io/gulp-sourcemaps): Source map support for Gulp.js

## License

MIT
