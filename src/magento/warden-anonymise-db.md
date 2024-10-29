# Anonymising Warden Databases

Now that [masquerade](https://github.com/elgentos/masquerade) is abandoned, we can use [Smile-SA GDPR Dump](https://github.com/Smile-SA/gdpr-dump).

## Usage
First lets download the resources we need, we will store them in the magento dev folder as we can exclude this in our deployment pipelines.

```sh
wget https://github.com/Smile-SA/gdpr-dump/releases/latest/download/gdpr-dump.phar -O dev/gdpr-dump
wget https://raw.githubusercontent.com/Smile-SA/gdpr-dump/main/app/config/example.yaml -O dev/gdpr-dump.yaml
chmod +x dev/gdpr-dump
```

Next, review the `gdpr-dump.yaml` configuration against your current raw database. And add any missing tables / columns into the configuration.

Then run the `gdpr-dump` application from the warden shell to dump the anonymised database to disk.
```sh
DB_HOST=db DB_USER=magento DB_PASSWORD=magento DB_NAME=magento dev/gdpr-dump dev/gdpr-dump.yaml | gzip > dev/z_anonymized_db.$(date +%s).sql.gz
```
Now we should have a anonymized GZIP'd database we can share / reimport / move forward into upstream environments.