#!/bin/bash
# rapor.html -> rapor.pdf (Chromium, A4 yatay)
cd "$(dirname "$0")/.."
chromium --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="$PWD/rapor.pdf" "file://$PWD/rapor.html" 2>&1 | tail -1
pdfinfo rapor.pdf | grep -E "Pages|Page size"
