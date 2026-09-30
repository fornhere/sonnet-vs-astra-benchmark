from g_core import *

def rings(cx,cy,r0,r1,step,color,op,sw=1,extra=''):
    s=''
    r=r0
    while r<=r1:
        s+=f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{color}" stroke-opacity="{op}" stroke-width="{sw}"/>'
        r+=step
    return s

def p_cover():
    body=f'''
<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">
 {rings(561,397,60,900,64,'#F6EBDA',.07)}
 <circle cx="561" cy="397" r="316" fill="none" stroke="#EBA23C" stroke-opacity=".5" stroke-width="1.2"/>
 <circle cx="561" cy="81" r="5" fill="#EBA23C"/>
</svg>
<div class="abs" style="left:64px;top:52px" ><div class="lab" style="letter-spacing:.3em;color:var(--amber)">Marka kimliği kılavuzu</div></div>
<div class="abs lab" style="right:64px;top:52px;opacity:.6;letter-spacing:.3em">Sürüm 1.0 · Ekim 2026</div>
<div class="abs" style="left:0;right:0;top:158px;display:flex;justify-content:center">{logo('ana','ters',w=440)}</div>
<div class="abs" style="left:64px;right:64px;bottom:46px;display:flex;justify-content:space-between;align-items:flex-end">
  <div class="lab" style="opacity:.7;line-height:1.9">Moda Cd. No: 42 Kadıköy<br>@demlik.kadikoy · demlik.com.tr</div>
  <div class="h-s" style="font-style:italic;color:var(--amber);font-size:26px">Çay acele sevmez.</div>
</div>'''
    return None,body,'dark',False

def p_toc():
    items=[('01','Marka','Hikâye, platform, karakter',3),('02','Logo','Fikir, aile, zeminler, koruma, yanlışlar',5),('03','Renk','Ana palet, harman renkleri, erişilebilirlik',13),
           ('04','Tipografi','Yazı aileleri, hiyerarşi, ses ve ton',16),('05','Grafik dil','Desenler, harman illüstrasyonları',19),('06','Uygulamalar','Bardak, paket, tabela, kartvizit, kampanya, dijital',21)]
    rows=''.join(f'<div style="display:flex;align-items:baseline;gap:22px;padding:15px 0;border-top:1px solid rgba(43,24,16,.18)"><span class="mono" style="font-family:var(--serif);font-style:italic;font-weight:900;font-size:30px;color:var(--kirmizi);width:52px">{a}</span><span style="flex:1"><span class="h-s" style="font-weight:700;font-style:italic;font-size:26px">{b}</span><br><span class="small">{c}</span></span><span class="mono lab" style="opacity:.5">s. {n}</span></div>' for a,b,c,n in items)
    body=f'''
<div class="abs" style="left:64px;top:96px;width:430px">
 <div class="eyebrow">Önce bir fincan…</div>
 <div class="h-l" style="margin-top:16px">İçindekiler</div>
 <div class="body" style="margin-top:28px;max-width:360px">
  <p>Bu kılavuz, Demlik'in görünüşünü ve sesini tek bir yerde toplar. Kurallar, işi yavaşlatmak için değil; her mecrada aynı sıcaklıkta konuşabilmek için var.</p>
  <p>Logo dosyaları <b>logo/</b> klasöründe, SVG olarak, beş renk düzeninde ve yedi kompozisyonda teslim edilir. Renk kodları, ölçüler ve örnek uygulamalar bu sayfalarda.</p>
 </div>
 <div style="margin-top:34px;opacity:.9">{logo('rozet','renkli',w=96)}</div>
</div>
<div class="abs" style="left:560px;right:64px;top:96px">{rows}<div style="border-top:1px solid rgba(43,24,16,.18)"></div></div>'''
    return 'Giriş',body,'',True

def p_story():
    ic=logo('ikon','beyaz',w=620,style='opacity:.13')
    body=f'''
<div class="abs" style="right:-70px;bottom:-60px">{ic}</div>
<div class="abs" style="left:64px;top:110px;width:560px">
 <div class="eyebrow">01 — Marka hikâyesi</div>
 <div class="h-xl" style="margin-top:26px;font-size:118px">Çay acele sevmez.</div>
</div>
<div class="abs body" style="left:64px;bottom:96px;width:470px;font-size:14.5px">
 <p>Demlik, Kadıköy'de üçüncü nesil bir çay dükkânı ve atölyesi. Anneannenin ocakta kısık ateşe bıraktığı demlikten bugünün özel harmanlarına uzanan bir sabır işi bu.</p>
 <p>Kahveyi hızla içmeye alışmış bir şehre, çayı yeniden yavaş yavaş keşfetmeyi öneriyoruz. Demlik; gelenekle bugünün arasında, iki bardak arası bir köprü.</p>
</div>'''
    return '01 · Marka',body,'red',True

