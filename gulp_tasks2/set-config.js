(function() {
	
	'use strict';

	module.exports = function(opts) {

		var gulp = require('gulp'),
	        rename = require('gulp-rename'),
	        plumber = require('gulp-plumber');

		gulp.task('set-config', function(callback) {

			var src;
			
			switch (process.env.NODE_ENV) {
				case 'dev':
					src = opts.configPaths.dev;
					break;
				case 'stage':
					src = opts.configPaths.stage;
					break;
				case 'prod':
					src = opts.configPaths.prod;
					break;
			}

	        return gulp.src(src)
				.pipe(plumber({
			    	handleError: function (err) {
			            console.log(err);
			            this.emit('end');
			        }
			    }))
			    .pipe(rename('config.js'))
			    .pipe(gulp.dest(opts.dest));
	    });
	};
}());