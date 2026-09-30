"""rapor.html üretici — metrics.json + grafik.py -> ../rapor.html (tek dosya, dış bağımlılık yok)."""
import json
from grafik import *

M = json.load(open('metrics.json', encoding='utf-8'))
Y = M['yil']
AY = [a['ad'] for a in M['aylik']]
AYL = M['aylik']

CSS = """
:root{--ink:#1E2B27;--muted:#66706B;--line:#E4DED2;--paper:#FAF7F2;--green:#1F5A45;--greenl:#DCE9E1;--copper:#C1662B;--copperl:#F6E6D8;--red:#B23A2E;--redl:#F5DEDA;--blue:#3B6E9E}
*{box-sizing:border-box;margin:0;padding:0}
html{background:#DAD6CC}
body{font-family:'Noto Sans','Segoe UI',system-ui,sans-serif;color:var(--ink);font-size:13px;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-variant-numeric:tabular-nums}
.serif{font-family:'Noto Serif','Georgia',serif}
.page{width:297mm;height:210mm;position:relative;background:var(--paper);padding:15mm 15mm 13mm;overflow:hidden;margin:0 auto;break-after:page;page-break-after:always}
@media screen{.page{margin:22px auto;box-shadow:0 6px 30px rgba(30,43,39,.22)}
 @media (max-width:1180px){.page{zoom:.88}}@media (max-width:1030px){.page{zoom:.76}}@media (max-width:900px){.page{zoom:.64}}
 @media (max-width:760px){.page{zoom:.52}}@media (max-width:620px){.page{zoom:.42}}@media (max-width:500px){.page{zoom:.33}}}
@page{size:297mm 210mm;margin:0}
@media print{html{background:none}.page{margin:0;box-shadow:none}}
.run{position:absolute;left:15mm;right:15mm;top:7.5mm;display:flex;justify-content:space-between;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.run b{color:var(--green)}
.foot{position:absolute;left:15mm;right:15mm;bottom:6mm;display:flex;justify-content:space-between;font-size:10px;color:#8A918D}
.kicker{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--copper);font-weight:700;margin-bottom:4px}
h1{font-family:'Noto Serif','Georgia',serif;font-size:27px;line-height:1.16;font-weight:700;letter-spacing:-.01em;max-width:960px;margin-bottom:6px}
.lede{font-size:13.5px;color:#46514C;max-width:930px;margin-bottom:14px}
.grid{display:grid;gap:18px}
.card{background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.card h3{font-size:12px;font-weight:700;color:var(--ink);margin-bottom:2px}
.card .cap{font-size:11px;color:var(--muted);margin-bottom:6px}
.stat{padding:12px 14px;border-radius:10px;background:#fff;border:1px solid var(--line)}
.stat .n{font-family:'Noto Serif',serif;font-weight:700;font-size:28px;line-height:1.1;color:var(--green)}
.stat .l{font-size:11.5px;color:var(--muted);margin-top:2px}
.stat.red .n{color:var(--red)}.stat.cop .n{color:var(--copper)}
.note{border-left:4px solid var(--copper);background:var(--copperl);padding:9px 13px;border-radius:0 8px 8px 0;font-size:12.5px}
.note.g{border-color:var(--green);background:var(--greenl)}.note.r{border-color:var(--red);background:var(--redl)}
.note b{font-weight:700}
ul.t{list-style:none}ul.t li{padding-left:16px;position:relative;margin-bottom:5px}ul.t li:before{content:'';position:absolute;left:2px;top:.62em;width:6px;height:6px;border-radius:50%;background:var(--copper)}
.legend{display:flex;gap:14px;flex-wrap:wrap;font-size:11px;color:var(--muted);margin-top:4px}
.legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:5px;vertical-align:-1px}
table.tb{border-collapse:collapse;width:100%;font-size:11.5px}
table.tb th{font-weight:600;color:var(--muted);text-align:right;padding:5px 8px;border-bottom:1.5px solid var(--ink);font-size:10.5px;text-transform:uppercase;letter-spacing:.05em}
table.tb th:first-child,table.tb td:first-child{text-align:left}
table.tb td{padding:6px 8px;border-bottom:1px solid var(--line);text-align:right}
table.tb tr.hl td{background:var(--copperl);font-weight:600}
.num{font-weight:700}
.pos{color:#2E8B57}.neg{color:var(--red)}
.chip{display:inline-block;padding:1px 8px;border-radius:99px;font-size:10.5px;font-weight:700;background:var(--greenl);color:var(--green)}
.chip.r{background:var(--redl);color:var(--red)}.chip.c{background:var(--copperl);color:var(--copper)}
.find{display:grid;grid-template-columns:30px 1fr;gap:10px;margin-bottom:15px}
.find .no{width:26px;height:26px;border-radius:50%;background:var(--ink);color:#fff;font-weight:700;font-size:12.5px;display:flex;align-items:center;justify-content:center;margin-top:2px}
.find div>b:first-child{display:block;font-size:13.5px}.find b{font-weight:700}.find span{font-size:12.8px;color:#46514C}
svg text{font-variant-numeric:tabular-nums}
#tipbox{position:fixed;pointer-events:none;background:#1E2B27;color:#fff;font-size:12px;padding:5px 9px;border-radius:6px;opacity:0;transition:opacity .08s;z-index:9;max-width:260px}
@media print{#tipbox{display:none}}
/* kapak */
.cover{background:#12352A;color:#F3EEE3;padding:0}
.cover .in{position:absolute;left:18mm;right:18mm;top:18mm}
.cover .kick{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#E3A857;font-weight:700}
.cover h1c{display:block;font-family:'Noto Serif',serif;font-size:56px;line-height:1.05;font-weight:700;margin:16px 0 14px;max-width:820px;letter-spacing:-.015em}
.cover p{font-size:16px;color:#C9D6CE;max-width:640px}
.hero{display:flex;gap:44px;margin-top:34px}
.hero div b{display:block;font-family:'Noto Serif',serif;font-size:44px;line-height:1;color:#fff}
.hero div span{font-size:12.5px;color:#A9BDB2;display:block;margin-top:6px;max-width:230px}
.hero div.k b{color:#E3A857}
.cover .bar{position:absolute;left:18mm;right:18mm;bottom:24mm}
.cover .capt{position:absolute;left:18mm;right:18mm;bottom:12mm;display:flex;justify-content:space-between;font-size:11px;color:#8FA79A;letter-spacing:.06em}
table.plan{border-collapse:collapse;width:100%;font-size:11.6px}
table.plan th{text-align:left;font-size:10.3px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);padding:5px 8px;border-bottom:1.5px solid var(--ink)}
table.plan td{padding:7px 8px;border-bottom:1px solid var(--line);vertical-align:top}
table.plan td.p{font-weight:700;font-family:'Noto Serif',serif;font-size:17px;color:var(--copper);width:26px}
table.plan td b{font-weight:700}
.when{font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:99px;white-space:nowrap;display:inline-block}
.w1{background:var(--redl);color:var(--red)}.w2{background:var(--copperl);color:var(--copper)}.w3{background:var(--greenl);color:var(--green)}
"""

JS = """
(function(){var b=document.createElement('div');b.id='tipbox';document.body.appendChild(b);
document.addEventListener('mousemove',function(e){var t=e.target.closest&&e.target.closest('[data-tip]');
if(t){b.textContent=t.getAttribute('data-tip');b.style.opacity=1;b.style.left=Math.min(e.clientX+14,innerWidth-270)+'px';b.style.top=(e.clientY+16)+'px'}else{b.style.opacity=0}});})();
"""

pages = []
TOTAL = 15


def page(no, section, body, cls=''):
    pages.append(f'''<section class="page {cls}"><div class="run"><span><b>Demlik</b> · 2025 Yönetim Raporu</span><span>{esc(section)}</span></div>
{body}<div class="foot"><span>Kaynak: demlik-satis-2025.xlsx · 8.624 tekil sipariş · tutarlar TL</span><span>{no} / {TOTAL}</span></div></section>''')


def head(kicker, title, lede=''):
    return f'<div class="kicker">{esc(kicker)}</div><h1>{title}</h1>' + (f'<p class="lede">{lede}</p>' if lede else '')


def legend(items):
    return '<div class="legend">' + ''.join(f'<span><i style="background:{c}"></i>{esc(n)}</span>' for n, c in items) + '</div>'


