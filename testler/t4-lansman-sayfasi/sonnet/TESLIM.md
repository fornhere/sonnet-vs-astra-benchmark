# Halcyon Meridian — kaydırmayla ilerleyen 3D ürün lansman sayfası

**Ürün (kurgusal):** Halcyon Meridian — gün ışığıyla çalışan, Grade 5 titanyum kasalı saat. Ürün adı, marka, kopya ve fiyat bana ait.

## Nasıl açılır
`index.html` dosyasını Chromium/Chrome/Firefox'ta çift tıklayıp açmak yeterli (sunucu, internet, kurulum gerekmez; `file://` ile çalışır). Yazı tipleri ve Three.js yerel pakettedir (`dist/app.js`). Masaüstü ve dikey/mobil ekran uyumludur. WebGL2 gerekir.

## Ne var (aşağı kaydırdıkça)
1. **Giriş:** Dev "Meridian" yazısının önünde süzülen 3D saat, giriş animasyonu.
2. **Kadran:** Yakın plan, ışık yansımasının kadranda gezinmesi.
3. **Anatomi:** Saat kaydırmayla **patlar** (cam, çerçeve, ibreler, kadran, kasa, mekanizma, kasa arkası); parçalar 3D'ye bağlı, canlı takip eden etiketlerle adlandırılır.
4. **Kalp:** Arkadan mekanizma; dişliler gerçek oranlarla kaydırmaya kilitli döner, denge çarkı atar, rotor sallanır.
5. **Gün ışığı:** Şehir seç (İstanbul, Ankara, İzmir, Trabzon, Van); gün-gece diski **gerçek gün doğumu/batımı** (NOAA hesabı) ile boyanır. Kaydırdıkça gün ilerler: ibreler, disk, ışık rengi ve arka plan şafaktan geceye değişir.
6. **Malzeme:** Kasa profili/taç yakın plan; 3 sonlandırma (Ham Titanyum, Obsidyen, Günbatımı) canlı seçilir; kasa, kadran, kayış ve vurgu rengi değişir.
7. **Bilekte:** İstatistikler (sayaç animasyonlu).
8. **Sipariş + teknik özellikler:** Çalışan ön sipariş penceresi (e-posta, şehir, sıra numarası; `localStorage`'a kaydeder, ödeme yok).

Sağdaki nokta rayı bölümler arası gezinir. Tüm 3D model **prosedürel** (dış model dosyası yok): kasa, kulaklar, taç, kayış, kadran dokusu, ibreler, 27 taşlı kalibre.

## Dosyalar
- `index.html`, `css/style.css` — yapı ve tasarım
- `src/` — kaynak: `main.js` (kaydırma zaman çizelgesi, arayüz), `rig.js` (sahne/kamera), `watch.js`, `movement.js`, `geo.js`, `textures.js`, `env.js`, `finishes.js`
- `dist/app.js` — derlenmiş paket (sayfa bunu yükler)
- `fonts/` — Instrument Serif, Inter, JetBrains Mono
- `onizleme/` — ekran görüntüleri
- `tools/` — derleme ve ekran görüntüsü betikleri

## Yeniden derleme (isteğe bağlı)
`npm install && ./tools/build.sh`

## Notlar
- Kontrol: Chromium'da 1600×900, 1280×720, 390×844'te kare kare bakıldı, konsolda hata yok; kabaca 45 fps ölçüldü (RTX 5060, headless).
- Kaynakta `node_modules` bulunur; sayfa için gerekmez.
