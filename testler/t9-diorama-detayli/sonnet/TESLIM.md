# NEW YORK — Manhattan Voxel Dioraması (teslim notu)

Masa üstünde duran, ahşap kaideli, gezilebilir bir Manhattan maketi. Adanın şekli, sokak/cadde ızgarası, park alanları ve **bina yükseklikleri gerçek veriden** (OpenStreetMap + NYC Building Footprints) rasterlanıp voxel'e çevrilir; 10 simge ise ince voxel çözünürlüğünde elle modellenir.

## Nasıl açılır

```bash
# 1) doğrudan dosyadan:
xdg-open index.html            # ya da tarayıcıda file:///…/index.html

# 2) yerel sunucu:
python3 -m http.server 8080    # → http://localhost:8080/
```

* Çalışma anında ağ/CDN yok. Three.js `node_modules/three` içinden esbuild ile `dist/app.js` (tek IIFE dosya, `file://` ile de çalışır) olarak paketlenmiş; bake edilmiş veri (`src/data/world.bin`, `meta.json`) pakete gömülü.
* Yeniden derleme: `npm install && npm run build` (kaynak `src/`, çıktı `dist/app.js`).
* `?q=low` düşük kalite (GTAO kapalı, MSAA yok, 2048 gölge, az ağaç/araç/kar/bulut, pixelRatio 1).
* Kısayollar: `1`–`9`,`0` simgeler · `Esc`/`G`/`Home` genel bakış · `P` fotoğraf modu · `S` (fotoğraf modunda) PNG · `F` fps sayacı · `M` ses · `T` sinematik tur · sürükle = döndür, sağ tuş/Shift+sürükle = kaydır, tekerlek = yakınlaş.
* Yükleme + tüm şehrin üretimi ≈ 1,6 sn (RTX 5060, headless Chromium).

## Dosyalar

```
index.html            giriş (dist/app.js'i klasik <script> olarak yükler)
dist/app.js           paketlenmiş uygulama (three.js dahil, minify)
src/
  main.js             açılış sırası, döngü, seçim/uçuş/hover bağlantıları
  geo.js              lat/lon → Manhattan ızgarası (29° dönük), hücre sabitleri
  world.js            bake verisi yükleme, kıyı mesafe alanları
  rng.js              tohumlu PRNG (mulberry32) + gürültü — deterministik üretim
  voxel.js            palet, VoxelGrid, AO'lu greedy mesher, örnekli ağaç/araç için meshBoxes
  materials.js        voxel shader'ı (pencere, LED, kar, voxel kenarı, gece emisyonu)
  palette.js          şehir paleti
  buildings.js        gerçek yükseklik → voxel sütunları, setback, stil, "simge nefes alanı"
  terrain.js          kaide kesiti (kaya/toprak/su), kıyı, yol, park, gölet, iskele
  landmarks/          util.js (ince-voxel Model DSL) · towers.js (ESB, Chrysler, WTC, Flatiron, 30 Rock)
                      civic.js (Özgürlük H., Grand Central, Times Square, Rockefeller plaza)
                      bridge.js (asma köprü üreteci) · index.js (yerleşim, bilgi kartı metinleri)
  nature.js           sallanan voxel ağaçlar, gece sokak lambaları
  traffic.js          taksiler/araçlar, feribot, tekneler, kuşlar, bulutlar
  water.js            deniz shader'ı (kıyı derinliği, köpük, güneş parıltısı)
  lighting.js         gün döngüsü, güneş/ay, gökyüzü kubbesi, sis, gölge
  weather.js          açık / sisli / karlı
  post.js             GTAO(SSAO) → bloom → tilt-shift → ton eşleme → vinyet/renk
  diorama.js          ahşap kaide, pirinç plaka, masa
  camera.js           orbit kamera, sınırlar, ease-in-out uçuş, sinematik tur
  ui.js, ui.css       KEŞFET paneli, kartlar, etiketler, zaman/hava, fps, fotoğraf modu
  audio.js            Web Audio ile üretilen şehir ambiyansı
tools/                veri toplama (fetch-*.mjs), bake.mjs, ekran görüntüsü/perf/test betikleri
onizleme/             25 ekran görüntüsü (1920×1080)
```

Veri yeniden üretmek istenirse: `node tools/fetch-coast.mjs && node tools/fetch-data.mjs && node tools/fetch-nyc.mjs && npm run bake` (ham OSM/NYC önbelleği ~380 MB olduğu için teslimden çıkarıldı; çalışma anında gerekmez).
Veri kaynakları: © OpenStreetMap katkıcıları (ODbL) — kıyı, yol, park, su; NYC Open Data *Building Footprints* — bina çatı yükseklikleri.

