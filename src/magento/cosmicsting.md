---
description: CosmicSting CVE-2024-34102 security vulnerability guide for Magento and Adobe Commerce stores with detection and mitigation steps.
---
# Cosmicsting CVE-2024-34102
CosmicSting (aka CVE-2024-34102) is the worst bug to hit Magento and Adobe Commerce stores in two years. Allowing read access to private files containing system credentials. And paired with other exploits, RCE can be achevied granting an attacker full system control.



## Check if you store is Vulnerable to CosmicSting

Most Malware scanners such as Magento Security Scanner / SanSec will now flag Cosmicsting in their reports.

I highly recommend starting by running a Malware Scan with [Ecomscan by SanSec](https://sansec.io/#ecomscan) (its free, although wont tell you the location of the infections). 

Over on [Github at SamJUK/cosmicsting-validator](https://github.com/SamJUK/cosmicsting-validator) I've released the POC we've used alongside a bash script to easily check across all the domains you host. We caught a few instances that we missed (public available demo stores & development sites) after piping in our exported DNS records.

Alongside the above, I've also released a validator over at [https://cosmicsting.samdjames.uk/](https://cosmicsting.samdjames.uk/)

## How to patch CosmicSting (CVE-2024-34102)
That is fairly simple, update to the latest Magento security patch.

If you are unable todo that in a timely fashion, then it can be accomplished by applying the following diff. You can even apply this patch directly on the server via the `patch` tool by running `patch -p1 < /the/path/to/the/patch.diff`. Although typically we would apply this with the `cweagans/composer-patches`.

```diff
diff --git a/vendor/magento/framework/Webapi/ServiceInputProcessor.php b/vendor/magento/framework/Webapi/ServiceInputProcessor.php
index cd7960409e1..df31058ff32 100644
--- a/vendor/magento/framework/Webapi/ServiceInputProcessor.php
+++ b/vendor/magento/framework/Webapi/ServiceInputProcessor.php
@@ -278,6 +278,12 @@ class ServiceInputProcessor implements ServicePayloadConverterInterface, ResetAf
         // convert to string directly to avoid situations when $className is object
         // which implements __toString method like \ReflectionObject
         $className = (string) $className;
+        if (is_subclass_of($className, \SimpleXMLElement::class)
+            || is_subclass_of($className, \DOMElement::class)) {
+            throw new SerializationException(
+                new Phrase('Invalid data type')
+            );
+        }
         $class = new ClassReflection($className);
         if (is_subclass_of($className, self::EXTENSION_ATTRIBUTES_TYPE)) {
             $className = substr($className, 0, -strlen('Interface'));
```

## How to secure your store after patching?
Whilst patching the store will prevent future CosmicSting infections. We have to assume any existing data has been compromised. A rough overview of the steps you need to take after patching are:

1. Run a Ecomscan by SanSec to identify any current infections & remove them.
2. Rotate your CRYPT key, the [gene/module-encryption-key-manager](https://github.com/genecommerce/module-encryption-key-manager) module covers that pretty well.
3. Enable Ecomscan schedule task, and monitor for the next few months to confirm no reinfections.

