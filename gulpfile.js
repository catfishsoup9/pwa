const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

gulp.task('pug-compile', () => {
  return gulp.src(['app/pug/**/*.pug', '!app/pug/includes/**/*.pug', '!app/pug/mixins/**/*.pug'])
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('app/html'));
});

gulp.task('scss-compile', () => {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', () => {
  gulp.watch('app/pug/**/*.pug', gulp.series('pug-compile'));
  gulp.watch('app/scss/**/*.scss', gulp.series('scss-compile'));
});

gulp.task('default', gulp.series(gulp.parallel('pug-compile', 'scss-compile'), 'watch'));
