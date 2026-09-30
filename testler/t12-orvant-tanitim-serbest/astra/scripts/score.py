import numpy as np, wave
from pathlib import Path
sr=48000; dur=52; n=sr*dur
mix=np.zeros((n,2),dtype=np.float64);rng=np.random.default_rng(71)
def put(sig,start,amp=1,pan=0):
 i=int(start*sr); end=min(n,i+len(sig))
 if end<=i or i<0:return
 sig=sig[:end-i]*amp
 mix[i:end,0]+=sig*np.sqrt((1-pan)/2);mix[i:end,1]+=sig*np.sqrt((1+pan)/2)
def tone(f,d,kind='pluck'):
 t=np.arange(int(sr*d))/sr
 if kind=='pad':
  x=sum(np.sin(2*np.pi*(f*k+(.16 if k%2 else -.12))*t)/k**1.8 for k in range(1,6)); env=np.minimum(t/.8,1)*np.minimum((d-t)/1.2,1);return x*env*.32
 if kind=='bass':return (np.sin(2*np.pi*f*t)+.22*np.sin(2*np.pi*2*f*t))*np.minimum(t/.012,1)*np.exp(-t*3.4)*np.minimum((d-t)/.06,1)
 return (np.sin(2*np.pi*f*t)+.23*np.sin(2*np.pi*2*f*t)+.11*np.sin(2*np.pi*4.003*f*t))*np.minimum(t/.005,1)*np.exp(-t*5.5)
def kick():
 t=np.arange(int(.43*sr))/sr;phase=2*np.pi*(45*t+80*.03*(1-np.exp(-t/.03)));return np.sin(phase)*np.exp(-t*9)+rng.normal(0,1,len(t))*np.exp(-t*200)*.06
def hat(d=.12):
 x=rng.normal(0,1,int(d*sr));x=np.concatenate([[0],np.diff(x)]);t=np.arange(len(x))/sr;return x*np.exp(-t*48)*.22
def clap():
 t=np.arange(int(.23*sr))/sr;x=rng.normal(0,1,len(t));x=x-np.convolve(x,np.ones(8)/8,mode='same');return x*(np.exp(-t*27)+.7*np.exp(-((t-.021)/.006)**2)+.4*np.exp(-((t-.044)/.007)**2))*.2
# E minor, Cmaj7, G, D; a restrained, melodic electronic cue.
chords=[[52,55,59,66],[48,52,55,59],[43,50,55,59],[50,54,57,64]]
hz=lambda m:440*2**((m-69)/12)
for bar in range(26):
 start=bar*2;ch=chords[(bar//2)%4]
 for k,m in enumerate(ch):put(tone(hz(m),3,'pad'),max(0,start-.1),.13,[-.65,.65,-.3,.3][k])
 if start<48:
  for b in range(4):
   ts=start+b*.5
   # sparse opening and gate breakdown
   if ts>=2 and not 23<=ts<25:put(kick(),ts,.55 if ts>=7 else .38)
   if b in [1,3] and ts>=7 and not 23<=ts<27:put(clap(),ts,.43,.12)
   if ts>=7:
    put(tone(hz(ch[0]-12),.42,'bass'),ts,.23)
   for off in [.25]:
    if ts>=4:put(hat(),ts+off,.27 if ts>13 else .18,(-1)**b*.4)
  # eighth-note arpeggio; alternate octaves and delays in stereo
  for step in range(8):
   ts=start+step*.25
   m=ch[[0,2,1,3,2,1,3,2][step]]+12
   sig=tone(hz(m),.75)
   vol=.09 if ts<7 else .12
   if 23<=ts<27:vol*=.3
   put(sig,ts,vol,(-1)**step*.32);put(sig,ts+.375,vol*.28,(-1)**(step+1)*.7)
# Designed transition risers and cinematic downbeats.
for cut in [7,13,23,32,43,47]:
 d=.8;t=np.arange(int(d*sr))/sr;noise=rng.normal(0,1,len(t));noise=np.convolve(noise,np.ones(13)/13,mode='same');env=(t/d)**2*np.sin(np.pi*t/d)
 put(noise*env,cut-.8,.5,-.1)
 tt=np.arange(int(1.4*sr))/sr;impact=np.sin(2*np.pi*(36*tt+35*.08*(1-np.exp(-tt/.08))))*np.exp(-tt*5)
 put(impact,cut,.7)
 # high mechanical confirmation
 put(tone(hz(83),.5),cut+.015,.09,.4)
# Verification click cluster and finale resolve.
for ts in [25.3,27,27.2,28.4,33.3,35.1,36.9]:put(tone(hz(83 if ts<32 else 78),.22),ts,.11,.15)
for m in [40,52,59,64,67]:put(tone(hz(m),4.7,'pad'),47,.22)
# Fade tail, remove DC, gentle saturation. Mastering performed with FFmpeg loudnorm.
fade=np.minimum(np.arange(n)/sr/1.0,1)*np.clip((52-np.arange(n)/sr)/2,0,1)
mix*=fade[:,None];mix-=mix.mean(axis=0);mix=np.tanh(mix*1.35);mix*=.87/max(abs(mix).max(),.001)
with wave.open('film/assets/score-raw.wav','wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((mix*32767).astype('<i2').tobytes())
print('Original score written')

import subprocess
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i","film/assets/score-raw.wav","-af","loudnorm=I=-15:TP=-1.5:LRA=8","-ar","48000","-c:a","pcm_s16le","film/assets/soundtrack.wav"],check=True)
Path("film/assets/score-raw.wav").unlink()
