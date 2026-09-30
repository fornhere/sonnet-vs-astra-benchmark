from pathlib import Path
import html, json, math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
import uharfbuzz as hb

ROOT=Path(__file__).resolve().parents[1]
C={'cream':'#F4ECD9','ink':'#49241F','orange':'#CC5835','amber':'#EBA456','light':'#FFF8E9','sage':'#68725A'}
FONTS={
 'serif':'URWBookman-Demi.otf','italic':'URWBookman-DemiItalic.otf',
 'sans':'NimbusSans-Regular.otf','bold':'NimbusSans-Bold.otf'}
fonts={}
for name,file in FONTS.items():
 p=Path('/usr/share/fonts/gsfonts')/file
 ft=TTFont(p); hf=hb.Font(hb.Face(p.read_bytes())); hf.scale=(1000,1000)
 fonts[name]=(ft,hf,ft.getGlyphSet(),ft.getGlyphOrder())

class Design:
 def __init__(self,w,h):
  self.w=w;self.h=h;self.parts=[];self.glyphs={};self.labels=[]
 def add(self,s): self.parts.append(s)
 def text(self,s,x,y,size,font='sans',color='ink',spacing=0,anchor='start',cls='',opacity=1):
  buf=hb.Buffer();buf.add_str(s);buf.guess_segment_properties();hb.shape(fonts[font][1],buf)
  glyphs=list(zip(buf.glyph_infos,buf.glyph_positions))
  width=sum(p.x_advance*size/1000+spacing for i,p in glyphs)-spacing
  if anchor=='middle':x-=width/2
  if anchor=='end':x-=width
  uses=[];cursor=0
  for i,p in glyphs:
   gid=f'{font}-{i.codepoint}'
   if gid not in self.glyphs:
    gs=fonts[font][2];gn=fonts[font][3][i.codepoint];pen=SVGPathPen(gs);gs[gn].draw(pen)
    self.glyphs[gid]=f'<path id="{gid}" d="{pen.getCommands()}"/>'
   uses.append(f'<use href="#{gid}" x="{cursor+p.x_offset:.3f}" y="{-p.y_offset}"/>')
   cursor+=p.x_advance+spacing*1000/size
  self.add(f'<g class="{cls}" aria-label="{html.escape(s)}" fill="{C.get(color,color)}" opacity="{opacity}" transform="translate({x:.3f} {y}) scale({size/1000} {-size/1000})">'+''.join(uses)+'</g>')
  self.labels.append({'text':s,'x':round(x,2),'baseline':y,'size':size,'width':round(width,2)})
  return width
 def group(self,cls):self.add(f'<g class="{cls}">')
 def end(self):self.add('</g>')
 def line(self,x1,y1,x2,y2,opacity=.25):self.add(f'<path d="M{x1} {y1}H{x2}" stroke="{C["ink"]}" opacity="{opacity}"/>' if y1==y2 else f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{C["ink"]}" opacity="{opacity}"/>')
 def base(self):
  self.add(f'<path fill="{C["cream"]}" d="M0 0H{self.w}V{self.h}H0Z"/>')
 def logo(self,x,y,size):
  self.text('demlik',x,y,size,'serif',spacing=-size*.065)
  # A hand-drawn leaf acts as the wordmark's full stop.
  end=x+size*3.16
  self.add(f'<path d="M{end} {y-2}q{-size*.10} {-size*.29} {size*.20} {-size*.40}q{size*.13} {size*.29} {-size*.20} {size*.40}Z" fill="{C["orange"]}"/>')
 def title(self,x,y,size,two=True,gap=None):
  self.group('headline')
  if two:
   self.text('Demini',x,y,size,'serif',spacing=-size*.058)
   self.text('Al.',x-2,y+(gap or size*.97),size*1.10,'italic',spacing=-size*.06)
  else:
   a=self.text('Demini',x,y,size,'serif',spacing=-size*.058)
   self.text('Al.',x+a+size*.21,y,size,'italic',spacing=-size*.065)
  self.end()
 def cta(self,x,y,w,h,label='Demini keşfet',fs=None):
  fs=fs or h*.32
  self.group('cta')
  self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h/2}" fill="{C["ink"]}"/>')
  self.text(label,x+h*.48,y+h*.63,fs,'bold','cream')
  ax=x+w-h*.48; ay=y+h*.50
  self.add(f'<path d="M{ax-h*.23} {ay}H{ax}m{-h*.11} {-h*.11}l{h*.11} {h*.11}l{-h*.11} {h*.11}" fill="none" stroke="{C["cream"]}" stroke-width="{max(1.2,h*.035)}" stroke-linecap="round" stroke-linejoin="round"/>')
  self.end()
 def sun(self,cx,cy,r):
  self.group('sun')
  self.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{C["orange"]}"/>')
  self.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#grain)" opacity=".23"/>')
  self.add(f'<g fill="none" stroke="{C["cream"]}" stroke-width="{max(.65,r/240)}" opacity=".20">')
  for f in [.76,.85,.94]:
   self.add(f'<circle cx="{cx}" cy="{cy}" r="{r*f}"/>')
  self.end();self.end()
 def flourish(self,x,y,scale=1):
  self.add(f'<g transform="translate({x} {y}) scale({scale})" fill="none" stroke="{C["orange"]}" stroke-width="1.1" opacity=".6"><path d="M-13 0H13M0-13V13M-8-8L8 8M-8 8L8-8"/><circle r="3" fill="{C["cream"]}"/></g>')
 def hero(self,x,y,s):
  self.add(f'<g transform="translate({x} {y}) scale({s})">')
  self.group('steam')
  self.add(f'<g fill="none" stroke="{C["cream"]}" stroke-width="3" stroke-linecap="round"><path d="M161 81C115 49 203 34 162-10"/><path d="M200 73C170 49 235 19 210-12"/></g>')
  self.end()
  self.group('glass')
  self.add('''<ellipse cx="183" cy="471" rx="148" ry="18" fill="#49241F" opacity=".15"/>
  <ellipse cx="180" cy="450" rx="164" ry="40" fill="#49241F"/>
  <ellipse cx="180" cy="443" rx="166" ry="38" fill="#F4ECD9"/>
  <ellipse cx="180" cy="442" rx="145" ry="29" fill="none" stroke="#CC5835" stroke-width="2"/>
  <ellipse cx="180" cy="442" rx="101" ry="20" fill="#DCC8A7"/>
  <path d="M89 102C89 167 135 204 134 256C134 304 110 347 105 383C97 415 123 434 180 434C237 434 263 415 255 383C250 347 226 304 226 256C225 204 271 167 271 102Z" fill="url(#glassFill)" stroke="#FFF8E9" stroke-width="3"/>
  <path d="M108 159C120 198 146 219 145 258C145 305 122 352 117 382C114 405 137 417 180 417C223 417 246 405 243 382C237 351 214 305 215 258C214 218 240 197 252 159Z" fill="url(#tea)"/>
  <path d="M120 170C134 206 153 221 153 258C153 304 137 340 130 371" fill="none" stroke="#F5B25C" stroke-width="5" opacity=".48"/>
  <ellipse cx="180" cy="159" rx="72" ry="17" fill="#D98736"/>
  <ellipse cx="180" cy="158" rx="65" ry="12" fill="#A34523"/>
  <path d="M133 156Q178 141 225 155" fill="none" stroke="#EFB965" stroke-width="2" opacity=".6"/>
  <ellipse cx="180" cy="102" rx="91" ry="20" fill="#F4ECD9" fill-opacity=".09" stroke="#FFF8E9" stroke-width="3"/>
  <ellipse cx="180" cy="103" rx="82" ry="14" fill="none" stroke="#FFF8E9" stroke-opacity=".48" stroke-width="1.5"/>
  <path d="M103 120C106 169 148 215 146 247" fill="none" stroke="#FFF8E9" stroke-width="6" stroke-linecap="round" opacity=".75"/>
  <path d="M246 188C227 226 221 245 231 291" fill="none" stroke="#FFF8E9" stroke-width="3" stroke-linecap="round" opacity=".42"/>
  <path d="M131 339L119 383Q113 401 139 411" fill="none" stroke="#FFF8E9" stroke-width="5" stroke-linecap="round" opacity=".55"/>
  <path d="M145 425Q181 435 220 422" fill="none" stroke="#FFF8E9" stroke-width="3" stroke-linecap="round"/>
  <g fill="#CC5835"><path d="M49 440q-7-11 10-10q7 11-10 10M306 450q-7-11 10-10q7 11-10 10"/><path d="M77 460q-7-11 10-10q7 11-10 10M280 429q-7-11 10-10q7 11-10 10"/></g>''')
  self.end();self.end()
 def seal(self,cx,cy,r):
  self.add(f'<g transform="translate({cx} {cy}) rotate(9)">')
  self.group('offer')
  self.add(f'<circle r="{r}" fill="{C["cream"]}"/><circle r="{r-5}" fill="none" stroke="{C["orange"]}" stroke-width="1"/>')
  self.text('İLK HAFTA',0,-r*.44,r*.17,'bold',spacing=r*.022,anchor='middle')
  self.text('%20',0,r*.15,r*.63,'serif',spacing=-r*.036,anchor='middle')
  self.text('ATÖLYE İNDİRİMİ',0,r*.48,r*.137,'bold',spacing=r*.005,anchor='middle')
  self.end();self.end()
 def render(self):
  defs='''<pattern id="grain" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="1.8" cy="2" r=".6" fill="#49241F"/><circle cx="8.5" cy="9" r=".5" fill="#F4ECD9"/></pattern>
  <linearGradient id="tea" x1="0" y1="0" x2="1" y2=".15"><stop stop-color="#84301E"/><stop offset=".43" stop-color="#C56728"/><stop offset=".7" stop-color="#BB4C22"/><stop offset="1" stop-color="#762C1E"/></linearGradient>
  <linearGradient id="glassFill"><stop stop-color="#FFF8E9" stop-opacity=".28"/><stop offset=".4" stop-color="#F4ECD9" stop-opacity=".03"/><stop offset="1" stop-color="#FFF8E9" stop-opacity=".22"/></linearGradient>'''
  return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}" role="img" aria-labelledby="ad-title ad-desc"><title id="ad-title">Demlik — Demini Al</title><desc id="ad-desc">Kadıköy Akşamı, yeni sonbahar harmanı. Ekim kampanyası: ilk hafta demleme atölyesinde %20 indirim.</desc><defs>{defs}{"".join(self.glyphs.values())}</defs>{"".join(self.parts)}</svg>'

