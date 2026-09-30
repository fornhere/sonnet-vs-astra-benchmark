import json, subprocess, html, re, numpy as np, wave
from scipy import signal
SR=48000
cues=json.load(open("cues.json")); T=cues["total"]; N=int(T*SR)
out=subprocess.run(["chromium","--headless","--disable-gpu","--no-sandbox","--allow-file-access-from-files","--dump-dom","file:///home/forn/sonnet-vs-astra/t2-urun-tanitim/sonnet/proje/index.html"],capture_output=True,text=True).stdout
sfx=json.loads(html.unescape(re.search(r'data-sfx="([^"]*)"',out).group(1)))
rng=np.random.default_rng(7)
t=np.arange(N)/SR
def wr(name,x):
    x=np.clip(x,-1,1); s=(x*32767).astype(np.int16)
    with wave.open(name,"wb") as w:
        w.setnchannels(2 if x.ndim==2 else 1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(s.tobytes())
def place(buf,x,t0,g=1.0):
    i=int(t0*SR)
    if i<0: x=x[-i:]; i=0
    n=min(len(x),len(buf)-i)
    if n>0: buf[i:i+n]+=x[:n]*g
def midi(m): return 440*2**((m-69)/12)
def lp(x,fc,order=2): b,a=signal.butter(order,fc/(SR/2),"low"); return signal.lfilter(b,a,x)
def hp(x,fc,order=2): b,a=signal.butter(order,fc/(SR/2),"high"); return signal.lfilter(b,a,x)
def bp(x,f1,f2): b,a=signal.butter(2,[f1/(SR/2),f2/(SR/2)],"band"); return signal.lfilter(b,a,x)
def reverb(x,sec=2.6,wet=0.3,seed=3):
    r=np.random.default_rng(seed); n=int(sec*SR); tt=np.arange(n)/SR
    ir=r.standard_normal(n)*np.exp(-tt*3.2/ (sec/2.6)); ir=lp(ir,4500); ir[:int(.012*SR)]*=np.linspace(0,1,int(.012*SR))
    ir/=np.sqrt((ir**2).sum())
    y=signal.fftconvolve(x,ir)[:len(x)]
    return x*(1-wet)+y*wet*1.6

# ---------------- VO ----------------
vo=np.zeros(N)
for v in cues["vo"]:
    with wave.open(f"audio/{v['line']}_t.wav") as w: a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float64)/32768
    place(vo,a,v["start"]-0.03)
wr("audio/vo_raw.wav",vo)

