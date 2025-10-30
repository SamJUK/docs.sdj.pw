---
description: Varnish cache flushing techniques using varnishadm ban commands for selective and complete cache invalidation.
---
# Varnish Flush

We are going to be using primarily the `ban`command within the `varnishadm` tool. You want to run this command, while connecting to the server running Varnish.

## Flushing the entire Cache

```sh
varnishadm "ban req.http.host ~ .*"
```

## Flushing A Single Varnish Page
If we want to flush a single page from varnish, we can filter on `req.url` which will be the URI of the page. For example if we want to purge the contact page, we could run the following
```sh
varnishadm "ban req.url == /contact"
```

Now if we want to purge all pages starting with the word `test-` we could run
```sh
varnishadm "ban req.url ~ /test-"
```

If we want to target a single store / storefront, we can also include a filter on `req.http.host`
```sh
varnishadm "ban req.url == /contact && req.http.host == www.example.com"
```

## Flushing an entire Storefront / Site
If we want to flush an entire storefront / site, we can run the ban command, specifying just the `req.http.host`
```sh
varnishadm "ban req.http.host == www.example.com"
```

## Flushing Singular Products
Getting a bit more complex / Magento specific, we can flush singular products and all the category / CMS pages that product is referenced in. Todo this we can use the `X-Magento-Tags-Pattern` tag and the product ID.
For example if we want to flush product ID 512, we would use the following CURL Command
```sh
curl -XPURGE -H 'X-Magento-Tags-Pattern: (^|,)cat_p_512(,|$)' localhost:6081
```
