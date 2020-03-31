const { src, dest, parallel, watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const gulpif = require('gulp-if');
const cached = require('gulp-cached');
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const postcssSorting = require('postcss-sorting');
const autoprefixer = require('autoprefixer');
const cssMqpacker = require('css-mqpacker')
const plumber = require("gulp-plumber");
const prettier = require('gulp-prettier');
const config = require('./config.json');

//setting : paths
const paths = {
  'scss': '/opt/assets/scss/',
  'css': '/opt/assets/css/',
}

console.log("options :");
console.log(config);

//Sass
const scss = () => {
  return (
    src(paths.scss + '**/*.scss')
      .pipe(cached('cache')) // ファイルをキャッシュさせて差分があるときのみbuild prettierでの変更をbuildし続けてしまうため
      .pipe(plumber())
      .pipe(prettier({ singleQuote: true }))
      .pipe(dest(file => file.base))
      .pipe(sass(config.sassOptions))
      .pipe(postcss([
        postcssSorting(config.sortOptions),
        autoprefixer(config.autoprefixerOptions),
        cssMqpacker,
      ]))
      .pipe(gulpif(config.sassOptions.outputStyle === 'compressed', cleanCSS()))
      .pipe(dest(paths.css))
  );
}

const watch_task = () => {
  watch(paths.scss + '**/*.scss', scss);
}

exports.scss = scss;
exports.watch_task = watch_task;
exports.default = parallel(watch_task);
