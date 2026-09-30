from g_core import *
import math,random
def scene_karadeniz(w=200,h=200,idn=None):
    i=idn or uid('kd')
    # terraces: stacked arcs on foreground hill
    ter=''
    for k in range(9):
        y=132+k*8.5
        ter+=f'<path d="M-10 {y+10} Q100 {y-14+k*1.5} 210 {y+8}" fill="none" stroke="#3E7461" stroke-width="2.2"/>'
    return f'''<svg viewBox="0 0 200 200" width="{w}" height="{h}" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="{i}c"><rect width="200" height="200"/></clipPath>
<linearGradient id="{i}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9F0E2"/><stop offset="1" stop-color="#CFE0D2"/></linearGradient></defs>
<g clip-path="url(#{i}c)"><rect width="200" height="200" fill="url(#{i}g)"/>
<circle cx="138" cy="66" r="24" fill="#EBA23C"/>
<path d="M0 112 C30 86 56 96 84 84 C112 72 140 88 200 70 L200 200 L0 200Z" fill="#A9C4B0"/>
<rect x="0" y="98" width="200" height="14" fill="#F6EBDA" opacity=".55"/>
<path d="M0 132 C36 104 70 116 104 104 C140 92 170 110 200 98 L200 200 L0 200Z" fill="#6E9A83"/>
<rect x="0" y="124" width="200" height="10" fill="#F6EBDA" opacity=".45"/>
<path d="M0 158 C40 128 90 136 130 124 C160 116 184 128 200 122 L200 200 L0 200Z" fill="#2F5D4B"/>
<g clip-path="url(#{i}k)"></g>
<path d="M0 158 C40 128 90 136 130 124 C160 116 184 128 200 122 L200 200 L0 200Z" fill="none"/>
<clipPath id="{i}k"><path d="M0 158 C40 128 90 136 130 124 C160 116 184 128 200 122 L200 200 L0 200Z"/></clipPath>
<g clip-path="url(#{i}k)">{ter}</g>
<g fill="#F6EBDA"><path d="M40 60 q12 -8 24 0 q-12 6 -24 0z" opacity=".8"/><path d="M78 44 q10 -6 20 0 q-10 5 -20 0z" opacity=".7"/></g>
</g></svg>'''
def scene_aksam(w=200,h=200,idn=None):
    i=idn or uid('ak')
    waves=''
    for k in range(6):
        y=140+k*10
        d=f'M-10 {y}'
        for j in range(0,20):
            d+=f' q7 -{3+k*.4} 14 0'
        waves+=f'<path d="{d}" fill="none" stroke="{"#F3C9B0" if k<2 else "#7A3A55"}" stroke-width="1.6" opacity="{.9-k*.1:.2f}"/>'
    return f'''<svg viewBox="0 0 200 200" width="{w}" height="{h}" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="{i}c"><rect width="200" height="200"/></clipPath>
<linearGradient id="{i}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A2440"/><stop offset=".55" stop-color="#B0475A"/><stop offset="1" stop-color="#F08A5D"/></linearGradient>
<linearGradient id="{i}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9805A"/><stop offset="1" stop-color="#5A2440"/></linearGradient></defs>
<g clip-path="url(#{i}c)"><rect width="200" height="200" fill="url(#{i}s)"/>
<circle cx="100" cy="128" r="40" fill="#F7C79A"/><circle cx="100" cy="128" r="40" fill="none" stroke="#F3C9B0" stroke-width="1" opacity=".5"/>
<circle cx="100" cy="128" r="54" fill="none" stroke="#F3C9B0" stroke-width=".8" opacity=".3"/>
<!-- skyline -->
<g fill="#4A1D35"><path d="M0 136 L0 122 L14 122 L14 116 L20 108 L26 116 L26 122 L40 122 L40 128 L56 128 L56 118 L60 96 L64 118 L64 128 L86 128 L86 136Z"/>
<path d="M120 136 L120 126 L136 126 L140 116 Q150 104 160 116 L164 126 L182 126 L182 120 L186 90 L190 120 L190 126 L200 126 L200 136Z"/></g>
<rect x="0" y="136" width="200" height="64" fill="url(#{i}w)"/>
{waves}
<!-- vapur -->
<g transform="translate(58 126)" fill="#2B1810"><path d="M0 8 L70 8 L64 17 L8 17 Z"/><rect x="10" y="-1" width="46" height="9"/><rect x="18" y="-8" width="26" height="8"/><rect x="26" y="-22" width="7" height="14"/><rect x="24" y="-25" width="11" height="4"/><rect x="47" y="-11" width="5" height="11"/>
<g fill="#EBA23C"><rect x="14" y="2" width="4" height="3"/><rect x="22" y="2" width="4" height="3"/><rect x="30" y="2" width="4" height="3"/><rect x="38" y="2" width="4" height="3"/></g></g>
<path d="M29 96 q4 -5 8 0 q4 -5 8 0" fill="none" stroke="#F6EBDA" stroke-width="1.5" stroke-linecap="round"/>
<path d="M150 66 q3 -4 6 0 q3 -4 6 0" fill="none" stroke="#F6EBDA" stroke-width="1.4" stroke-linecap="round"/>
</g></svg>'''
def scene_bergamot(w=200,h=200,idn=None):
    i=idn or uid('bg')
    def leaf(x,y,rot,l=40,wd=13,c='#8DA085'):
        return f'<g transform="translate({x} {y}) rotate({rot})"><path d="M0 0 C{wd} -{l*.3} {wd} -{l*.7} 0 -{l} C-{wd} -{l*.7} -{wd} -{l*.3} 0 0Z" fill="{c}"/><path d="M0 -3 L0 -{l-6}" stroke="#F6EBDA" stroke-width="1" opacity=".55"/></g>'
    segs=''
    for k in range(10):
        a=k*36*math.pi/180
        x1=100+math.cos(a)*10; y1=96+math.sin(a)*10; x2=100+math.cos(a)*40; y2=96+math.sin(a)*40
        segs+=f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#D7B02B" stroke-width="2.4" stroke-linecap="round"/>'
    return f'''<svg viewBox="0 0 200 200" width="{w}" height="{h}" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="{i}c"><rect width="200" height="200"/></clipPath></defs>
<g clip-path="url(#{i}c)"><rect width="200" height="200" fill="#F0E19B"/>
{leaf(24,180,-30,64,17)}{leaf(38,190,-8,58,15,'#6F8A6A')}{leaf(176,178,34,62,16)}{leaf(160,196,12,56,14,'#6F8A6A')}{leaf(100,196,0,44,12,'#8DA085')}
<circle cx="100" cy="96" r="58" fill="#D7B02B"/><circle cx="100" cy="96" r="51" fill="#F3E9B5"/><circle cx="100" cy="96" r="44" fill="#E8C94A"/>
{segs}<circle cx="100" cy="96" r="7" fill="#F3E9B5"/>
<circle cx="150" cy="150" r="24" fill="#D7B02B"/><path d="M150 126 q4 -10 12 -12" stroke="#6F8A6A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M158 118 q10 -4 14 4 q-9 4 -14 -4z" fill="#8DA085"/>
<circle cx="143" cy="144" r="6" fill="#F3E9B5" opacity=".6"/>
</g></svg>'''
SCENES={'karadeniz':scene_karadeniz,'aksam':scene_aksam,'bergamot':scene_bergamot}
