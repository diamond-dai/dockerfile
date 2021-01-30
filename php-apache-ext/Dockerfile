FROM php:7.4-apache

RUN apt update && apt install -y --no-install-recommends \
  # install mysql-client
  default-mysql-client \

  # install for pyenv
  build-essential \
  libffi-dev \
  libssl-dev \
  zlib1g-dev \
  libbz2-dev \
  libreadline-dev \
  libsqlite3-dev \

  # install util
  git \
  sudo \
  less \
  vim \
  git \
  zip \
  unzip \
  rsync \

  # cleanup
  && rm -rf /var/lib/apt/lists/* \
  && apt clean

ENV HOME /root
ENV PYENV_ROOT $HOME/.pyenv
ENV PATH $PYENV_ROOT/bin:$PATH

# Download pyenv
RUN git clone https://github.com/pyenv/pyenv.git ~/.pyenv \
  && echo 'eval "$(pyenv init -)"' >> ~/.bashrc \
  && . ~/.bashrc \
  && PYTHON_VER=$(pyenv install --list | grep -v - | grep -v b | grep -v a | grep -v rc | tail -1) \
  && pyenv install $PYTHON_VER \
  && pyenv global $PYTHON_VER

# enable modules
RUN a2enmod rewrite \
  && a2enmod include \
  && a2enmod headers

# Countermeasures against events that cache does not disappear
RUN  sh -c "echo 'EnableSendfile off' >> /etc/apache2/apache2.conf" \

  # install wp-cli
  && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
  && chmod +x wp-cli.phar \
  && mv wp-cli.phar /usr/local/bin/wp \
  && mkdir -p /var/www/.wp-cli/cache \
  && chown -R www-data /var/www/.wp-cli \
  && mkdir /var/www/.composer/ \
  && chown -R www-data /var/www/.composer \

  # install composer
  && curl -sS https://getcomposer.org/installer | php \
  && mv composer.phar /usr/local/bin/composer \

  # install mhsendmail
  && curl -sSLO https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64 \
  && chmod +x mhsendmail_linux_amd64 \
  && mv mhsendmail_linux_amd64 /usr/local/bin/mhsendmail \
  && echo 'sendmail_path = "/usr/local/bin/mhsendmail --smtp-addr=mailhog:1025"' > /usr/local/etc/php/conf.d/sendmail.ini

# keep env
RUN sed -i -e 's/^Defaults.*env_reset/Defaults env_keep \+= \"PATH\"/g' /etc/sudoers

# add php conf
RUN  echo '\
log_errors = On\n\
error_log = /proc/self/fd/2\n\
error_reporting = E_ALL\n\
' >> /usr/local/etc/php/conf.d/debug.ini

# ext install
RUN  apt update && apt install -y --no-install-recommends \
  libfreetype6-dev \
  libjpeg-dev \
  libmagickwand-dev \
  libjpeg62-turbo-dev \
  libpng-dev \
  ghostscript \
  libzip-dev \
  ; \
  rm -rf /var/lib/apt/lists/*; \
  apt clean; \
  docker-php-ext-install -j "$(nproc)" \
  bcmath \
  exif \
  mysqli \
  opcache \
  zip \
  ; \
  pecl install imagick-3.4.4; \
  docker-php-ext-enable imagick; \