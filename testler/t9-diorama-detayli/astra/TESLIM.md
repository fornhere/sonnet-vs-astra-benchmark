# NEW YORK — Küçük Dünya Atölyesi

Tarayıcıda gezilebilir, tamamen yerel çalışan bir Manhattan voxel dioraması. Ahşap katmanlı kaide, pirinç isim plakası, taş/bakır/cam paleti ve sıcak gün batımı ışığı ile bir masa üstü maketi olarak tasarlandı. Harici fotoğraf, model, font, ses dosyası veya çalışma zamanı servisi kullanılmadı.

## Açma ve çalıştırma

**En kolay:** `index.html` dosyasını Chromium/Chrome ile açın. `file://` üzerinden çalışır; derlenmiş paket teslimin içindedir, yeniden kurulum gerekmez.

HTTP ile:

```sh
cd /home/forn/sonnet-vs-astra/t9-diorama-detayli/astra
python3 -m http.server 8000
```

Ardından `http://localhost:8000/`. Alternatif: `./BASLAT.sh` veya `npm start`.

- Düşük kalite: `http://localhost:8000/?q=low`
- Doğrudan gece: `http://localhost:8000/?time=22`
- Karlı Central Park: `http://localhost:8000/?view=park&weather=snow`
- Önizleme galerisi: `onizleme/index.html`

Kaynak değişikliğinden sonra:

```sh
npm ci --cache .npm-cache
npm run build
```

Three.js **0.186.1**, esbuild **0.28.2**, Playwright **1.63.0** yerel npm bağımlılıklarıdır. `package-lock.json` sürümleri sabitler. Çalışan uygulama yalnız `index.html`, `src/style.css` ve `dist/app.js` dosyalarını okur. npm bağımlılıkları geliştirme/yeniden derleme içindir.

## Kullanım

| Girdi | İşlev |
|---|---|
| Sol sürükleme / tek parmak | Orbit kamera |
| Tekerlek / iki parmak kıstırma | Yakınlaşma ve uzaklaşma |
| Sağ sürükleme / iki parmak taşıma | Sınırlı hedef taşıma |
| Sağdaki KEŞFET paneli | Genel bakış ve 10 simge |
| `1`–`9` | İlk 9 simgeye uçuş |
| `0` | Grand Central |
| `O` veya `Home` | Genel bakış |
| `P` | Fotoğraf modunu aç/kapat |
| `Esc` | Fotoğraf modundan çık |
| `F` | FPS sayacını gizle/göster |
| Simgenin üzerine gel / tıkla | İsim etiketi / Türkçe bilgi kartı |
| Bilgi kartındaki “Sonraki durak” | Sıradaki simge |

Fotoğraf modunda arayüz gizlenir. **PNG indir**, arayüzsüz gerçek WebGL çıktısını indirir. Geri dönene kadar kamera kullanılabilir. Ses kullanıcı düğmeye basana kadar başlatılmaz.

## Zorunlu şartname karşılıkları

### 1. Teknik

- **Yerel Three.js:** npm ile kuruldu; OrbitControls ve BufferGeometryUtils dahil tek IIFE JavaScript dosyasında paketlendi. CDN, import map, uzaktan font veya ağdan model yükleme yok. `file://` ve HTTP açılışı desteklenir.
- **Voxel geometri:** arazi, kaide katmanları, binalar, pencereler, ağaçlar, lambalar ve simgelerin blok parçaları malzemeye göre `InstancedMesh` gruplarında. Tekneler `mergeGeometries` ile birleştirildi. Bulutlar ve araçlar da instanced.
- **400.000 yüz sınırı:** ölçülen son sayılar aşağıdaki performans bölümünde. Hesap, görünmeyen/içte kalan küp yüzlerini de dahil eder; gerçek görünür yüzler bu üst sınırdan azdır.
- **60 FPS hedefi:** tek tam ekran post-process, gölge haritasının yalnız ışık değişince yenilenmesi, ortak geometri/malzemeler ve yaklaşık 41 çizim çağrısı ile RTX sınıfı donanım hedeflendi. Bu yürütme ortamında gerçek GPU erişimi olmadığı için RTX üzerinde 60 FPS doğrulanmış değildir; gerçek ölçüm ve sınırı aşağıda açıkça yazılmıştır.
- **`?q=low`:** iç çizim çözünürlüğü ekranın %70’i, 1024 gölge haritası, daha düşük bulanıklık ve antialias kapalı. Normal kalitede 2048 gölge haritası, en fazla 1.5 piksel oranı.
- **FPS sayacı:** son kare sürelerinden hesaplanır; `F` ile gizlenir. Değer uydurulmaz veya alt sınırla yapay olarak yükseltilmez.
- **Deterministik üretim:** LCG sabit tohumu `19091932`. Kıyı, bina boyları/renkleri, ağaçlar, trafik güzergâhları ve hava parçacıklarının başlangıç düzeni sabittir. Animasyonlar zamanla ilerler.
- **Modüller:** `src/terrain.js` arazi; `buildings.js` binalar; `landmarks.js` simgeler; `traffic.js` trafik/tekneler; `lighting.js` ışık/post-process/hava; `ui.js` arayüz; `camera.js` kamera; `audio.js` ses. Ortak geometri ve tohum `core.js`, başlangıç/render döngüsü `main.js`.

