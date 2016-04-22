(function() {
	
	'use strict';
	
	var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		plumber = require('gulp-plumber'),
		KarmaServer = require('karma').Server,
		runSeq = require('run-sequence');

	/**
	 *  --- Settings --- 
	 */

	var tasksPath = './gulp_tasks',
	    basePath = './src',
	    distPath = './dist';

	/**
	 *	--- Environments ---
	 */

	gulp.task('set-dev-node-env', function(cb) {
	    process.env.NODE_ENV = 'dev';
		cb();
	});

	gulp.task('set-stage-node-env', function(cb) {
	    process.env.NODE_ENV = 'stage';
		cb();
	});

	gulp.task('set-prod-node-env', function(cb) {
	    process.env.NODE_ENV = 'prod';
	    cb();
	});

   	/**
    *	--- Tasks ---
    */

    require(tasksPath + '/browser-sync.js')({
    	baseDir: ['./src', './'],
    	port: 4000,
    	browser: 'google chrome'
	});

	require(tasksPath + '/bundle.js')({
		src: basePath + '/app/app.js',
    	dest: distPath
	});

	require(tasksPath + '/clean.js')({
		src: distPath + '/*'
	});

	require(tasksPath + '/clean-cdn.js')({
		src: './cdn/*'
	});

	require(tasksPath + '/set-config.js')({
		configPaths: {
			dev: basePath + '/config/config-dev.js',
			stage: basePath + '/config/config-stage.js',
			prod: basePath + '/config/config-prod.js'
		},
		dest: basePath + '/app'
	});

	require(tasksPath + '/copy-assets.js')({
    	src: basePath + '/assets/**/*',
    	dest: distPath + '/assets'
	});

	require(tasksPath + '/copy-fonts.js')({
    	src: basePath + '/fonts/**/*',
    	dest: distPath + '/fonts'
	});

	require(tasksPath + '/html-base-replace.js')({
    	src: distPath + '/index.html',
    	dest: distPath,
    	base: {
    		stage: '<base href="/">',
    		prod: '<base href="/">'
    	}
	});
	
	require(tasksPath + '/html-min.js')({
    	src: distPath + '/index.html',
    	dest: distPath
	});

	require(tasksPath + '/js-hint.js')({
		src: [
			basePath + '/app/**/*.js',
			'!' + basePath+'/app/**/*.spec.js'
		]
	});

	require(tasksPath + '/less.js')({
    	src: basePath + '/less/main.less',
    	dest: basePath + '/css'
	});

	require(tasksPath + '/useref.js')({
    	src: basePath + '/index.html',
    	dest: distPath
	});

	require(tasksPath + '/rev-all.js')({
    	src: distPath + '/**/*',
    	dest: './cdn',
    	prefix: {
    		stage: '//localhost:4000',
    		prod: '//localhost:4000'
    	}
	});

	/**
	 *	--- Watch ---
	 */

	gulp.task('watch', function() {

		gulp.watch(basePath+'/**/*.html', browserSync.reload);

		gulp.watch([
			basePath + '/app/**/*.js',
			'!' + basePath + '/app/**/*.spec.js',
		], ['js-hint', browserSync.reload]);
		
		gulp.watch(basePath+'/**/*.less', ['less']);

		gulp.watch([
			basePath + '/css/**/*.css',
			'!'+basePath + '/css/main.css'
		], function(ev) {
        	gulp.src(ev.path, { read: false })
        		.pipe(plumber({
	                errorHandler: function(err) {
	                    console.log(err);
	                    this.emit('end');
	                }
	            }))
        		.pipe(browserSync.stream());
    	});
	});

	/**
	 *  --- Test --- 
	 */

	gulp.task('test', function(callback) {
	  	new KarmaServer({
			configFile: __dirname + '/karma/karma.conf.js',
		}, callback).start();
	});

	/**
	 *  --- Dev --- 
	 */

	gulp.task('dev', function(callback) {
		runSeq(
			['set-dev-node-env'],
			['set-config'],
			['js-hint', 'less'],
			['browser-sync'],
			['watch'],
			callback
		);
	});

	/**
	 *	--- Hybrid dev (the server is remote)/
	 */

	gulp.task('hybrid-dev', function(callback) {
		runSeq(
			['set-stage-node-env'],
			['set-config'],
			['js-hint', 'less'],
			['browser-sync'],
			['watch'],
			callback
		);
	});


	/**
	 *	--- Stage ---
	 */

	gulp.task('stage', function(callback) {
		runSeq(
			['clean', 'clean-cdn', 'set-stage-node-env'],
			['set-config'],
			['js-hint', 'less'],
			['useref'],
			['bundle'],
			['html-base-replace'],
			['html-min'],
			['copy-assets', 'copy-fonts'],
			['rev-all'],
			callback
		);
	});

	/**
	 *	--- Prod ---
	 */

	gulp.task('prod', function(callback) {
		runSeq(
			['clean', 'clean-cdn', 'set-prod-node-env'],
			['set-config'],
			['js-hint', 'less'],
			['useref'],
			['bundle'],
			['html-base-replace'],
			['html-min'],
			['copy-assets', 'copy-fonts'],
			['rev-all'],
			callback
		);
	});
}());