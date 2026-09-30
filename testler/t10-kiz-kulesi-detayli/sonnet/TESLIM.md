# Kız Kulesi · Fırtınalı Gece — Three.js gerçek zamanlı sinematik animasyon

Tek dosyada özet: Üsküdar açıklarında, lodos fırtınasında Kız Kulesi. Tamamen prosedürel (dış model/doku/ses dosyası yok),
tarayıcıda gerçek zamanlı, 60 sn'lik dikişsiz sinematik kamera döngüsü + serbest kamera, şimşek, dönen fener hüzmesi,
Gerstner denizi, İstanbul silueti, vapur, martılar, Web Audio ile üretilmiş ses.

## Nasıl açılır

- **Doğrudan:** `index.html` dosyasını çift tıkla / `file:///.../index.html` (Chromium'da test edildi, sunucu gerekmez).
- **Sunucuyla:** klasörde `python3 -m http.server 8080` → `http://localhost:8080/`.
- Çalışma anında ağ isteği yok; Three.js (0.186.1) `node_modules/three`'den `dist/app.js` içine paketlenmiştir
  (klasik script olduğu için `file://` altında da CORS sorunu çıkmaz).
- **Yeniden derleme (yalnız kodu değiştirirsen):** `npm install && npm run build` (`build.mjs`, esbuild). `--dev` okunaklı çıktı verir.

URL parametreleri: `?q=low` düşük kalite · `?fps=0` sayaç gizli açılır · `?storm=0..1` `?day=0..1` başlangıç değerleri ·
`?t=<sn>` kamera zamanı · `?free=1` serbest kamera · `?ui=0` arayüzsüz · `?nostrike=1` otomatik şimşek yok · `?seed=N` şimşek tohumu ·
`?adapt=0` dinamik çözünürlük kapalı.

Kısayollar: `H` arayüzü gizle · `L` şimşek · `M` ses · `C` kamera modu · `P` fotoğraf modu (Enter/Boşluk = PNG, Esc = çık) · `F` fps sayacı.
Fareyle sürükle/tekerlek → otomatik serbest kamera; "Sinematiğe dön" düğmesi yumuşak geçişle döngüye döner.

## Dosyalar

```
index.html, style.css         sayfa + arayüz
dist/app.js (+ .map)          paketlenmiş uygulama (Three.js dahil) — index.html bunu yükler
src/                          modüler kaynak (aşağıda)
onizleme/                     19 ekran görüntüsü (1920×1080, headless Chromium, RTX 5060)
tools/                        test/ölçüm betikleri (puppeteer-core: shot, perf, uishot, burst, eval)
build.mjs, package.json       derleme
```

`src/`: `main.js` (döngü, kalite/çözünürlük uyarlaması) · `config.js` (kalite ön ayarları) · `state.js`, `uniforms.js` (ortak durum) ·
`environment.js` (fırtına×saat → renk/sis/rüzgâr/ışık, dinamik gökyüzü küpü) · `sky.js` (gökyüzü, bulut, alçak bulut/sis levhaları) ·
`sea.js`, `waves.js` (deniz) · `islet.js`, `tower.js` (ada + kule) · `lighthouse.js` (hüzme) · `rain.js`, `lightning.js`, `spray.js` ·
`city.js` (Üsküdar + Sarayburnu) · `ship.js`, `birds.js` · `cameraRig.js` · `audio.js` · `post.js` · `ui.js` · `util/` (rng, prosedürel dokular) · `shaders/chunks.js`.

## Şartname — madde madde

### 1) Teknik
- Three.js yerel kurulum, CDN yok; `file://` ve `http.server` ile açılır (yukarıda, ikisi de konsol hatasız denendi).
- 1920×1080'de ≥60 fps: ölçümler aşağıda (tam 60 sn'lik kamera döngüsü boyunca ortalama 59,97 fps = ekran yenileme sınırı; GPU süresi ort. 4,7 ms).
- `?q=low` düşük kalite: 0,7 çözünürlük ölçeği, seyrek deniz ağı, az parçacık, bloom/MSAA kapalı, 3 oktav bulut, dalga halkaları kapalı. Arayüzdeki "Kalite" düğmesi de aynısını yapar.
- Gizlenebilir fps sayacı: sağ üstte (fps · ms · çözünürlük · kalite); `F` tuşu veya "FPS sayacı" düğmesi ile aç/kapa.
- `src/` altında 22 modül (~4200 satır). Ek olarak yüksek kalitede yük yükselirse çözünürlüğü otomatik düşüren/yükselten dinamik çözünürlük var.

