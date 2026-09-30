from g_core import *
from scenes import *
from patterns import *

def sw(name,hexv,role,fg,big=False,extra=''):
    r,g,b=rgb(hexv); c,m,y,k=cmyk(hexv)
    return f'''<div style="background:{hexv};color:{fg};border-radius:8px;padding:22px 22px 18px;display:flex;flex-direction:column;justify-content:space-between;{extra}">
 <div><div class="lab" style="opacity:.75">{role}</div><div class="h-m" style="margin-top:10px;font-size:{34 if big else 24}px">{name}</div></div>
 <div class="mono" style="font-size:11px;line-height:1.75;font-weight:500"><div style="font-size:15px;font-weight:700;letter-spacing:.06em">{hexv}</div>RGB {r} · {g} · {b}<br>CMYK {c} · {m} · {y} · {k}</div></div>'''

def p_color1():
    prop=[('Porselen',C['krem'],55,C['koyu']),('Koyu Demlik',C['koyu'],25,C['krem']),('Çay Kırmızısı',C['kirmizi'],12,C['krem']),('Kehribar',C['amber'],5,C['koyu']),('Süt',C['beyaz'],3,C['koyu'])]
    bar=''.join(f'<div style="flex:{p};background:{c};color:{f};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;letter-spacing:.06em;{"border:1px solid rgba(43,24,16,.25);" if c in (C["krem"],C["beyaz"]) else ""}">{("%%%d"%p) if p>=5 else ""}</div>' for n,c,p,f in prop)
    chips=[('Süt Beyazı',C['beyaz'],'Kart, kâğıt, boş alan',C['koyu']),('Buhar',C['buhar'],'Çizgi, ikincil zemin',C['koyu']),('Kahve',C['kahve'],'İkincil metin, kraft',C['krem']),('Kehribar',C['amber'],'Koyu zeminde vurgu, ışık',C['koyu'])]
    chs=''.join(f'<div style="flex:1;background:{h};color:{f};border-radius:6px;padding:12px 14px;{"border:1px solid rgba(43,24,16,.18);" if h==C["beyaz"] else ""}"><div class="lab" style="font-size:8.5px">{n}</div><div class="mono" style="font-size:12px;font-weight:700;margin-top:4px">{h}</div><div style="font-size:9.6px;margin-top:2px;opacity:.85">{d}</div></div>' for n,h,d,f in chips)
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">03 — Ana palet</div>
 <div class="h-l" style="margin-top:12px;font-size:54px">Üç renkle bir demlik.</div></div>
<div class="abs" style="left:64px;top:190px;width:995px;height:330px;display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:16px">
 {sw('Çay Kırmızısı',C['kirmizi'],'İmza rengi · vurgu',C['krem'],True)}
 {sw('Koyu Demlik',C['koyu'],'Metin · logo · koyu zemin',C['krem'],True)}
 {sw('Porselen',C['krem'],'Varsayılan zemin',C['koyu'],True,'border:1px solid rgba(43,24,16,.2);')}
</div>
<div class="abs" style="left:64px;top:538px;width:995px">
 <div class="lab" style="color:var(--kirmizi);margin-bottom:8px">Destek tonları</div>
 <div style="display:flex;gap:12px">{chs}</div>
 <div class="lab" style="color:var(--kirmizi);margin:18px 0 8px">Oran · bir tasarımdaki yaklaşık dağılım</div>
 <div style="display:flex;height:34px;border-radius:5px;overflow:hidden">{bar}</div>
