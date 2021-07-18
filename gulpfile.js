//Packages
//npm i --save-dev gulp sass gulp-sass gulp-autoprefixer browser-sync (Sass)
//npm i --save-dev gulp-terser

// Initialize modules
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const terser = require("gulp-terser");

//SCSS TASK
function scssTask() {
  return src("./app/scss/style.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer("last 2 versions"))
    .pipe(dest("./dist", { sourcemaps: "." }));
}

//JS TASK
function jsTask() {
  return src("app/js/script.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

//BROWSER SYNC  TASK
function browserSynServe(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}

//BROWSER SYNC RELOAD
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

//WATCH TASK
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(["app/scss/**/*.scss", "app/js/**/*.js"], series(scssTask, jsTask, browserSyncReload));
}

exports.default = series(scssTask, jsTask, browserSynServe, watchTask);
