---
description: Magento scratch file template for persistent code execution beyond single n98-magerun dev:console commands.
---
# Magento Scratch File

Scratch file template for when you need a bit of persistence or to run a block of code instead of single commands with `n98-magerun dev:console`.

Place this within your Magento root directory, and execute it with the PHP cli.

```php
<?php

use Magento\Framework\App\Bootstrap;
require __DIR__ . '/app/bootstrap.php';
error_reporting(E_ALL & ~E_NOTICE);
$bootstrap = Bootstrap::create(BP, $_SERVER);
$obj = $bootstrap->getObjectManager();

// $state = $obj->get('Magento\Framework\App\State');
// $state->setAreaCode('adminhtml');
```