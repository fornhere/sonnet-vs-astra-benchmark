from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def mark(color='currentColor'):
    return f'''<svg class="mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 37V21C8 12 14 7 23 7h3c9 0 14 5 14 12s-5 12-14 12H17l18 12" stroke="{color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="39" r="5" fill="{color}"/></svg>'''

def header(section, dark=False):
    return f'<header><div class="brand">{mark()}<span>rota</span></div><span class="section-label">{section}</span></header>'

def foot(n, note=''):
    return f'<footer><span>{note}</span><span class="page">{n:02d}<i>/</i>12</span></footer>'

def slide(n, cls, section, body, note=''):
    return f'<section class="slide {cls}" id="s{n}" aria-label="Slayt {n}">{header(section)}{body}{foot(n,note)}</section>'

slides=[]
slides.append(slide(1,'dark cover','TOHUM YATIRIM TURU', '''
<div class="cover-copy"><div class="eyebrow lime">KOBİ E-TİCARETİ İÇİN TESLİMAT ZEKÂSI</div><h1>Her siparişe<br>doğru <em>kargo.</em></h1><p class="lead">Kargo seçimini, paketlemeyi ve gecikme<br>riskini aynı kararda buluşturuyoruz.</p><div class="cover-proof"><b>310</b><span>aktif satıcı</span><div></div><b>48.000</b><span>aylık gönderi</span></div></div>
<svg class="cover-art" viewBox="0 0 780 740" role="img" aria-label="Siparişten teslimata optimize edilen rota ve paket çizimi">
<defs><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#6b607b" opacity=".45"/></pattern></defs>
<rect x="0" y="0" width="780" height="740" fill="url(#dots)"/>
<path d="M55 600H226Q282 600 282 544V484Q282 424 341 424H486Q570 424 570 340V182Q570 116 638 116H730" fill="none" stroke="#514560" stroke-width="3"/>
<path d="M70 160H230Q296 160 296 226V269Q296 323 350 323H640" fill="none" stroke="#6e5888" stroke-width="2" stroke-dasharray="9 11"/>
<path d="M45 592H187Q245 592 245 534V503Q245 440 309 440H429Q510 440 510 359V259Q510 197 572 197H704" fill="none" stroke="#d4f76b" stroke-width="15" stroke-linecap="round"/>
<circle cx="47" cy="592" r="17" fill="#d4f76b"/><circle cx="705" cy="197" r="27" fill="#d4f76b"/><path d="m693 198 8 8 15-18" fill="none" stroke="#231a30" stroke-width="5" stroke-linecap="round"/>
<g transform="translate(215 150)"><path d="m0 121 166-91 166 91-166 96Z" fill="#a895c7"/><path d="m0 121 166 96v183L0 302Z" fill="#6d548f"/><path d="m166 217 166-96v181l-166 98Z" fill="#8f74b2"/><path d="m129 51 166 93v55l-44 25v-57L87 74Z" fill="#d4f76b"/><path d="m36 173 82 47v58l-82-47Z" fill="#f5f1e8"/><path d="m49 193 49 28m-49-16 34 20" stroke="#6d548f" stroke-width="5"/><path d="m0 121 166 96 166-96M166 217v183" fill="none" stroke="#271d33" stroke-width="2" opacity=".35"/></g>
<text x="482" y="580" fill="#b4a8c4" font-size="17" font-family="Adwaita Sans">SİPARİŞ</text><path d="M481 597h153" stroke="#77678b"/><text x="482" y="628" fill="#d4f76b" font-size="21" font-family="Adwaita Sans">TESLİMAT</text>
</svg>
''','Rota · Türkiye'))

