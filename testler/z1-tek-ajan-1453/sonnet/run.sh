#!/bin/bash
# sahneyi kur + 1365. kareyi (yüzde $1, varsayılan 50) t/ içine render et
cd "$(dirname "$0")"
blender -b /home/forn/zaman-yarigi/kit/arazi_kiyi.blend --python build_c3.py 2>&1 | grep -vE '^$|Deprec|use_nodes' | tail -8
chmod u+w sahne.blend
blender -b sahne.blend --python /home/forn/zaman-yarigi/kit/araclar/kare_render.py -- t ${1:-50} 1 1365 1365 2>&1 | grep -iE 'error|Saved|Time'
