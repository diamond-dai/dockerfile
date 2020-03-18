let cleanCSS = require('gulp-clean-css');
// let sourcemaps = require('gulp-sourcemaps');
let postcss = require("gulp-postcss");
let gulp = require('gulp');
let watch = require("gulp-watch");

let plumber = require("gulp-plumber");
let sass = require('gulp-sass');



let browsers = ['last 2 versions', "ie >= 11"];
// 最新2バージョンまでプレフィックス付与

let sort_options = {
  'order': [
    'custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'
  ],

  'properties-order': 'alphabetical',

  'unspecified-properties-position': 'bottom'
}


//setting : paths
let paths = {
  'scss': '/opt/assets/scss/',
  'css': '/opt/assets/css/',
}
//setting : Sass Options
let sassOptions = {
  outputStyle: 'expanded'
  // outputStyle: 'compact'
  // outputStyle: 'compressed'
}

//Sass
gulp.task('scss', function () {
  return (
    gulp.src(paths.scss + '**/*.scss')
      .pipe(plumber())
      .pipe(sass(sassOptions))
      .pipe(postcss([
        require('postcss-sorting')(sort_options),
        require('autoprefixer')({ overrideBrowserslist: browsers, grid: true }),
        require('css-mqpacker'),
      ]))
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.css))
  );
});

gulp.task('watch', function () {
  gulp.watch(paths.scss + '**/*.scss', gulp.task('scss'));
});


gulp.task('default', gulp.series(gulp.parallel('watch'), function () {
}));


