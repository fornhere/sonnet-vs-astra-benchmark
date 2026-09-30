from faster_whisper import WhisperModel
import json
p='/home/forn/.cache/huggingface/hub/models--Systran--faster-whisper-large-v3/snapshots/edaa852ec7e145841d8ffdb056a99866b5f0a478'
try:m=WhisperModel(p,device='cuda',compute_type='float16',local_files_only=True)
except Exception as e:
 print('GPU unavailable; CPU verification',str(e)[:140],flush=True);m=WhisperModel(p,device='cpu',compute_type='int8',cpu_threads=6,local_files_only=True)
segs,info=m.transcribe('gps-film/assets/master.wav',language='tr',beam_size=3)
r=[]
for s in segs:
 print(round(s.start,2),round(s.end,2),s.text,flush=True);r.append(dict(start=s.start,end=s.end,text=s.text))
json.dump(r,open('qa/heard-transcript.json','w'),ensure_ascii=False,indent=2)