</div>'''
    return '03 · Renk',body,'',True

def blend_card(key,name,notes,cols,scene_fn,fg,bg):
    chips=''.join(f'<div style="flex:1;height:44px;background:{h};position:relative;{"border:1px solid rgba(43,24,16,.2);" if lum(h)>.7 else ""}"><span class="mono" style="position:absolute;left:6px;bottom:4px;font-size:8px;font-weight:700;color:{C["koyu"] if lum(h)>.3 else C["krem"]}">{h}</span></div>' for n,h in cols)
    names=''.join(f'<span>{n}</span>' for n,h in cols)
    return f'''<div style="background:{bg};color:{fg};border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
 <div class="fill" style="height:248px;overflow:hidden">{scene_fn(320,248)}</div>
 <div style="padding:18px 20px 20px;flex:1;display:flex;flex-direction:column">
  <div class="lab" style="opacity:.75">Harman</div>
  <div class="h-m" style="font-size:30px;margin:6px 0 8px;line-height:1">{name}</div>
  <div class="small" style="font-size:11.4px;opacity:.95;flex:1">{notes}</div>
  <div style="display:flex;margin-top:14px;border-radius:4px;overflow:hidden">{chips}</div>
  <div style="display:flex;justify-content:space-between;font-size:8.6px;letter-spacing:.06em;margin-top:5px;opacity:.85;text-transform:uppercase;font-weight:700">{names}</div>
 </div></div>'''
def p_color2():
    def sc_wide(fn):
        return lambda w,h: fn(w,h).replace('<svg ','<svg preserveAspectRatio="xMidYMid slice" ',1)
    cards=[
     blend_card('kd','Karadeniz Sabahı','Rize sisi, ilk ışık, ince kesim yaprak. Ferah, dolgun, hafif dumanlı. Sabah harmanı; yeşil ve sis tonları.',[('Yeşil',C['yesil']),('Sis',C['sis']),('Kehribar',C['amber'])],sc_wide(scene_karadeniz),C['koyu'],C['sis']),
     blend_card('ak','Kadıköy Akşamı','Vapur, mürdüm gökyüzü, mercan ufuk. Yeni sonbahar harmanı: baharatlı, yuvarlak, uzun kalan. Ekim kampanyasının yıldızı.',[('Mürdüm',C['mur']),('Mercan',C['coral']),('Pembe',C['pembe'])],sc_wide(scene_aksam),C['krem'],C['mur']),
     blend_card('bg','Adaçaylı Bergamot','Bergamot kabuğu ve adaçayı: parlak, ferah, hafif ekşi. Öğleden sonra harmanı; sarı ve adaçayı tonları.',[('Bergamot',C['bergamot']),('Adaçayı',C['adacayi']),('Açık',C['bergtint'])],sc_wide(scene_bergamot),C['koyu'],C['bergtint']),
    ]
    body=f'''
<div class="abs" style="left:64px;top:86px;width:900px"><div class="eyebrow">03 — Harman renkleri</div>
 <div class="body" style="margin-top:10px;max-width:700px">Her harmanın kendi rengi ve kendi manzarası var. Harman renkleri yalnız ilgili ürünün ambalajında, menüde ve kampanyada ana renklerin yanında yardımcı olarak kullanılır; logonun rengi hiçbir zaman değişmez.</div></div>
