# OpenVPN Installation

You can simplify OpenVPN installation by using the OpenVPN installation script by NYR https://github.com/Nyr/openvpn-install

On your target installation server, run the following to download and execute the script from your home directory.

```sh
wget https://github.com/Nyr/openvpn-install/raw/master/openvpn-install.sh -O ~/openvpn-install.sh
bash ~/openvpn-install.sh
```

Default options you can choose are:
- UDP Protocol
- Port 1194
- DNS Server 1.1.1.1

After the installer runs, you can now connect to the VPN, and you can rerun the script to add/remove clients or uninstall OpenVPN.

