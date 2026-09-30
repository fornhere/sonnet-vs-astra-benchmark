from pathlib import Path
import math, json, shutil, re, html
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools import subset

ROOT=Path(__file__).resolve().parents[1]
PAPER='#F4EBDD'; INK='#38211C'; ORANGE='#DE704A'; SAGE='#9BA58C'; GOLD='#D8AE61'; WHITE='#FFF9F0'
FONTS={
 'serif':str(ROOT/'varliklar/fonts/kaynak/URWBookman-Light.otf'),
 'bold':str(ROOT/'varliklar/fonts/kaynak/URWBookman-Demi.otf'),
 'italic':str(ROOT/'varliklar/fonts/kaynak/URWBookman-LightItalic.otf'),
 'sans':str(ROOT/'varliklar/fonts/kaynak/NotoSans-Regular.ttf'),
 'medium':str(ROOT/'varliklar/fonts/kaynak/NotoSans-Medium.ttf'),
}
fonts={k:TTFont(v) for k,v in FONTS.items()}

def textpath(s,x,y,size=20,color=INK,font='sans',tracking=0,anchor='start'):
    f=fonts[font]; gs=f.getGlyphSet(); cm=f.getBestCmap(); upm=f['head'].unitsPerEm
    scale=size/upm
    total=sum(gs[cm[ord(c)]].width*scale+tracking for c in s)-tracking if s else 0
    if anchor=='middle':x-=total/2
    if anchor=='end':x-=total
    out=[]
    for c in s:
        g=gs[cm[ord(c)]]; pen=SVGPathPen(gs);g.draw(pen)
        if pen.getCommands():out.append(f'<path d="{pen.getCommands()}" transform="translate({x:.4f} {y}) scale({scale:.6f} {-scale:.6f})"/>')
        x+=g.width*scale+tracking
    return f'<g fill="{color}" aria-label="{html.escape(s)}">'+''.join(out)+'</g>'

def svg(body,w,h,title='Demlik',desc='',extra=''):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" {extra}><title>{html.escape(title)}</title><desc>{html.escape(desc)}</desc>{body}</svg>'

# Two open forms make one thin-waisted tea glass. The detached steam curl
# doubles as the final moment in an hourglass; deliberately no enclosing badge.
def mark(color=INK):
    return f'''<g fill="{color}">
    <path d="M62 2C42 2 39 17 46 28C49 17 62 20 69 13C74 8 72 3 72 0C69 2 66 2 62 2Z"/>
    <path d="M16 38H104C102 55 94 67 85 79C78 89 77 94 77 101C61 95 49 91 35 93C33 84 29 75 24 65C20 56 17 47 16 38Z"/>
    <path d="M36 104C50 103 64 109 78 113C81 125 89 136 93 149C95 157 92 164 83 164H37C28 164 25 157 27 149C31 135 38 121 36 104Z"/>
    </g>'''

def word(color=INK):
    # Tight optical spacing makes this a logo, never substitute live text.
    return textpath('demlik',0,160,210,color,'bold',-8)

# Measure the visual bounds of the logotype once, independently of font metrics.
def word_bounds():
    f=fonts['bold']; gs=f.getGlyphSet(); cm=f.getBestCmap(); sc=210/f['head'].unitsPerEm;x=0;allb=[]
    for c in 'demlik':
        p=BoundsPen(gs);gs[cm[ord(c)]].draw(p);b=p.bounds
        if b:allb.append((x+b[0]*sc,160-b[3]*sc,x+b[2]*sc,160-b[1]*sc))
        x+=gs[cm[ord(c)]].width*sc-8
    return min(b[0] for b in allb),min(b[1] for b in allb),max(b[2] for b in allb),max(b[3] for b in allb)
BX,BY,BR,BB=word_bounds(); WW=BR-BX; WH=BB-BY

def wordat(x,y,w,color=INK):
    return f'<g transform="translate({x} {y}) scale({w/WW}) translate({-BX} {-BY})">{word(color)}</g>'

def logobody(kind='ana',color=INK):
    if kind=='ikon':return f'<g transform="translate(-16 0)">{mark(color)}</g>',88,164
    if kind=='yatay':
        return f'<g transform="translate(-11.52 -2)"><g transform="translate(0 2) scale(.72)">{mark(color)}</g>'+wordat(105,20,460,color)+'</g>',553.48,120
    if kind=='logotip':return wordat(0,0,WW,color),WW,WH
    return f'<g transform="translate(220 0)">{mark(color)}</g>'+wordat(0,204,560,color),560,204+WH*560/WW

def logoat(x,y,w,kind='yatay',color=INK):
    b,ow,oh=logobody(kind,color)
    return f'<g transform="translate({x} {y}) scale({w/ow})">{b}</g>'

def iconat(x,y,w,color=INK):return logoat(x,y,w,'ikon',color)

def rings(x,y,scale=1,color=ORANGE,stroke=2,count=7):
    return f'<g transform="translate({x} {y}) scale({scale})" fill="none" stroke="{color}" stroke-width="{stroke}">'+''.join(f'<path d="M{-85-i*24} -280 C{-80-i*23} -120 {-32-i*21} -95 {-32-i*21} 0 C{-32-i*21} 95 {-80-i*23} 120 {-85-i*24} 280 M{85+i*24} -280 C{80+i*23} -120 {32+i*21} -95 {32+i*21} 0 C{32+i*21} 95 {80+i*23} 120 {85+i*24} 280"/>' for i in range(count))+'</g>'

def defs():
    return '''<defs>
    <filter id="shadow" x="-60%" y="-60%" width="220%" height="240%"><feGaussianBlur stdDeviation="13"/></filter>
    <filter id="smallShadow" x="-50%" y="-50%" width="200%" height="220%"><feDropShadow dx="0" dy="9" stdDeviation="8" flood-color="#38211c" flood-opacity=".18"/></filter>
    <linearGradient id="pouch" x1="0" x2="1"><stop stop-color="#c9bba6"/><stop offset=".12" stop-color="#f8efdf"/><stop offset=".48" stop-color="#eee2ce"/><stop offset=".87" stop-color="#e5d5bf"/><stop offset="1" stop-color="#b5a48c"/></linearGradient>
    <linearGradient id="cup" x1="0" x2="1"><stop stop-color="#cbbfae"/><stop offset=".23" stop-color="#fff9ed"/><stop offset=".72" stop-color="#eee3d1"/><stop offset="1" stop-color="#c3b49e"/></linearGradient>
    <linearGradient id="tea" x1="0" x2="1"><stop stop-color="#8c361b"/><stop offset=".28" stop-color="#b44a1f"/><stop offset=".6" stop-color="#d57c2e"/><stop offset="1" stop-color="#7e2e18"/></linearGradient>
    <linearGradient id="glass" x1="0" x2="1"><stop stop-color="#fff9ed" stop-opacity=".58"/><stop offset=".25" stop-color="#fff9ed" stop-opacity=".03"/><stop offset=".72" stop-color="#fff9ed" stop-opacity=".05"/><stop offset="1" stop-color="#fff9ed" stop-opacity=".6"/></linearGradient>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#d7cbbb"/><stop offset="1" stop-color="#eee5d8"/></linearGradient>
    <linearGradient id="window" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#252921"/><stop offset=".6" stop-color="#414432"/><stop offset="1" stop-color="#8b7d55"/></linearGradient>
    </defs>'''

BLENDS=[('01','Karadeniz','Sabahı',ORANGE,'GÜNE BİR DEM.'),('02','Kadıköy','Akşamı',INK,'AKŞAMA BİR ARA.'),('03','Adaçaylı','Bergamot',SAGE,'KENDİNE BİR DEM.')]

