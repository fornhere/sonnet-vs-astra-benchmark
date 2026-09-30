# BOĞAZ — Gecenin nöbetçisi

Fırtınalı bir İstanbul gecesinde Kız Kulesi. Three.js ile gerçek zamanlı çalışan, altı bileşenli denizi, dönen feneri, üretilmiş sesleri ve 60 saniyelik kamera yolculuğu olan etkileşimli sahne.

**Başlangıç:** `index.html` dosyasını Chromium’a sürükleyin. Kurulum, internet bağlantısı veya derleme gerekmiyor. `file://` açılışı ayrıca test edildi.

Alternatif:

```bash
cd /home/forn/sonnet-vs-astra/t10-kiz-kulesi-detayli/astra
python3 -m http.server 8080
```

Ardından <http://localhost:8080> adresini açın. Düşük kalite: <http://localhost:8080/?q=low>.

**Görsel galeri:** [onizleme/index.html](onizleme/index.html) · **Açılış karesi:** [00-sinematik.png](onizleme/final/00-sinematik.png)

## Dosyalar

| Dosya / klasör | İçerik |
|---|---|
| `index.html` | Türkçe arayüz, kontroller, erişilebilir düğmeler ve yerel başlangıç dosyası |
| `dist/app.js` | Three.js **0.180.0**, OrbitControls ve uygulamanın hazır, tek dosyalık paketi |
| `dist/THREE-LICENSE.txt` | Three.js MIT lisansı |
| `src/main.js` | Render döngüsü, ışıklar, durum, arayüz, ekran görüntüsü ve ölçüm API’si |
| `src/architecture.js` | Kule, avlu, rıhtım, kayalar, taş/sıva dokuları, bayrak ve mimari ışıklar |
| `src/ocean.js` | Gerstner dalgaları, analitik normaller, Fresnel, parıltı ve köpük shader’ları |
| `src/atmosphere.js` | Gökyüzü, yağmur, sıçrama, sis, hacimsel fener ve çatallı yıldırım |
| `src/environment.js` | İki kıyının silueti, camiler, vapur, izi ve martılar |
| `src/camera.js` | Kapalı kamera/odak eğrileri ve serbest kamera geçişi |
| `src/audio.js` | Web Audio ile yağmur, rüzgâr, dalga ve gök gürültüsü sentezi |
| `src/util.js`, `src/style.css` | Tekrarlanabilir rastgele üretim, ortak GLSL, hale dokusu ve uyarlanabilir arayüz |
| `onizleme/final/` | Son sürümün altı kamera karesi, serbest kamera ve ek özellik görüntüleri |
| `onizleme/tur-1/`, `onizleme/tur-2/` | İki görsel kontrol turunun ara kareleri ve düzeltme notları |
| `onizleme/performans.json` | Ham FPS, kare süresi, render çözünürlüğü ve GPU kimliği |
| `onizleme/islev-testleri.json` | Kontroller, kamera dikişi, ses, PNG, çevrimdışı açılış ve konsol kontrolü |
| `scripts/` | Tekrarlanabilir headless Chromium kontrol ve ölçüm betikleri |
| `package.json`, `package-lock.json` | Sabitlenmiş yerel geliştirme bağımlılıkları |

`node_modules` geliştirme içindir. Kullanım için yalnız `index.html`, `src/style.css` ve `dist/` yeterlidir. Çalışma anında CDN, uzak font, uzak model, görüntü veya ses dosyası çağrılmaz. Bütün sahne geometrisi ve kullanılan bitmap dokular kodla üretilir.

## Zorunlu şartların karşılığı

1. **Teknik:** Yerel Three.js 0.180.0 npm kurulumu, esbuild ile klasik IIFE paketi. ES module sunucusu gerektirmeden hem `file://` hem Python HTTP sunucusu ile açılır. Kaynak kod `src/` altında sekiz JS modülüne ayrılmıştır. 1920×1080 / 60 FPS donanım hedefi için tek sahne geçişi, birleştirilmiş sabit geometriler, GPU parçacıkları, statik gölge haritası ve piksel oranı sınırı kullanıldı. `?q=low`, deniz ağını 260×260’tan 140×140’a, yağmuru 6500’den 2300’e, sıçramaları 1700’den 650’ye indirir; gölgeleri ve MSAA’yı kapatır, render ölçeğini %70 yapar. FPS sayacı düğmeyle veya **F** ile gizlenir/gösterilir. **60 FPS hedefi bu ortamda doğrulanamadı; ölçüm aşağıdadır.**

