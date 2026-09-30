import json, numpy as np, subprocess, wave, os
SR=44100
T=json.load(open('timing.json')); starts=T['starts']; total=T['total']
words=json.load(open('audio/words.json'))
N=int((total+0.5)*SR)
def add(dst, src, at, gain=1.0):
    i=int(at*SR); n=min(len(src), len(dst)-i)
    if n>0: dst[i:i+n]+=src[:n]*gain
# ---------- ses: sahne dosyalarını yerleştir ----------
voice=np.zeros((N,2),dtype=np.float32)
for k,s in starts.items():
    subprocess.run(['ffmpeg','-y','-v','error','-i',f'audio/{k}.mp3','-ar',str(SR),'-ac','2','-f','f32le',f'audio/{k}.raw'],check=True)
    a=np.frombuffer(open(f'audio/{k}.raw','rb').read(),dtype=np.float32).reshape(-1,2)
    add(voice,a,s)
# ---------- müzik ----------
rng=np.random.default_rng(3)
t=np.arange(N)/SR
music=np.zeros((N,2),dtype=np.float32)
chords=[[110,164.81,246.94,261.63,329.63],[87.31,130.81,164.81,220,261.63],[130.81,196,246.94,293.66,329.63],[98,146.83,220,246.94,329.63]]
step=6.0; dur=10.0
k=0
while k*step < total:
    ch=chords[k%4]; t0=k*step
    i0=int(t0*SR); n=int(dur*SR)
    tt=np.arange(n)/SR
    env=np.minimum(1,tt/2.5)*np.minimum(1,(dur-tt)/3.0); env=np.clip(env,0,1)**1.5
    sig=np.zeros(n)
    for j,f in enumerate(ch):
        for det,amp in ((0,1.0),(0.6,0.7),(-0.7,0.7)):
            ff=f*(1+det/100)
            sig+=amp*(np.sin(2*np.pi*ff*tt+j)+0.35*np.sin(4*np.pi*ff*tt)+0.12*np.sin(6*np.pi*ff*tt))*(0.7 if f<150 else 0.5)
    sig*=env
    L=sig*(0.9+0.1*np.sin(tt*0.4)); Rr=sig*(0.9+0.1*np.cos(tt*0.37))
    m=min(n,N-i0)
    music[i0:i0+m,0]+=(L[:m]*0.02).astype(np.float32); music[i0:i0+m,1]+=(Rr[:m]*0.02).astype(np.float32)
    k+=1
# arpeggio pluck
pent=[440,523.25,659.25,783.99,880,987.77,1174.66]
bt=0.75; nb=int(total/bt)
for b in range(2,nb):
    if rng.random()<0.55:
        f=pent[rng.integers(0,len(pent))]; at=b*bt
        n=int(1.8*SR); tt=np.arange(n)/SR
        p=np.sin(2*np.pi*f*tt)*np.exp(-tt*3.2)+0.3*np.sin(4*np.pi*f*tt)*np.exp(-tt*6)
        pan=rng.uniform(0.25,0.75)
        v=0.028*(0.6+0.4*rng.random())
        add(music[:,0:1].reshape(-1,1) if False else music, np.stack([p*(1-pan),p*pan],1).astype(np.float32), at, v)
# global fade in/out
fade=np.minimum(1,t/3.0)*np.minimum(1,(total+0.3-t)/3.0)
music*= fade[:,None].astype(np.float32)
# ---------- sfx ----------
sfx=np.zeros((N,2),dtype=np.float32)
def whoosh(at,dur=1.1,gain=0.5,up=True):
    n=int(dur*SR); x=rng.standard_normal(n); y=np.zeros(n); prev=0
    for i in range(n):
        p=i/n; c=(300+5500*p**2) if up else (5800-5200*p)
        a=1-np.exp(-2*np.pi*c/SR); prev+=a*(x[i]-prev); y[i]=prev
    env=np.sin(np.pi*np.linspace(0,1,n))**2
    y*=env*gain*3.0
    add(sfx,np.stack([y,np.roll(y,60)],1).astype(np.float32),at)
def thud(at,gain=0.9):
    n=int(1.2*SR); tt=np.arange(n)/SR
    y=np.sin(2*np.pi*(58*np.exp(-tt*6)+38)*tt)*np.exp(-tt*5)
    x=rng.standard_normal(n); prev=0; nz=np.zeros(n)
    for i in range(n):
        prev+=0.25*(x[i]-prev); nz[i]=prev
    y+=nz*np.exp(-tt*22)*0.9
    y*=gain
    add(sfx,np.stack([y,y],1).astype(np.float32),at)
def bell(at,f=880,gain=0.16,dur=3.5):
    n=int(dur*SR); tt=np.arange(n)/SR
    y=sum(a*np.sin(2*np.pi*f*r*tt)*np.exp(-tt*d) for r,a,d in ((1,1,1.4),(2.01,0.5,2.2),(2.99,0.3,3.2),(4.2,0.15,4.5)))
    add(sfx,np.stack([y,y],1).astype(np.float32),at,gain)
def tick(at,gain=0.08):
    n=int(0.12*SR); tt=np.arange(n)/SR
    y=np.sin(2*np.pi*1500*tt)*np.exp(-tt*60)
    add(sfx,np.stack([y,y],1).astype(np.float32),at,gain)
keys=list(starts.keys())
# sahne geçiş whoosh'ları
for kk in keys[1:]:
    whoosh(starts[kk]-0.75,1.1,0.55,True)
w20=starts['s1']+words['s1'][20]['t']
whoosh(w20-0.5,0.55,0.4,True); thud(w20+0.25,1.0)
# başlık kelimeleri, kart vb. küçük vurgular
def W(k,i): return starts[k]+words[k][i]['t']
for at in [W('s3',4), W('s4',12), W('s4',16), W('s5',5), W('s5',26), W('s6',6)]: bell(at,660,0.06,1.8)
bell(W('s6',25)+0.9,880,0.14,4.0); bell(W('s6',25)+1.0,1318.5,0.08,4.0)
# sayaç tıkları
for i in range(14): tick(W('s2',7)+0.12*i,0.03)
for i in range(14): tick(W('s2',14)+0.12*i,0.03)
# ---------- karışım ----------
def norm_peak(x,p): return x*(p/max(1e-6,np.abs(x).max()))
voice_n=voice
mix=voice_n*1.0+music*1.0+sfx*0.9
def wr(path,x):
    x=np.clip(x,-1,1); pcm=(x*32767).astype('<i2')
    with wave.open(path,'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
wr('audio/voice.wav',voice); wr('audio/music_raw.wav',music*6); wr('audio/sfx.wav',sfx)
np.save('audio/v.npy',voice); np.save('audio/m.npy',music); np.save('audio/s.npy',sfx)