def make(w,h):
 d=Design(w,h);d.base()
 if (w,h) in [(300,250),(336,280)]:
  scale=w/300;d.add(f'<g transform="scale({scale})">')
  d.sun(269,127,91); d.hero(186,45,.32)
  d.logo(17,30,26)
  d.text('YENİ SONBAHAR HARMANI',18,54,7.5,'bold',spacing=.75)
  d.title(16,102,43,gap=47)
  d.text('Kadıköy Akşamı',18,172,12,'bold')
  d.cta(17,186,133,32,fs=11)
  d.text('İlk hafta atölyede',203,220,8,'sans',anchor='middle')
  d.text('%20 indirim',203,235,13,'bold',anchor='middle')
  d.text('Çay acele sevmez.',18,238,8.5)
  d.end()
 elif (w,h)==(728,90):
  d.sun(483,46,70);d.hero(447,-10,.20)
  d.logo(17,40,30);d.text('KADIKÖY · 2024',19,60,8,'bold',spacing=1)
  d.line(135,20,135,70)
  d.title(155,49,42,False)
  d.text('Kadıköy Akşamı · Yeni sonbahar harmanı',157,72,10.5)
  d.cta(574,17,138,34,fs=11.5)
  d.text('İlk hafta atölyede %20 indirim',643,71,9,'bold',anchor='middle')
 elif (w,h)==(970,250):
  d.sun(646,117,148);d.hero(545,-25,.54)
  d.logo(26,40,34);d.text('EKİM / YENİ SONBAHAR HARMANI',29,68,9,'bold',spacing=1.25)
  d.title(23,147,78,False)
  d.text('Şehrin acelesi var. Çayın acelesi yok.',29,180,17)
  d.text('Kadıköy Akşamı',30,219,16,'bold')
  d.text('Çay acele sevmez.',274,219,11)
  d.text('İLK HAFTA',861,49,10,'bold',spacing=1.5,anchor='middle')
  d.text('%20',860,102,55,'serif',spacing=-2,anchor='middle')
  d.text('atölye indirimi',861,128,15,anchor='middle')
  d.cta(773,157,176,43,fs=14)
  d.text('demlik.com.tr',861,223,10,anchor='middle')
 elif (w,h)==(300,600):
  d.sun(204,385,132);d.hero(93,247,.52)
  d.logo(23,45,35)
  d.text('YENİ SONBAHAR HARMANI',25,78,9,'bold',spacing=1)
  d.title(20,139,64,gap=68)
  d.text('Şehrin acelesi var.',25,241,14)
  d.text('Çayın acelesi yok.',25,261,14)
  d.text('Kadıköy',25,299,17,'bold')
  d.text('Akşamı',25,321,17,'bold')
  d.seal(245,474,42)
  d.cta(23,531,254,42,fs=14)
  d.text('Çay acele sevmez.',24,591,9)
  d.text('demlik.com.tr',277,591,9,anchor='end')
 elif (w,h)==(160,600):
  d.sun(86,333,102);d.hero(-3,223,.47)
  d.logo(13,36,28)
  d.text('YENİ SONBAHAR HARMANI',15,65,6.5,'bold',spacing=.27)
  d.title(10,113,37,gap=51)
  d.text('Şehrin acelesi var.',15,193,10.5)
  d.text('Çayın acelesi yok.',15,209,10.5)
  d.text('Kadıköy Akşamı',80,472,13,'bold',anchor='middle')
  d.text('İlk hafta atölyede',80,499,10,anchor='middle')
  d.text('%20 indirim',80,522,18,'bold',anchor='middle')
  d.cta(13,542,134,35,fs=11)
  d.text('demlik.com.tr',80,593,8,anchor='middle')
 elif (w,h)==(320,50):
  d.add(f'<circle cx="321" cy="-6" r="53" fill="{C["orange"]}"/>')
  d.logo(10,30,24)
  d.line(94,12,94,38)
  d.title(104,28,21,False)
  d.text('Kadıköy Akşamı',106,42,8)
  d.cta(233,10,77,30,'Keşfet',11)
 elif (w,h)==(1080,1080):
  d.sun(831,574,321);d.hero(612,304,1.18)
  d.logo(58,85,58)
  d.text('KADIKÖY, İSTANBUL',1018,59,14,'bold',spacing=2,anchor='end')
  d.text('Çay acele sevmez.',1018,85,18,anchor='end')
  d.line(62,118,1018,118)
  d.text('EKİM / YENİ SONBAHAR HARMANI',64,179,15,'bold',spacing=2)
  d.title(49,328,151,gap=157)
  d.text('Şehrin acelesi var.',65,555,28)
  d.text('Çayın acelesi yok.',65,594,28)
  d.text('Kadıköy',65,704,32,'bold')
  d.text('Akşamı',65,744,32,'bold')
  d.text('Akşamın en güzel hâli, ince belli.',65,785,16)
  d.flourish(430,704,1.5)
  d.seal(950,842,91)
  d.cta(61,873,354,73,fs=23)
  d.line(62,988,1018,988)
  d.text('Moda Cd. No: 42 · Kadıköy',64,1028,17)
  d.text('@demlik.kadikoy',592,1028,17,anchor='middle')
  d.text('demlik.com.tr',1018,1028,17,'bold',anchor='end')
 elif (w,h)==(1080,1920):
  d.sun(685,1124,431);d.hero(390,828,1.45)
  d.logo(76,224,73)
  d.text('ÇAY ACELE SEVMEZ.',1002,220,16,'bold',spacing=2,anchor='end')
  d.line(80,270,1000,270)
  d.text('EKİM / YENİ SONBAHAR HARMANI',82,330,20,'bold',spacing=2)
  d.title(64,499,187,gap=191)
  d.text('Şehrin acelesi var.',84,772,36)
  d.text('Çayın acelesi yok.',84,824,36)
  d.text('Kadıköy',84,955,43,'bold')
  d.text('Akşamı',84,1010,43,'bold')
  d.flourish(145,1120,2)
  d.seal(880,1400,117)
  d.cta(80,1580,920,100,fs=33)
  d.text('Moda Cd. No: 42 · Kadıköy',80,1740,25)
  d.text('@demlik.kadikoy',80,1780,25)
  d.text('demlik.com.tr',1000,1780,25,'bold',anchor='end')
 elif (w,h)==(1200,628):
  d.sun(924,281,299);d.hero(703,61,1.00)
  d.logo(48,63,45)
  d.text('EKİM / YENİ SONBAHAR HARMANI',51,112,12,'bold',spacing=1.55)
  d.title(40,235,117,gap=120)
  d.text('Şehrin acelesi var. Çayın acelesi yok.',53,415,23)
  d.text('Kadıköy Akşamı',53,467,26,'bold')
  d.cta(49,513,270,57,fs=18)
  d.text('Çay acele sevmez.',350,547,15)
  d.seal(1094,476,78)
  d.text('Moda Cd. No: 42 · Kadıköy',51,606,13)
  d.text('@demlik.kadikoy',717,606,13,anchor='middle')
  d.text('demlik.com.tr',1150,606,13,'bold',anchor='end')
 else:raise ValueError((w,h))
 return d

