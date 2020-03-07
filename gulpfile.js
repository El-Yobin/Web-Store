const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', done => {
  gulp
    .src('./sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());

  done();
});

gulp.task('serve', done => {
  browserSync.init({
    server: './'
  });

  gulp.watch('./sass/*.scss', gulp.series('sass'));
  gulp.watch('./*.html').on('change', () => {
    browserSync.reload();
    done();
  });

  gulp.watch('./*.js').on('change', () => {
    browserSync.reload();
    done();
  });

  done();
});

gulp.task('default', gulp.series('sass', 'serve'));
