#!/bin/sh
# kullanım: tools/sheetn.sh cikti.png sutun dosyalar...  (hücre 480x270)
out=$1; cols=$2; shift; shift
n=$#; rows=$(( (n + cols - 1) / cols ))
inputs=""; filt=""; lay=""; i=0
for f in "$@"; do
  inputs="$inputs -i $f"; filt="$filt[$i:v]scale=480:270[s$i];"
  c=$((i % cols)); r=$((i / cols)); lay="$lay${lay:+|}$((c*480))_$((r*270))"
  i=$((i+1))
done
sl=""; j=0; while [ $j -lt $n ]; do sl="$sl[s$j]"; j=$((j+1)); done
ffmpeg -y -loglevel error $inputs -filter_complex "${filt}${sl}xstack=inputs=$n:layout=$lay" $out
