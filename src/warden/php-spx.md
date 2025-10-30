---
description: PHP SPX profiler installation and configuration guide for Warden development environments with built-in UI.
---
# Install PHP SPX in a Warden Environment

PHP SPX is a simple, free and open source profiler. It covers both FPM and CLI requests, and provides a built-in UI to visualise the generated reports.

For more information, please see the [PHP SPX Github Repository](https://github.com/NoiseByNorthwest/php-spx) or [Demo Report](https://noisebynorthwest.github.io/php-spx/demo/report.html?key=spx-full-20191229_175636-06d2fe5ee423-3795-233665123).

## v0.15.0

The Warden 0.15.0 release starts to implement official support for PHP SPX. Building the relevant docker images & making the relevant configuration changes within Nginx/Varnish.

See the following [Github Comment](https://github.com/wardenenv/images/pull/17#issuecomment-2481416521) on instructions on how to enable it on a project per project basis.

And the following [Pull Request](https://github.com/wardenenv/warden/pull/820) is currently open to finish the implementation.


## Below v0.15.0

For warden versions `0.14.3` and below, we can run the following script from the host machine whilst within a warden project.

```sh
#!/usr/bin/env sh
#
# A fairly simple shell script to install and configure PHP-SPX within a Warden.dev Environment
# 
# Usage:
#  - Download the script: `curl https://... > ~/warden-install-spx.sh` 
#  - Set Permissions on the script `chmod +x ~/warden-install-spx.sh`
#  - cd to your warden project `cd ~/Projects/magento.test`
#  - Run the downloaded script `sh ~/warden-install-spx.sh`
#
#  - Navigate to the SPX control panel `https://app.mywebsite.test/?SPX_KEY=dev&SPX_UI_URI=/` and enable profiling
#  - Hit the pages you want to profile
#  - Navigate back to the SPX control panel to view the traces
#
set -e

echo "-------------------------"
echo " Warden SPX Installation "
echo "-------------------------"

echo "[i] Checking if this is a Warden Project"
warden env config >/dev/null

echo "[i] Checking if SPX is already installed"
RC=$(warden shell -c "php -m | grep SPX; echo $?")
[ "$RC" != "0" ] && exit 255

echo "[i] Installing Dependencies"
warden shell -c "sudo yum install -y php-devel"

echo "[i] Downloading SPX Source Code"
warden shell -c "rm -rf /tmp/spx; git clone https://github.com/NoiseByNorthwest/php-spx.git /tmp/spx"

echo "[i] Building SPX Extension"
warden shell -c "cd /tmp/spx && phpize && ./configure && make && sudo make install"

echo "[i] Writing SPX Configuration"
warden shell -c "
cat - <<EOF | sudo tee -a /etc/php.d/99-spx.ini
extension=spx.so
spx.debug=1
spx.http_enabled=1
spx.http_ip_whitelist=*
spx.http_key=dev
spx.http_trusted_proxies=REMOTE_ADDR
EOF
"

echo "[i] Add Varnish Cache Bypass"
warden env exec varnish sh -c "sed -i '#^.*SPX_ENABLED.*$#d' /etc/varnish/default.vcl"
warden env exec varnish sh -c "sed -i 's#sub vcl_recv {#sub vcl_recv {\nif (req.url ~ \"SPX_UI_URI|SPX_KEY\" || req.http.Cookie ~ \"SPX_ENABLED\") { return (pass); }#g' /etc/varnish/default.vcl"

echo "[i] Reloading Varnish Config"
T=$(date +%s)
warden env exec varnish sh -c "varnishadm vcl.load reload$T /etc/varnish/default.vcl; varnishadm vcl.use reload$T;"

echo "[i] Restarting PHP-FPM Container"
warden env restart php-fpm
```