# ------------------------------------------------------------------ 1 KAPAK
daily = M['bardak_gunluk']  # yer tutucu; günlük toplam sipariş aşağıda yüklenecek
import pandas as pd, numpy as np
from analiz import yukle, hazirla
ham, g = yukle(); D = hazirla(ham)
gun = D.groupby('tarih').size().reindex(pd.date_range('2025-01-01', '2025-12-31'), fill_value=0)
W, H = 1000, 290
mx = gun.max()
bars = []
bw = (W) / 365
for i, (dt, v) in enumerate(gun.items()):
    hh = 8 + (H - 30) * (v / mx)
    mfrac = dt.month
    col = '#E3A857' if v >= 33 else ('#8DBB9C' if v >= 18 else '#4E8A73')
    bars.append(f'<rect x="{i * bw + 0.5:.2f}" y="{H - 22 - hh:.1f}" width="{bw - 1.2:.2f}" height="{hh:.1f}" fill="{col}" rx="1" data-tip="{dt.day}.{dt.month:02d}.2025 · {v} sipariş"/>')
lab = ''.join(f'<text x="{(pd.Timestamp(2025, m, 1).dayofyear - 1) * bw:.1f}" y="{H - 4}" fill="#8FA79A" font-size="11" font-family="Noto Sans">{AY[m - 1]}</text>' for m in range(1, 13))
cover_svg = f'<svg viewBox="0 0 {W} {H}" width="100%" role="img" aria-label="Günlük sipariş sayısı, 2025">{"".join(bars)}{lab}</svg>'
pages.append(f'''<section class="page cover"><div class="in"><div class="kick">Demlik · Yönetim Raporu</div>
<h1c>2025 satış yılı:<br>ciro güçlü, kâr ince.</h1c>
<p>8.624 sipariş, 4 satış kanalı, 6 ürün ve 12 aylık gider tablosundan çıkan bulgular, sorunlar ve somut öneriler. İşletme sahibi için hazırlandı.</p>
<div class="hero"><div><b>{sayi(Y['net'] / 1e6, 2)} mn</b><span>TL net satış (iadeler düşülmüş)</span></div>
<div><b>{sayi(Y['siparis'])}</b><span>sipariş · ortalama sepet {sayi(Y['sepet'])} TL</span></div>
<div class="k"><b>{sayi(Y['kar'] / 1e3, 1)} bin</b><span>TL net kâr · her 100 TL'nin {sayi(Y['marj'], 1)} TL'si</span></div></div></div>
<div class="bar">{cover_svg}</div>
<div class="capt"><span>HER ÇUBUK BİR GÜN · YÜKSEKLİK = O GÜNKÜ SİPARİŞ SAYISI · SARI = EN YOĞUN GÜNLER</span><span>1 OCAK – 31 ARALIK 2025</span></div></section>''')

# ------------------------------------------------------------------ 2 ÖZET
t = M['trendyol_iade']; ti = M['trendyol_indirim']; bd = M['bardak']; K = {k['kanal']: k for k in M['kanal']}
kpi = f'''<div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:14px">
<div class="stat"><div class="n">{sayi(Y['net'] / 1e6, 2)} mn</div><div class="l">Net satış (TL) — iadeler düşülmüş</div></div>
<div class="stat"><div class="n">{sayi(Y['siparis'])}</div><div class="l">Sipariş · ort. sepet {sayi(Y['sepet'])} TL</div></div>
<div class="stat cop"><div class="n">{sayi(Y['kar'] / 1e3, 1)} bin</div><div class="l">Net kâr (TL) · marj %{sayi(Y['marj'], 1)}</div></div>
<div class="stat red"><div class="n">%{sayi(Y['iade_oran'], 1)}</div><div class="l">İade oranı · Trendyol %{sayi(K['Trendyol']['iade_oran'], 1)}</div></div></div>'''
finds = [
    ('Kâr yalnız kışın kazanılıyor.', f"Oca, Şub, Kas, Ara: <b>+{kisa(M['kis']['kar_ay_kar'])} TL</b>. Diğer 8 ay: <b>{kisa(M['kis']['zarar_ay_zarar'])} TL</b>. Başabaş noktası aylık ≈{kisa(Y['basabas_aylik'])} TL net satış; Nis–Ağu ortalaması {kisa(M['kis']['yaz_ort'])} TL."),
    ('Bardak satışı 2 ay durdu.', f"1 Nis–31 May'da günlük sipariş {sayi(bd['mart_gunluk'], 1)} → {sayi(bd['nis_may_gunluk'], 1)}. Aynı dönemde Demlik Seti normal: talep değil, arz/listeleme sorunu. ≈<b>{kisa(bd['kayip_ciro'])} TL ciro</b> kaybı."),
    ('Trendyol iadeleri 18 Ağustos\'ta fırladı.', f"%{sayi(t['once18'], 0)} → %{sayi(t['sonra18'], 0)}, tüm ürünlerde aynı anda; diğer kanallar %{sayi(t['diger_sonra'], 1)}'da sabit. ≈<b>{kisa(t['fazla_iade_ciro'])} TL ciro</b> fazladan geri gitti."),
    ('Trendyol\'da indirim kalıcı hâle gelmiş.', f"Siparişlerin %{sayi(ti['pay_siparis'], 0)}{ek(ti['pay_siparis'], 0, 'p3')} indirimli ({kisa(ti['indirim_tl'])} TL) ama indirimli siparişte sepet büyümüyor. 100 TL liste fiyatından Mağaza {sayi(K['Mağaza']['katki_liste'], 0)}, Trendyol {sayi(K['Trendyol']['katki_liste'], 0)} TL bırakıyor."),
    ('Çay, online\'da kargoya yeniyor.', f"Online çay siparişi ort. {sayi(M['cay_online']['sepet'], 0)} TL; kargo 38–45 TL = <b>%{sayi(M['cay_online']['kargo_oran'], 1)}</b>. Ciroyu ise ekipman taşıyor: %{sayi(M['kategori']['Ekipman']['pay'], 0)}."),
]
recs = [
    ('Bardak için asgari stok + yeniden sipariş noktası koy.', f"≈{kisa(bd['kayip_katki'])} TL/yıl"),
    ('Trendyol iade nedenlerini çek; Ağustos\'ta neyin değiştiğini bul.', f"≈{kisa(t['fazla_iade_katki'])} TL/yıl"),
    ('Fiyat listesini %3 güncelle (12 aydır sabit).', f"≈{kisa(M['fiyat']['senaryo_kar'])} TL/yıl"),
    ('Nis–Ağu için yaz ürünü/etkinlik planı yap; sabit gideri mevsime göre esnet.', 'yaz cirosu +%10 → ≈86 bin'),
    ('Trendyol indirimini 4 haftalık testle kampanya günlerine çek.', f"test: başabaş kayıp %{sayi(ti['basabas_kayip_oran'], 0)}"),
]
body = head('Yönetici özeti', f"Ciro {sayi(Y['net'] / 1e6, 1)} milyon TL, ama yılın kârı yalnızca {sayi(Y['kar'] / 1e3, 0)} bin TL.",
            'Kâr dört kış ayında birikiyor; kalan sekiz ay sabit giderler satışı geride bırakıyor. Üstüne iki çözülebilir sorun var: bardak satışının durduğu 2 ay ve Ağustos\'tan sonra Trendyol iadeleri.') + kpi
body += '<div class="grid" style="grid-template-columns:1.32fr 1fr;gap:26px"><div><div class="kicker" style="color:var(--ink)">5 ana bulgu</div>'
for i, (a, b) in enumerate(finds, 1):
    body += f'<div class="find"><div class="no">{i}</div><div><b>{a}</b><span>{b}</span></div></div>'
body += '</div><div><div class="kicker" style="color:var(--green)">5 öneri ve yıllık etkisi</div><div class="card" style="padding:6px 14px">'
for i, (a, b) in enumerate(recs, 1):
    body += f'<div style="display:grid;grid-template-columns:22px 1fr;gap:8px;padding:8px 0;{"border-top:1px solid var(--line)" if i > 1 else ""}"><div style="font-family:Noto Serif,serif;font-weight:700;color:var(--copper);font-size:16px">{i}</div><div><div style="font-size:12.5px;font-weight:600">{a}</div><span class="chip">{b}</span></div></div>'
body += f'''</div><div class="note" style="margin-top:10px"><b>Toplam potansiyel:</b> bardak stoku, Trendyol iadesi, fiyat güncellemesi ve kargo pazarlığı birlikte yıllık kârı ≈{kisa(M['kopru_toplam'])} TL'ye taşıyabilir (bugün {kisa(Y['kar'])}). Varsayımlar 13. sayfada.</div></div></div>'''
page(2, 'Yönetici özeti', body)

