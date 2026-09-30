from mock3 import *
def _sunset_bg(x,y,w,h,gid,horizon=.62):
    return f'''<defs><linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3D1730"/><stop offset=".38" stop-color="#5A2440"/><stop offset=".62" stop-color="#C5586A"/><stop offset="{horizon}" stop-color="#F08A5D"/><stop offset="1" stop-color="#EBA23C"/></linearGradient></defs><rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#{gid})"/>'''
def waves(x,y,w,h,c1,c2,gy=13,seed=0):
    o=''
    n=int(h/gy)+1
    for r in range(n):
        yy=y+r*gy
        d=f'M{x-10} {yy}'
        for j in range(int(w/14)+3):
            d+=' q7 -5 14 0' if j%2==0 else ' q7 5 14 0'
        o+=f'<path d="{d}" fill="none" stroke="{c1 if r%3 else c2}" stroke-width="{1.5 if r%3 else 2.2}" stroke-linecap="round" opacity="{max(.25,1-r*.05):.2f}"/>'
    return o
def vapur(x,y,s,col='#2B1810',lights='#EBA23C'):
    return f'''<g transform="translate({x} {y}) scale({s})" fill="{col}"><path d="M0 8 L70 8 L64 17 L8 17 Z"/><rect x="10" y="-1" width="46" height="9"/><rect x="18" y="-8" width="26" height="8"/><rect x="26" y="-22" width="7" height="14"/><rect x="24" y="-25" width="11" height="4"/><rect x="47" y="-11" width="5" height="11"/><g fill="{lights}"><rect x="14" y="2" width="4" height="3"/><rect x="22" y="2" width="4" height="3"/><rect x="30" y="2" width="4" height="3"/><rect x="38" y="2" width="4" height="3"/></g></g>'''
def poster(x,y,w=340,h=500):
    g=uid('ps'); cl=uid('pc')
    cx=x+w/2; cy=y+h*.62
    o=f'<clipPath id="{cl}"><rect x="{x}" y="{y}" width="{w}" height="{h}"/></clipPath>{sh(x,y,w,h,2,.4,12)}<g clip-path="url(#{cl})">'
    o+=_sunset_bg(x,y,w,h,g,.62)
    for k,r in enumerate((150,122,96)):
        o+=f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{["#F3C9B0","#F5B98F","#F7C79A"][k]}" opacity="{[.16,.3,1][k]}"/>'
    # sea
    o+=f'<rect x="{x}" y="{cy}" width="{w}" height="{h*.38+2}" fill="#5A2440"/>'
    # sun reflection strokes
    for k in range(7):
        ww=110-k*11
        o+=f'<rect x="{cx-ww/2}" y="{cy+8+k*14}" width="{ww}" height="3" rx="1.5" fill="#F7C79A" opacity="{.85-k*.1:.2f}"/>'
    o+=waves(x,cy+4,w,h*.38,'#B0475A','#F08A5D',14)
    o+=vapur(cx-70,cy-19,2.0)
    o+=f'<path d="M{x+250} {y+262} q6 -8 12 0 q6 -8 12 0" fill="none" stroke="#F6EBDA" stroke-width="2" stroke-linecap="round"/>'
    o+=txt(x+26,y+112,80,C['krem'],'Demini','serif',900,True,extra='letter-spacing="-2.5"')
    o+=txt(x+26,y+184,80,C['amber'],'Al.','serif',900,True,extra='letter-spacing="-2.5"')
    o+=txt(x+28,y+216,8.6,C['krem'],'KADIKÖY AKŞAMI · YENİ SONBAHAR HARMANI','sans',700,False,ls=1.3)
    # badge
    bx,by=x+w-72,y+h-118
    o+=f'<g transform="rotate(-9 {bx} {by})"><circle cx="{bx}" cy="{by}" r="48" fill="{C["kirmizi"]}"/><circle cx="{bx}" cy="{by}" r="43" fill="none" stroke="#F6EBDA" stroke-width="1" stroke-dasharray="2 3"/>'
    o+=txt(bx,by-16,7.4,C['krem'],'İLK HAFTA','sans',700,False,'middle',1.4)+txt(bx,by+14,32,C['krem'],'%20','serif',900,True,'middle')+txt(bx,by+27,7,C['krem'],'ATÖLYE İNDİRİMİ','sans',700,False,'middle',1)+'</g>'
    lg,_=place('yatay','krem',x+24,y+h-42,w=104)
    o+=lg+txt(x+w-24,y+h-20,6.4,C['krem'],'Moda Cd. No: 42 Kadıköy · demlik.com.tr','sans',500,False,'end')+'</g>'
    return o
