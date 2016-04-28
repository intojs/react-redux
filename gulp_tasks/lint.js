(function(){

	'use strict';

	module.exports = function(opts) {

		var gulp = require('gulp'),
	        plumber = require('gulp-plumber'),
	        eslint = require('gulp-eslint');
			
		gulp.task('lint', function () {
			return gulp.src(opts.src)
				.pipe(plumber({
			    	handleError: function (err) {
			            console.log(err);
			            this.emit('end');
			        }
			    }))
				.pipe(eslint())
  				.pipe(eslint.format());
				// .pipe(eslint.failOnError());
		});
	};
}()); 