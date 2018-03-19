var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
const execa = require('execa')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
var webpackConfig = require('./tasks/webpack.config')



gulp.task('webpack1', async () => {
  return gulp.src(["src/app/app.tsx"])
  .pipe(webpackStream(webpackConfig.appConfig, webpack))
    .pipe(gulp.dest('dist/app'))
})

gulp.task('webpack2', async () => {
  return gulp.src(["src/desktop/main.ts"])
  .pipe(webpackStream(webpackConfig.desktopConfig, webpack))
    .pipe(gulp.dest('dist/desktop'))
})

gulp.task("static", async () => {
    return gulp.src(["src/**/*.ttf",
                    "src/**/*.svg",
                    "src/**/*.jpg",
                    "src/**/*.html",
                    "src/**/*.eot",
                    "src/**/*.woff",
                    "src/**/*.woff2",
                    "src/**/*.png"])
        .pipe(gulp.dest("dist"))})

gulp.task('webpack', gulp.parallel('webpack1', 'webpack2', 'static'))


gulp.task('watch', () => {
  gulp.watch(['src/app**/*.ts'], gulp.parallel('webpack1'));
  gulp.watch(['src/app**/*.tsx'], gulp.parallel('webpack1'));
});



//const env = "development";
//const compiler = webpack(config(env));
/*
let electronStarted = false;

const watching = compiler.watch({}, (err, stats) => {
  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;

    execa(electron, ["."], { stdio: "inherit" })
      .on("close", () => {
        watching.close();
      });
  }
});
*/