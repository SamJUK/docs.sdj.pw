# PHP - General

## Quick Start - Docker Environment

Quick start, single container docker environment running PHP-FPM and nginx.

```sh
docker run --rm -p 8005:8080 -v .:/var/www/html trafex/php-nginx
```