<div class="abs" style="left:64px;top:184px;width:995px;height:540px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px">{''.join(cards)}</div>'''
    return '03 · Renk',body,'',True

def p_color3():
    pairs=[('Koyu Demlik','Porselen',C['koyu'],C['krem']),('Koyu Demlik','Süt Beyazı',C['koyu'],C['beyaz']),('Çay Kırmızısı','Porselen',C['kirmizi'],C['krem']),('Porselen','Çay Kırmızısı',C['krem'],C['kirmizi']),
           ('Kehribar','Koyu Demlik',C['amber'],C['koyu']),('Porselen','Karadeniz Yeşili',C['krem'],C['yesil']),('Porselen','Akşam Mürdümü',C['krem'],C['mur']),('Mercan','Akşam Mürdümü',C['coral'],C['mur']),
           ('Koyu Demlik','Bergamot',C['koyu'],C['bergamot']),('Koyu Demlik','Kehribar',C['koyu'],C['amber']),('Kahve','Porselen',C['kahve'],C['krem']),('Adaçayı','Porselen',C['adacayi'],C['krem'])]
    cells=''
    for fn,bn,f,b in pairs:
        cr=contrast(f,b)
        grade='AAA' if cr>=7 else 'AA' if cr>=4.5 else 'Yalnız büyük yazı' if cr>=3 else 'Kullanma'
        ok= cr>=4.5
        col='#2F5D4B' if cr>=4.5 else ('#B87A12' if cr>=3 else '#BC3C17')
        cells+=f'''<div style="background:{b};color:{f};border-radius:6px;padding:14px 16px;position:relative;{"border:1px solid rgba(43,24,16,.2);" if lum(b)>.75 else ""}min-height:104px;display:flex;flex-direction:column;justify-content:space-between">
        <div style="font-family:var(--serif);font-weight:900;font-style:italic;font-size:40px;line-height:1">Aa</div>
        <div><div class="mono" style="font-size:10px;line-height:1.35"><b>{fn}</b><br>üzerine {bn.split(' ')[0] if False else ''}<span style="opacity:.85">{bn}</span></div>
        <div style="display:flex;justify-content:space-between;margin-top:6px;align-items:center"><span class="mono" style="font-size:12px;font-weight:700">{cr:.1f}:1</span><span style="font-size:8.2px;letter-spacing:.08em;font-weight:700;text-transform:uppercase;background:{C["beyaz"]};color:{col};padding:2px 6px;border-radius:99px">{grade}</span></div></div></div>'''
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">03 — Renk kullanımı ve erişilebilirlik</div>
 <div class="body" style="margin-top:10px;max-width:700px">Renk çiftleri WCAG 2.1 kontrast oranıyla ölçülmüştür. Metin için en az 4.5:1 (AA); 24 px üstü başlıklar için 3:1 yeterli. Hesap değerleri aşağıda.</div></div>
<div class="abs" style="left:64px;top:184px;width:700px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px">{cells}</div>
<div class="abs" style="left:800px;top:184px;width:259px">
 <div class="lab" style="color:var(--kirmizi)">Akşam geçişi</div>
 <div style="height:78px;border-radius:6px;margin:8px 0 8px;background:linear-gradient(90deg,#5A2440 0%,#B0475A 45%,#F08A5D 78%,#EBA23C 100%)"></div>
 <div class="small">Tek geçiş: Mürdüm → Mercan → Kehribar. Yalnız kampanya ve “Kadıköy Akşamı” ambalajında; logonun arkasında değil.</div>
 <div class="hr" style="margin:20px 0"></div>
 <div class="lab" style="color:var(--kirmizi)">Kurallar</div>
 <div class="body" style="margin-top:8px;font-size:12px"><p>· Zemin çoğunlukla Porselen ya da Süt Beyazı; koyu zemin güçlü an içindir.</p><p>· Kırmızı bir tasarımda bir “damla” kadar durur; yüzeyi kaplamaz.</p><p>· Yeşil ve mürdüm zeminde kırmızı yazı kullanma; Kehribar ya da Porselen kullan.</p><p>· Harman renkleri birbirine karıştırılmaz.</p></div>
</div>
<div class="abs" style="left:64px;top:600px;width:700px;display:flex;gap:10px;height:112px">
 {''.join(f'<div style="flex:1;background:{h};border-radius:6px;position:relative;{"border:1px solid rgba(43,24,16,.2);" if lum(h)>.75 else ""}"><div class="mono" style="position:absolute;left:10px;bottom:8px;font-size:9px;font-weight:700;color:{C["koyu"] if lum(h)>.3 else C["krem"]}">{n}<br>{h}</div></div>' for n,h in [('Yeşil',C['yesil']),('Sis',C['sis']),('Mürdüm',C['mur']),('Mercan',C['coral']),('Pembe',C['pembe']),('Bergamot',C['bergamot']),('Adaçayı',C['adacayi']),('Açık bergamot',C['bergtint'])])}
</div>'''
    return '03 · Renk',body,'',True

def p_type1():
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">04 — Yazı aileleri</div></div>
<div class="abs" style="left:64px;top:118px;width:520px;height:600px;background:var(--koyu);color:var(--krem);border-radius:8px;padding:30px 34px;overflow:hidden">
 <div class="lab" style="color:var(--amber)">Başlık ve vurgu</div>
 <div style="font-family:var(--serif);font-weight:900;font-style:italic;font-size:210px;line-height:.9;margin:14px 0 0 -6px;letter-spacing:-.03em">Aa</div>
 <div class="h-m" style="margin-top:6px;font-size:36px">Noto Serif Display</div>
 <div style="font-family:var(--serif);font-size:19px;line-height:1.5;margin-top:14px;opacity:.95">
   <div style="font-weight:900;font-style:italic">Black Italic — Çay acele sevmez.</div>
   <div style="font-weight:700;font-style:italic">Bold Italic — Demini al, şehri unut.</div>
   <div style="font-weight:500">Medium — Karadeniz Sabahı, 100 g</div>
   <div style="font-weight:400;font-style:italic">Italic — kısık ateşte üç dakika</div></div>
 <div class="small" style="margin-top:16px;opacity:.75;font-size:11px">ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ<br>abcçdefgğhıijklmnoöprsştuüvyz 0123456789 ₺ % &amp; ? !</div>