# ------------------------------------------------------------------ 3 YIL / KÂR
net = [a['net'] for a in AYL]; kar = [a['kar'] for a in AYL]
col_net = [GREEN if k > 0 else COPPER for k in kar]
top = bars_v(AY, net, w=650, h=250, colors=col_net, lo=0, hi=760000, ticks=[0, 200000, 400000, 600000], b=6, t=22, show_cats=False,
             hline=Y['basabas_aylik'], hline_label=f'başabaş ≈ {kisa(Y["basabas_aylik"])}', hline_x=330, label_fmt=lambda v: sayi(v / 1e3, 0), title='Aylık net satış',
             tips=[f'{a["ad"]}: net satış {sayi(a["net"])} TL' for a in AYL])
bot = bars_v(AY, kar, w=650, h=205, colors=[GREEN if k > 0 else RED for k in kar], lo=-130000, hi=190000, ticks=[-100000, 0, 100000],
             t=10, b=28, label_fmt=lambda v: ('+' if v > 0 else '') + sayi(v / 1e3, 0), title='Aylık net kâr',
             tips=[f'{a["ad"]}: kâr {sayi(a["kar"])} TL' for a in AYL], bold_idx=(0, 1, 10, 11))
body = head('Yıl bir bakışta', 'Kâr kışın kazanılıyor, yazın sabit giderler yiyor.',
            f"4 ay kâr etti (+{kisa(M['kis']['kar_ay_kar'])} TL), 8 ay zarar yazdı ({kisa(M['kis']['zarar_ay_zarar'])} TL). Yıl sonunda geriye {kisa(Y['kar'])} TL kaldı.")
body += f'''<div class="grid" style="grid-template-columns:690px 1fr;gap:22px"><div class="card"><h3>Aylık net satış (bin TL)</h3><div class="cap">Yeşil = o ay kâr etti · Bakır = zarar etti</div>{top}
<h3 style="margin-top:8px">Aylık net kâr (bin TL)</h3><div class="cap">Net satış − kargo − hammadde − kira − personel − pazarlama</div>{bot}</div>
<div style="display:flex;flex-direction:column;gap:12px">
<div class="stat"><div class="n">≈{kisa(Y['basabas_aylik'])}</div><div class="l">Aylık başabaş net satış (TL)</div></div>
<div class="stat red"><div class="n">{kisa(M['kis']['yaz_ort'])}</div><div class="l">Nis–Ağu aylık net satış ortalaması — başabaşın %{sayi(M['kis']['yaz_ort'] / Y['basabas_aylik'] * 100, 0)}{ek(M['kis']['yaz_ort'] / Y['basabas_aylik'] * 100, 0, 'p3')}</div></div>
<div class="stat"><div class="n">%{sayi(M['kis']['kar_ay_net_pay'], 0)}</div><div class="l">Net satışın neredeyse yarısı 4 kış ayında yapılıyor</div></div>
<div class="note g"><b>Başabaş nasıl hesaplandı?</b> Her 100 TL net satıştan hammadde (32) ve kargo ({sayi(Y['kargo_oran'], 1)}) çıkınca <b>{sayi(Y['katki_orani'] * 100, 1)} TL</b> kalıyor. Sabit gider: kira + personel {kisa(Y['sabit_aylik'])} TL/ay, ort. pazarlama {kisa(Y['pazarlama'] / 12, 1)} TL/ay. ({kisa(Y['sabit_aylik'] + Y['pazarlama'] / 12, 1)} ÷ 0,634 ≈ {kisa(Y['basabas_aylik'])})</div>
<div class="note"><b>Ne demek?</b> Yaz (Nis–Ağu) satışı %10 artarsa ≈ {kisa(M['kis']['yaz_toplam'] * 0.10 * Y['katki_orani'])} TL ek kâr gelir: sabit gider zaten ödendiği için artan satışın %63'ü doğrudan kâra yazılır.</div></div></div>'''
page(3, 'Yıl bir bakışta', body)

# ------------------------------------------------------------------ 4 PARA YOLCULUĞU
items = [('Liste\nfiyatı', Y['brut'], 'total'), ('İndirim', -Y['indirim'], 'delta'), ('İade', -Y['iade_tutar'], 'delta'), ('Net\nsatış', Y['net'], 'total'),
         ('Hammadde', -Y['hammadde'], 'delta'), ('Kargo', -Y['kargo'], 'delta'), ('Kira', -Y['kira'], 'delta'), ('Personel', -Y['personel'], 'delta'),
         ('Pazarlama', -Y['pazarlama'], 'delta'), ('Kâr', Y['kar'], 'total')]
wf = waterfall(items, w=660, h=400, t=30, b=46, title='Liste fiyatından kâra')
per = lambda v: v / Y['net'] * 100
segs = [('Hammadde', '#B5651D'), ('Kargo', '#E3A857'), ('Kira', '#2F8F9D'), ('Personel', '#1F5A45'), ('Pazarlama', '#9A4C8B'), ('Kâr', COPPER)]
vals = [per(Y['hammadde']), per(Y['kargo']), per(Y['kira']), per(Y['personel']), per(Y['pazarlama']), per(Y['kar'])]
st = stack_h([('100 TL', vals)], segs, w=330, row_h=48, l=4, r=4, bar_h=34, min_label=4)
lst = ''.join(f'<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid var(--line);font-size:12px"><span><i style="display:inline-block;width:10px;height:10px;border-radius:2px;background:{c};margin-right:7px"></i>{n}</span><b>{sayi(v, 1)} TL</b></div>' for (n, c), v in zip(segs, vals))
sabit_pay = (Y['kira'] + Y['personel']) / Y['net'] * 100
body = head('Paranın yolculuğu', f'Her 100 TL net satışın {sayi(sabit_pay, 0)} TL\'si kira ve personele gidiyor.',
            f"Liste fiyatı üzerinden bakınca indirim ve iadeler %{sayi((Y['indirim'] + Y['iade_tutar']) / Y['brut'] * 100, 1)} götürüyor; asıl yük satıştan bağımsız olan sabit giderler.")
body += f'''<div class="grid" style="grid-template-columns:690px 1fr;gap:22px"><div class="card"><h3>Liste fiyatı → net kâr (TL)</h3><div class="cap">2025 toplamı · kırmızı = kesinti · turuncu = geriye kalan kâr</div>{wf}</div>
<div style="display:flex;flex-direction:column;gap:12px"><div class="card"><h3>100 TL net satış nereye gidiyor?</h3><div class="cap">Pay (TL)</div>{st}{lst}</div>
<div class="note r"><b>Sabit gider ağırlığı:</b> aylık {kisa(Y['sabit_aylik'])} TL kira + personel satış ne olursa olsun ödeniyor. Nisan'da net satışın %{sayi(Y['sabit_aylik'] / AYL[3]['net'] * 100, 0)}{ek(Y['sabit_aylik'] / AYL[3]['net'] * 100, 0, 'p3')}, Temmuz'da %{sayi(Y['sabit_aylik'] / AYL[6]['net'] * 100, 0)}{ek(Y['sabit_aylik'] / AYL[6]['net'] * 100, 0, 'p3')} bu iki kaleme gitti.</div>
<div class="note"><b>Hammadde her ay tam %32.</b> Sapma yok: rakam büyük olasılıkla gerçek fatura değil, satışa oranlanmış tahmin. Gerçek kâr için hammaddeyi fatura bazında izlemek gerek (15. sayfa).</div></div></div>'''
page(4, 'Paranın yolculuğu', body)

# ------------------------------------------------------------------ 5 KANAL
segsk = [('İndirim', '#E9C9A6'), ('İade', '#C85A48'), ('Kargo', '#E3A857'), ('Hammadde', '#B5651D'), ('Geriye kalan (katkı)', GREEN)]
rows = []
for k in ['Mağaza', 'Instagram DM', 'Web sitesi', 'Trendyol']:
    x = K[k]; b = x['brut']
    rows.append((k, [x['indirim'] / b * 100, x['iade_tutar'] / b * 100, x['kargo'] / b * 100, x['hammadde'] / b * 100, x['katki'] / b * 100]))
sk = stack_h(rows, segsk, w=610, row_h=52, l=110, r=8, bar_h=32, min_label=3.6)
hb = hbars([(k, K[k]['net'], f"{k}: {sayi(K[k]['net'])} TL") for k in ['Mağaza', 'Trendyol', 'Web sitesi', 'Instagram DM']], w=380, l=98, r=64, row_h=32,
           colors=[KANAL_RENK[k] for k in ['Mağaza', 'Trendyol', 'Web sitesi', 'Instagram DM']], val_fmt=lambda v: kisa(v), title='Kanal net satış', bar_h=18)
