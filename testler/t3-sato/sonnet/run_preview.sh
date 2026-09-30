#!/bin/bash
# kullanim: ./run_preview.sh BLEND "VIEWS"
cd /home/forn/sonnet-vs-astra/t3-sato/sonnet
BLEND=$1 VIEWS="$2" SAMPLES=${SAMPLES:-24} RES=${RES:-50} blender -b --python src/preview.py 2>&1 | grep -E "^OK|rror|Traceback" 
