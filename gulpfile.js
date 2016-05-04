var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSeq = require('run-sequence');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');

// --- Settings --- 

var tasksPath = './gulp_tasks',
	basePath = './src';

gulp.task('browser-sync', require(tasksPath + '/browser-sync')({
	baseDir: [
		'./',
		'./src' 
	],
	port: 4000,
	browser: 'google chrome'
}));

gulp.task('bootstrap-sass', require(tasksPath + '/sass')(plugins, {
	src: ['./node_modules/bootstrap-sass/assets/stylesheets'],
	dest: basePath + '/css'
}));

gulp.task('sass', require(tasksPath + '/sass')(plugins, {
	src: [basePath + '/scss/main.scss'],
	dest: basePath + '/css'
}));

gulp.task('lint', require(tasksPath + '/lint')(plugins, {
	src: [
		basePath + '/app/**/*.js'
	]
}));

// --- Watch ---

gulp.task('watch', function () {

	gulp.watch(basePath + '/**/*.html', browserSync.reload);

	gulp.watch([
		basePath + '/app/**/*.js',
		'!' + basePath + '/app/**/*.spec.js',
	], ['lint', browserSync.reload]);

	gulp.watch(basePath + '/**/*.scss', ['sass']);

	gulp.watch([
		basePath + '/css/**/*.css',
		'!' + basePath + '/css/main.css'
	], function (ev) {
		gulp.src(ev.path, { read: false })
			.pipe(plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			}))
			.pipe(browserSync.stream());
	});
});

// --- Dev ---

gulp.task('dev', function (callback) {
	runSeq(
		['bootstrap-sass', 'sass', 'lint'],
		['browser-sync'],
		['watch'],
		callback
	);
});