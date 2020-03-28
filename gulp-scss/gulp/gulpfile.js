const cleanCSS = require('gulp-clean-css');
// let sourcemaps = require('gulp-sourcemaps');
const gulp = require('gulp');
const cached = require('gulp-cached');
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const postcssSorting = require('postcss-sorting');
const autoprefixer = require('autoprefixer');
const cssMqpacker = require('css-mqpacker')
const plumber = require("gulp-plumber");
const prettier = require('gulp-prettier');


const browsers = ['last 2 versions', "ie >= 11"];
// 最新2バージョンまでプレフィックス付与

const sortOptions = {
  'order': [
    'custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'
  ],
  'unspecified-properties-position': 'bottom'
}

//setting : paths
const paths = {
  'scss': '/opt/assets/scss/',
  'css': '/opt/assets/css/',
}

//setting : Sass Options
let sassOptions = {
  outputStyle: 'expanded'
  // outputStyle: 'compressed'
}

//Sass
gulp.task('scss', function () {
  return (
    gulp.src(paths.scss + '**/*.scss')
      .pipe(cached('cache')) // ファイルをキャッシュさせて差分があるときのみbuild prettierでの変更をbuildし続けてしまうため
      .pipe(plumber())
      .pipe(prettier({ singleQuote: true }))
      .pipe(gulp.dest(file => file.base))
      .pipe(sass(sassOptions))
      .pipe(postcss([
        postcssSorting(sortOptions),
        autoprefixer({ overrideBrowserslist: browsers, grid: true }),
        cssMqpacker,
      ]))
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.css))
  );
});

gulp.task('watch', () => {
  gulp.watch(paths.scss + '**/*.scss', gulp.task('scss'));
});

gulp.task('default', gulp.series(gulp.parallel('watch'), () => {
}));
