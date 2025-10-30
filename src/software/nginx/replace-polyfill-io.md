---
description: Nginx configuration for replacing compromised Polyfill.io CDN after malware supply chain attack.
---
# Replacing Polyfill.io with Nginx

The Polyfill.io CDN was taken over by a malicious party, which then started serving Malware from it. See: <br> https://sansec.io/research/polyfill-supply-chain-attack

## Option 1: Nginx Configuration
First make sure you have the Nginx sub module installed. You can check this by running `nginx -V | grep http_sub_module`. 

If the module is missing, you will need to install / update Nginx to a distribution that contains it first.

The following configuration is from a Magento Nginx config sample, although it can be adapted for content served through Nginx.

```nginx
...
# PHP entry point for main application
location ~ ^/(index|get|static|errors/report|errors/404|errors/503|health_check)\.php$ {
    sub_filter 'cdn.polyfill.io' 'cdnjs.cloudflare.com/polyfill';
    sub_filter_once off;
    ...
}
...
```


## Option 2: Magento (Application level) Fix
And the best way to resolve this issue is on the application level.

You can either do this by updating any modules loading scripts from the polyfill.io domain. Or if there is no update, you can write a composer patch https://github.com/cweagans/composer-patches to replace the url. This will then persist across fresh composer installs / updates.