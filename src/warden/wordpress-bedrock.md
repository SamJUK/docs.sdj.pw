# Warden Development

Using Warden to run Wordpress through the [Roots Bedrock](https://roots.io/bedrock/) distribution, requires a few configuration tweaks to get started.

## Configuration
Bedrock serves the public content from the `web` subdirectory. So update that within the `.warden/warden-env.yml` file located in the project root.
```yml
services:
  nginx:
    environment:
      - NGINX_ROOT=/var/www/html/web
```

Merge the following with your `.env` configuration. Bedrock shares from ENV variable names with those already declared within warden, for example (`DB_PASSWORD` & `DB_NAME`). So those do not need to be set.
```sh
# Bedrock
DB_NAME=wordpress
DB_USER=wordpress
WP_ENV=production
WP_HOME=https://app.wordpress.test
WP_SITEURL=https://app.wordpress.test/wp
```