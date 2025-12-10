---
description: Sentry.io disk space management and cleanup strategies for preventing storage issues in self-hosted instances.
---
# Disk Space Cleanup - Sentry.io

One lesson learned the hard way with sentry, is the importance of ample free disk space. Sentry.io should handle cleaning up old data. Although it seem to be a bit hit/miss.

And if you let your disk hit high utilisation before cleaning up (85/90%) it becomes very difficult to make some free space. As when removing old data from postgres, it creates a new instance of the table without the dead data, before removing the original table. Ref [VACUUM FULL](https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-SPACE-RECOVERY)


## Official Way
The recommended way to clean up old data by Sentry is by using the `cleanup` command. Although, this seems to be a bit hit & miss on how effective it is.

```sh
docker compose run -T web cleanup --days 90 -m nodestore -l debug
```

## Project Specific Cleanup
If you have a particularly large project, you can run the cleanup command for a specific project. Even with a lower retention period.

```sh
docker compose run --rm worker sentry cleanup --days 7 --project 6
```

## Postgres Wasted Space
If still struggling for space, you can look to free any dead space from Postgres with the following command. 

If you do not have enough space to vacuum the data, you can run a [query to identify the wasted space per table](https://markandruth.co.uk/2016/05/25/finding-the-amount-of-space-wasted-in-postgres-tables). And vacuum each table individually, starting at the smallest. 

```sh
docker compose exec postgres psql -U postgres -c 'VACUUM FULL;'
```

## Docker Volumes

Sentry makes use of Kafka and Zookeeper, and with the default docker compose file, these docker volumes can become quite large. You can check the size of your docker volumes with the following command:

```sh
docker system df -v
```

### Kafka

To help keep the Kafka volume size down, you can set the retention period for messages to a lower value. This can be done by adding the following environment variable to the `kafka` service in your `docker-compose.yml` file:

```yaml
kafka:
  environment:
    KAFKA_LOG_RETENTION_HOURS: "24"
    KAFKA_LOG_RETENTION_BYTES: "1073741824"  # 1GB max
```

### Zookeeper

To help keep the Zookeeper volume size down, you can setup auto purging of old snapshots and transaction logs. This can be done by adding the following environment variables to the `zookeeper` service in your `docker-compose.yml` file:

```yaml
zookeeper:
  environment:
    ZOOKEEPER_AUTOPURGE_PURGE_INTERVAL: "1"
    ZOOKEEPER_AUTOPURGE_SNAP_RETAIN_COUNT: "3"
```

## Nuclear Option
If you still do not have enough space to even VACUUM your smallest tables. You can look to directly force remove some of the data from disk. 

Removing empty dirs, should be fairly safe. Removing from `_data` has potentially for corruption (although has not happened to me).

:::danger
Note: This approach may cause data loss. Use as a last resort.
:::

```sh
# Cleanup Empty Directories - These can take up a surprising amount of space
find /var/lib/docker/volumes/sentry-data/_data/files -type d -empty | xargs -r rmdir

# Cleanup old Data files - Force remove anything outside our retention date
find /var/lib/docker/volumes/sentry-data/_data -type f -mtime +90 -delete
```