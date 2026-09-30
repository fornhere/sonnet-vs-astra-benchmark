#!/bin/bash
# usage: sheet.sh dir out.png cols frames...
d=$1; out=$2; cols=$3; shift 3
args=""; n=0
for f in "$@"; do args="$args -i $d/f$(printf %04d $f).png"; n=$((n+1)); done
rows=$(( (n+cols-1)/cols ))
layout=""
for ((i=0;i<n;i++)); do r=$((i/cols)); c=$((i%cols)); layout="$layout${layout:+|}$((c*W))_$((r*H))"; done
W=$(ffprobe -v error -select_streams v -show_entries stream=width -of csv=p=0 $d/f$(printf %04d $1).png)
H=$(ffprobe -v error -select_streams v -show_entries stream=height -of csv=p=0 $d/f$(printf %04d $1).png)
layout=""
for ((i=0;i<n;i++)); do r=$((i/cols)); c=$((i%cols)); layout="$layout${layout:+|}$((c*W))_$((r*H))"; done
ffmpeg -loglevel error -y $args -filter_complex "xstack=inputs=$n:layout=$layout" $out
