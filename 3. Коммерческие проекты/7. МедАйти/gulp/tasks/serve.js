//
module.exports = function () {
    $.gulp.task('serve', function() {
        $.browserSync.init({
            server: 'build/' //Сервер запускается из папки build
        });
        $.gulp.watch('src/sass/**/*.scss', $.gulp.series('sass'));
        $.gulp.watch('src/*.html', $.gulp.series('html'));
        $.gulp.watch('src/js/**/*.js', $.gulp.series('scripts'));
        $.gulp.watch('src/img/**/*.{png,jpg,svg}', $.gulp.series('allimg'));

    });
};