//Packages
//npm i --save-dev gulp sass gulp-sass gulp-autoprefixer browser-sync

// Initialize modules
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

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
  watch(["app/scss/**/*.scss"], series(scssTask, browserSyncReload));
}

exports.default = series(scssTask, browserSynServe, watchTask);