tb = '<table class="tb"><tr><th>Kanal</th><th>Sipariş</th><th>Sepet</th><th>İade</th><th>İndirim</th><th>Katkı / sipariş</th></tr>'
for k in ['Mağaza', 'Instagram DM', 'Web sitesi', 'Trendyol']:
    x = K[k]
    tb += f'<tr class="{"hl" if k == "Trendyol" else ""}"><td>{k}</td><td>{sayi(x["siparis"])}</td><td>{sayi(x["sepet"])} TL</td><td>%{sayi(x["iade_oran"], 1)}</td><td>%{sayi(x["indirim_oran"], 1)}</td><td><b>{sayi(x["katki_siparis"])} TL</b></td></tr>'
tb += '</table>'
body = head('Satış kanalları', 'Mağaza lider; Trendyol büyük ama her siparişte en az kazandıran kanal.',
            f"Trendyol net satışta %{sayi(K['Trendyol']['pay'], 0)} paya sahip ama sipariş başına katkısı Mağaza'dan %{sayi((1 - K['Trendyol']['katki_siparis'] / K['Mağaza']['katki_siparis']) * 100, 0)} düşük. Bu hesapta Trendyol komisyonu yok; eklenirse fark açılır.")
body += f'''<div class="grid" style="grid-template-columns:640px 1fr;gap:20px"><div style="display:flex;flex-direction:column;gap:14px">
<div class="card"><h3>100 TL liste fiyatının yolu</h3><div class="cap">Bir kanalda 100 TL'lik liste fiyatından ne kadar kesinti olup ne kalıyor (TL)</div>{sk}{legend(segsk)}</div>
<div class="card" style="padding-bottom:8px">{tb}</div></div>
<div style="display:flex;flex-direction:column;gap:14px"><div class="card"><h3>Net satış (TL)</h3><div class="cap">İade düşülmüş</div>{hb}</div>
<div class="note"><b>Instagram DM küçük ama verimli:</b> indirimsiz, iadesi düşük, sepeti en büyük ({sayi(K['Instagram DM']['sepet'])} TL) ve sipariş başına en iyi ikinci katkı ({sayi(K['Instagram DM']['katki_siparis'])} TL). Payı yalnızca %{sayi(K['Instagram DM']['pay'], 0)}.</div>
<div class="note r"><b>Trendyol'un 3 kesintisi:</b> indirim %{sayi(K['Trendyol']['indirim_oran'], 1)}, iade %{sayi(K['Trendyol']['iade_oran'], 1)} (diğerleri ≈%3), kargo {sayi(K['Trendyol']['kargo'] / 1000, 0)} bin TL. Komisyon hesaba girmedi.</div></div></div>'''
page(5, 'Satış kanalları', body)

# ------------------------------------------------------------------ 6 TRENDYOL İADE
ser = {k: M['kanal_ay_iade'][k] for k in ['Trendyol', 'Mağaza', 'Web sitesi', 'Instagram DM']}
lc, xs, ax = lines(AY, ser, w=560, h=300, fmt=lambda v: f'%{sayi(v, 0)}', lo=0, hi=20, ticks=[0, 5, 10, 15, 20], title='Kanal bazında aylık iade oranı',
                   widths={'Trendyol': 3.6, 'Mağaza': 1.6, 'Web sitesi': 1.6, 'Instagram DM': 1.6}, marks=[(7, 11, 'Ağu–Ara', '#B23A2E')])
un = t['urun']
short = {'Demlik Seti (el yapımı)': 'Demlik Seti', 'İnce Belli Bardak 6lı': 'Bardak 6lı', 'Karadeniz Sabahı 250g': 'Karadeniz Sabahı', 'Adaçaylı Bergamot 100g': 'Adaçaylı Bergamot', 'Kadıköy Akşamı 250g': 'Kadıköy Akşamı'}
db = dumbbell([(short[u], v[0], v[1]) for u, v in un.items()], w=430, row_h=56, l=128, r=44, hi=22, ticks=(0, 5, 10, 15, 20), title='Ürün bazında Trendyol iade oranı')
body = head('Sorun 1 · Trendyol iadeleri', f"Trendyol'da iade oranı Ağustos ortasında %{sayi(t['once18'], 0)}{ek(t['once18'], 0, 'abl')} %{sayi(t['sonra18'], 0)}{ek(t['sonra18'], 0, 'dat')} sıçradı.",
            f"Tüm ürünlerde aynı anda, yalnız Trendyol'da: diğer kanallarda oran %{sayi(t['diger_once'], 1)} → %{sayi(t['diger_sonra'], 1)}. Ürün kalitesinden çok kanala özgü bir değişiklik gibi duruyor.")
body += f'''<div class="grid" style="grid-template-columns:600px 1fr;gap:18px"><div class="card"><h3>Aylık iade oranı (% sipariş)</h3><div class="cap">Kırmızı bölge: Trendyol'un yüksek iade dönemi</div>{lc}</div>
<div class="card"><h3>Hangi ürün? Hepsi.</h3><div class="cap">Trendyol iade oranı · <span style="color:#8A928E">●</span> Oca–Tem · <span style="color:var(--copper)">●</span> Ağu–Ara</div>{db}
<div class="cap" style="margin-top:6px">Hiçbir üründe fark yok: hepsi %14–18 aralığında; değişiklik ürüne değil kanala ait.</div></div></div>
<div class="grid" style="grid-template-columns:.9fr 1.15fr 1.15fr .9fr;gap:14px;margin-top:14px">
<div class="stat red"><div class="n">≈{kisa(t['fazla_iade_ciro'])} TL</div><div class="l">Yüksek iade yüzünden geri giden ciro (Ağu–Ara, ≈{sayi(t['fazla_iade_adet'], 0)} sipariş) · kâra etkisi ≈{kisa(t['fazla_iade_katki'])} TL</div></div>
<div class="note"><b>Ne biliyoruz?</b> Değişim ≈18 Ağustos'ta başladı: o güne kadar %{sayi(t['once18'], 0)}, sonrası %{sayi(t['sonra18'], 0)}; bir hafta bile normale dönmedi. Kadıköy Akşamı yeni olduğu hâlde %{sayi(M['cay']['kadikoy_iade_trendyol'], 0)}. Mağaza, web ve Instagram etkilenmedi.</div>
<div class="note g"><b>Ne yapmalı?</b> Trendyol panelinden Ağu–Ara <b>iade nedeni kodlarını</b> çek; 18 Ağustos civarında ne değişti (kargo firması, paketleme, ürün fotoğrafı/açıklaması, iade politikası, kampanya)? Hedef: 30 günde %8, 90 günde %4.</div>
<div class="note r"><b>Verideki sınır:</b> iade nedeni sütunu yok; kök neden bu veriden kesinleşmez.</div></div>'''
page(6, 'Sorunlar · Trendyol iadeleri', body)

# ------------------------------------------------------------------ 7 TRENDYOL İNDİRİM
l1, _, _ = lines(AY, {'İndirimli sipariş payı': ti['ay_pay']}, w=440, h=200, fmt=lambda v: f'%{sayi(v, 0)}', lo=0, hi=100, ticks=[0, 25, 50, 75, 100],
                 end_labels=False, widths={'İndirimli sipariş payı': 3}, area={'İndirimli sipariş payı'}, title='Aylık indirimli sipariş payı')
b2 = bars_v(['İndirimsiz', 'İndirimli'], [ti['adet_indirimsiz'], ti['adet_indirimli']], w=250, h=200, colors=['#8A928E', COPPER], lo=0, hi=2.2, ticks=[0, 1, 2],
            fmt=lambda v: sayi(v, 0), label_fmt=lambda v: sayi(v, 2), gap=0.4, t=22, title='Sipariş başına adet')
b3 = bars_v(['İndirimsiz', '%10', '%15'], [ti['iade_indirimsiz'], ti['iade_10'], ti['iade_15']], w=290, h=200, colors=['#8A928E', '#E9A76B', COPPER], lo=0, hi=14, ticks=[0, 5, 10],
            fmt=lambda v: f'%{sayi(v, 0)}', label_fmt=lambda v: f'%{sayi(v, 1)}', gap=0.36, t=22, title='İade oranı, indirim kademesine göre')
du = ti['duyarlilik']
sn, sxs, sax = lines([f'%{x}' for x, _ in du], {'İndirimi yarıya indirmenin kâra etkisi': [v for _, v in du]}, w=600, h=250, fmt=lambda v: kisa(v), lo=-60000, hi=70000,
                 ticks=[-50000, 0, 50000], end_labels=False, widths={'İndirimli sipariş kaybı': 3}, area=None, title='Duyarlılık: kayıp sipariş oranı ve kâr etkisi', markers=True)