### 2) Kule
- Kayalık adacık: sivri "gemi burnu" planlı (lodosa dönük) 128 noktalı çevre, gürültüyle çarpıtılmış 9 katmanlı kaya kabuğu + 46 düzensiz kaya bloğu; islak/yosunlu prosedürel kaya dokusu.
- Rıhtım: kıç tarafta (Üsküdar yönü) basamaklı taş iskele, babalar, iki gaz lambası; sur duvarı, silme, korkuluk, kaldırım taşlı teras.
- Ana gövde: hafif konik silindirik taş kule (~12 m gövde, prosedürel kesme taş dokusu + kabartma), silme kuşakları, konsollu taşma, korkuluklu galeri, üst dram, 16 dikmeli cam fener odası (içinde dönen Fresnel mercek), kurşun kaplı soğan/külah kubbe (dikişli prosedürel kurşun dokusu, gökyüzünü yansıtır), alem/küre/seyir ışığı. Ek salon yapısı (kırma çatı, kiremit dokusu), pencereler titreşen sıcak ışıkla, dalgalanan Türk bayrağı.
- Oranlar: deniz seviyesinden ~31,6 m toplam yükseklik, ada ~41 m; ana gövde çapı ≈ 8–9 m (gerçek yapıya yakın).
- Taş/sıva dokuları tamamen `util/textures.js` içinde canvas ile üretilir.

### 3) Deniz
- Gerstner: 7 dalga bileşeni (dalga boyları 72 → 2,7 m), aynı tablo GLSL ve CPU'da (gemi, kamera, parçacıklar denizle birebir uyumlu). Piksel başına analitik normal + LOD, iki-üç katman kaydırmalı ince detay normali, yağmur halkaları.
- Köpük: dalga sıkışmasından (Jacobian) tepe köpüğü; kayalık çevresinde önceden pişirilmiş işaretli mesafe alanıyla (SDF) ana dalgayla senkron köpük halkası ve dalga tırmanması; Üsküdar kıyısında köpük çizgisi.
- Sıçrayan su: `spray.js`; ana dalganın adaya çarptığı evrede CPU'da balistik simüle edilen, hıza göre uzayan damlalar + sis bulutları (7000'e kadar), rüzgârla sürüklenir, fener/şimşekle aydınlanır.
- Fresnel yansıma: her karede güncellenen dinamik küp harita (gökyüzü, şehir ışıkları, yıldırım da yansır).
- Fener parıltısı: hüzmenin suya düştüğü bölge analitik olarak aydınlanır + fener/vapur/lamba ışıklarının speküler parıltı sütunları.

### 4) Fırtına
- Yağmur: iki katman (yakın 20 000, uzak 14 000 damla) kameraya bağlı dünya-sabit kutuda, rüzgârla eğik, GPU'da örneklenen çizgi şeritleri; şimşekle ve fener hüzmesinde parlarlar.
- Sis/alçak bulut: 5 katman dünya-sabit fbm levhası (4,5 m'den 230 m'ye), fener hüzmesi bulutu deler; üstel sis fırtınayla yoğunlaşır; ana gökyüzünde fbm fırtına bulutları.
- Şimşek: fırtına şiddetine göre rastgele aralıklarla (5–25 sn, %28 çift vuruş, %25 yalnız bulut çakması); ekranı/sahneyi/denizi/yağmuru aydınlatan flaş; kamera yönlü şerit geometriyle çatallı yıldırım (ana kanal + dallar + bulut altı sürünen kollar, yukarıdan aşağıya ilerleyerek); **gök gürültüsü mesafeye bağlı 1–3 sn gecikmeyle** (mesafe/343 m/sn, 1,0–3,0 sn arası kırpılır) sesle çalınır.

### 5) Fener
- 10 sn'de bir tur dönen çift hüzme (60 sn içinde 6 tam tur → döngüyle ritim uyumlu); hacimsel konik ağ (kenarları yumuşak, mesafeyle sönen, yağmur tanesi dokulu), hafif aşağı eğimli olduğu için uzakta denize değer; hüzme yağmuru, bulutu, köpüğü, kuleyi (spot ışıklarla) ve martıları gerçekten aydınlatır; kameraya dönünce parıltı şişer (lens flare/bloom).

