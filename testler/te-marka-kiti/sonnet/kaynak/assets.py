import math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from mark import parts
from wm import glyph_paths

PAL=dict(
    kirmizi='#BC3C17', koyu='#2B1810', krem='#F6EBDA', beyaz='#FFFAF1',
    amber='#EBA23C', yesil='#2F5D4B', mur='#5A2440', bergamot='#D7B02B',
    coral='#F08A5D', sis='#CFE0D2', buhar='#E4D3BB', kahve='#6B4A36', pembe='#F3C9B0', adacayi='#8DA085', bergtint='#F0E19B',
)
ICON_BOX=(20,20,204,192)   # x,y,w,h measured tight (approx) - refined below

# ---------- text to path (sans) ----------
_fc={}
def text_path(fontfile,text,size,tracking=0,x0=0,y0=0):
    if fontfile not in _fc:
        f=TTFont(fontfile); _fc[fontfile]=(f,f.getGlyphSet(),f.getBestCmap(),f['head'].unitsPerEm)
    f,gs,cmap,upm=_fc[fontfile]
    s=size/upm; x=0; ds=[]
    for ch in text:
        gn=cmap.get(ord(ch))
        if gn is None: x+=upm*0.3; continue
        pen=SVGPathPen(gs)
        tp=TransformPen(pen,(s,0,0,-s,x0+x*s,y0))
        gs[gn].draw(tp)
        ds.append(pen.getCommands())
        x+=gs[gn].width+tracking*upm/1000
    return ' '.join(ds), x*s
SANS='/usr/share/fonts/noto/NotoSans-Medium.ttf'
SANSB='/usr/share/fonts/noto/NotoSans-Bold.ttf'

# ---------- wordmark ----------
WM_W='black'; WM_TR=-30
def wordmark_geom():
    o,x,upm,f=glyph_paths(WM_W,'demlık',tracking=WM_TR)
    ii=o[4]
    cx=ii['x']+(ii['bounds'][0]+ii['bounds'][2])/2-6
    minx=o[0]['bounds'][0]
    maxx=o[-1]['x']+o[-1]['bounds'][2]
    return o,cx,minx,maxx
def wordmark_group(fill,dot):
    o,cx,minx,maxx=wordmark_geom()
    d=' '.join(q['d'] for q in o)
    # units: baseline y=0, ascender -760. returns (svg, bbox)
    svg=f'<path fill="{fill}" d="{d}"/><circle cx="{cx:.1f}" cy="-706" r="84" fill="{dot}"/>'
    bbox=(minx,-790,maxx-minx,800)  # x,y,w,h  (dot top ~ -790)
    return svg,bbox

def icon_group(main,accent,hole=False,extra_bg=None):
    P=parts()
    k=P['kettle']+' '+P['glass']
    svg=f'<g fill="{main}"><path fill-rule="evenodd" d="{k}"/>'
    for n in ('spout','khandle','demlik','dhandle','lid','knob'):
        svg+=f'<path d="{P[n]}"/>'
    svg+='</g>'
    if accent: svg+=f'<path d="{P["glass"]}" fill="{accent}"/>'
    return svg
# tight icon bbox (measured): computed once by rasterising -> set below
IB=(27.5,26.5,181.5,183.5)

def svg_doc(inner,bbox,pad=0,bg=None,title=None,desc=None):
    x,y,w,h=bbox
    vb=f'{x-pad:.1f} {y-pad:.1f} {w+2*pad:.1f} {h+2*pad:.1f}'
    t=f'<title>{title}</title>' if title else ''
    d=f'<desc>{desc}</desc>' if desc else ''
    r=f'<rect x="{x-pad:.1f}" y="{y-pad:.1f}" width="{w+2*pad:.1f}" height="{h+2*pad:.1f}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img">{t}{d}{r}{inner}</svg>\n'

def scheme(name):
    return {
     'renkli': dict(main=PAL['koyu'],accent=PAL['kirmizi'],icon_accent=PAL['kirmizi'],hole=False),
     'ters':   dict(main=PAL['krem'],accent=PAL['amber'],icon_accent=PAL['amber'],hole=False),
     'siyah':  dict(main='#000000',accent='#000000',icon_accent=None,hole=True),
     'beyaz':  dict(main='#FFFFFF',accent='#FFFFFF',icon_accent=None,hole=True),
     'kahve':  dict(main=PAL['koyu'],accent=PAL['koyu'],icon_accent=None,hole=True),
     'krem':   dict(main=PAL['krem'],accent=PAL['krem'],icon_accent=None,hole=True),
    }[name]

# ---------- lockups ----------
def L_kelime(sc):
    g,bb=wordmark_group(sc['main'],sc['accent'])
    return g,bb
def L_ikon(sc):
    g=icon_group(sc['main'],sc['icon_accent'])
    return g,IB
