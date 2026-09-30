# TESLİM — Demlik · Instagram 1 haftalık carousel paketi

## Ne yaptım
Demlik (Kadıköy çay dükkânı) için "Demini Al" / Kadıköy Akşamı lansman haftasına yayılan **4 kaydırmalı gönderi, toplam 33 kare** (hepsi 1080×1350 PNG) ve her biri için Türkçe caption + hashtag + paylaşım günü/saati hazırladım. Her gönderinin ayrı bir işi ve görsel dili var; ortak marka dili: `demlik` yazı işareti, Noto Serif Display başlıklar (italik vurgu), Noto Sans metin, "tavşan kanı" kırmızısı/amber/orman yeşili paleti, "Çay acele sevmez." imzası.

| # | Gönderi | Kare | Tasarım fikri |
|---|---|---|---|
| 1 | `kadikoy-aksami-lansman` (Pzt 20:00) | 8 | Kadıköy gün batımı **tek kesintisiz panorama**: 8 karede boyunca gün batımı geceye akar, vapur 1→2. kare dikişini aşar, kaydırmayı çağırır. |
| 2 | `cay-nasil-demlenir-7-adim` (Çar 12:30) | 9 | Kaydedilebilir rehber: renk bloklu 7 adım, her adımda çizilmiş illüstrasyon (damla, demlik, kaşık, termometre, zamanlayıcı, kapak, üç ton çay) + ilerleme çubuğu. |
| 3 | `kahve-siparisin-cay-kaderin` (Per 20:00) | 8 | Kahve→çay eşleştirme oyunu (espresso / Türk kahvesi / latte), diyagonal bölünmüş "eşittir" kareleri, radar grafiği, kahveciye 3 kural. Paylaşım/etiket odaklı. |
| 4 | `cumartesi-demleme-atolyesi` (Cum 18:30) | 8 | Bilet konsepti: bilet kapak, üstten çekilmiş atölye masası, sohbet balonlu SSS, indirim kuponu, şematik harita. |

## Dosyalar
- `gonderiler/<gönderi-adı>/01.png … 08|09.png` — teslim edilen kareler (kaydırma sırası dosya sırasıdır)
- `PAYLASIM.md` — caption'lar, hashtag'ler, gün/saat önerisi, görsel alt metinleri, yayın öncesi notlar
- `onizleme/*.png` — her gönderinin tek bakışta kontak sayfası
- `kaynak/` — tüm görselleri üreten kod (`lib.js` ortak çizimler, `posts/p1–p4.js` gönderiler, `build.js`, `render.js`, `html/` ara HTML dosyaları)

## Nasıl açılır / yeniden üretilir
PNG'leri doğrudan açın/yükleyin. Yeniden üretmek için (Node + `/usr/bin/chromium` gerekir):
```
node kaynak/build.js        # hepsi
node kaynak/build.js p3     # yalnız 3. gönderi (p1–p4)
```
Çıktı `gonderiler/` altına yazılır. Tek tek kare önizlemek için `kaynak/html/<gönderi>/NN.html` dosyalarını tarayıcıda açabilirsiniz (1080×1350).

## Kurallara uyum
Görsel üretim modeli kullanılmadı; dışarıdan görsel/ikon/font indirilmedi. Tüm illüstrasyonlar (bardak, demlik, vapur, silüet, ikonlar, harita, radar…) kodla üretilmiş SVG/HTML/CSS; fontlar sistemdeki açık lisanslı Noto Serif Display / Noto Sans / iA Writer Quattro. Render Chromium headless ile, sıralı yapıldı (paralel render bir karede ara sıra döşeme hatası veriyordu; `build.js` bu yüzden sıralı çalışır).

## Kurgusal / doğrulanmalı içerik
Marka brief'inde olmayıp içerik için uydurduğum ayrıntılar: harman notaları (bakır/turunç/duman), atölye akışı (kokla–demle–harmanla), "DEMİNİAL" kodu, bilet no 042, radar puanları, "çay dahil", "masa sayısı sınırlı", demleme değerleri (95°C, 4–5 dk, 1 tatlı kaşığı/200 ml). Gerçek marka bilgisiyle teyit edilmeli. Atölye saati/fiyatı brief'te olmadığı için görsellerde yok.
