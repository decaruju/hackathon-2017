module.exports = function (gulp, plugins, opts) {
  return gulp.src(opts.src)
      .pipe(plugins.concat(opts.name))
      .pipe(plugins.gutil.env.env === 'prod' ? plugins.uglify() : plugins.gutil.noop())
      .pipe(gulp.dest(opts.dest))
      .pipe(gulp.dest("./"))
      .on('error', plugins.gutil.log)
};