### 2. Maket / diorama

- Ahşap kaide ve kenarda ince damar/laminasyon çizgileri; üzerinde kaya, toprak, su tablası katmanları. Önde iki bağlantı başlıklı pirinç **NEW YORK** plakası.
- Masa yüzeyi ve kaidenin yere düşen gölgesi, sahnenin fiziksel bir maket gibi okunmasını sağlar.
- Manhattan kıyıları enlem/boylam tabanlı poligondan voxel adımlarla örüldü. Hudson, East River, Upper Bay ve Liberty Island ayrı okunur; komşu kıyılar daha sade kütlelerle temsil edilir.
- Manhattan’ın dönük dik açılı cadde ızgarası ve ayrı, çapraz Broadway hattı mevcut.
- Mimari yükseklikler ve simge ayak izleri okunabilirlik için yorumlandı; bu bir GIS/ölçme modeli değildir. Çok yakın Midtown yapılarında birkaç maket birimlik ayrıştırma uygulandı; komşulukları ve coğrafi sıraları korunur.
- Post-process: yatay netlik bandı olan sekiz örnekli **tilt-shift**, derinlik tamponu üzerinden hafif ekran uzayı çevresel gölgeleme/kontakt etkisi, vignette ve ACES renk dönüşümü. Yumuşak gölgeler fiziksel gölge haritasından gelir.

### 3. Simge yapılar

Her simgenin kendi kamera durağı, seçilebilir alanı ve Türkçe bilgi kartı var.

| Simge | İşlenen tanınabilir özellik | Son görüntü |
|---|---|---|
| Özgürlük Heykeli | Liberty Island, taş kaide, patinalı yeşil elbise, yedi taç ışını, kaldırılmış kol ve altın meşale | `onizleme/01-liberty.png` |
| Empire State | Basamaklı Art Deco kütle, ince pencere sıraları, düşey payandalar ve anten | `onizleme/02-empire.png` |
| Chrysler Building | Çelik taç, kademeler, kemerli metal ışınlar, üçgen pencere ayrıntıları, köşe kartalları ve sivri uç | `onizleme/03-chrysler.png` |
| One World Trade Center | Cam rengi gövde, yükseldikçe kesilen köşeler, sekizgen ara katlar, ince anten ve anma havuzları | `onizleme/04-wtc.png` |
| Flatiron | Dikdörtgen voxel sıralarından gerçek üçgen plan, dar uç, kat kornişleri ve pencereler | `onizleme/05-flatiron.png` |
| Brooklyn Köprüsü | İki taş kule, geçiş açıklıkları, güverte, ana sarkma kabloları, düşey askılar ve çapraz kablolar; iki kıyıya bağlantı | `onizleme/06-bridge.png` |
| Central Park | Uzun dikdörtgen park, iki su alanı, çayırlar, kıvrılan yollar, küçük köprü ve farklı ağaçlar | `onizleme/07-park.png` |
| Times Square | Değişen yazılar ve ışık şiddetiyle renkli panolar, küçük kırmızı basamaklar | `onizleme/08-times.png` |
| Rockefeller Center | Katmanlı 30 Rock, düşey cephe çizgileri, doğudaki küçük plaza/havuz ve bayrak sırası | `onizleme/09-rockefeller.png` |
| Grand Central | Alçak taş cephe, üç yüksek pencere açıklığı, sütunlar, alınlık/saat ve yeşil çatı | `onizleme/10-grand.png` |

