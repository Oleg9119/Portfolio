module.exports = function () {
    $.gulp.task('sass', function() {
        return $.gulp.src('sass/style.scss')
            .pipe($.gp.plumber()) //отображает в консоль ошибки в коде и не дает скрипту автоматизации останавливать свою работу
            .pipe($.gp.sourcemaps.init()) //инициализация sourcemaps
            .pipe($.gp.sass()) //компиляция
            .pipe($.gp.autoprefixer({  //расстановка префиксов
                browsers: ['last 2 versions']
            })) 
            .pipe($.gp.csso()) //минификация css-файла
            .pipe($.gp.rename('style.min.css')) //переименовываем файл
            .pipe($.gp.sourcemaps.write('')) //записываем sourcemaps в данный файл
            .pipe($.gulp.dest('build/css')) //перемещаем файл в папку
            .pipe($.browserSync.stream()); //обновляем браузер
    });
};

