# Identify Uncacheable Blocks

Short snippet to include on any page to identify any uncacheable blocks being loaded. Usually I dump this into the header or logo .phtml files. 

Future task to convert into a separate module or potentially a standalone patch file. 

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