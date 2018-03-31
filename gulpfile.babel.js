var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
var shell = require('gulp-shell')
var cp = require('child_process')
var execa = require('execa')
var electron = require('electron')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const {appConfig, desktopConfig} = require('./tasks/webpack.config')
var del = require('del')


gulp.task('prod.app', async () => {
  process.env.NODE_ENV = 'production'
  return gulp.src(["src/app/app.tsx"])
  .pipe(webpackStream(appConfig, webpack))
    .pipe(gulp.dest('dist/app'))
})


gulp.task('desktop', async function() {
  return gulp.src(["src/desktop/main.ts"])
  .pipe(webpackStream(desktopConfig, webpack))
    .pipe(gulp.dest('dist/desktop'))
})

gulp.task("run.desktop", async (callback) => {
    exceca(electron, ["."], {stdio: "inherit"})
    .on("close", function () {
        callback();
    })
})


gulp.task("static", async () => {
    return gulp.src(["src/static/**/*"])
                    .pipe(gulp.dest("dist/static"))
})


gulp.task('clean', async () => del(['dist']));



gulp.task("static2", async () => {
    return gulp.src(["src/**/*.ttf",
                    "src/**/*.svg",
                    "src/**/*.jpg",
                    "src/**/*.html",
                    "src/**/*.eot",
                    "src/**/*.woff",
                    "src/**/*.woff2",
                    "src/**/*.png"])
                    .pipe(gulp.dest("dist"))})