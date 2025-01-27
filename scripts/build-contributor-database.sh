#!/usr/bin/env bash

set -euo pipefail

DB=".vitepress/theme/contributor-db.json"

for doc in $(find src -type f -name '*.md'); do
  echo $doc
  gh api /repos/{owner}/{repo}/commits\?path=$doc | jq -cr '[ .[] .committer | {username: .login, avatar: .avatar_url} ] | unique'
done | jq -c -n -R -r 'reduce inputs as $i ({}; . + { ($i): (input|fromjson) })' > $DB
