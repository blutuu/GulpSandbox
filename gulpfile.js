/*===============================================
=            Variable Initialization            =
===============================================*/
// Dependencies
const { series, parallel } = require("gulp"),
  gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  jade = require("gulp-jade"),
  jshint = require("gulp-jshint"),
  concat = require("gulp-concat"),
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  browsersync = require("browser-sync");

// Input sources
var sources = {
  sass: "process/sass/style.scss",
  allsass: "process/sass/**/*",
  alljade: "process/jade/**/*",
  jade: ["process/jade/**/*", "!process/jade/includes/**/*"],
  js: "process/js/**/*",
};

// Output destinations
var output = {
  docroot: "builds",
  css: "builds/css",
  js: "builds/js",
};

// Compiling JS
function javascript() {
  return gulp
    .src(sources.js)

    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString(),
          })(err);
        },
      })
    )

    .pipe(jshint("./.jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest(output.js));
}

// // Compiling Sass
function styles() {
  return (
    gulp
      .src(sources.sass)

      .pipe(
        plumber({
          errorHandler: function (err) {
            notify.onError({
              title: "Gulp error in " + err.plugin,
              message: err.toString(),
            })(err);
          },
        })
      )

      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: "nested" }))
      .pipe(autoprefixer())
      //.pipe(cleancss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(output.css))
  );
}

// Compiling Jade
function htmlProcess() {
  return gulp
    .src(sources.jade)

    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString(),
          })(err);
        },
      })
    )

    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(output.docroot));
}

// Watching files for changes
function watch() {
  gulp.watch(sources.js, ["js"]).on("change", browsersync.reload);
  gulp.watch([sources.allsass], ["sass"]).on("change", browsersync.reload);
  gulp.watch([sources.alljade], ["jade"]).on("change", browsersync.reload);
}

// Starting the live server
function server() {
  browsersync.init({
    server: {
      baseDir: output.docroot,
    },
  });
}

// gulp.task("default", ["sass", "jade", "watch", "js", "server"]);

exports.default = series(javascript, styles, htmlProcess, server, watch);
