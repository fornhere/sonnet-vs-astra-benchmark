# Demlik — “Demini Al” kampanya teslimi

**Başlangıç:** `onizleme.html` dosyasını tarayıcıda açın. Tüm 10 görsel tek sayfadadır; beş boyutun hareketli sürümlerini kart üzerindeki “Hareketli izle” düğmesinden açabilirsiniz. PNG ve HTML5 ZIP indirme bağlantıları kartlardadır. Dosya doğrudan, internet veya sunucu gerektirmeden açılır.

## Ne yapıldı?

“Akşamın ince belli hâli” fikri, Kadıköy Akşamı sonbahar harmanı için tek bir görsel dile dönüştürüldü: akşam güneşi, çizgisel ince belli bardak, krem/kiremit palet ve güçlü “Demini Al.” tipografisi. Destek mesajı: “Şehrin acelesi var. Çayın acelesi yok.”

10 boyuta özel PNG; 5 boyuta özel hareketli HTML5; tek sayfalık duyarlı önizleme; düzenlenebilir SVG'ler ve üretim kaynakları hazırlandı. Görsel üretim modeli, stok görsel, indirilen ikon veya font kullanılmadı. İllüstrasyonlar tamamen kodla çizildi. Sistemdeki açık lisanslı URW Bookman ve Nimbus Sans yazıları vektörleştirildi; reklamlar font kurulumu gerektirmez.

## Dosyalar

| Boyut | PNG | PNG büyüklüğü | HTML5 |
|---|---|---|---|
| 300×250 | `png/300x250.png` | 33.1 KB | `html5/300x250/index.html` · ZIP 9.6 KB |
| 336×280 | `png/336x280.png` | 40.6 KB | — |
| 728×90 | `png/728x90.png` | 25.9 KB | `html5/728x90/index.html` · ZIP 9.0 KB |
| 970×250 | `png/970x250.png` | 74.3 KB | `html5/970x250/index.html` · ZIP 10.4 KB |
| 300×600 | `png/300x600.png` | 61.0 KB | `html5/300x600/index.html` · ZIP 10.5 KB |
| 160×600 | `png/160x600.png` | 43.9 KB | — |
| 320×50 | `png/320x50.png` | 6.5 KB | — |
| 1080×1080 | `png/1080x1080.png` | 197.4 KB | `html5/1080x1080/index.html` · ZIP 13.0 KB |
| 1080×1920 | `png/1080x1920.png` | 261.1 KB | — |
| 1200×628 | `png/1200x628.png` | 159.7 KB | — |

- `onizleme.html` — tüm set, masaüstü/mobil önizleme ve indirme bağlantıları.
- `html5/index.html` — HTML5 dosyalarının ve ZIP paketlerinin kısa kataloğu.
- `html5/<boyut>.zip` — her reklam için ayrı paket; ZIP kökünde tek `index.html` vardır.
- `demlik-demini-al.zip` — temiz teslim arşivi: PNG, HTML5, önizleme, SVG, kaynak kod ve belgeler. Geliştirme bağımlılıkları dahil edilmez.
- `kaynak/svg/` — 10 ölçeklenebilir, fonttan bağımsız SVG kaynak.
- `kaynak/uret.py` — metinler, palet, çizim ve boyuta özel yerleşimler.
- `kaynak/KREATIF.md` — kampanya fikri, renkler, yazı karakterleri ve hareket akışı.
- `kontrol/` — tarayıcı raporları, önizleme ekran görüntüleri ve animasyon kontrol kareleri.

## HTML5 kullanımı

Her `index.html` tek başına çalışır; harici görsel, font, JS veya CSS gerektirmez. Reklam ölçüsü `ad.size` meta etiketiyle tanımlıdır. Reklam yüzeyinin tamamı klavye ile de erişilebilen bir bağlantıdır.

Varsayılan hedef brief'teki kurgusal `https://demlik.com.tr` adresidir. Gerçek yayında her dosyanın başındaki `var clickTag = "https://demlik.com.tr";` değerini kampanya hedefiyle değiştirin. JS kapalı yedek davranışı için bağlantının `href` değerini de aynı adrese ayarlayın. Reklam sunucusu aynı pencereye `window.clickTag` atayabilir. Bu paket genel HTML5 teslimidir; platforma özgü exit makrosu gerektiğinde bu noktaya bağlanır. Reklam hesabına yükleme veya yayın işlemi yapılmadı.

Giriş animasyonu 1,95 saniyede tamamlanır. Buhar hareketi 13,2 saniyede sonlanır; kompozisyon sonrasında sabit kalır. Sonsuz döngü ve ses yoktur. `prefers-reduced-motion` etkinse tüm animasyonlar kapanır. Dosyanın sonuna `?static=1` eklemek de sabit sürümü gösterir.

Teklif ilk hafta **atölye** için %20 indirimdir. Çay ürününde indirim iddiası yoktur. 320×50 boyutta okunabilirlik için marka, kampanya, ürün adı ve CTA kullanıldı; teklif metni sıkıştırılmadı. 1080×1080 HTML5 sürümü web kullanımı içindir; sosyal medya yüklemesinde ilgili PNG kullanılır.

## Kontrol

- Chromium'da 10 PNG doğal boyutlarında üretildi ve boyutları doğrulandı; RGB, opak PNG.
- Küçük formatlar gerçek piksel boyutunda, tüm set toplu olarak görsel incelendi.
- Beş HTML5 için 0 / 0,65 / 1,8 / 6,8 / 14 saniye kareleri alındı ve incelendi.
- HTML5 dosyalarında JS hatası ve harici kaynak isteği bulunmadı; reklam boyutunda kaydırma/taşma yok.
- 1440 ve 390 piksel ekran genişliğinde önizleme kontrol edildi: 10/10 görsel yükleniyor, 5/5 hareketli önizleme açılıyor, yatay taşma yok.
- Azaltılmış hareket tercihinde 0 aktif animasyon; yerel dosya açılışı ve JavaScript kapalı bağlantı yedeği doğrulandı.
- `clickTag` değişikliği ve yeni sekmenin `opener` yalıtımı, dış siteye gerçek istek göndermeyen yerel yönlendirme testiyle doğrulandı.
- Platforma özel reklam ağı sertifikasyonu yapılmadı.

## Yeniden üretme

Görüntülemek için kurulum gerekmez. Kaynakları değiştirmek ve yeniden üretmek için bu klasörde:

```bash
python3 -m venv .venv
.venv/bin/pip install -r kaynak/requirements.txt
npm install
.venv/bin/python kaynak/uret.py
node kaynak/render.mjs
.venv/bin/python kaynak/onizleme_uret.py
.venv/bin/python kaynak/paketle.py
```

Üretim Linux'ta `/usr/bin/chromium` ve `/usr/share/fonts/gsfonts/` altındaki URW Bookman Demi / Demi Italic ile Nimbus Sans Regular / Bold sistem fontlarını kullanır. Başka ortamda bu yolları `kaynak/uret.py` ve `kaynak/render.mjs` içinde güncelleyin. Bu bağımlılıklar yalnız yeniden üretim içindir; hazır reklam dosyalarına gerekli değildir.

İsteğe bağlı yerel sunucu:

```bash
python3 -m http.server 18973 --bind 127.0.0.1
```

Ardından `http://127.0.0.1:18973/onizleme.html` adresini açın. Sunucu çalışırken `npm run qa` kontrolleri tekrar çalıştırır.