</div>
<div class="abs" style="left:602px;top:118px;width:457px;height:600px;background:var(--beyaz);border-radius:8px;padding:30px 34px;overflow:hidden">
 <div class="lab" style="color:var(--kirmizi)">Metin ve arayüz</div>
 <div style="font-family:var(--sans);font-weight:700;font-size:170px;line-height:1;margin:22px 0 0 -4px;letter-spacing:-.04em;color:var(--koyu)">Aa</div>
 <div class="h-s" style="font-family:var(--sans);font-weight:700;font-size:26px;margin-top:8px">Noto Sans</div>
 <div style="font-size:15px;line-height:1.6;margin-top:12px">
   <div style="font-weight:700">Bold — ETİKET · 3 DK 30 SN</div>
   <div style="font-weight:500">Medium — Cumartesi demleme atölyesi</div>
   <div style="font-weight:400">Regular — İlk hafta atölyeye %20 indirim.</div>
   <div style="font-weight:300">Light — Moda Cd. No: 42 Kadıköy</div></div>
 <div class="small" style="margin-top:16px;font-size:11px">ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ<br>abcçdefgğhıijklmnoöprsştuüvyz 0123456789</div>
 <div class="hr" style="margin:18px 0 14px"></div>
 <div class="body" style="font-size:11.6px"><p><b>Lisans:</b> iki aile de SIL Open Font License; Google Fonts'tan ücretsiz indirilir, ticari kullanım serbesttir.</p><p><b>Yedek:</b> Georgia (başlık), Arial (metin). Web'de <span class="mono">font-display: swap</span>.</p><p><b>Türkçe:</b> büyük harfe çevirirken <span class="mono">lang="tr"</span> kullan: i → İ, ı → I.</p></div>
</div>'''
    return '04 · Tipografi',body,'',True

def p_type2():
    rows=[('Başlık','Noto Serif Display Black Italic','64 / 62 pt','−2 %','Cümle düzeni, sonunda nokta','Demini Al.','font-family:var(--serif);font-weight:900;font-style:italic;font-size:58px;line-height:.98;letter-spacing:-.02em'),
          ('Alt başlık','Noto Serif Display Bold Italic','32 / 34 pt','−1 %','Cümle düzeni','Kadıköy Akşamı geldi.','font-family:var(--serif);font-weight:700;font-style:italic;font-size:30px;line-height:1.1;letter-spacing:-.01em'),
          ('Metin','Noto Sans Regular','15 / 24 pt','0','Sola yaslı, satır ≤ 60 karakter','Yeni sonbahar harmanı, mürdüm bir akşamın tadında.','font-family:var(--sans);font-size:15px;line-height:1.6'),
          ('Etiket','Noto Sans Bold','11 / 14 pt','+18 %','Büyük harf, lang=tr','Çay dükkânı & atölyesi','font-family:var(--sans);font-weight:700;font-size:11px;letter-spacing:.18em;text-transform:uppercase'),
          ('Fiyat / rakam','Noto Serif Display Medium','28 / 30 pt','0','Tablo rakamı','₺185  ·  %20','font-family:var(--serif);font-weight:500;font-size:30px;font-variant-numeric:tabular-nums')]
    trs=''.join(f'''<div style="display:grid;grid-template-columns:150px 1fr 250px;gap:22px;padding:15px 0;border-top:1px solid rgba(43,24,16,.18);align-items:center">
     <div><div class="lab" style="color:var(--kirmizi)">{a}</div><div class="small" style="margin-top:4px;font-size:10px">{b}<br>{c} · iz {d}</div></div>
     <div style="{sty}">{ex}</div><div class="small" style="font-size:10.4px">{e}</div></div>''' for a,b,c,d,e,ex,sty in rows)
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">04 — Tipografik hiyerarşi</div>
 <div class="h-l" style="margin-top:12px;font-size:50px">Serif konuşur, sans açıklar.</div></div>
<div class="abs" style="left:64px;top:190px;width:995px">{trs}<div style="border-top:1px solid rgba(43,24,16,.18)"></div></div>
<div class="abs" style="left:64px;top:632px;width:995px;display:flex;gap:40px">
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">İtalik sıcaklıktır</div><div class="small" style="margin-top:6px;font-size:11.4px">Başlıklarda daima italik seri kullanılır; dik seri yalnız rakamlarda ve uzun alt başlıklarda.</div></div>
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">Büyük harf yalnız etikette</div><div class="small" style="margin-top:6px;font-size:11.4px">Serif başlıklar hiçbir zaman tümüyle büyük harfle dizilmez; büyük harf yalnız küçük sans etiketlerde.</div></div>
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">İki aile, üç ağırlık</div><div class="small" style="margin-top:6px;font-size:11.4px">Bir tasarımda en fazla iki aile ve üç ağırlık. Ortalanmış metin yalnız kısa başlık ve etiketlerde.</div></div>
</div>'''
    return '04 · Tipografi',body,'',True

