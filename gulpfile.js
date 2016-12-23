'use strict';

var gulp = require('gulp');
var processhtml = require('gulp-processhtml');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('html', function () {
    var opts = { /* plugin options */ };
    return gulp.src('./index.html')
               .pipe(processhtml(opts))
               .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('css', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist'));
});


gulp.task('LibsJS', function() {
  var srcFiles = [
    './lib/angular/angular.js',
    './lib/angular-ui-router/release/angular-ui-router.js',
    './lib/angular-aria/angular-aria.js',
    './lib/angular-animate/angular-animate.js',
    './lib/angular-messages/angular-messages.js',
    './lib/angular-material/angular-material.js',
    './lib/ngstorage/ngStorage.js',
    './lib/angular-material-sidemenu/dest/angular-material-sidemenu.js',
    ];
  return gulp.src(srcFiles)
    .pipe(concat('concat.js'))
    .pipe(uglify())
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('AppJS', function() {
  return gulp.src('./js/**/*.js')
    .pipe(concat('concat.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./dist/'));
});

// define tasks here
gulp.task('default', ['LibsJS', 'AppJS', 'css','html']);