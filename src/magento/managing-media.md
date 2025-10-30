---
description: Magento media management strategies for downstream environments using union file systems and database anonymization.
---
# Managing Media

Managing media in downstream environments can be difficult when regularly using anonymised production databases.

## Union File System

Using a Union File System, alongside a remote file system is very powerful and solves a lot of draw backs from the other solutions.

It means we can use a remote File System such as [httpdirfs](https://github.com/fangfufu/httpdirfs) or [sshfs](https://github.com/libfuse/sshfs) mount the production media as a read only local directory such as `pub/media-remote`

Then we can use a Union File System, to 'virtually merge' our local `pub/media` directory that contains all our local content, and the mounted Remote File system of the production media.

> NOTE: We typically mount the media from our backup orchestrator server, which keeps an up to date replicated copy of the production media directory. To avoid potentially performance issues & reduce production access when using sshfs.

::: info
@TODO: Instructions on how to configure.
:::

## Rsync

The simple solution, is just to download a clone of the production media with a tool like rsync. There are few downsides to this approach.

- Each developer requires production access
- Production performance impacts 
- Significant disk space needed especially if maintaining multiple projects

```sh
rsync -avz user@hostname /var/www/vhosts/prod.client.example.com/htdocs/pub/media/ pub/media/
```

## OnDemand

This is similar to the rsync approach, but instead of bulk downloading the assets in one go from the source. We either download or proxying the assets on demand. 

This can be achieved this by modifying the `pub/get.php` file. 
```diff
--- pub/get.php
+++ pub/get.php
@@ -81,6 +81,9 @@
                 );
                 $transfer->send($fileAbsolutePath);
                 exit;
+            } else {
+                echo file_get_contents("https://media.example.com/$relativePath");
+                exit;
             }
         }
     }
```

::: info
@TODO: Update Patch to include download variant
:::

## Remote Drive
If you manage your production media via remote storage. You can directly mount the production media drive as a read only file system.

Configuring this depends on how your filesystem infrastructure is setup. Some references are:

OS | FS | Link
--- | --- | ---
MacOS | S3 | https://github.com/s3fs-fuse/s3fs-fuse
MacOS | NFS | https://tisgoud.nl/2020/10/persistent-nfs-mount-points-on-macos/
MacOS | GlusterFS | Can be mounted via the NFS implementation