## Şartname — madde madde

### 1) Teknik
| Madde | Nasıl karşılandı |
|---|---|
| Three.js, npm yerel, CDN yok | `three@0.186` npm ile kuruldu, esbuild ile `dist/app.js`'e gömüldü; çalışma anında hiçbir ağ isteği yok (headless testte `requestfailed`/HTTP≥400 = 0). `file://` ve `python3 -m http.server` ikisi de test edildi. |
| Voxel geometri, görünür yüz ≤ 400.000 | Şehir + kesit + simgeler **greedy meshing** (AO'lu) ile birleştirilmiş BufferGeometry; ağaç/araç/kuş/tekne/bulut/kar `InstancedMesh`. Görünür (gizli yüzleri elenmiş, greedy **öncesi**) voxel yüzü: şehir+kesit **287.368** + simgeler **56.802** = **344.170** statik; + ağaç 29.860 + araç/feribot/tekne/kuş/bulut 13.926 = **387.956**; karda +9.000 = **396.956** (< 400.000). Greedy sonrası şehir 176.217 + simgeler 18.863 quad. `?q=low`: 369.334. Sayılar `window.__info()` ile okunur. (Sokak lambaları nokta sprite'tır, voxel yüzü değil.) |
| ≥ 60 fps @1080p, `?q=low`, fps sayacı | **Ölçüm** (RTX 5060, 1920×1080, headless Chromium/ANGLE-Vulkan, vsync kapalı, 5 sn ortalama): yüksek kalite — genel bakış 197 fps (5,1 ms), Midtown 166, Times Sq. gece 126, karlı 198, sisli 197, heykel 181; **`?q=low`** — 709 / 766 / 646 / 686 / 701 / 925 fps. Vsync açıkken 10 sn'lik kare süresi: ortalama 16,65 ms (60 fps kilitli), p99 20 ms, en kötü 23 ms, 33 ms üstü kare = 0 (yüksek ve low). Sol üstte fps sayacı; tıkla veya `F` ile gizle/göster. |
| Deterministik üretim | Sabit tohum (`SEED=0x4e59c17`, `src/rng.js`); şehirde/ağaçta/araçta/tekne/kuş/bulutta `Math.random` yok (yalnız ses olayları rastgele). `tools/det-test.mjs`: iki ayrı açılışta geometri sağlama toplamı aynı (`419b3d2d:2114604:2986:950`). |
| Modüler kod | `src/` altında arazi (`terrain.js`,`world.js`,`water.js`), binalar (`buildings.js`,`palette.js`), simgeler (`landmarks/`), trafik (`traffic.js`,`nature.js`), ışık (`lighting.js`,`weather.js`,`post.js`), arayüz (`ui.js`,`ui.css`), kamera (`camera.js`), ses (`audio.js`) ayrı modüller. |

### 2) Maket / Diorama
* **Ahşap kaide** (`diorama.js`): yuvarlatılmış köşeli, prosedürel damarlı meşe/ceviz doku; üstte koyu pervaz ve ince pirinç şerit. Kaidenin kenarında **kesit**: kaya bantları → kil/çakıl → koyu üst toprak; su sütunlarında derinliğe göre koyulaşan su bloğu (su tablası). Kesit katmanları gürültüyle dalgalı. (`onizleme/34-…`)
* **Pirinç isim plakası "NEW YORK"**: batı kenarda, vidalı, kabartma harfli, metalik malzeme (`onizleme/34`, genel bakışta da görünür).
* **Silüete sadık yerleşim**: kıyı çizgisi OSM `natural=coastline`'dan; Hudson, East River, Upper Bay, Liberty/Governors/Ellis adaları, Roosevelt Adası, Battery, iskeleler (piers) gerçek konumunda. Izgara Manhattan'ın 29°'lik eğimine göre döndürülmüş → caddeler dikey. Sokak/cadde ağı OSM yollarından (Broadway'in diyagonali, Greenwich Village'ın kıvrımları, FDR/West Side Hwy dahil) — `onizleme/33`.
* **Tilt-shift** (`post.js`): iki geçişli ekran-uzayı bulanıklığı, odak bandı ve şiddet kamera uzaklığına göre değişir. **SSAO**: `GTAOPass` + voxel köşe AO'su (greedy öncesi köşe başına, çatlak/temas gölgeleri) + 4096² gölge haritası (kontakt gölgeleri).

