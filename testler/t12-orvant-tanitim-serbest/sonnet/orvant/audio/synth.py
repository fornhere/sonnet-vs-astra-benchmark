# Orvant tanıtım — prosedürel ses tasarımı (numpy). Zamanlar index.html'deki sahne zamanlarıyla eşleşir.
import numpy as np, wave, json, os
SR=44100
here=os.path.dirname(os.path.abspath(__file__))
S=json.load(open(os.path.join(here,"..","src","cues.json")))["S"]
A,B,C,D,E,F,G,H,END=[S[k] for k in "A B C D E F G H END".split()]
TOT=END+2.0
N=int(TOT*SR)
rng=np.random.default_rng(7)
MASTER=np.zeros((2,N),dtype=np.float64)
REV=np.zeros(N,dtype=np.float64)
DELAY=np.zeros(N,dtype=np.float64)
DUCK_T=[]  # kick times for sidechain

def tt(d): return np.arange(int(d*SR))/SR
def put(sig,t,g=1.0,pan=0.0,rev=0.0,dly=0.0):
    i=int(t*SR)
    if i<0:
        sig=sig[-i:];i=0
    n=min(len(sig),N-i)
    if n<=0:return
    s=sig[:n]*g
    l=np.cos((pan+1)*np.pi/4);r=np.sin((pan+1)*np.pi/4)
    MASTER[0,i:i+n]+=s*l;MASTER[1,i:i+n]+=s*r
    if rev:REV[i:i+n]+=s*rev
    if dly:DELAY[i:i+n]+=s*dly
def fftfilt(x,lo=None,hi=None,slope=6):
    X=np.fft.rfft(x);f=np.fft.rfftfreq(len(x),1/SR);m=np.ones_like(f)
    if lo:m*=1/(1+(lo/np.maximum(f,1))**slope)
    if hi:m*=1/(1+(f/hi)**slope)
    return np.fft.irfft(X*m,len(x))
def noise(d):return rng.standard_normal(int(d*SR))
def adsr(n,a,r,curve=2.0):
    t=np.arange(n)/SR;e=np.ones(n)
    if a>0:e=np.minimum(1,t/a)
    d=n/SR
    if r>0:e=e*np.clip((d-t)/r,0,1)
    return e
def expd(d,k):return np.exp(-tt(d)*k)
def sine(f,d):return np.sin(2*np.pi*f*tt(d))
def saw(f,d,nh=14,det=0.0):
    t=tt(d);o=np.zeros_like(t)
    for n in range(1,nh+1):
        if f*n>SR/2.2:break
        o+=np.sin(2*np.pi*f*(1+det)*n*t+n*1.7)/n
    return o*0.6
def mtof(m):return 440*2**((m-69)/12)
# ---------------- enstrümanlar
def kick(t,g=1.0):
    d=.42;x=tt(d);f=42+150*np.exp(-x*32)
    ph=2*np.pi*np.cumsum(f)/SR
    s=np.sin(ph)*np.exp(-x*7.5)+0.25*np.sin(ph*2)*np.exp(-x*20)
    s+=noise(d)*np.exp(-x*400)*0.25
    put(s,t,g*0.95);DUCK_T.append(t)
def hat(t,g=.3,open_=False):
    d=.22 if open_ else .06;s=fftfilt(noise(d),lo=7000)*np.exp(-tt(d)*(14 if open_ else 70))
    put(s,t,g,pan=.25)
def clap(t,g=.5):
    d=.3;x=tt(d);s=np.zeros_like(x)
    for o in(0,.012,.024):
        seg=fftfilt(noise(d),lo=900,hi=5500)*np.exp(-np.maximum(x-o,0)*45)*(x>=o);s+=seg
    s+=fftfilt(noise(d),lo=1200,hi=3000)*np.exp(-x*12)*.5
    put(s,t,g,rev=.25)
