---
description: Linux disk space monitoring script with email alerts for proactive system maintenance and storage management.
---
# Disk Space Alerts

```sh
#!/usr/bin/env bash
#
# Monitor the disk space and trigger an email alert
# If the free space is less than the $ALERT threshold (default 90%).
#
# ============= #
# CONFIGURATION #
# ============= #

EMAILS="admin@domain.com"
ALERT=90

# Exclude list of unwanted monitoring, if several partitions then use "|" to separate the partitions. | E.G: EXCLUDE_LIST="/dev/hdd1|/dev/hdc5"
EXCLUDE_LIST=""


# =============================== #
# DO NOT EDIT, MAIN PROGRAM BELOW #
# =============================== #

BUFFER=""

function main_prog() {
  while read output;
  do
    usep=$(echo $output | awk '{ print $1}' | cut -d'%' -f1)
    partition=$(echo $output | awk '{print $2}')
    free=$(echo $output | awk '{print $3}')

    if [ $usep -ge $ALERT ] ; then
      BUFFER+="Running out of space \"$partition ($usep%)\", $free Left, $(date)\n"
    fi
  done

  if [ "$BUFFER" != "" ]; then
    IP=$(dig -4 +short ANY myip.opendns.com @resolver1.opendns.com)
    echo -e $BUFFER | mail -s "Alert: Almost out of disk space on $(hostname)@$IP" $EMAILS
  fi
}

if [ "$EXCLUDE_LIST" != "" ] ; then
  df -H | grep -vE "^Filesystem|tmpfs|cdrom|${EXCLUDE_LIST}" | awk '{print $5 " " $6 " " $4}' | main_prog
else
  df -H | grep -vE "^Filesystem|tmpfs|cdrom" | awk '{print $5 " " $6 " " $4}' | main_prog
fi
```