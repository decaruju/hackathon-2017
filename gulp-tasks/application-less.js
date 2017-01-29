module.exports = function (gulp, plugins, opts) {
  return gulp.src(opts.src)
          .pipe(plugins.less())
          .pipe(plugins.rename(opts.name))
          .pipe(opts.cleanCSS ? plugins.cleanCSS() : plugins.gutil.noop())
          .pipe(plugins.autoprefixer())
          .pipe(gulp.dest("Shawinigan-Stationnement/client/public/assets/css/min/"))
          .pipe(gulp.dest("public/assets/css/min/"))
};
