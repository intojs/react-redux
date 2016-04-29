(function(){

    'use strict';

    module.exports = function(opts) {

    	var gulp = require('gulp'),
            plumber = require('gulp-plumber');

    	gulp.task('copy-fonts', function() {
            return gulp.src(opts.src)
                .pipe(plumber({
                    handleError: function(err) {
                        console.log(err);
                        this.emit('end');
                    }
                }))
                .pipe(gulp.dest(opts.dest));
        });

    };
}());