# ---------------- MUSIC ----------------
BPM=84; beat=60/BPM; bar=4*beat
chords=[ [45,52,55,60,64], [41,48,52,57,60], [48,55,59,64,67], [43,50,52,57,59] ]  # Am7 Fmaj7 Cmaj7 G6
chord_len=2*bar
def chord_at(tt): return chords[int(tt//chord_len)%4]
pad=np.zeros(N)
nch=int(np.ceil(T/chord_len))+1
for ci in range(nch):
    t0=ci*chord_len; notes=chords[ci%4]
    seg_n=int((chord_len+3.0)*SR); tt=np.arange(seg_n)/SR
    seg=np.zeros(seg_n)
    for m in notes:
        f=midi(m)
        for det in (-7,0,7):
            ff=f*2**(det/1200)
            seg+=(2*((ff*tt)%1)-1)*0.11
        seg+=np.sin(2*np.pi*f*tt)*0.12
    env=np.minimum(tt/1.6,1)*np.clip((chord_len+2.4-tt)/2.4,0,1)
    place(pad,seg*env,t0)
pad=lp(pad,1400); pad=lp(pad,900)
# master pad shape
def curve(pts):
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]; return np.interp(t,xs,ys)
padg=curve([(0,0),(1.5,0.22),(8.0,0.30),(8.7,0.85),(15.3,0.75),(35,0.70),(51.4,0.80),(59.5,0.95),(63,0.85),(66,0)])
pad*=padg
# sub bass
sub=np.zeros(N)
for ci in range(nch):
    t0=ci*chord_len; f=midi(chords[ci%4][0]-12+12)/2*2
    f=midi(chords[ci%4][0])/1.0
    seg_n=int((chord_len+0.5)*SR); tt=np.arange(seg_n)/SR
    seg=np.sin(2*np.pi*f*tt)*np.minimum(tt/0.5,1)*np.clip((chord_len+0.4-tt)/0.4,0,1)
    place(sub,seg,t0)
sub*=curve([(0,0),(3,0.35),(8.0,0.3),(8.8,0.6),(59.5,0.6),(66,0)])
# tension riser before title
riser=bp(rng.standard_normal(N),300,6000)*curve([(6.6,0),(8.55,0.5),(8.6,0),(66,0)])
riser=riser*np.clip((t-6.6)/1.95,0,1)**2*(t<8.6)
# plucks
def pluck(f,dur=1.4,bright=1.0):
    n=int(dur*SR); tt=np.arange(n)/SR
    x=(np.sin(2*np.pi*f*tt)+0.35*np.sin(2*np.pi*2*f*tt)*np.exp(-tt*9)+0.15*np.sin(2*np.pi*3*f*tt)*np.exp(-tt*14)*bright)
    return x*np.exp(-tt*4.2)*np.minimum(tt/0.004,1)
arp=np.zeros(N)
pat=[0,2,1,3,2,4,3,1, 0,3,2,4,1,3,2,0]
mask=[1,0,1,1,0,1,1,0, 1,0,1,0,1,1,0,1]
step=beat/2
sections=[(8.7,15.3,0.30),(15.3,22.1,0.36),(22.1,27.0,0.40),(27.0,35.5,0.26),(35.5,45.6,0.36),(45.6,51.4,0.42),(51.4,59.5,0.48)]
for (a,b,g) in sections:
    k=0; tt0=a
    while tt0<b-0.05:
        if mask[k%16]:
            notes=chord_at(tt0); m=notes[pat[k%16]%len(notes)]+12
            place(arp,pluck(midi(m)),tt0,g*(1.0 if k%4==0 else 0.75))
        k+=1; tt0+=step
# title chime & end: bell
def bell(f,dur=3.5):
    n=int(dur*SR); tt=np.arange(n)/SR
    x=0
    for r,a,d in [(1,1,1.6),(2.76,0.5,2.4),(5.4,0.25,3.5),(8.93,0.12,5)]:
        x=x+a*np.sin(2*np.pi*f*r*tt)*np.exp(-tt*d)
    return x*np.minimum(tt/0.002,1)
bells=np.zeros(N)
for t0,g in [(9.0,0.9),(59.75,1.0)]:
    for m,gg in [(69,1),(76,0.7),(81,0.5),(84,0.35)]:
        place(bells,bell(midi(m)),t0+0.02*(m%3),g*gg*0.3)
# end arp ascending, resolve
for i,m in enumerate([57,64,67,71,76,79]):
    place(arp,pluck(midi(m),2.5),60.6+i*0.16,0.42)
# soft pulse in proof section
kick=np.zeros(N)
def kk():
    n=int(0.35*SR); tt=np.arange(n)/SR
    f=45+70*np.exp(-tt*22); ph=2*np.pi*np.cumsum(f)/SR
    return np.sin(ph)*np.exp(-tt*9)
K=kk(); tb=51.4
while tb<59.5:
    place(kick,K,tb,0.5 if int((tb-51.4)/beat)%2==0 else 0.3); tb+=beat
# shimmer hats (soft) from vault to review
hats=np.zeros(N)
h=hp(rng.standard_normal(int(0.05*SR)),7000)*np.exp(-np.arange(int(0.05*SR))/SR*90)
tb=15.3
while tb<59.5:
    place(hats,h,tb+step,0.05 if not(27.0<=tb<35.5) else 0.03); tb+=beat
music=pad+sub*0.9+arp+bells+kick*0.7+hats
music=reverb(music,wet=0.22)+riser*0.35
music*=curve([(0,0),(1.2,1),(64.2,1),(66,0)])
wr("audio/music_raw.wav",music)

# ---------------- SFX ----------------
S=np.zeros(N)
def whoosh(dur=0.7):
    n=int(dur*SR); tt=np.arange(n)/SR; x=rng.standard_normal(n)
    sweep=np.linspace(400,5000,n)
    # time-varying bandpass by blockwise
    y=np.zeros(n); B=1024
    for i in range(0,n,B):
        fc=sweep[min(i,n-1)]; b,a=signal.butter(2,[max(100,fc*0.6)/(SR/2),min(fc*1.4,20000)/(SR/2)],"band"); y[i:i+B]=signal.lfilter(b,a,x[i:i+B])
    return y*np.sin(np.pi*tt/dur)**2
def tick(f=1800,g=1):
    n=int(0.09*SR); tt=np.arange(n)/SR
    return (np.sin(2*np.pi*f*tt)*np.exp(-tt*70)+0.3*rng.standard_normal(n)*np.exp(-tt*300))*g
def deny():
    n=int(0.4*SR); tt=np.arange(n)/SR
    f=210-110*tt/0.4; ph=2*np.pi*np.cumsum(f)/SR
    return np.sign(np.sin(ph))*0.25*np.exp(-tt*9)+np.sin(ph)*0.6*np.exp(-tt*8)
def success():
    a=pluck(midi(76),0.9); b=pluck(midi(83),1.2)
    y=np.zeros(int(1.4*SR)); y[:len(a)]+=a; y[int(0.09*SR):int(0.09*SR)+len(b)]+=b[:len(y)-int(0.09*SR)]; return y*0.7
W=whoosh(); WL=whoosh(1.0)
for h in sfx["HITS"]:
    k,tt0,g=h["k"],h["t"],h["g"]
    if k=="whoosh": place(S,W,tt0-0.15,0.10*g)
    elif k=="tick": place(S,tick(2100,0.6),tt0,0.16*g)
    elif k=="deny": place(S,deny(),tt0,0.13*g)
    elif k=="success": place(S,success(),tt0,0.12*g)
    # chime handled by bells
# typing
for ty in sfx["TYPES"]:
    for i in range(ty["n"]):
        if i%2==1 and ty["cps"]>50: continue
        tt0=ty["t"]+i/ty["cps"]
        f=2600+rng.integers(-500,500)
        place(S,tick(f,1),tt0,0.06)
S=reverb(S,sec=1.0,wet=0.12,seed=9)
wr("audio/sfx_raw.wav",S)

# ---------------- sidechain duck ----------------
env=np.abs(vo); env=lp(env,8,1); env=env/(env.max()+1e-9)
env=np.clip(env*3.2,0,1)
duck=1-0.62*env
# smooth release
duck=signal.lfilter([1-0.9997],[1,-0.9997],duck)  # ~ slow smoothing
duck=np.minimum(duck, 1.0)
wr("audio/music_duck.wav",music*duck)
wr("audio/sfx_duck.wav",S*(1-0.35*env))
print("stems ok")
