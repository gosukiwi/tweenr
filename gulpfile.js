'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

// Rerun the task when a file changes
gulp.task('watch', function() {
  browserSync({
    server: {
      baseDir: ['src']
    }
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