### 3) Simge yapılar (hepsi ince-voxel modeller, gerçek koordinatlarda)
| Simge | Konum kaynağı | Model |
|---|---|---|
| Özgürlük Heykeli | OSM Liberty Island | 11 köşeli yıldız Fort Wood, üç kademeli granit kaide, bakır heykel, 7 ışınlı taç, yukarıdaki kolda meşale (gece parlar), tablet |
| Empire State | OSM bina konumu | Art Deco kademeleri, 86. kat güvertesi, taç, anten (gece ışıklı) |
| Chrysler | OSM bina konumu | 7 kademeli çelik güneş-kemeri taç, üçgen pencereler (gece sıcak ışık), kartal başları, iğne |
| One WTC | OSM bina konumu | kare kaide → sekizgen → dönük kare gövde, cam, iğne + ışıklı uç |
| Flatiron | OSM kavşak | tırtıklı korniş, üçgen prizma (dar kuzey burnu) |
| Brooklyn Köprüsü | OSM köprü ekseni | iki granit kule + sivri gotik kemer nişleri, ana **asma kablolar** (parabolik), dikey askılar, **yelpaze gibi açılan diyagonal stay'ler**, taş viyadük kemerleri, gece ışıklı |
| Central Park | OSM park/su poligonları | çim, orman, tepecikler, **göl/rezervuar** (su malzemesi), ~3.000 sallanan voxel ağaç |
| Times Square | koordinat + bina maskesi | çevredeki binaların katları LED panolarla kaplı, çatı panoları, One Times Square tepe topu, bowtie zemin |
| Rockefeller Center | koordinat | kademeli 30 Rock, buz pisti, noel ağacı, bayrak sırası |
| Grand Central | OSM bina konumu | Beaux-Arts cephe, kemerli büyük pencereler, alınlık + heykel grubu + saat, bakır mansard çatı |
Genel bina dokusu: gerçek yüksekliklerle Financial District ve Midtown'da yükselen, ~40 tonluk tuğla/taş/cam paletli, pencereli bloklar; yüksek kulelerde kenar setback'i.

