# Service Watchdog Alerts
The service watchdog script, monitors a preset list of installed software. And if its detected as not running, triggers an alert.

```sh
#!/usr/bin/env sh
#
# ====== #
# CONFIG #
# ====== #

client="acme"
alert_email_recipients="admin@example.com sre@example.com"
services="nginx php8.3-fpm elasticsearch mysql redis redis2 redis3 rabbitmq-server"
discord_webhook="xxxxxxx/xxxxxxxxxx"

# =========== #
# DO NOT EDIT #
# =========== #

code=0
report="Service Watchdog Report\n\nServer: $client\nHostname: $(hostname)\nDate: $(date)\n"
for service in $(echo $services); do
  systemctl is-active --quiet $service
  if [ "$?" = "0" ]; then
    out="✅ $service : UP"
  else
    out="❌ $service : DOWN"
    code=1
  fi

  report="$report\n$out"
done

echo -e $report

if [ "$code" != "0" ]; then
  # Email Alerts
  echo -e $report | mail -s "[CRITICAL] Service Watchdog $client spotted failed services" $alert_email_recipients

  # Discord Webhook
  [ ! -z "$discord_webhook" ] && curl -s -i -X POST -H "Accept: application/json" -H "Content-Type:application/json" \
    --data "{\"username\": \"SVC WatchDog\", \"avatar_url\": \"https://avatars.githubusercontent.com/u/7872420?v=4\", \"content\": \"$report\"}" \
    https://discord.com/api/webhooks/$discord_webhook > /dev/null
fi

exit $code
```