sn = sn.replace('stroke="#1F5A45" stroke-width="2"', f'stroke="{COPPER}" stroke-width="3"').replace('fill="#1F5A45" stroke="#fff"', f'fill="{COPPER}" stroke="#fff"')
_x0 = sxs[5] + (ti['basabas_kayip_oran'] - 10) / 2 * (sxs[6] - sxs[5]); _y0 = sax.y(0)
ann = (f'<rect x="{sax.l}" y="{_y0:.1f}" width="{sxs[-1] - sax.l:.1f}" height="{sax.h - sax.b - _y0:.1f}" fill="#B23A2E" opacity="0.06"/>'
       f'<rect x="{sax.l}" y="{sax.t}" width="{sxs[-1] - sax.l:.1f}" height="{_y0 - sax.t:.1f}" fill="#2E8B57" opacity="0.06"/>'
       f'<line x1="{_x0:.1f}" x2="{_x0:.1f}" y1="{sax.t}" y2="{sax.h - sax.b}" stroke="#1E2B27" stroke-dasharray="4 3"/>'
       f'<circle cx="{_x0:.1f}" cy="{_y0:.1f}" r="5.5" fill="#fff" stroke="#1E2B27" stroke-width="2"/>'
       + txt(_x0 + 8, sax.t + 14, f"başabaş: %{sayi(ti['basabas_kayip_oran'], 1)} kayıp", 11, INK, 'start', 700)
       + txt(sax.l + 10, sax.t + 14, 'KÂR ARTAR', 10.5, '#2E8B57', 'start', 700)
       + txt(sax.l + 10, sax.h - sax.b - 8, 'KÂR AZALIR', 10.5, RED, 'start', 700))
sn = sn.replace('</svg>', ann + '</svg>')
body = head('Sorun 2 · Trendyol indirimleri', 'Trendyol\'daki indirim kampanya değil, kalıcı fiyat hâline gelmiş.',
            f"Her ay siparişlerin ≈%{sayi(ti['pay_siparis'], 0)}{ek(ti['pay_siparis'], 0, 'p3')} indirimli; toplam {kisa(ti['indirim_tl'])} TL. Şirketin verdiği tüm indirimin %{sayi(ti['tum_indirim_payi'], 0)}{ek(ti['tum_indirim_payi'], 0, 'p3')} bu kanalda. Sepet büyümüyor, iade azalmıyor.")
body += f'''<div class="grid" style="grid-template-columns:1.2fr .7fr .9fr;gap:14px;margin-bottom:14px">
<div class="card"><h3>Her ay aynı: siparişlerin %66'sı indirimli</h3><div class="cap">Trendyol · indirimli sipariş payı</div>{l1}</div>
<div class="card"><h3>Sepet büyümüyor</h3><div class="cap">Sipariş başına adet</div>{b2}</div>
<div class="card"><h3>İade de azalmıyor</h3><div class="cap">Trendyol · indirim kademesine göre iade %</div>{b3}</div></div>
<div class="grid" style="grid-template-columns:1.25fr 1fr;gap:14px">
<div class="card"><h3>İndirimi yarıya indirsek ne olur?</h3><div class="cap">Yatay: indirimli siparişlerin yüzde kaçı kaybolur · dikey: yıllık kâra etkisi (TL) · başabaş ≈%{sayi(ti['basabas_kayip_oran'], 1)}</div>{sn}</div>
<div style="display:flex;flex-direction:column;gap:12px">
<div class="stat cop"><div class="n">{kisa(ti['indirim_tl'])} TL</div><div class="l">2025'te Trendyol indirimine giden tutar ({sayi(ti['indirimli_sip'])} sipariş, ort. %{sayi(ti['ort_indirim'], 0)})</div></div>
<div class="note g"><b>Öneri:</b> kalıcı indirimi bırakıp <b>kampanya gününe</b> çevir (Kasım kampanyası, ay sonu, yeni ürün lansmanı). İndirimi yarıya indirmek tam kaybı olmazsa {kisa(ti['yarim_kazanc'])} TL geri kazandırır.</div>
<div class="note r"><b>Ama körlemesine kesme:</b> indirimli bir siparişin katkısı ≈{sayi(ti['katki_indirimli_siparis'])} TL. İndirimli siparişlerin %{sayi(ti['basabas_kayip_oran'], 1)}{ek(ti['basabas_kayip_oran'], 1, 'abl')} fazlası kaybolursa kesinti zarar ettirir. 4 hafta A/B testi ile ölç.</div></div></div>'''
page(7, 'Sorunlar · Trendyol indirimleri', body)

# ------------------------------------------------------------------ 8 BARDAK
bh = M['bardak_hafta'][:-1]  # son (3 günlük) eksik hafta çıkarıldı
wk = [x[0][5:].replace('-', '.') for x in bh]
lab_w = [f"{x[0][8:10]}.{x[0][5:7]}" for x in bh]
idx0 = next(i for i, x in enumerate(bh) if x[0] >= '2025-03-31'); idx1 = next(i for i, x in enumerate(bh) if x[0] >= '2025-06-02')
cats = [('' if i % 4 else lab_w[i]) for i in range(len(bh))]
lc2, xs2, ax2 = lines(cats, {'İnce Belli Bardak 6lı': [v for _, v in bh], 'Demlik Seti (el yapımı)': M['demlik_hafta'][:-1]}, w=650, h=310, fmt=lambda v: sayi(v), lo=0, hi=90,
                      ticks=[0, 20, 40, 60, 80], end_labels=False, widths={'İnce Belli Bardak 6lı': 3, 'Demlik Seti (el yapımı)': 2.2}, markers=False,
                      marks=[(idx0, idx1 - 1, '1 Nis – 31 May', '#B23A2E')], title='Haftalık sipariş sayısı', xlabel_every=1)
legb = legend([('İnce Belli Bardak 6lı', URUN_RENK['İnce Belli Bardak 6lı']), ('Demlik Seti (el yapımı)', URUN_RENK['Demlik Seti (el yapımı)'])])
bk = bd['kanal']
kr = [('Mağaza', bk['Mağaza']), ('Trendyol', bk['Trendyol']), ('Web sitesi', bk['Web sitesi']), ('Instagram DM', bk['Instagram DM'])]
tbk = '<table class="tb"><tr><th>Kanal</th><th>Beklenen</th><th>Gerçekleşen</th><th>Fark</th></tr>' + ''.join(
    f'<tr><td>{k}</td><td>{sayi(v["beklenen"])}</td><td>{v["gercek"]}</td><td class="{"neg" if v["gercek"] < v["beklenen"] * 0.6 else ""}"><b>{sayi(v["gercek"] - v["beklenen"])}</b></td></tr>' for k, v in kr) + '</table>'
body = head('Sorun 3 · Bardak satışı durdu', f"İnce Belli Bardak 1 Nisan–31 Mayıs arasında neredeyse hiç satılmadı: yaklaşık {kisa(bd['kayip_ciro'])} TL ciro kaybı.",
            f"Günlük sipariş {sayi(bd['mart_gunluk'], 1)}{ek(bd['mart_gunluk'], 1, 'abl')} {sayi(bd['nis_may_gunluk'], 1)}{ek(bd['nis_may_gunluk'], 1, 'dat')} indi, 2 ay sonra toparlandı. Demlik Seti aynı dönemde normaldi: sorun talepte değil, ürünün satışa hazır olmasında.")
body += f'''<div class="grid" style="grid-template-columns:690px 1fr;gap:20px"><div class="card"><h3>Haftalık sipariş sayısı</h3><div class="cap">Bardak çöküyor; Demlik Seti (aynı kategori) etkilenmiyor</div>{lc2}{legb}</div>
<div style="display:flex;flex-direction:column;gap:12px"><div class="stat red"><div class="n">≈{kisa(bd['kayip_ciro'])} TL</div><div class="l">Kaçan ciro · kâra etkisi ≈{kisa(bd['kayip_katki'])} TL (yıllık kârın {sayi(bd['kayip_katki'] / Y['kar'], 1)} katı)</div></div>
<div class="card" style="padding:8px 12px"><h3>Nisan–Mayıs sipariş sayısı, kanal bazında</h3><div class="cap">Beklenen = Mart ve Temmuz günlük ortalamasının ortası</div>{tbk}</div>
<div class="note"><b>İpucu:</b> Instagram DM'den satış sürdü (24 sipariş); Mağaza, Trendyol ve web'de yaklaşık %90 düştü. Stok bitmiş ya da ürün sayfası/rafı kapanmış gibi.</div>
<div class="note g"><b>Öneri:</b> her ürün için asgari stok günü + yeniden sipariş noktası; tedarikçi gecikme uyarısı; stok bitince alternatif ürün önerisi.</div></div></div>'''
page(8, 'Sorunlar · Bardak stok kesintisi', body)

