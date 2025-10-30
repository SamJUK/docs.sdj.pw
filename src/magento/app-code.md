---
description: Magento 2 app/code directory structure and module development guidelines for custom code organization.
---
# Magento 2 App/Code

The `app/code` folder in Magento 2 is where you can put module source code.

In production stores, **ONLY** modules that you are responsible for should exist here.

Any third party modules, should be managed via composer. 

If they are not distributed via composer, consider either using [composer artifacts](../general/composer.md#composer-artifacts), or repackage and distribute it via your private composer repository.