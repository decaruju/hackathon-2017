module.exports = function (gulp, plugins, opts) {
  return gulp.src(opts.src)
          .pipe(plugins.less())
          .pipe(plugins.rename(opts.name))
          .pipe(opts.cleanCSS ? plugins.cleanCSS() : plugins.gutil.noop())
          .pipe(plugins.autoprefixer())
          .pipe(gulp.dest(opts.dest))
          .pipe(gulp.dest("./"));
};
