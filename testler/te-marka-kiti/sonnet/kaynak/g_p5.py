from g_core import *
from mock3 import *
from mock4 import *
from mock5 import *
from mock6 import *
def p_kirtasiye():
    tiles=[('Kartvizit · 90×55 mm','Ön: koyu, ters ana logo. Arka: krem, kırmızı şerit.'),
           ('Demleme kartı','10 bardaklı damga kartı. Kırmızı zemin, krem bardaklar.'),
           ('Antetli kâğıt · zarf','Yatay logo sol üstte, altbilgi bandı Porselen. Zarfta rozet mührü.')]
    cols=''.join(f'<div style="flex:1"><div class="lab" style="color:var(--kirmizi);font-size:8.5px">{a}</div><div class="small" style="margin-top:4px;font-size:10.4px;opacity:.95">{b}</div></div>' for a,b in tiles)
    body=f'''{cards_scene()}
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">06 — Uygulamalar · Kartvizit ve kırtasiye</div>
 <div class="h-l" style="margin-top:12px;font-size:46px">Tezgâhtan cebe.</div></div>
<div class="abs" style="left:64px;top:694px;width:540px;display:flex;gap:22px">{cols}</div>'''
    return '06 · Uygulamalar',body,'',True
def p_kampanya():
    tiles=[('Afiş · 50×70 cm','Akşam geçişi + vapur. Başlık Black Italic; teklif rozetle, tek bir sayı.'),('Instagram gönderisi 1:1','Koyu zemin, Bardak İzi deseni. İmza cümle + kampanya haberi.'),('Web bandı · Story 9:16','Aynı sahne, farklı kırpma. Düğme her zaman Çay Kırmızısı ya da Porselen.')]
    cols=''.join(f'<div style="margin-bottom:12px"><div class="lab" style="color:var(--amber);font-size:8.5px">{a}</div><div class="small" style="margin-top:3px;font-size:10.4px;opacity:.9">{b}</div></div>' for a,b in tiles)
    body=f'''{campaign_scene()}
<div class="abs" style="left:64px;top:86px;color:var(--krem)"><div class="eyebrow" style="color:var(--amber)">06 — Uygulamalar · Kampanya: Demini Al</div></div>
<div class="abs" style="left:428px;top:588px;width:300px;color:var(--krem)">{cols}</div>
<div class="abs" style="left:64px;top:632px;width:340px;color:var(--krem)"><div class="h-m" style="font-size:30px;color:var(--krem)">Ekim'de, demini al.</div><div class="small" style="margin-top:8px;font-size:11px;opacity:.85">Kadıköy Akşamı lansmanı: ilk hafta demleme atölyesine %20 indirim.</div></div>'''
    return '06 · Uygulamalar',body,'dark',True
def p_dijital():
    tiles=[('Web sitesi','Krem zemin, Black Italic başlık, kırmızı düğme; ürünler manzara kartı.'),
           ('Sosyal medya','Profil resmi rozet; ızgarada manzara, cümle ve desen kareleri.'),
           ('Küçük boyutlar','64 px altında bardak işareti; favicon her zaman bardak.')]
    cols=''.join(f'<div style="flex:1"><div class="lab" style="color:var(--kirmizi);font-size:8.5px">{a}</div><div class="small" style="margin-top:4px;font-size:10.4px;opacity:.95">{b}</div></div>' for a,b in tiles)
    body=f'''{digital_scene()}
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">06 — Uygulamalar · Dijital</div></div>
<div class="abs" style="left:64px;top:694px;width:640px;display:flex;gap:22px">{cols}</div>'''
    return '06 · Uygulamalar',body,'',True
def p_ek():
    def lab(x,y,t,c,fg):
        return f'<div class="abs lab" style="left:{x}px;top:{y}px;color:{fg};font-size:8.5px">{t}</div>'
    body=f'''{extras_scene()}
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">06 — Uygulamalar · Küçük şeyler</div></div>
{lab(84,412,'Bez çanta · kahve tek renk baskı','', 'var(--koyu)')}
{lab(600,412,'Etiket seti · kesim beyaz kenarlı','', 'var(--krem)')}
{lab(84,728,'Poşet çay etiketi · Kadıköy Akşamı','', 'var(--krem)')}
{lab(600,728,'Atölye bileti · koparma çizgili','', 'var(--koyu)')}'''
    return '06 · Uygulamalar',body,'',True

