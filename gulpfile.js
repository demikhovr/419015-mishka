"use strict";

/* Подключение модулей */
var gulp = require("gulp");
var less = require("gulp-less");

/* Дополнительный модуль. Он запирает все ошибки в себя, не останавливая работу скрипта */
var plumber = require("gulp-plumber");

/* POSTCSS ставит префиксы */
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

/* Модуль отображающий сайт в браузере */
var server = require("browser-sync").create();

/* Минификация CSS */
var minify = require("gulp-csso");

/* Минификация JS*/
var uglify = require("gulp-uglify");

/* Отдельный плагин для переименования файла */
var rename = require("gulp-rename");

/* Оптимизация изображений */
var imagemin = require("gulp-imagemin");

/* Конвертация изображений в Webp */
var webp = require("gulp-webp");

/* Сборка SVG-спрайтов */
var svgstore = require("gulp-svgstore");

/* POSTHTML */
var posthtml = require("gulp-posthtml");

/* Позволяет вставлять одни файлы в другие */
var include = require("posthtml-include");

/* Специальный плагин для последовательного запуска задач друг за другом.
Позволяет дождаться результата одного таска, затем запускает следующий */
var run = require("run-sequence");

/* Модуль для удаления del */
var del = require("del");


/* Минифицирует стили */
gulp.task("style", function() {       /* описание таска */
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())                     /* прогоняет через компилятор Less */
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("build/css"))   /* кидает исходник в css/ */
    .pipe(minify())           /* минифицирует style.css */
    .pipe(rename("style.min.css")) /* переименование */
    .pipe(gulp.dest("build/css"))   /* еще раз кидает в css/ */
    .pipe(server.stream());       /* команда перезагрузки сервера в браузере */
});

/* Минифицирует скрипты */
gulp.task("scripts", function () {
  return gulp.src("js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("build/js"))
  .pipe(server.stream());
});

gulp.task("images", function() {
/* Говорим откуда и какой контент мы берем */
/* берем любой .png, .jpg, .gif файл в любой подпапке папки img */
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([      /* imagemin сам по себе содержит в себе множество плагинов (работа с png,svg,jpg и тд) */
      imagemin.optipng({optimizationLevel: 3}), /* 1 - максимальное сжатие, 3 - безопасное сжатие, 10 - без сжатия */
      imagemin.jpegtran({progressive: true}),   /* прогрессивная загрузка jpg (сначала пиксельная, позже проявляется) */
      imagemin.svgo()
      ]))
/* Говорим куда его складываем (в папку img) */
    .pipe(gulp.dest("build/img"))
});

/* Конвертация в webp*/
gulp.task("webp", function() {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))  /* Конвертируем png/jpg в webp */
    .pipe(gulp.dest("build/img"));
});

/* Сборка спрайта */
gulp.task("sprite", function() {
  return gulp.src("build/img/inlineIcons/*.svg")
    .pipe(svgstore({      /* вырезает из SVG-файлов лишнюю инф-цию */
      inLineSvg: true
    }))
    .pipe(rename("sprite.svg")) /* нужно переименовать, так как мы не знаем имя спрайта */
    .pipe(gulp.dest("build/img"))
});

/* POSTHTML */
gulp.task("html", function() {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

/* Перед тем как таск serve стартует должен быть запущен style */
gulp.task("serve", function() {
  server.init({          /* инициирует сервер */
    server: "build/",         /* говорим откуда смотреть сайт ( . - текущий каталог) */
  });
  /* Ватчеры следящие за изменениями наших файлов */
  /* Препроцессорные ватчеры (следим за всеми less файлами во всех папках внутри папки less),
   вторым аргументом передаем какой таск нужно запустить если один из файлов запустился */
  gulp.watch("less/**/*.less", ["style"]);
  /* Слежение за HTML файлами в корне проекта */
  gulp.watch("*.html", ["html"]);
  /* Слежение за JS файлами */
  gulp.watch("js/*.js", ["scripts"]);
});

/* Таск для копирования */
gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**"
  ], {
    /* Говорим что базовый путь начинается из корня */
    base: "."
  })
  .pipe(gulp.dest("build"));
});

/* Таск для удаления */
gulp.task("clean", function() {
  return del("build");
});

/* Таск запуска */
gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "scripts",
    "images",
    "sprite",
    "html",
    "webp",
    done  /* Самым последним вызовом функции run должна быть функция, которая была передана как аргумент */
  );
});
