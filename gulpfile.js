var gulp          = require("gulp"),
    sass          = require("gulp-sass"),
    browserSync   = require("browser-sync"),
    autoprefixer  = require("gulp-autoprefixer"),
    concat        = require("gulp-concat"),
    uglify        = require("gulp-uglifyjs"),
    cssnano       = require("gulp-cssnano"),
    rename        = require("gulp-rename"),
    del           = require("del");
    imagemin      = require("gulp-imagemin"),
    pngquant      = require("imagemin-pngquant"),
    cache         = require("gulp-cache"),
    htmlreplace   = require("gulp-html-replace"),
    rename        = require("gulp-rename"),
    svgstore      = require("gulp-svgstore"),
    svgmin        = require("gulp-svgmin"),
    plumber       = require("gulp-plumber");

gulp.task("sass", function() {
  return gulp.src("sass/style.scss")
  .pipe(plumber())
  .pipe(sass().on("error", sass.logError))
  .pipe(autoprefixer(["last 10 versions", "ie 11"], {cascade: true}))
  .pipe(gulp.dest("css"))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: ""
    },
    notify: false
  });
});

gulp.task("scripts", function() {
  return gulp.src("js/**/*.js")
  .pipe(concat("scripts.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("build/js"));
});

gulp.task("css-min", function() {
  return gulp.src("css/style.css")
  .pipe(cssnano())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("build/css"));
});

gulp.task("img", function() {
  return gulp.src("img/**/*")
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest("build/img"));
});

gulp.task("clean", function() {
  return del.sync("build");
});

gulp.task("replace", function() {
  gulp.src("*.html")
  .pipe(htmlreplace({
    "css": "css/style.min.css",
    "js": "js/scripts.min.js"
  }))
  .pipe(gulp.dest("build"));
});

gulp.task("watch", ["browser-sync", "sass"], function() {
  gulp.watch("sass/**/*.scss", ["sass"]);
  gulp.watch("*.html", browserSync.reload);
  gulp.watch("js/**/*.js", browserSync.reload);
});



gulp.task("default", ["watch"]);

gulp.task("symbols", function() {
  return gulp.src("img/icons/*.svg")
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("symbols.svg"))
  .pipe(gulp.dest("img"));
});

gulp.task("clear", function() {
  return cache.clearAll();
});

gulp.task("build", ["clean", "img", "scripts", "css-min", "replace"], function() {

  var buildFonts = gulp.src("fonts/**/*")
  .pipe(gulp.dest("build/fonts"));

  var buildVideo = gulp.src("video/*")
  .pipe(gulp.dest("build/video"));

//  var buildHtml = gulp.src("*.html")
//  .pipe(gulp.dest("build"));

});