2. **Kule:** Referans görüntülerindeki kare taş/sıva gövde, dışarı taşan sekizgen fener katı, kavisli kurşun çatı, çatı birleşim çizgileri, alem, balkon korkuluğu, mazgallı avlu ve rıhtım elle modellendi. Kayalık halka, baba demirleri, basamaklar, ahşap avlu eki, kemerli pencereler ve dalgalanan Türk bayrağı eklendi. Taş ve sıva, CanvasTexture ile çok ölçekli GLSL gürültüsünün birleşimidir; taş derzleri dünya koordinatlarında aynı fiziksel ölçekte görünür. Kule/adacık ve kat oranları fotoğraf referansına göre kuruldu; model mimari rölöve değildir.

3. **Deniz:** **Altı Gerstner bileşeni**: 29, 16, 9,5, 5,3, 2,7 ve 1,4 birim dalga boyları; farklı yönler, hızlar ve genlikler. Yatay yer değiştirme ve analitik yüzey normali vardır. Yansıma modelinde bakış açısına bağlı Fresnel, soğuk gökyüzü/ay parıltısı ve dalgalarla kırılan sıcak fener izi kullanılır. Kıyı çevresindeki köpük alanı adacığı takip eder; sıçrama parçacıkları balistik hareketle yükselip suya düşer. Fırtına kontrolü dalga genliğini ve köpüğü değiştirir.

4. **Fırtına:** GPU üzerinde rüzgârla taşınan eğik yağmur çizgileri, hareketli prosedürel bulutlar, üstel mesafe sisi ve üç alçak sis bankası vardır. Otomatik şimşekler fırtınada rastgele aralıklarla gelir; ana dal ve yan çatallar yeni geometriyle üretilir. Deniz, gökyüzü ve mimari aydınlatma aynı flaşa tepki verir. Ses açıksa gök gürültüsü **rastgele 1–3 saniye sonra** başlar. Sakin ayarda yağmur sıfırlanır; elle şimşek her ayarda kullanılabilir.

5. **Fener:** 16 saniyede dönen, karşılıklı iki hüzme. Shader, koninin içinde görüş ışını boyunca **16 yoğunluk örneği** toplar; radyal ve boyuna sönümle kenarlar yumuşar. Yağmur/sis yoğunluğu görünürlüğünü etkiler. Kaynak halesi, ince yatay ışık saçağı ve denizde dönen sıcak parıltı eklenmiştir.

6. **Çevre:** Üsküdar ve Sarayburnu yönlerini temsil eden iki kıyı kümesi, kubbeli/minareli üç cami silueti ve seyrek kent ışıkları vardır. Şimşek sırasında sis ve siluet ayrımı güçlenir. Uzaktaki çift katlı, ışıklı vapur ilerler; dalga yüksekliğine göre yükselir, yatış ve baş-kıç salınımı yapar. Arkasında iki kollu iz bulunur. Dokuz martı kule çevresinde kanat çırparak uçar.

7. **Kamera:** Kamera konumu ve baktığı nokta ayrı **kapalı Catmull–Rom eğrileri** üzerindedir. Gerçek geçen zamana göre 60 saniyede yaklaşma → su hizası → kulenin çevresinde dönüş → fener yakın planı → başlangıç akışı tamamlanır. 0 ve 60. saniyenin konum/yönelim farkı testte sıfırdır. Kamera en alçakta yaklaşık 3,08 birimdedir; kule merkezine en yakın yatay mesafesi yaklaşık 20,85 birimdir. “Serbest keşfet” fare sürükleme ve tekerlek kontrolünü açar; aynı düğme “Sinematiğe dön” olur ve yumuşak geçişle yolu devralır. Zaman çizgisine tıklayarak veya odaktayken ok tuşlarıyla istenen ana gidilebilir.

8. **Kontroller:** Fırtına şiddeti, gece–şafak atmosferi, elle şimşek, ses, serbest kamera, duraklatma, FPS, panel gizleme ve fotoğraf modu çalışır. Fotoğraf modunda ana arayüz gizlenir ve kadraj fareyle ayarlanabilir. PNG yalnız WebGL sahnesinden alınır; arayüz içermez. Düşük kalite açık olsa da PNG’nin piksel boyutu tarayıcı görünümünün tam boyutudur. Telefon görünümünde atmosfer paneli başlangıçta kapalıdır.

9. **Ses:** Web Audio ile döngülü gürültü, filtreler, düşük frekanslı modülasyonlar, dinamik gain ve limiter kullanılır. Yağmur yüksek geçiren, rüzgâr alçak geçiren, dalga bant geçiren katmandır; gök gürültüsü ayrı bir gürültü zarfı ve düşen filtre kesim frekansıyla üretilir. Varsayılan kapalıdır, ilk kullanıcı tıklamasıyla AudioContext açılır. Fırtına şiddeti bütün sürekli katmanların seviyesini/modülasyonunu değiştirir. Ağdan ses indirilmez.

