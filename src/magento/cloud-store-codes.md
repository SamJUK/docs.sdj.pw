# Adobe Cloud Store Codes

Updated Adobe Cloud `magento-vars.php`, utilising the match functionality from PHP8. Supporting CNAMEs, magentosite.cloud and store code subdomains.

```php
<?php
if ($_SERVER["MAGE_RUN_TYPE"] || $_SERVER["MAGE_RUN_CODE"]) { return; }

$host = $_SERVER['HTTP_HOST'] ?? '';
$ephemeralHostScope = fn(string $host): ?string => substr_count($host, '.') === 4 ? strtok($host, '.') : null;

$_SERVER["MAGE_RUN_TYPE"] = 'store';
$_SERVER["MAGE_RUN_CODE"] = match(true) {
    $ephemeralHostScope($host) === 'us' || str_contains($host, 'example.com') => 'us',
    $ephemeralHostScope($host) === 'gb' || str_contains($host, 'example.co.uk') => 'gb',
    $ephemeralHostScope($host) === 'cn' || str_contains($host, 'example.cn') => 'cn',
    default => 'base'
};
```