def label(idx,w=240,h=325):
    no,a,b,c,line=BLENDS[idx];tc=PAPER if idx==1 else INK
    s=f'<rect width="240" height="325" fill="{c}"/>'
    s+=logoat(24,24,191,'yatay',tc)
    s+=f'<path d="M24 84H216" stroke="{tc}" stroke-opacity=".5"/>'
    s+=textpath('ÖZEL HARMAN ÇAY',24,106,9,tc,'medium',1.3)
    s+=textpath(a,23,158,27,tc,'serif',-.7)+textpath(b,23,191,27,tc,'serif',-.7)
    s+=textpath(line,24,221,8.7,tc,'medium',1)
    s+=f'<path d="M24 243H216" stroke="{tc}" stroke-opacity=".5"/>'
    s+=textpath('HARMAN',24,269,8.5,tc,'medium',1)+textpath(no,23,300,27,tc,'serif')
    s+=iconat(183,264,23,tc)
    return f'<g transform="scale({w/240} {h/325})">{s}</g>'

def pouch(idx,x,y,scale=1,angle=0):
    return f'''<g transform="translate({x} {y}) rotate({angle} 135 220) scale({scale})">
      <ellipse cx="135" cy="459" rx="138" ry="18" fill="{INK}" opacity=".17" filter="url(#shadow)"/>
      <path d="M19 4H251L258 34L251 95L272 428Q270 452 242 454H28Q0 452 0 428L21 95L12 34Z" fill="url(#pouch)"/>
      <path d="M20 16H250M19 25H252M20 43H250" fill="none" stroke="#a09078" opacity=".55"/>
      <path d="M21 95L12 411L29 435M251 95L261 411L244 435" fill="none" stroke="#fff7e7" opacity=".8"/>
      <path d="M11 422Q135 447 261 422L244 452H28Z" fill="#b4a187" opacity=".32"/>
      <g transform="translate(21 90)">{label(idx,230,311)}</g>
      <path d="M21 94L14 418M251 94L257 418" fill="none" stroke="#725b40" opacity=".08" stroke-width="6"/>
    </g>'''

def packaging_scene():
    b=defs()+f'<rect width="1160" height="570" fill="#E3D5C1"/><path d="M0 395L1160 330V570H0Z" fill="#d4c0a6"/>'
    b+=f'<path d="M870 0L1160 0V570L1040 570Z" fill="#faf0df" opacity=".3"/>'
    b+=pouch(0,130,83,.92,-7)+pouch(2,785,83,.92,7)+pouch(1,439,40,1.07,0)
    return svg(b,1160,570,'Demlik üç harman ambalajı','Kodla çizilmiş dik duran ambalaj maketleri; turuncu Karadeniz Sabahı, koyu Kadıköy Akşamı ve yeşil Adaçaylı Bergamot.')

def cup_scene():
    b=defs()+f'<rect width="1160" height="570" fill="{SAGE}"/><path d="M0 410L1160 350V570H0Z" fill="#869077"/>'
    b+=f'<ellipse cx="390" cy="472" rx="180" ry="20" fill="{INK}" opacity=".16" filter="url(#shadow)"/>'
    # Paper cup and lid.
    b+='<g transform="translate(190 55) rotate(-7 170 210)">'
    b+='<path d="M30 63H315L279 397Q174 424 68 397Z" fill="url(#cup)"/>'
    b+=f'<path d="M46 173L59 288Q175 312 292 288L304 173Z" fill="{ORANGE}"/>'
    b+=logoat(78,205,190,'yatay',PAPER)
    b+=textpath('ÇAY ACELE SEVMEZ.',171,346,12,INK,'medium',1.5,'middle')
    b+='<ellipse cx="172" cy="61" rx="145" ry="23" fill="#cec2ae"/><path d="M14 47Q173 14 332 47L331 70Q173 95 14 70Z" fill="#38211c"/><ellipse cx="173" cy="45" rx="158" ry="25" fill="#64392f"/><ellipse cx="173" cy="43" rx="131" ry="17" fill="#38211c"/><path d="M258 38H286" stroke="#24120e" stroke-width="9" stroke-linecap="round"/>'
    b+='</g>'
    # Thin-waisted glass / tea / porcelain saucer.
    b+='<g transform="translate(682 146)">'
    b+=f'<ellipse cx="128" cy="341" rx="192" ry="22" fill="{INK}" opacity=".15" filter="url(#shadow)"/>'
    b+='<ellipse cx="128" cy="308" rx="175" ry="41" fill="#cbbfab"/><ellipse cx="128" cy="300" rx="177" ry="40" fill="#f6edde"/><ellipse cx="128" cy="300" rx="124" ry="24" fill="none" stroke="#d0bc9d" stroke-width="2"/>'
    b+=f'<path d="M23 16C27 101 74 119 63 191C56 239 37 263 48 278Q126 304 208 278C219 263 200 239 193 191C182 119 230 101 233 16Z" fill="url(#glass)" stroke="#fff9ed" stroke-opacity=".68" stroke-width="2"/>'
    b+='<path d="M39 84C58 134 81 153 67 206C59 239 48 259 56 272Q130 293 200 272C207 259 197 239 189 206C176 153 200 134 218 84Z" fill="url(#tea)"/>'
    b+='<ellipse cx="128" cy="84" rx="89" ry="18" fill="#903e1d"/><ellipse cx="128" cy="81" rx="88" ry="15" fill="#d18639" opacity=".52"/><ellipse cx="128" cy="16" rx="105" ry="24" fill="#f5eddc" fill-opacity=".1" stroke="#fff9ed" stroke-width="3"/>'
    b+='<path d="M40 45C54 109 82 126 78 168M72 224L65 254M216 45C203 105 181 130 181 155" fill="none" stroke="#fff9ed" stroke-width="7" stroke-linecap="round" opacity=".36"/>'
    b+=iconat(108,192,35,PAPER)
    b+='</g>'
    b+=textpath('Bir dem burada.',853,59,30,INK,'italic',-.6,'middle')
    return svg(b,1160,570,'Demlik bardak uygulamaları','Turuncu kılıflı karton bardak ve marka işaretli ince belli cam bardak.')