Genel yapı dokusunda farklı taş/tuğla/cam renkleri, düz ve basamaklı çatılar, çatı ekipmanı, antenler ve pencereler bulunur. Yükseklik dağılımı Midtown ve Financial District odaklarıyla hesaplanır. Seçili küçük simgeleri kapatan birkaç komşu blok özellikle alçaltıldı.

### 4. Canlılık

- Cadde ızgarasından üretilen güzergâhlarda **95 araç**; çoğunluğu sarı taksi, iki yönde hareket.
- Upper Bay üzerinde turuncu Staten Island feribotu; Hudson’da üç küçük tekne ve arkalarında su izleri.
- Ağaç tepelerinde GPU vertex shader ile hafif, konuma bağlı salınım.
- Süzülen voxel bulutlar ve kanat çırpan 12 kuştan oluşan sürü. Yakın mimari incelemede bulutlar yapıları kapatmayacak kadar saydamlaşır.
- Gece pencereleri ve sokak lambaları ışık verir. Bazı pencereler karanlık bırakılarak tekdüzelik azaltıldı.

### 5. Işık ve zaman

- Saat kaydırıcısı 05:00–23:00: şafak, öğlen, gün batımı ve gece. **Varsayılan 17:30, gün batımı.**
- Işık rengi/şiddeti, gölge açısı, pozlama, atmosfer ve arayüzün gece paleti birlikte değişir.
- Gece pencereleri emissive, Times Square panoları kendinden ışıklı HDR yüzeylerdir. Post-process parlak bölgelerden hafif **bloom** üretir.
- **Açık / Sisli / Karlı** seçenekleri. Karlı durumda 950 voxel kar tanesi düşer; yukarı bakan arazi, çatı ve ağaç yüzeyleri beyazlaşır.

### 6. Kamera ve keşif

- Damping’li OrbitControls; eğim, yakınlaşma ve hedef taşıma sınırları var.
- Sağ panelde **Genel bakış + 10 simge**. `1–9` ilk dokuz, `0` onuncu simge; `O/Home` genel bakış.
- Her seçimde yaklaşık **1,5 saniyelik cubic ease-in-out uçuş**: hem konum, hem bakış hedefi, hem zoom değişir.
- Simge üzerinde etiket; tıklamada 1–2 cümlelik Türkçe bilgi kartı. Kartta koordinat ve sonraki durak düğmesi.
- **20 saniye** girdisiz kalınca mevcut bakış çevresinde yavaş sinematik orbit. Fare/dokunma hareketi, tıklama, tekerlek veya klavye turu durdurur.
- Fotoğraf modu arayüzü gizler, PNG indirir; `Esc` ile geri dönülür.
- Dar ekranlar için yeniden düzenlenen arayüz ve dokunmatik kamera desteği.

### 7. Ses

`src/audio.js`: kullanıcı etkinleştirince kurulan Web Audio grafiği; deterministik brown-noise tamponu, alçak geçiren filtre, yavaş filtre modülasyonu ve düşük frekanslı harmonikler. Uzak trafik/şehir uğultusu hissi verir. Varsayılan kapalı, harici ses dosyası yok, açılış/kapanışta yumuşak ses geçişi var.

### 8. Süreç ve doğrulama

- Her simgede **1920×1080 headless Chromium ekran görüntüsü** alındı ve görüntüler açılarak görsel inceleme yapıldı.
- **İlk düzeltme turu:** kuzey ızgarası yönü, Grand Central/Chrysler kesişimi, lineer renk çıkışı ve ilk RAF zaman damgasının trafik indeksine etkisi düzeltildi. İlk tur görüntüleri `kontrol/tur-1/`.
- **İkinci düzeltme turu:** Brooklyn kıyı bağlantısı, köprü görüş koridoru, küçük simgelerin kamera açıları, One World Trade Center köşe geometrisi, kar birikimi, renk ayrımı ve gece arayüzü düzeltildi. İkinci tur görüntüleri `kontrol/tur-2/`.
- **Son iyileştirme ve kontrol:** Grand Central’ın önündeki bloklar alçaltıldı; Chrysler’ın kemerli tacı detaylandırıldı; yakın planda bulut örtüşmesi azaltıldı; bulutlar/kuşlar/tekneler birleştirildi; aktif satır ve kamera uçuşunun tamamlanması otomatik kontrole eklendi. Son kareler `onizleme/`.
- Konsol ve JavaScript hata kaydı: son raporda **0 hata**. `onizleme/rapor.json` gerçek tarayıcı loglarını, dosya isteklerini, fotoğraf indirme ve ses kontrolü sonuçlarını içerir.
- **HTTP etkileşim kontrolü:** `kontrol/etkilesim.json` — FPS gizle/göster, panelden seçim, hover etiketi, tekerlek zoom, sürükleme orbit, klavyeyle saat, hava seçimi, P/Esc fotoğraf modu, 20 saniye otomatik tur, girdiyle turun durması ve 390×844 mobil seçim testlerinin tamamı geçti. Konsol hatası **0**. Yalnız üç yerel HTTP dosya isteği görüldü. Mobil kareler `kontrol/mobil-390.png` ve `kontrol/mobil-grand.png`.
- Tekrar üretim: `npm run check`. HTTP sunucusu açıkken `npm run check:ui`; izole performans için `npm run bench`. İki eski turun hata kayıtları geliştirme geçmişidir; güncel teslimin doğrulama raporu `onizleme/rapor.json` dosyasıdır.

