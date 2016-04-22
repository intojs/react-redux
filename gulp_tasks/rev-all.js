'use strict';

module.exports = function(opts) {

    var gulp = require('gulp'),
        plumber = require('gulp-plumber'),
        RevAll = require('gulp-rev-all');

    gulp.task("rev-all", function() {

        var prefix = process.env.NODE_ENV === 'stage' ? opts.prefix.stage : opts.prefix.prod;

        var revAll = new RevAll({
            prefix: prefix,
            dontRenameFile: ['.html']
        });

        return gulp.src(opts.src)
            .pipe(plumber({
                handleError: function(err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(revAll.revision())
            .pipe(gulp.dest(opts.dest));
    });
};