# CPU Usage Alerts

```sh
#!/usr/bin/env bash
#
# Send an email alert when 1 minute load average exceeds a certain threshold

# Load Average Threshold to alert at - Typical advice is to set this at the core/thread count.
THRESHOLD=8
EMAILS="user@example.com"

#########################
#  - DON'T EDIT BELOW - #
#  - MAIN APPLICATION - #
#########################
CPUUSAGE=$(awk '{print $1}' /proc/loadavg)
if [[ 1 = $(echo "$CPUUSAGE > $THRESHOLD" | bc -l) ]]; then
    BUFFER=$(mktemp)
    DIVIDER="+------------------------------------------------------------------+"

    echo "CPU Current Usage Is: $CPUUSAGE%" >> $BUFFER
    echo "$DIVIDER" >> $BUFFER
    echo "Top CPU Process Using top command" >> $BUFFER
    echo "$DIVIDER" >> $BUFFER
    echo "$(top -bn1 | head -n20)" >> $BUFFER
    echo "$DIVIDER" >> $BUFFER
    echo "Top CPU Process Using ps command" >> $BUFFER
    echo "$DIVIDER" >> $BUFFER
    echo "$(ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10)" >> $BUFFER

    IP=$(dig -4 +short ANY myip.opendns.com @resolver1.opendns.com)
    mail -s "ATTENTION: CPU Load Is High On $(hostname)@$IP at $(date)" $EMAILS < $BUFFER
    rm $BUFFER
fi
```