---
description: Magento 2 uncacheable block identification and debugging techniques for performance optimization and caching issues.
---
# Identify Uncacheable Blocks

## Find / Grep XML files

Usually the problem is within 3rd party XML layout files. We can quickly search these with the following grep.

If you want to include core code, you can remove the not segment.

```sh
find vendor app/code app/design -not \( -path vendor/magento -prune \)  -name \*.xml -exec grep -li "cacheable.*false" {} +
```

## Logger - Patch File

Simple patch file, to write uncacheable blocks to the log file. This should cover both uncachable being set within the XML, as well as being modified by plugins.

```diff
--- vendor/magento/framework/View/Layout.php
+++ vendor/magento/framework/View/Layout.php
@@ -1128,7 +1128,7 @@
             $blockName = $element->getBlockName();
             if ($blockName !== false && $this->structure->hasElement($blockName)) {
                 $cacheable = false;
-                break;
+                $this->logger->info("Uncacheable Block: \"{$blockName}\" for handles: " . json_encode($this->getUpdate()->getHandles()));
             }
         }

```

## Template Layer

Short snippet to include on any page to identify any uncacheable blocks being loaded.

![Image of the uncachable blocks DOM element the code snippet adds](/images/uncacheable-blocks.jpg)

```php
<?php
    // @START: Non cacheable Block Identification
    $layout = $this->getLayout();
    $r = new ReflectionMethod(get_class($layout), 'getXml');
    $r->setAccessible(true);
    $xml = $r->invoke($layout);
    $ncb = $xml->xpath('//' . \Magento\Framework\View\Layout\Element::TYPE_BLOCK . '[@cacheable="false"]');
    $cnt = count($ncb);
    echo '<div style="position: fixed;bottom: 0;left: 0;z-index: 72349872398457982374982374897239847239847923742374;background: #eaeaea;padding: 20px;border: 2px solid #00000042;color: black;">';
    echo "<h2 style='font-size: 24px;font-weight: bold;color: #000000e3;border-bottom: 1px solid #0000002b;margin-bottom: 10px;'>$cnt Uncachable Blocks</h2>";
    foreach($ncb as $b) {
        echo "<p style='margin-bottom: 0;'>{$b->getBlockName()}</p>";
    }
    echo '</div>';
    // @END: Non cacheable Block Identification
?>
```