def tick(t,f=2400,g=.2,pan=0.0):
    d=.05;x=tt(d);s=np.sin(2*np.pi*f*x)*np.exp(-x*90)+fftfilt(noise(d),lo=2500,hi=9000)*np.exp(-x*130)*.6
    put(s,t,g,pan=pan,rev=.1)
def pop(t,f=600,g=.25,pan=0.0):
    d=.16;x=tt(d);ff=f*(1+1.2*np.exp(-x*40));ph=2*np.pi*np.cumsum(ff)/SR
    put(np.sin(ph)*np.exp(-x*22),t,g,pan=pan,rev=.15)
def bell(t,f,g=.25,d=2.2,pan=0.0,rev=.5,dec=2.6):
    x=tt(d);m=np.sin(2*np.pi*f*3.5*x)*np.exp(-x*5)*1.6
    s=np.sin(2*np.pi*f*x+m)*np.exp(-x*dec)+.3*np.sin(2*np.pi*f*2*x)*np.exp(-x*dec*1.6)
    put(s,t,g,pan=pan,rev=rev,dly=.15)
def pluck(t,m,g=.16,pan=0.0,d=.7):
    f=mtof(m);x=tt(d);s=np.zeros_like(x)
    for n in range(1,9):
        if f*n>SR/2.2:break
        s+=np.sin(2*np.pi*f*n*x+n)/n*np.exp(-x*(5+n*4.5))
    put(s,t,g,pan=pan,rev=.25,dly=.35)
def sub(t,m,d,g=.5,det=0):
    f=mtof(m);x=tt(d);e=adsr(len(x),.01,.08)
    s=(np.sin(2*np.pi*f*x)+.22*np.sin(2*np.pi*f*2*x))*e
    put(s,t,g)
def whoosh(t0,d,g=.35,up=True,pan=0.0,rev=.3):
    x=tt(d);n=noise(d);out=np.zeros_like(x)
    cs=[300,700,1500,3200,6500]
    for i,c in enumerate(cs):
        band=fftfilt(n,lo=c*.6,hi=c*1.6,slope=4)
        pos=(i+.5)/len(cs)
        if not up:pos=1-pos
        center=pos*.85+.05;w=.22
        env=np.exp(-((x/d-center)/w)**2)
        out+=band*env
    out*=np.sin(np.pi*np.clip(x/d,0,1))**1.2
    put(out,t0,g,pan=pan,rev=rev)
def riser(t0,d,g=.35):
    x=tt(d);n=fftfilt(noise(d),lo=200)
    env=(x/d)**2.2
    f=200*(1+9*(x/d)**1.6);ph=2*np.pi*np.cumsum(f)/SR
    s=n*env*.8+np.sin(ph)*env*.35+np.sin(ph*1.5)*env*.15
    trem=1+0.3*np.sin(2*np.pi*(6+10*x/d)*x)
    put(s*trem,t0,g,rev=.35)
def impact(t,g=1.0,long=2.6):
    x=tt(long);f=34+130*np.exp(-x*9);ph=2*np.pi*np.cumsum(f)/SR
    s=np.sin(ph)*np.exp(-x*1.6)
    cr=fftfilt(noise(long),lo=1500)*np.exp(-x*2.2)*.45
    lo=fftfilt(noise(long),hi=180)*np.exp(-x*4)*.6
    put(s+cr+lo,t,g*.85,rev=.55)
def thud(t,g=.8):
    x=tt(.7);f=52+70*np.exp(-x*25);ph=2*np.pi*np.cumsum(f)/SR
    s=np.sin(ph)*np.exp(-x*5)+fftfilt(noise(.7),hi=400)*np.exp(-x*14)*.5
    put(s,t,g,rev=.2)
def buzz(t,g=.35):
    d=.55;x=tt(d);s=saw(98,d,10)+saw(103.5,d,10)+.6*saw(73,d,8)
    s*=adsr(len(x),.004,.2)*(1+.4*np.sin(2*np.pi*22*x));put(fftfilt(s,hi=2400),t,g,rev=.2)
