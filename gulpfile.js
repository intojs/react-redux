var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSeq = require('run-sequence');

gulp.task('browser-sync', require('./gulp_tasks/browser-sync')({
	baseDir: [
		'src',
		'jspm_packages'
	],
	port: 4000,
	browser: 'google chrome'
}));

gulp.task('bootstrap-sass', require('./gulp_tasks/build-bootstrap')(plugins, {
	src: './src/scss/bootstrap.scss',
	dest: './src/css'
}));

// --- Dev ---

gulp.task('dev', function (callback) {
	runSeq(
		['bootstrap-sass'],
		['browser-sync'],
		callback
	);
});