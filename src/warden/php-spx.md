# Install PHP SPX in a Warden Environment

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