SIZES=[(300,250),(336,280),(728,90),(970,250),(300,600),(160,600),(320,50),(1080,1080),(1080,1920),(1200,628)]
ANIMATED={(300,250),(728,90),(970,250),(300,600),(1080,1080)}
CSS='''
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#F4ECD9}a{display:block;width:100%;height:100%;outline-offset:-4px}svg{display:block;width:100%;height:100%;overflow:hidden}a:focus-visible{outline:3px solid #68725A}a:hover .cta>rect{fill:#64342A}.sun,.glass,.headline,.offer,.cta,.steam{transform-box:fill-box;transform-origin:center}
.sun{animation:sun-in 1.4s cubic-bezier(.18,.7,.18,1) both}.glass{animation:glass-in 1.2s .15s cubic-bezier(.18,.7,.18,1) both}.headline{animation:type-in .85s .1s cubic-bezier(.16,.8,.2,1) both}.offer{animation:offer-in .8s .95s cubic-bezier(.18,.8,.28,1.16) both}.cta{animation:cta-in .7s 1.25s ease-out both}.steam{animation:steam 4s 1.2s 3 ease-in-out both}
@keyframes sun-in{from{opacity:.25;transform:scale(.82)}to{opacity:1;transform:scale(1)}}@keyframes glass-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes type-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes offer-in{from{opacity:0;transform:scale(.83) rotate(-7deg)}to{opacity:1;transform:scale(1) rotate(0)}}@keyframes cta-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}@keyframes steam{0%,100%{opacity:1;transform:translateY(0)}50%{opacity:.65;transform:translateY(-6px)}}
@media(prefers-reduced-motion:reduce){*{animation:none!important}}.static *{animation:none!important}
'''

