# Manhattan — Voxel Diorama (tarayıcıda gezilebilir)

Masa üstünde duran, **gerçek bina verisiyle** inşa edilmiş bir Manhattan maketi. Aşağı Manhattan'dan Harlem'e kadar
tüm ada; Hudson, Doğu Nehri, New York Limanı (Özgürlük Heykeli, Ellis ve Governors adaları), Roosevelt Adası,
Jersey City/Hoboken ve Brooklyn/Queens kıyıları maketin içinde. Maketin kenarları "kesit" gibi açık: zemin katmanları
ve camsı su bloğu yandan görünür; altında pirinç çerçeveli ahşap kaide ve plaka var.

## Nasıl açılır
`index.html` dosyasına çift tıklayın (Chrome / Edge / Firefox / Safari; WebGL2 gerekir). Sunucu, internet ya da
kurulum gerekmez — her şey `dist/` içinde önceden derlenmiş durumda (three.js dahil). İlk açılış ~2 sn.
Ek URL parametreleri: `?t=21.5` (saat), `?snow`, `?tour` (turu otomatik başlat), `?loop` (turu döngüde tut), `?clean` (arayüzü gizle), `?fps`.

## Ne var
- **Gerçek veri:** NYC OpenData bina izleri + yükseklikler (≈57 bin bina), OpenStreetMap kıyı çizgisi, parklar, göller,
  iskeleler. Harita, sokak ızgarası eksenlere oturacak şekilde ~29° döndürülmüş; 1 voxel ≈ 16 m yatay, ≈ 9,5 m dikey
  (binalar dramatik olsun diye ~1,7× abartılı). ~1 milyon görünür voxel yüzü, GPU instancing ile çizilir (60 fps).
- **Elle modellenen yapılar:** Empire State, Chrysler, One World Trade (2× ince çözünürlük), Özgürlük Heykeli + Fort Wood,
  Brooklyn / Manhattan / Williamsburg asma köprüleri (gerçek askı kabloları), Queensboro konsol köprüsü, Vessel, Times Meydanı neon panoları, Flatiron.
- **Işık:** 24 saatlik gün döngüsü (şafak → öğle → altın saat → gün batımı → gece), gölgeler, voxel AO, gece yanan pencereler,
  sokak lambaları, taksi/araç trafiği (~binlerce), feribot/römorkör/yelkenli/konteyner gemileri, helikopter, hareketli bulutlar
  (gölge düşürür), yansımalı canlı su + kıyı köpüğü, isteğe bağlı kar yağışı (birikir).
- **Miniatür hissi:** tilt-shift bulanıklık (uzaktayken), bloom, vinyet, hafif renk derecelendirme.
- **Gezinme:** sürükle = döndür · sağ tık/kaydır = pan · tekerlek = yakınlaş · çift tık = oraya git · WASD/ok = gez, Q/E = döndür ·
  yer imlerine tıkla = kamera uçar + bilgi kartı (20 yer imi + mahalle etiketleri) · **Şehir Turu (T)** 90 sn'lik sinematik kamera yolu
  (gün ışığı zamanla akar) · `1–7` hazır görünümler (Genel, Aşağı Manhattan, Midtown, Central Park, Köprüler, Özgürlük, Sokak seviyesi) ·
  Boşluk = zamanı akıt · K = kar · P = ekran görüntüsü indir · H = arayüzü gizle · F = tam ekran. Mobilde dokunmatik çalışır.
- Performans bekçisi: FPS düşerse çözünürlük ve ardından gölge/yansıma/bloom otomatik kısılır.

## Dosyalar
- `index.html` — giriş noktası (arayüz + yükleyici)
- `dist/app.js` — derlenmiş uygulama (three.js paketli) · `dist/world-data.js` — sıkıştırılmış şehir verisi (base64, `file://` ile çalışsın diye JS içinde)
- `src/` — kaynak (world/mesher/voxmat: voxel motoru; hero/bridges/heroes: özel yapılar; life: trafik-tekne-bulut-kar; env: gökyüzü-su-zaman; cam/ui/info/tour: gezinme ve arayüz)
- `tools/` — veri hattı: `fetch-*.mjs` (NYC OpenData + Overpass), `bake*.mjs` (döndür → voxelleştir → `dist/world-data.js`), `fit.mjs` (ızgara açı/adım tespiti), test/ekran görüntüsü betikleri
- `build.mjs` — `npm i three esbuild puppeteer-core` sonra `node build.mjs --min` ile yeniden derler (ham veri ve node_modules teslimden çıkarıldı; `tools/fetch-*.mjs` ile yeniden indirilebilir)

## Veri / atıf
NYC Building Footprints (NYC OpenData, kamu malı) · © OpenStreetMap katkıcıları (ODbL) · three.js (MIT). Yükseklikler bina başına tek değer olduğundan
gökdelenlerin basamaklı silüetleri yalnız elle modellenen yapılarda var; geri kalanı gerçek iz + yükseklikten gelen "blok" biçimlidir.