def L_rozet(sc,name):
    # round badge: disc + pot knocked out (cream) ; glass shows disc colour
    R=120
    P=parts()
    if name=='renkli': disc,potc,gl=PAL['kirmizi'],PAL['krem'],PAL['kirmizi']
    elif name=='ters': disc,potc,gl=PAL['krem'],PAL['koyu'],PAL['kirmizi']
    else: disc,potc,gl=sc['main'],None,None
    s=0.80; tx=120-(IB[0]+IB[2]/2)*s; ty=126-(IB[1]+IB[3]/2)*s
    if potc:
        inner=f'<circle cx="120" cy="120" r="{R}" fill="{disc}"/><g transform="translate({tx:.2f} {ty:.2f}) scale({s})">{icon_group(potc,None)}</g>'
        if name=='ters':
            inner=f'<circle cx="120" cy="120" r="{R}" fill="{disc}"/><g transform="translate({tx:.2f} {ty:.2f}) scale({s})">{icon_group(potc,PAL["kirmizi"])}</g>'
    else:
        # mono: disc with pot as hole (evenodd) -> build one compound path
        circ=f'M120 {120-R} a{R} {R} 0 1 0 0.01 0Z'
        # transform pot paths manually via group mask alternative: use mask
        inner=(f'<mask id="m{name}"><rect width="240" height="240" fill="#fff"/><g transform="translate({tx:.2f} {ty:.2f}) scale({s})">{icon_group("#000",None)}</g></mask>'
               f'<circle cx="120" cy="120" r="{R}" fill="{disc}" mask="url(#m{name})"/>')
    return inner,(0,0,240,240)

DESC1='ÇAY DÜKKÂNI & ATÖLYESİ'
DESC2='KADIKÖY · 2024'
def L_ana(sc,slogan=False):
    """stacked: icon over wordmark over descriptor"""
    wg,wb=wordmark_group(sc['main'],sc['accent'])
    s=0.155                    # wordmark scale
    ww=wb[2]*s
    isc=1.32
    iw=IB[2]*isc; ih=IB[3]*isc
    W=max(ww,iw)
    icon=icon_group(sc['main'],sc['icon_accent'])
    gap1=22
    ix=(W-iw)/2-IB[0]*isc; iy=-IB[1]*isc
    wy=ih+gap1+760*s        # baseline
    wx=(W-ww)/2-wb[0]*s
    d,dw=text_path(SANSB,DESC1,15.5,tracking=260)
    dx=(W-dw)/2+ 0
    dy=wy+10+ 34
    d2,dw2=text_path(SANS,DESC2,12.5,tracking=300)
    if slogan:
        SER='/usr/share/fonts/noto/NotoSerifDisplay-MediumItalic.ttf'
        _,sw=text_path(SER,'Çay acele sevmez.',34,tracking=0)
        dd,_=text_path(SER,'Çay acele sevmez.',34,tracking=0,x0=(W-sw)/2,y0=wy+62)
        tail=f'<path fill="{sc["main"]}" d="{dd}"/>'; H=wy+72
    else:
        _,dw=text_path(SANSB,DESC1,15.5,tracking=260)
        dd,_=text_path(SANSB,DESC1,15.5,tracking=260,x0=(W-dw)/2,y0=wy+44)
        tail=f'<path fill="{sc["main"]}" d="{dd}"/>'; H=wy+46
    inner=(f'<g transform="translate({ix:.2f} {iy:.2f}) scale({isc})">{icon}</g>'
           f'<g transform="translate({wx:.2f} {wy:.2f}) scale({s})">{wg}</g>'+tail)
    return inner,(0,0,W,H)
def L_yatay(sc):
    wg,wb=wordmark_group(sc['main'],sc['accent'])
    isc=1.12
    icon=icon_group(sc['main'],sc['icon_accent'])
    iw=IB[2]*isc; ih=IB[3]*isc
    s=0.19
    base=ih-IB[1]*0 -0   # icon local base ~ 210 -> maps to ih+? handled via translate
    ix=-IB[0]*isc; iy=-IB[1]*isc
    gap=36
    wx=iw+gap-wb[0]*s
    wy=ih*0.70   # baseline
    d,dw=text_path(SANSB,DESC1,17,tracking=270,x0=iw+gap+4,y0=ih*0.70+50)
    ww=wb[2]*s
    inner=(f'<g transform="translate({ix:.2f} {iy:.2f}) scale({isc})">{icon}</g>'
           f'<g transform="translate({wx:.2f} {wy:.2f}) scale({s})">{wg}</g>'
           f'<path fill="{sc["main"]}" d="{d}"/>')
    return inner,(0,0,iw+gap+max(ww,dw),ih)

BUILD={'ana':L_ana,'yatay':L_yatay,'ikon':L_ikon,'kelime':L_kelime}

def L_bardak(sc,name):
    P=parts()
    if name=='renkli': disc,gc,dot=PAL['kirmizi'],PAL['krem'],PAL['krem']
    elif name=='ters': disc,gc,dot=PAL['krem'],PAL['koyu'],PAL['kirmizi']
    else: disc=sc['main']; gc=None
    # glass path spans x 101..139, y 151..205 ; scale up
    s_=2.5; tx=120-120*s_; ty=140-178*s_
    if gc:
        inner=(f'<circle cx="120" cy="120" r="120" fill="{disc}"/>'
               f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s_})"><path d="{P["glass"]}" fill="{gc}"/></g>'
               f'<circle cx="120" cy="46" r="14" fill="{dot}"/>')
    else:
        inner=(f'<mask id="mb{name}"><rect width="240" height="240" fill="#fff"/><g transform="translate({tx:.2f} {ty:.2f}) scale({s_})"><path d="{P["glass"]}" fill="#000"/></g><circle cx="120" cy="46" r="14" fill="#000"/></mask>'
               f'<circle cx="120" cy="120" r="120" fill="{disc}" mask="url(#mb{name})"/>')
    return inner,(0,0,240,240)
