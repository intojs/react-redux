(function(){

	'use strict';

	module.exports = function(opts) {

		var gulp = require('gulp'),
	        plumber = require('gulp-plumber'),
	        jshint = require('gulp-jshint');

		gulp.task('js-hint', function () {
			return gulp.src(opts.src)
				.pipe(plumber({
			    	handleError: function (err) {
			            console.log(err);
			            this.emit('end');
			        }
			    }))
				.pipe(jshint({
					expr: true,
					esnext: true
				}))
				.pipe(jshint.reporter('jshint-stylish'));
		});
	};
}());