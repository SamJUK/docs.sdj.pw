# OpenVPN Static Client IPs

We can make sure the clients connection to the VPN are always assigned the same internal IP by setting the following property within the `server.conf` file.

```sh
ifconfig-pool-persist /etc/openvpn/server/ovpn-user-ipp.txt
```

If we want to preassign / modify what IP address is assigned to each client, we can modify the file above using the following format.

```csv
User1,10.8.0.2
User2,10.8.0.3
Admin1,10.8.0.10
Admin2,10.8.0.11
```


Make sure to restart the server to apply any changes made to the `server.conf` file
```sh
systemctl restart openvpn-server@server
```