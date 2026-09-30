# Kapadokya — Zamanın ötesinde

Tarayıcıda çalışan, gün doğumunda başlayan üç boyutlu bir Kapadokya keşfi. Açılışta 36 saniyelik kesintisiz kamera yolculuğu oynar; ardından kontrol ziyaretçiye geçer. **Vadiyi keşfet** veya **Turu geç** ile istediğiniz anda dolaşmaya başlayabilirsiniz.

## Açma

**Kurulum gerekmez. `index.html` dosyasını Chromium, Chrome, Edge veya Firefox ile açın.** JavaScript, fontlar ve tüm görsel üretim kodu yereldir; internet gerekmez.

Yerel sunucu tercih edilirse, bu klasörde:

```bash
python3 -m http.server 4173
```

Tarayıcı adresi: **http://localhost:4173**

WebGL 2 ve donanım hızlandırması gerektirir. Daha düşük güçlü cihazlarda **? → Kalite: Akıcı** seçilebilir. `?quality=low` adres parametresi aynı modu açılışta etkinleştirir.

## Deneyim

- Prosedürel, sabit tohumla üretilmiş üç boyutlu arazi; farklı biçimlerde peri bacaları, erozyon katmanları, kaya oyukları ve Uçhisar'dan ilham alan bir yerleşim.
- Kumaş panelli sıcak hava balonları, sepetler, halatlar, hareketli brülörler, kuşlar ve bozkır bitkileri.
- Kesintisiz sinematik açılış; yumuşak kamera hareketiyle dört seyir noktasına geçiş.
- Serbest uçuş, zemini takip eden yürüyüş ve kayalara/evlere çarpışma kontrolü.
- Aşk Vadisi, Peri Bacaları, Uçhisar ve Kızıl Vadi rotaları; hareketli konum işaretçisiyle eş yükselti haritası.
- Balona eşlik etme; gün doğumu, gün batımı ve mavi saat ışıkları.
- Arayüzü gizleyen fotoğraf modu ve yerel PNG indirme.
- İsteğe bağlı, Web Audio ile üretilen rüzgâr/kuş ambiyansı. Ses başlangıçta kapalıdır.
- Dokunmatik joystick, fareyle sürükleme, klavye kontrolleri, tam ekran ve hareket azaltma tercihine uyum.

Bu dünya **Kapadokya'nın sanatsal yorumudur**; birebir coğrafi tarama, gerçek ölçekli harita veya seyahat navigasyonu değildir.

## Kontroller

| Girdi | İşlev |
| --- | --- |
| W A S D / ok tuşları | İleri, sola, geri, sağa |
| Fareyle / parmakla sürükleme | Etrafa bak |
| Q / E | Uçarken yüksel / alçal |
| Shift | Hızlan |
| F | Uçuş / yürüyüş |
| P | Fotoğraf modu |
| M | Ses aç / kapat |
| Esc | Fotoğraf modundan veya menüden çık |
| ? | Kontroller penceresi |

Mobilde sol joystick ile hareket edilir, manzara sürüklenerek çevreye bakılır. Yükselme/alçalma düğmeleri uçuşta görünür.

## Dosyalar

- `index.html` — giriş sayfası ve Türkçe arayüz.
- `style.css` — masaüstü/mobil yerleşimi, tipografi ve arayüz geçişleri.
- `app.js` — Three.js dahil, hazır ve çevrimdışı çalışan paket. Açmak için derleme gerekmez.
- `src/world.js` — arazi, kaya geometrisi, malzemeler, ışık, balonlar ve çevre.
- `src/main.js` — sinematik tur, dolaşım, çarpışmalar, harita, fotoğraf, ses ve arayüz.
- `assets/` — yerel fontlar, favicon ve lisanslar.
- `captures/` — tarayıcı kontrol kareleri, fotoğraf çıktısı ve doğrulama raporu.
- `checks/` — Playwright işlevsel testleri, görsel kontrol ve gerçek dokunma testi.
- `package.json`, `package-lock.json` — geliştirme bağımlılıkları ve komutlar.

Yalnız yayın dosyaları için `index.html`, `style.css`, `app.js` ve `assets/` klasörünü birlikte taşımanız yeterlidir.

## Geliştirme

```bash
npm install --cache .npm-cache
npm run build
npm start
```

Yerel sunucu çalışırken `npm test` tarayıcı kontrollerini çalıştırır. Test Chromium'u `/usr/bin/chromium` yolunda arar; donanımdan bağımsız sonuç için SwiftShader kullanır. Yazılımsal 3D işleme nedeniyle normal kullanımın aksine yavaş çalışabilir.

Three.js r170 (MIT); Manrope ve Cormorant Garamond (SIL Open Font License). Dış model, fotoğraf, video veya ücretli servis kullanılmadı. Arazi, modeller, yüzey ayrıntıları ve sesler kodla üretilir.

## Doğrulama

Chromium içinde açılış ve vadi kadrajları, yürüyüş, Uçhisar görünümü, mavi saat, balon, fotoğraf çıktısı ve mobil yerleşim görüntülenerek kontrol edildi. İşlevsel test raporu `captures/test-results.json` içindedir. Sunuculu açılış ve doğrudan `file://` açılışı; turun otomatik ve düğmeyle devri; klavye hareketi; yürüyüş; rota geçişi; ses; ışık değişimi; PNG indirme ve yeniden oynatma geçti. Gerçek dokunma olaylarıyla joystick ve bakış kontrolü ayrıca doğrulandı (`captures/mobile-check.json`).

Hareket azaltma tercihi etkinse başlangıç turu otomatik atlanır; kullanıcı isterse yardım penceresinden veya logodan başlatabilir. Mobil cihazlarda geometri ayrıntısı otomatik azaltılır.
