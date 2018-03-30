var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
const execa = require('execa')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const {appConfig, desktopConfig} = require('./tasks/webpack.config')
var webpackDevServer = require('webpack-dev-server')
var del = require('del')

//var webpackDevConfig = new webpackDevServer(webpack(appConfig))

gulp.task('build.app', async () => {
  return gulp.src(["src/app/app.tsx"])
  .pipe(webpackStream(appConfig, webpack))
    .pipe(gulp.dest('dist/app'))
})

gulp.task('build.desktop', async () => {
  return gulp.src(["src/desktop/main.ts"])
  .pipe(webpackStream(desktopConfig, webpack))
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

gulp.task('webpack', gulp.parallel('build.app', 'build.desktop', 'static'))

gulp.task('clean', async () => del(['dist']));


gulp.task('watch', () => {
  gulp.watch(['src/app/**/*.ts'], gulp.parallel('build.app'));
  gulp.watch(['src/app/**/*.tsx'], gulp.parallel('build.app'));
});