# ------------------------------------------------------------------ 9 ÜRÜN
U = {u['urun']: u for u in M['urun']}
order = sorted(M['urun'], key=lambda u: -u['net'])
hu = hbars([(u['urun'], u['net'], f"{u['urun']}: {sayi(u['net'])} TL · %{sayi(u['pay'], 1)}") for u in order], w=620, l=178, r=130, row_h=40, bar_h=22, size=12.5,
           colors=[URUN_RENK[u['urun']] for u in order], val_fmt=lambda v: kisa(v), title='Ürün bazında net satış', sub=[f"%{sayi(u['pay'], 1)}" for u in order])
tu = '<table class="tb"><tr><th>Ürün</th><th>Fiyat</th><th>Sipariş</th><th>Sepet</th><th>İade</th><th>Kargo / satış</th></tr>'
for u in order:
    tu += f'<tr><td>{u["urun"]}</td><td>{sayi(u["fiyat"])}</td><td>{sayi(u["siparis"])}</td><td>{sayi(u["sepet"])}</td><td>%{sayi(u["iade_oran"], 1)}</td><td>%{sayi(u["kargo_oran"], 1)}</td></tr>'
tu += '</table>'
kat = M['kategori']
body = head('Ürünler', f"Cironun üçte ikisi ekipmandan geliyor; tek başına Demlik Seti üçte birini yapıyor.",
            f"Çay kategorisi sipariş sayısında önde (%{sayi(kat['Çay']['sip'] / Y['siparis'] * 100, 0)}) ama net satışta yalnız %{sayi(kat['Çay']['pay'], 0)} pay alıyor: çay trafik, ekipman para getiriyor.")
body += f'''<div class="grid" style="grid-template-columns:640px 1fr;gap:20px"><div style="display:flex;flex-direction:column;gap:14px"><div class="card"><h3>Ürün bazında net satış (TL) ve pay</h3><div class="cap">Renk = ürün ailesi: bakır tonları ekipman, yeşil/turkuaz çay, mor deneyim</div>{hu}</div>
<div class="card" style="padding-bottom:8px">{tu}</div></div>
<div style="display:flex;flex-direction:column;gap:12px"><div class="grid" style="grid-template-columns:1fr 1fr;gap:10px"><div class="stat"><div class="n">%{sayi(kat['Ekipman']['pay'], 0)}</div><div class="l">Ekipman payı ({sayi(kat['Ekipman']['sip'])} sipariş)</div></div>
<div class="stat"><div class="n">%{sayi(kat['Çay']['pay'], 0)}</div><div class="l">Çay payı ({sayi(kat['Çay']['sip'])} sipariş)</div></div></div>
<div class="note"><b>Yoğunlaşma riski:</b> Demlik Seti + Bardak = cironun %{sayi(U['Demlik Seti (el yapımı)']['pay'] + U['İnce Belli Bardak 6lı']['pay'], 0)}{ek(U['Demlik Seti (el yapımı)']['pay'] + U['İnce Belli Bardak 6lı']['pay'], 0, 'p3')}. Nisan–Mayıs'taki bardak kesintisi bu yüzden pahalıya patladı.</div>
<div class="note g"><b>Çay → ekipman geçişi:</b> çay müşterisini (ort. sepet {sayi(M['cay_online']['sepet'], 0)} TL) bardak/demlik ile buluşturan bir paket, hem sepeti hem kargo verimini artırır.</div>
<div class="note"><b>Fiyat:</b> her ürünün fiyatı 12 ay boyunca hiç değişmemiş. Her %1'lik fiyat artışı (satış hacmi sabit varsayımıyla) ≈ {kisa(M['fiyat']['bir_yuzde_kar'])} TL, yani yıllık kârın %{sayi(M['fiyat']['bir_yuzde_kar'] / Y['kar'] * 100, 0)}{ek(M['fiyat']['bir_yuzde_kar'] / Y['kar'] * 100, 0, 'p3')}.</div></div></div>'''
page(9, 'Ürünler', body)

# ------------------------------------------------------------------ 10 ÇAY & KARGO & LANSMAN
cay_ser = {u: M['urun_ay_net'][u] for u in ['Karadeniz Sabahı 250g', 'Adaçaylı Bergamot 100g', 'Kadıköy Akşamı 250g']}
cst = stacked_v(AY, cay_ser, w=600, h=290, colors=URUN_RENK, title='Çay ürünleri aylık net satış', ticks=[0, 100000, 200000], hi=250000)
kg = sorted(M['urun'], key=lambda u: -u['kargo_oran'])
hk = hbars([(short.get(u['urun'], u['urun']), u['kargo_oran'], f"{u['urun']}: satışın %{sayi(u['kargo_oran'], 1)}{ek(u['kargo_oran'], 1, 'p3')} kargo") for u in kg], w=430, l=132, r=54, row_h=30, bar_h=16,
           colors=[COPPER if u['kargo_oran'] > 8 else '#B9B2A3' for u in kg], val_fmt=lambda v: f'%{sayi(v, 1)}', title='Ürün başına kargo yükü', size=11.5)
body = head('Çay, kargo ve yeni ürün', f"Çay siparişi küçük, kargo sabit: online çayda satışın %{sayi(M['cay_online']['kargo_oran'], 0)}{ek(M['cay_online']['kargo_oran'], 0, 'p3')} kargoya gidiyor.",
            f"Yeni çıkan Kadıköy Akşamı çay kategorisini büyüttü ama Adaçaylı Bergamot'un yerini almış görünüyor.")
cy = M['cay']
body += f'''<div class="grid" style="grid-template-columns:1fr 1fr;gap:18px"><div class="card"><h3>Çay ailesi aylık net satış (TL)</h3><div class="cap">Kadıköy Akşamı Ekim'de çıktı</div>{cst}{legend([(short[u], URUN_RENK[u]) for u in cay_ser])}</div>
<div style="display:flex;flex-direction:column;gap:12px"><div class="card"><h3>Kargo, satışın yüzde kaçı? (ürün bazında)</h3><div class="cap">Kargo sabit (38–45 TL/sipariş); sepet küçüldükçe yük büyür</div>{hk}</div>
<div class="grid" style="grid-template-columns:1fr 1fr;gap:10px"><div class="stat cop"><div class="n">{kisa(M['cay_online']['kargo'])}</div><div class="l">Online çay siparişlerinde kargo (TL) · toplam kargonun %62'si</div></div>
<div class="stat"><div class="n">{sayi(M['cay_online']['siparis'])}</div><div class="l">Online çay siparişi, ort. {sayi(M['cay_online']['sepet'], 0)} TL</div></div></div></div></div>
<div class="grid" style="grid-template-columns:1fr 1fr;gap:18px;margin-top:14px"><div class="note"><b>Lansman etkisi:</b> Kadıköy Akşamı Kas–Ara'da ayda ≈{kisa(cy['kadikoy_kas_ara'])} TL yaptı. Adaçaylı Bergamot aynı sezonda {kisa(cy['adacayi_oca_sub'])} → {kisa(cy['adacayi_kas_ara'])} TL düştü (−%{sayi((1 - cy['adacayi_kas_ara'] / cy['adacayi_oca_sub']) * 100, 0)}), Karadeniz Sabahı sabit. Çay kategorisi toplamda {kisa(cy['cay_oca_sub'])} → {kisa(cy['cay_kas_ara'])} TL/ay: lansman net artı, ama Adaçaylı'nın neden gerilediği sorulmalı.</div>
<div class="note g"><b>Kargo için 3 hamle:</b> (1) çayı 2'li/3'lü paket ve "çay + bardak" sepetiyle sat, (2) ücretsiz kargo eşiği koy (ör. 400 TL) — sepeti eşiğe iter, (3) kargo firmasından hacim teklifi al: her %10'luk indirim ≈ {kisa(M['kargo_pazarlik_10'])} TL/yıl.</div></div>'''
page(10, 'Çay, kargo ve yeni ürün', body)

