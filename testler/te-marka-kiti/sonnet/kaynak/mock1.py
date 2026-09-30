from g_core import *
from patterns import *
from scenes import *
from mark import parts
GLASS=parts()['glass']

def shade_grad(i,strength=1.0):
    return f'''<linearGradient id="{i}" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity="{.30*strength}"/><stop offset=".10" stop-color="#000" stop-opacity="{.06*strength}"/><stop offset=".30" stop-color="#fff" stop-opacity="{.20*strength}"/><stop offset=".52" stop-color="#fff" stop-opacity="{.03*strength}"/><stop offset=".85" stop-color="#000" stop-opacity="{.10*strength}"/><stop offset="1" stop-color="#000" stop-opacity="{.34*strength}"/></linearGradient>'''

def cup(cx,by,s,body,kind,label=''):
    """paper cup. cx centre x, by bottom y. returns svg"""
    i=uid('cp'); g=uid('cg'); cl=uid('cc')
    W=150;H=200
    path="M0 0 H150 L135 190 Q133 200 123 200 H27 Q17 200 15 190 Z"
    lidc={'red':'#F6EBDA','dark':'#F6EBDA','cream':'#2B1810'}[kind]
    # logo
    if kind=='red': lg,_=place('ana','beyaz',75-46,58,w=92)
    elif kind=='dark': lg,_=place('ana','ters',75-46,58,w=92)
    else:
        lg,_=place('kelime','renkli',75-44,92,w=88)
    sleeve=''
    if kind=='cream':
        # wave pattern band
        wave=pat_waves(170,52,C['krem'],C['kirmizi'],C['kirmizi'],idn=uid('wv'),gy=13)
        sleeve=f'<g clip-path="url(#{cl})"><foreignObject x="-10" y="150" width="170" height="40"></foreignObject></g>'
    extra=''
    if kind=='cream':
        # decorative band: red strip + glass row
        extra=f'''<g clip-path="url(#{cl})"><rect x="0" y="132" width="150" height="44" fill="{C['kirmizi']}"/>'''
        for k in range(8):
            extra+=f'<path transform="translate({10+k*19:.1f} 154) rotate({0 if k%2==0 else 180}) scale(.3) translate(-120 -178)" d="{GLASS}" fill="{C["krem"]}"/>'
        extra+='</g>'
    lidcol=lidc
    return f'''<g transform="translate({cx-75*s:.1f} {by-H*s:.1f}) scale({s})">
<defs>{shade_grad(g)}<clipPath id="{cl}"><path d="{path}"/></clipPath></defs>
<ellipse cx="75" cy="202" rx="86" ry="10" fill="#000" opacity=".22" filter="url(#blur6)"/>
<path d="{path}" fill="{body}"/>
{extra}
<g clip-path="url(#{cl})">{lg}</g>
<path d="{path}" fill="url(#{g})"/>
<!-- lid -->
<path d="M12 -16 C12 -44 138 -44 138 -16 Z" fill="{lidcol}"/><path d="M12 -16 C12 -44 138 -44 138 -16 Z" fill="url(#{g})"/>
<rect x="-7" y="-19" width="164" height="19" rx="7" fill="{lidcol}"/><rect x="-7" y="-19" width="164" height="19" rx="7" fill="url(#{g})"/>
<rect x="88" y="-36" width="26" height="5" rx="2.5" fill="#000" opacity=".25"/>
</g>'''

