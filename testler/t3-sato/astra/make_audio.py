"""Original 24-second ambient score: bowed drones, glass bells and tidal air.
No samples, downloads, or third-party recordings. Python + NumPy only.
"""
import numpy as np, wave, os
root=os.path.dirname(os.path.abspath(__file__))
sr=48000;duration=24;n=sr*duration;t=np.arange(n)/sr
rng=np.random.default_rng(28)
stereo=np.zeros((n,2))
# Slow suspended D minor harmony, with a gentle high tide on the final reveal.
for f,gain,phase in [(73.416,.15,0),(110,.08,.3),(146.832,.055,.7),(174.614,.043,1.2),(220,.04,.1),(293.665,.025,2)]:
    env=np.minimum(t/3,1)*np.minimum((duration-t)/3,1)
    env*=.75+.25*np.sin(t*.19+phase)**2
    for ch in range(2):
        detune=f*(1+(-1 if ch==0 else 1)*.0008)
        tone=np.sin(2*np.pi*detune*t+.002*f*np.sin(t*.21+phase))
        tone+=.18*np.sin(2*np.pi*detune*2*t+.5)+.06*np.sin(2*np.pi*detune*3*t)
        stereo[:,ch]+=tone*env*gain
# Bell motif and its natural stereo echoes.
for when,f,level in [(1.8,587.33,.09),(5,440,.06),(9.8,523.25,.065),(13,440,.04),(17.2,587.33,.07),(20,880,.035)]:
    for delay,vol in [(0,1),(.31,.27),(.69,.17),(1.12,.09)]:
        u=t-when-delay;tt=np.maximum(u,0)
        bell=(np.sin(2*np.pi*f*tt)*np.exp(-tt/2)+.4*np.sin(2*np.pi*f*2.003*tt)*np.exp(-tt/.9)+.15*np.sin(2*np.pi*f*4.09*tt)*np.exp(-tt/.5))
        bell*=np.minimum(tt/.018,1)*(u>=0)*level*vol
        stereo[:,0]+=bell*.8;stereo[:,1]+=bell*(.7 if delay==0 else 1)
# Low-pass random ocean/wind bed implemented in the frequency domain.
for ch in range(2):
    white=rng.normal(0,1,n);sp=np.fft.rfft(white);freq=np.fft.rfftfreq(n,1/sr)
    sp*=np.minimum(freq/100,1)/(1+(freq/600)**2)
    bed=np.fft.irfft(sp,n=n);bed/=np.std(bed)
    stereo[:,ch]+=bed*.008*(.7+.3*np.sin(t*.65+ch*.5))
fade=np.minimum(t/1.5,1)*np.minimum((duration-t)/2.8,1)
stereo*=fade[:,None];stereo=np.tanh(stereo*1.2)*.79
with wave.open(os.path.join(root,'assets','tidal_score.wav'),'w') as out:
    out.setnchannels(2);out.setsampwidth(2);out.setframerate(sr);out.writeframes((stereo*32767).astype('<i2').tobytes())
print('Original stereo score written.')
