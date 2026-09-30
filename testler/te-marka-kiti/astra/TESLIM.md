# Demlik — marka kimliği kiti

İnce belli bardak ile kum saatini birleştiren bir işaret; sıcak Bookman harfleri; Kâğıt, Dem, Kiremit, Adaçayı ve Pirinç renklerinden oluşan bir kimlik sistemi hazırlandı. Ana fikir: **Şehrin hızına bir dem arası.**

## Önce bunları açın

- **[kilavuz.html](kilavuz.html)** — 16 sayfalık çevrimdışı marka kılavuzu. Chromium, Chrome veya Firefox'ta açın. Bölüm bağlantıları ve SVG indirme bağlantıları çalışır; kurulum veya sunucu gerekmez.
- **[kilavuz.pdf](kilavuz.pdf)** — aynı kılavuzun 16 sayfalık yatay PDF sürümü. İçindekiler bağlantıları ve seçilebilir kılavuz metinleri bulunur.
- **[demlik-marka-kiti.zip](demlik-marka-kiti.zip)** — teslim dosyaları, fontlar/lisanslar ve üretim kaynakları bir arada. HTML'yi tek başına taşımak yerine ZIP'i açarak klasör düzenini koruyun.

Kılavuz; marka fikri, logo ailesi, koruma alanı, minimum boyutlar, yanlış kullanımlar, HEX/RGB/CMYK palet, kontrastlar, tipografik ölçek, desen, dil/ton ve uygulamaları içerir.

## Logo dosyaları — 12 SVG

| Düzen | Dem rengi | Ters / Kâğıt | Siyah tek renk |
|---|---|---|---|
| Ana / dikey | [Ana](logo/demlik-ana.svg) | [Ters](logo/demlik-ana-ters.svg) | [Tek renk](logo/demlik-ana-tek-renk.svg) |
| Yatay | [Yatay](logo/demlik-yatay.svg) | [Ters](logo/demlik-yatay-ters.svg) | [Tek renk](logo/demlik-yatay-tek-renk.svg) |
| İkon | [İkon](logo/demlik-ikon.svg) | [Ters](logo/demlik-ikon-ters.svg) | [Tek renk](logo/demlik-ikon-tek-renk.svg) |
| Yalın logotip | [Logotip](logo/demlik-logotip.svg) | [Ters](logo/demlik-logotip-ters.svg) | [Tek renk](logo/demlik-logotip-tek-renk.svg) |

Logolar şeffaf zeminli, tamamen vektör ve font bağımsızdır. Açık renkli ters dosyaları koyu bir zemin üzerinde kullanın. Illustrator, Inkscape veya Figma'ya SVG olarak alın; logoyu yeniden yazarak oluşturmaya çalışmayın.

## Uygulamalar — 12 SVG + 1 PNG

| Dosya | İçerik / kullanım |
|---|---|
| [ambalaj-maket.svg](uygulamalar/ambalaj-maket.svg) | Karadeniz Sabahı, Kadıköy Akşamı ve Adaçaylı Bergamot; üç ambalajın bir arada sunumu |
| [harman-01-etiket.svg](uygulamalar/harman-01-etiket.svg) | Karadeniz Sabahı ön etiketi |
| [harman-02-etiket.svg](uygulamalar/harman-02-etiket.svg) | Kadıköy Akşamı ön etiketi |
| [harman-03-etiket.svg](uygulamalar/harman-03-etiket.svg) | Adaçaylı Bergamot ön etiketi |
| [bardak-maket.svg](uygulamalar/bardak-maket.svg) | Kılıflı karton bardak ve ince belli cam bardak |
| [tabela-maket.svg](uygulamalar/tabela-maket.svg) | Ana tabela, asma tabela ve vitrin tasarımı |
| [kartvizit-maket.svg](uygulamalar/kartvizit-maket.svg) | İki yüzün görselleştirmesi |
| [kartvizit-on-baski.svg](uygulamalar/kartvizit-on-baski.svg) | Ön yüz; 91 × 61 mm, dört yönde 3 mm taşma |
| [kartvizit-arka-baski.svg](uygulamalar/kartvizit-arka-baski.svg) | Arka yüz; net kesim 85 × 55 mm |
| [kampanya-maket.svg](uygulamalar/kampanya-maket.svg) | “Demini Al” A3 afiş ve sosyal gönderi sunumu |
| [demini-al-afis-A3.svg](uygulamalar/demini-al-afis-A3.svg) | A3 / 297 × 420 mm net boyut, vektör afiş |
| [demini-al-sosyal-1080x1350.svg](uygulamalar/demini-al-sosyal-1080x1350.svg) | Sosyal gönderinin vektör kaynağı |
| [demini-al-sosyal-1080x1350.png](uygulamalar/demini-al-sosyal-1080x1350.png) | Doğrudan platforma yüklenebilecek 4:5 görsel |

