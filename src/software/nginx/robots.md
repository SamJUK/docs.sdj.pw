---
description: Nginx configuration for disabling search engine indexing using X-Robots headers on development sites.
---
# Disable Indexing with Nginx via X-Robots

Set X-Robots via Nginx to disallow indexing/crawling of development/pre-production sites.

```conf
add_header  X-Robots-Tag "noindex, nofollow, nosnippet, noarchive";
```