slides.append(slide(2,'light','SORUN', '''
<h2>Kargo etiketi, gerçek maliyetin<br>yalnızca bir parçası</h2>
<div class="problem-layout"><div class="receipt"><div class="receipt-top">SATICININ GÖRDÜĞÜ</div><h3>Kargo fiyatı</h3><svg viewBox="0 0 440 110" class="receipt-bars"><path d="M25 25h225M25 51h145M25 77h195" stroke="#d1cabd" stroke-width="10"/><path d="M338 25h70M338 51h70M338 77h70" stroke="#2a2333" stroke-width="10"/></svg><div class="receipt-bottom">Her siparişte yeniden karar</div></div>
<div class="hidden-cost"><div class="eyebrow">SONRADAN ORTAYA ÇIKAN</div><div class="cost-line"><span class="symbol">+</span><div><h3>Operasyon yükü</h3><p>Firma, fiyat ve teslimat süresini elle karşılaştırma</p></div></div><div class="cost-line"><span class="symbol">+</span><div><h3>Paketleme maliyeti</h3><p>Uygun olmayan paket seçimi ve desi etkisi</p></div></div><div class="cost-line"><span class="symbol">+</span><div><h3>Gecikme ve iade</h3><p>Tekrar işlem, destek yükü ve satıcı maliyeti</p></div></div></div></div>
<div class="bottom-statement">Satıcının ihtiyacı: <strong>siparişin toplam teslimat maliyetini yönetmek.</strong></div>
''','Sorun çerçevesi · Rota girişim verileri'))

slides.append(slide(3,'light','ÇÖZÜM', '''
<h2>Sipariş bazında karar.<br>Teslimata kadar takip.</h2>
<div class="engine"><div class="engine-input"><div class="eyebrow">GİRDİLER</div><h3>Siparişin bağlamı</h3><p>Adres ve teslimat beklentisi<br>Ürün ve paket özellikleri<br>Kargo seçenekleri</p><div class="input-lines"><span></span><span></span><span></span></div></div><div class="engine-core"><div class="core-ring"></div><div class="core-brand">{MARK}<span>rota</span></div><p>Yapay zekâ destekli<br>karar motoru</p></div><div class="engine-output"><div class="output-row"><b>01</b><div><h3>Kargo seçimi</h3><p>Maliyet ile teslimat beklentisini birlikte değerlendirir.</p></div></div><div class="output-row"><b>02</b><div><h3>Paketleme önerisi</h3><p>Siparişe uygun paket seçimini destekler.</p></div></div><div class="output-row"><b>03</b><div><h3>Gecikme tahmini</h3><p>Riskli gönderiyi müdahale için görünür kılar.</p></div></div></div></div>
<div class="feedback"><span class="feedback-line"></span><span>Ürün geliştirme tezi: teslimat sonuçlarıyla önerileri iyileştirmek</span><span class="feedback-line"></span></div>
'''.replace('{MARK}',mark()),'Şematik ürün mimarisi · Veri bağlantıları ve geri besleme akışı tasarım önerisidir'))

slides.append(slide(4,'lavender','ÜRÜN DENEYİMİ', '''
<h2>Bir kararın gerekçesi de görünür</h2><p class="subtitle">Satıcı seçimi anlayabilir, onaylayabilir ve gerektiğinde değiştirebilir.</p>
<div class="product"><div class="product-nav"><div>{MARK}<b>rota</b></div><span>Sipariş kararı</span><span class="demo-label">TEMSİLİ ARAYÜZ</span></div><div class="product-body"><div class="product-main"><div class="shipment-head"><div><div class="eyebrow">YENİ GÖNDERİ</div><h3>İstanbul <span class="small-arrow">⟶</span> Ankara</h3></div><span>Standart teslimat<br><b>Kırılabilir ürün</b></span></div><table><thead><tr><th>Kargo seçeneği</th><th>Fiyat düzeyi</th><th>Gecikme riski</th><th>Karar</th></tr></thead><tbody><tr><td>Taşıyıcı A</td><td>Düşük</td><td class="risk">Yüksek</td><td>Alternatif</td></tr><tr class="selected"><td><b>Taşıyıcı B</b></td><td>Orta</td><td>Düşük</td><td><b>Önerilen ✓</b></td></tr><tr><td>Taşıyıcı C</td><td>Yüksek</td><td>Düşük</td><td>Alternatif</td></tr></tbody></table><div class="reason"><b>Neden B?</b><p>Fiyat ve gecikme riskini birlikte değerlendirdiğimizde bu sipariş için daha dengeli seçim.</p></div></div><aside class="product-aside"><div class="eyebrow">PAKETLEME ÖNERİSİ</div><svg viewBox="0 0 210 120" class="mini-box"><path d="m40 48 63-32 63 32-63 34Z" fill="#d2c2ea"/><path d="m40 48 63 34v30L40 78Z" fill="#8f75b0"/><path d="m103 82 63-34v30l-63 34Z" fill="#b39bcf"/><path d="m75 30 65 34-19 10-65-35Z" fill="#d4f76b"/></svg><h3>Kompakt kutu<br>+ koruyucu dolgu</h3><div class="aside-rule"></div><div class="eyebrow">GECİKME TAKİBİ</div><p>Risk artarsa satıcıya<br>müdahale önerisi.</p></aside></div></div>
'''.replace('{MARK}',mark()),'Arayüz, rota ve taşıyıcılar temsili örnektir · Ölçülmüş performans veya canlı entegrasyon göstermez'))