### 6) Çevre
- İstanbul: Üsküdar (arka planda tepeler, ~9 000 bina, pencere ışıkları, sahil yolu lambaları, Mihrimah Sultan/Yeni Valide/Şemsi Paşa ve tepe camileri, Selimiye benzeri kışla) ve kuzeybatıda Sarayburnu/Tarihi Yarımada (Ayasofya, Sultanahmet 6 minare, Süleymaniye, Topkapı köşkleri/surları, Galata Kulesi). Uzak siluet sis ve yağmurda neredeyse görünmez; **şimşekte flaşla bir an belirir** (`onizleme/13`).
- Vapur: ışıklı Şehir Hatları tarzı gemi (pencere şeritleri, baca, seyir ışıkları, köpüklü iz), dalga örneklerinden hesaplanan yalpa/baş-kıç vurma/dalgalanma, oval rotada dolaşır; ışık yansıması suda.
- Martılar: 16 martı (kanat çırpma GPU'da), kule çevresinde/deniz üzerinde süzülür, fener ve şimşekte parlar.

### 7) Kamera
- 60 sn döngü: **uzak plan (0–14 sn) → dalga seviyesi (14–27) → kule etrafında dönüş (27–43) → fener yakın planı (43–52) → uzaklaşma ve başa dikişsiz dönüş (52–60)**. Periyodik Hermite/Catmull-Rom (komşu anahtarlardan teğet) → konum/hedef/FOV 60. sn'de tam 0. sn'ye bağlanır (hız da eşit, doğrulandı: sn 59.99 ↔ 60.01 hız farkı 0). El kamerası sarsıntısı 60 sn'de tam sayı döngülü; dalga seviyesinde kamera dalgayla birlikte yükselip alçalır ve suyun altına girmez.
- Serbest mod: fareyle sürükle/tekerlek (OrbitControls, suya girme engelli); "Sinematiğe dön" düğmesi mevcut pozdan 1,8 sn yumuşak geçişle döngüye alır. Sol üstte bölüm başlığı.

### 8) Kontroller
- Fırtına şiddeti kaydırıcısı (sakin gece → tam fırtına: yağmur, rüzgâr, dalga boyu, bulut örtüsü, sis, şimşek sıklığı, ses, martı/bayrak hepsi bağlı), saat kaydırıcısı (02:00 gece → 06:45 şafak: gökyüzü, doğudaki gün doğumu ışıltısı, yıldız/ay, şehir ışıkları, fener sönmesi, palet), "Şimşek çaktır" düğmesi (ekrana bakılan yönde her zaman görünür bir yıldırım), fotoğraf modu (arayüz gizlenir, "PNG indir/Çık" çubuğu; PNG 1,6× örneklemeyle indirilir; arayüz testi: `download kiz-kulesi-….png data:image/png`).

### 9) Ses (Web Audio, varsayılan kapalı, düğme/`M` ile açılır)
- Yağmur (filtrelenmiş gürültü + seyrek damla çıtırtısı), rüzgâr (kahverengi gürültü + hamle LFO'ları + uluma), dalgalar (şişme–kırılma–çekilme zarfları + sürekli uğultu), gök gürültüsü (çatlama + kahverengi gürültü gümbürtüsü + sub bas + reverb, gecikmeli), uzaktan vapur düdüğü, martı çığlıkları. Hepsi fırtına şiddetiyle değişir. `OfflineAudioContext` ile sayısal doğrulama: şiddet 0,05 → RMS ≈0,04; 0,5 → ≈0,13; 1,0 → ≈0,22; gök gürültüsü 2. sn'de RMS ≈0,31'e sıçrıyor, NaN yok, tepe ≤1,08 (kompresör sonrası kırpılmıyor).

### 10) Süreç
- Headless Chromium 152 (gerçek RTX 5060, Vulkan/ANGLE) + puppeteer-core ile: kamera yolunun t = 3, 20, 25, 31, 41, 46, 51, 55 sn (8 nokta) + sakin gece, seher, şafak, şimşek, şimşekte siluet, düşük kalite, serbest kamera, arayüz/fotoğraf modu (`onizleme/`, 19 kare). Denetlendi; **gerçekten düzeltilen turlar**:
  1. *Tur 1:* hüzme çok kalın/yumuşaktı, yağmur görünmüyordu (yalnız tek yönlü yüz + çok ince), bulut örtüsü yetersiz, şehir ışıkları dev boyutluydu, dalgalar küçüktü → dalga tablosu/yükselti/sis yeniden ayarlandı, yağmur çift yüzlü ve daha parlak, şehir nokta boyutları küçültüldü, hüzme profili ve fener sprite'ı ayarlandı.
  2. *Tur 2:* şimşek flaşı ekranı tamamen beyazlatıyordu, yıldırım ekran dışında kalıyordu, yıldırım çok kalın → flaş/bloom sönümlendi, yıldırım yüksekliği/mesafesi/azimutu kadraja göre ayarlandı, çizgi kalınlığı azaltıldı, şafak paleti turuncu-kızıla çekildi.
  3. *Tur 3:* kayalık iç yüzü ters çıkıyor, binalar çok kutu gibiydi, martı gövdeleri düz üçgenlerdi, vapur omurgası düzdü → kabuk yönü/çift yüz düzeltildi, binalar pencere ışıklı shader'a (yüz bazlı pencere ızgarası) taşındı, martı iğ gövde/3 kesitli kanat ile yeniden yazıldı, vapur pruvası yükseltildi, kaya dokusu/sıçrama parçacıkları (hıza göre uzama, boyut dağılımı) ve köpük kesildi/yumuşatıldı.
  4. *Tur 4:* dalga çekilince kayanın altındaki boşluk/duvar görünüyordu, ilk kare takılması → duvar tabanı derinleştirildi, tüm shader'lar açılışta önceden derleniyor (`renderer.compile` + ısınma karesi).
- Konsol hatası: `file://`, `http://localhost`, `?q=low`, arayüz etkileşimleri (sürükleme, sinematiğe dönüş, ses, fotoğraf modu, kaydırıcılar, şimşek düğmesi) ve 62 sn'lik tam döngü boyunca **sıfır hata/uyarı** (`HATALAR 0`).

## fps ölçümü (1920×1080, RTX 5060, headless Chromium, `?adapt=0`, tam 60 sn'lik kamera döngüsü + 10–12 otomatik şimşek dahil)

| Mod | Ortalama fps | p95 kare süresi | p99 | GPU süresi (ort / p95) | CPU (ort) |
|---|---|---|---|---|---|
| Yüksek (1920×1080, MSAA×4, bloom) | **59,97** (yenileme sınırı 60) | 19,1–21 ms | 21,9–24 ms | **4,7 ms / 9,8 ms** | 4,0 ms |
| Düşük `?q=low` (1344×756) | **60,00** | 18,4 ms | 19,4 ms | 3,2 ms / 9,0 ms | 2,2 ms |

- 70 sn'lik son koşuda 24 ms'yi aşan kare sayısı 4199 karede 19 (%0,45), en uzun kare 37,7 ms (şimşek anları); kamera döngüsünün her bölümünde GPU süresi ort. 4,5–5,3 ms.
- Yenileme sınırsız (`--disable-gpu-vsync`) ölçüm: ~180–200 fps (yalnız kare tetikleme); pencereli (headed) 2536×1247 çözünürlükte ~115 fps. GPU süresi ortalama 4,7 ms olduğundan 1080p'de ~200 fps'lik pay var; yenileme hızı yüksek ekranlarda (120/144 Hz) da akıcıdır.
- Not: ölçümler `EXT_disjoint_timer_query_webgl2` ile (`?gpu=1`) alındı; betikler `tools/perf.mjs`.

## Bilinen sınırlar (dürüst notlar)

- Kule gerçek yapının birebir ölçekli modeli değil; tanınır siluet ve oranlar (kayalık ada, sur, salon, silindirik kule, galeri, fener odası, kurşun külah) sadık ama detaylar (pencere sayısı/yerleri, ada planı) yorumdur.
- İstanbul siluetindeki camiler/binalar sembolik ve dikey abartılıdır; Sarayburnu sinematik nedenle gerçek mesafeden yakın (~1,4 km × 1,3 ölçek) yerleştirilmiştir.
- Ses, kulakla değil sayısal olarak (RMS/tepe) doğrulandı; ses beğenisi kullanıcının kulağına bağlıdır.
- Dinamik çözünürlük yüksek kalitede yalnız kare hızı 54 fps altına düşerse devreye girer (bu makinede hiç gerekmedi).
