set -e
cd /home/forn/sonnet-vs-astra/t2-urun-tanitim/sonnet/work
ffmpeg -v error -y -i audio/vo_raw.wav -i audio/music_duck.wav -i audio/sfx_duck.wav -filter_complex \
"[0:a]highpass=f=75,acompressor=threshold=0.09:ratio=3:attack=4:release=90:makeup=3,equalizer=f=3200:t=q:w=1:g=1.5,volume=1.0[vo];\
[1:a]volume=${MUSIC:-0.5}[mu];[2:a]volume=0.9[sx];\
[vo][mu][sx]amix=inputs=3:normalize=0:duration=longest,aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-1.5:LRA=9[m]" -map "[m]" -ar 48000 -ac 2 audio/mix.wav
ffmpeg -hide_banner -i audio/mix.wav -af ebur128=peak=true -f null - 2>&1 | tail -12
