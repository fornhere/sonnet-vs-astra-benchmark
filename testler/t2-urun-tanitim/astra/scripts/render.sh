#!/usr/bin/env bash
set -euo pipefail
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"
mkdir -p .cache/tmp .cache/state
export TMPDIR="$PROJECT_DIR/.cache/tmp"
export XDG_STATE_HOME="$PROJECT_DIR/.cache/state"
export HYPERFRAMES_BROWSER_PATH="${HYPERFRAMES_BROWSER_PATH:-/usr/bin/chromium}"
export PRODUCER_BROWSER_GPU_MODE="${PRODUCER_BROWSER_GPU_MODE:-software}"
export HYPERFRAMES_TELEMETRY_DISABLED=1
npm --cache "$PROJECT_DIR/.cache/npm" exec --yes --package=hyperframes@0.8.91 -- hyperframes render film --output "$PROJECT_DIR/tanitim.mp4" --quality delivery --fps 30 --workers 1
