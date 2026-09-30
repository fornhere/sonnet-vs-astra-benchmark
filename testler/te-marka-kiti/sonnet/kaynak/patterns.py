from g_core import *
from mark import parts
GL=parts()['glass']
def _glass(x,y,s,fill,rot=0):
    # glass path centred at (120,178) in source coords
    return f'<path transform="translate({x:.1f} {y:.1f}) rotate({rot}) scale({s}) translate(-120 -178)" d="{GL}" fill="{fill}"/>'
def pat_glasses(w,h,bg,c1,c2,dot,s=.55,gx=46,gy=58,idn=None):
    i=idn or uid('pg')
    o=''
    rows=int(h/gy)+3; cols=int(w/gx)+3
    for r in range(-1,rows):
        for c in range(-1,cols):
            x=c*gx+(gx/2 if r%2 else 0); y=r*gy
            col=c1 if (r+c)%2==0 else c2
            o+=_glass(x,y,s,col,rot=0 if (r%2==0) else 180)
            o+=f'<circle cx="{x+gx/2:.1f}" cy="{y+gy/2:.1f}" r="{3.2*s/.55:.1f}" fill="{dot}"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice"><defs><clipPath id="{i}"><rect width="{w}" height="{h}"/></clipPath></defs><rect width="{w}" height="{h}" fill="{bg}"/><g clip-path="url(#{i})">{o}</g></svg>'
def pat_rings(w,h,bg,c1,c2,idn=None):
    i=idn or uid('pr')
    o=''
    cents=[(w*.22,h*.3,3),(w*.7,h*.22,4),(w*.5,h*.78,5),(w*.92,h*.72,3),(w*.05,h*.9,3)]
    for (cx,cy,n) in cents:
        for k in range(n):
            o+=f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{18+k*15}" fill="none" stroke="{c1 if k%2==0 else c2}" stroke-width="{2.4 if k%2==0 else 1.4}"/>'
        o+=f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="5" fill="{c2}"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice"><defs><clipPath id="{i}"><rect width="{w}" height="{h}"/></clipPath></defs><rect width="{w}" height="{h}" fill="{bg}"/><g clip-path="url(#{i})">{o}</g></svg>'
def pat_steam(w,h,bg,c1,c2,idn=None,gx=34):
    i=idn or uid('ps')
    o=''
    n=int(w/gx)+2
    for c in range(-1,n):
        x=c*gx+(gx/2)
        for r in range(-1,int(h/120)+2):
            y=r*120+(40 if c%2 else 0)
            col=c1 if c%2==0 else c2
            o+=f'<path d="M{x:.1f} {y+90} C {x+9:.1f} {y+72}, {x-9:.1f} {y+54}, {x:.1f} {y+36} C {x+9:.1f} {y+18}, {x-9:.1f} {y}, {x:.1f} {y-18}" fill="none" stroke="{col}" stroke-width="2.6" stroke-linecap="round"/><circle cx="{x:.1f}" cy="{y-32}" r="3.6" fill="{col}"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice"><defs><clipPath id="{i}"><rect width="{w}" height="{h}"/></clipPath></defs><rect width="{w}" height="{h}" fill="{bg}"/><g clip-path="url(#{i})">{o}</g></svg>'
def pat_waves(w,h,bg,c1,c2,idn=None,gy=17):
    i=idn or uid('pw')
    o=''
    for r in range(-1,int(h/gy)+2):
        y=r*gy+10
        d=f'M-20 {y}'
        for j in range(int(w/16)+4):
            d+=' q8 -7 16 0' if j%2==0 else ' q8 7 16 0'
        col=c1 if r%3 else c2
        o+=f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{2 if r%3 else 3}" stroke-linecap="round"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice"><defs><clipPath id="{i}"><rect width="{w}" height="{h}"/></clipPath></defs><rect width="{w}" height="{h}" fill="{bg}"/><g clip-path="url(#{i})">{o}</g></svg>'
def pat_pots(w,h,bg,c1,c2,idn=None,s=.34,gx=70,gy=66):
    """çift katlı çaydanlık ikon deseni"""
    from assets import icon_group
    i=idn or uid('pp')
    o=''
    for r in range(-1,int(h/gy)+2):
        for c in range(-1,int(w/gx)+2):
            x=c*gx+(gx/2 if r%2 else 0); y=r*gy
            flip=(r+c)%2
            sc=cs(c1 if not flip else c2,None,None)
            g=icon_group(c1 if not flip else c2,None)
            o+=f'<g transform="translate({x:.1f} {y:.1f}) scale({s}) translate(-120 -120)">{g}</g>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice"><defs><clipPath id="{i}"><rect width="{w}" height="{h}"/></clipPath></defs><rect width="{w}" height="{h}" fill="{bg}"/><g clip-path="url(#{i})">{o}</g></svg>'
