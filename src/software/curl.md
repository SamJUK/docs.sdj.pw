# Curl output



## Only display certain header data / meta information
```sh
curl -s https://www.example.com  --output /dev/null \
    --write-out 'size_download: %{size_download}\n Cache Age: %header{Age}\n Content Type:%{content_type}\n'
```

## Curl Performance Testing
Simple shell script to get extra timing data from a curl request. I have this placed within my path under the filename `curlp` for easy access.

```sh
#!/usr/bin/env sh
set -euo pipefail

[[ $# < 1 ]] && echo "This command display extra time metrics about a curl request.
Usage: $0 url" && exit 255

curl -w "
    time_namelookup:  %{time_namelookup}
       time_connect:  %{time_connect}
    time_appconnect:  %{time_appconnect}
   time_pretransfer:  %{time_pretransfer}
      time_redirect:  %{time_redirect}
 time_starttransfer:  %{time_starttransfer}
                    ----------
         time_total:  %{time_total}
" -s -o /dev/null $@
```

Example usage is `curlp https://www.example.com` with provides the output
```
    time_namelookup:  0.098700
       time_connect:  0.186062
    time_appconnect:  0.384053
   time_pretransfer:  0.384231
      time_redirect:  0.000000
 time_starttransfer:  0.474415
                    ----------
         time_total:  0.474698
```

