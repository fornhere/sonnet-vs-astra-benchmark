# Demlik — Demini Al

Bir haftalık Instagram içerik paketi: **3 kaydırmalı gönderi, her biri 7 kare; toplam 21 adet 1080 × 1350 PNG.** Türkçe açıklamalar, hashtag’ler, gün/saat önerileri ve alternatif metinler dahil.

## İçerik

| Klasör | Konu | Kareler |
|---|---|---|
| `gonderiler/01-kadikoy-aksami/` | “Şehir hızlı. Sen demli.” — yeni sonbahar harmanı lansmanı | `01.png`–`07.png` |
| `gonderiler/02-cumartesi-atolyesi/` | “Cumartesi biraz demlenelim.” — demleme atölyesi ve ilk hafta %20 indirim | `01.png`–`07.png` |
| `gonderiler/03-bes-soruda-dem/` | “İyi bir dem, beş iyi soru.” — kaydedilebilir demleme rehberi | `01.png`–`07.png` |

Her gönderi klasöründe ayrıca kopyalanabilir **CAPTION.txt** bulunur.

**Tek dosyada teslim:** `DEMLIK-ICERIK-PAKETI.zip` — PNG’ler, metinler, galeri, kaynaklar ve kontrol çıktıları.

## Aç ve kullan

**En kolay inceleme:** `index.html` dosyasını Chromium’da aç. Kareler yatay kaydırılır; tıklayınca büyür. Büyük görünümde sağ/sol oklarla gezilebilir, Escape ile kapanır; “PNG indir” bağlantısı ilgili dosyayı indirir.

```bash
chromium index.html
```

Alternatif olarak bu klasörde yerel sunucu aç:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Ardından `http://127.0.0.1:8080` adresine git. İncelemek veya PNG’leri kullanmak için Node, npm kurulumu ya da internet bağlantısı gerekmez.

Instagram’a yüklerken ilgili klasördeki yedi PNG’yi **01 → 07** sırasıyla seç; **4:5 oranını** koru. Açıklama ve hashtag’ler için aynı klasördeki `CAPTION.txt` dosyasını kullan.

## Diğer dosyalar

- **PAYLASIM.md:** 1–7 Ekim 2026 takvimi; üç açıklama ve hashtag grubu; gönderilerin amacı, kare akışları ve ölçüm önerileri.
- **ALT_METINLER.md:** Her bir kare için Instagram alternatif metni.
- **onizleme/tum-kareler.png:** 21 karenin tek sayfada toplu görünümü.
- **onizleme/tarayici.png** ve **onizleme/mobil.png:** Galerinin masaüstü ve mobil Chromium ekran görüntüleri.
- **kaynak/uret.mjs:** Tüm tasarımların, metinlerin, SVG çizimlerin ve galerinin düzenlenebilir kaynağı.
- **kaynak/stil.css** ve **kaynak/*.html:** Üretilmiş kare tasarımları.
- **kaynak/kareler.json:** HTML–PNG eşleştirmesi.
- **araclar/render.mjs:** Chromium üzerinden PNG üretim aracı; harici Node paketi kullanmaz.
- **onizleme/kontrol.json:** Tarayıcıdan alınan boyut, font ve metin yerleşim ölçümleri.
- **onizleme/kalite-kontrol.md:** Son görsel ve teknik kontrol özeti.

## Tasarım yaklaşımı

“Şehrin hızından çayın demine” fikri üzerinden İstanbul temposu, kişisel mola ve paylaşma duygusu birbirine bağlandı. Krem, kiremit, vişne, zeytin ve kehribar renkleri; büyük serif başlıklar, sade yardımcı metinler, ince çizgiler ve hafif kâğıt dokusu kullanıldı. Kapaklar ortak marka sistemi içinde farklılaşıyor; yedi kademeli ilerleme çizgisi carousel içindeki konumu gösteriyor.

Bardak, demlik, vapur, telefon, yaprak, terazi, termometre, zamanlayıcı ve rota çizimlerinin tamamı **SVG/CSS koduyla** oluşturuldu. Görsel üretim modeli kullanılmadı; dışarıdan görsel, ikon veya font dosyası indirilmedi. Fontlar sistemin yerel serif/sans ailelerinden sağlandı. Tüm çalışma dosyaları bu klasörün içinde.

## Düzenle ve yeniden üret

Gereksinimler: Node.js 22+ (`WebSocket` desteği), Chromium (`/usr/bin/chromium`) ve bu makinedeki sistem fontları. Aynı görünüm için mevcut ortamı kullan.

```bash
node kaynak/uret.mjs
node araclar/render.mjs
```

İlk komut HTML/CSS ve galeriyi, ikinci komut PNG’leri ve önizlemeleri yeniler. Metin dosyaları `PAYLASIM.md`, `CAPTION.txt` ve `ALT_METINLER.md` ayrıdır; metin revizyonlarında bunları da eşleştir. Render sırasında `.chromium-render/` adlı yerel tarayıcı profili oluşur. Teslim PNG’lerini kullanmak için kaynakları yeniden çalıştırmaya gerek yok.

## Planlama notları

Marka kurgusaldır; brief’teki ad, adres ve iletişim bilgileri korundu. Takvim Ekim 2026 varsayımıyla hazırlanmıştır. Paylaşım saatleri başlangıç önerisidir, hesap analitiği iddiası değildir. Kampanyanın kesin tarihleri ve atölyenin saat/ücret bilgileri brief’te yer almadığı için uydurulmadı; kullanıcı DM’ye yönlendirildi. Atölye için çizilmiş bilet rezervasyon belgesi değildir; rota çizimi navigasyon haritası değildir. Çay harmanının bileşimi, tadım notları veya sağlık faydaları hakkında doğrulanmamış vaat yoktur.
