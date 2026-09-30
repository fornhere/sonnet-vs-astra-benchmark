# Rota — Tohum Turu Yatırımcı Sunumu · TESLİM

## Ne yaptım
"Rota" için 12 slaytlık, 16:9 yatırımcı sunumu. Hikâye: kapak → sorun → çözüm → ürün → veri çarkı (neden yapay zekâ) → traction → birim ekonomi → büyüme motoru → rekabet → ekip → 18 aylık plan → talep (1,2 milyon USD, 18 ay pist).
Tasarım: sıcak kâğıt tonu + mürekkep siyahı, tek vurgu rengi (rota turuncusu) ve "en uygun" için yeşil. Başlıklarda Noto Serif Display, gövdede Adwaita Sans, etiketlerde Adwaita Mono (üçü de açık lisanslı sistem fontları; `fonts/` klasörüne kopyalandı). Kapak, traction ve talep slaytları koyu; geri kalanı açık zeminli.
Tüm görseller kodla üretildi (HTML/CSS/SVG): metro haritası tarzı rota ağı, maliyet rampası, ürün ekranı maketi, veri çarkı, nokta ızgarası, şelale grafiği, 2×2 konumlandırma matrisi, tahmin grafiği, halka grafik. Görsel üretim modeli kullanılmadı, dışarıdan hiçbir görsel/ikon/font indirilmedi.

## Dosyalar
- `sunum.pdf` — **teslim çıktısı**, 12 sayfa, 16:9 (1920×1080 sayfa boyutu), fontlar gömülü.
- `KONUSMA.md` — her slayt için 2–3 cümlelik sunum notu.
- `deck.html` — kendi kendine yeten kaynak sunum (tarayıcıda aç; ok tuşlarıyla gez, pencereye sığar).
- `build.mjs` — slaytları üreten betik (SVG/HTML şablonları burada). `styles.css` — ortak stil. `fonts/` — kullanılan fontlar.
- `render.sh` — `build.mjs` → `deck.html` → Chromium ile `sunum.pdf` + `onizleme/` PNG'leri.
- `onizleme/` — PDF'ten alınmış önizleme görüntüleri (son render).

## Nasıl açılır / yeniden üretilir
- Sunmak için: `sunum.pdf`'i aç, ya da `deck.html`'i Chromium/Chrome ile aç (ok tuşları/boşluk ile slayt değiştir).
- Yeniden üretmek için: `./render.sh` (gereksinim: node, chromium, poppler `pdftoppm`). Metin/rakam değiştirmek için `build.mjs`'i düzenleyip tekrar çalıştır.

## Rakam disiplini (önemli)
Brifteki rakamlar aynen kullanıldı: 14 ay, 310 satıcı, 48.000 gönderi/ay, 620.000 ₺ MRR, %11 aylık büyüme, %71 brüt marj, 4 kurucu (2 yazılım, 1 lojistik, 1 satış), 1,2 milyon USD, 18 ay pist.
Bunlardan **hesaplananlar** slaytta "hesaplama" olarak belirtildi: 2.000 ₺/satıcı, ≈12,9 ₺/gönderi, ≈155 gönderi/satıcı, brüt kâr 440.200 ₺, doğrudan maliyet 179.800 ₺, yıllık gelir hızı 7,44 M ₺, 1,11¹² ≈ 3,5×, 66.667 USD/ay ortalama bütçe.
**Yeni / varsayımsal** olanlar açıkça "tahmin", "plan" veya "illüstratif" etiketli: 18 aylık MRR senaryoları (%11 ve muhafazakâr %6 aylık büyüme → ≈4,06 M ₺ ve ≈1,77 M ₺), fon dağılımı yüzdeleri (40/30/20/10), yol haritası kalemleri, slayt 4'teki örnek ekran değerleri (Kargo A/B/C fiyat ve süreleri gerçek kargo firması veya müşteri verisi değildir).
Bilerek **yazılmayanlar**: TAM/SAM pazar büyüklüğü, CAC/LTV/churn, kurucu isimleri/özgeçmişleri, iletişim bilgisi, TL–USD kuru — brifte olmadığı için uydurulmadı. Gerçek kullanımda bunlar eklenmeli (özellikle pazar büyüklüğü ve kurucu isimleri).

## Bilinen notlar
- PDF'te Adwaita Sans (değişken font) Type 3 olarak gömülüdür; görünüm ve metin seçimi sorunsuzdur.
- Slayt 9 (rekabet) nitel konumlandırmadır; ölçülmüş pazar payı değildir ve slaytta bu şekilde belirtilmiştir.