10. **Süreç:** Headless **`/usr/bin/chromium` + Playwright** ile 0, 10, 20, 30, 40 ve 49. saniyelerden, ayrıca gerçek fare sürüklemesiyle serbest moddan 1920×1080 ekran görüntüleri alındı ve görsel olarak incelendi. **İki düzeltme turu tamamlandı.** İlkinde pozlama, geometrik taban, doku ölçeği, hüzme kenarları, kadraj ve çizim sayısı; ikincisinde shader önbelleği, hacimsel ışık, sis, hale, mobil panel ve PNG çözünürlüğü düzeltildi. Son turda şimşeğin kamera önündeki gökyüzünde doğması da sağlandı. Son sürümün ekran görüntüsü ve işlev kontrollerinde **0 konsol/JavaScript/shader hatası**, **0 harici ağ isteği** kaydedildi.

## Gerçek performans ölçümü

**Bu çalıştırma ortamında RTX 5060’a erişilemiyor.** `nvidia-smi` sürücüyle iletişim kuramadı; `/dev/dri` ve `/dev/nvidia*` aygıtları bulunmuyor. Chromium’un raporladığı aygıt:

```
ANGLE (Google, Vulkan 1.3.0
(SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)
```

Dolayısıyla aşağıdaki değerler CPU üzerinde yazılımsal WebGL ölçümüdür; **RTX 5060 ölçümü veya 60 FPS doğrulaması değildir.**

| Mod | Tarayıcı görünümü | İç render boyutu | Ortalama FPS | %95 kare süresi | Son örnekte üçgen |
|---|---|---|---:|---:|---:|
| Yüksek | 1920×1080 | 1920×1080 | **3,76** | 300 ms | 168.798 |
| Düşük | 1920×1080 | 1344×756 | **11,96** | 100 ms | 72.798 |

Yöntem: Sayfa ve shader’lar hazır olduktan sonra 2,5 sn ısınma, 12 sn çalışan animasyon, son 10 saniyenin `requestAnimationFrame` aralıklarından ortalama FPS ve %95 kare süresi. Kamera ve hava çalışır; ölçümde ekran görüntüsü alınmaz. Her iki modda hata sayısı sıfır. Ham sonuç: [performans.json](onizleme/performans.json). İlk görsel turda yaklaşık 92 olan çizim çağrısı sayısı, son sahnede kadraja göre yaklaşık 47–55 seviyesine indirildi.

Gerçek donanım üzerinde doğrulama için donanım hızlandırması açık Chromium’da 1920×1080 görünümde sahneyi açın ve **F** ile sayacı görünür yapın. Burada hedefe ulaşıldığı iddia edilmemiştir.

## Kısayollar

| Tuş | İşlev |
|---|---|
| `Space` | Animasyonu duraklat / sürdür |
| `C` | Serbest kamera / sinematik kamera |
| `L` | Şimşek |
| `M` | Sesi aç / kapat |
| `F` | FPS sayacı |
| `P` | Fotoğraf modu |
| `H` | Bütün arayüzü gizle / göster |
| `Esc` | Fotoğraf modundan çık, gizlenmiş arayüzü geri getir |

Serbest kamerada **sürükle: yörünge**, **tekerlek: yaklaş/uzaklaş**. Sürükleme dokunmatik ekranda da çalışır.

## Geliştirme ve kontrolleri tekrar çalıştırma

```bash
npm ci --cache .npm-cache
npm run build
python3 -m http.server 8080
```

Ayrı terminalde:

```bash
mkdir -p .tmp
TMPDIR="$PWD/.tmp" npm run qa
TMPDIR="$PWD/.tmp" node scripts/verify.mjs
TMPDIR="$PWD/.tmp" node scripts/performance.mjs
TMPDIR="$PWD/.tmp" node scripts/extra-captures.mjs
```

Betikler yerel Chromium kullanır; Playwright tarayıcısı indirmez. `npm run build` sonrasında runtime yine tamamen yereldir.

Görsel kontrol URL seçenekleri: `?still=1&t=20` kamerayı 20. saniyede durdurur; `&clean=1` arayüzü gizler. `&flash=1`, yalnız şimşek karesini incelemek için flaşı sabitler. Normal kullanımda bunların hiçbiri gerekli değildir.

## Görsel referanslar ve teknik kaynaklar

- [T.C. Kültür ve Turizm Bakanlığı — Kız Kulesi galerisi](https://kizkulesi.gov.tr/galeri): ana mimari referans.
- [Kız Kulesi restorasyon güncesi](https://kizkulesi.gov.tr/restorasyon-guncesi): çatı, kule ve avlu biçimi için bağlam.
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) ve [renk yönetimi](https://threejs.org/manual/pages/color-management.html): render/renk zinciri.

Model, dokular, efektler, arayüz ve sesler bu çalışma için kodla üretildi. Referans fotoğrafları sahneye doku olarak yapıştırılmadı; sahne her kamera açısından gerçek 3B geometri olarak çizilir.
