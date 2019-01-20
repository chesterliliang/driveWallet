var gulp = require('gulp');
var removeCode = require('gulp-remove-code');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var copy = require('gulp-copy');

gulp.task('clean:tmp', function(cb) {
  del.sync(['./app/dist/**/*', './dist/**/*', './tmp/**/*']);

  cb();
});

gulp.task('clean:mac', function() {
  return gulp
    .src('./src/**/*.js')
    .pipe(
      removeCode({
        production: true,
        win: false,
        consoleShow: process.env.ELECTRON_CONSOLE === 'true',
      })
    )
    .pipe(gulp.dest('./tmp'));
});

gulp.task('clean:win', function() {
  return gulp
    .src('./src/**/*.js')
    .pipe(
      removeCode({
        production: true,
        mac: false,
        consoleShow: process.env.ELECTRON_CONSOLE === 'true',
      })
    )
    .pipe(gulp.dest('./tmp'));
});

gulp.task('copy-res', function() {
  return gulp
    .src(['./src/**/*', '!./src/**/*.js'])
    .pipe(copy('./tmp', { prefix: 1 }));
});

gulp.task('prepare:mac', gulpSequence('clean:tmp', 'clean:mac', 'copy-res'));
gulp.task('prepare:win', gulpSequence('clean:tmp', 'clean:win', 'copy-res'));
