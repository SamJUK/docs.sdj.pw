---
description: OpenVPN split routing configuration for selective traffic routing and development team optimization.
---
# OpenVPN Split Routing

When setting up a VPN you have the option to either route all traffic through, or only route specific traffic through it. Some of the benefits with split routing within a development team context are:

- Increased privacy
- Reduced VPN load, allowing more connections / less allocated resources
- Access to both local & VPN network resources while connected

## Server Configuration
Within your main server configuration file `server.conf` remove the `redirect-gateway` line if it exists. This line configures clients to route their default network gateway through the VPN. Causing all traffic including web & DNS lookups to go through the VPN.

```sh
sed -i '/push "redirect-gateway.*/d' server.conf
```

To configure a IP address to be split routed (the remote, e.g the web server). You appending the following to your `server.conf`

```sh
# Route a remote address (SSH/FTP/HTTP target etc)
push "route 1.1.1.1 255.255.255.255 vpn_gateway"

# If behind a proxy (e.g Cloudflare) you can whitelist the domain directly
push "route www.example.com 255.255.255 vpn_gateway"
```

You can include multiple push records for all the resources you want to route through the VPN. As well as using CIDR blocks to target whole IP ranges.

And finally restart the openvpn server for your changes to take effect.

```sh
systemctl restart openvpn-server@server
```