slides.append(slide(5,'dark traction','MEVCUT DURUM', '''
<h2>14 ayda çalışan bir iş</h2><div class="traction-main"><div class="main-metric"><div class="eyebrow lime">AYLIK YİNELENEN GELİR</div><div class="hero-number">620.000<span>TL</span></div></div><div class="growth"><span class="growth-arrow">↗</span><b>%11</b><span>aylık büyüme</span></div></div>
<div class="traction-bottom"><div><b>310</b><span>aktif satıcı</span></div><div><b>48.000</b><span>aylık gönderi</span></div><div><b>%71</b><span>brüt marj</span></div></div>
''','Kaynak: Rota girişim verileri · Mevcut durum'))

slides.append(slide(6,'light','İŞ MODELİ', '''
<h2>Tekrarlayan gelir,<br>sipariş akışının içinde</h2>
<div class="economics"><div class="margin-block"><div class="eyebrow">MEVCUT EKONOMİ</div><div class="margin-value">%71<span>brüt marj</span></div><div class="margin-bar"><span></span></div><div class="margin-legend"><span><i></i>Brüt marj</span><span><i></i>Doğrudan maliyet payı</span></div><p class="margin-note">620.000 TL aylık yinelenen gelir üzerinde<br>izlenen temel verimlilik göstergesi.</p></div><div class="pricing-block"><div class="eyebrow purple">FİYATLAMA HİPOTEZİ</div><h3>Abonelik<br><span>+</span> gönderi hacmi</h3><p>Temel platform erişimi için abonelik.<br>Artan kullanım için hacme bağlı paketler.</p><div class="pricing-rule"></div><p class="small">Test edilecek denge: satıcı için ölçülebilir değer,<br>Rota için sağlıklı hizmet maliyeti.</p></div></div>
''','MRR ve marj: Rota girişim verileri · Fiyatlama yapısı test edilecek öneridir'))

slides.append(slide(7,'light','PAZAR VE ODAK', '''
<h2>Türkiye’de odaklı bir başlangıç</h2>
<div class="market-layout"><div class="market-focus"><div class="eyebrow">İLK MÜŞTERİ PROFİLİ</div><h3>Düzenli gönderi yapan,<br>kargoyu elle yöneten<br>KOBİ satıcılar</h3><p>Birden fazla kargo seçeneği kullanan ve<br>gecikme / iade maliyetini takip etmek isteyen<br>e-ticaret işletmeleri.</p><div class="focus-line"><span></span><b>Önce kararın sık tekrarlandığı operasyonlar</b></div></div><div class="market-model"><div class="eyebrow purple">TAHMİN · YILLIK GELİR HAVUZU SENARYOSU</div><div class="market-equation"><div><strong>25.000</strong><span>hedef satıcı varsayımı</span></div><b>×</b><div><strong>2.000 TL</strong><span>aylık gelir / aktif satıcı*</span></div><b>×</b><div><strong>12 ay</strong><span>yıllıklandırma</span></div></div><div class="market-result"><b>600 milyon TL</b><span>yıllık gelir potansiyeli · tahmin</span></div><p class="small">Pazar büyüklüğü ölçümü veya satış tahmini değildir.<br>Hedef satıcı sayısı saha araştırmasıyla doğrulanmalıdır.</p></div></div>
''','*620.000 TL ÷ 310 aktif satıcı = 2.000 TL. Hesaplanan ortalama; fiyat veya ödeyen müşteri ARPA’sı değildir.'))

