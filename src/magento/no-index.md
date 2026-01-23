---
description: Magento 2 CLI commands to set noindex for all store views in pre production environments.
---
# Magento 2 Pre Production - Robots No Index

Bulk update robots.txt and meta robots tags to noindex for all store views via CLI for pre production stores.

```bash
for id in $(n98-magerun2 sys:website:list --skip-root-check --format csv | awk -F, '($1 != "id") {print $1}'); do
    n98-magerun2 config:store:set --skip-root-check --scope=websites --scope-id=$id design/search_engine_robots/custom_instructions "User-agent: *\nDisallow: /"
    n98-magerun2 config:store:set --skip-root-check --scope=websites --scope-id=$id design/search_engine_robots/default_robots 'NOINDEX,NOFOLLOW'
    bin/magento cache:flush
done
```
