---
description: Magento database schema change detection and troubleshooting guide for setup upgrade issues.
---

# Debugging RequireJS Components with Developer Tools

When debugging Magento frontend functionality, especially checkout related functionality, you may need to load / interact with various require js components.



## Loading Components in the Browser Console

For example, to load the `quote` model and `checkoutData` component from the checkout module. We would run the following in the developer tools console. 

And this would provide us a interactive environment, where we can inspect the component state, and trigger methods on it.

```js
require([
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/checkout-data',
], function(quote, checkoutData) {
    debugger;
})
```