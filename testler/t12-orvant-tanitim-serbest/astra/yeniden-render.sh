#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
export npm_config_cache="$PWD/.npm-cache"
export XDG_STATE_HOME="$PWD/.state"
npx --yes hyperframes@0.8.91 render film --fps 60 --quality delivery --workers 4 --output "$PWD/tanitim.mp4"
