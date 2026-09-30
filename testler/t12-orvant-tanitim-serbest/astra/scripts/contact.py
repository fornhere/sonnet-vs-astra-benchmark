from PIL import Image,ImageDraw
from pathlib import Path
files=sorted(Path('qa').glob('frame-*.png'),key=lambda p:float(p.stem.split('-')[1]))
out=Image.new('RGB',(1280,384*((len(files)+1)//2)), '#20251c');d=ImageDraw.Draw(out)
for i,p in enumerate(files):
 im=Image.open(p);im.thumbnail((640,360));x=(i%2)*640;y=(i//2)*384;out.paste(im,(x,y));d.text((x+12,y+364),p.stem,fill='white')
out.save('qa/contact.jpg')
