from g_core import *

def p_mono():
    def mat(bg,inner,label,extra=''):
        return f'<div style="position:relative;border-radius:6px;overflow:hidden;{bg};display:flex;align-items:center;justify-content:center;{extra}">{inner}<div class="lab" style="position:absolute;left:14px;bottom:11px;font-size:8.5px;{extra and ""}">{label}</div></div>'
    kraft="background:radial-gradient(circle at 30% 20%,#d6b17a,#c4996a 60%,#b98d5d);"
    wood="background:repeating-linear-gradient(92deg,#b98a5a 0 3px,#c39563 3px 9px,#b58455 9px 11px,#c99b69 11px 20px);"
    # stamp on kraft: multiply
    stamp=f'<div style="mix-blend-mode:multiply;opacity:.88;filter:contrast(1.05)">{logo("rozet","kahve",w=190)}</div>'
    # burn into wood
    burn=f'<div style="opacity:.82;mix-blend-mode:multiply;filter:blur(.25px)">{logo("ana","kahve",w=230)}</div>'
    # emboss on cream card: same colour with light + dark offset
    emb=f'<div style="position:relative">{logo("ana","beyaz",w=230,style="position:absolute;left:1.5px;top:1.5px;opacity:.9;filter:drop-shadow(0 0 0 #fff)")}<div style="filter:drop-shadow(-1.4px -1.4px 0 #fff) drop-shadow(1.6px 1.6px 0 rgba(90,50,20,.32));opacity:1">{logo("ana","krem",w=230)}</div></div>'
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">02 — Tek renk ve özel baskı</div>
 <div class="body" style="margin-top:10px;max-width:660px">Kaşe, kabartma, lazer kazıma ve tek renkli baskıda logonun kahve, siyah ya da beyaz sürümü kullanılır. Bardağın camı boşluk olarak kalır; renkli sürümdeki kırmızı yerini boşluğa bırakır.</div></div>
<div class="abs" style="left:64px;top:194px;width:995px;height:340px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
 {mat(kraft,stamp,'Kaşe · kraft ambalaj')}
 {mat(wood,burn,'Lazer kazıma · ahşap')}
 {mat('background:#EADBC3',emb,'Kabartma · pamuklu kâğıt')}
</div>
<div class="abs" style="left:64px;top:550px;width:995px;display:grid;grid-template-columns:repeat(5,1fr);gap:12px;height:160px">
 {''.join(f'<div style="background:{bg};border-radius:6px;display:flex;align-items:center;justify-content:center;position:relative">{logo("ikon",s,w=86)}<div class="lab" style="position:absolute;left:12px;bottom:9px;font-size:8.5px;color:{fg}">{l}</div></div>' for bg,s,l,fg in [("var(--beyaz)","renkli","Renkli","var(--koyu)"),("var(--beyaz)","siyah","Siyah","var(--koyu)"),("var(--beyaz)","kahve","Kahve","var(--koyu)"),("var(--koyu)","beyaz","Beyaz","var(--krem)"),("var(--koyu)","ters","Ters","var(--krem)")])}
</div>'''
    return '02 · Logo',body,'',True

def p_clear():
    # ana logo in svg with clear-space box; x = glass height (54*isc)
    isc=1.32; xu=54*isc  # units in logo coordinates
    inner,bb=L_ana(scheme('renkli')); W,H=bb[2],bb[3]
    sc=0.64
    pad=xu*sc
    ox,oy=64+pad,128+pad
    gx=ox+ ( (W-IB[2]*isc)/2 -IB[0]*isc + 120*isc-0 )*sc   # not used
    # glass position in logo coords
    ix=(W-IB[2]*isc)/2-IB[0]*isc; iy=-IB[1]*isc
    gx0=(ix+101*isc)*sc+ox; gx1=(ix+139*isc)*sc+ox; gy0=(iy+151*isc)*sc+oy; gy1=(iy+205*isc)*sc+oy
    boxx,boxy,boxw,boxh=ox-pad,oy-pad,W*sc+2*pad,H*sc+2*pad
    def xm(x,y,w,h):
        return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="#EBA23C" fill-opacity=".28" stroke="#BC3C17" stroke-width="1" stroke-dasharray="3 3"/><text x="{x+w/2:.1f}" y="{y+h/2+4:.1f}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="15" fill="#BC3C17">x</text>'
    marks=xm(boxx,boxy+boxh/2-xu*sc/2,pad,xu*sc)+xm(boxx+boxw-pad,boxy+boxh/2-xu*sc/2,pad,xu*sc)+xm(boxx+boxw/2-xu*sc/2,boxy,xu*sc,pad)+xm(boxx+boxw/2-xu*sc/2,boxy+boxh-pad,xu*sc,pad)
    lg,(lw,lh)=place('ana','renkli',ox,oy,w=W*sc)
    # x definition: glass highlight
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">02 — Koruma alanı ve minimum boyut</div></div>
<svg class="abs" style="left:0;top:0" width="1123" height="794" viewBox="0 0 1123 794">
 <rect x="{boxx-56:.1f}" y="{boxy-0:.1f}" width="0" height="0"/>
 <rect x="{boxx:.1f}" y="{boxy:.1f}" width="{boxw:.1f}" height="{boxh:.1f}" fill="#FFFAF1" stroke="#BC3C17" stroke-width="1.2" stroke-dasharray="6 4"/>
 {marks}{lg}
 <rect x="{gx0:.1f}" y="{gy0:.1f}" width="{gx1-gx0:.1f}" height="{gy1-gy0:.1f}" fill="none" stroke="#BC3C17" stroke-width="1"/>
</svg>
<div class="abs" style="left:{boxx+boxw+40:.0f}px;top:128px;width:{1059-(boxx+boxw+40):.0f}px">
 <div class="lab" style="color:var(--kirmizi)">Koruma alanı</div>
 <div class="body" style="margin-top:8px;font-size:12.4px"><p><b>x</b>, ikondaki ince belli bardağın yüksekliğidir (ikondaki kırmızı çerçeve). Logonun dört yanında en az <b>1x</b> boş alan bırakılır; başka logo, metin, kenar ya da kesim çizgisi bu alana giremez.</p><p>Yatay logoda, kelime logosunda ve rozette de aynı ölçü geçerlidir: x her zaman o logodaki bardağın yüksekliğidir. Bardak işaretinde x, işaretin genişliğinin dörtte biridir.</p></div>
 <div class="hr" style="margin:20px 0"></div><div class="lab" style="color:var(--kirmizi)">Tavsiye</div><div class="body" style="margin-top:8px;font-size:12.4px"><p>Yer darsa boşluğu değil logoyu küçült; ama minimum boyutun altına inme.</p></div>
</div>
<div class="abs" style="left:64px;top:{boxy+boxh+30:.0f}px;right:64px">
 <div class="lab" style="color:var(--kirmizi)">Minimum boyutlar</div>
 <div style="display:flex;gap:44px;align-items:flex-end;margin-top:16px">
  <div>{logo('ana','renkli',w=118)}<div class="small" style="margin-top:8px"><b>Ana</b> · 118 px / 30 mm</div></div>
  <div>{logo('yatay','renkli',w=112)}<div class="small" style="margin-top:8px"><b>Yatay</b> · 112 px / 28 mm</div></div>
  <div>{logo('kelime','renkli',w=76)}<div class="small" style="margin-top:8px"><b>Kelime</b> · 76 px / 20 mm</div></div>
  <div>{logo('ikon','renkli',w=38)}<div class="small" style="margin-top:8px"><b>İkon</b> · 38 px / 10 mm</div></div>
  <div>{logo('rozet','renkli',w=28)}<div class="small" style="margin-top:8px"><b>Rozet</b> · 28 px</div></div>
  <div>{logo('bardak','renkli',w=16)}<div class="small" style="margin-top:8px"><b>Bardak</b> · 16 px</div></div>
 </div></div>'''
    return '02 · Logo',body,'',True