def p_platform():
    def col(t,h,tx):
        return f'<div style="flex:1;padding-top:16px;border-top:2px solid var(--koyu)"><div class="lab" style="color:var(--kirmizi)">{t}</div><div class="h-s" style="font-weight:700;font-style:italic;font-size:27px;margin:12px 0 10px;line-height:1.08">{h}</div><div class="small" style="font-size:12px">{tx}</div></div>'
    def trait(n,t,tx,dont):
        return f'''<div style="flex:1;background:var(--beyaz);border-radius:6px;padding:22px 22px 20px;position:relative">
        <div style="font-family:var(--serif);font-style:italic;font-weight:900;font-size:46px;line-height:1;color:var(--kirmizi)">{t}</div>
        <div class="small" style="font-size:12px;margin-top:10px">{tx}</div>
        <div class="hr" style="margin:14px 0 10px"></div><div class="lab" style="opacity:.6;font-size:8.5px">Ama değiliz</div><div class="small" style="margin-top:3px">{dont}</div></div>'''
    body=f'''
<div class="abs" style="left:64px;top:92px;width:700px"><div class="eyebrow">01 — Marka platformu</div>
 <div class="h-m" style="margin-top:14px;max-width:820px;font-size:40px">Kahveye alışık şehirlilere, çayı yeniden keşfettiren üçüncü nesil çay dükkânı.</div></div>
<div class="abs" style="left:64px;right:64px;top:270px;display:flex;gap:36px">
 {col('Misyon','Şehrin hızına, çayın sabrını geri getirmek.','Her harman, her demlik seti, her cumartesi atölyesi aynı işi yapar: insanı bir bardak boyunca yavaşlatır.')}
 {col('Vizyon','Çayı, kahve kadar konuşulan bir kültür yapmak.','Kadıköy\'de bir dükkân olarak başladık; çayı tartışılır, paylaşılır ve hediye edilir kılmak istiyoruz.')}
 {col('Değerler','Sabır · Sıcaklık · Zanaat · Şehirlilik','Yavaş demleriz, samimi konuşuruz, elle yaparız, ama telefonumuz da vardır.')}
</div>
<div class="abs" style="left:64px;right:64px;top:462px;display:flex;gap:20px">
 {trait(1,'Sıcak','Tanıdık, yakın, kapıdan girenin adını hatırlayan. Sesimiz tezgâhın öbür yanındaki sesle aynıdır.','Yapışkan ya da laubali.')}
 {trait(2,'Esprili','Kendine hafifçe gülebilen; çay üzerine şakayı seven ama asla alaycı olmayan.','Espri yapmak için espri yapan.')}
 {trait(3,'Köprü','Nostaljik bir müze değil, modern bir kafe değil; ikisinin arasında bir yürüyüş yolu.','Retro kostümlü ya da soğuk minimal.')}
</div>'''
    return '01 · Marka',body,'',True

# ---------------- LOGO ----------------
def p_idea():
    W=400; s=W/IB[2]
    x0,y0=64+(520-W)/2,219
    def pt(ux,uy): return (x0+(ux-IB[0])*s, y0+(uy-IB[1])*s)
    icon,(iw,ih)=place('ikon',cs(C['koyu'],C['kirmizi'],C['kirmizi']),x0,y0,w=W)
    marks=[(pt(120,96),'1'),(pt(120,178),'2'),((pt(120,26.5)[0]+34,pt(120,26.5)[1]),'3')]
    mk=''
    for (p,n) in marks:
        mk+=f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="15" fill="#EBA23C" stroke="#2B1810" stroke-width="1.4"/><text x="{p[0]:.1f}" y="{p[1]+6:.1f}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="18" fill="#2B1810">{n}</text>'
    def item(n,t,d):
        return f'<div style="display:flex;gap:18px;padding:22px 0;border-top:1px solid rgba(43,24,16,.18)"><span style="font-family:var(--serif);font-style:italic;font-weight:900;font-size:44px;line-height:.9;color:var(--kirmizi);width:34px">{n}</span><div><div class="h-s" style="font-weight:700;font-style:italic;font-size:25px">{t}</div><div class="body" style="margin-top:6px;font-size:12.6px;max-width:330px">{d}</div></div></div>'
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">02 — Logo fikri</div></div>
<div class="abs" style="left:64px;top:126px;width:520px;height:590px;background:var(--beyaz);border-radius:8px"></div>
<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">{icon}{mk}</svg>
<div class="abs" style="left:640px;top:118px;width:420px">
 <div class="h-m" style="font-size:36px;margin-bottom:22px">Üç öğe, tek silüet.</div>
 {item('1','Çift katlı çaydanlık','Altta su, üstte demlik: dükkânın adı, en tanıdık siluette. Sol yanda uzanan emzik, ikonu sola, kapıdan içeri davet eden bir jest yapar.')}
 {item('2','İnce belli bardak = kum saati','Çaydanlığın karnına oyulmuş bardak, ters çevirince bir kum saatidir: “Çay acele sevmez.” fikrinin tek çizgisi. Renkli sürümde çay rengine boyanır.')}
 {item('3','Topuz ve damla','Kapağın topuzu ile kelime logosundaki i\'nin kırmızı noktası aynı yuvarlağı tekrarlar; ikon ile isim birbirini gözle bulur.')}
 <div style="border-top:1px solid rgba(43,24,16,.18)"></div>
