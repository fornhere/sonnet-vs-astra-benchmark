# Demlik — Marka Kimliği Kiti (TESLİM)

Kurgusal marka: Demlik, Kadıköy'de üçüncü nesil çay dükkânı ve atölyesi. Tüm görseller kodla üretildi (Python ile SVG yolları, HTML/CSS/SVG); görsel üretim modeli kullanılmadı, dışarıdan görsel, ikon ya da font dosyası indirilmedi.

## Dosyalar

| Yol | İçerik |
|---|---|
| `kilavuz.pdf` | Marka kılavuzu, 28 sayfa, A4 yatay, yazı tipleri gömülü |
| `kilavuz.html` | Aynı kılavuz, tek dosya, çevrimdışı çalışır. Yazı tipleri (alt kümeli) gömülü, ekrana göre ölçeklenir, yazdırılınca PDF ile aynı çıkar |
| `logo/*.svg` | 35 vektör logo dosyası (aşağıda) |
| `kaynak/` | Üretim kodu (`derle.sh` hepsini yeniden üretir; python3, chromium ve `pip install fonttools brotli` gerekir) |

### Logo dosyaları
Adlandırma: `demlik-{kompozisyon}-{renk}.svg`

- **Kompozisyonlar:** `ana` (ikon + kelime + tanıtıcı satır), `ana-slogan` (ana, "Çay acele sevmez." ile), `yatay`, `ikon`, `kelime`, `rozet` (yuvarlak; profil, kaşe), `bardak` (16–32 px favicon işareti)
- **Renk düzenleri:** `renkli` (açık zemin), `ters` (koyu zemin, saydam), `siyah`, `beyaz` (saydam), `kahve` (tek renk koyu kahve)

Kelime logosu yazı tipi olarak değil, dış hatlara çevrilmiş yollar olarak gömülüdür; hiçbir bilgisayarda yazı kayması olmaz. Tek renkli sürümlerde bardağın camı boşluktur.

## Tasarım kararları (kısaca)
- **İkon:** çift katlı Türk çaydanlığı; karnına oyulmuş ince belli bardak. Ters çevrilince kum saatidir ve "Çay acele sevmez." fikrini taşır.
- **Kelime logosu:** Noto Serif Display Black Italic iskeletinden yeniden aralıklandırılmış, i'nin noktası Çay Kırmızısı damla. Kapağın topuzuyla aynı yuvarlağı tekrarlar.
- **Palet:** Çay Kırmızısı `#BC3C17`, Koyu Demlik `#2B1810`, Porselen `#F6EBDA`. Destek tonları ve üç harman ailesi: Karadeniz Sabahı (yeşil), Kadıköy Akşamı (mürdüm/mercan), Adaçaylı Bergamot (sarı/adaçayı). Kontrast oranları WCAG ile hesaplanıp kılavuza işlendi.
- **Tipografi:** Noto Serif Display (başlık) + Noto Sans (metin). İkisi de OFL lisanslı ve ücretsiz.
- **Grafik dil:** dört desen (Bardak Sırası, Bardak İzi, Buhar, Vapur Dalgası) ve her harman için düz renkli bir manzara illüstrasyonu.
- **Ses ve ton:** kılavuzda "şöyle deriz / böyle demeyiz" örnekleriyle; kampanya cümlesi "Demini Al."

## Kılavuz içeriği
Marka hikâyesi ve platformu · logo fikri, ana logo, kelime logosu, logo ailesi, zeminler, tek renk/özel baskı, koruma alanı ve minimum boyutlar, yanlış kullanımlar · renk (ana palet, harmanlar, erişilebilirlik) · tipografi, hiyerarşi, ses ve ton · desenler ve illüstrasyonlar · uygulamalar (kâğıt bardak ve ince belli bardak, teneke kutu/kraft poşet/poşet çay, Moda Cd. cephesi ve tabelalar, kartvizit/demleme kartı/antetli kâğıt/zarf, "Demini Al" kampanyası: afiş, gönderi, story, banner, web sitesi ve Instagram profili, bez çanta/etiket seti/çay etiketi/atölye bileti) · teslim dosyaları haritası.

## Nasıl açılır
- PDF: herhangi bir PDF okuyucu.
- HTML: `kilavuz.html` dosyasını tarayıcıda açın (internet gerekmez). Logo SVG'leri tarayıcıya, Figma'ya, Illustrator'a ya da Inkscape'e sürüklenebilir.

## Bilinen sınırlar
- Kartvizit kişisi, telefon, e-posta, bilet numarası ve kod karesi kurgusaldır. Pantone eşleşmesi verilmedi: CMYK değerleri sRGB'den hesaplanmış yaklaşık değerlerdir, baskıdan önce prova alınmalıdır.
- Mockup'lar düz vektörle çizilmiş temsili maketlerdir, fotoğraf değildir.
