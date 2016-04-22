(function(){

    'use strict';

    module.exports = function(opts) {

    	var gulp = require('gulp'),
            plumber = require('gulp-plumber'),
            htmlreplace = require('gulp-html-replace');

    	gulp.task('html-base-replace', function() {

            var base = process.env.NODE_ENV === 'stage' ? opts.base.stage : opts.base.prod;

            return gulp.src(opts.src)
                .pipe(plumber({
                    handleError: function(err) {
                        console.log(err);
                        this.emit('end');
                    }
                }))
                .pipe(htmlreplace({
                    'base': base
                }))
                .pipe(gulp.dest(opts.dest));
        });
    };
}());