## Performans ölçümü

Ölçüm kaydı: `kontrol/performans.json`. Headless Chromium, **1920×1080 viewport**, 6 saniye ısınma + 15 saniye RAF örnekleme; ölçüm sırasında ekran görüntüsü alınmadı. Her iki kalite düzeyinde de **0 konsol/JavaScript hatası**.

| Kalite | Gerçek iç çözünürlük | Ortalama FPS (SwiftShader) | Medyan kare | P95 kare |
|---|---|---:|---:|---:|
| Normal | 1920×1080 | 1.65 | 616.6 ms | 966.6 ms |
| `?q=low` | 1344×756 | 2.19 | 433.3 ms | 899.9 ms |

- **23.731 statik voxel kutusu**, tüm alt/iç yüzler dahil **142.386 statik yüz**.
- Kar, araç, tekne ve bulut kutuları dahil en kötü durum: **149.694 voxel yüzü**; 400.000 sınırının %37,4’ü.
- Kablo gibi diğer geometri için de pay ayrılan muhafazakâr üst bütçe: **154.386 yüz**.
- Olağan kare: **41 çizim çağrısı**, post-process dahil **292.964 üçgen**. Gölgenin ilk çizildiği veya ışığın değiştiği karelerde ek gölge geçişi olur.
- Ana adada **162 genel bina**, bunlara ek 10 elle modellenmiş simge ve sade komşu kıyı yapıları; **95 hareketli araç**.
- Kalite değiştiğinde tohum/geometri sayıları aynı kaldı.

Bu yazılım çizicisi ölçümünde **60 FPS elde edilmedi**. Donanım hedefi ile doğrulanan sonuç birbirinden ayrıdır; gerçek RTX cihazında sayacı veya **`npm run bench -- --gpu`** komutunu kullanarak ayrıca ölçmek gerekir. `--gpu` çıktısı `kontrol/performans-gpu.json` dosyasına yazılır; gerçek kullanılan GPU mutlaka raporun `renderer` alanından kontrol edilmelidir. Varsayılan `npm run bench` tekrarlanabilir ortam testi için SwiftShader’ı açıkça seçer.

**Donanım sınırı:** bu çalışma ortamında `/dev/dri` ve `/dev/nvidia*` yok; `nvidia-smi` sürücüye erişemedi. Chromium **ANGLE / SwiftShader yazılım Vulkan** çizicisi kullanıyor. Dolayısıyla ölçülen yazılım FPS’si bir RTX 5060 sonucu değildir ve RTX üzerinde 60 FPS elde edilmiş gibi sunulmamıştır.

## Dosyalar

- `index.html` — uygulama girişi; doğrudan açılabilir.
- `dist/app.js` — Three.js dahil derlenmiş yerel uygulama.
- `src/` — on JavaScript modülü ve responsive stil dosyası.
- `onizleme/` — genel bakış, 10 simge, gece, kar, sis, arayüzsüz PNG; galeri ve son tarayıcı raporu.
- `kontrol/` — iki görsel inceleme turu, tekrar çalıştırılabilir tarayıcı/performance kontrolleri ve ölçüm çıktıları.
- `package.json`, `package-lock.json`, `node_modules/` — yerel bağımlılıklar ve derleme komutları.
- `BASLAT.sh` — localhost sunucusu; istenirse port argümanı: `./BASLAT.sh 8080`.
- `TESLIM.md` — bu kullanım, şartname ve doğrulama belgesi.