def p_voice():
    ex=[('Kampanya','Demini Al.','Muhteşem sonbahar lezzetleriyle tanışın!'),('Ambalaj','Bu poşet 3 dk 30 sn sabır ister.','Premium kalite, eşsiz deneyim.'),('Tabela','Çay acele sevmez. Biz de.','Türkiye\'nin en iyi çayı burada!'),
          ('Sosyal medya','Kahve iki dakikada biter. Çay bir sohbettir.','Hemen takip et, kaçırma!!!'),('Atölye','Cumartesi demleme atölyesi: yarım saatlik sabır, ömürlük bardak.','Kontenjan sınırlıdır, acele edin.'),('404 sayfası','Bu sayfa hâlâ demleniyor.','Hata: sayfa bulunamadı.')]
    rows=''.join(f'''<div style="display:grid;grid-template-columns:110px 1fr 1fr;gap:26px;padding:10px 0;border-top:1px solid rgba(43,24,16,.18);align-items:baseline">
    <div class="lab" style="opacity:.6;font-size:9px">{a}</div>
    <div style="font-family:var(--serif);font-style:italic;font-weight:700;font-size:19px;line-height:1.2">{b}</div>
    <div style="font-size:12px;line-height:1.4;opacity:.55;text-decoration:line-through;text-decoration-color:var(--kirmizi)">{c}</div></div>''' for a,b,c in ex)
    def pr(n,t,d):
        return f'<div style="flex:1"><div style="font-family:var(--serif);font-style:italic;font-weight:900;font-size:38px;color:var(--kirmizi);line-height:1">{n}</div><div class="h-s" style="font-weight:700;font-style:italic;margin-top:8px;font-size:21px">{t}</div><div class="small" style="margin-top:6px;font-size:11.4px">{d}</div></div>'
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">04 — Ses ve ton</div>
 <div class="h-l" style="margin-top:12px;font-size:50px">Kısık ateşte konuşuruz.</div></div>
<div class="abs" style="left:64px;top:190px;width:995px;display:flex;gap:34px">
 {pr('1','Kısa ve yavaş','Kısa cümle, nokta. Ünlem yok; sıcaklık ses tonundan gelir, işaretten değil.')}
 {pr('2','Şakayı bardağın yanına koy','Bir espri yeter; çayın kendisi asla espri malzemesi olmaz, sabır olur.')}
 {pr('3','Köprü kur','Anneannenin kelimeleri ile şehrin kelimeleri yan yana: “demini almak” da olur, “slot” yerine “yer” de.')}
</div>
<div class="abs" style="left:64px;top:346px;width:995px">
 <div style="display:grid;grid-template-columns:110px 1fr 1fr;gap:26px;padding-bottom:10px"><span></span><span class="lab" style="color:#2F5D4B">Şöyle deriz</span><span class="lab" style="color:var(--kirmizi)">Böyle demeyiz</span></div>
 {rows}<div style="border-top:1px solid rgba(43,24,16,.18)"></div></div>
<div class="abs" style="left:64px;top:690px;width:995px;display:flex;gap:16px;align-items:center">
 <div class="lab" style="width:110px;opacity:.6;font-size:9px">Cümlelerimiz</div>
 <div style="background:var(--koyu);color:var(--krem);border-radius:99px;padding:8px 26px;font-family:var(--serif);font-style:italic;font-weight:900;font-size:26px">Çay acele sevmez.<span style="font-family:var(--sans);font-style:normal;font-weight:700;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--amber);margin-left:14px">İmza cümle · her zaman</span></div>
 <div style="background:var(--kirmizi);color:var(--krem);border-radius:99px;padding:8px 26px;font-family:var(--serif);font-style:italic;font-weight:900;font-size:26px">Demini Al.<span style="font-family:var(--sans);font-style:normal;font-weight:700;font-size:9px;letter-spacing:.16em;text-transform:uppercase;margin-left:14px;opacity:.9">Ekim 2026 kampanyası</span></div>
