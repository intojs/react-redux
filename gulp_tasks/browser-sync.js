var browserSync = require('browser-sync');

module.exports = function (opts) {
    return function () {
        browserSync.init({
            server: {
                baseDir: opts.baseDir
            },
            port: opts.port,
            browser: opts.browser,
        });
    }
};