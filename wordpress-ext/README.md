# wordpress-ext

wpコンテナに以下インストール
* wp-cli
* composer
* mhsendmail
* python3
* mysql-client


docker container run -it --name NAME IMAGE bash

### buildして接続

```
./run.sh
```

rootから wpコマンド実行
```sh
sudo -u www-data wp
```
