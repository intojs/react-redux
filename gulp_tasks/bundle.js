'use strict';

module.exports = function(opts) {

    var gulp = require('gulp'),
        plumber = require('gulp-plumber'),
        sourcemaps = require('gulp-sourcemaps'),
        gulpJspm = require('gulp-jspm');

    gulp.task('bundle', function(callback) {
        
        return gulp.src(opts.src, { base: 'src'})
            // by default, gulp would pick 'src/app' as the base,
            // so we need to set it explicitly
            .pipe(plumber({
                handleError: function(err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(sourcemaps.init())
            .pipe(gulpJspm({
                selfExecutingBundle: true,
                minify: true
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(opts.dest));
    });
};