def tea_glass(cx,by,s):
    """tulip tea glass on saucer; source glass coords 101..139 x 151..205, centre 120,178"""
    i=uid('tg'); cl=uid('tc')
    gw=38*s; gh=54*s
    # place glass so its bottom sits on saucer top
    gx=cx; gy=by-16-gh/2      # centre y
    saucer=f'''<ellipse cx="{cx}" cy="{by+4}" rx="{gw*1.55:.1f}" ry="{gw*.30:.1f}" fill="#000" opacity=".22" filter="url(#blur8)"/>
<ellipse cx="{cx}" cy="{by-2}" rx="{gw*1.5:.1f}" ry="{gw*.30:.1f}" fill="{C['beyaz']}"/>
<ellipse cx="{cx}" cy="{by-5}" rx="{gw*1.5:.1f}" ry="{gw*.28:.1f}" fill="#fff"/>
<ellipse cx="{cx}" cy="{by-6}" rx="{gw*1.1:.1f}" ry="{gw*.19:.1f}" fill="#F0E4CE"/>
<ellipse cx="{cx}" cy="{by-2}" rx="{gw*1.5:.1f}" ry="{gw*.30:.1f}" fill="none" stroke="{C['kirmizi']}" stroke-width="{1.6*s/2.6:.1f}"/>
<ellipse cx="{cx}" cy="{by-2}" rx="{gw*1.38:.1f}" ry="{gw*.26:.1f}" fill="none" stroke="{C['amber']}" stroke-width="{1*s/2.6:.1f}"/>'''
    tr=f'translate({gx-0:.1f} {gy:.1f}) scale({s}) translate(-120 -178)'
    tea_top=151+8
    ic,_=place('ikon','krem',0,0,w=15)
    glass=f'''<g transform="{tr}"><defs><clipPath id="{cl}"><path d="{GLASS}"/></clipPath>
<linearGradient id="{i}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#E58A2A"/><stop offset=".55" stop-color="#B8481A"/><stop offset="1" stop-color="#7C2A0E"/></linearGradient>
<linearGradient id="{i}h" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".22" stop-color="#fff" stop-opacity=".50"/><stop offset=".34" stop-color="#fff" stop-opacity=".0"/><stop offset=".8" stop-color="#fff" stop-opacity=".0"/><stop offset=".9" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<path d="{GLASS}" fill="#fff" fill-opacity=".28"/>
<g clip-path="url(#{cl})"><rect x="95" y="{tea_top}" width="50" height="60" fill="url(#{i})"/><rect x="95" y="{tea_top}" width="50" height="2.2" fill="#F7C27A" opacity=".8"/>
<rect x="95" y="151" width="50" height="60" fill="url(#{i}h)"/></g>
<path d="{GLASS}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width=".9"/>
<rect x="101" y="151" width="38" height="2.4" fill="{C['amber']}"/>
<g transform="translate(120 188) scale(.105) translate(-118.25 -118.25)">{icon_glass(C['krem'])}</g>
</g>'''
    steam=''
    for k,dx in enumerate((-10,4,16)):
        steam+=f'<path transform="translate({cx+dx*s/2.6:.1f} {gy-gh/2-8:.1f}) scale({s/3.2:.2f})" d="{STEAM}" fill="none" stroke="#fff" stroke-opacity="{.55-k*.1:.2f}" stroke-width="2.4" stroke-linecap="round" transform-origin="0 0"/>'.replace('transform="translate','transform="translate',1)
    return saucer+glass+steam

def icon_glass(col):
    from assets import icon_group
    return icon_group(col,None)

