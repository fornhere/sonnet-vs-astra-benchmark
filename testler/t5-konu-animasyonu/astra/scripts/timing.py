import json,subprocess
lines=json.load(open('gps-film/script.json')); start=0; captions=[]
for s in lines:
 p='gps-film/assets/vo-'+s['id']+'.wav'
 dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',p]))
 s.update(start=round(start,3),duration=round(dur+.35,3),voiceStart=round(start+.15,3),voiceDuration=dur)
 words=json.load(open(p.replace('.wav','.json'))); chunk=[]
 for w in words:
  chunk.append(w)
  if len(' '.join(x['text'] for x in chunk))>54 or w['text'].endswith(('.', '?', ':')) or len(chunk)>=8:
   captions.append(dict(text=' '.join(x['text'] for x in chunk),start=start+.15+chunk[0]['start'],end=start+.15+chunk[-1]['end']+.12));chunk=[]
 if chunk: captions.append(dict(text=' '.join(x['text'] for x in chunk),start=start+.15+chunk[0]['start'],end=start+.15+chunk[-1]['end']+.12))
 start+=dur+.35
out={'duration':round(start,3),'scenes':lines,'captions':captions}
json.dump(out,open('gps-film/timing.json','w'),ensure_ascii=False,indent=2)
open('gps-film/assets/timing.js','w').write('window.FILM='+json.dumps(out,ensure_ascii=False)+';')
def stamp(s):
 ms=round(s*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
open('altyazi.srt','w').write('\n\n'.join(f'{i+1}\n{stamp(c["start"])} --> {stamp(c["end"])}\n{c["text"]}' for i,c in enumerate(captions)))
print([(x['id'],x['start'],x['duration']) for x in lines]);print('DURATION',start)
