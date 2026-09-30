from g_core import *
from patterns import *
from scenes import *
from mark import parts
import random,math

def storefront(W=1123,H=670,dy=62):
    PH=H-dy
    r=random.Random(7)
    gid=uid('sf')
    o=[]
    o.append(f'''<defs>
<linearGradient id="{gid}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1628"/><stop offset=".5" stop-color="#4D2040"/><stop offset=".85" stop-color="#C5586A"/><stop offset="1" stop-color="#F08A5D"/></linearGradient>
<radialGradient id="{gid}glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD48A" stop-opacity=".95"/><stop offset=".5" stop-color="#F5A94C" stop-opacity=".35"/><stop offset="1" stop-color="#F5A94C" stop-opacity="0"/></radialGradient>
<linearGradient id="{gid}win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE3A8"/><stop offset="1" stop-color="#E9962F"/></linearGradient>
<linearGradient id="{gid}wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EBD9BC"/><stop offset="1" stop-color="#D9C19C"/></linearGradient>
<linearGradient id="{gid}side" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A2B36"/><stop offset="1" stop-color="#2B1F2A"/></linearGradient>
<linearGradient id="{gid}pave" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5B4740"/><stop offset="1" stop-color="#2E211E"/></linearGradient>
<linearGradient id="{gid}refl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD48A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD48A" stop-opacity="0"/></linearGradient>
<clipPath id="{gid}wclip"><rect x="318" y="398" width="290" height="106"/></clipPath>
<clipPath id="{gid}dclip"><rect x="648" y="396" width="84" height="118"/></clipPath>
</defs>''')
    o.append(f'<rect width="{W}" height="{H}" fill="url(#{gid}sky)"/>')
    # stars
    for k in range(40):
        x=r.uniform(0,W); y=r.uniform(0,220)
        o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r.uniform(.6,1.4):.1f}" fill="#F6EBDA" opacity="{r.uniform(.25,.7):.2f}"/>')
    o.append('<circle cx="960" cy="90" r="26" fill="#F3C9B0" opacity=".9"/><circle cx="972" cy="84" r="24" fill="#2A1B33"/>')
    o.append(f'<g transform="translate(0 {dy})">')
    # neighbours
    def neighbour(x,w,top,col='#3A2B36'):
        s=f'<rect x="{x}" y="{top}" width="{w}" height="{520-top}" fill="url(#{gid}side)"/>'
        s+=f'<rect x="{x}" y="{top}" width="{w}" height="10" fill="#4A3646"/>'
        for row in range(int((520-top-60)/62)):
            for c in range(int(w/64)):
                lit=r.random()<.55
                wx=x+16+c*64; wy=top+34+row*62
                s+=f'<rect x="{wx}" y="{wy}" width="30" height="40" fill="{"#F5B35C" if lit else "#241A2A"}" opacity="{.9 if lit else 1}"/>'
        return s
    o.append(neighbour(0,250,190)); o.append(neighbour(880,243,160))
    # main building
    o.append(f'<rect x="250" y="112" width="630" height="410" fill="url(#{gid}wall)"/>')
    # plaster texture
    for k in range(60):
        x=r.uniform(255,875); y=r.uniform(125,395)
        o.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{r.uniform(10,30):.0f}" height="1.2" fill="#000" opacity=".05"/>')
    # cornice
    o.append('<rect x="238" y="92" width="654" height="26" fill="#6B4A36"/><rect x="238" y="92" width="654" height="5" fill="#fff" opacity=".2"/><rect x="246" y="118" width="638" height="8" fill="#000" opacity=".22"/>')
    # upper windows w/ shutters
    for wx in (310,505,700):
        o.append(f'<rect x="{wx-6}" y="148" width="98" height="118" fill="#2B1810"/><rect x="{wx}" y="154" width="86" height="106" fill="url(#{gid}win)"/>')
        o.append(f'<rect x="{wx+41}" y="154" width="4" height="106" fill="#2B1810"/><rect x="{wx}" y="200" width="86" height="4" fill="#2B1810"/>')
        # curtain + plant
        o.append(f'<path d="M{wx} 154 Q{wx+16} 190 {wx+6} 260 L{wx} 260Z" fill="#F6EBDA" opacity=".55"/>')
        o.append(f'<rect x="{wx-30}" y="152" width="24" height="112" fill="#2F5D4B"/><rect x="{wx+92}" y="152" width="24" height="112" fill="#2F5D4B"/>')
        for k in range(6):
            o.append(f'<rect x="{wx-30}" y="{160+k*17}" width="24" height="2" fill="#000" opacity=".22"/><rect x="{wx+92}" y="{160+k*17}" width="24" height="2" fill="#000" opacity=".22"/>')
        o.append(f'<rect x="{wx-8}" y="266" width="102" height="8" fill="#6B4A36"/>')
    # fascia sign
    o.append('<rect x="270" y="278" width="590" height="92" rx="4" fill="#2B1810"/><rect x="270" y="278" width="590" height="92" rx="4" fill="none" stroke="#EBA23C" stroke-width="1.5" opacity=".7"/><rect x="276" y="284" width="578" height="80" rx="2" fill="none" stroke="#F6EBDA" stroke-width=".8" opacity=".35"/>')
    lg,(lw,lh)=place('yatay','ters',565-165,324-37,w=330)
    o.append(lg)
    # lamps
    for lx in (310,565,820):
        o.append(f'<path d="M{lx} 278 v-8 q0 -14 14 -14 h8" fill="none" stroke="#1a0f0a" stroke-width="3"/><path d="M{lx+20} 254 l16 0 l-4 10 l-8 0z" fill="#1a0f0a"/>')
        o.append(f'<ellipse cx="{lx+28}" cy="292" rx="70" ry="42" fill="url(#{gid}glow)" opacity=".55"/>')
    # awning
    aw='<g>'
    x0,x1=286,844; n=14; sw=(x1-x0)/n
    for k in range(n):
        col=C['kirmizi'] if k%2==0 else C['krem']
        xa=x0+k*sw
        aw+=f'<path d="M{xa:.1f} 370 h{sw:.1f} v32 q-{sw/2:.1f} 12 -{sw:.1f} 0z" fill="{col}"/>'
    aw+=f'<rect x="{x0}" y="370" width="{x1-x0}" height="8" fill="#000" opacity=".18"/><rect x="{x0}" y="404" width="{x1-x0}" height="26" fill="#000" opacity=".22" filter="url(#{gid}b)"/>'
    aw+='</g>'
    o.append(f'<defs><filter id="{gid}b"><feGaussianBlur stdDeviation="6"/></filter></defs>')
    o.append(aw)
    # shop window
    o.append(f'<rect x="308" y="408" width="310" height="112" fill="#2B1810"/><rect x="318" y="416" width="290" height="96" fill="url(#{gid}win)"/>')
    win=f'<g clip-path="url(#{gid}wclip)">'
    win=f'<g>'
    # shelves
    for sy in (444,478):
        win+=f'<rect x="318" y="{sy}" width="290" height="4" fill="#6B4A36"/>'
    # tins on shelves
    tcols=[(C['yesil'],C['sis']),(C['mur'],C['coral']),(C['bergamot'],C['bergtint']),(C['kirmizi'],C['krem']),(C['koyu'],C['amber'])]
    for k in range(9):
        c,_=tcols[k%5]; tx=328+k*20; 
        win+=f'<rect x="{tx}" y="422" width="15" height="22" rx="2" fill="{c}"/><rect x="{tx+3}" y="427" width="9" height="8" rx="4" fill="#F6EBDA" opacity=".8"/>'
    # glasses row
    for k in range(8):
        win+=f'<path transform="translate({506+k*13} 468) scale(.26) translate(-120 -178)" d="{parts()["glass"]}" fill="#fff" fill-opacity=".9"/>'
    for k in range(7):
        c,_=tcols[(k+2)%5]; tx=328+k*24
        win+=f'<rect x="{tx}" y="452" width="18" height="26" rx="2" fill="{c}"/><rect x="{tx+3}" y="458" width="12" height="10" rx="5" fill="#F6EBDA" opacity=".8"/>'
    # demlik set on lower shelf
    win+='</g>'
    o.append(win)
    # pendant lamps
    for px in (378,468,558):
        o.append(f'<path d="M{px} 416 v10" stroke="#2B1810" stroke-width="1.5"/><path d="M{px-9} 438 a9 9 0 0 1 18 0z" fill="#2B1810" transform="translate(0 -12)"/>')
        o.append(f'<circle cx="{px}" cy="430" r="26" fill="url(#{gid}glow)"/>')
    # vinyl text on glass
    o.append('<text x="331" y="502" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="15" fill="#F6EBDA" style="paint-order:stroke" stroke="#7A3B14" stroke-width=".6" stroke-opacity=".5">Çay acele sevmez.</text>')
    o.append('<text x="470" y="503" font-family="Noto Sans" font-weight="700" letter-spacing="1.2" font-size="6.6" fill="#F6EBDA" opacity=".95">ÇAY · ATÖLYE · DEMLİK SETLERİ</text>')
    # glass reflection diagonal
    o.append('<path d="M330 416 L370 416 L322 512 L318 512 L318 480Z" fill="#fff" opacity=".12"/><path d="M420 416 L432 416 L384 512 L372 512Z" fill="#fff" opacity=".07"/>')
    # door
    o.append(f'<rect x="638" y="404" width="104" height="120" fill="#2B1810"/><rect x="648" y="412" width="84" height="106" fill="url(#{gid}win)"/><rect x="648" y="412" width="84" height="106" fill="none" stroke="#2B1810" stroke-width="3"/>')
    o.append('<rect x="686" y="412" width="3" height="106" fill="#2B1810"/><rect x="648" y="456" width="84" height="3" fill="#2B1810"/><rect x="674" y="468" width="3" height="30" rx="1.5" fill="#EBA23C"/>')
    o.append(f'<circle cx="690" cy="436" r="12" fill="{C["kirmizi"]}"/><text x="690" y="440" text-anchor="middle" font-family="Noto Sans" font-weight="700" font-size="7" letter-spacing=".6" fill="#F6EBDA">AÇIK</text>')
    o.append('<path d="M648 412 L672 412 L648 470Z" fill="#fff" opacity=".12"/>')
    # step + base
    o.append('<rect x="250" y="520" width="630" height="12" fill="#6B4A36"/><rect x="250" y="520" width="630" height="3" fill="#fff" opacity=".2"/>')
    # house number plate + hours plaque
    o.append(f'<rect x="768" y="430" width="44" height="44" rx="4" fill="{C["kirmizi"]}"/><text x="790" y="461" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="26" fill="#F6EBDA">42</text>')
    o.append('<rect x="764" y="482" width="52" height="26" rx="2" fill="#2B1810"/><text x="790" y="493" text-anchor="middle" font-family="Noto Sans" font-weight="700" font-size="5" letter-spacing=".5" fill="#EBA23C">09.00 – 21.00</text><text x="790" y="502" text-anchor="middle" font-family="Noto Sans" font-weight="500" font-size="4.6" fill="#F6EBDA">Cumartesi atölye 11.00</text>')
    # pavement
    o.append(f'<rect x="0" y="528" width="{W}" height="{PH-528}" fill="url(#{gid}pave)"/><rect x="0" y="528" width="{W}" height="4" fill="#fff" opacity=".12"/>')
    for k in range(9):
        o.append(f'<path d="M{k*140-40} {PH} L{k*140+30} 532" stroke="#000" stroke-opacity=".28" stroke-width="1.4"/>')
    o.append(f'<path d="M318 526 L608 526 L680 {PH} L230 {PH}Z" fill="url(#{gid}refl)" opacity=".55"/>')
    o.append(f'<path d="M648 526 L742 526 L790 {PH} L610 {PH}Z" fill="url(#{gid}refl)" opacity=".4"/>')
    # blade sign
    bx,by=214,338
    o.append(f'<path d="M250 302 H182" stroke="#1a0f0a" stroke-width="4"/><path d="M250 302 q-3 -18 -18 -18" fill="none" stroke="#1a0f0a" stroke-width="3"/><path d="M250 330 L188 302" stroke="#1a0f0a" stroke-width="2.5"/><circle cx="182" cy="302" r="4" fill="#1a0f0a"/>')
    o.append(f'<path d="M192 302 L172 336 M212 302 L232 336" stroke="#1a0f0a" stroke-width="1.6"/>')
    rz,(rw,rh)=place('rozet','renkli',bx-52+8,336,w=104)
    o.append(f'<circle cx="{bx+8}" cy="{336+52+6}" r="56" fill="#000" opacity=".35" filter="url(#{gid}b)"/>'+rz)
    o.append(f'<circle cx="{bx+8}" cy="388" r="52" fill="none" stroke="#2B1810" stroke-width="5"/>')
    # a-frame chalkboard
    cx0=846; cy0=430
    o.append(f'<path d="M{cx0} {cy0} L{cx0-6} 566 M{cx0+72} {cy0} L{cx0+80} 566" stroke="#2B1810" stroke-width="5"/><rect x="{cx0-4}" y="{cy0-6}" width="82" height="118" rx="3" fill="#6B4A36"/><rect x="{cx0+1}" y="{cy0-1}" width="72" height="108" fill="#22322B"/>')
    o.append(f'<text x="{cx0+37}" y="{cy0+30}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="21" fill="#F6EBDA">Demini</text><text x="{cx0+37}" y="{cy0+52}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="21" fill="#EBA23C">Al.</text>')
    o.append(f'<path transform="translate({cx0+37} {cy0+92}) scale(.34) translate(-120 -178)" d="{parts()["glass"]}" fill="none" stroke="#F6EBDA" stroke-width="2.4"/><text x="{cx0+37}" y="{cy0+72}" text-anchor="middle" font-family="Noto Sans" font-weight="500" font-size="5.6" fill="#F6EBDA" opacity=".85">Kadıköy Akşamı geldi.</text>')
    # plant pot
    o.append('<path d="M262 560 L296 560 L292 586 L266 586Z" fill="#B0475A"/>')
    for k in range(9):
        a=-70+k*17
        o.append(f'<path d="M279 560 q{math.sin(math.radians(a))*26:.0f} -{34+abs(a)*.1:.0f} {math.sin(math.radians(a))*40:.0f} -{46-abs(a)*.15:.0f}" fill="none" stroke="#2F5D4B" stroke-width="4" stroke-linecap="round"/>')
    o.append('</g>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{"".join(o)}</svg>'
