import numpy as np, wave
from pathlib import Path
SR=48000; D=56; rng=np.random.default_rng(27); mix=np.zeros((SR*D,2),np.float64)
def add(x,start,gain=1,pan=0):
 s=int(start*SR); n=min(len(x),len(mix)-s)
 if n<=0:return
 mix[s:s+n,0]+=x[:n]*gain*np.sqrt((1-pan)/2);mix[s:s+n,1]+=x[:n]*gain*np.sqrt((1+pan)/2)
def freq(m):return 440*2**((m-69)/12)
def tone(m,d,kind='pluck'):
 t=np.arange(int(d*SR))/SR; f=freq(m)
 if kind=='pad':
  x=sum(np.sin(2*np.pi*f*(1+v)*t+v*80) for v in [-.002,0,.002])/3+.15*np.sin(2*np.pi*f*2*t)
  e=np.minimum(t/.65,1)*np.minimum((d-t)/.9,1)*.8
 elif kind=='bass':
  x=np.sin(2*np.pi*f*t)+.22*np.sin(2*np.pi*2*f*t);e=np.minimum(t/.012,1)*np.exp(-t*3.6)*np.minimum((d-t)/.07,1)
 else:
  x=np.sin(2*np.pi*f*t+.9*np.sin(2*np.pi*f*2*t)*np.exp(-t*8))+.12*np.sin(2*np.pi*f*3*t)
  e=np.minimum(t/.004,1)*np.exp(-t*4.5)*np.minimum((d-t)/.04,1)
 return x*e
# D minor 9 / Bb major 7 / F major 9 / C suspended 2.
chords=[[50,57,60,64,69],[46,53,57,60,65],[53,60,64,67,72],[48,55,62,64,67]]
for k,start in enumerate(np.arange(0,54,4)):
 chord=chords[k%4]
 if start>=46:chord=[50,57,60,64,69]
 for j,m in enumerate(chord):add(tone(m,5,'pad'),start,.046,(-.7+j*.35))
# controlled rhythmic phrase, pauses before chapter cuts
for b,t0 in enumerate(np.arange(0,54,.5)):
 if t0<2 or (6<=t0<7) or (23.5<=t0<24) or (45.5<=t0<46) or t0>51.5:continue
 t=np.arange(int(.38*SR))/SR
 f=47+108*np.exp(-t*28);phase=2*np.pi*np.cumsum(f)/SR
 kick=np.sin(phase)*np.exp(-t*11)+rng.normal(0,1,len(t))*np.exp(-t*150)*.09
 add(kick,t0,.20 if t0>=7 else .10)
 root=chords[int(t0//4)%4][0]-12
 if t0>=46:root=38
 add(tone(root,.48,'bass'),t0,.18)
 if b%2:
  tt=np.arange(int(.14*SR))/SR;n=rng.normal(0,1,len(tt));n=np.concatenate([[0],np.diff(n)])
  add(n*np.exp(-tt*33)*(1+.5*np.cos(2*np.pi*90*tt)),t0,.028,.18)
for k,t0 in enumerate(np.arange(7,51.5,.25)):
 t=np.arange(int(.07*SR))/SR;n=rng.normal(0,1,len(t));n=np.concatenate([[0],np.diff(n)])
 if int(k)%8 in [0,3,4,7]:add(n*np.exp(-t*75),t0,.013,(-.5 if k%2 else .5))
for k,t0 in enumerate(np.arange(1,53,.5)):
 chord=chords[int(t0//4)%4]
 if t0>=46:chord=[50,57,60,64,69]
 if 5.5<t0<7 or 23<t0<24 or 45<t0<46:continue
 m=chord[[0,2,4,1,3,2,4,3][k%8]]+12
 x=tone(m,1.5)
 gain=.075 if 7<=t0<46 else .050
 add(x,t0,gain,np.sin(k*1.9)*.55)
 add(x,t0+.375,gain*.3,-np.sin(k*1.9)*.6)
 add(x,t0+.75,gain*.12,np.sin(k*1.9)*.6)
# Page movement and chapter cues; short air gestures, not cinematic booms.
for start in [6.55,14.55,23.55,35.55,45.55]:
 d=.65;t=np.arange(int(d*SR))/SR;n=rng.normal(0,1,len(t));s=np.convolve(n,np.ones(9)/9,mode='same')
 env=np.sin(np.pi*t/d)**2
 add(s*env,start,.13,-.2)
for start in [7,15,24,36,46]:
 add(tone(86,.85),start,.085,.35);add(tone(74,1.2),start,.05,-.35)
# Resolve with a held D minor ninth and leave a clean tail.
for j,m in enumerate([50,57,60,64,69,74]):add(tone(m,4,'pluck'),52,.06,(-.7+j*.28))
env=np.ones(len(mix));env[:SR//10]=np.linspace(0,1,SR//10);env[-int(2.4*SR):]=np.linspace(1,0,int(2.4*SR))**1.5
mix*=env[:,None];mix=np.tanh(mix*1.5)*.78
with wave.open('film/assets/score-raw.wav','wb') as f:f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((mix*32767).astype('<i2').tobytes())
print('Original score: 56 seconds, stereo 48 kHz, 120 BPM')
