#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p kontrol
python3 kaynak/olustur.py
chromium --headless --no-sandbox --disable-gpu --disable-dev-shm-usage \
  --user-data-dir="$PWD/kontrol/chromium" \
  --no-pdf-header-footer --print-to-pdf="$PWD/kontrol/taslak.pdf" \
  "file://$PWD/sunum.html" > kontrol/chromium.log 2>&1
# Sadece sayfa sınırlarını düzeltir; vektörler ve metin katmanı korunur.
python3 kaynak/pdf-boyut.py
pdfinfo sunum.pdf