</div>'''
    return '02 · Logo',body,'',True

def p_ana():
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">02 — Ana logo</div>
 <div class="h-l" style="margin-top:12px;font-size:54px">Bir ikon, bir isim.</div></div>
<div class="abs" style="left:64px;top:196px;width:650px;height:520px;background:var(--beyaz);border-radius:8px;display:flex;align-items:center;justify-content:center">
  {logo('ana','renkli',w=470)}</div>
<div class="abs" style="left:750px;top:196px;width:309px">
 <div class="lab" style="color:var(--kirmizi)">Ne zaman?</div>
 <div class="body" style="margin-top:8px"><p>Ana logo, markanın imzasıdır: ambalajın ön yüzü, dükkân camı, kılavuzlar, sunumlar ve tanıtım materyalleri için birinci tercih.</p></div>
 <div class="hr" style="margin:22px 0"></div>
 <div class="lab" style="color:var(--kirmizi)">Öğeler</div>
 <div class="body" style="margin-top:8px;font-size:12.4px">
  <p><b>İkon</b> — çift katlı çaydanlık ve ince belli bardak.</p>
  <p><b>Kelime logosu</b> — özel çizilmiş küçük harfli “demlik”, kırmızı damla noktalı i.</p>
  <p><b>Tanıtıcı satır</b> — “Çay dükkânı & atölyesi”, Noto Sans Bold, geniş aralıklı büyük harf.</p></div>
 <div class="hr" style="margin:22px 0"></div>
 <div class="small">Dosya: <span class="mono">logo/demlik-ana-renkli.svg</span></div>
</div>'''
    return '02 · Logo',body,'',True

def p_wordmark():
    o,cx,minx,maxx=wordmark_geom()
    s=0.245; x0=64; y0=365
    wg,wb=wordmark_group(C['koyu'],C['kirmizi'])
    W=(maxx-minx)*s
    # detail circle for the dot
    dotx=x0+(cx-minx)*s; doty=y0-706*s
    ann=f'''<line x1="{x0}" x2="{x0+W}" y1="{y0}" y2="{y0}" stroke="#BC3C17" stroke-width="1"/>
    <line x1="{x0}" x2="{x0+W}" y1="{y0-546*s}" y2="{y0-546*s}" stroke="#BC3C17" stroke-width="1" stroke-dasharray="3 4"/>
    <line x1="{x0}" x2="{x0+W}" y1="{y0-760*s}" y2="{y0-760*s}" stroke="#BC3C17" stroke-width="1" stroke-dasharray="3 4"/>
    <circle cx="{dotx:.1f}" cy="{doty:.1f}" r="{84*s+12:.1f}" fill="none" stroke="#BC3C17" stroke-width="1.2"/>
    <text x="{x0+W+8}" y="{y0+3}" font-size="9.5" font-weight="700" letter-spacing="1.6" fill="#BC3C17" font-family="Noto Sans">TABAN ÇİZGİSİ</text>
    <text x="{x0+W+8}" y="{y0-546*s+3}" font-size="9.5" font-weight="700" letter-spacing="1.6" fill="#BC3C17" font-family="Noto Sans">X YÜKSEKLİĞİ</text>
    <text x="{x0+W+8}" y="{y0-760*s+3}" font-size="9.5" font-weight="700" letter-spacing="1.6" fill="#BC3C17" font-family="Noto Sans">ASANDER</text>'''
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">02 — Kelime logosu</div></div>
<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">
 <g transform="translate({x0-minx*s:.2f} {y0}) scale({s})">{wg}</g>{ann}</svg>
