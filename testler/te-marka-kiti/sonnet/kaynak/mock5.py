from mock4 import *
def browser(x,y,w=640,h=474):
    cl=uid('br')
    o=f'<clipPath id="{cl}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10"/></clipPath>{sh(x,y,w,h,10,.4,14)}<g clip-path="url(#{cl})"><rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#F6EBDA"/>'
    o+=f'<rect x="{x}" y="{y}" width="{w}" height="34" fill="#E4D3BB"/>'
    for k,c in enumerate(('#BC3C17','#EBA23C','#2F5D4B')): o+=f'<circle cx="{x+16+k*16}" cy="{y+17}" r="4.6" fill="{c}"/>'
    o+=f'<rect x="{x+86}" y="{y+6}" width="150" height="28" rx="7" fill="#F6EBDA"/>'+place('bardak','renkli',x+96,y+13,w=14)[0]+txt(x+118,y+24,8.4,C['koyu'],'Demlik — Çay acele sevmez','sans',500,False)
    o+=f'<rect x="{x+250}" y="{y+8}" width="300" height="20" rx="10" fill="#FFFAF1"/>'+txt(x+266,y+21.5,8.4,C['kahve'],'demlik.com.tr','sans',500,False)
    ty=y+34
    # nav
    o+=place('yatay','renkli',x+26,ty+14,w=112)[0]
    for k,l in enumerate(('Harmanlar','Setler','Atölye','Dükkân')): o+=txt(x+300+k*66,ty+36,9.6,C['koyu'],l,'sans',500,False)
    o+=f'<rect x="{x+w-88}" y="{ty+20}" width="62" height="24" rx="12" fill="{C["kirmizi"]}"/>'+txt(x+w-57,ty+36,8.8,C['krem'],'Sepet (0)','sans',700,False,'middle')
    # hero
    hy=ty+72
    o+=txt(x+34,hy+22,8.4,C['kirmizi'],'YENİ HARMAN · EKİM','sans',700,False,ls=2)
    o+=txt(x+32,hy+84,66,C['koyu'],'Demini','serif',900,True,extra='letter-spacing="-2"')
    o+=txt(x+32,hy+142,66,C['kirmizi'],'Al.','serif',900,True,extra='letter-spacing="-2"')
    o+=txt(x+34,hy+172,10.6,C['koyu'],'Kadıköy Akşamı: mürdüm bir akşamın','sans',400,False)+txt(x+34,hy+187,10.6,C['koyu'],'tadında, baharatlı ve uzun kalan sonbahar harmanı.','sans',400,False)
    o+=f'<rect x="{x+34}" y="{hy+204}" width="150" height="34" rx="17" fill="{C["kirmizi"]}"/>'+txt(x+109,hy+225,10.4,C['krem'],'Harmanı dene →','sans',700,False,'middle')
    o+=txt(x+200,hy+225,10,C['koyu'],'Atölyeye yazıl','sans',700,False)+f'<rect x="{x+200}" y="{hy+229}" width="70" height="1.4" fill="{C["koyu"]}"/>'
    # arch image
    ax,ay,aw,ah=x+w-268,hy-8,220,248
    r=aw/2; ac=uid('ar')
    o+=f'<clipPath id="{ac}"><path d="M{ax} {ay+ah} V{ay+r} A{r} {r} 0 0 1 {ax+aw} {ay+r} V{ay+ah}Z"/></clipPath><g clip-path="url(#{ac})">{emb(scene_aksam(200,200),ax,ay,aw,ah)}</g>'
    o+=f'<path d="M{ax-8} {ay+ah} V{ay+r} A{r+8} {r+8} 0 0 1 {ax+aw+8} {ay+r} V{ay+ah}" fill="none" stroke="{C["amber"]}" stroke-width="1.4"/>'
    # products strip
    py=hy+262
    o+=f'<rect x="{x}" y="{py-10}" width="{w}" height="120" fill="#FFFAF1"/>'
    for k,(n,fn,pr) in enumerate((('Karadeniz Sabahı',scene_karadeniz,'₺165'),('Kadıköy Akşamı',scene_aksam,'₺185'),('Adaçaylı Bergamot',scene_bergamot,'₺170'))):
        px=x+30+k*200
        o+=f'<g><clipPath id="{uid("pi")}"></clipPath></g>'
        cid=uid('pc')
        o+=f'<clipPath id="{cid}"><rect x="{px}" y="{py+4}" width="58" height="58" rx="5"/></clipPath><g clip-path="url(#{cid})">{emb(fn(200,200),px,py+4,58,58)}</g>'
        o+=txt(px+70,py+28,12.4,C['koyu'],n,'serif',700,True)+txt(px+70,py+44,8,C['kahve'],'100 g teneke','sans',400,False)+txt(px+70,py+60,11,C['kirmizi'],pr,'serif',500,False)
    o+='</g>'
    return o
