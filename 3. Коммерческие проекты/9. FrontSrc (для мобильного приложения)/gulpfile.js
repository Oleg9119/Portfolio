const source_folder = './src/';
const project_folder = './../www/';

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const fileinclude = require("gulp-file-include");
const del = require("del");
const imagemin = require("gulp-imagemin");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const svgSprite = require("gulp-svg-sprite");
const rename = require("gulp-rename");
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task("html", function () {
  return gulp
    .src(source_folder + "/html/*.html")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Styles",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(
      fileinclude({
        prefix: "@@",
      })
    )
    .pipe(gulp.dest(project_folder));
});

gulp.task("scss", function () {
  return gulp
    .src(source_folder + "/scss/style.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Styles",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    // .pipe(
    //     rename({
    //         extname: '.min.css'
    //     })
    // )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(project_folder + "/css/"));
});

gulp.task("img", function () {
  return gulp
    .src(source_folder + "/img/**/*.*")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imageminJpegRecompress({
          loops: 5,
          min: 65,
          max: 70,
          quality: "medium",
        }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest(project_folder + "/img/"));
});

gulp.task("svg", function () {
  return (
    gulp
      .src(source_folder + "/img/**/*.svg")
      .pipe(
        svgmin({
          js2svg: {
            pretty: true,
          },
        })
      )
      .pipe(
        cheerio({
          run: function ($) {
            $("[fill]").removeAttr("fill");
            $("[stroke]").removeAttr("stroke");
            $("[style]").removeAttr("style");
          },
          parserOptions: { xmlMode: true },
        })
      )
      .pipe(replace("&gt;", ">"))
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: "sprite.svg",
            },
          },
        })
      )
      .pipe(gulp.dest(project_folder + "/img/"))
  );
});

gulp.task("fonts", function () {
  gulp.src(source_folder + "/fonts/*.ttf")
          .pipe(ttf2woff())
          .pipe(gulp.dest(project_folder + "/fonts/"));
  return gulp.src("./src/fonts/*.ttf")
          .pipe(ttf2woff2())
          .pipe(gulp.dest(project_folder + "/fonts/"));
});

gulp.task("copy:ico", function () {
  return gulp.src(source_folder + "/*.ico").pipe(gulp.dest(project_folder));
});

gulp.task("copy:logo", function () {
  return gulp.src(source_folder + "/*.png").pipe(gulp.dest(project_folder));
});

gulp.task("copy:assets", function () {
  return gulp.src(source_folder + "/assets/**/*.*").pipe(gulp.dest(project_folder + "/assets/"));
});

gulp.task("copy:leaflet", function () {
    return gulp.src(source_folder + "/leaflet/**/*.*").pipe(gulp.dest(project_folder + "/leaflet/"));
});

gulp.task("copy:leafletmarkers", function () {
    return gulp.src(source_folder + "/leaflet/leaflet-markers/**/*.*").pipe(gulp.dest(project_folder + "/leaflet/leaflet-markers"));
});

gulp.task("copy:fontawesome", function () {
  return gulp.src(source_folder + "/fontawesome/**/*.*").pipe(gulp.dest(project_folder + "/fontawesome/"));
});

gulp.task("copy:fontawesome-webfonts", function () {
    return gulp.src(source_folder + "/fontawesome/webfonts**/*.*").pipe(gulp.dest(project_folder + "/fontawesome/"));
});

gulp.task("copy:loading-bar", function () {
  return gulp.src(source_folder + "/loading-bar/**/*.*").pipe(gulp.dest(project_folder + "/loading-bar/"));
});

gulp.task("copy:datepicker", function () {
  return gulp.src(source_folder + "/datepicker/**/*.*").pipe(gulp.dest(project_folder + "/datepicker/"));
});

gulp.task("webpack", function() {
  return gulp.src(source_folder + "/js/main.js")
                .pipe(webpack(require("./webpack.config.js")))
                .pipe(gulp.dest(project_folder + "/js/"));
});

gulp.task("scripts", function() {
  return gulp.src(source_folder + "/js/**/*.js")
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(project_folder + '/js/'))
      .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  watch(
    [project_folder + "/*.html", project_folder + "/css/**/*.css"],
    gulp.parallel(browserSync.reload)
  );

  watch(source_folder + "/scss/**/*.scss", function () {
    setTimeout(gulp.parallel("scss"), 1000);
  });

  watch(source_folder + "/html/**/*.html", gulp.parallel("html"));

  watch(source_folder + "/img/**/*.*", gulp.parallel("img"));
  watch(source_folder + "/fonts/**/*.*", gulp.parallel("fonts"));
  watch(source_folder + "/assets/**/*.*", gulp.parallel("copy:assets"));
  watch(source_folder + "/*.ico", gulp.parallel("copy:ico"));
  watch(source_folder + "/*.png", gulp.parallel("copy:logo"));
  watch(source_folder + "/js/**/*.*", gulp.parallel("scripts"));
});

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: project_folder,
    },
  });
});

gulp.task("clean", function () {
  return del(project_folder, {force: true});
});

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("clean"),
    gulp.series("scss", "html", "img", "svg", "fonts", "copy:assets", "copy:leaflet", 'copy:leafletmarkers', "copy:fontawesome", "copy:fontawesome-webfonts", "copy:loading-bar", "copy:datepicker", "copy:ico", "copy:logo", "scripts"),
    gulp.parallel("server", "watch")
  )
);
