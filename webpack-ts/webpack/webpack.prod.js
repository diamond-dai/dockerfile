const merge = require('webpack-merge').merge; // webpack-merge
const common = require('./webpack.common.js'); // 汎用設定をインポート

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// common設定とマージする
module.exports = merge(common, {
  mode: 'production', // 本番モード
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {drop_console: true}
        }
      })
    ],
  },
})