### 4) Canlılık
* **950 araç** (≈%55 sarı taksi) gerçek yol hücrelerinde, kavşakta düz/sağ/sol seçerek şerit içinde akar. (`traffic.js`)
* **Staten Island feribotu** (turuncu): Whitehall'dan Upper Bay'e gidip çift uçlu feribot gibi geri döner. *Not:* Staten Island maketin dışında kaldığı (≈8 km güney) için rota diorama kenarında geri döner.
* **Hudson/East River'da 9 tekne** (yelkenli, römorkör, mavna, gezi teknesi) yol noktalarında, kıç dalgası köpüğüyle.
* Central Park ağaçları rüzgârla hafif sallanır (vertex shader).
* **Voxel bulutlar** süzülür; **kuş sürüleri** (kanat çırpan) daireler çizer.
* Gece: ~11.000 sokak lambası + rastgele yanan pencereler (bloom'lu).

### 5) Işık ve zaman
* Gün döngüsü kaydırıcısı (şafak→öğlen→gün batımı→gece), **varsayılan gün batımı**; güneş/ay konumu, gökyüzü, sis, pozlama sürekli enterpolasyonlu. Gece pencereler, Times Square panoları, taç/anten/köprü **emissive + bloom**.
* Hava: **açık / sisli / karlı**. Kar: instanced voxel kar taneleri + çatı/zeminde biriken kar örtüsü (shader). Sis: yoğunluk + gökyüzü grileşmesi.

### 6) Kamera ve keşif
* Orbit kamera: sürükle döndür, tekerlek yakınlaş, sağ tuş/Shift kaydır; hedef kaide sınırı içinde kırpılır, polar açı masanın altına inmeyi engeller, yakınlaşma/uzaklaşma sınırlı.
* Sağda **KEŞFET** paneli: *Genel bakış* + 10 simge; tıkla ya da **1–9 (+0)** → **1,5 sn ease-in-out** uçuş. (`Esc` = genel bakış.)
* Simgenin üstüne gelince **etiket** (imleç el olur, tıklayınca da uçar); seçilince 1–2 cümlelik **Türkçe bilgi kartı**. Simgelerin üzerinde küçük numaralı iğneler (Etiket düğmesi ile gizlenir).
* **Boşta 20 sn** sonra yavaş sinematik tur (tüm simgeler + genel bakış); herhangi bir fare/klavye/tekerlek girdisi durdurur. `tools/ui-test.mjs` ölçümü: tur 20,08 sn'de başladı, tuşa basınca durdu.
* **Fotoğraf modu** (Foto düğmesi / `P`): arayüz gizlenir, PNG indir (`S` veya düğme; 1:1 tuval).

### 7) Ses
Web Audio ile kodla üretilir (dosya yok): kahverengi gürültü şehir uğultusu, bant geçiren trafik hışırtısı (LFO), rüzgâr/su, gece cırcır böceği, rastgele korna/siren/kuş cıvıltısı. **Varsayılan kapalı**, "Ses" düğmesi / `M` ile açılır; gündüz-gece, hava ve yakınlığa göre karışım değişir. Headless testte açıkken RMS 0,11–0,15, NaN yok.

### 8) Süreç
* Her simge headless Chromium (GPU, ANGLE/Vulkan) ile 1600×900'de ekran görüntüsü alınıp incelendi (`tools/lm.mjs`, `tools/onizleme.mjs`). **Birden çok düzeltme turu** yapıldı; başlıcaları:
  1. **Tur 1 — çıplak malzeme**: ilk görüntülerde gökyüzü/pencereler/LED yoktu (shader `kind` ofset hatası) → düzeltildi; deniz/gece uniform'ları paylaşımlı hale getirildi (`UniformsUtils.merge` klonluyordu).
  2. **Tur 2 — tanınırlık**: Flatiron "dikdörtgen kutu" gibiydi → gerçek kavşak üçgenine, korniş ve dar kuzey burnuna göre yeniden yazıldı; Özgürlük Heykeli iri/güçlü gövde, ışın-taç ve daha kalın meşale koluyla yeniden yapıldı ve kameraya (ışığa) göre açılandırıldı; Chrysler tacında üçgen pencere ve kademeler büyütülüp gümüş/krom dönüşümlü yapıldı, geceleri sıcak pencere ışığı verildi.
  3. **Tur 3 — görünürlük**: Grand Central/Times Square/Rockefeller çevredeki binalarca gizleniyordu → simge çevresine "nefes alanı" (yakında alçalan binalar), Times Square çevresine LED panolu bina maskesi, kameraya yeni açılar; Grand Central boyu büyütüldü.
  4. **Tur 4 — gece/malzeme**: Brooklyn Köprüsü kabloları gece patlıyor/siyahlıyordu → ana kablo/stay ayrı malzeme, kule taşlarına projektör, ışık şiddeti dengelendi; pencere gece şiddeti ve bloom eşiği düşürüldü (Times Square'de LED'ler "patlıyordu", yumuşatıldı); bulutlar masaya çok yakın/parlak "beyaz kutu" idi → yükseltildi, gölge/emisyon azaltıldı.
  5. Diğer: iskele poligonlarının park içine sızması, kaide kesit renkleri/masa kontrastı, plaka boyut/konum, yüz bütçesi (≤400k için ada-dışı bina eşiği, vertikal abartı 1,3×).
* **Konsol hatası sıfır**: `file://` ve `http.server` için, tüm senaryolar (simge uçuşları, gece/kar/sis, fotoğraf modu, ses, `?q=low`) boyunca `console.error/warn`, `pageerror`, başarısız istek = 0 (`tools/ui-test.mjs`, `tools/onizleme.mjs`, `tools/perf.mjs`).
* **fps ölçümü**: yukarıdaki tabloda (RTX 5060, 1920×1080).
* **`onizleme/`**: genel bakış (`00`), 10 simge (`01`–`10`), gece (`11`–`15`), karlı (`20`–`22`), sisli (`30`), şafak/öğle (`31`,`32`), üstten sokak ızgarası (`33`), kaide + plaka + kesit (`34`), fotoğraf modu (`35`).

## Bilinen sınırlar (dürüst notlar)
* Ölçek: 1 voxel = 22 m (yatay); dikey 1,3× abartılı; simgeler hero-ölçekte (ince voxel, biraz büyütülmüş). Geniş çok-katlı binaların ayrıntısı bu ölçekte blok halindedir; ayrıntı pencere/kenar shader'ından gelir.
* Ada dışı (New Jersey/Brooklyn/Queens) yalnız ≥90 m'lik binalarla gösterilir (yüz bütçesi için).
* Staten Island maketin dışında olduğundan feribot rotası kenarda geri döner.
* Ölçümler headless Chromium'da alındı; gerçek ekranda vsync ile 60 fps'e kilitlenir.
