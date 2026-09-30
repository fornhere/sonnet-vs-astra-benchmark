import json, subprocess, numpy as np, wave
from pathlib import Path
F=json.load(open('gps-film/timing.json')); sr=48000;n=int(np.ceil(F['duration']*sr));v=np.zeros(n);m=np.zeros((n,2));fx=np.zeros((n,2))
for s in F['scenes']:
 data=subprocess.check_output(['ffmpeg','-v','error','-i',f'gps-film/assets/vo-{s["id"]}.wav','-f','f32le','-ar',str(sr),'-ac','1','-'])
 a=np.frombuffer(data,dtype=np.float32);start=round(s['voiceStart']*sr);v[start:min(start+len(a),n)]+=a[:min(len(a),n-start)]
# Original restrained, instrumental score. D minor add9 -> Bb maj7 -> F -> C sus2.
chords=[[146.832,174.614,220.,329.628],[116.541,174.614,220.,293.665],[130.813,174.614,220.,261.626],[130.813,195.998,293.665,329.628]]
def add(arr,start,a,pan=0):
 p=int(start*sr);a=a[:max(0,min(len(a),n-p))]
 if len(a):arr[p:p+len(a),0]+=a*np.sqrt((1-pan)/2);arr[p:p+len(a),1]+=a*np.sqrt((1+pan)/2)
for k,start in enumerate(np.arange(0,F['duration'],6)):
 tt=np.arange(min(7*sr,n-int(start*sr)))/sr;env=np.minimum(tt/1.4,1)*np.minimum((len(tt)/sr-tt)/2,1)
 a=np.zeros(len(tt));freqs=chords[k%4]
 for f in freqs:a+=np.sin(2*np.pi*f*tt+0.4*np.sin(2*np.pi*.12*tt))*.006+np.sin(2*np.pi*f*1.002*tt)*.003
 add(m,start,a*env,(-1 if k%2 else 1)*.18)
for k,start in enumerate(np.arange(.4,F['duration']-1,.75)):
 tt=np.arange(int(1.8*sr))/sr;f=chords[int(start/6)%4][[0,2,1,3,2,1,3,2][k%8]]*2
 env=np.exp(-tt*4.7)*np.minimum(tt/.007,1);a=(np.sin(2*np.pi*f*tt)+.25*np.sin(2*np.pi*f*2*tt))*env*.022
 add(m,start,a,.5*np.sin(k*1.7))
# Small rounded radio pings and transitions, only on meaningful beats.
for s in F['scenes'][1:]:
 tt=np.arange(int(.42*sr))/sr;env=np.sin(np.pi*tt/.42)**2
 a=np.sin(2*np.pi*(220*tt+420*tt*tt))*env*.028
 add(fx,s['start'],a,0)
for idx,rels in [(1,[1.6,4.1,6.6]),(2,[1,4.1]),(3,[.6,3.3,6.2]),(4,[4.5,7]),(5,[4.5,4.85,5.2]),(6,[3.2,5.7]),(7,[2,2.9,3.8])]:
 for j,r in enumerate(rels):
  tt=np.arange(int(.3*sr))/sr;f=740+j*100;env=np.exp(-tt*15)*np.minimum(tt/.004,1)
  add(fx,F['scenes'][idx]['start']+r,np.sin(2*np.pi*f*tt)*env*.045,(j-1)*.25)
# Voice-following level carve; synthesized music carries no energy in speech presence band.
block=480;env=np.array([np.sqrt(np.mean(v[i:i+block]**2)) for i in range(0,n,block)])
follow=[];e=0
for x in env:e=max(x,e*.985);follow.append(e)
gain=1-.70*np.clip(np.interp(np.arange(n),np.arange(len(follow))*block,follow)/.045,0,1)
m*=gain[:,None]
fade=np.minimum(np.arange(n)/sr/1.3,1)*np.minimum((n-np.arange(n))/sr/1.4,1)
m*=fade[:,None]
out=v[:,None]*np.ones((1,2))*.95+m+fx;out=np.tanh(out*1.1)/1.1
with wave.open('gps-film/assets/premix.wav','wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(out,-1,1)*32767).astype('<i2').tobytes())
subprocess.run(['ffmpeg','-y','-v','error','-i','gps-film/assets/premix.wav','-af','loudnorm=I=-16:TP=-1.5:LRA=9','-ar','48000','-c:a','pcm_s16le','gps-film/assets/master.wav'],check=True)
print('Audio duration',n/sr,'seconds')
