# Ubuntu

## Changed Repository URL
When trying to install / update a package, you might be met with an error (like below) from a repository changing its source urls. 

```
E: Repository 'https://packages.redis.io/deb jammy InRelease' changed its 'Origin' value from '' to 'packages.redis.io'
N: Repository 'https://packages.redis.io/deb jammy InRelease' changed its 'Suite' value from '' to 'jammy'
N: This must be accepted explicitly before updates for this repository can be applied. See apt-secure(8) manpage for details.
Do you want to accept these changes and continue updating from this repository? [y/N]
```

To resolve this you need to update your packages and supply a flag to allow the updates source.

```sh
apt-get update --allow-releaseinfo-change
```