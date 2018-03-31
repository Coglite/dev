var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
const execa = require('execa')
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

gulp.task('dev.app', async () => {execa('yarn dev')})

gulp.task('desktop', async () => {
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

gulp.task('webpack', gulp.parallel('dev.app', 'desktop', 'static'))

gulp.task('clean', async () => del(['dist']));

gulp.task('watch', () => {
  gulp.watch(['src/static/**/*'], gulp.parallel('static'));
});