def square(x,y,s=300):
    cl=uid('sq')
    o=f'<clipPath id="{cl}"><rect x="{x}" y="{y}" width="{s}" height="{s}"/></clipPath>{sh(x,y,s,s,2,.4,10)}<g clip-path="url(#{cl})"><rect x="{x}" y="{y}" width="{s}" height="{s}" fill="#2B1810"/>'
    for cx,cy,n in ((x+s*.85,y+s*.15,7),(x+s*.05,y+s*.95,6)):
        for k in range(n):
            o+=f'<circle cx="{cx}" cy="{cy}" r="{28+k*22}" fill="none" stroke="{C["amber"] if k%3==0 else C["krem"]}" stroke-opacity="{.5 if k%3==0 else .13}" stroke-width="{1.6 if k%3==0 else 1}"/>'
    o+=txt(x+26,y+100,46,C['krem'],'Çay acele','serif',900,True,extra='letter-spacing="-1"')
    o+=txt(x+26,y+148,46,C['krem'],'sevmez.','serif',900,True,extra='letter-spacing="-1"')
    o+=txt(x+28,y+186,11,C['amber'],'Ama Ekim\'de Kadıköy Akşamı geldi.','sans',500,False)
    o+=place('rozet','renkli',x+26,y+s-64,w=38)[0]+txt(x+74,y+s-40,9,C['krem'],'@demlik.kadikoy','sans',700,False,ls=.6)+'</g>'
    return o
def story(x,y,w=281,h=500):
    cl=uid('st')
    o=f'<clipPath id="{cl}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16"/></clipPath>{sh(x,y,w,h,16,.4,12)}<g clip-path="url(#{cl})"><rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{C["kirmizi"]}"/>'
    o+=emb(scene_aksam(200,200),x,y,w,w*1.22)
    o+=f'<rect x="{x}" y="{y}" width="{w}" height="70" fill="#000" opacity=".0"/>'
    o+=place('rozet','renkli',x+14,y+14,w=30)[0]+txt(x+52,y+33,9.5,C['krem'],'demlik.kadikoy','sans',700,False)+txt(x+52,y+45,7.4,C['krem'],'Sponsorlu · 2 dk','sans',400,False,extra='opacity=".8"')
    o+=f'<rect x="{x+14}" y="{y+8}" width="{w-28}" height="2.4" rx="1.2" fill="#F6EBDA" opacity=".35"/><rect x="{x+14}" y="{y+8}" width="{(w-28)*.4}" height="2.4" rx="1.2" fill="#F6EBDA"/>'
    ty=y+w*1.22
    o+=txt(x+22,ty+52,40,C['krem'],'Demini Al.','serif',900,True,extra='letter-spacing="-1.2"')
    o+=txt(x+24,ty+76,9.8,C['krem'],'Cumartesi demleme atölyesi','sans',700,False,ls=.5)
    o+=txt(x+24,ty+91,9.8,C['krem'],'ilk hafta %20 indirimli.','sans',400,False)
    o+=f'<rect x="{x+22}" y="{y+h-56}" width="{w-44}" height="34" rx="17" fill="{C["krem"]}"/>'+txt(x+w/2,y+h-34,10.5,C['kirmizi'],'Yerini ayır  →','sans',700,False,'middle',.4)+'</g>'
    return o
def banner(x,y,w=300,h=120):
    cl=uid('bn')
    o=f'<clipPath id="{cl}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4"/></clipPath>{sh(x,y,w,h,4,.35,8)}<g clip-path="url(#{cl})"><rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{C["mur"]}"/>'
    o+=waves(x,y+h*.55,w,h*.5,C['coral'],C['amber'],11)
    o+=f'<circle cx="{x+w-70}" cy="{y+h*.62}" r="44" fill="#F7C79A"/><rect x="{x}" y="{y+h*.62}" width="{w}" height="{h}" fill="{C["mur"]}"/>'+waves(x,y+h*.64,w,h*.5,C['coral'],C['amber'],11)
    o+=vapur(x+w-104,y+h*.62-15,.9,'#2B1810')
    o+=txt(x+18,y+48,30,C['krem'],'Demini Al.','serif',900,True,extra='letter-spacing="-1"')
    o+=txt(x+19,y+66,6.6,C['krem'],'KADIKÖY AKŞAMI · YENİ HARMAN','sans',700,False,ls=1)
    o+=f'<rect x="{x+19}" y="{y+82}" width="104" height="22" rx="11" fill="{C["kirmizi"]}"/>'+txt(x+71,y+96.5,8.6,C['krem'],'Şimdi dene →','sans',700,False,'middle',.4)+'</g>'
    return o
def campaign_scene():
    o=[DEFS]
    o.append('<rect width="1123" height="794" fill="#241812"/>')
    for k in range(0,1123,40): o.append(f'<rect x="{k}" y="0" width="1" height="794" fill="#fff" opacity=".025"/>')
    o.append(poster(64,116))
    o.append(square(428,116))
    o.append(banner(428,442,300,120))
    o.append(story(752,116))
    return f'<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">{"".join(o)}</svg>'