</div>'''
    return '04 · Tipografi',body,'',True

def p_patterns():
    tiles=[('Bardak Sırası',pat_glasses(490,190,C['krem'],C['koyu'],C['kirmizi'],C['amber'],idn='pg1'),'İnce belli bardaklar, sıralı ve dönüşümlü. Ambalaj içi, kâğıt, peçete.'),
           ('Bardak İzi',pat_rings(490,190,C['kirmizi'],C['krem'],C['amber'],idn='pr1'),'Masada kalan bardak izleri. Kapak, poster, sosyal medya zemini.'),
           ('Buhar',pat_steam(490,190,C['koyu'],C['krem'],C['amber'],idn='ps1'),'Yükselen buhar ve damla. Koyu zeminde, atölye ve gece kampanyası.'),
           ('Vapur Dalgası',pat_waves(490,190,C['mur'],C['coral'],C['amber'],idn='pw1'),'Boğaz dalgası. Kadıköy Akşamı serisi ve bardak bantları.')]
    tt=''.join(f'<div style="border-radius:8px;overflow:hidden;background:var(--beyaz);display:flex;flex-direction:column"><div class="fill" style="height:190px;overflow:hidden">{svg}</div><div style="padding:12px 16px 14px"><div class="h-s" style="font-weight:700;font-style:italic;font-size:22px">{n}</div><div class="small" style="margin-top:3px;font-size:11px">{d}</div></div></div>' for n,svg,d in tiles)
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">05 — Grafik dil</div>
 <div class="body" style="margin-top:10px;max-width:720px">Dört desen, hepsi logodan türer: bardak, izi, buharı ve vapurun dalgası. Desen zemindir, süs değil: metin ve logo desenin üstüne düz bir plaka olmadan yerleşmez.</div></div>
<div class="abs" style="left:64px;top:184px;width:995px;display:grid;grid-template-columns:1fr 1fr;gap:16px">{tt}</div>'''
    return '05 · Grafik dil',body,'',True

def p_illus():
    def col(fn,name,note,dem):
        return f'''<div style="flex:1;background:var(--beyaz);border-radius:8px;padding:14px 14px 16px">
        <div class="fill" style="border-radius:5px;overflow:hidden;height:250px">{fn(300,250).replace("<svg ",'<svg preserveAspectRatio="xMidYMid slice" ',1)}</div>
        <div class="h-s" style="font-weight:700;font-style:italic;font-size:22px;margin-top:12px">{name}</div>
        <div class="small" style="margin-top:3px">{note}</div>
        <div style="display:flex;gap:16px;margin-top:10px;font-size:10px;font-weight:700;letter-spacing:.08em" class="mono">{dem}</div></div>'''
    dem=lambda t,s: f'<span>Süre {s}</span><span>Su {t}</span>'
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">05 — Harman illüstrasyonları</div>
 <div class="body" style="margin-top:10px;max-width:760px">Her harman düz renk, geometrik bir manzarayla anlatılır: en fazla dört ton, çizgisiz kontur, tek ışık kaynağı. Aynı üç illüstrasyon ambalajda, menüde, sosyal medyada ve kampanyada yeniden kullanılır.</div></div>
<div class="abs" style="left:64px;top:184px;width:995px;display:flex;gap:16px">
 {col(scene_karadeniz,'Karadeniz Sabahı','Teraslı yamaç, sis, ilk ışık.',dem('95°C','4 dk'))}
 {col(scene_aksam,'Kadıköy Akşamı','Vapur, güneş, Moda ufku.',dem('98°C','5 dk'))}
 {col(scene_bergamot,'Adaçaylı Bergamot','Bergamot dilimi, adaçayı yaprakları.',dem('90°C','3 dk 30 sn'))}
</div>
<div class="abs" style="left:64px;top:606px;width:995px;display:flex;gap:40px">
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">Yapı</div><div class="small" style="margin-top:6px;font-size:11.4px">Gökyüzü, ışık kaynağı (güneş / bergamot), üç katman zemin. Aşağıya doğru koyulaşır.</div></div>
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">Renk</div><div class="small" style="margin-top:6px;font-size:11.4px">Yalnız harmanın kendi tonları ve Kehribar; siyah kontur, gradyan efekti ve fotoğraf karışmaz.</div></div>
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">Yeni harman?</div><div class="small" style="margin-top:6px;font-size:11.4px">Yeni bir harman = yeni bir manzara + yeni bir renk ailesi. Ana palet ve logo değişmez.</div></div>
</div>'''
    return '05 · Grafik dil',body,'',True

PAGES=[p_color1,p_color2,p_color3,p_type1,p_type2,p_voice,p_patterns,p_illus]
