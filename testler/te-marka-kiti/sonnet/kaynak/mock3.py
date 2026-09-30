from g_core import *
from patterns import *
from scenes import *
from mark import parts
import random,math
GL=parts()['glass']
def emb(svgstr,x,y,w,h):
    """embed a scene svg string (200x200 viewBox) into a rect, slice"""
    return svgstr.replace('width="200" height="200"',f'preserveAspectRatio="xMidYMid slice" x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}"',1)
def sh(x,y,w,h,r=4,o=.35,dy=8,blur='b8'):
    return f'<rect x="{x+3}" y="{y+dy}" width="{w}" height="{h}" rx="{r}" fill="#000" opacity="{o}" filter="url(#{blur})"/>'
DEFS='<defs><filter id="b8" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8"/></filter><filter id="b4" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5"/></filter></defs>'
def glass_at(x,y,s,fill,rot=0,stroke=None):
    st=f' stroke="{stroke}" stroke-width="{1.6/s}"' if stroke else ''
    return f'<path transform="translate({x:.1f} {y:.1f}) rotate({rot}) scale({s}) translate(-120 -178)" d="{GL}" fill="{fill if not stroke else "none"}"{st}/>'
def txt(x,y,s,fill,t,fam='serif',w=900,it=True,anchor='start',ls=0,extra=''):
    f={'serif':'Noto Serif Display','sans':'Noto Sans'}[fam]
    st='italic' if it else 'normal'
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{f}" font-style="{st}" font-weight="{w}" font-size="{s}" letter-spacing="{ls}" fill="{fill}" {extra}>{t}</text>'

# ---------------- business cards ----------------
def card_front(x,y,rot=0,w=340,h=204):
    lg,_=place('ana','ters',x+w/2-70,y+h/2-58,w=140)
    rings=''.join(f'<circle cx="{x+w+10}" cy="{y-10}" r="{r}" fill="none" stroke="#EBA23C" stroke-opacity="{.5-r/400:.2f}" stroke-width="1"/>' for r in range(30,180,26))
    rings+=''.join(f'<circle cx="{x-10}" cy="{y+h+10}" r="{r}" fill="none" stroke="#F6EBDA" stroke-opacity=".12" stroke-width="1"/>' for r in range(30,150,26))
    i=uid('cf')
    return f'<g transform="rotate({rot} {x+w/2} {y+h/2})">{sh(x,y,w,h,5,.35,10)}<clipPath id="{i}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5"/></clipPath><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="#2B1810"/><g clip-path="url(#{i})">{rings}</g>{lg}<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="none" stroke="#fff" stroke-opacity=".08"/></g>'
