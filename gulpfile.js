var path = require('path')
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var merge = require('merge-stream');


gulp.task('app:postcss', function () {
  
  var scssStream = gulp.src(['src/**/*.scss', 'src/**/*.css'])
          .pipe(sass())
          .pipe(concat('scss.out.css'));

  var postCssStream = gulp.src('./src/app/**/*.css')
          .pipe(postcss([
                require('postcss-easy-import')(),
                require('postcss-cssnext')({ browsers: 'last 2 Chrome version' }),
                require('postcss-inline-svg')(),
                require('postcss-svgo')(),
                require('postcss-discard-duplicates'),
                require('postcss-csso')({ restructure: false })
                ]))
          .pipe(concat('css.out.css'));

        var mergedStream = merge(scssStream, postCssStream)
                              .pipe(concat('styles.css'))
                              .pipe(postcss([
                                  require('postcss-discard-duplicates'),
                                  require('postcss-csso')({ restructure: true })
                                  ]))
                              .pipe(gulp.dest('dist/app'))

return mergedStream
  }
);



var fs = require('fs')
var cssstats = require('cssstats')
var cssOut = fs.readFileSync('./src/app/styles.css', 'utf8')
var CssStats = cssstats(cssOut)

gulp.task('css:stats', () => {console.log(CssStats)})
