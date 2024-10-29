# Block Tor Exit Routes

First, you can block this traffic via Cloudflare by clicking some buttons. See the following post. <br> https://community.cloudflare.com/t/tor-traffic-blocking/396979/3

## IPTables / Firewall
First make sure you have `ipset` installed. Essentially a tool to make managing lists of IPs for iptable rules simpler and more performant. 
```sh
apt-get install ipset
dnf install ipset
```

Next create a scheduled task (I'll use a cronjob) that will ensure we always have an up to date copy of the exit nodes (they can change overtime)
```sh
install -m 744 /dev/null /opt/update-ipset-tor-exitnodes

cat > /opt/update-ipset-tor-exitnodes<< EOF
#!/usr/bin/env sh
echo "create tor hash:ip family inet hashsize 1024 maxelem 65536" > /tmp/tor-exitnodes.txt
curl 'https://check.torproject.org/torbulkexitlist?ip=' | sed 's/^/add tor /' >> /tmp/tor-exitnodes.txt
ipset restore -! < /tmp/tor-exitnodes.txt
EOF

echo "0 0 * * * root /opt/update-ipset-tor-exitnodes" > /etc/cron.d/update-ipset-tor-exitnodes
```

Finally lets populate our ipset, before we can add our iptables rule to block the set.
```sh
/opt/update-ipset-tor-exitnodes
iptables -A INPUT -m set --match-set tor src -j DROP
```