# docker-php-apache-ext

wpコンテナに以下インストール
* wp-cli
* composer
* mhsendmail
* python3
* mysql-client

### buildして接続

```
./run.sh
```

rootから wpコマンド実行
```sh
sudo -u www-data wp
```