slides.append(slide(8,'dark','KONUMLANDIRMA', '''
<h2>Rota’nın odağı:<br>siparişin teslimat kararı</h2>
<div class="position-layout"><div class="position-stack"><div class="position-row"><span>TEDARİK</span><div><h3>Kargo firması</h3><p>Taşımayı gerçekleştirir.</p></div></div><div class="position-row"><span>İŞLEM</span><div><h3>Kargo / entegrasyon araçları</h3><p>Gönderi iş akışını yürütür.</p></div></div><div class="position-row featured"><span>KARAR</span><div><h3>Rota</h3><p>Hangi kargo, hangi paket, hangi risk?</p></div><b>↗</b></div></div><div class="moat"><div class="eyebrow lime">SAVUNULABİLİRLİK HİPOTEZİ</div><svg viewBox="0 0 510 240" class="learning-loop"><path d="M81 135C81 49 182 23 266 45S442 101 427 163" fill="none" stroke="#d4f76b" stroke-width="5"/><path d="m415 149 13 19 18-15" fill="none" stroke="#d4f76b" stroke-width="5"/><path d="M421 194C344 250 164 246 86 169" fill="none" stroke="#9b84bd" stroke-width="3"/><path d="m85 190-5-27 28 4" fill="none" stroke="#9b84bd" stroke-width="3"/><circle cx="247" cy="139" r="48" fill="#3c2c51"/><path d="m227 140 14 14 29-31" fill="none" stroke="#d4f76b" stroke-width="7" stroke-linecap="round"/></svg><h3>Sonuç verisiyle<br>daha isabetli kararlar</h3><p>Taşıyıcı ve rota bazında öğrenme.<br>Üstünlük, önerilerin sahada ölçülen<br>katkısıyla kanıtlanacak.</p></div></div>
''','Konumlandırma tezi · Kategori rolleri şematiktir; belirli rakiplerin özellik karşılaştırması değildir'))

slides.append(slide(9,'light','BÜYÜME PLANI', '''
<h2>Mevcut kullanımı tekrar edilebilir<br>satışa çevirmek</h2><div class="plan-label">ÖNERİLEN PAZARA GİRİŞ PLANI</div>
<div class="gtm-flow"><div class="gtm-step"><div class="step-top"><span>01</span><i></i></div><h3>Değeri kanıtla</h3><p>Mevcut satıcılarda teslimat<br>maliyetini ve gecikmeleri<br>önce / sonra karşılaştır.</p><div class="measure"><span>KANIT</span><b>Gönderi başına net fayda</b></div></div><div class="gtm-step"><div class="step-top"><span>02</span><i></i></div><h3>Dağıtımı genişlet</h3><p>E-ticaret altyapıları ve<br>entegratörlerle ortak<br>satış kanallarını test et.</p><div class="measure"><span>KANIT</span><b>Edinim maliyeti ve geri ödeme</b></div></div><div class="gtm-step"><div class="step-top"><span>03</span><i></i></div><h3>Hesap içinde büyü</h3><p>Satıcının daha fazla<br>gönderisini Rota üzerinden<br>yönetmesini sağla.</p><div class="measure"><span>KANIT</span><b>Elde tutma ve gelir genişlemesi</b></div></div></div>
<div class="gtm-note">Ölçekleme kararı, kanal bazında edinim maliyeti ve müşteri kohortlarına dayanacak.</div>
''','Gelecek planıdır · CAC, elde tutma, tasarruf ve kanal performansı verileri henüz paylaşılmamıştır'))

slides.append(slide(10,'lavender','EKİP', '''
<h2>Ürünü kuran ekip,<br>operasyonu da kapsıyor</h2>
<div class="team-layout"><div class="team-total"><b>4</b><span>kurucu</span><p>Yazılım, lojistik ve satış<br>aynı kurucu ekibinde.</p></div><div class="team-roles"><div class="role"><span class="role-count">2</span><div><h3>Yazılım</h3><p>Karar motoru, veri altyapısı ve ürün deneyimi</p></div><svg viewBox="0 0 70 70"><path d="m24 20-15 15 15 15m22-30 15 15-15 15M40 14 29 56"/></svg></div><div class="role"><span class="role-count">1</span><div><h3>Lojistik</h3><p>Taşıyıcı operasyonu ve teslimat süreçleri</p></div><svg viewBox="0 0 70 70"><path d="m13 23 22-12 22 12v27L35 62 13 50Zm0 0 22 13 22-13M35 36v26"/></svg></div><div class="role"><span class="role-count">1</span><div><h3>Satış</h3><p>Satıcı ihtiyacı, müşteri kazanımı ve büyüme</p></div><svg viewBox="0 0 70 70"><path d="M12 54 55 16M31 16h24v24M12 65h48"/></svg></div></div></div>
''','Kaynak: Rota girişim verileri · Kurucu sayısı ve uzmanlık dağılımı'))