Üç ön etiket 80 × 108,33 mm'dir. Uygulama SVG'lerindeki tüm yazılar eğrilere dönüştürülmüştür; içerik değişiklikleri için üretim kodundaki metinler değiştirilebilir.

## Diğer kaynaklar

- `varliklar/dem-halkalari.svg` — logonun ince belinden türeyen çizgisel desen.
- `varliklar/renkler.css` — beş rengin CSS değişkenleri.
- `varliklar/fonts/` — çevrimdışı HTML için WOFF2 fontlar; `kaynak/` altında sistemden kopyalanan özgün OTF/TTF dosyaları.
- `varliklar/lisanslar/OKU.md` — font kökenleri, lisanslar ve dönüşüm bilgileri.
- `kaynak/uret.py` — logolar, çizimler, HTML ve WOFF2 alt kümelerini üreten Python kaynağı.
- `kaynak/render.mjs` — Chromium ile HTML kontrolü, PDF çıktısı, sayfa ekran görüntüleri ve sosyal PNG üretimi.
- `kontrol/` — HTML ve PDF sayfa görüntüleri, masaüstü/mobil kontrolleri, son kontrol raporu.

## Baskı ve yayın kapsamı

Kılavuz PDF'si sunum içindir; PDF/X üretim dosyası değildir. SVG kaynaklar RGB'dir. CMYK sayıları profil bağımsız matematiksel yaklaşıktır; kâğıda, mürekkebe ve matbaa ICC profiline göre prova gerekir.

Kartvizitte taşma hazırlanmıştır: çalışma alanı 91 × 61 mm, net kesim 85 × 55 mm. SVG koordinatlarında kesim kutusu `x=18, y=18, width=510, height=330` olarak tanımlanır. Desen taşma alanına devam eder. Kesim işaretleri ve son PDF/X dönüşümü matbaa tarafından eklenebilir.

Ambalajlar ön etiket ve görsel uygulama örnekleridir. İçerik, net miktar, üretici/parti ve gerekli diğer bilgiler brief'te bulunmadığından uydurulmadı. Gerçek ürüne ait bilgilerle arka etiket hazırlanmalıdır. Bardak, cephe ve ambalaj, tedarikçi şablonlarına uyarlanmalıdır. A3 afiş net boyuttadır; baskıda 3 mm taşma eklenmelidir.

Ekim'in ilk haftası kampanya görsellerinde **1–7 Ekim** olarak somutlaştırıldı. Yıl eklenmedi. Atölyenin seansları ve indirim koşulları yayın öncesi marka tarafından netleştirilmelidir. Herhangi bir hesaba yayın yapılmadı.

## Yeniden üretme

Dosyaları görüntülemek için bunlar gerekli değildir. Mevcut çalışma ortamında:

```bash
.build/venv/bin/python kaynak/uret.py
node kaynak/render.mjs
pdftoppm -png -scale-to 1440 kilavuz.pdf kontrol/pdf
```

Başka bir Linux ortamında Python 3, Node.js, Chromium ve Poppler ile:

```bash
mkdir -p .build/tmp kontrol
uv venv .build/venv
uv pip install --python .build/venv/bin/python -r kaynak/requirements.txt
npm install --prefix .build playwright-core@1.63.0
.build/venv/bin/python kaynak/uret.py
node kaynak/render.mjs
```

Chromium yolu `kaynak/render.mjs` içinde `/usr/bin/chromium` olarak ayarlanmıştır. Fontların yerel kaynakları kitin içinde bulunur. Dosyalar doğrudan `file://` üzerinden açıldığı için port veya sunucu gerekmez.

## Doğrulama

16 sayfa Chromium'da açıldı; PDF ayrıca Poppler ile 16 PNG'ye dönüştürülüp görsel olarak incelendi. Kırık görsel, JavaScript hatası, metin taşması ve mobil yatay taşma bulunmadı. 24 SVG XML olarak ayrıştırıldı; gömülü raster görsel, canlı font bağımlılığı ve yinelenen SVG kimliği bulunmadı. Türkçe karakterler, renk kontrastları, logo boşlukları, kartvizit metin boyutları ve kampanya teklifi kontrol edildi.

Tüm görseller HTML/CSS/SVG ve kodla oluşturuldu. Görsel üretim modeli kullanılmadı; dışarıdan görsel, ikon veya font dosyası indirilmedi. Yalnız font lisans metinleri resmî kaynaklarından alındı.
