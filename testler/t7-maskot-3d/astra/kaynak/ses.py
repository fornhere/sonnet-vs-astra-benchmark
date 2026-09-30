import numpy as np, wave, os
RATE=48000; N=RATE*8; mix=np.zeros((N,2),dtype=np.float64); rng=np.random.default_rng(9)
def add(sig,start,pan=0,gain=1):
 j=int(start*RATE);end=min(N,j+len(sig));sig=sig[:end-j]*gain
 mix[j:end,0]+=sig*np.sqrt((1-pan)/2);mix[j:end,1]+=sig*np.sqrt((1+pan)/2)
def bell(freq,t,dur=.8,gain=.12,pan=0):
 x=np.arange(int(RATE*dur))/RATE
 sig=(np.sin(2*np.pi*freq*x)*np.exp(-x*6)+.28*np.sin(2*np.pi*freq*2.005*x)*np.exp(-x*13)+.08*np.sin(2*np.pi*freq*3*x)*np.exp(-x*20))*(1-np.exp(-x*220))
 add(sig,t,pan,gain)
# Soft, airy spin into a rounded landing.
x=np.arange(int(RATE*.62))/RATE
noise=rng.normal(size=len(x));noise=np.convolve(noise,np.ones(33)/33,mode='same')
add(noise*np.sin(np.pi*x/.62)**2,.04,-.35,.18)
x=np.arange(int(RATE*.35))/RATE
add(np.sin(2*np.pi*(115*x-70*x*x))*np.exp(-x*17)*(1-np.exp(-x*400)),1.0,-.3,.16)
bell(392,1.17,.7,.11,-.25)
# Three tiny greeting notes follow the hand movement.
for t,f in [(2.43,659.255),(2.74,783.991),(3.05,987.767)]:bell(f,t,.55,.07,.15)
# A four-note original ident lands with the four logo letters.
for t,f,p in [(3.48,261.626,-.15),(3.69,329.628,0),(3.90,391.995,.15),(4.11,523.251,.30)]:
 bell(f,t,1.8,.18,p);bell(f*2,t,1.3,.045,p)
# Sustained consonant tail, quiet enough to sit under channel dialogue.
x=np.arange(int(RATE*2.6))/RATE
env=(1-np.exp(-x*5))*np.exp(-x*1.7)
pad=sum(np.sin(2*np.pi*f*x) for f in [130.813,196,261.626])/3*env
add(pad,4.15,0,.07)
# Short stereo reflections.
for delay,gain in [(0.071,.11),(.113,.075),(.181,.04)]:
 shift=int(delay*RATE);mix[shift:]+=mix[:-shift,::-1]*gain
mix*=.66/max(.66,np.max(np.abs(mix)))
fade=np.minimum(1,(8-np.arange(N)/RATE)/.5);mix*=fade[:,None]
out=os.path.join(os.path.dirname(__file__),'forn-ses.wav')
with wave.open(out,'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(RATE);w.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
print(out)
