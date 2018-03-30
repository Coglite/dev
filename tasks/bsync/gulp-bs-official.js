var babel =require('@babel/core'); //replaced gulp-babel cause it was fucking up idk if this works
var concat =require('gulp-concat');
var del =require('del');
var gulp =require('gulp');
var uglify =require('gulp-uglify');
var browserSync =require('browser-sync');

const server = browserSync.create();

const paths = {
  scripts: {
    src: ['src/app/**/*.ts', 'src/app/**/*.tsx'],
    dest: 'dist/scripts/'
  }
};

const clean = () => del(['dist']);

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

const watch = () => gulp.watch(paths.scripts.src, gulp.series(scripts, reload));

const dev = gulp.series(clean, scripts, serve, watch);
export default dev;