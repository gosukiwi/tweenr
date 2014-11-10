'use strict';

var gulp = require('gulp');

var less = require('gulp-less');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');

var paths = {
  less: 'src/less/**/*.less',
  lessMain: 'src/less/style.less',
  scripts: 'src/js/**/*',
  images: 'src/img/**/*.{jpg,png,gif}',
  html: 'src/*.html',
  bower: 'bower_components/**/*',
  fonts: 'src/fonts/**/*'
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    //.pipe(concat('main.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({ stream: true }));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'))
    .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    // Pass in options to the task
    .pipe(gulp.dest('dist/fonts'))
    .pipe(reload({ stream: true }));
});

gulp.task('bower', function() {
  return gulp.src(paths.bower)
    // Pass in options to the task
    .pipe(gulp.dest('dist/vendor'))
    .pipe(reload({ stream: true }));
});

gulp.task('less', function() {
  return gulp.src(paths.lessMain)
    // Pass in options to the task
    .pipe(less())
    .pipe(autoprefixer([
      'Android 2.3',
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24', // Firefox 24 is the latest ESR
      'Explorer >= 8',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6']))
    .pipe(csscomb())
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({ stream: true }));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  browserSync({
    server: {
      baseDir: 'dist'/*,
      host: '0.0.0.0'*/
    }
  });

  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.bower, ['bower']);
  gulp.watch(paths.scripts, ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'less', 'fonts', 'bower', 'html', 'scripts', 'images']);
