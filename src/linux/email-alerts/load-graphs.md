# Load Graph Emails

```sh
#!/usr/bin/env sh
#
# Generate server load graphs for the SAR data, and email to a set of users
# Run from a cron such as: 0 9 * * * /usr/bin/env sh /root/scripts/load-graphs.sh "user@example.co.uk" $(date +\%d -d yesterday)

SARVIEWER="/opt/sarviewer"

###############
# DO NOT EDIT #
#  MAIN CODE  #
###############

help () {
  echo " --> INVALID COMMAND

sh load-graphs.sh "\$EMAILS" [\$DATE]

Generate server load graphs from SAR output
 - \$EMAILS: Space separated list of emails to send the generated graphs to
 - \$DATE: Date to generate the graphs for in 2 digit format (01, 05, 10, 25, 30 etc). Prompts if missing
";

  exit 255;
}

EMAILS="$1"
if [ -z "$EMAILS" ]; then
  help
fi


# Either get date from arg or ask for it
if [ "$2" == "" ]; then
  read -p "What date to generate for? (02/12/28 etc) " DATE
  SAFILE="sa$DATE"
else
  SAFILE="sa$2"
fi

# Confirm it exists
if [ ! -f "/var/log/sa/$SAFILE" ]; then
  echo "[!] ERR: SAR File missing - $SAFILE"
  exit 1;
fi

# Generate Graphs
$SARVIEWER/system_data_reader.sh -f "$SAFILE"

IP=$(dig -4 +short ANY myip.opendns.com @resolver1.opendns.com)
echo "$(hostname)@$IP Server Load Graphs" | mail -s "$(hostname)@$IP Server Load Graphs" \
-a "$SARVIEWER/graphs/cpu.png" \
-a "$SARVIEWER/graphs/ram.png" \
-a "$SARVIEWER/graphs/swap.png" \
-a "$SARVIEWER/graphs/loadaverage.png" \
$EMAILS
```