def p_donts():
    def bad(inner,label,bg='var(--beyaz)'):
        return f'''<div style="position:relative"><div style="background:{bg};border-radius:6px;height:178px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative">{inner}
        <svg style="position:absolute;right:9px;top:9px" width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#BC3C17"/><path d="M7 7 L15 15 M15 7 L7 15" stroke="#FFFAF1" stroke-width="2" stroke-linecap="round"/></svg></div>
        <div class="small" style="margin-top:8px;font-size:11px">{label}</div></div>'''
    L=lambda s='renkli',w=150,style='':logo('ana',s,w=w,style=style)
    # wrong color: build custom scheme
    def custom(main,accent,w=150,nm='ana'):
        g,(gw,gh)=place(nm,cs(main,accent,accent),0,0,w=w)
        return f'<svg width="{gw:.0f}" height="{gh:.0f}" viewBox="0 0 {gw:.0f} {gh:.0f}">{g}</svg>'
    # wrong font wordmark
    wrongfont=f'<div style="text-align:center"><div style="font-family:Georgia,serif;font-weight:700;font-size:54px;letter-spacing:-1px;color:var(--koyu)">demlik</div></div>'
    # rearranged: icon right of wordmark stacked wrongly
    ig,(iw,ih)=place('ikon','renkli',0,0,w=48); wg,(ww,wh)=place('kelime','renkli',0,0,w=110)
    rearr=f'<div style="display:flex;align-items:center;gap:6px">{logo("kelime","renkli",w=110)}{logo("ikon","renkli",w=50)}</div>'
    busy='background:repeating-linear-gradient(45deg,#c9a26b 0 12px,#8c5f3a 12px 24px,#d8b98a 24px 30px,#5d3b24 30px 40px);'
    tiles=[
     bad(L(style='transform:scaleX(1.45)'),'Oranını bozma; esnetme, sıkıştırma.'),
     bad(L(style='transform:rotate(-14deg)'),'Döndürme, eğme.'),
     bad(custom('#1F6FB2','#E1306C'),'Marka dışı renk kullanma.'),
     bad(L(style='filter:drop-shadow(4px 5px 3px rgba(0,0,0,.45))'),'Gölge, parlama, efekt ekleme.'),
     bad(wrongfont,'Kelime logosunu başka yazıyla yazma.'),
     bad(rearr,'Öğelerin yerini ve oranını değiştirme.'),
     bad(f'<div style="{busy}position:absolute;inset:0"></div><div style="position:relative">{L(w=140)}</div>','Desenli, kontrastı düşük zemine koyma.',),
     bad(f'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--kirmizi)">{L("renkli",w=140)}</div>','Renkli logoyu kırmızı zemine koyma: beyaz sürüm kullan.'),
    ]
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">02 — Yanlış kullanımlar</div>
 <div class="body" style="margin-top:10px;max-width:640px">Logo dosyaları hazır; oynamaya gerek yok. En sık görülen sekiz hata:</div></div>
<div class="abs" style="left:64px;top:186px;width:995px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px 16px">{''.join(tiles)}</div>'''
    return '02 · Logo',body,'',True
