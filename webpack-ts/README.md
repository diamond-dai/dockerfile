# docker-webpack-ts

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

### 本番用build

コンテナ内で下記実行

```
npm run build
```