slides.append(slide(11,'light','18 AYLIK PLAN', '''
<h2>Bu tur, ölçeklemenin<br>kanıtlarını finanse edecek</h2><div class="plan-label">ÖNERİLEN KİLOMETRE TAŞLARI · SÜRELER TAHMİN</div>
<div class="roadmap"><div class="roadmap-axis"></div><div class="roadmap-stage"><span class="road-dot"></span><div class="time">0-6<span>ay</span></div><h3>Ölçüm ve ürün</h3><p>Öneri kalitesini ve satıcının<br>sağladığı faydayı izleyen<br>ölçüm altyapısı.</p><div class="exit"><span>BAŞARI ÖLÇÜTÜ</span><b>Doğrulanmış müşteri faydası</b></div></div><div class="roadmap-stage"><span class="road-dot"></span><div class="time">7-12<span>ay</span></div><h3>Elde tutma ve kanal</h3><p>Kohort takibi ve ortak<br>satış kanallarıyla<br>edinim denemeleri.</p><div class="exit"><span>BAŞARI ÖLÇÜTÜ</span><b>Tekrarlanabilir müşteri kazanımı</b></div></div><div class="roadmap-stage"><span class="road-dot"></span><div class="time">13-18<span>ay</span></div><h3>Seçici ölçekleme</h3><p>Verimli kanallara yatırım.<br>Hacim artarken hizmet<br>kalitesi ve marj takibi.</p><div class="exit"><span>BAŞARI ÖLÇÜTÜ</span><b>Büyümeye hazır satış modeli</b></div></div></div>
''','Yatırım sonrası plan önerisidir · Sayısal KPI eşikleri, kohort ve maliyet baz çizgileriyle belirlenecek'))

slides.append(slide(12,'dark closing','YATIRIM TALEBİ', '''
<div class="ask-layout"><div class="ask"><div class="eyebrow lime">TOHUM YATIRIM TURU</div><div class="ask-number">1,2<span>milyon USD</span></div><div class="runway"><b>18 ay</b><span>hedeflenen pist</span></div><p>Türkiye’de KOBİ e-ticaretinin<br>teslimat kararlarını birlikte<br>daha iyi hâle getirelim.</p></div><div class="funding"><div class="eyebrow">ÖNERİLEN KAYNAK KULLANIMI · TAHMİN</div><div class="fund-row"><div><span>Ürün ve mühendislik</span><b>%50</b></div><div class="fund-track"><i style="width:100%;background:var(--lime)"></i></div></div><div class="fund-row"><div><span>Satış ve dağıtım</span><b>%25</b></div><div class="fund-track"><i style="width:50%;background:#bca3df"></i></div></div><div class="fund-row"><div><span>Lojistik ve müşteri başarısı</span><b>%15</b></div><div class="fund-track"><i style="width:30%;background:#9680ac"></i></div></div><div class="fund-row"><div><span>Operasyon rezervi</span><b>%10</b></div><div class="fund-track"><i style="width:20%;background:#665771"></i></div></div><div class="funding-thesis">Önce ölçülen müşteri faydası.<br>Ardından verimli büyüme.</div></div></div>
''','Talep ve pist: Rota girişim verileri · Kaynak dağılımı tahminidir; bütçe ve kur varsayımlarıyla doğrulanmalıdır'))

html='''<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Rota — Tohum Yatırım Sunumu</title><link rel="stylesheet" href="kaynak/stil.css"></head><body><main>'''+''.join(slides)+'''</main><nav class="controls" aria-label="Sunum kontrolü"><button id="prev" aria-label="Önceki slayt">←</button><span id="counter"></span><button id="next" aria-label="Sonraki slayt">→</button><button id="full" aria-label="Tam ekran">⛶</button></nav><script src="kaynak/sunum.js"></script></body></html>'''
(ROOT/'sunum.html').write_text(html,encoding='utf-8')
print('sunum.html: 12 slayt üretildi.')