def phone(x,y,w=250,h=540):
    cl=uid('ph')
    o=sh(x,y,w,h,34,.45,16)+f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="34" fill="#1a0f0a"/><clipPath id="{cl}"><rect x="{x+8}" y="{y+8}" width="{w-16}" height="{h-16}" rx="27"/></clipPath><g clip-path="url(#{cl})"><rect x="{x+8}" y="{y+8}" width="{w-16}" height="{h-16}" fill="#FFFAF1"/>'
    X=x+8; Y=y+8; W=w-16
    o+=f'<rect x="{x+w/2-34}" y="{y+14}" width="68" height="18" rx="9" fill="#1a0f0a"/>'+txt(X+18,Y+22,8,C['koyu'],'9:41','sans',700,False)
    o+=txt(X+W/2,Y+54,10.4,C['koyu'],'demlik.kadikoy','sans',700,False,'middle')
    # profile
    o+=place('rozet','renkli',X+16,Y+70,w=64)[0]
    for k,(n,l) in enumerate((('128','gönderi'),('4,2 B','takipçi'),('310','takip'))):
        o+=txt(X+112+k*42,Y+94,11,C['koyu'],n,'sans',700,False,'middle')+txt(X+112+k*42,Y+106,7,C['kahve'],l,'sans',400,False,'middle')
    o+=txt(X+16,Y+142,9,C['koyu'],'Demlik · Çay dükkânı & atölyesi','sans',700,False)
    for k,l in enumerate(('Kadıköy\'de üçüncü nesil çay dükkânı.','Çay acele sevmez. Cumartesi atölye!','Moda Cd. No: 42 · demlik.com.tr')):
        o+=txt(X+16,Y+156+k*11.5,7.8,C['koyu'],l,'sans',400,False)
    o+=f'<rect x="{X+16}" y="{Y+196}" width="{(W-40)*.6}" height="24" rx="6" fill="{C["kirmizi"]}"/>'+txt(X+16+(W-40)*.3,Y+212,9,C['krem'],'Takip et','sans',700,False,'middle')
    o+=f'<rect x="{X+16+(W-40)*.6+8}" y="{Y+196}" width="{(W-40)*.4}" height="24" rx="6" fill="#E4D3BB"/>'+txt(X+16+(W-40)*.6+8+(W-40)*.2,Y+212,9,C['koyu'],'Mesaj','sans',700,False,'middle')
    # highlights
    hl=[('Harmanlar',C['yesil']),('Atölye',C['kirmizi']),('Setler',C['koyu']),('Dükkân',C['amber'])]
    for k,(n,c) in enumerate(hl):
        cx=X+38+k*54
        o+=f'<circle cx="{cx}" cy="{Y+250}" r="21" fill="none" stroke="{C["kirmizi"]}" stroke-width="1.4"/><circle cx="{cx}" cy="{Y+250}" r="17" fill="{c}"/>'
        if k==0: o+=glass_at(cx,Y+250,.4,C['krem'])
        elif k==1: o+=place('bardak','renkli',cx-11,Y+239,w=22)[0]
        elif k==2: o+=place('ikon','krem',cx-10,Y+241,w=20)[0]
        else: o+=f'<path d="M{cx-9} {Y+256} v-10 l9 -6 l9 6 v10z" fill="{C["koyu"]}"/>'
        o+=txt(cx,Y+282,6.6,C['koyu'],n,'sans',500,False,'middle')
    # grid
    gy=Y+296; gs=(W-4)/3
    tiles=[]
    def tile(k,inner):
        cx=X+(k%3)*(gs+2); cy=gy+(k//3)*(gs+2)
        cid=uid('gt')
        return f'<clipPath id="{cid}"><rect x="{cx}" y="{cy}" width="{gs}" height="{gs}"/></clipPath><g clip-path="url(#{cid})">{inner(cx,cy,gs)}</g>'
    o+=tile(0,lambda cx,cy,s: emb(scene_karadeniz(200,200),cx,cy,s,s))
    o+=tile(1,lambda cx,cy,s: f'<rect x="{cx}" y="{cy}" width="{s}" height="{s}" fill="{C["kirmizi"]}"/>'+txt(cx+8,cy+34,17,C['krem'],'Çay acele','serif',900,True)+txt(cx+8,cy+52,17,C['krem'],'sevmez.','serif',900,True))
    o+=tile(2,lambda cx,cy,s: emb(scene_aksam(200,200),cx,cy,s,s))
    o+=tile(3,lambda cx,cy,s: pat_glasses(int(s),int(s),C['krem'],C['koyu'],C['kirmizi'],C['amber'],s=.34,gx=26,gy=34,idn=uid('pgx')).replace('<svg ',f'<svg x="{cx}" y="{cy}" ',1))
    o+=tile(4,lambda cx,cy,s: f'<rect x="{cx}" y="{cy}" width="{s}" height="{s}" fill="#2B1810"/>'+txt(cx+8,cy+32,16,C['krem'],'Demini','serif',900,True)+txt(cx+8,cy+50,16,C['amber'],'Al.','serif',900,True)+txt(cx+8,cy+s-9,5.4,C['krem'],'ATÖLYE %20','sans',700,False,ls=.8))
    o+=tile(5,lambda cx,cy,s: emb(scene_bergamot(200,200),cx,cy,s,s))
    o+=f'<rect x="{X}" y="{Y+h-16-44}" width="{W}" height="44" fill="#FFFAF1"/><rect x="{X}" y="{Y+h-16-44}" width="{W}" height="1" fill="#000" opacity=".1"/>'
    for k in range(4): o+=f'<circle cx="{X+30+k*63}" cy="{Y+h-16-22}" r="5" fill="none" stroke="{C["koyu"]}" stroke-width="1.4"/>'
    o+=f'<rect x="{x+w/2-40}" y="{y+h-20}" width="80" height="4" rx="2" fill="#000" opacity=".85"/>'
    o+='</g>'
    return o
def digital_scene():
    o=[DEFS]
    o.append('<rect width="1123" height="794" fill="#E9D8BC"/>')
    o.append('<rect x="0" y="0" width="1123" height="794" fill="url(#dg)"/><defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1E3CB"/><stop offset="1" stop-color="#DDC8A6"/></linearGradient></defs>')
    o.append(browser(64,112))
    o.append(phone(776,96))
    # favicon/avatars row
    fx=64; fy=612
    for k,(nm,sch,w) in enumerate((('rozet','renkli',64),('rozet','ters',64),('bardak','renkli',64),('bardak','ters',64),('rozet','kahve',64))):
        o.append(place(nm,sch,fx+k*88,fy,w=w)[0])
    o.append(place('bardak','renkli',fx+5*88+10,fy+24,w=32)[0]+place('bardak','renkli',fx+5*88+56,fy+34,w=16)[0])
    return f'<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">{"".join(o)}</svg>'
