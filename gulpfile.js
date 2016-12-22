'use strict';

var gulp = require('gulp');
var processhtml = require('gulp-processhtml');
var sass = require('gulp-sass');

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

// define tasks here
gulp.task('default', function(){
  // run tasks here
  // set up watch handlers here
});