module.exports = function(opts) {

    var gulp = require('gulp'),
        browserSync = require('browser-sync'),
        historyApiFallback = require('connect-history-api-fallback');
        // modRewrite = require('connect-modrewrite');

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: opts.baseDir,
                middleware: [historyApiFallback()]
            },
            port: opts.port,
            browser: opts.browser,
        });
    });
};