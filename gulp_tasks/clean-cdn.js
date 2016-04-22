'use strict';

module.exports = function(opts) {

	var gulp = require('gulp'),
        del = require('del');

	gulp.task('clean-cdn', function(callback) {
        return del(opts.src, callback);
    });
};