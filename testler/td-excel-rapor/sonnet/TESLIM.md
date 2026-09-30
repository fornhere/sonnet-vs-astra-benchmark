# TESLİM — Demlik 2025 yönetim raporu ve Excel paneli

## Ne yaptım

`girdi/demlik-satis-2025.xlsx` (yalnız okundu) verisini işletme sahibine sunulacak bir yönetim raporuna ve sahibin kendi güncelleyebileceği bir Excel paneline çevirdim.

- **Analiz:** 8.636 satırı temizledim (12 tekrar sipariş, 6 küçük harfli kanal adı, 5 eksi adetli satır), sonra ay/kanal/ürün/kategori kırılımlarında kâr–zarar, başabaş, iade, indirim, kargo, pazarlama, stok kesintisi ve mevsimsellik analizi yaptım.
- **Ana sonuç:** Ciro 4,91 mn TL, net kâr yalnız ≈71 bin TL (%1,4). Kâr 4 kış ayında kazanılıyor; Nis–Ağu ort. 270 bin TL, başabaş ≈400 bin TL/ay. Bardak satışı 1 Nis–31 May arası çöktü (≈174 bin TL ciro), Trendyol iadesi 18 Ağustos'ta %3 → %16'ya fırladı, Trendyol'da indirim kalıcı hâle gelmiş. Tam liste: `BULGULAR.md`.
- **Rapor:** 15 sayfa, A4 yatay; her sayfa bir bulgu + grafik + "ne yapmalı" (yönetici özeti, kâr/zarar, paranın yolculuğu, kanallar, 3 sorun, ürünler, çay/kargo, atölye, pazarlama, fırsat büyüklüğü, eylem planı, yöntem/veri notları).
- **Excel paneli:** formüllü, tablo tabanlı; yeni satır ekleyince her şey güncellenir.

## Dosyalar

| Dosya | Ne |
|---|---|
| `rapor.pdf` | Yönetim raporu, 15 sayfa A4 yatay (yazdırma/e-posta için) |
| `rapor.html` | Aynı rapor, tek dosya (dış bağımlılık yok); tarayıcıda açın, grafiklerin üzerine gelince değerler görünür; dar ekranda sayfalar küçülür |
| `panel.xlsx` | Sahibin güncelleyeceği panel: 10 sayfa, 14 grafik, ≈130 bin formül |
| `BULGULAR.md` | Bulguların, önerilerin, veri sorunlarının ve varsayımların kısa metni |
| `kaynak/` | Üretim kodu: `analiz.py` (tek sayı kaynağı → `metrics.json`), `grafik.py` (SVG grafik kütüphanesi), `rapor_uret.py`, `xlsx_uret.py`, `xlsx_dogrula.py`, `pdf_uret.sh`; `kesif/` keşif betikleri |

## Nasıl açılır / çalıştırılır

- **Rapor:** `rapor.pdf` çift tıkla. `rapor.html` herhangi bir tarayıcıda açılır (internet gerekmez).
- **Panel (`panel.xlsx`), Excel'de:** açılışta **Özet** sayfası gelir.
  1. Yeni siparişleri **Veri** sayfasındaki tablonun hemen altına yapıştırın (A–K sütunları); gri başlıklı sütunlar ve tablo otomatik uzar.
  2. Yeni ayın giderini **Giderler** tablosuna satır olarak ekleyin.
  3. **Özet!C4**'ten yılı seçin (2025–2030); sayfalar ve grafikler yenilenir.
  - **Aylık:** kâr–zarar + başabaş. **Kanal / Ürün:** özet tablolar, ay × kanal/ürün matrisleri, ısı haritaları. **Senaryo:** "fiyat %3 artarsa / Trendyol iadesi düşerse / indirim azalırsa" kâr etkisi. **Veri Kontrol:** tekrar, tanımsız kanal/ürün, eksi adet, tutar tutarsızlığı, gideri eksik ay. **Ayarlar:** kanal/ürün listeleri, kanal başına komisyon %. **Rehber:** adım adım kullanım ve hesap kuralları.
  - Mavi yazı + sarı zemin = sizin girdiğiniz hücre; gri başlık = otomatik sütun.
- **Yeniden üretmek** (isteğe bağlı): `uv venv /tmp/v && uv pip install --python /tmp/v/bin/python openpyxl pandas xlsxwriter numpy`, sonra `cd kaynak && python analiz.py && python rapor_uret.py && python xlsx_uret.py && ./pdf_uret.sh` (PDF için Chromium gerekir).

## Doğrulama

- `panel.xlsx`: 130.432 formülün hepsi LibreOffice'te yeniden hesaplatıldı ve Python modelindeki önbellek değerleriyle karşılaştırıldı: **0 fark** (`kaynak/xlsx_dogrula.py`). Komisyon %10 girilince, yıl 2026 (boş) seçilince ve senaryo girdileri değişince formüllerin doğru aktığı ayrıca denendi. **Gerçek Microsoft Excel'de açılış denenemedi** (bu ortamda yok). Tablolar, yapısal başvurular ve grafikler xlsxwriter ile yazıldı, LibreOffice ve openpyxl sorunsuz açtı.
- Rapor: Chromium'da açıldı, PDF'in 15 sayfası tek tek görselle kontrol edildi (taşma, çakışma, ek uyumu düzeltildi). Rapor ile Excel aynı kuralları kullanıyor (tekilleştirme, net satış, kâr); Excel varsayılan senaryosu raporun "kâr köprüsü" ile uyumlu (bugünkü kâr + 110 + 59 + 98 + 22 bin).

## Bilmeniz gerekenler

- **Şirket adı "Demlik"** dosya adından ve ürün adlarından varsayıldı.
- **Excel'deki özet tablolar formül tabanlıdır (SUMIFS), PivotTable değildir**; böylece kaynak tabloya satır ekleyince otomatik güncellenir. Kanal sayfasında 6, ürün sayfasında 8 yer ayrıldı; grafikler ilk 4 kanalı / 6 ürünü gösterir (yeni ekleyince grafik aralığını genişletin — Rehber'de yazıyor).
- **Kârı değiştirebilecek eksikler veride yok:** Tutar KDV dahil mi, Trendyol komisyonu/POS kesintisi, gerçek hammadde maliyeti (her ay tam %32 → tahmin gibi). Trendyol'da %10 komisyon giderlerde yoksa yıl **−53 bin TL** ile kapanır; `Ayarlar` sayfasında komisyon oranını yazınca panel kârı günceller.
- **Tahminler:** bardak kaybı, Trendyol iade fazlası, fiyat ve kargo etkileri tek yıllık veriden çıkarımdır; varsayımları rapor s.13 ve `Senaryo` sayfasında açık.
- Görsel üretim modeli, dış görsel/ikon/font kullanılmadı; tüm grafikler kodla (SVG / Excel grafik motoru). Yazı tipleri sistemdeki Noto Sans/Noto Serif (PDF'e gömülü). Paket kurulumu için `/tmp` altında geçici bir sanal ortam kullanıldı; proje klasörü dışında kalıcı dosya bırakılmadı.
