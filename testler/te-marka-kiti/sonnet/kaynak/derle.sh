#!/bin/bash
# Kaynaktan yeniden üretim: logo/*.svg, kilavuz.html, kilavuz.pdf  (gerekli: python3, chromium; fonttools pip ile kurulur)
cd "$(dirname "$0")"
[ -d venv ] || { python3 -m venv venv && ./venv/bin/pip install -q fonttools brotli; }
./venv/bin/python build_logos.py && ./venv/bin/python build.py
chromium --headless --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf=../kilavuz.pdf file://$PWD/../kilavuz.html
