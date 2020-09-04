//Минификация изображений

module.exports = function () {
    $.gulp.task('images', function() {
        return $.gulp.src('build/img/**/*.{jpg,png,svg}') //берем все изображения из папки
            .pipe($.gp.imagemin([
                $.gp.imagemin.mozjpeg({ progressive: true }), //делаем изображения прогрессивными
                $.imageminJpegRecompress({                   //сжимаем изображения jpeg
                    loops: 5,
                    min: 65,
                    max: 70,
                    quality: 'medium'
                }),
                $.gp.imagemin.optipng({optimizationLevel: 3}), //сжимаем изображения png
                $.pngquant({quality: [0.65,0.7], speed: 5}),
                $.gp.imagemin.svgo()                            //сжимаем изображения svg 
            ])) 
            .pipe($.gulp.dest('build/img'));
    });
};