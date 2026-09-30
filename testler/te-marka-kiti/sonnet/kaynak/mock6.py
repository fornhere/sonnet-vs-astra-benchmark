from mock5 import *
def tote(x,y,w=250,h=300):
    cl=uid('tt')
    o=f'<path d="M{x+w*.28} {y+18} C{x+w*.28} {y-70} {x+w*.72} {y-70} {x+w*.72} {y+18}" fill="none" stroke="#DCC7A2" stroke-width="12" stroke-linecap="round"/>'
    o+=f'<path d="M{x+w*.28} {y+18} C{x+w*.28} {y-70} {x+w*.72} {y-70} {x+w*.72} {y+18}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/>'
    o+=sh(x,y,w,h,3,.3,10)+f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#E9D8B8"/>'
    # fabric weave
    for k in range(int(h/4)): o+=f'<rect x="{x}" y="{y+k*4}" width="{w}" height="1" fill="#000" opacity=".035"/>'
    o+=f'<clipPath id="{cl}"><rect x="{x}" y="{y}" width="{w}" height="{h}"/></clipPath><g clip-path="url(#{cl})">'
    o+=place('ana','kahve',x+w/2-70,y+64,w=140)[0]
    o+=txt(x+w/2,y+h-40,13,C['kirmizi'],'Demini al, şehri unut.','serif',700,True,'middle')
    o+=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#tshade)"/></g>'
    o+='<defs><linearGradient id="tshade" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".12"/><stop offset=".2" stop-color="#fff" stop-opacity=".1"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient></defs>'
    return o
def sticker_path_circle(cx,cy,r): return f'<circle cx="{cx}" cy="{cy}" r="{r}"'
def stickers(x,y):
    o=f'{sh(x,y,449,292,6,.28,8)}<rect x="{x}" y="{y}" width="449" height="292" rx="6" fill="#D0AA76"/>'
    # rozet white border
    def stk(inner,extra=''):
        return f'<g filter="url(#b4)"><g opacity=".22" transform="translate(2 3)">{extra}</g></g>'
    def rz(cx,cy,r,nm='renkli'):
        return f'<circle cx="{cx+2}" cy="{cy+3}" r="{r+7}" fill="#000" opacity=".2" filter="url(#b4)"/><circle cx="{cx}" cy="{cy}" r="{r+7}" fill="#FFFDF7"/>'+place('rozet',nm,cx-r,cy-r,w=2*r)[0]
    o+=rz(x+92,y+96,64)+rz(x+232,y+66,38,'ters')
    o+=f'<circle cx="{x+348}" cy="{y+68}" r="45" fill="#000" opacity=".2" filter="url(#b4)"/><circle cx="{x+346}" cy="{y+66}" r="45" fill="#FFFDF7"/>'+place('bardak','renkli',x+346-38,y+66-38,w=76)[0]
    # pill
    def pill(px,py,w,h,bg,fg,t,fs):
        return f'<rect x="{px+2}" y="{py+3}" width="{w}" height="{h}" rx="{h/2}" fill="#000" opacity=".2" filter="url(#b4)"/><rect x="{px-6}" y="{py-6}" width="{w+12}" height="{h+12}" rx="{h/2+6}" fill="#FFFDF7"/><rect x="{px}" y="{py}" width="{w}" height="{h}" rx="{h/2}" fill="{bg}"/>'+txt(px+w/2,py+h/2+fs*.34,fs,fg,t,'serif',900,True,'middle')
    o+=pill(x+176,y+134,140,42,C['koyu'],C['krem'],'Demini Al.',25)
    o+=pill(x+24,y+206,190,40,C['kirmizi'],C['krem'],'Çay acele sevmez.',20)
    # kelime sticker
    o+=f'<rect x="{x+236}" y="{y+204}" width="188" height="60" rx="10" fill="#FFFDF7"/>'+place('kelime','renkli',x+258,y+222,w=144)[0]
    o+=f'<rect x="{x+338}" y="{y+134}" width="88" height="46" rx="8" fill="#FFFDF7"/>'+place('ikon','renkli',x+361,y+140,w=42)[0]
    return o