def tin(cx,by,w,h,color,text_col,scene,name,sub,kind,arch_col):
    i=uid('tn'); g=uid('tg'); cl=uid('tcl')
    x=cx-w/2; y=by-h
    lid_h=h*.11
    ar_w=w*.66; ar_x=cx-ar_w/2; ar_y=y+h*.20; ar_h=h*.42
    r=ar_w/2
    arch=f'M{ar_x:.1f} {ar_y+ar_h:.1f} V{ar_y+r:.1f} A{r:.1f} {r:.1f} 0 0 1 {ar_x+ar_w:.1f} {ar_y+r:.1f} V{ar_y+ar_h:.1f} Z'
    sc=scene(200,200).replace('width="200" height="200"','preserveAspectRatio="xMidYMid slice" x="%.1f" y="%.1f" width="%.1f" height="%.1f"'%(ar_x,ar_y,ar_w,ar_h),1)
    ic,_=place('ikon',cs(text_col,None,None),cx-w*.075,y+lid_h+8,w=w*.15)
    return f'''<g><defs>{shade_grad(g,.9)}<clipPath id="{cl}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{w*.05}"/></clipPath><clipPath id="{i}"><path d="{arch}"/></clipPath></defs>
<ellipse cx="{cx}" cy="{by+3}" rx="{w*.62:.1f}" ry="{w*.075:.1f}" fill="#000" opacity=".28" filter="url(#blur6)"/>
<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{w*.05}" fill="{color}"/>
<g clip-path="url(#{cl})">
<rect x="{x}" y="{y}" width="{w}" height="{lid_h}" fill="#000" opacity=".16"/><rect x="{x}" y="{y+lid_h}" width="{w}" height="2" fill="#fff" opacity=".25"/>
<g clip-path="url(#{i})">{sc}</g>
<path d="{arch}" fill="none" stroke="{text_col}" stroke-width="1.6"/>
<text x="{cx}" y="{ar_y+ar_h+h*.105:.1f}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="{w*.145:.1f}" fill="{text_col}">{name[0]}</text>
<text x="{cx}" y="{ar_y+ar_h+h*.105+w*.145*1.05:.1f}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="{w*.145:.1f}" fill="{text_col}">{name[1]}</text>
<text x="{cx}" y="{by-h*.07:.1f}" text-anchor="middle" font-family="Noto Sans" font-weight="700" letter-spacing="1.6" font-size="{w*.052:.1f}" fill="{text_col}">{sub}</text>
<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#{g})"/></g>
</g>'''

def pouch(cx,by,w,h,label_name,scene,body='#C99B66'):
    i=uid('po'); g=uid('pg'); cl=uid('pc')
    x=cx-w/2; y=by-h
    # body with slight bulge
    path=f"M{x} {y+10} Q{cx} {y-4} {x+w} {y+10} L{x+w+6} {by-14} Q{x+w+6} {by} {x+w-14} {by} L{x+14} {by} Q{x-6} {by} {x-6} {by-14} Z"
    lw=w*.78; lh=h*.56; lx=cx-lw/2; ly=y+h*.24
    sc=scene(200,200).replace('width="200" height="200"','preserveAspectRatio="xMidYMid slice" x="%.1f" y="%.1f" width="%.1f" height="%.1f"'%(lx+lw*.1,ly+lh*.07,lw*.8,lh*.42),1)
    zig=''.join(f'<path d="M{x+k*(w/16):.1f} {y+8} l{w/32:.1f} 6 l{w/32:.1f} -6" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="1.2"/>' for k in range(16))
    return f'''<g><defs>{shade_grad(g,.8)}<clipPath id="{cl}"><path d="{path}"/></clipPath></defs>
<ellipse cx="{cx}" cy="{by+3}" rx="{w*.62:.1f}" ry="{w*.07:.1f}" fill="#000" opacity=".28" filter="url(#blur6)"/>
<path d="{path}" fill="{body}"/><g clip-path="url(#{cl})">
<rect x="{x-8}" y="{y-4}" width="{w+22}" height="26" fill="#000" opacity=".08"/>{zig}
<rect x="{x-8}" y="{y+22}" width="{w+22}" height="1.6" fill="#000" opacity=".18"/>
<rect x="{lx}" y="{ly}" width="{lw}" height="{lh}" rx="10" fill="{C['krem']}"/>
{sc}
<text x="{cx}" y="{ly+lh*.66:.1f}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="{w*.11:.1f}" fill="{C['koyu']}">{label_name[0]}</text>
<text x="{cx}" y="{ly+lh*.66+w*.112:.1f}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="{w*.11:.1f}" fill="{C['koyu']}">{label_name[1]}</text>
<text x="{cx}" y="{ly+lh-9:.1f}" text-anchor="middle" font-family="Noto Sans" font-weight="700" letter-spacing="1.2" font-size="{w*.04:.1f}" fill="{C['kirmizi']}">DÖKME ÇAY · 250 G</text>
{place('rozet','kahve',cx-w*.11,by-h*.205,w=w*.22)[0]}
<rect x="{x-8}" y="{y}" width="{w+22}" height="{h}" fill="url(#{g})"/></g></g>'''
