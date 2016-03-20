"use strict";

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

// Styles
gulp.task('styles', function() {
    return sass('src/css/styles.scss', { style: 'expanded', sourcemap: true })
        .pipe(autoprefixer('last 2 version, ie 9, > 10%'))
        .pipe(gulp.dest('public/dist/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: 'src/css'
        }))
        .pipe(gulp.dest('public/dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/dist/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/dist/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Vendor
gulp.task('vendor_scripts', function() {
    return gulp.src([
            'src/vendor/jquery.js',
            'src/vendor/bootstrap.js',
            'src/vendor/transition.js',
            'src/vendor/collapse.js',
            'src/vendor/angular.js',
            'src/vendor/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public/dist/scripts/vendor'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/dist/scripts/vendor'))
        .pipe(notify({ message: 'Vendor scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('public/dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
    return del(['public/dist/styles', 'public/dist/scripts', 'public/dist/scripts/vendor', 'public/dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'vendor_scripts', 'images');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/css/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/img/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in public/dist/, reload on change
    gulp.watch(['public/**']).on('change', livereload.changed);

});