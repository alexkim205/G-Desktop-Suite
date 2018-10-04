var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function(){
  return gulp.src('client/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/templates'))
});

gulp.task('css', function(){
  return gulp.src('client/stylesheets/*.sass')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/stylesheets'))
});

gulp.task('js', function(){
  return gulp.src('client/javascripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/javascripts'))
});

gulp.task('build', gulp.series([ 'css', 'js', 'html' ]))