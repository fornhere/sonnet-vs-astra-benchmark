from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, zipfile, re
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'kaynak/manifest.json').read_text())
font=ImageFont.truetype('/usr/share/fonts/gsfonts/NimbusSans-Regular.otf',14)
heading=ImageFont.truetype('/usr/share/fonts/gsfonts/URWBookman-Demi.otf',30)
placements=[];x=25;y=100;rh=0
for item in manifest:
 im=Image.open(ROOT/'png'/(item['size']+'.png')).convert('RGB');im.thumbnail((530,650))
 if x+im.width+25>1600:x=25;y+=rh+58;rh=0
 placements.append((x,y,item,im));x+=im.width+25;rh=max(rh,im.height)
out=Image.new('RGB',(1600,y+rh+55),'#e7e0d3');draw=ImageDraw.Draw(out)
draw.text((25,22),'demlik / Demini Al.',font=heading,fill='#49241F')
draw.text((1070,40),'10 boyut · 5 HTML5 · Ekim kampanyası',font=font,fill='#49241F')
for x,y,item,im in placements:
 draw.text((x,y),item['size'].replace('x',' × ')+('   /   PNG + HTML5' if item['animated'] else '   /   PNG'),font=font,fill='#49241F')
 out.paste(im,(x,y+25))
out.save(ROOT/'kontrol/tum-set.jpg',quality=93)
checks=[]
for item in manifest:
 p=ROOT/'png'/(item['size']+'.png');im=Image.open(p)
 assert im.size==(item['width'],item['height'])
 assert im.mode=='RGB'
 svg=(ROOT/'kaynak/svg'/(item['size']+'.svg')).read_text()
 assert '<image' not in svg and '<text' not in svg
 checks.append({'size':item['size'],'pngDimensions':list(im.size),'mode':im.mode,'pngBytes':p.stat().st_size,'svgAllVector':True})
 if item['animated']:
  with zipfile.ZipFile(ROOT/'html5'/(item['size']+'.zip')) as z:
   assert z.namelist()==['index.html'] and z.testzip() is None
  checks[-1]['html5ZipBytes']=(ROOT/'html5'/(item['size']+'.zip')).stat().st_size
for page in [ROOT/'onizleme.html',ROOT/'html5/index.html']:
 for href in re.findall(r'(?:href|src)="([^"]+)"',page.read_text()):
  if not href.startswith(('http','#','data:')):assert (page.parent/href).exists(),(page,href)
report=json.loads((ROOT/'kontrol/tarayici-raporu.json').read_text())
assert not report['errors'] and not report['externalRequests']
for row in report['results']:
 if 'previewWidth' in row:
  assert row['before']['images'] and row['before']['cards']==10
  assert row['before']['pageWidth']==row['previewWidth'] and row['after']['playing']==5
 else: assert row['reducedMotionAnimationCount']==0
(ROOT/'kontrol/kalite-raporu.json').write_text(json.dumps({'pngCount':len(checks),'html5Count':sum(i['animated'] for i in manifest),'localLinksValid':True,'browserChecksPassed':True,'files':checks},ensure_ascii=False,indent=2))
print('Geçti: 10 PNG / 5 HTML5 / ZIP bütünlüğü / yerel bağlantılar / tarayıcı kontrolleri.')
