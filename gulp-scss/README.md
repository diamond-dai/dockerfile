# docker-gulp-sass

### buildして接続

```
./run.sh
```

### package.json の ver up

ホストで以下を実行 nodeがインストール済みであること

```sh
cd gulp
npm install -g npm-check-updates
ncu -u
```

### config上書き

ホストにgulpconfig.jsonを作成し下記のパスにマウント

```
/opt/gulpconfig.json
```

内容

```json
{
  "sassOptions": {
    "outputStyle": "compressed"
  },
  "autoprefixerOptions": {
    "overrideBrowserslist": ["last 2 versions", "ie >= 11"],
    "grid": true
  },
  "sortOptions": {
    "order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "at-rules",
      "rules"
    ],
    "unspecified-properties-position": "bottom"
  }
}
```

outputStyleには以下が指定できる

* nested
* expanded
* compact
* compressed


### 参考

sassOptions
https://github.com/sass/node-sass

autoprefixerOptions
https://www.npmjs.com/package/autoprefixer

sortOptions
https://www.npmjs.com/package/postcss-sorting