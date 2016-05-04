'use strict';

var gulp = require('gulp');

module.exports = function (plugins, opts) {

    return function () {
        return gulp.src(opts.src)
            .pipe(plugins.plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(plugins.eslint())
            .pipe(plugins.eslint.format());
            // .pipe(plugins.eslint.failOnError());
    };
};