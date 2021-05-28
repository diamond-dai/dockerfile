const path = require("path");
const glob = require("glob");

const srcFiles = "./src/**/*.ts*";
const entries = {};
// {key:value}の連想配列を生成
glob.sync(srcFiles, { ignore: './src/**/_*.ts*',}).map(function(file) {
  const key = file.replace("src/", "").replace(/\.tsx?$/, "");
  entries[key] = file;
});

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  // mode: 'development',

  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }
    ]
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  // // ES5(IE11等)向けの指定（webpack 5以上で必要）
  // target: ["web", "es5"],
  target: ["web", "es5"],
};
