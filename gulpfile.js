var gulp = require("gulp");

// Include Our Plugins
// var sourcemaps = require('gulp-sourcemaps');
// var mainBowerFiles = require('gulp-main-bower-files');
var gutil = require('gulp-util');
var clean = require('gulp-clean');

var plugins = {
  autoprefixer: require('gulp-autoprefixer'),
  cleanCSS: require('gulp-clean-css'),
  concat: require("gulp-concat"),
  gutil: gutil,
  rename: require("gulp-rename"),
  less: require("gulp-less"),
  uglify: require("gulp-uglify")
}

// Define path of project
var basePaths = {
  src: "assets/",
  dest: "public/assets/"
};

var paths = {
  styles: {
    src: basePaths.src + "less/",
    dest: basePaths.dest + "css/min/"

  }
};

// Define path for compiling
var appFiles = {
  styles: paths.styles.src + "styles.less"
};

//compile less
gulp.task("less", function() {
  require('./gulp-tasks/application-less.js')(gulp, plugins, {
      src: appFiles.styles,
      name: "main.css",
      dest: paths.styles.dest,
      cleanCSS: gutil.env.env === 'prod'
    });
});

gulp.task('clean', function () {
  gulp.src(paths.styles.dest + "*.css", {read: false})
    .pipe(clean());
});

// Default Task
gulp.task('build', ["less", "scripts"]);
gulp.task("default", ["build", "watch"]);
