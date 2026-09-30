#!/bin/bash
# usage: sheet.sh <post-dir> -> kaynak/tmp/<post>.png contact sheet
d=/home/forn/sonnet-vs-astra/ta-carousel/sonnet
ffmpeg -y -loglevel error -pattern_type glob -i "$d/gonderiler/$1/*.png" -vf "scale=360:-1,tile=${2:-4}x${3:-2}:padding=6:color=black" -frames:v 1 $d/kaynak/tmp/$1.png
