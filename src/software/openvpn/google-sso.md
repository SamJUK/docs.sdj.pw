---
description: OpenVPN Google SSO integration setup using OAuth2 authentication service and reverse proxy configuration.
---
# OpenVPN Google SSO

There are two main components to adding SSO to OpenVPN CE. The Authentication service, and a reverse proxy.

## Authentication Service
We are going to use the [openvpn-auth-oauth2 by jkroepke](https://github.com/jkroepke/openvpn-auth-oauth2). 

You can follow the installation instructions on the [Github Wiki](https://github.com/jkroepke/openvpn-auth-oauth2/wiki/Installation#installing-via-linux-packages).

Next create your Google OAUTH credentials by following the following [Wiki Guide](https://github.com/jkroepke/openvpn-auth-oauth2/wiki/Providers#google-cloud--google-workspace)

After the service is installed, and we have our Google OAuth credentials. We want to declare the config within: `/etc/sysconfig/openvpn-auth-oauth2`
```sh
# WebServer Config
CONFIG_HTTP_TLS=false
CONFIG_HTTP_LISTEN=:9000
CONFIG_HTTP_BASEURL=https://vpn.acme.co.uk
CONFIG_HTTP_SECRET=XXXXXXXXXXXXXXXX # Random generated secret for cookie encryption. Must be 16, 24 or 32 characters 

# OAUTH Config
CONFIG_OAUTH2_PROVIDER=google
CONFIG_OAUTH2_ISSUER=https://accounts.google.com
CONFIG_OAUTH2_CLIENT_ID=XXXXXXXX.apps.googleusercontent.com
CONFIG_OAUTH2_CLIENT_SECRET=XXXXXXXX

# OpenVPN Management Config - Declared under the `management` key in your openvpn-server.conf file
CONFIG_OPENVPN_ADDR=unix:///run/openvpn/server.sock
CONFIG_OPENVPN_PASSWORD=XXXXXXX
```

Next add the following to your `openvpn-server.conf` file
```sh
management-client-auth
auth-user-pass-optional
auth-gen-token 28800 external-auth
```

## Reverse Proxy
Next up is setting up a reverse proxy to handle the OAUTH2 callbacks. For this use your preferred web server of choice, and proxy the traffic from the domain to the port declared in the `CONFIG_HTTP_LISTEN` key from earlier.

Software | Guide
--- | ---
Nginx | https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-reverse-proxy-on-ubuntu-22-04
Caddy | https://caddyserver.com/docs/quick-starts/reverse-proxy
