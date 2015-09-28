'use strict';

var gulp = require('gulp'),
  batch  = require('gulp-batch'),
  peg    = require('gulp-peg'),
  rename = require('gulp-rename'),
  watch  = require('gulp-watch');

gulp.task('default', function() {
  gulp.src('src/linkheader-parser.pegjs')
    .pipe(peg({exportVar: 'linkHeaderParser'}))
    .pipe(rename('linkheader-parser-browser.js'))
    .pipe(gulp.dest('dist'));
  gulp.src('src/linkheader-parser.pegjs')
    .pipe(peg({exportVar: 'module.exports'}))
    .pipe(rename('linkheader-parser-node.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.start('default');
  watch('src/**', batch(function (events, done) {
    gulp.start('default', done);
  }));
});