def facade_scene():
    b=defs()+'<rect width="1160" height="590" fill="url(#wall)"/>'
    for x in [70,1090]:b+=f'<rect x="{x}" y="0" width="8" height="540" fill="#c8bba8"/>'
    for y in [38,88,145,490]:b+=f'<path d="M0 {y}H1160" stroke="#c0b3a0" stroke-width="2"/>'
    b+='<rect x="157" y="102" width="846" height="453" fill="#ae9a7f" opacity=".45"/>'
    b+=f'<rect x="146" y="79" width="846" height="452" fill="{INK}"/>'
    b+=logoat(431,96,280,'yatay',PAPER)
    b+=textpath('ÇAY DÜKKÂNI & ATÖLYE',567,170,10,PAPER,'medium',3,'middle')
    b+='<rect x="166" y="193" width="483" height="294" fill="url(#window)"/><rect x="670" y="193" width="297" height="338" fill="url(#window)"/>'
    # interior shelves + warm teaware, all geometry
    for sy in [276,354,432]:
        b+=f'<rect x="181" y="{sy}" width="445" height="7" fill="#ab8050"/>'
        for j in range(9):
            c=[ORANGE,'#d8ae61','#9ba58c'][j%3]
            b+=f'<rect x="{197+j*46}" y="{sy-40}" width="25" height="39" rx="3" fill="{c}" opacity=".68"/><rect x="{197+j*46}" y="{sy-40}" width="25" height="4" fill="#31201b"/>'
    for x in [302,542,819]:
        b+=f'<path d="M{x} 194V222" stroke="#b8a27e" stroke-width="2"/><path d="M{x-37} 243Q{x} 201 {x+37} 243Z" fill="#d8ae61"/><ellipse cx="{x}" cy="244" rx="30" ry="5" fill="#ffe3a0"/>'
    b+='<path d="M180 193L351 193L545 488H374Z" fill="#fff9f0" opacity=".045"/><path d="M726 193H775L951 478H902Z" fill="#fff9f0" opacity=".08"/>'
    # window typography on privacy film
    b+='<rect x="166" y="292" width="483" height="127" fill="#38211c" opacity=".84"/>'
    b+=textpath('Çay acele',405,340,40,PAPER,'serif',-1,'middle')+textpath('sevmez.',405,386,40,PAPER,'serif',-1,'middle')
    b+=f'<rect x="657" y="190" width="13" height="341" fill="{INK}"/><rect x="949" y="322" width="5" height="65" rx="2" fill="{GOLD}"/>'
    b+=textpath('42',817,295,16,PAPER,'sans',2,'middle')+logoat(776,330,86,'ana',PAPER)
    b+=textpath('BİR DEM ARA.',819,433,11,PAPER,'medium',1.7,'middle')
    b+='<path d="M132 533H1008L1043 559H97Z" fill="#ab9c87"/><path d="M97 559H1043V570H97Z" fill="#96856c"/>'
    # hanging sign with steel arm
    b+=f'<path d="M143 138H55V197" fill="none" stroke="{INK}" stroke-width="7"/><circle cx="55" cy="245" r="57" fill="{INK}"/><circle cx="55" cy="245" r="51" fill="{ORANGE}"/>'+iconat(33,208,44,PAPER)
    # plant pot, branch and leaves
    b+=f'<path d="M1020 436H1100L1087 529H1033Z" fill="{ORANGE}"/><path d="M1060 446V332M1060 411L1029 375M1060 384L1092 352" fill="none" stroke="#526247" stroke-width="5"/>'
    for x,y,a in [(1060,338,0),(1030,374,-45),(1090,355,45),(1058,391,-20),(1060,423,25)]:
        b+=f'<ellipse cx="{x}" cy="{y}" rx="12" ry="25" fill="#677554" transform="rotate({a} {x} {y})"/>'
    b+='<rect y="573" width="1160" height="17" fill="#bfb3a0"/>'
    return svg(b,1160,590,'Demlik Moda dükkân cephesi','Kurgusal Moda Caddesi No. 42 için kodla çizilmiş tabela ve vitrin tasarımı. Mimari uygulama projesi değildir.')

def cardface(back=False):
    if not back:
        return '<svg width="510" height="330" viewBox="0 0 510 330" overflow="hidden">'+f'<rect width="510" height="330" fill="{INK}"/>'+rings(500,165,.7,ORANGE,1.5,6)+logoat(39,92,273,'ana',PAPER)+'</svg>'
    b=f'<rect width="510" height="330" fill="{PAPER}"/>'+logoat(33,30,170,'yatay',INK)
    b+=textpath('Bir çaya bakar.',32,136,31,INK,'serif',-.7)
    for i,s in enumerate(['Moda Cd. No: 42','Kadıköy, İstanbul','@demlik.kadikoy · demlik.com.tr']):b+=textpath(s,34,196+i*29,17,INK,'sans')
    b+=f'<path d="M34 283H476" stroke="{ORANGE}"/>'+textpath('ÇAY DÜKKÂNI & ATÖLYE',34,308,17,INK,'medium',.9)
    return b

def cards_scene():
    b=defs()+f'<rect width="1160" height="570" fill="#DBCEBA"/>'+rings(1050,280,1.3,'#bca68a',2,6)
    b+='<g transform="translate(110 51) rotate(-9 255 165)">'
    b+='<rect x="0" y="6" width="510" height="330" fill="#b8a58b" filter="url(#smallShadow)"/>'+cardface(False)+'</g>'
    b+='<g transform="translate(527 203) rotate(7 255 165)">'
    b+='<rect x="0" y="6" width="510" height="330" fill="#b8a58b" filter="url(#smallShadow)"/>'+cardface(True)+'</g>'
    return svg(b,1160,570,'Demlik kartvizit maketi','Koyu ön yüz ve iletişim bilgili açık arka yüz, 85 × 55 mm.')

def posterbody(w=594,h=840):
    b=f'<rect width="594" height="840" fill="{ORANGE}"/>'+logoat(42,33,211,'yatay',INK)
    b+=textpath('EKİM / KADIKÖY',551,63,12,INK,'medium',1.5,'end')
    b+=textpath('Demini',34,214,114,INK,'serif',-5)+textpath('Al.',32,328,114,INK,'serif',-5)
    b+=f'<g opacity=".75">{rings(425,435,.48,INK,2,5)}</g>'
    b+=f'<circle cx="410" cy="471" r="117" fill="{INK}"/>'+iconat(370,400,78,PAPER)
    b+=textpath('ŞEHRİ BİRAZ',43,424,13,INK,'medium',1.8)+textpath('YAVAŞLAT.',43,447,13,INK,'medium',1.8)
    b+=f'<rect x="0" y="609" width="594" height="231" fill="{INK}"/>'
    b+=textpath('Kadıköy Akşamı',41,658,34,PAPER,'serif',-1)
    b+=textpath('Yeni sonbahar harmanı Demlik’te.',43,692,16,PAPER,'sans')
    b+=f'<path d="M43 720H551" stroke="{PAPER}" stroke-opacity=".35"/>'
    b+=textpath('1–7 EKİM',43,754,12,PAPER,'medium',1)+textpath('Demleme atölyesinde %20 indirim.',43,781,17,PAPER,'sans')
    b+=textpath('Bilgi ve kayıt: @demlik.kadikoy',43,817,12,PAPER,'sans')
    return f'<g transform="scale({w/594} {h/840})">{b}</g>'

def socialbody():
    b=f'<rect width="1080" height="1350" fill="{PAPER}"/>'+logoat(72,66,385,'yatay',INK)
    b+=textpath('KADIKÖY AKŞAMI',72,270,26,INK,'medium',3)
    b+=textpath('Akşamın',63,418,137,INK,'serif',-5)+textpath('demi başka.',63,569,137,INK,'serif',-5)
    b+=f'<rect y="645" width="1080" height="705" fill="{ORANGE}"/><g opacity=".3">'+rings(820,1050,.7,INK,2,7)+'</g>'
    b+=pouch(1,582,687,1.14,-9)
    b+=textpath('Demini Al.',67,822,66,INK,'serif',-2)
    b+=textpath('Yeni sonbahar harmanı.',72,876,26,INK,'sans')
    b+=textpath('1–7 EKİM',72,1100,22,INK,'medium',2)
    b+=textpath('Demleme atölyesinde',72,1150,29,INK,'sans')+textpath('%20 indirim.',68,1210,49,INK,'serif',-1)
    b+=textpath('Bilgi ve kayıt: @demlik.kadikoy',72,1300,21,INK,'sans')
    return b

def campaign_scene():
    b=defs()+f'<rect width="1160" height="570" fill="#DED0BD"/>'
    b+='<g transform="translate(114 24) rotate(-3 180 250)"><rect x="-7" y="-7" width="368" height="508" fill="#baa78e" filter="url(#smallShadow)"/>'+posterbody(354,501)+'</g>'
    b+='<g transform="translate(657 17)"><rect x="-12" y="-12" width="376" height="545" rx="38" fill="#38211c" filter="url(#smallShadow)"/><rect width="352" height="521" rx="29" fill="#fff9f0"/>'
    b+=textpath('demlik.kadikoy',22,35,13,INK,'medium')+f'<circle cx="325" cy="30" r="3" fill="{INK}"/>'
    b+='<g transform="translate(0 54) scale(.326)">'+socialbody()+'</g>'
    b+=textpath('Demini Al · Yeni sonbahar harmanı',19,512,10,INK,'sans')+'</g>'
    return svg(b,1160,570,'Demini Al Ekim kampanyası','A3 afiş ve 4:5 sosyal medya paylaşımı, yeni harman ve ilk hafta atölye indirimi.')