def card_back(x,y,rot=0,w=340,h=204):
    
    return f'''<g transform="rotate({rot} {x+w/2} {y+h/2})">{sh(x,y,w,h,5,.3,9)}<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="#FFFAF1"/>
<rect x="{x+w-70}" y="{y}" width="70" height="{h}" rx="0" fill="{C['kirmizi']}" clip-path="inset(0 0 0 0 round 0 5px 5px 0)"/>
<path d="M{x+w-70} {y} H{x+w-5} a5 5 0 0 1 5 5 V{y+h-5} a5 5 0 0 1 -5 5 H{x+w-70}Z" fill="{C['kirmizi']}"/>
{place('ikon','beyaz',x+w-70+14,y+h/2-30,w=42)[0]}
{txt(x+24,y+52,28,C['koyu'],'Elif Demirci')}
{txt(x+24,y+72,7.6,C['kirmizi'],'KURUCU · USTA DEMLİKÇİ','sans',700,False,ls=1.6)}
<rect x="{x+24}" y="{y+88}" width="26" height="2" fill="{C['kirmizi']}"/>
{txt(x+24,y+118,8.6,C['koyu'],'0216 555 01 42','sans',500,False)}
{txt(x+24,y+133,8.6,C['koyu'],'elif@demlik.com.tr','sans',500,False)}
{txt(x+24,y+148,8.6,C['koyu'],'@demlik.kadikoy','sans',500,False)}
{txt(x+24,y+176,7.8,C['kahve'],'Moda Cd. No: 42 Kadıköy','sans',400,False)}
</g>'''
def loyalty(x,y,rot=0,w=340,h=204):
    g=''
    for k in range(10):
        cx=x+44+(k%5)*60; cy=y+112+(k//5)*46
        filled=k<3
        g+=glass_at(cx,cy,.66,C['krem'] if filled else C['krem'],stroke=None if filled else C['krem'])
    return f'''<g transform="rotate({rot} {x+w/2} {y+h/2})">{sh(x,y,w,h,5,.3,9)}<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="{C['kirmizi']}"/>
{txt(x+24,y+42,28,C['krem'],'Demleme Kartı')}
{txt(x+24,y+62,7.6,C['amber'],'10 DEMLEME, 1 ÇAY BİZDEN','sans',700,False,ls=1.6)}
{g}
{txt(x+24,y+h-12,6.6,C['krem'],'Kaşe yeri: her demlemede bir bardak · demlik.com.tr','sans',500,False,extra='opacity=".85"')}
</g>'''
def letterhead(x,y,rot=0,w=300,h=424):
    lines='Merhaba,|Ekim ayında Kadıköy Akşamı harmanını raflarımıza|aldık. Lansmana özel, ilk hafta cumartesi demleme|atölyemize %20 indirim yapıyoruz. Yerler sınırlı|değil ama çay acele sevmez; sizi bekleriz.|Sevgiyle,'.split('|')
    t=''.join(txt(x+28,y+150+k*12.5,7,C['koyu'],l,'sans',400,False,extra='opacity=".85"') for k,l in enumerate(lines))
    lgh,_=place('yatay','renkli',x+24,y+26,w=118)
    return f'''<g transform="rotate({rot} {x+w/2} {y+h/2})">{sh(x,y,w,h,2,.3,10)}<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#FFFDF7"/>
{lgh}
{txt(x+w-24,y+34,6,C['kahve'],'Moda Cd. No: 42','sans',500,False,'end')}{txt(x+w-24,y+44,6,C['kahve'],'Kadıköy / İstanbul','sans',500,False,'end')}{txt(x+w-24,y+54,6,C['kahve'],'demlik.com.tr','sans',500,False,'end')}
<rect x="{x+24}" y="{y+82}" width="{w-48}" height="1" fill="{C['kirmizi']}"/>
{txt(x+28,y+118,7,C['kahve'],'12 Ekim 2026','sans',500,False)}
{txt(x+28,y+136,8.4,C['koyu'],'Sayın Demlik dostu,','sans',700,False)}
{t}
{txt(x+28,y+232,15,C['koyu'],'Elif','serif',900,True)}
<rect x="{x}" y="{y+h-40}" width="{w}" height="40" fill="{C['krem']}"/>{place('kelime','renkli',x+24,y+h-27,w=54)[0]}{txt(x+w-24,y+h-15,5.6,C['kahve'],'Çay acele sevmez.','sans',500,False,'end')}
</g>'''
def envelope(x,y,rot=0,w=340,h=170):
    stamp=emb(scene_aksam(200,200),x+w-64,y+16,44,54)
    i=uid('en')
    return f'''<g transform="rotate({rot} {x+w/2} {y+h/2})">{sh(x,y,w,h,3,.3,9)}<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="#F1DFC0"/>
<path d="M{x} {y} L{x+w/2} {y+h*.56} L{x+w} {y}" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="1.2"/>
{place('rozet','renkli',x+w/2-16,y+h*.56-16,w=32)[0]}
<g><rect x="{x+w-68}" y="{y+12}" width="52" height="62" fill="#FFFAF1" stroke="#000" stroke-opacity=".12"/>
<clipPath id="{i}"><rect x="{x+w-64}" y="{y+16}" width="44" height="54"/></clipPath><g clip-path="url(#{i})">{stamp}</g></g>
{txt(x+22,y+h-46,8,C['kahve'],'Alıcı: Sayın Demlik dostu','sans',500,False)}{txt(x+22,y+h-33,8,C['kahve'],'Bağdat Cd. No: 7 Kadıköy','sans',500,False)}
{txt(x+22,y+22,6.4,C['kirmizi'],'DEMLİK · MODA CD. NO: 42 KADIKÖY','sans',700,False,ls=1)}
</g>'''
def cards_scene():
    o=[DEFS]
    o.append('<rect width="1123" height="794" fill="#DDC8A6"/>')
    for k in range(80):
        o.append(f'<rect x="0" y="{k*10}" width="1123" height="1" fill="#000" opacity=".025"/>')
    o.append(letterhead(668,104,2.2))
    o.append(envelope(640,540,-2.5,340,170))
    o.append(card_front(76,172,-4))
    o.append(card_back(304,302,3))
    o.append(loyalty(92,470,-2))
    return f'<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">{"".join(o)}</svg>'
