---
description: Linux file integrity checking using MD5 hashes to detect unauthorized file modifications and security breaches.
---
# File Integrity Check

The purpose of file integrity checking, is ensure the content of a file has not been unexpectedly modified. 

## Generating Hashes
The actual process of generating the hashes is quite simple, we can just combine find with md5sum with relevant exclusions for our application. 

```sh
find "/var/www/vhosts/prod.example.com/htdocs/vendor/" -type f ! -path "*/cache/*" -exec md5sum {} +
```


## Control
First we need to generate the control, this is a set of hashes that we know are good. (Usually this would be apart of the build process). 

Then we need to store this set of hashes somewhere accessible. It should not be accessible from the host of the application we are monitoring to prevent tampering. Potentially a S3 bucket.

## Validating the hash

When we want to validate the hashes, we can regenerate the hashes on the remote. And compare them with the control we saved before. 

Ideally this process should take place away from the host in question. Potentially a purpose specific server, or as a CI scheduled task.

```sh
scp storage-server:/var/file-integrity-hashes/example-client/control.txt /tmp/control.txt
ssh target-server 'find /var/www/... -type f -exec md5sum {} +' > /tmp/hashes.txt

diff /tmp/control.txt /tmp/hashes.txt
```