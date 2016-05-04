var gulp = require('gulp');

module.exports = function (plugins, opts) {
    return function () {
        gulp.src(opts.src)
            .pipe(plugins.plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(plugins.sass({
                includePaths: opts.src,
                errLogToConsole: true,
                outputStyle: 'expanded'
            }).on('error', plugins.sass.logError))
            .pipe(gulp.dest(opts.dest))
    }
}