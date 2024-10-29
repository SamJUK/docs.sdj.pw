# CLI Bulk Image Optimisation

::: info
@TODO: Revisit, cleanup & Add AVIF support. 
:::

```sh
#!/usr/bin/env bash

# Convert a folder or subfolders of images to WebP format
# Requires: 
#   - WEBP tooling to be installed, @see: https://gist.github.com/SamJUK/4a91a96375eba1b15f7f8a01ddfac2da
# Usage: 
#.  bash ./webp.bash -r -d=/var/www/vhosts/uat.example.com/pub/media

set -e
shopt -s nullglob
shopt -s globstar

function usage() {
  echo "Usage: $0 [-d directory]"
  echo "  -d, --directory   Directory of images that need to be processed"
  echo "  -r, --recursive   Process images recursively"
  echo ""
  echo "Example #1: $0 --recursive --directory=/var/www/vhosts/magento2/pub/media/"
  echo "Example #2: $0 -r -d=/var/www/vhosts/magento2/pub/media/"
  exit 1
}

DIR=""
RECURSIVE="0"

while [ "$#" -gt 0 ]; do
  case "$1" in
    -d=*|--directory=*) DIR="${1#*=}"; shift 1;;
    -r|--recursive) RECURSIVE="1"; shift 1;;
    -d|--directory) echo "$1 requires an argument" >&2; exit 1;;
    -*) echo "unknown option: $1" >&2; exit 1;;
  esac
done

[[ -d "$DIR" ]] || { echo "ERROR: Not a directory: $DIR"; usage; exit 1; }

function process() {
  img_path="$1"

  img_file=${img_path##*/}
  [[ $img_path == */* ]] && img_dir=${img_path%/*} || img_dir=.

  filename=$(echo "$img_file" | cut -f 1 -d '.')
  webp_path=${img_dir}/${filename}.webp
  if [ !  -e "$webp_path" ] || [ "$img_path" -nt "$webp_path" ]
    then
        if [[ $img_file == *.gif ]]
        then
            gif2webp -lossy -q 80 -m 6 "$img_path" -o "$webp_path"
        else
            cwebp -q 75 -m 6 -af "$img_path" -o "$webp_path"
        fi
    else
        echo "exists: $webp_path"
    fi
}

if [ "$RECURSIVE" == "1" ]; then
    for img_path in $DIR/**/*.{png,jpg,jpeg}; do process "$img_path"; done
else
    for img_path in $DIR/*.{png,jpg,jpeg}; do process "$img_path"; done
fi
```