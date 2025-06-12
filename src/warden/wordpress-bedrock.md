# Warden Development

Using Warden to run Wordpress through the [Roots Bedrock](https://roots.io/bedrock/) distribution, requires a few configuration tweaks to get started.

## Configuration
Bedrock serves the public content from the `web` subdirectory. And requires all requests to be routed through index.php. So we will need to update the nginx configuration.

Start with creating/updating a `.warden/warden-env.yml` file located in the project root.
```yml
services:
  nginx:
    environment:
      - NGINX_PUBLIC=/web
    volumes:
      - ./.warden/nginx.conf:/etc/nginx/available.d/application.conf
```

And next create a file `.warden/nginx.conf` with the following content.
```conf
location ~* /\.(?!well-known).* { return 403; }


location ~* /app/uploads/.*.php$ {
    deny all;
}

rewrite ^/(wp-.*.php)$ /wp/$1 last;
rewrite ^/(wp-(content|admin|includes).*) /wp/$1 last;

location / {
    try_files $uri $uri/ /index.php?q=$uri&$args;
}

location ~ \.php$ {
    expires off;

    try_files $uri =404;
    fastcgi_pass $fastcgi_backend;
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    fastcgi_intercept_errors on;
    fastcgi_index  index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param  PATH_INFO $fastcgi_script_name;
    include fastcgi_params;
}
```