def write_assets():
    for p in ['logo','uygulamalar','varliklar/fonts','varliklar/lisanslar']: (ROOT/p).mkdir(exist_ok=True,parents=True)
    for kind in ['ana','yatay','ikon','logotip']:
        for variant,color in [('',INK),('-ters',PAPER),('-tek-renk','#000000')]:
            b,w,h=logobody(kind,color)
            (ROOT/f'logo/demlik-{kind}{variant}.svg').write_text(svg(b,round(w,3),round(h,3),f'Demlik {kind} logo {variant}', 'Vektör çizgiler; yazı tipi gerektirmez. Şeffaf arka plan.'))
    scenes={'ambalaj-maket':packaging_scene(),'bardak-maket':cup_scene(),'tabela-maket':facade_scene(),'kartvizit-maket':cards_scene(),'kampanya-maket':campaign_scene()}
    for name,s in scenes.items():(ROOT/f'uygulamalar/{name}.svg').write_text(s)
    for i,b in enumerate(BLENDS):
        s=svg(label(i),240,325,f'Demlik {b[1]} {b[2]} ön etiket','Ön yüz tasarım örneği; 80 × 108,33 mm. Ürün bilgileri ve arka etiket üretim öncesi tamamlanmalıdır.')
        s=s.replace('width="240" height="325"','width="80mm" height="108.333mm"',1)
        (ROOT/f'uygulamalar/harman-{b[0]}-etiket.svg').write_text(s)
    for side in ['on','arka']:
        bg=INK if side=='on' else PAPER
        face=cardface(True) if side=='arka' else rings(500,165,.7,ORANGE,1.5,6)+logoat(39,92,273,'ana',PAPER)
        s=svg(f'<rect width="546" height="366" fill="{bg}"/><g transform="translate(18 18)">{face}</g>',546,366,f'Demlik kartvizit {side}', '91 × 61 mm çalışma alanı; dört yönde 3 mm taşma. Net ölçü 85 × 55 mm. Kesim x=18, y=18, genişlik=510, yükseklik=330 SVG birimi.')
        s=s.replace('width="546" height="366"','width="91mm" height="61mm"',1)
        (ROOT/f'uygulamalar/kartvizit-{side}-baski.svg').write_text(s)
    s=svg(posterbody(),594,840,'Demini Al / A3 afiş','A3 net boyut, RGB vektör kaynak; taşma ve baskı profili matbaada hazırlanmalıdır.').replace('width="594" height="840"','width="297mm" height="420mm"',1)
    (ROOT/'uygulamalar/demini-al-afis-A3.svg').write_text(s)
    (ROOT/'uygulamalar/demini-al-sosyal-1080x1350.svg').write_text(svg(defs()+socialbody(),1080,1350,'Demini Al / sosyal medya','4:5 gönderi; yayın görseli.'))
    (ROOT/'varliklar/dem-halkalari.svg').write_text(svg(f'<rect width="600" height="600" fill="{PAPER}"/>'+rings(300,300,1.3,ORANGE,2,8),600,600,'Dem halkaları deseni'))
    for name,path in FONTS.items():
        f=TTFont(path); opt=subset.Options(); opt.flavor='woff2'; opt.name_IDs=['*']; opt.name_legacy=True
        ss=subset.Subsetter(options=opt);ss.populate(unicodes=list(range(32,384))+list(range(0x2000,0x2070))+[0x20ba,0x2192,0x2197,0x2212,0x2713,0x00d7]);ss.subset(f);f.flavor='woff2';f.save(ROOT/f'varliklar/fonts/{name}.woff2')
    licenses=[]
    for n in fonts['serif']['name'].names:
        if n.nameID in [0,13,14]:
            try: licenses.append(n.toUnicode())
            except:pass
    (ROOT/'varliklar/lisanslar/URW-Bookman-font-metadata.txt').write_text('\n\n'.join(dict.fromkeys(licenses)))
    return scenes

def contrast(a,b):
    def lum(h):
        s=[int(h[i:i+2],16)/255 for i in [1,3,5]]
        s=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in s]
        return sum(v*t for v,t in zip(s,[.2126,.7152,.0722]))
    l1,l2=sorted([lum(a),lum(b)])
    return (l2+.05)/(l1+.05)

