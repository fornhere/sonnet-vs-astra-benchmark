import json,subprocess,os
f='final.mp4';p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',f]));v=next(s for s in p['streams'] if s['codec_type']=='video');a=next(s for s in p['streams'] if s['codec_type']=='audio');assert (v['width'],v['height'])==(1920,1080);assert 60<=float(p['format']['duration'])<=90;assert v['r_frame_rate']=='30/1';assert a['channels']==2
subprocess.run(['ffmpeg','-v','error','-i',f,'-f','null','-'],check=True,stderr=open('qa/decode-errors.txt','w'))
assert os.path.getsize('qa/decode-errors.txt')==0
json.dump(p,open('qa/final-probe.json','w'),ensure_ascii=False,indent=2)
print('Verified',v['codec_name'],v['width'],v['height'],v['r_frame_rate'],p['format']['duration'],a['codec_name'],'stereo; clean full decode')
