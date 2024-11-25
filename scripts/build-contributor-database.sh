#!/usr/bin/env bash

set -euo pipefail

DB=".vitepress/theme/contributor-db.json"

for doc in $(find src -type f -name '*.md'); do
  echo $doc
  gh api /repos/{owner}/{repo}/commits\?path=$doc | jq -cr '[ .[] .committer .login ] | unique | join(",")'
done | jq -n -R -r 'reduce inputs as $i ({}; . + { ($i): (input|(tonumber? // .)) })' > $DB