CSS='''
@font-face{font-family:Bookman;src:url(varliklar/fonts/serif.woff2)}
@font-face{font-family:Bookman;src:url(varliklar/fonts/bold.woff2);font-weight:700}
@font-face{font-family:Bookman;src:url(varliklar/fonts/italic.woff2);font-style:italic}
@font-face{font-family:Noto;src:url(varliklar/fonts/sans.woff2)}
@font-face{font-family:Noto;src:url(varliklar/fonts/medium.woff2);font-weight:500 800}
:root{--paper:#F4EBDD;--ink:#38211C;--orange:#DE704A;--sage:#9BA58C;--gold:#D8AE61}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#d0c4b5;color:var(--ink);font-family:Noto, sans-serif;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}button{font:inherit}
.toolbar{height:66px;background:var(--ink);color:var(--paper);display:flex;align-items:center;justify-content:space-between;padding:0 32px;position:sticky;top:0;z-index:5;font-size:12px;letter-spacing:.05em}.toolbar .brand{font-family:Bookman;font-size:24px;font-weight:bold;letter-spacing:-1px}.toolbar nav{display:flex;gap:27px;align-items:center}.toolbar a:hover{text-decoration:underline;text-underline-offset:5px}.toolbar button{border:1px solid #f4ebdd66;color:inherit;background:transparent;padding:8px 13px;border-radius:2px;cursor:pointer}
main{padding:32px 0 48px}.sheet{width:1440px;height:900px;background:var(--paper);position:relative;overflow:hidden;margin:0 auto 32px;padding:55px 70px 60px;isolation:isolate;box-shadow:0 7px 30px #38211c13;scroll-margin-top:90px}.eyebrow{font-size:12px;letter-spacing:.16em;font-weight:500;text-transform:uppercase}.running{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #38211c55;padding-top:13px;margin-bottom:43px}.footer{position:absolute;left:70px;right:70px;bottom:28px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:.13em;text-transform:uppercase}.footer .num{font-size:12px}.title{font:normal 60px/1.08 Bookman,serif;letter-spacing:-2.9px;margin:0 0 20px}.deck{font-size:17px;line-height:1.65;max-width:570px;margin:0}.serif{font-family:Bookman,serif}.muted{opacity:.65}.small{font-size:12px;line-height:1.6}.body{font-size:17px;line-height:1.65}.line{height:1px;background:#38211c44}.pill{display:inline-block;border:1px solid currentColor;padding:7px 10px;font-size:10px;letter-spacing:.1em}.cols{display:grid;grid-template-columns:1fr 1fr;gap:48px}.three{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.three h3{font-family:Bookman;font-size:28px;font-weight:normal;letter-spacing:-.9px;margin:19px 0 13px}.three p{font-size:15px;line-height:1.7;margin:0}.asset-link{font-size:11px;letter-spacing:.04em;text-decoration:underline;text-underline-offset:4px}.dark{background:var(--ink);color:var(--paper)}.dark .running{border-color:#f4ebdd55}.dark .line{background:#f4ebdd44}.scene{display:block;width:1100px;height:auto}.scene-wrap{margin:27px auto 0;width:1100px}.captionrow{display:flex;justify-content:space-between;gap:45px;margin-top:16px;font-size:12px;line-height:1.6}.captionrow p{margin:0;max-width:700px}.notes{font-size:12px;line-height:1.6;opacity:.8}.section-num{font-family:Bookman;font-size:100px;letter-spacing:-6px;line-height:1}.logo-cell{height:243px;padding:25px;position:relative}.logo-cell .label{position:absolute;left:25px;bottom:20px;font-size:11px}.logo-cell img{position:absolute;left:50%;top:43%;transform:translate(-50%,-50%)}
.cover{padding:55px 70px}.cover .cover-line{border-top:1px solid #f4ebdd66;padding-top:16px;display:flex;justify-content:space-between}.cover .huge-logo{position:absolute;left:65px;top:210px;width:800px}.cover h1{font:normal 66px/1.13 Bookman;letter-spacing:-3px;position:absolute;left:70px;bottom:141px;margin:0}.cover-side{position:absolute;right:0;top:116px;bottom:83px;width:440px;background:var(--orange);display:flex;justify-content:center;align-items:center}.cover-side img{width:236px}.cover-side .vertical{position:absolute;right:30px;top:40px;writing-mode:vertical-rl;font-size:11px;letter-spacing:.16em}.cover-tag{position:absolute;left:72px;bottom:95px;font-size:14px}.page-kicker{display:flex;justify-content:space-between;align-items:end}.page-kicker .title{margin:0;font-size:47px}.page-kicker .small{max-width:360px;margin:0}.principles{margin-top:54px}.principles>div{border-top:1px solid #38211c55;padding-top:18px}.principles .eyebrow{color:var(--orange)}.toc{display:grid;grid-template-columns:1fr 1fr;gap:0 28px;margin-top:34px}.toc a{border-bottom:1px solid #38211c33;padding:14px 0;display:flex;justify-content:space-between;font-size:13px}.toc a span{opacity:.5}
.swatches{display:grid;grid-template-columns:2fr 1.45fr 1.25fr 1fr 1fr;gap:12px;margin-top:38px}.swatch{height:348px;display:flex;flex-direction:column;justify-content:space-between;padding:20px}.swatch h3{font:26px/1.2 Bookman;letter-spacing:-1px;margin:0}.swatch p{font-size:11px;line-height:1.9;margin:0}.ratio{height:15px;display:flex;margin:19px 0 10px}.ratio span{height:100%}.contrast-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}.contrast-item{display:flex;gap:14px;align-items:center}.contrast-item strong{display:block;padding:10px 14px;font-size:28px;font-weight:500}.contrast-item p{font-size:11px;line-height:1.6;margin:0}.usage-grid{display:grid;grid-template-columns:1.3fr 1fr;gap:45px;margin-top:30px}.donts{display:grid;grid-template-columns:repeat(4,1fr);gap:25px;margin-top:29px}.dont{border-top:1px solid #38211c44;padding-top:14px}.dont .bad{height:68px;display:flex;align-items:center}.dont p{font-size:11px;line-height:1.6;margin:10px 0}.dont b{font-weight:500}.download-table{width:100%;border-collapse:collapse;font-size:14px}.download-table td{border-bottom:1px solid #38211c33;padding:18px 8px 18px 0;vertical-align:top}.download-table td:first-child{width:35%;font-weight:500}.download-table td:last-child{font-size:12px;line-height:1.6}.filebadge{font-size:10px;letter-spacing:.12em;border:1px solid #38211c66;padding:5px 8px;margin-right:10px}.voice-pair{padding:19px 0;border-top:1px solid #38211c44}.voice-pair p{margin:8px 0;font-size:14px;line-height:1.6}.voice-pair .good{font-family:Bookman;font-size:24px;letter-spacing:-.5px}.qa-box{border:1px solid #38211c55;padding:22px}.qa-box p{font-size:13px;line-height:1.7;margin:8px 0}
@media screen and (max-width:1470px){main{padding:20px 16px}.sheet{margin-bottom:24px;transform-origin:top left}.toolbar{padding:0 20px}}
@media screen and (max-width:700px){.toolbar{height:auto;min-height:64px;padding:13px 16px;gap:12px}.toolbar nav{gap:14px}.toolbar nav a:first-child,.toolbar .edition{display:none}.toolbar nav a,.toolbar button{font-size:10px}.toolbar .brand{font-size:22px}}
@media print{@page{size:1440px 900px;margin:0}html{scroll-behavior:auto}body{background:var(--paper);-webkit-print-color-adjust:exact;print-color-adjust:exact}.toolbar{display:none}main{padding:0}.sheet{margin:0!important;box-shadow:none;zoom:1!important;transform:none!important;break-after:page;page-break-after:always}.sheet:last-child{break-after:auto}.sheet a{color:inherit}}
'''