# ------------------------------------------------------------------ 11 ATÖLYE
A = M['atolye']
ayr = bars_v(AY, A['ay_rez'], w=560, h=270, colors='#6E5A7E', fmt=lambda v: sayi(v), lo=0, hi=32, ticks=[0, 10, 20, 30], title='Aylık atölye rezervasyonu', label_fmt=lambda v: sayi(v))
gunler = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
hi_ = M['haftaici']
wd_ser = {'Diğer ürünler': hi_['atolyesiz'], 'Demleme Atölyesi': [a - b for a, b in zip(hi_['tum'], hi_['atolyesiz'])]}
wd = stacked_v(gunler, wd_ser, w=520, h=270, colors={'Diğer ürünler': '#B9C9BF', 'Demleme Atölyesi': '#6E5A7E'}, ticks=[0, 250000, 500000, 750000], hi=950000, title='Haftanın günlerine göre net satış')
body = head('Fırsat · Demleme Atölyesi', 'Atölye haftada tek seans ve yalnız iki kanaldan satılıyor; Cumartesi\'nin "güçlü" görünmesi tamamen ona bağlı.',
            f"{A['rez']} rezervasyon ({A['kisi']} kişi), {kisa(A['net'])} TL. Hepsi Cumartesi, hepsi Mağaza ({A['kanal']['Mağaza']}) veya Instagram DM ({A['kanal']['Instagram DM']}); web sitesinde ve Trendyol'da hiç yok.")
body += f'''<div class="grid" style="grid-template-columns:1fr 1fr;gap:18px"><div class="card"><h3>Aylık atölye rezervasyonu</h3><div class="cap">Kasım'da 27 ile zirve; yazın 7–11</div>{ayr}</div>
<div class="card"><h3>Hangi gün ne kadar satıyoruz? (TL)</h3><div class="cap">Cumartesi farkı = atölye · atölyeyi çıkarınca gün farkı kalmıyor</div>{wd}{legend([('Diğer ürünler', '#B9C9BF'), ('Demleme Atölyesi', '#6E5A7E')])}</div></div>
<div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:14px"><div class="stat"><div class="n">{sayi(A['sepet'], 0)} TL</div><div class="l">Ortalama atölye rezervasyonu — ürün ortalamasının 2 katı, kargo yok</div></div>
<div class="note g"><b>Öneri:</b> (1) web sitesine <b>online rezervasyon + hediye çeki</b> ekle; (2) Kas–Şub'da 2. seans dene (bugünkü seans ≈{sayi(A['kisi_seans'], 0)} kişi, ≈{kisa(A['ciro_seans'])} TL); (3) yaz için kurumsal/doğum günü paketi.</div>
<div class="note"><b>Sınır:</b> kapasite ve maliyet (usta, malzeme) veride yok. Hafta içi ikinci seansın doluluğu test edilmeden gelir sayılmamalı.</div></div>'''
page(11, 'Fırsat · Demleme Atölyesi', body)

# ------------------------------------------------------------------ 12 PAZARLAMA
P = M['pazarlama']
pb = bars_v(AY, P['aylik'], w=640, h=200, colors=[COPPER if v >= 60000 else '#D9A472' for v in P['aylik']], lo=0, hi=80000, ticks=[0, 20000, 40000, 60000], label_fmt=lambda v: sayi(v / 1e3, 0), title='Aylık pazarlama gideri', bold_idx=(9,), t=18)
nl, _, _ = lines(AY, {'Net satış': [v for v in P['net']]}, w=640, h=185, fmt=lambda v: kisa(v), lo=0, hi=750000, ticks=[0, 250000, 500000, 750000], end_labels=False, widths={'Net satış': 3}, area={'Net satış'}, title='Aylık net satış')
body = head('Pazarlama', 'Ekim\'de pazarlamaya 65 bin TL harcandı; getirisi bu veriden ölçülemiyor.',
            f"Yıllık pazarlama {kisa(Y['pazarlama'])} TL (net satışın %{sayi(P['oran_yil'], 1)}{ek(P['oran_yil'], 1, 'p3')}). Ocak–Şubat'ta ayda 18 bin TL ile {kisa(P['oca_sub_ort_net'])} TL satılırken, Kasım–Aralık'ta ayda 39 bin TL ile {kisa(P['kas_ara_ort_net'])} TL satıldı.")
body += f'''<div class="grid" style="grid-template-columns:680px 1fr;gap:20px"><div class="card"><h3>Aylık pazarlama gideri (bin TL)</h3><div class="cap">Ekim = Kadıköy Akşamı lansman ayı</div>{pb}
<h3 style="margin-top:6px">Aylık net satış (TL)</h3><div class="cap">Satış mevsime bağlı; pazarlama artışı satış eğrisini yalnız belli belirsiz değiştiriyor</div>{nl}</div>
<div style="display:flex;flex-direction:column;gap:12px"><div class="stat cop"><div class="n">%{sayi(P['oran'][9], 0)}</div><div class="l">Ekim'de pazarlama / net satış (yıl ortalaması %{sayi(P['oran_yil'], 1)})</div></div>
<div class="note"><b>Ekim'de ne oldu?</b> Pazarlama Eylül'e göre +{kisa(P['eki_farki'])} TL, net satış +{kisa(P['eki_net_farki'])} TL arttı. Bu ek satışın katkısı ≈{kisa(P['eki_net_farki'] * Y['katki_orani'])} TL; ek harcama {kisa(P['eki_farki'])} TL: o ay harcama kendini çıkarmadı. Kasım'daki sıçramanın sezondan mı pazarlamadan mı geldiği ayrıştırılamıyor.</div>
<div class="note"><b>Neden ölçemiyoruz?</b> Pazarlama giderinin kanal/kampanya kırılımı ve siparişte kaynak bilgisi yok. Ocak–Şubat'ta 18 bin TL ile 556 bin TL satılması, satışın büyük kısmının mevsimsel/organik olduğunu düşündürüyor.</div>
<div class="note g"><b>Öneri:</b> (1) siparişe <b>kaynak alanı</b> ekle (kupon kodu, UTM); (2) Nis–Ağu'da (satışın en düşük olduğu dönemde) küçük bir bütçeyi test kampanyasına ayır; (3) her kampanyaya "harcama ÷ katkı" hedefi koy.</div></div></div>'''
page(12, 'Pazarlama', body)

# ------------------------------------------------------------------ 13 KÖPRÜ
kp = M['kopru']
wfi = [('Bugünkü\nkâr', kp[0][1], 'total'), ('Bardak stoku\nkesilmese', kp[1][1], 'delta'), ('Trendyol iadesi\nnormale dönse', kp[2][1], 'delta'), ('%3 fiyat\nartışı', kp[3][1], 'delta'), ('Kargo\n−%10', kp[4][1], 'delta'), ('Potansiyel\nyıllık kâr', M['kopru_toplam'], 'total')]
wf2 = waterfall(wfi, w=660, h=420, t=30, b=48, title='Kâr köprüsü', cat_size=11.5, lab_size=12)
body = head('Fırsat büyüklüğü', f"Dört düzeltme yıllık kârı {kisa(Y['kar'])} TL'den ≈{kisa(M['kopru_toplam'])} TL'ye taşıyabilir.",
            'Rakamlar söz değil, büyüklük gösterir: hepsi 2025 verisinden ve açıkça yazılı varsayımlarla hesaplandı.')
body += f'''<div class="grid" style="grid-template-columns:690px 1fr;gap:20px"><div class="card"><h3>Yıllık net kâr köprüsü (TL)</h3><div class="cap">Bugünkü kâr + her düzeltmenin tahmini kâr etkisi</div>{wf2}</div>
<div class="card" style="font-size:12px"><h3 style="margin-bottom:6px">Varsayımlar</h3><ul class="t">
<li><b>Bardak:</b> Nis–May'da ≈{sayi(bd['kayip_siparis'], 0)} sipariş kaçtı (Mart–Temmuz ortalaması baz, Instagram hariç) × {sayi(bd['aov'], 0)} TL sepet × katkı oranı %{sayi(Y['katki_orani'] * 100, 0)}.</li>
<li><b>Trendyol iadesi:</b> Ağu–Ara oranı Oca–Tem düzeyine (%{sayi(t['once_oran'], 1)}) dönerse geri gelen ciro × (1 − hammadde %32).</li>
<li><b>Fiyat:</b> tüm fiyatlara %3, satış hacminde %1,5 kayıp, hammadde ve kargo hacimle azalır.</li>
<li><b>Kargo:</b> sözleşme/paketleme ile toplam kargo giderinde %10.</li>
<li>Trendyol indirim kesintisi <b>köprüye konmadı</b>: kazancı hacim kaybına bağlı, önce test.</li></ul>
<div class="note r" style="margin-top:8px"><b>Dürüst uyarı:</b> Bunlar tek yıllık veriden tahmin; aynı sorunun 2026'da tekrarlayacağı, zamın hacmi ne kadar etkileyeceği bilinmiyor. Komisyon, KDV ve gerçek hammadde maliyeti girince bugünkü kâr da değişebilir.</div></div></div>'''
page(13, 'Fırsat büyüklüğü', body)

