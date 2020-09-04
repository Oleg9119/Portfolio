module.exports = function () {
    $.gulp.task('html', function() {
        return $.gulp.src('src/*.html')
            .pipe($.gulp.dest('build')) //перемещаем файлы в папку
            .on('end', $.browserSync.reload); //перезагружаем браузер
    });
};