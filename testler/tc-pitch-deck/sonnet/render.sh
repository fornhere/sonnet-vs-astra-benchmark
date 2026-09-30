#!/usr/bin/env bash
# deck.html -> sunum.pdf (16:9, 1920x1080 sayfa) ve önizleme PNG'leri
set -e
cd "$(dirname "$0")"
node build.mjs
chromium --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=4000 --print-to-pdf=sunum.pdf "file://$PWD/deck.html" 2>/dev/null
mkdir -p onizleme && rm -f onizleme/*.png
pdftoppm -r 48 -png sunum.pdf onizleme/s
echo "sunum.pdf: $(pdfinfo sunum.pdf | grep -E 'Pages|Page size' | tr '\n' ' ')"
