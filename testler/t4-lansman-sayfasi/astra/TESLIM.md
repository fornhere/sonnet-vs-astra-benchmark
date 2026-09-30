# aure 01 — Sesin saf hâli.

Hayali **aure 01** kablosuz hoparlörü için Türkçe bir 3D lansman sayfası. Ürünün endüstriyel tasarımı, marka kimliği, metinleri, 3D modeli ve sayfa tasarımı bu çalışma için oluşturuldu.

## Açılış

**`index.html` dosyasını Chromium, Chrome, Edge veya Firefox ile açın.** Derleme, kurulum ve internet bağlantısı gerekmez; dağıtım dosyaları hazırdır.

Yerel sunucu tercih edilirse bu klasörde:

```bash
python3 -m http.server 4187
```

Ardından **http://localhost:4187** adresini açın. Aynı komut `npm start` ile de çalışır. Port kullanımda ise farklı bir port seçilebilir.

## Deneyim

- Kaydırmayla konum ve açı değiştiren gerçek zamanlı Three.js ürünü.
- Alüminyum gövde, dokulu akustik örgü ve iç sürücülerin ayrıldığı 3D görünüm.
- Kum, Gece ve Bakır renkleri; iki seçici birbirine bağlıdır.
- Fareyle veya dokunarak 360° ürün inceleme. Son ürün görünümünde sağ/sol ok tuşları ve Home da kullanılabilir.
- Kullanıcı isteğiyle çalan, Web Audio ile sentezlenmiş kısa bir ambient ses eskizi.
- Açılır teknik özellikler, doğrulamalı ön kayıt formu, başarı ekranı ve kayıt silme kontrolü.
- Mobil yerleşim, klavye erişimi, azaltılmış hareket tercihine destek ve WebGL için görsel yedek.

**Bu hayali bir ürün konseptidir.** Fiyat ve teknik özellikler kurgusaldır. Ön kayıt, yalnızca tarayıcının `localStorage` alanına yazılan bir demo kaydıdır; sunucuya veri göndermez, e-posta yollamaz, ödeme veya gerçek sipariş oluşturmaz. Ses eskizi bir ürün ses kaydı değildir.

## Dosyalar

| Dosya / klasör | İçerik |
|---|---|
| `index.html` | Hazır sayfanın giriş dosyası |
| `style.css` | Masaüstü, tablet ve mobil tasarım |
| `app.js` | Three.js dahil, hazır ve bağımsız JavaScript paketi |
| `main.js` | Düzenlenebilir 3D sahne ve etkileşim kaynak kodu |
| `assets/` | Yerel fontlar, fotoğraf, ürün renderları, favicon, font lisansları |
| `ASSETS.md` | Görsel, font, ses ve kütüphane kaynakları |
| `vendor/` | Three.js lisansı |
| `scripts/` | Tarayıcı doğrulama ve görsel çıktı betikleri |
| `qa/` | Chromium ekran görüntüleri ve kontrol sonuçları |
| `package.json`, `package-lock.json` | Kaynak kodu yeniden derleme bağımlılıkları |

## Geliştirme ve doğrulama

```bash
npm install
npm run build
npm start
```

`npm test`, geçici bir yerel sunucu açıp kontrolü tamamladığında kapatır. Testler `/usr/bin/chromium` kullanır. Farklı bir sunucu adresi için `AURE_URL=http://localhost:PORT npm test`.

Hazır sayfayı kullanmak için Node.js veya `node_modules` gerekli değildir. `index.html`, `style.css`, `app.js` ve `assets/` klasörünü birlikte tutmak yeterlidir.

## Tamamlanan kontrol

Chromium üzerinde gerçek ekran görüntüleri incelendi ve tasarım düzeltildi. **12 ana kontrol ve 4 çevrimdışı/yedek görünüm kontrolü başarılı:** 3D açılış, kaydırma, renk eşleşmesi, klavye ile döndürme, ses, form doğrulama, kayıt/silme, diyalog odağı, teknik detaylar, 320–1440 px arası beş genişlik, doğrudan `file://` açılışı ve yerel fontlar. JavaScript hatası, eksik kaynak veya harici çalışma zamanı isteği tespit edilmedi. Sonuçlar `qa/results.json` ve `qa/fallback-results.json` içindedir.

`aure-01-site.zip`, kaynak kodu ve kılavuz dahil taşınabilir site paketidir. Ekran görüntüleri çalışma klasöründeki `qa/` altında ayrıca bulunur.
