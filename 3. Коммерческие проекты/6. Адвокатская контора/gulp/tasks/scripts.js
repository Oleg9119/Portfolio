const jsFiles = [                                       //константа, которая будет являться массивом с путями к файлам
    $.path.jquery,
    $.path.js,
];         

module.exports = function () {
    $.gulp.task('scripts', function() {
        return $.gulp.src(jsFiles)
            .pipe($.gp.plumber()) //отображает в консоль ошибки в коде и не дает скрипту автоматизации останавливать свою работу
            .pipe($.gp.sourcemaps.init()) //инициализация sourcemaps
            .pipe($.gp.babel({presets: ['@babel/preset-env']})) //переписывает ES6 в ES5 синтаксис
            .pipe($.gp.concat('all.js')) //объединение скриптов в один файл
            .pipe($.gp.uglify()) //минификация кода
            .pipe($.gp.rename('all.min.js')) //переименовываем файл
            .pipe($.gp.sourcemaps.write('')) //записываем sourcemaps в данный файл
            .pipe($.gulp.dest('build/js')) //перемещаем файл в папку
            .pipe($.browserSync.stream()); //обновляем браузер
    });
};

