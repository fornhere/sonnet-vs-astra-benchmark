#!/bin/bash
# Iki turlu render: once tek kareler (12 fps), sonra cift kareler; kesilirse devam edilebilir.
cd "$(dirname "$0")"
S=${1:-48}
blender -b sato.blend --python render_film.py -- 1 480 2 $S kareler
blender -b sato.blend --python render_film.py -- 2 480 2 $S kareler
echo BITTI