def pad(t0,notes,d,g=.06,bright=10,att=.5,rel=.9):
    n=int((d+rel)*SR);e=np.minimum(1,tt(d+rel)/att)*np.clip((d+rel-tt(d+rel))/rel,0,1)
    L=np.zeros(n);Rr=np.zeros(n)
    for m in notes:
        f=mtof(m);L+=saw(f,d+rel,bright,det=.0035)+saw(f,d+rel,bright,det=-.0035)*0
        Rr+=saw(f,d+rel,bright,det=-.0035)
    i=int(t0*SR);k=min(n,N-i)
    if k<=0:return
    MASTER[0,i:i+k]+=(L*e)[:k]*g;MASTER[1,i:i+k]+=(Rr*e)[:k]*g
    REV[i:i+k]+=((L+Rr)*e)[:k]*g*.5
# ---------------- müzik yapısı
chords=[(57,60,64,69),(53,57,60,65),(48,55,60,64),(55,59,62,67)]  # Am F C G
roots=[33,29,36,31]
def chord_at(t,t0):return int((t-t0)//2)%4
# 0-8: gerilim
def drone(t0,t1,g):
    d=t1-t0;x=tt(d)
    s=saw(55,d,8)*.5+saw(82.4,d,6)*.3+sine(27.5,d)*.6
    swell=np.clip(x/d,0,1)**1.4
    put(s*(.25+.75*swell),t0,g,rev=.2)
drone(0,5.0,.5)
for i,t in enumerate([.5,1.0,1.5,2.0]):tick(t,1500+i*250,.45,pan=-.2)
for k in range(10):tick(2.5+.25*k,2800+(k%4)*300,.36,pan=(k%4-1.5)*.15)
thud(5.5,.95);whoosh(5.5,.9,.25,up=False)
tick(5.5,900,.3)
# soru cümlesi: sessiz + riser
riser(6.0,2.0,.5)
pad(6.05,(45,52,57,60),1.9,.045,bright=6,att=1.2,rel=.2)
for t in (6.05,6.45):pop(t,420,.16)
# B: logo
impact(B,1.05)
whoosh(B,1.2,.3,up=False,rev=.6)
bell(B+.15,880,.10,2.4);bell(B+.85,1318.5,.12,2.4,pan=.3);bell(B+1.0,660,.1,2.4,pan=-.3)
for i in range(5):bell(B+1.0+i*.075,1760*(1 if i%2==0 else 1.5)/(1 if i<3 else 2),.05,1.6,pan=(i-2)*.25)
bell(B+2.3,1760,.07,2.4);bell(B+3.2,1318.5,.05,1.8)
# pad B..H
t=B
while t<H+6.0-.001:
    ci=chord_at(t+.001,B)
    pad(t,chords[ci],2.0,.05 if t<C else .052,bright=(8 if t<C else 11))
    t+=2.0
# final chord H+6 .. END
pad(H+6.0,(45,52,57,60,64,67),3.8,.06,bright=12,att=.6,rel=1.6)
# bas & ritim
kick_on=lambda t:(C<=t<H+3.75) or (H+6.0<=t<END-.5 and False)
def bass_bar(t0,ci,g):
    r=roots[ci]
    sub(t0,r,.45,g);sub(t0+.75,r,.22,g*.8);sub(t0+1.0,r+12,.22,g*.6);sub(t0+1.5,r,.4,g*.8)
for tb in np.arange(B,C,2.0):
    ci=chord_at(tb+.001,B);sub(tb,roots[ci],1.2,.32) if tb>=B+2 else None
    if tb>=B+2 and tb<C:kick(tb,.55)
for tb in np.arange(C,H+3.75,2.0):
    ci=chord_at(tb+.001,B);g=.36 if tb<F else .34
    if tb<H+3.75-1.0:bass_bar(tb,ci,g)
    for bb in range(4):
        tk=tb+bb*.5
        if tk<H+3.75:kick(tk,.9 if bb==0 else .78)
        if D<=tk and bb in(1,3) and tk<H+3.75 and not (F<=tk<F+4):clap(tk,.32 if tk<E else .42)
for tb in np.arange(C+.25,H+3.75,.5):
    if tb>=C+4 and not (F<=tb<F+4):hat(tb,.10+.06*(tb>=E),open_=False)
for tb in np.arange(C+.5,H+3.75,1.0):
    if tb>=D and not (F<=tb<F+4):hat(tb,.16,open_=True)
# arp
def arp_bar(t0,ci,g,oct_=12):
    ns=chords[ci];pat=[0,1,2,3,2,1,2,3]
    for i,p in enumerate(pat):
        m=ns[p]+oct_;pluck(t0+i*.25,m,g*(1 if i%2==0 else .75),pan=(-.4 if i%2 else .4))
for tb in np.arange(B+4,H+3.75,2.0):
    ci=chord_at(tb+.001,B)
    g=.08 if tb<C else (.11 if tb<E else .14)
    if tb<F or tb>=F+4:arp_bar(tb,ci,g,12 if tb<E else 12)
    if tb>=E and tb<F:arp_bar(tb+1.0,ci,.1,24)
# arp'ı 1s'lik yarım çubuk olarak kes: (yukarıdaki tüm bar) — HAT/CLAP zaten enerjiyi taşır
# ---------------- olay sesleri
whoosh_t=[C,D,E,F,G,H]
for i,t in enumerate(whoosh_t):
    whoosh(t-.32,.7,.42,up=True,pan=(-.3 if i%2 else .3),rev=.3);thud(t,.55);
# C — S1
tick(C+.4,1800,.18);
for i in range(46):tick(C+1.3+i*.046+.023,3000+(i%5)*180,.05,pan=(i%3-1)*.2)
pop(C+3.5,700,.22);whoosh(C+3.45,.5,.2,up=True,rev=.4);
whoosh(C+3.6,.9,.28,up=True,rev=.4)
for t in(C+3.9,C+4.05):pop(t,330,.22)
for i,t in enumerate((C+4.4,C+4.48,C+4.56,C+4.64)):pop(t,540+i*70,.12,pan=-.3)
for i in range(8):pop(C+5.0+i*.045,900+i*60,.06,pan=.3)
for i,t in enumerate((C+5.55,C+5.95,C+6.35)):
    tick(t,3600,.3);bell(t+.02,[659.3,830.6,987.8][i],.1,1.4,pan=(i-1)*.3)
whoosh(C+7.0,.7,.3,up=False,rev=.4)
pop(C+7.4,300,.2)
for i in range(4):tick(C+7.95+i*.16,2600+i*300,.2)
whoosh(C+8.1,.28,.35,up=True,rev=.1)
impact(C+8.38,.8,1.6);thud(C+8.38,.9);tick(C+8.38,600,.4)
bell(C+8.5,1318.5,.08,1.8)
# D — S2
pop(D+.55,500,.2);pop(D+.9,260,.2)
lv={0:0,1:1,2:1,3:2,4:2,5:2,6:3}
for i in range(7):pop(D+1.5+[0,1,1,2,2,2,3][i]*.42+(i%3)*.06,[520,640,760,720,880,940,1040][i],.13,pan=(i%3-1)*.35)
for i in range(3):pop(D+2.2+i*.28,430+i*30,.1,pan=.4)
for j,t in enumerate((D+4.6,D+5.3)):
    tick(t,900,.35);bell(t+.03,[880,1318.5][j],.14,1.6,pan=(-.3+j*.6));bell(t+.08,[1108.7,1661][j],.09,1.6,pan=(.3-j*.6))
thud(D+5.9,.35)
x=tt(1.1);f=300*np.exp(x*1.6);put(np.sin(2*np.pi*np.cumsum(f)/SR)*adsr(len(x),.05,.4)*.1,D+6.1,1,rev=.5)
whoosh(D+6.1,1.1,.25,up=True,rev=.4)
# E — S3
whoosh(E+2.0,.7,.22,up=True,rev=.3)
for i in range(4):pop(E+2.0+i*.1,420+i*40,.08,pan=(i-1.5)*.3)
pop(E+2.5,640,.2);pop(E+2.5,480,.12)
for t,f_,pn in((E+3.85,1100,-.3),(E+4.1,900,.3)):
    pop(t,f_,.24,pan=pn);bell(t,f_*1.5,.06,.9,pan=pn)
def scan(t,d=1.0,g=.3):
    x=tt(d);f=350*np.exp(x/d*2.4);ph=2*np.pi*np.cumsum(f)/SR
    put(np.sin(ph)*adsr(len(x),.02,.15)*.14+fftfilt(noise(d),lo=1500,hi=5000)*adsr(len(x),.05,.2)*.15,t,g*2,rev=.3)
def pass_(t,big=False):
    for i,fq in enumerate((659.3,830.6,987.8,1318.5) if big else (659.3,987.8,1318.5)):bell(t+i*.06,fq,.11 if big else .09,2.0,pan=(i-1.5)*.3,rev=.5)
    put(sine(110,.5)*expd(.5,6)*.5,t,.6)
scan(E+5.0);
for i,t in enumerate((E+5.2,E+5.5,E+5.8)):tick(t,2600+i*450,.32);pop(t,500+i*140,.10)
pass_(E+6.05)
scan(E+7.1)
for i,t in enumerate((E+7.3,E+7.6)):tick(t,2600+i*450,.32);pop(t,500+i*140,.10)
tick(E+7.9,1200,.35);pop(E+7.9,180,.22)
buzz(E+8.15,.42);impact(E+8.15,.6,1.4);
whoosh(E+8.2,.5,.25,up=False,rev=.2)
whoosh(E+8.6,.6,.2,up=False,rev=.3)
pop(E+9.0,360,.18);whoosh(E+9.05,1.0,.15,up=True,rev=.3)
scan(E+10.85,.8)
for i,t in enumerate((E+11.0,E+11.2,E+11.4)):tick(t,2600+i*450,.32);pop(t,500+i*140,.10)
pass_(E+11.6,True)
pop(E+11.9,500,.14)
tick(E+12.45,1800,.3);bell(E+12.47,1318.5,.12,1.6)
bell(E+12.75,987.8,.1,2.4);bell(E+12.78,1318.5,.12,2.6);bell(E+12.82,1975.5,.1,2.6);put(sine(110,.8)*expd(.8,4)*.6,E+12.75,.6)
# F
for i in range(4):
    whoosh(F+.85+i*.42,.55,.14,up=True,pan=(-.45+i*.3),rev=.3);pop(F+1.05+i*.42,500+i*90,.12,pan=(-.45+i*.3))
tick(F+1.85,3200,.3);bell(F+1.9,1318.5,.1,1.6)
thud(F+2.05,.5);tick(F+2.06,700,.4)
for i in range(4):pop(F+2.15+i*.1,500+i*130,.15,pan=(i-1.5)*.3)
x=tt(.9);put(np.sin(2*np.pi*np.cumsum(400*np.exp(x*1.0))/SR)*adsr(len(x),.05,.3)*.06,F+2.35,1,rev=.4)
for i in range(6):bell(F+2.6+i*.09,[1318.5,1568,1975.5,1568,1318.5,1108.7][i],.05,1.2,pan=(i-2.5)*.3)
for i in range(4):tick(F+3.7+i*.32,3200,.14)
# G
for i in range(6):
    if i<3:tick(G+1.2+i*.34,3300,.28);bell(G+1.22+i*.34,[659.3,830.6,987.8][i],.1,1.4,pan=(i-1)*.3)
    else:pop(G+1.2+i*.34,[330,300,270][i-3],.09,pan=(i-4)*.3)
x=tt(1.6);put(np.sin(2*np.pi*np.cumsum(250*np.exp(x*.5))/SR)*adsr(len(x),.1,.4)*.05,G+1.3,1,rev=.3)
bell(G+3.0,1568,.12,2.0,pan=.2);tick(G+3.0,2000,.3)
whoosh(G+4.2,.9,.2,up=True,rev=.3)
x=tt(2.6);f=180*np.exp(x/2.6*1.9);ph=2*np.pi*np.cumsum(f)/SR
put(np.sin(ph)*adsr(len(x),.2,.3)*.08*(1+.25*np.sin(2*np.pi*7*x)),G+4.8,1,rev=.3)
bell(G+7.4,1318.5,.12,2.2);bell(G+7.45,1975.5,.08,2.2)
# H
for i in range(9):tick(H+1.5+i*.26,3300+(i%3)*300,.12,pan=(i%3-1)*.3)
x=tt(2.3);put(fftfilt(noise(2.3),lo=3000)*adsr(len(x),.4,.3)*.06,H+1.5,1,rev=.3)
whoosh(H+3.75,.6,.22,up=False,rev=.5)
whoosh(H+4.0,.8,.3,up=True,rev=.5)
for t in(H+4.1,H+4.4):pop(t,420,.14)
riser(H+5.3,.8,.4)
put(np.zeros(10),H+5.95,0)
impact(H+6.0,.85,3.0)
bell(H+6.15,880,.08,2.6);bell(H+6.9,1318.5,.1,2.8,pan=.3);bell(H+7.05,659.3,.1,2.8,pan=-.3)
for i in range(5):bell(H+6.9+i*.075,1760*(1 if i%2==0 else 1.5)/(1 if i<3 else 2),.045,1.8,pan=(i-2)*.25)
bell(H+7.9,1760,.06,2.6);bell(H+8.5,1318.5,.05,3.0,pan=-.2)
sub(H+6.0,33,3.6,.36);sub(H+6.0,45,3.6,.22)
# ---------------- sidechain pad duck
duck=np.ones(N)
for t in DUCK_T:
    i=int(t*SR);n=int(.32*SR)
    if i+n<N:duck[i:i+n]*=1-0.28*np.exp(-np.arange(n)/SR*9)
# (ducking uygula: yalnız pad için karışımın tamamına hafifçe)
# ---------------- delay & reverb
def mkrev(dur=3.2):
    n=int(dur*SR);x=np.arange(n)/SR
    ir=rng.standard_normal((2,n))*np.exp(-x*2.1)
    ir[:,0]=0
    for c in range(2):ir[c]=fftfilt(ir[c],lo=200,hi=6500,slope=4)
    return ir*0.045
ir=mkrev()
def fftconv(sig,h):
    n=len(sig)+len(h)-1;m=1<<(n-1).bit_length()
    return np.fft.irfft(np.fft.rfft(sig,m)*np.fft.rfft(h,m),m)[:len(sig)]
wetL=fftconv(REV,ir[0]);wetR=fftconv(REV,ir[1])
# delay (noktalı sekizlik = .375s), geri besleme
dl=int(.375*SR);dly=DELAY.copy();out=np.zeros(N)
for k in range(1,5):
    sh=np.zeros(N);sh[dl*k:]=dly[:N-dl*k];out+=sh*(.42**k)
out=fftfilt(out,lo=300,hi=5000,slope=4)
MASTER[0]+=wetL*1.0+out*.9;MASTER[1]+=wetR*1.0+out*.9
# ---------------- master
mix=MASTER
mix[:,:]*=duck[None,:]*0+1
# hafif "şeffaf" sıkıştırma: soft clip
peak=np.max(np.abs(mix))
mix=np.tanh(mix/(peak*.55))*.9
# giriş/çıkış
fin=np.clip(np.arange(N)/SR/.6,0,1);fout=np.clip((END+.3-np.arange(N)/SR)/1.3,0,1)
mix*= (fin*fout)[None,:]
mix=mix[:, :int(END*SR)]
mix16=np.int16(np.clip(mix,-1,1)*32000)
with wave.open(os.path.join(here,"orvant.wav"),"wb") as w:
    w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(mix16.T.tobytes())
print("ok",END,"peak",peak)
