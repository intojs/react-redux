(function(){

    'use strict';

    module.exports = function(opts) {

    	var gulp = require('gulp'),
            plumber = require('gulp-plumber'),
            gulpif = require('gulp-if'),
            minifyCss = require('gulp-cssnano');

    	gulp.task('copy-assets', function() {
            return gulp.src(opts.src)
                .pipe(plumber({
                    handleError: function (err) {
                        console.log(err);
                        this.emit('end');
                    }
                }))
                .pipe(gulpif('*.css', minifyCss()))
                .pipe(gulp.dest(opts.dest));
        });
    };
}());