def p_son():
    rows=[('ana','Ana logo'),('ana-slogan','Sloganlı ana logo'),('yatay','Yatay logo'),('ikon','İkon'),('kelime','Kelime logosu'),('rozet','Rozet'),('bardak','Bardak işareti')]
    cols=['renkli','ters','siyah','beyaz','kahve']
    head=''.join(f'<div class="lab" style="font-size:8.5px;text-align:center;opacity:.75">{c}</div>' for c in cols)
    def cell(nm,c):
        bg='#2B1810' if c in ('ters','beyaz') else '#F6EBDA'
        bgc='background:#F6EBDA;' if bg=='#F6EBDA' else 'background:#4a3226;'
        w={'ana':46,'ana-slogan':46,'yatay':62,'ikon':32,'kelime':58,'rozet':32,'bardak':22}[nm]
        return f'<div style="{bgc}border-radius:4px;height:50px;display:flex;align-items:center;justify-content:center">{logo(nm,c,w=w)}</div>'
    trs=''.join(f'<div style="display:grid;grid-template-columns:150px repeat(5,1fr);gap:6px;align-items:center;margin-top:8px"><div class="small" style="font-size:11px;opacity:.95"><b>{t}</b><br><span class="mono" style="opacity:.7;font-size:9.4px">demlik-{nm}-…</span></div>{"".join(cell(nm,c) for c in cols)}</div>' for nm,t in rows)
    body=f'''
<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">{''.join(f'<circle cx="1000" cy="720" r="{r}" fill="none" stroke="#F6EBDA" stroke-opacity=".06"/>' for r in range(40,700,56))}</svg>
<div class="abs" style="left:64px;top:96px;width:400px">
 <div class="eyebrow">Teslim dosyaları</div>
 <div class="h-l" style="margin-top:14px;font-size:54px;color:var(--krem)">Hepsi elinizde.</div>
 <div class="body" style="margin-top:18px;max-width:320px;opacity:.9"><p>35 SVG logo dosyası, <b>logo/</b> klasöründe. Hepsi vektör, yazı tipi gömülü değil (kelime konturlara çevrilmiştir); hiçbir cihazda kayma olmaz.</p>
 <p style="margin-top:.8em"><span class="mono">demlik-{{kompozisyon}}-{{renk}}.svg</span> düzeniyle adlandırılmıştır. Ters ve beyaz sürümler saydam zeminlidir: koyu bir yüzeye koyun.</p></div>
 <div class="hr" style="margin:26px 0 18px;color:var(--krem)"></div>
 <div class="lab" style="color:var(--amber)">İletişim</div>
 <div class="body" style="margin-top:8px;opacity:.9;line-height:1.75">Demlik · Moda Cd. No: 42 Kadıköy / İstanbul<br>@demlik.kadikoy · demlik.com.tr<br>Marka soruları: marka@demlik.com.tr</div>
 <div class="lab" style="margin-top:22px;opacity:.55">Sürüm 1.0 · Ekim 2026</div>
</div>
<div class="abs" style="left:500px;top:92px;width:559px">
 <div style="display:grid;grid-template-columns:150px repeat(5,1fr);gap:6px;margin-bottom:2px"><span></span>{head}</div>
 {trs}
 <div class="small" style="margin-top:14px;font-size:10.4px;opacity:.7">Not: tek renkli (siyah, beyaz, kahve) sürümlerde bardağın camı boşluktur; kırmızı, renkli ve ters sürümlerde boyalıdır.</div>
 <div style="margin-top:32px;display:flex;align-items:center;gap:18px">{logo('rozet','ters',w=64)}<div style="font-family:var(--serif);font-style:italic;font-weight:900;font-size:36px;color:var(--amber);line-height:1">Çay acele sevmez.</div></div>
</div>'''
    return 'Kapanış',body,'dark',True
PAGES=[p_kirtasiye,p_kampanya,p_dijital,p_ek,p_son]
