# Session Reaper (CVE-2025-54236)

Session Reaper (CVE-2025-54236) is the latest major security vulnerability that offers unauthenticated RCE in the Magento ecosystem.

From my understanding, you are at risk if the following applies:
- Has not applied the latest patch releases
- Has not manually applied the Session Reaper patch
- Uses File System Session Storage (NOT Redis)
- Not using SanSec Shield WAF (Cloudflare block some attempts - not all)

A more in-depth writeup is available at https://www.sdj.pw/posts/magento2-session-reaper-cve-2025-54236/

## Have I Been Compromised?


### 1. Backdoors / Malware scan
First, we will run a Malware scan to assert no Backdoors are present. We are looking for this to come back clean, with not Malware found. Vulnerabilities are ok for now, but you should address these ASAP.
```sh
curl "https://ecomscan.com" | sh
```

### 2. Malicious Session Files / Attempted Exploit
Next we check for Malicious session file uploads. Even if these are present, that does not necessarily mean you have been compromised. Just that someone has attempted the exploit against you. If you do not use file based session / applied the original Session Reaper patch, you should be safe.

If they are found, I suggest removing them, and we will patch this later.

```sh
find pub/media/customer/address_file/s/e/ -type f
```

## How to patch the vulnerabilities?

### 1. Session Reaper Patch

This is the official adobe released patch, that was released a while ago, that will prevent the execution of the maliciously uploaded session files. 

```sh
diff --git a/vendor/magento/framework/Webapi/ServiceInputProcessor.php b/vendor/magento/framework/Webapi/ServiceInputProcessor.php
index ba58dc2bc7acf..06919af36d2eb 100644
--- a/vendor/magento/framework/Webapi/ServiceInputProcessor.php
+++ b/vendor/magento/framework/Webapi/ServiceInputProcessor.php
@@ -246,6 +246,13 @@ private function getConstructorData(string $className, array $data): array
             if (isset($data[$parameter->getName()])) {
                 $parameterType = $this->typeProcessor->getParamType($parameter);
 
+                // Allow only simple types or Api Data Objects
+                if (!($this->typeProcessor->isTypeSimple($parameterType)
+                    || preg_match('~\\\\?\w+\\\\\w+\\\\Api\\\\Data\\\\~', $parameterType) === 1
+                )) {
+                    continue;
+                }
+
                 try {
                     $res[$parameter->getName()] = $this->convertValue($data[$parameter->getName()], $parameterType);
                 } catch (\ReflectionException $e) {
```

### 2. Prevent Malicious file upload

The session reaper patch does not prevent the `sess_*` files being uploaded to begin with. And there is no official advice / patch on resolving this.

Instead the advice is, to disable the address file upload controller, unless you specifically need to the customer address file upload functionality.

This can be achieved with the following patch.

```diff
--- a/vendor/magento/module-customer/Controller/Address/File/Upload.php
+++ b/vendor/magento/module-customer/Controller/Address/File/Upload.php
@@ -70,6 +70,7 @@
      */
     public function execute()
     {
+        http_response_code(400);exit;
         try {
             $requestedFiles = $this->getRequest()->getFiles('custom_attributes');
             if (empty($requestedFiles)) {
```

### 3. Sansec Shield

Additionally to all this, whilst not mandatory, I highly suggest running Sansec Shield.

This is Sansec's WAF product, and has active WAF rules that prevent both the file upload & execution, even for unpatched sites.

This is not an excuse to avoid patching, but can be useful for added security / to buy a bit of extra time as attack methods evolve.



