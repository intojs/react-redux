'use strict';

module.exports = function(opts) {

    var gulp = require('gulp'),
        useref = require('gulp-useref'),
        plumber = require('gulp-plumber'),
        gulpif = require('gulp-if'),
        uglify = require('gulp-uglify'),
        minifyCss = require('gulp-cssnano'),
        lazypipe = require('lazypipe'),
        sourcemaps = require('gulp-sourcemaps');

    gulp.task('useref', function(callback) {
    
        return gulp.src(opts.src)
            .pipe(plumber({
                handleError: function(err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(
                useref({
                        transformPath: function(filePath) {
                            return filePath.replace('/jspm_packages', '../jspm_packages');
                        }
                    },
                    lazypipe().pipe(sourcemaps.init, { loadMaps: true })
                )
            )
            .pipe(gulpif('*.css', minifyCss()))
            .pipe(gulpif('*.js', uglify()))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(opts.dest));
    });
};