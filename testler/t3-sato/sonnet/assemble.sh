#!/bin/bash
# Kare dizisi (kareler/f_%04d.png) -> render.mp4 (baslik, solma, hafif vinyet, ambiyans sesi)
# kullanim: ./assemble.sh [FPS_GIRIS=24] [KARE_KLASORU=kareler] [CIKTI=render.mp4]
cd "$(dirname "$0")"
FPS=${1:-24}
DIR=${2:-kareler}
OUT=${3:-render.mp4}
FONT=/usr/share/fonts/liberation/LiberationSerif-Regular.ttf
FONTB=/usr/share/fonts/liberation/LiberationSerif-Bold.ttf
NF=$(ls $DIR/f_*.png | wc -l)
DUR=$(python3 -c "print($NF/$FPS)")
FADEOUT=$(python3 -c "print(max(0,$DUR-1.6))")

VF="format=yuv420p,eq=contrast=1.05:saturation=1.06:gamma=0.99,vignette=angle=PI/5:eval=init,noise=alls=3:allf=t,\
fade=t=in:st=0:d=1.2,fade=t=out:st=${FADEOUT}:d=1.5,\
drawtext=fontfile=${FONTB}:text='R A V E N H O L D':fontsize=88:fontcolor=0xF2E4C4:alpha='if(lt(t,1.0),0,if(lt(t,2.4),(t-1.0)/1.4,if(lt(t,4.4),1,if(lt(t,5.6),(5.6-t)/1.2,0))))':x=(w-text_w)/2:y=h*0.79:shadowcolor=0x000000AA:shadowx=3:shadowy=3,\
drawtext=fontfile=${FONT}:text='K U Z G U N   K A L E S İ   ·   S İ N E M A T İ K   T A N I T I M':fontsize=24:fontcolor=0xD8C79E:alpha='if(lt(t,1.6),0,if(lt(t,2.8),(t-1.6)/1.2,if(lt(t,4.4),1,if(lt(t,5.6),(5.6-t)/1.2,0))))':x=(w-text_w)/2:y=h*0.79+96:shadowcolor=0x000000AA:shadowx=2:shadowy=2"

# ambiyans: ruzgar + derin drone (sentetik)
ffmpeg -y -loglevel error \
  -f lavfi -i "anoisesrc=d=${DUR}:c=pink:a=0.5:r=44100" \
  -f lavfi -i "sine=frequency=73.42:duration=${DUR}:sample_rate=44100" \
  -f lavfi -i "sine=frequency=110.0:duration=${DUR}:sample_rate=44100" \
  -f lavfi -i "sine=frequency=146.83:duration=${DUR}:sample_rate=44100" \
  -f lavfi -i "sine=frequency=220.0:duration=${DUR}:sample_rate=44100" \
  -filter_complex "[0]highpass=f=180,lowpass=f=900,tremolo=f=0.12:d=0.7,volume=0.16[w];\
[1]volume=0.20[a];[2]tremolo=f=0.1:d=0.5,volume=0.11[b];[3]tremolo=f=0.13:d=0.6,volume=0.075[c];[4]tremolo=f=0.17:d=0.8,volume=0.035[d];\
[a][b][c][d][w]amix=inputs=5:normalize=0,lowpass=f=1800,aecho=0.8:0.85:700|1300:0.32|0.22,afade=t=in:st=0:d=2.5,afade=t=out:st=${FADEOUT}:d=1.6,volume=1.0[aout]" \
  -map "[aout]" -c:a aac -b:a 160k /tmp/ambient.m4a

ffmpeg -y -framerate $FPS -i $DIR/f_%04d.png -i /tmp/ambient.m4a -vf "$VF" -r 24 \
  -c:v libx264 -preset slow -crf 15 -pix_fmt yuv420p -c:a copy -shortest -movflags +faststart $OUT
echo "Bitti: $OUT ($NF kare)"
