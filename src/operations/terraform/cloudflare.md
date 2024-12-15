# Terraform - Cloudflare

## Importing Existing Records

You can import existing records with the following command.
```sh
terraform import cloudflare_record.example <zone_id>/<record_id>
```

### Zone ID
Zone ID you can fetch from the right hand sidebar within cloudflare panel, when viewing the relevant zone.

### Record ID
Record ID is a little more tricky to obtain, as its not displayed anywhere within the cloudflare panel. Instead we need to run a curl command to fetch the record ids for the zone.

```sh
export CF_API_TOKEN="xxx"
export CF_ZONE_ID="xxx"
```

```sh
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $CF_API_TOKEN" \
    "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" | jq '.result .[] | {id, zone_id, name, type, content}'
```