# ------------------------------------------------------------------ 14 EYLEM PLANI
plan = [
    ('1', 'Bardak için stok güvencesi', 'Nis–May kesintisi ≈110 bin TL kâr götürdü', 'Asgari stok günü + yeniden sipariş noktası; tedarikçi teslim süresini yaz; stok bitince ürün sayfasında alternatif öner', '1. hafta', 'w1', 'stok-dışı satış günü = 0'),
    ('2', 'Trendyol iade kök nedeni', 'İade %3 → %16, Ağu\'dan beri; ≈59 bin TL kâr', 'Panelden iade nedeni kodları; kargo firması/paket/ürün sayfası/politika değişikliklerini 18 Ağu civarında tara', '1. ay', 'w1', 'iade %8 (30 gün), %4 (90 gün)'),
    ('3', 'Fiyat güncellemesi (%3)', 'Fiyatlar 12 ay sabit; %1 = ≈49 bin TL', 'Önce Demlik Seti ve Bardak (en az fiyat duyarlı ekipman); 4 hafta sonra sipariş/gün değişimini kıyasla', '1–2. ay', 'w2', 'sipariş/gün düşüşü < %1,5'),
    ('4', 'Yaz planı (Nis–Ağu)', 'Yaz ort. 270 bin, başabaş 400 bin', 'Soğuk demleme seti / yaz çayı, yaz atölyeleri, kurumsal hediye; kısmi süreli/esnek personel planı', 'Mart\'a kadar', 'w3', 'Nis–Ağu ort. ≥ 330 bin'),
    ('5', 'Trendyol indirim testi', '%66 kalıcı indirim, sepet büyümüyor', '4 hafta: yarı ürünlerde indirim yalnız hafta sonu/kampanya günü; kalan yarı kontrol grubu', '2–3. ay', 'w2', f"kayıp sipariş < %{sayi(ti['basabas_kayip_oran'], 0)}"),
    ('6', 'Çay için paket + kargo', 'Online çayda kargo %15,6', '2\'li/3\'lü paket, "çay + bardak" sepeti, ücretsiz kargo eşiği (400 TL); kargo teklifi al', '2–3. ay', 'w2', 'çay sepeti > 340 TL'),
    ('7', 'Atölye online', 'Yalnız Cmt · Mağaza/DM; 1.161 TL sepet', 'Web sitesine rezervasyon + hediye çeki; Kas–Şub için 2. seans dene', 'Kış öncesi', 'w3', 'rezervasyon/ay > 20'),
    ('8', 'Veriyi tamamla', 'Kâr, KDV/komisyon/gerçek maliyet olmadan tahmin', 'Trendyol komisyonu, POS kesintisi, KDV durumu, ürün maliyeti, iade nedeni, sipariş kaynağı, stok — panel.xlsx\'e sütun ekle', '1. ay', 'w1', 'aylık kapanışta kâr farkı < %2'),
]
rows_ = ''.join(f'<tr><td class="p">{p}</td><td><b>{a}</b><br><span style="color:var(--muted)">{b}</span></td><td>{c}</td><td><span class="when {w}">{wh}</span></td><td>{m}</td></tr>' for p, a, b, c, wh, w, m in plan)
body = head('Eylem planı', 'Sekiz iş: ilk ay stok, iade ve veri; sonra fiyat ve indirim; kış gelmeden yaz/atölye.',
            'Sıra, kâra etkisi ve ne kadar çabuk yapılabildiğine göre. Her işin ölçütü var; Excel panelindeki sayfalar bu ölçütleri her ay güncelliyor.')
body += f'<div class="card" style="padding:8px 14px"><table class="plan"><tr><th></th><th style="width:230px">İş ve gerekçe</th><th>Nasıl</th><th>Ne zaman</th><th style="width:150px">Başarı ölçütü</th></tr>{rows_}</table></div>'
page(14, 'Eylem planı', body)

# ------------------------------------------------------------------ 15 NOTLAR
kal = M['kalite']
body = head('Yöntem ve veri notları', 'Bu raporun sayıları nasıl hesaplandı, neler eksik.',
            'Satış tablosunda temizlik gerektiren az sayıda kayıt vardı; hepsi düzeltildi ve aşağıda listelendi. Bir de veride olmayan ama kârı değiştirebilecek kalemler var.')
body += f'''<div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:16px"><div class="card"><h3 style="margin-bottom:6px">Temizlenen kayıtlar</h3><ul class="t" style="font-size:12px">
<li><b>{kal['tekrar_satir']} tekrar satır</b> (aynı Sipariş No, birebir aynı içerik): tek sayıldı. Şişirdiği ciro {sayi(kal['tekrar_tutar'])} TL.</li>
<li><b>{kal['kucuk_harf_kanal']} satırda "web sitesi"</b> küçük harfle yazılmış: "Web sitesi"ne birleştirildi.</li>
<li><b>{kal['eksi_adet']} satırda adet −1</b> (toplam {sayi(kal['eksi_adet_tutar'])} TL): iade olarak işaretli değil; düzeltme/iptal kaydı sayıldı ve satıştan düşüldü.</li>
<li>Sipariş numaraları 10001–18624 kesintisiz; eksik gün yok; tarih, adet, fiyat, tutar tutarlı (Tutar = Adet × Fiyat × (1 − indirim)).</li></ul></div>
<div class="card"><h3 style="margin-bottom:6px">Varsayımlar</h3><ul class="t" style="font-size:12px">
<li><b>Net satış</b> = Tutar, iade=Evet olan siparişler çıkarılarak (tam iade varsayımı; iade edilen siparişin kargosu yine gider).</li>
<li><b>Kâr</b> = net satış − kargo − Giderler sayfasındaki 4 kalem.</li>
<li><b>Katkı</b> (kanal analizi) = net satış − hammadde (%32) − kargo; sabit giderler kanallara dağıtılmadı.</li>
<li>Bardak kaybı ve iade fazlası, kanal bazında dönem karşılaştırmasıyla tahmin edildi (yöntem 8. ve 6. sayfada).</li>
<li>Tek yıllık veri: büyüme (YoY) hesaplanamaz; mevsimsellik ise net görünüyor.</li></ul></div>
<div class="card"><h3 style="margin-bottom:6px">Veride olmayan, kârı değiştirebilecekler</h3><ul class="t" style="font-size:12px">
<li><b>KDV:</b> Tutar KDV dahil mi hariç mi? Giderlerle aynı tabanda olmayabilir.</li>
<li><b>Komisyonlar:</b> Trendyol komisyonu, sanal pos/ödeme kesintisi. Trendyol'da %1 komisyon = {kisa(M['trendyol_komisyon_1pct'])} TL; %10 olsaydı ve gider tablosunda yoksa yıllık kâr <b>{kisa(Y['kar'] - M['trendyol_komisyon_1pct'] * 10)} TL</b>'ye düşerdi.</li>
<li><b>Hammadde:</b> her ay tam %32; gerçek alım faturası değil, tahmin gibi. Ürün bazında maliyet yok.</li>
<li><b>İade nedeni</b>, iade kargosu, <b>müşteri kimliği</b> (tekrar alım), <b>stok</b> ve pazarlama kanal kırılımı yok.</li></ul></div></div>
<div class="grid" style="grid-template-columns:1fr 1fr;gap:16px;margin-top:14px"><div class="note g"><b>panel.xlsx nasıl kullanılır?</b> Yeni siparişleri <i>Veri</i> sayfasındaki tablonun altına yapıştırın; aylık gider satırını <i>Giderler</i>'e ekleyin. <i>Özet</i>, <i>Aylık</i>, <i>Kanal</i>, <i>Ürün</i>, <i>Senaryo</i> sayfaları ve grafikler kendiliğinden güncellenir; <i>Özet</i>'ten yılı seçin.</div>
<div class="note"><b>Bu rapor nasıl üretildi?</b> Tüm grafikler kodla (SVG) çizildi; dış görsel, ikon ya da font kullanılmadı. rapor.html tek dosyadır: tarayıcıda açın, grafiklerin üzerine gelince değerler görünür. rapor.pdf aynı içeriğin A4 yatay baskısıdır.</div></div>'''
page(15, 'Yöntem ve veri notları', body)

html = f'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Demlik — 2025 Yönetim Raporu</title><style>{CSS}</style></head><body>{''.join(pages)}<script>{JS}</script></body></html>'''
open('../rapor.html', 'w', encoding='utf-8').write(html)
print('rapor.html', len(html) // 1024, 'KB', len(pages), 'sayfa')