def build_html(scenes):
    pages=[]
    def page(num,title,body,classes='',running=True):
        top=f'<div class="running eyebrow"><span>Demlik / Marka kimliği</span><span>{title}</span></div>' if running else ''
        foot=f'<div class="footer"><span>Demlik · Kadıköy · 2024’ten beri</span><span>Kimlik kılavuzu / 1.0</span><span class="num">{num:02}</span></div>'
        pages.append(f'<section class="sheet {classes}" id="s{num}" aria-label="{html.escape(title)}">{top}{body}{foot}</section>')
    page(1,'Marka kimliği',f'''<div class="cover-line eyebrow"><span>Çay dükkânı & atölye / Kadıköy</span><span>Marka kimliği · Edisyon 01</span></div><img class="huge-logo" src="logo/demlik-logotip-ters.svg" alt="demlik"><div class="cover-side"><img src="logo/demlik-ikon-ters.svg" alt="İnce belli bardak ve kum saati işareti"><span class="vertical">İYİ ÇAY. İYİ ZAMAN.</span></div><h1>Çay acele<br>sevmez.</h1><div class="cover-tag">Şehrin hızına bir dem arası.</div>''','cover dark',False)
    page(2,'01 / Marka fikri','''<div class="cols"><div><span class="eyebrow">Bizim meselemiz</span><h2 class="title" style="font-size:72px;margin-top:22px">Bir bardaktan<br>daha fazlası.</h2><p class="deck">Demlik, çayı bir alışkanlıktan merak edilen bir ritüele taşır. Kadıköy’ün gündelik telaşında; iyi harmana, sohbete ve bir şey öğrenmeye ayrılan sıcak bir ara.</p></div><div style="padding:14px 0 0 36px"><div class="pill">İstanbul, Kadıköy / Kuruluş 2024</div><p class="body" style="margin-top:26px">Kahvesini tanıyan, şimdi çayını keşfeden şehirliye seslenir. Çayın bilgisini ciddiye alır; kendisini fazla ciddiye almaz.</p><div class="toc"><a href="#s3">İşaret & logotip <span>03</span></a><a href="#s6">Renk sistemi <span>06</span></a><a href="#s7">Tipografi <span>07</span></a><a href="#s9">Markanın sesi <span>09</span></a><a href="#s10">Uygulamalar <span>10</span></a><a href="#s15">Teslim & üretim <span>15</span></a></div></div></div><div class="three principles"><div><span class="eyebrow">01 / Tanıdık</span><h3>İnce belli bir hafıza.</h3><p>Bardak formu ve çay tonları ortak bir hatırayı çağırır. Nostalji, dekor olarak değil tanışıklık hissi olarak kullanılır.</p></div><div><span class="eyebrow">02 / Meraklı</span><h3>Harmana bir soru.</h3><p>Özel harmanlar ve cumartesi atölyeleri keşfe davet eder. Bilgi anlaşılırdır; çay uzmanı olmak gerekmez.</p></div><div><span class="eyebrow">03 / Rahat</span><h3>Vaktin demini al.</h3><p>Yumuşak harfler, ferah boşluklar ve küçük espriler aceleyi azaltır. İyi çay bir performans değil, keyiftir.</p></div></div>''')
    page(3,'02 / Ana logo',f'''<div class="page-kicker"><h2 class="title">Bir bardak. Biraz zaman.</h2><p class="small">İnce bel, kum saati ve yükselen buhar.<br>Üç çağrışım; tek, yalın işaret.</p></div><div style="height:500px;display:flex;align-items:center;justify-content:center"><img src="logo/demlik-ana.svg" width="510" alt="Demlik ana logo"></div><div class="three" style="border-top:1px solid #38211c55;padding-top:21px"><div><span class="eyebrow">İşaret</span><p style="margin-top:12px">Bardaktaki açıklık küçük bir nefes aralığıdır. Daralan gövde, demlenmek için gereken zamanı hatırlatır.</p></div><div><span class="eyebrow">Logotip</span><p style="margin-top:12px">Bookman’ın sıcak, tok serifleri özel harf aralıklarıyla bir araya gelir. Küçük harfler samimi bir ses kurar.</p></div><div><span class="eyebrow">İmza</span><p style="margin-top:12px">Slogan logoya sabitlenmez. Kimlik her ölçekte sade kalır; “Çay acele sevmez.” iletişimde serbestçe yer alır.</p></div></div>''')
    page(4,'03 / Logo ailesi','''<div class="page-kicker"><h2 class="title">Her yere aynı karakter.</h2><p class="small">Tüm SVG’ler eğrilere dönüştürüldü.<br>Şeffaf zeminlidir; font gerektirmez.</p></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:31px"><div class="logo-cell" style="background:#e7dcca"><img src="logo/demlik-ana.svg" width="224" alt="Ana logo"><div class="label">01 / Ana · Etiket, menü, kapak</div></div><div class="logo-cell" style="background:#e7dcca"><img src="logo/demlik-yatay.svg" width="390" alt="Yatay logo"><div class="label">02 / Yatay · Tabela, web, dar alan</div></div><div class="logo-cell" style="background:var(--orange)"><img src="logo/demlik-ikon-ters.svg" width="71" alt="İkon"><div class="label">03 / İkon · Avatar, damga, bardak</div></div><div class="logo-cell" style="background:var(--ink);color:var(--paper)"><img src="logo/demlik-yatay-ters.svg" width="390" alt="Ters logo"><div class="label">04 / Ters · Koyu yüzeyler</div></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px"><div style="display:flex;align-items:center;gap:30px"><img src="logo/demlik-yatay-tek-renk.svg" width="200" alt="Siyah tek renk logo"><p class="small">Tek renk / Kaşe, gravür, tek mürekkep.<br>Ana, yatay, ikon ve logotip için üç renk seti.</p></div><a class="asset-link" href="logo/demlik-yatay.svg" download>Yatay SVG’yi indir ↗</a></div>''')
    safe=svg(f'<rect x="60" y="89" width="568.4" height="169" fill="#e7dcca"/><path d="M89.2 65V282M599.2 65V282M36 118.2H653M36 228.8H653" fill="none" stroke="{ORANGE}" stroke-dasharray="4 5"/>'+logoat(89.2,118.2,510,'yatay')+f'<path d="M60 74H89.2M60 67V81M89.2 67V81" stroke="{INK}"/>'+textpath('x',70,61,15,INK,'italic')+textpath('x = işaret genişliğinin ½’si',330,327,13,INK,'sans',0,'middle'),660,390,'Logo koruma alanı','x işaret genişliğinin yarısıdır; her yönde en az x boşluk bırakın.')
    page(5,'04 / Kullanım kuralları',f'''<div class="page-kicker"><h2 class="title">Biraz boşluk iyi gelir.</h2><p class="small">Oranı, rengi ve nefes alanını koru.<br>Logoyu her zaman kaynak SVG’den kullan.</p></div><div class="usage-grid"><div>{safe}</div><div style="padding-top:21px"><span class="eyebrow">Koruma alanı</span><p class="body" style="margin:12px 0 25px">İşaretin genişliğinin yarısı <i>x</i>’tir. Logonun görünen dış sınırından her yönde en az <i>x</i> boşluk bırak. Aynı kural ana ve yatay sürüme uygulanır.</p><span class="eyebrow">Minimum genişlik / dijital · baskı</span><div class="small" style="display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-top:16px"><div>Ana logo<br><b>120 px · 30 mm</b></div><div>Yatay logo<br><b>150 px · 35 mm</b></div><div>İkon<br><b>24 px · 8 mm</b></div><div>Yalın logotip<br><b>110 px · 25 mm</b></div></div><p class="notes">İkon için dış boşluk: genişliğin ¼’ü. Logotip için: harf yüksekliğinin ½’si. Küçük ölçekte zemin desensiz olmalı.</p></div></div><div class="donts"><div class="dont"><div class="bad"><img src="logo/demlik-yatay.svg" style="width:170px;transform:scale(1.35,.6);transform-origin:left center" alt="Oranı bozulmuş logo"></div><p><b>× Esnetme.</b><br>Genişlik ve yüksekliği birlikte ölçekle.</p></div><div class="dont"><div class="bad" style="transform:rotate(-12deg)"><img src="logo/demlik-yatay.svg" width="171" alt="Döndürülmüş logo"></div><p><b>× Döndürme.</b><br>Ambalajın fiziksel açısı dışında yatay tut.</p></div><div class="dont"><div class="bad" style="background:var(--sage);padding:15px"><img src="logo/demlik-yatay-ters.svg" width="171" alt="Düşük kontrastlı logo"></div><p><b>× Kontrastı kaybetme.</b><br>Adaçayı üzerinde koyu logoyu seç.</p></div><div class="dont"><div class="bad"><img src="logo/demlik-yatay.svg" width="171" style="filter:drop-shadow(4px 4px 1px #DE704A)" alt="Gölgeli logo"></div><p><b>× Efekt ekleme.</b><br>Gölge, kontur ve degrade kullanma.</p></div></div>''')
    swatches=''
    for name,col,ratio in [('Kâğıt',PAPER,50),('Dem',INK,25),('Kiremit',ORANGE,15),('Adaçayı',SAGE,7),('Pirinç',GOLD,3)]:
        rgb=[int(col[i:i+2],16) for i in (1,3,5)];rr,gg,bb=[v/255 for v in rgb];k=1-max(rr,gg,bb);c,m,y=[round((1-v-k)/(1-k)*100) for v in [rr,gg,bb]]
        tc=PAPER if name=='Dem' else INK
        swatches+=f'<div class="swatch" style="background:{col};color:{tc};border:1px solid #38211c22"><div><span class="eyebrow">{ratio}%</span><h3 style="margin-top:17px">{name}</h3></div><p><b>{col}</b><br>RGB {" / ".join(map(str,rgb))}<br>CMYK {c} / {m} / {y} / {round(k*100)}</p></div>'
    pairs=''
    for fg,bg,name in [(INK,PAPER,'Dem / Kâğıt'),(INK,SAGE,'Dem / Adaçayı'),(INK,GOLD,'Dem / Pirinç')]:
        pairs+=f'<div class="contrast-item"><strong style="background:{bg};color:{fg}">Aa</strong><p>{name}<br><b>{contrast(fg,bg):.2f}:1</b> · Normal metin için AA</p></div>'
    page(6,'05 / Renk sistemi',f'''<div class="page-kicker"><h2 class="title">Çaydan gelen bir palet.</h2><p class="small">Ana ilişki: açık Kâğıt + koyu Dem.<br>Kiremit hareket verir; diğer renkler eşlik eder.</p></div><div class="swatches">{swatches}</div><div class="ratio"><span style="width:50%;background:{PAPER};border:1px solid #38211c33"></span><span style="width:25%;background:{INK}"></span><span style="width:15%;background:{ORANGE}"></span><span style="width:7%;background:{SAGE}"></span><span style="width:3%;background:{GOLD}"></span></div><div class="captionrow"><p>Oranlar genel iletişim için görsel ağırlık önerisidir. Kampanya ve ürün etiketleri kendi vurgu rengini baskın kullanabilir.</p><p>CMYK değerleri matematiksel yaklaşıktır.<br>Nihai profil ve kâğıt için baskı provası gerekir.</p></div><div class="contrast-grid">{pairs}</div><p class="notes" style="margin-top:22px">Dem / Kiremit: {contrast(INK,ORANGE):.2f}:1; normal metin için AA. Kâğıt / Kiremit: {contrast(PAPER,ORANGE):.2f}:1; metinde kullanma, yalnız dekoratif grafik ve logoya ayır. Ürün adları renk dışında ad ve numarayla da ayrılır. Ölçümler WCAG sRGB formülüyledir.</p>''')
    page(7,'06 / Tipografi','''<div class="cols" style="grid-template-columns:1.35fr 1fr;gap:65px"><div><span class="eyebrow">01 / Başlık · URW Bookman Light</span><div style="font-family:Bookman;font-size:89px;letter-spacing:-4.5px;line-height:1.06;margin:28px 0 34px">Her çayın<br>bir zamanı<br><i>var.</i></div><div class="line"></div><p style="font-family:Bookman;font-size:25px;line-height:1.7;margin:24px 0">Aa Bb Cc Çç Ğğ Iı İi Öö Şş Üü<br>0123456789 & % @</p><p class="notes">Light / ana başlık · Light Italic / kısa vurgu<br>Demi / yalnız logotip ve seçili vurgu</p></div><div><span class="eyebrow">02 / Metin · Noto Sans</span><h2 style="font:500 36px/1.2 Noto;letter-spacing:-1px;margin:29px 0 24px">İyi çayı tanımak,<br>bir yudumla başlar.</h2><p class="body">Özel harmanları keşfet, el yapımı demliklere göz at, cumartesi demleme atölyesinde kendi ritmini bul.</p><p style="font-size:21px;line-height:1.8;margin:28px 0">Aa Bb Cc Çç Ğğ Iı İi Öö Şş Üü<br>0123456789 & % @</p><div class="line"></div><div class="small" style="display:grid;grid-template-columns:1fr 1fr;gap:19px;margin:22px 0"><div><b>Başlık</b><br>56–88 px / 1,08<br>Harf aralığı −0,03 em</div><div><b>Ara başlık</b><br>28–36 px / 1,2<br>Harf aralığı −0,02 em</div><div><b>Gövde</b><br>16–18 px / 1,6<br>Harf aralığı 0</div><div><b>Bilgi / etiket</b><br>11–12 px / 1,5<br>Büyük harfte +0,12 em</div></div><p class="notes">Basılı küçük bilgi için en az 8 pt kullan. Uzun metni tamamı büyük harfle dizme. Türkçe büyük harf dönüşümünü koru: “İYİ ÇAY”, “KADIKÖY”.</p></div></div><div style="position:absolute;bottom:93px;left:70px;right:70px;border-top:1px solid #38211c44;padding-top:18px" class="small">Yerel, açık lisanslı sistem fontlarından hazırlanmıştır. WOFF2 dosyaları ve lisans bilgileri kitin içindedir; çevrimdışı çalışır. Logolar font dosyasına bağlı değildir.</div>''')
    graphics=[svg(f'<rect width="400" height="350" fill="{ORANGE}"/>'+rings(200,175,.8,INK,2,6),400,350,'Kiremit üzerinde dem halkaları'),svg(f'<rect width="400" height="350" fill="{INK}"/>'+iconat(127.5,40,145,PAPER),400,350,'Koyu zemin üzerinde açık işaret'),svg(f'<rect width="400" height="350" fill="{SAGE}"/><circle cx="200" cy="175" r="118" fill="{PAPER}"/>'+iconat(163,105,72,INK),400,350,'Adaçayı zemin ve açık daire')]
    page(8,'07 / Grafik dil',f'''<div class="page-kicker"><h2 class="title">Dem, çizgi çizgi yayılır.</h2><p class="small">İşaretin belinden türeyen “dem halkaları”,<br>kimliğin ikinci tanınma unsurudur.</p></div><div class="three" style="margin-top:35px;gap:32px">{''.join('<div>'+g+'</div>' for g in graphics)}</div><div class="three" style="margin-top:20px;gap:32px"><div><span class="eyebrow">01 / Akış</span><p style="margin-top:15px">Simetrik, kesintisiz çizgiler kullan. Desen kenardan taşabilir; eğrileri esnetme. Aralık, çizgi kalınlığının en az 8 katı olsun.</p></div><div><span class="eyebrow">02 / Ölçek</span><p style="margin-top:15px">İşaret tek başına büyüyebilir. Küçük logo çoğaltarak doku oluşturma; her yüzeyde bir odak bırak.</p></div><div><span class="eyebrow">03 / Denge</span><p style="margin-top:15px">Daire, bardak tabağını çağrıştıran yardımcı bir alandır. Kimliğin kalıcı parçası değildir; logoya rozet olarak eklenmez.</p></div></div><div class="captionrow" style="margin-top:28px;border-top:1px solid #38211c44;padding-top:18px"><p>Desen metnin altına gelmez. Geniş yüzeylerde %10–20 tonla, kampanyalarda tam renkle kullanılabilir. Çizgi kalınlığı dijitalde en az 1 px, baskıda en az 0,25 mm.</p><a class="asset-link" href="varliklar/dem-halkalari.svg" download>Desen SVG’sini indir ↗</a></div>''')
    page(9,'08 / Markanın sesi','''<div class="cols" style="grid-template-columns:1.2fr 1fr;gap:85px"><div><span class="eyebrow">Demlik nasıl konuşur?</span><h2 class="title" style="font-size:78px;margin-top:30px">Çayın ciddi.<br>Sen rahat<br>ol.</h2><p class="deck">Kısa, sıcak, hafif muzip. Öğretirken üstten bakmaz; satarken bağırmaz. “Sen” der, sohbete yer bırakır.</p><div class="line" style="margin-top:33px"></div><p class="small" style="margin-top:20px"><b>Sabit marka sözü</b> · Çay acele sevmez.<br><b>Davet</b> · Bir çaya bakar.<br><b>Kampanya</b> · Demini Al.</p></div><div><div class="voice-pair"><span class="eyebrow muted">Ürün anlatımı</span><p class="muted">“Eşsiz, premium ve benzersiz çay deneyimi.”</p><p class="good">“Bildiğin çaya, yeni bir merhaba.”</p><p>Sıfat biriktirmek yerine merak uyandır.</p></div><div class="voice-pair"><span class="eyebrow muted">Atölye daveti</span><p class="muted">“Çay demlemenin tüm sırlarını öğrenin!”</p><p class="good">“Cumartesi bir dem öğrenelim.”</p><p>Kesin vaatler yerine birlikte keşfetmeye çağır.</p></div><div class="voice-pair"><span class="eyebrow muted">Kampanya metni / Hazır kullanım</span><p class="good">“Akşamın demi başka.”</p><p>Kadıköy Akşamı geldi. Yeni sonbahar harmanıyla tanış; 1–7 Ekim’de demleme atölyesine %20 indirimle katıl. Bilgi ve kayıt: @demlik.kadikoy</p></div><p class="notes">Sağlık vaadi, doğrulanmamış köken ve lezzet notu ekleme. Çayın hikâyesini ürünün gerçek bilgisiyle tamamla.</p></div></div>''')
    for num,title,head,sub,name,cap,link,linklabel in [
      (10,'09 / Ambalaj','Üç harman. Bir aile.','Aynı düzen; farklı bir ruh.','ambalaj-maket','01 Karadeniz Sabahı / Kiremit · 02 Kadıköy Akşamı / Dem · 03 Adaçaylı Bergamot / Adaçayı. Renk, ürün adı ve numara birlikte ayırt etmeyi sağlar.','uygulamalar/harman-02-etiket.svg','Kadıköy Akşamı etiketi ↗'),
      (11,'10 / Bardak','İçeride, dışarıda, hep Demlik.','Ritüel camda. Hareket kartonda.','bardak-maket','Karton bardakta yatay imza; ince belli bardakta tek renk ikon. Kavisli yüzeylerde logoyu ön görüş alanına yerleştir. Cam baskısında opak mürekkep kullan.','uygulamalar/bardak-maket.svg','Bardak maketi SVG ↗'),
      (12,'11 / Mekân','Mahalleye açılan bir dem.','Moda Cd. No: 42 / Kadıköy','tabela-maket','Ana tabelada yatay logo, yaya görüşünde ikonlu asma tabela. Vitrinde tek bir marka cümlesi. Gece aydınlatması sıcak ve homojen; harf kenarlarını ışıkla boğma.','uygulamalar/tabela-maket.svg','Cephe maketi SVG ↗'),
      (13,'12 / Kartvizit','Bir çaya bakar.','85 × 55 mm / İki yüz','kartvizit-maket','Ön yüzde kimlik, arka yüzde davet ve iletişim. Öneri: 350 g/m² doğal beyaz, mat ve dokulu karton. Dosyalarda dört yönde 3 mm taşma bulunur.','uygulamalar/kartvizit-on-baski.svg','Kartvizit ön yüz SVG ↗'),
      (14,'13 / Ekim kampanyası','Demini Al.','Yeni harman + atölyeye davet','kampanya-maket','A3 afiş ve 1080 × 1350 px gönderi. Önce davet, sonra Kadıköy Akşamı, en sonda 1–7 Ekim atölye indirimi. Başlıkla teklif aynı anda yarışmaz.','uygulamalar/demini-al-afis-A3.svg','A3 afiş SVG ↗')]:
        warning={10:'Ambalaj maketi ve ön etiket tasarımıdır; yasal ürün bilgisi içeren arka etiket değildir.',11:'Ölçüler ve baskı alanı, seçilen bardak ve tedarikçi şablonuyla doğrulanmalıdır.',12:'Kurgusal cephe görselleştirmesidir; ölçülü mimari uygulama projesi değildir.',13:'Net kesim 85 × 55 mm; dosya 91 × 61 mm. Dijital renkler baskı provasıyla eşleştirilir.',14:'Kampanya metni brief’e göre hazırlanmıştır. Yıl, seanslar ve indirim koşulları yayın öncesi doğrulanır.'}[num]
        sceneheight='style="max-height:535px;width:1100px"' if num==12 else ''
        page(num,title,f'''<div class="page-kicker"><h2 class="title">{head}</h2><p class="small">{sub}</p></div><div class="scene-wrap"><img class="scene" {sceneheight} src="uygulamalar/{name}.svg" alt="{head}"><div class="captionrow"><p>{cap}</p><a class="asset-link" href="{link}" download>{linklabel}</a></div><p class="notes" style="margin-top:9px;font-size:10px">{warning}</p></div>''')
    page(15,'14 / Teslim & üretim','''<div class="page-kicker"><h2 class="title">Güzel görünür. Kolay kullanılır.</h2><p class="small">Dosyaları birlikte tut.<br>Kit internet bağlantısı olmadan açılır.</p></div><div class="cols" style="grid-template-columns:1.45fr 1fr;gap:58px;margin-top:30px"><div><table class="download-table"><tr><td><span class="filebadge">SVG</span>logo/</td><td>Ana, yatay, ikon, yalın logotip.<br>Her biri Dem, ters Kâğıt ve siyah tek renk: 12 dosya.</td></tr><tr><td><span class="filebadge">SVG</span>uygulamalar/</td><td>5 maket, 3 harman ön etiketi, 2 kartvizit yüzü,<br>A3 kampanya afişi; 4:5 sosyal SVG ve PNG.</td></tr><tr><td><span class="filebadge">WEB</span>varliklar/</td><td>Dem halkaları, yerel WOFF2 fontlar ve lisanslar.<br>Renk değişkenleri: <a href="varliklar/renkler.css" class="asset-link" download>renkler.css</a></td></tr><tr><td><span class="filebadge">DOC</span>Kılavuz</td><td>kilavuz.html / çevrimdışı, bağlantılı sürüm.<br>kilavuz.pdf / 16 sayfa, yatay sunum.<br>TESLIM.md / açma ve yeniden üretme bilgileri.</td></tr></table><p class="notes" style="margin-top:23px">Logolar ve uygulamalar tamamen vektördür. Logo ve uygulama SVG’lerinde yazılar eğrilere dönüştürülmüştür. Düzenlenebilir kaynak kodu <b>kaynak/</b> klasöründedir.</p></div><div><div class="qa-box"><span class="eyebrow">Üretim öncesi 4 kontrol</span><p>01 / Doğru logo sürümü, yeterli boşluk ve minimum boyut.</p><p>02 / Kâğıt ve mürekkep üzerinde renk provası; matbaanın ICC profiline göre CMYK dönüşümü.</p><p>03 / Etiketlerde içerik, net miktar, üretici, parti ve gerekli ürün bilgilerinin tamamlanması.</p><p>04 / Afişte 3 mm taşma; bardak, tabela ve ambalajda tedarikçinin kesim/baskı şablonuna uyarlama.</p></div><p class="notes" style="margin-top:20px">SVG’ler RGB kaynak dosyalardır; PDF kimlik sunumudur. Kartvizit dışındaki uygulamalar kesim şablonu veya baskıya hazır PDF/X değildir. Font lisansları varliklar/lisanslar/ içindedir.</p><a class="asset-link" href="kilavuz.pdf" download>Kılavuzu PDF olarak indir ↗</a></div></div>''')
    page(16,'Görüşmek üzere',f'''<div class="cover-line eyebrow"><span>Çay dükkânı & atölye</span><span>Kadıköy / İstanbul</span></div><div style="position:absolute;left:65px;top:170px"><h2 style="font:normal 108px/1.02 Bookman;letter-spacing:-6px;margin:0">Bir ara,<br>bir dem.</h2><p style="font-size:18px;margin-top:32px">Moda Cd. No: 42 Kadıköy<br>@demlik.kadikoy · demlik.com.tr</p></div><div style="position:absolute;right:45px;top:131px;width:490px;height:600px">{svg(rings(245,310,1.15,ORANGE,2.4,7)+iconat(187,210,115,PAPER),490,600,'Demlik kapanış deseni')}</div><img style="position:absolute;left:70px;bottom:112px;width:280px" src="logo/demlik-yatay-ters.svg" alt="Demlik"><div style="position:absolute;right:70px;bottom:112px;font-size:11px;letter-spacing:.12em">ÇAY ACELE SEVMEZ.</div>''','cover dark',False)
    document='''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#38211C"><meta name="description" content="Demlik — Kadıköy çay dükkânı ve atölyesi. Marka kimliği, logo sistemi ve uygulama kılavuzu."><title>Demlik — Marka Kimliği</title><style>'''+CSS+'''</style></head><body><header class="toolbar"><a class="brand" href="#s1">demlik</a><span class="edition">MARKA KİMLİĞİ / 01</span><nav aria-label="Kılavuz bölümleri"><a href="#s4">Logolar</a><a href="#s6">Sistem</a><a href="#s10">Uygulamalar</a><a href="kilavuz.pdf" download>PDF ↗</a><button onclick="window.print()" aria-label="Kılavuzu yazdır">Yazdır</button></nav></header><main>'''+''.join(pages)+'''</main><script>
function fit(){const s=Math.min(1,(innerWidth-32)/1440);document.querySelectorAll('.sheet').forEach(p=>{p.style.zoom=s;});}fit();addEventListener('resize',fit);document.fonts.ready.then(()=>document.documentElement.dataset.ready='true');
</script></body></html>'''
    (ROOT/'kilavuz.html').write_text(document)
    (ROOT/'varliklar/renkler.css').write_text(':root {\n  --demlik-kagit: #F4EBDD;\n  --demlik-dem: #38211C;\n  --demlik-kiremit: #DE704A;\n  --demlik-adacayi: #9BA58C;\n  --demlik-pirinc: #D8AE61;\n}\n')

if __name__=='__main__':
    scenes=write_assets(); build_html(scenes)
    print(f'Created 12 logo SVGs, 12 application SVGs, HTML guide. Wordmark bounds: {WW:.1f} × {WH:.1f}')
    print('Contrast:',[(a,b,round(contrast(a,b),2)) for a,b in [(INK,PAPER),(INK,SAGE),(INK,GOLD),(INK,ORANGE),(PAPER,ORANGE)]])