def teatag(x,y):
    o=''
    # sachet
    bx,by,bw,bh=x+20,y+112,100,122
    o+=f'<g transform="rotate(-6 {bx+bw/2} {by+bh})"><rect x="{bx+6}" y="{by+12}" width="{bw}" height="{bh}" fill="#000" opacity=".28" filter="url(#b8)"/><rect x="{bx}" y="{by}" width="{bw}" height="{bh}" fill="#F4EBD8"/><rect x="{bx}" y="{by}" width="{bw}" height="16" fill="#000" opacity=".08"/><path d="M{bx} {by+16} H{bx+bw}" stroke="#000" stroke-opacity=".18"/>'
    for k in range(9): o+=f'<path d="M{bx+6+k*11} {by+3} l3 5 l3 -5" fill="none" stroke="#000" stroke-opacity=".2"/>'
    o+=place('ikon','kahve',bx+bw/2-19,by+26,w=38)[0]+txt(bx+bw/2,by+bh-32,14,C['koyu'],'demlik','serif',900,True,'middle')+txt(bx+bw/2,by+bh-20,5.6,C['kirmizi'],'POŞET ÇAY','sans',700,False,'middle',1.2)+txt(bx+bw/2,by+bh-10,5.2,C['koyu'],'Kadıköy Akşamı','sans',500,False,'middle')
    o+=f'<rect x="{bx+bw/2-9}" y="{by+8}" width="18" height="8" fill="#B9B9B9" opacity=".9"/></g>'
    # string
    o+=f'<path d="M{x+68} {y+118} C{x+70} {y+56} {x+150} {y+88} {x+176} {y+60}" fill="none" stroke="#F6EBDA" stroke-width="1.8"/>'
    # tag
    tx,ty=x+150,y+52
    o+=f'<g transform="rotate(9 {tx+40} {ty+56})"><rect x="{tx+4}" y="{ty+8}" width="84" height="120" rx="5" fill="#000" opacity=".3" filter="url(#b8)"/><rect x="{tx}" y="{ty}" width="84" height="120" rx="5" fill="{C["krem"]}"/><circle cx="{tx+42}" cy="{ty+10}" r="3.6" fill="{C["mur"]}"/>'
    o+=f'<clipPath id="{uid("tg")}"></clipPath>'
    o+=emb(scene_aksam(200,200),tx+8,ty+22,68,56)
    o+=txt(tx+42,ty+96,13,C['mur'],'Kadıköy','serif',900,True,'middle')+txt(tx+42,ty+110,13,C['mur'],'Akşamı','serif',900,True,'middle')
    o+='</g>'
    # extra tag
    o+=f'<g transform="rotate(-14 {x+320} {y+140})"><rect x="{x+286}" y="{y+90}" width="70" height="98" rx="5" fill="#000" opacity=".3" filter="url(#b8)" transform="translate(3 7)"/><rect x="{x+286}" y="{y+90}" width="70" height="98" rx="5" fill="{C["yesil"]}"/><circle cx="{x+321}" cy="{y+99}" r="3.2" fill="{C["sis"]}"/>{emb(scene_karadeniz(200,200),x+293,y+108,56,46)}{txt(x+321,y+170,10.4,C["krem"],"Karadeniz","serif",900,True,"middle")}{txt(x+321,y+181,10.4,C["krem"],"Sabahı","serif",900,True,"middle")}</g>'
    return o
def ticket(x,y,w=400,h=170):
    i=uid('tk'); r=random.Random(3)
    cells=''.join(f'<rect x="{x+w-104+ (k%9)*8}" y="{y+22+(k//9)*8}" width="7" height="7" fill="{C["koyu"]}"/>' for k in range(81) if r.random()<.5 or (k%9 in (0,8) and (k//9) in (0,8)))
    return f'''{sh(x,y,w,h,8,.32,10)}<clipPath id="{i}"><path d="M{x+8} {y} H{x+w-8} a8 8 0 0 0 0 0 L{x+w} {y+8} V{y+h-8} L{x+w-8} {y+h} H{x+8} L{x} {y+h-8} V{y+8}Z"/></clipPath>
<g><path d="M{x} {y} H{x+w} V{y+h/2-9} a9 9 0 0 0 0 18 V{y+h} H{x} V{y+h/2+9} a9 9 0 0 0 0 -18Z" fill="#FFFAF1"/>
<path d="M{x+w-124} {y} H{x+w} V{y+h/2-9} a9 9 0 0 0 0 18 V{y+h} H{x+w-124}Z" fill="{C['krem']}"/>
<path d="M{x+w-124} {y+6} V{y+h-6}" stroke="{C['kahve']}" stroke-width="1.2" stroke-dasharray="3 4"/>
<rect x="{x}" y="{y}" width="10" height="{h}" fill="{C['kirmizi']}"/>
{txt(x+30,y+34,7.4,C['kirmizi'],'CUMARTESİ DEMLEME ATÖLYESİ','sans',700,False,ls=1.6)}
{txt(x+30,y+78,26,C['koyu'],'Bir bardak sabır.','serif',900,True,extra='letter-spacing="-.5"')}
{txt(x+30,y+100,9.4,C['koyu'],'Harman tanıma, demleme, üç bardak tadım.','sans',400,False)}
<rect x="{x+30}" y="{y+118}" width="{w-190}" height="1" fill="{C['kahve']}" opacity=".4"/>
{txt(x+30,y+138,7,C['kahve'],'TARİH','sans',700,False,ls=1)}{txt(x+30,y+152,10.4,C['koyu'],'17 Ekim · 11.00','sans',700,False)}
{txt(x+150,y+138,7,C['kahve'],'YER','sans',700,False,ls=1)}{txt(x+150,y+152,10.4,C['koyu'],'Moda Cd. No: 42','sans',700,False)}
{cells}
{txt(x+w-64,y+h-16,6,C['kahve'],'No. 0042','sans',700,False,'middle',1)}
{place('bardak','renkli',x+w-104,y+96,w=26)[0]}
</g>'''
def extras_scene():
    o=[DEFS]
    o.append('<rect width="1123" height="794" fill="#E9D8BC"/>')
    # 4 panels
    panels=[(64,116,500,320,'#EBDCC2'),(580,116,479,320,'#3B2A20'),(64,452,500,300,'#5A2440'),(580,452,479,300,'#F0E0BF')]
    for px,py,pw,ph,c in panels: o.append(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="8" fill="{c}"/>')
    o.append(tote(64+120,116+58,260,250))
    o.append(stickers(580,116+15) if False else '')
    o.append(stickers(596,130))
    o.append(teatag(64+60,452+14))
    o.append(ticket(580+40,452+62,400,170))
    return f'<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">{"".join(o)}</svg>'
