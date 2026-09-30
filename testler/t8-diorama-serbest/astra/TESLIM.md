# BOROUGH — A little New York

Manhattan’ı ahşap taban üzerinde duran, gezilebilir bir voxel şehir maketi olarak tasarladım. Özgün sahne geometrisi kodla üretiliyor; fotoğraf, hazır şehir modeli veya harita servisi kullanılmıyor.

## Açılış

**`index.html` dosyasını Chromium, Chrome, Edge veya Firefox ile açın.** Kurulum, internet bağlantısı ve sunucu gerektirmez. WebGL açık olmalıdır.

İsterseniz bu klasörde yerel sunucu da kullanabilirsiniz:

```bash
python3 -m http.server 8000
```

Ardından `http://localhost:8000` adresini açın.

## Deneyim

- 350’den fazla bina ve 700’den fazla ağaç; kıyılar, iskeleler, yollar, yaya geçitleri, taksiler, çatı depoları ve hareketli tekneler.
- Özel modellenmiş Empire State, Chrysler Building, One World Trade Center ve Flatiron; Central Park’ın yolları, göletleri ve rezervuarı; East River üzerinde üç köprü.
- Döndürme, yakınlaşma, kaydırma, yumuşak kamera geçişleri ve otomatik yavaş tur.
- Altı seçilebilir yer, kısa hikâyeler ve yakın planlar. Dört ana odak alt çubuktan, diğerleri sahne işaretlerinden ve bilgi kartındaki ok üzerinden erişilebilir.
- Gün ışığı, altın saat, mavi saat ve gece arasında ışık ayarı. Gece seçili pencereler ve kıyı lambaları yanar.
- İsteğe bağlı, tarayıcı içinde üretilen şehir/nehir ambiyansı. Başlangıçta ses kapalıdır.
- Kamera düğmesi mevcut görünümü **1920 × 1280 PNG kartpostal** olarak indirir.
- Telefon düzeni, dokunmatik kontroller, klavye kısayolları ve azaltılmış hareket tercihine uyum.

Bu, Manhattan’ın karakterini yorumlayan sanatsal bir makettir; bina konumları, mesafeler ve yükseklikler ölçülü bir coğrafi harita iddiası taşımaz.

## Kontroller

| İşlem | Kontrol |
|---|---|
| Maketi döndür | Sol fare ile sürükle / tek parmak |
| Yakınlaş / uzaklaş | Fare tekerleği / iki parmakla sıkıştır / `+` ve `−` |
| Kadrajı kaydır | Sağ fare ile sürükle / iki parmakla sürükle |
| Ada görünümüne dön | Ev düğmesi / `Home` |
| Yavaş tur | Dairesel ok düğmesi / `Space` |
| Yer seç | Sahne işareti veya alt çubuk |
| Sıradaki yeri ziyaret et | Bilgi kartının sağ altındaki ok |
| Geceye geç | “Set the mood” sürgüsü |
| Kartpostal indir | Kamera düğmesi |
| Kullanım rehberi | “Field notes” / kapatmak için `Esc` |

## Dosyalar

- `index.html` — teslimin başlangıç sayfası.
- `style.css` — arayüz, temalar ve mobil düzen.
- `app.bundle.js` — 3B motoru da içeren, hazır derlenmiş çevrimdışı uygulama.
- `main.js` — okunabilir sahne, geometri, kamera ve etkileşim kaynak kodu.
- `assets/` — yerel yazı tipleri, font tanımları ve favicon.
- `vendor/OrbitControls.js` — kaynak kodun kullandığı Three.js kamera kontrolleri.
- `licenses/` — Three.js ve DM yazı tiplerinin lisansları.
- `screenshots/` — tarayıcıdan alınmış genel görünüm, park, gece, köprü, mobil ve dizüstü ekran görüntüleri; indirilen örnek kartpostal.
- `tests/experience.spec.js`, `playwright.config.js` — gerçek Chromium ile çevrimdışı uçtan uca kontroller.
- `package.json`, `package-lock.json` — kaynak geliştirme bağımlılıkları.

**Yalnız çalıştırmak veya paylaşmak için** `index.html`, `style.css`, `app.bundle.js`, `assets/` ve `licenses/` yeterlidir. `node_modules/` gerekli değildir.

## Kaynaktan geliştirme

```bash
npm install
npm run build
npm run dev
```

`npm run build`, `main.js` değişikliklerini `app.bundle.js` içine derler. Statik HTML/CSS düzenlemeleri için derleme gerekmez. Geliştirme sunucusu varsayılan olarak `http://localhost:5173` adresindedir.

```bash
npm test
```

Testler `/usr/bin/chromium` kullanır. Gerekirse `playwright.config.js` içindeki tarayıcı yolunu kendi sisteminize göre değiştirin. Testler başlangıç sayfasını doğrudan `file://` üzerinden açar; uzak HTTP isteği olmadığını da doğrular.

## Teknik notlar

Sahne deterministik bir tohumdan üretilir. Voxel blokları ve pencereler instancing ile gruplanır; cam ayrıntıları düzlem geometrisidir. Sabit gölgeler yalnızca ışık değiştiğinde yeniden hesaplanır. Harici API, hesap, analiz/telemetri, CDN veya çalışma zamanında indirme yoktur.

## Doğrulama

Üç uçtan uca Chromium testi geçti: çevrimdışı masaüstü deneyimi, telefon kontrolleri ve dizüstü/klavye kullanımı. Kamera sürükleme, semt geçişleri, gece aydınlatması, etiket aç/kapat, ses, rehber, otomatik tur ve gerçek PNG indirmesi kontrol edildi. Tarayıcı JavaScript hatası ve uzak ağ isteği bulunmadı.

Yazılımsal WebGL algılandığında uygulama boşta yeniden çizim yapmaz; geçişleri kısaltır ve gölge çözünürlüğünü azaltır. Donanım hızlandırmalı tarayıcılarda tam detaylı gölgeler ve teknelerin sakin hareketi korunur.
