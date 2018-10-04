var gulp = require('gulp');
var runElectron = require('gulp-run-electron')
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var minifyJS = require('gulp-minify')
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();
var del = require('del')

const paths = {
  javascripts: {
    src: 'src/javascripts/*.js',
    dest: 'build/javascripts/'
  },
  stylesheets: {
    src: 'src/stylesheets/*.scss',
    dest: 'build/stylesheets/'
  },
  templates: {
    src: 'src/templates/*.pug',
    dest: 'build/templates/'
  }
}

const clean = () => del(['build']);

function js() {
  return gulp.src(paths.javascripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.javascripts.dest))
    .pipe(minifyJS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.javascripts.dest))
}

function html() {
  return gulp.src(paths.templates.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.templates.dest))
}

function css() {
  return gulp.src(paths.stylesheets.src)
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.stylesheets.src))
}

function reload(done) {
  browserSync.reload()
  done()
}

function serve(done) {
  browserSync.init({
    localOnly: true
  });
  done();
}

function run_electron() {
  gulp.src('.').pipe(runElectron([], {}));
}

function clean_for_build() {
  gulp.src(paths.templates.dest + 'index.html')
  .pipe(replace('<script async id="__bs_script__" src="http://localhost:3000/browser-sync/browser-sync-client.js?v=2.24.7"></script>',''))
  .pipe(gulp.dest(paths.templates.dest));

}

const watch = () => {
  gulp.watch(paths.javascripts.src, gulp.series(js, reload))
  gulp.watch(paths.stylesheets.src, gulp.series(css, reload))
  gulp.watch(paths.templates.src, gulp.series(html, reload))
}

const pre_build = gulp.series(clean, js, css, html, serve);

const dev = gulp.parallel(pre_build, run_electron, watch)
const build = gulp.parallel(pre_build, run_electron)

gulp.task('watch', dev)
gulp.task('default', build)