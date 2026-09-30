#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
ffmpeg -y -hide_banner -framerate 24 -i kareler/forn_%04d.png -i kaynak/forn-ses.wav -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -vf scale=out_color_matrix=bt709 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 256k -af volume=8.81dB -movflags +faststart -t 8 animasyon.mp4
