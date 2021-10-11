const source_folder = './src/';
const project_folder = './build/';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include');
const del = require('del');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const imagewebp = require('gulp-webp');

//Сборка HTML из шаблонов
gulp.task('html', function () {
    return gulp
        .src(source_folder + '/html/*.html')
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: 'Styles',
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(
            fileinclude({
                prefix: '@@'
            })
        )
        .pipe(gulp.dest(project_folder));
});

//Компиляция SCSS в CSS
gulp.task('scss', function () {
    return (
        gulp
            .src(source_folder + '/scss/style.scss')
            .pipe(
                plumber({
                    errorHandler: notify.onError(function (err) {
                        return {
                            title: 'Styles',
                            sound: false,
                            message: err.message
                        };
                    })
                })
            )
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(
                autoprefixer({
                    // overrideBrowserslist: ['not dead'],
                    cascade: false
                })
            )
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            // .pipe(
            //     rename({
            //         extname: '.min.css'
            //     })
            // )
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(project_folder + '/css/'))
    );
});

//Слежка за img
gulp.task('img', function () {
    return gulp
        .src(source_folder + '/img/**/*.*')
        .pipe(
            imagemin([
                imagemin.mozjpeg({ quality: 80, progressive: true }),
                imagemin.optipng({ optimizationLevel: 2 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
                })
            ])
        )
        .pipe(gulp.dest(project_folder + '/img/'));
});

gulp.task('webp', function () {
    return gulp
        .src(source_folder + '/img/**/*.{jpg,png}')
        .pipe(imagewebp())
        .pipe(gulp.dest(project_folder + '/img/webp/'));
});

//SVG
gulp.task('svg', function () {
    return gulp
        .src(source_folder + '/img/**/*.svg')
        .pipe(
            svgmin({
                js2svg: {
                    pretty: true
                }
            })
        )
        .pipe(
            cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            })
        )
        .pipe(replace('&gt;', '>'))
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        sprite: 'sprite.svg'
                    }
                }
            })
        )
        .pipe(gulp.dest(project_folder + '/img/'));
});

//Копирование fonts
gulp.task('fonts', function () {
    gulp.src(source_folder + '/fonts/*.ttf')
        .pipe(ttf2woff())
        .pipe(gulp.dest(project_folder + '/fonts/'));
    return gulp
        .src('./src/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest(project_folder + '/fonts/'));
});

//Копирование ico
gulp.task('copy:ico', function () {
    return gulp.src(source_folder + '/*.ico').pipe(gulp.dest(project_folder));
});

//Копирование assets
gulp.task('copy:assets', function () {
    return gulp.src(source_folder + '/assets/**/*.*').pipe(gulp.dest(project_folder + '/assets/'));
});

gulp.task('copy:swiper', function () {
    return gulp.src(source_folder + '/swiper/**/*.*').pipe(gulp.dest(project_folder + '/swiper/'));
});

gulp.task('copy:wow', function () {
    return gulp.src(source_folder + '/wow/**/*.*').pipe(gulp.dest(project_folder + '/wow/'));
});

//Webpack
gulp.task('webpack', function () {
    return gulp
        .src(source_folder + '/js/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(project_folder + '/js/'));
});

//Gulp-babel
gulp.task('scripts', function () {
    return (
        gulp
            .src(source_folder + '/js/**/*.js')
            .pipe(plumber()) //отображает в консоль ошибки в коде и не дает скрипту автоматизации останавливать свою работу
            .pipe(sourcemaps.init()) //инициализация sourcemaps
            //.pipe(babel({presets: ['@babel/preset-env']})) //переписывает ES6 в ES5 синтаксис
            .pipe(concat('all.js')) //объединение скриптов в один файл
            // .pipe(uglify()) //минификация кода
            // .pipe(rename('all.min.js')) //переименовываем файл
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(project_folder + '/js/')) //перемещаем файл в папку
            .pipe(browserSync.stream())
    ); //обновляем браузер
});

//Слежка за HTML, CSS, SCSS файлами, сборка страниц из шаблонов и обновление браузера
gulp.task('watch', function () {
    //Обновление браузера при обновлении страницы html и css
    watch([project_folder + '/*.html', project_folder + '/css/**/*.css'], gulp.parallel(browserSync.reload));

    //Правка бага с компиляцией scss
    watch(source_folder + '/scss/**/*.scss', function () {
        setTimeout(gulp.parallel('scss'), 1000);
    });

    //Компилируем и создаем новую html-страницу
    watch(source_folder + '/html/**/*.html', gulp.parallel('html'));

    //Слежка и копирование статических файлов и скриптов
    watch(source_folder + '/img/**/*.*', gulp.parallel('img'));
    watch(source_folder + '/fonts/**/*.*', gulp.parallel('fonts'));
    watch(source_folder + '/assets/**/*.*', gulp.parallel('copy:assets'));
    watch(source_folder + '/swiper/**/*.*', gulp.parallel('copy:swiper'));
    watch(source_folder + '/wow/**/*.*', gulp.parallel('copy:wow'));
    watch(source_folder + '/*.ico', gulp.parallel('copy:ico'));
    watch(source_folder + '/js/**/*.*', gulp.parallel('scripts'));
});

//Стартует сервер из папки project_folder
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: project_folder
        }
    });
});

gulp.task('clean', function () {
    return del(project_folder, { force: true });
});

//Дефолтный общий таск
gulp.task('default', gulp.series(gulp.parallel('clean'), gulp.series('scss', 'html', 'img', 'webp', 'svg', 'fonts', 'copy:assets', 'copy:swiper', 'copy:wow', 'copy:ico', 'scripts'), gulp.parallel('server', 'watch')));
