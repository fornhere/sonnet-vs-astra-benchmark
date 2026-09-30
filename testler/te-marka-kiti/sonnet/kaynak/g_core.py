from assets import *
import fonts, html
C=PAL
SCH_NAMES=['renkli','ters','siyah','beyaz','kahve','krem']
LOGOS=('ana','ana-slogan','yatay','ikon','kelime','rozet','bardak')
def build_logo(nm,sch):
    sc=scheme(sch)
    if nm=='ana': return L_ana(sc)
    if nm=='ana-slogan': return L_ana(sc,slogan=True)
    if nm=='rozet': return L_rozet(sc,sch)
    if nm=='bardak': return L_bardak(sc,sch)
    return BUILD[nm](sc)
BB={}
def sym_defs():
    out=['<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>']
    for nm in LOGOS:
        for sch in SCH_NAMES:
            inner,bb=build_logo(nm,sch); BB[(nm,sch)]=bb
            x,y,w,h=bb
            out.append(f'<symbol id="{nm}-{sch}" viewBox="{x:.1f} {y:.1f} {w:.1f} {h:.1f}">{inner}</symbol>')
    out.append('</defs></svg>')
    return '\n'.join(out)
sym_defs_cache=None
def logo(nm,sch,w=None,h=None,style='',cls=''):
    bb=BB.get((nm,sch)) or build_logo(nm,sch)[1]
    bw,bh=bb[2],bb[3]
    if w and not h: h=w*bh/bw
    if h and not w: w=h*bw/bh
    return f'<svg class="lg {cls}" viewBox="0 0 {bw:.1f} {bh:.1f}" style="width:{w:.1f}px;height:{h:.1f}px;{style}"><use href="#{nm}-{sch}"/></svg>'
def place(nm,sc_or_name,x,y,w=None,h=None,rot=0,extra=''):
    """inline logo group for svg mockups (custom scheme dict or scheme name). returns svg <g>, (w,h)"""
    if isinstance(sc_or_name,str):
        inner,bb=build_logo(nm,sc_or_name)
    else:
        sc=sc_or_name
        if nm=='ana': inner,bb=L_ana(sc)
        elif nm=='ana-slogan': inner,bb=L_ana(sc,slogan=True)
        elif nm=='rozet': inner,bb=L_rozet(sc,sc.get('name','x'))
        elif nm=='bardak': inner,bb=L_bardak(sc,sc.get('name','x'))
        else: inner,bb=BUILD[nm](sc)
    bx,by,bw,bh=bb
    if w: s=w/bw
    else: s=h/bh
    tr=f'translate({x:.2f} {y:.2f})'+(f' rotate({rot})' if rot else '')+f' scale({s:.4f}) translate({-bx:.2f} {-by:.2f})'
    return f'<g transform="{tr}" {extra}>{inner}</g>',(bw*s,bh*s)
def cs(main,accent=None,icon_accent=None,name='x'):
    return dict(main=main,accent=accent or main,icon_accent=icon_accent,hole=icon_accent is None,name=name)

_uid=[0]
def uid(p='u'):
    _uid[0]+=1; return f'{p}{_uid[0]}'

def rgb(h):
    h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def cmyk(h):
    r,g,b=[v/255 for v in rgb(h)]
    k=1-max(r,g,b)
    if k>=1: return (0,0,0,100)
    c=(1-r-k)/(1-k); m=(1-g-k)/(1-k); y=(1-b-k)/(1-k)
    return tuple(round(v*100) for v in (c,m,y,k))
def lum(h):
    r,g,b=[v/255 for v in rgb(h)]
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return .2126*f(r)+.7152*f(g)+.0722*f(b)
def contrast(a,b):
    la,lb=lum(a),lum(b)
    if la<lb: la,lb=lb,la
    return (la+.05)/(lb+.05)
def mix(a,b,t):
    ra,rb=rgb(a),rgb(b)
    return '#%02X%02X%02X'%tuple(round(ra[i]+(rb[i]-ra[i])*t) for i in range(3))