<div class="abs" style="left:64px;top:452px;width:960px;display:flex;gap:36px">
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">Çizim</div><div class="body" style="margin-top:8px;font-size:12.4px">Noto Serif Display Black Italic iskeletinden, harf harf yeniden aralıklandırılmış ve dış hatlara çevrilmiştir. Yüksek kontrastlı, eğik kesim; el yazısı etiketin sıcaklığını ve matbaa harfinin ciddiyetini birleştirir.</div></div>
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">Kırmızı damla</div><div class="body" style="margin-top:8px;font-size:12.4px">i'nin noktası nokta değil, bir damladır: yuvarlak, biraz büyük, Çay Kırmızısı. Tek renkli kullanımlarda logonun geri kalanıyla aynı renge döner.</div></div>
 <div style="flex:1"><div class="lab" style="color:var(--kirmizi)">Kural</div><div class="body" style="margin-top:8px;font-size:12.4px">Kelime logosu yazılmaz, yerleştirilir: her zaman dosyadan. Aynı yazı tipiyle “demlik” yazmak logo değildir. Küçük boyutta (20 mm altı) kelime logosu yerine ikon ya da bardak işareti kullanılır.</div></div>
</div>
<div class="abs" style="left:64px;bottom:76px;display:flex;gap:26px;align-items:flex-end">
 <div style="text-align:center">{logo('kelime','renkli',w=150)}<div class="small" style="margin-top:8px">Renkli</div></div>
 <div style="text-align:center">{logo('kelime','siyah',w=150)}<div class="small" style="margin-top:8px">Siyah</div></div>
 <div style="text-align:center;background:var(--koyu);padding:10px 14px;border-radius:5px">{logo('kelime','ters',w=122)}<div class="small" style="margin-top:6px;color:var(--krem)">Ters</div></div>
</div>'''
    return '02 · Logo',body,'',True

def p_family():
    def tile(nm,sch,w,label,file,bg='var(--beyaz)',fg='',ht=None):
        return f'<div style="background:{bg};border-radius:6px;display:flex;flex-direction:column;justify-content:space-between;padding:16px 18px 12px;{ht or ""}"><div style="flex:1;display:flex;align-items:center;justify-content:center">{logo(nm,sch,w=w)}</div><div style="margin-top:10px;{fg}"><div class="lab" style="font-size:9px;color:var(--kirmizi)">{label}</div><div class="small" style="font-size:9.6px;margin-top:2px;opacity:.75">{file}</div></div></div>'
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">02 — Logo ailesi</div></div>
<div class="abs" style="left:64px;top:118px;width:995px;height:600px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:310px 1fr;gap:14px">
 {tile('ana','renkli',225,'Ana logo','ana · birinci tercih')}
 {tile('ana-slogan','renkli',225,'Sloganlı ana logo','ana-slogan · kampanya, ilan')}
 {tile('yatay','renkli',360,'Yatay logo','yatay · tabela, üst bilgi, kâğıt başlığı','var(--beyaz)','',"grid-column:span 2")}
 {tile('kelime','renkli',300,'Kelime logosu','kelime · dar ve uzun alanlar, alt bilgi, bardak bandı','var(--beyaz)','',"grid-column:span 2")}
 {tile('ikon','renkli',150,'İkon','ikon · ambalaj, damga, desen')}
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">{tile('rozet','renkli',70,'Rozet','rozet · profil, kaşe')}{tile('bardak','renkli',70,'Bardak','bardak · 16–32 px')}</div>
</div>'''
    return '02 · Logo',body,'',True

def p_grounds():
    def t(bg,nm,sch,label,fg,w=180,ext=''):
        return f'<div style="background:{bg};border-radius:6px;position:relative;display:flex;align-items:center;justify-content:center;{ext}">{logo(nm,sch,w=w)}<div class="lab" style="position:absolute;left:14px;bottom:11px;font-size:8.5px;color:{fg};opacity:.85">{label}</div></div>'
    body=f'''
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">02 — Zemin ve renk sürümleri</div>
 <div class="body" style="margin-top:10px;max-width:640px">Zemin ne kadar açıksa logo o kadar koyu; ne kadar koyuysa o kadar açık olur. Her zemin için tek bir doğru dosya vardır.</div></div>
<div class="abs" style="left:64px;top:190px;width:995px;height:520px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:12px">
 {t('var(--krem)','ana','renkli','Krem · renkli','var(--koyu)')}
 {t('var(--beyaz)','ana','renkli','Beyaz · renkli','var(--koyu)')}
 {t('var(--koyu)','ana','ters','Koyu kahve · ters','var(--krem)')}
 {t('var(--kirmizi)','ana','beyaz','Çay kırmızısı · beyaz','#fff')}
 {t('var(--amber)','ana','kahve','Kehribar · koyu tek renk','var(--koyu)')}
 {t('var(--yesil)','ana','ters','Karadeniz yeşili · ters','var(--krem)')}
 {t('var(--mur)','ana','ters','Akşam mürdümü · ters','var(--krem)')}
 {t('var(--bergamot)','ana','kahve','Bergamot · koyu tek renk','var(--koyu)')}
</div>'''
    return '02 · Logo',body,'',True
