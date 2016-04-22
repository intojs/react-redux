module.exports = function (config) {

    'use strict';

    config.set({

        basePath: './../',
        
        frameworks: ['jspm', 'jasmine', 'phantomjs-shim'],

        jspm: {
            loadFiles: ['src/app/**/*.spec.js'],
            serveFiles: ['src/app/**/!(*spec).js', 'src/app/**/*.tpl.html']
        },

        files: [
        ],

        exclude: [],

        preprocessors: {
            'src/app/**/!(*spec).js': ['babel', 'coverage']
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            includeAllSources : true,
            reporters: [{
                type: 'text-summary'
            }]
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
            }
        },

        plugins: [
            'karma-babel-preprocessor',
            'karma-coverage',
            'karma-jasmine',
            'karma-jspm',
            'karma-phantomjs-launcher',
            'karma-phantomjs-shim',
            'karma-chrome-launcher'
        ],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        browsers: ['Chrome'],

        autoWatch: true,

        singleRun: false
    });
};