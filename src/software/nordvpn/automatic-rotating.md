---
description: NordVPN automatic connection rotation script with cron and systemd timer configuration for location switching.
---
# NordVPN rotating connection 

Script to rotate Nordvpn connection location. Can be configured as a Cron / Systemd timer for automatic rotating.

```sh
#!/usr/bin/env bash
if [[ $(shuf -i 0-10 -n 1) > 5 ]]; then
    vpn_country_list=($(nordvpn countries | tr "\n" " " | sed -e's/  */ /g'))
    vpn_country=${vpn_country_list[ $RANDOM % ${#vpn_country_list[@]} ]}

    vpn_cities_list=($(nordvpn cities $vpn_country | tr "\n" " " | sed -e's/  */ /g'))
    vpn_city=${vpn_cities_list[ $RANDOM % ${#vpn_cities_list[@]} ]}

    echo "Connecting VPN to $vpn_city"
    nordvpn connect $vpn_city
else
    echo "No VPN change required"
fi
```