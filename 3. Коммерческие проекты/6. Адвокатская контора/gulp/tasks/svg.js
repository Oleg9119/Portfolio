//Создаем svg-спрайт

module.exports = function () {
    $.gulp.task('svg', function() {
        return $.gulp.src('img/**/*.svg') //берем svg-изображения из папки
            .pipe($.gp.svgmin({           // минификация изображений
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({          //удаляются лишние аттрибуты
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {xmlMode: true}
            }))
            .pipe($.gp.replace('&gt;', '>'))  //замена спецсимволов
            //build svg sprite
            .pipe($.gp.svgSprite({            //создается спрайт
                mode: {
                    symbol: {
                        sprite: 'sprite.svg'
                    }
                }
            }))
            .pipe($.gulp.dest('build/img'));
    });
};