def html_ad(d,svg):
 return f'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="ad.size" content="width={d.w},height={d.h}"><title>Demlik · Demini Al · {d.w}×{d.h}</title><style>{CSS}</style><script>var clickTag = "https://demlik.com.tr";</script></head><body><a id="exit" href="https://demlik.com.tr" target="_blank" rel="noopener noreferrer" aria-label="Demini keşfet — Kadıköy Akşamı. İlk hafta demleme atölyesinde yüzde 20 indirim.">{svg}</a><script>
if(new URLSearchParams(location.search).has('static'))document.documentElement.classList.add('static');
document.getElementById('exit').addEventListener('click',function(){{try{{var u=new URL(window.clickTag);if(['http:','https:'].includes(u.protocol))this.href=u.href;}}catch(e){{this.href='https://demlik.com.tr';}}}});
window.banner={{pause:()=>document.getAnimations().forEach(a=>a.pause()),play:()=>document.getAnimations().forEach(a=>a.play()),restart:()=>document.getAnimations().forEach(a=>{{a.currentTime=0;a.play()}})}};
</script></body></html>'''

if __name__=='__main__':
 manifest=[]
 for w,h in SIZES:
  d=make(w,h);svg=d.render();name=f'{w}x{h}'
  (ROOT/'kaynak/svg'/f'{name}.svg').write_text(svg)
  if (w,h) in ANIMATED:
   target=ROOT/'html5'/name;target.mkdir(parents=True,exist_ok=True)
   (target/'index.html').write_text(html_ad(d,svg))
  manifest.append({'size':name,'width':w,'height':h,'animated':(w,h) in ANIMATED,'labels':d.labels})
 (ROOT/'kaynak/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
 print('10 SVG, 5 bağımsız HTML5 hazır.')