STEAM="M0 0 C 9 -10 -9 -20 0 -30 C 9 -40 -9 -50 0 -60"
CSS='''
:root{--kirmizi:#BC3C17;--koyu:#2B1810;--krem:#F6EBDA;--beyaz:#FFFAF1;--amber:#EBA23C;--yesil:#2F5D4B;--mur:#5A2440;--bergamot:#D7B02B;--coral:#F08A5D;--sis:#CFE0D2;--buhar:#E4D3BB;--kahve:#6B4A36;--pembe:#F3C9B0;
--serif:'Noto Serif Display',Georgia,serif;--sans:'Noto Sans','Helvetica Neue',Arial,sans-serif;}
*{box-sizing:border-box;margin:0;padding:0}
html{background:#1b110c}
body{font-family:var(--sans);color:var(--koyu);-webkit-print-color-adjust:exact;print-color-adjust:exact;font-feature-settings:"kern","liga";text-rendering:geometricPrecision}
@page{size:1123px 794px;margin:0}
.page{width:1123px;height:794px;position:relative;overflow:hidden;background:var(--krem);break-after:page;page-break-after:always;isolation:isolate}
.page.dark{background:var(--koyu);color:var(--krem)}
.page.red{background:var(--kirmizi);color:var(--krem)}
.page.white{background:var(--beyaz)}
.stage{transform-origin:top left}
@media screen{body{padding:28px 0}.wrap{margin:0 auto}.page{margin:0 auto 28px;box-shadow:0 10px 40px rgba(0,0,0,.45)}}
@media print{html{background:none}body{padding:0}.wrap{width:auto!important;height:auto!important}.stage{transform:none!important}.page{margin:0;box-shadow:none}}
.lg{display:block}
.rh,.rf{position:absolute;left:64px;right:64px;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;display:flex;justify-content:space-between;opacity:.62;z-index:5}
.rh{top:34px}.rf{bottom:30px}
.rh b{color:var(--kirmizi)} .dark .rh b{color:var(--amber)} .red .rh b{color:var(--krem)}
.eyebrow{font-size:11px;letter-spacing:.24em;text-transform:uppercase;font-weight:700;color:var(--kirmizi)}
.dark .eyebrow{color:var(--amber)} .red .eyebrow{color:var(--krem)}
.h-xl{font-family:var(--serif);font-weight:900;font-style:italic;font-size:112px;line-height:.92;letter-spacing:-.025em}
.h-l{font-family:var(--serif);font-weight:900;font-style:italic;font-size:64px;line-height:.98;letter-spacing:-.02em}
.h-m{font-family:var(--serif);font-weight:700;font-style:italic;font-size:38px;line-height:1.05;letter-spacing:-.01em}
.h-s{font-family:var(--serif);font-weight:500;font-size:22px;line-height:1.15}
.body{font-size:13.2px;line-height:1.62;font-weight:400}
.body p+p{margin-top:.8em}
.small{font-size:10.6px;line-height:1.5;font-weight:400;opacity:.85}
.lab{font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}
.abs{position:absolute}
.hr{height:1px;background:currentColor;opacity:.25}
.tag{display:inline-block;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;padding:4px 9px;border:1px solid currentColor;border-radius:99px}
.card{background:var(--beyaz);border-radius:6px}
.dark .card{background:#3a2419}
table{border-collapse:collapse}
.fill>svg{width:100%!important;height:100%!important;display:block}
.mono{font-variant-numeric:tabular-nums;letter-spacing:.02em}
'''
def page(n,total,section,body,cls='',title='Marka Kılavuzu',rh=True):
    head=f'<header class="rh"><span>Demlik · {title}</span><span><b>{html.escape(section)}</b></span></header><footer class="rf"><span>Çay acele sevmez.</span><span>{n:02d} / {total:02d}</span></footer>' if rh else ''
    return f'<section class="page {cls}" id="s{n:02d}">{head}{body}</section>\n'
