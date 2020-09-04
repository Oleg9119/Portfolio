module.exports = function () {
    $.gulp.task('webp', function() {
        return $.gulp.src('build/img/**/*.{jpg,png}') //берем изображения из папки
            .pipe($.gp.webp({quality: 90}))             //создаем изображения в формате webp 
            .pipe($.gulp.dest('build/img'));
    });
};