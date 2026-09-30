from faster_whisper import WhisperModel
import json
m=WhisperModel('base',device='cpu',compute_type='int8',cpu_threads=2,download_root='qa/models')
segs,info=m.transcribe('gps-film/assets/master.wav',language='tr',beam_size=1)
r=[]
for s in segs:
 print(round(s.start,2),round(s.end,2),s.text,flush=True);r.append(dict(start=s.start,end=s.end,text=s.text))
json.dump(r,open('qa/heard-transcript.json','w'),ensure_ascii=False,indent=2)
