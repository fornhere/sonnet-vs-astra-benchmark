#!/bin/sh
# kullanım: tools/sheet.sh cikti.png a.png b.png c.png d.png  (2x2, 640x360)
out=$1; shift
ffmpeg -y -loglevel error $(for f in "$@"; do echo -n "-i $f "; done) -filter_complex "$(i=0; for f in "$@"; do echo -n "[$i:v]scale=640:360[s$i];"; i=$((i+1)); done)[s0][s1][s2][s3]xstack=inputs=4:layout=0_0|640_0|0_360|640_360" $out
