
"use strict";

var gulp = require('gulp'),
    path = require('path'),
    data = require('gulp-data'),
    pug = require('gulp-pug'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    bourbon = require('node-bourbon');

var paths = {
  public: './public/',
  sass: './dev/sass/',
  css: './public/css/',
  data: './dev/_data/'
};

gulp.task('pug', function () {
  return gulp.src('./dev/*.pug')
    .pipe(data(function (file) {
      return require(paths.data + path.basename(file.path) + '.json');
    }))
    .pipe(pug({
       pretty: true
    }))
    .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(gulp.dest(paths.public));
});

gulp.task('rebuild', ['pug'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'pug'], function () {
  browserSync({
    server: {
      baseDir: paths.public
    },
    notify: false
  });
});

gulp.task('sass', function () {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass({
      includePaths: ['paths.sass'],
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('images', function() {
    return gulp.src('dev/images/**/*') 
        .pipe(gulp.dest('public/images/')); 
});
gulp.task('js', function() {
    return gulp.src('dev/js/**/*') 
        .pipe(gulp.dest('public/js/')); 
});
gulp.task('fonts', function() {
    return gulp.src('dev/fonts/**/*') 
        .pipe(gulp.dest('public/fonts/')); 
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']);
  gulp.watch('./dev/**/*.pug', ['rebuild']);
});


gulp.task('build', ['sass', 'pug', 'images','js','fonts']);

gulp.task('default', ['browser-sync', 'watch','images','js','fonts']);
