(function(){

	'use strict';

	module.exports = function(opts) {

		var gulp = require('gulp'),
	        del = require('del');

		gulp.task('clean', function(callback) {
	        return del(opts.src, callback);
	    });
	};
}());