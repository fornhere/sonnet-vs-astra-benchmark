# KAPADOKYA — gezilebilir 3B dünya

Tarayıcıda açılan, tamamen **prosedürel** üretilmiş bir Kapadokya: önce ~90 saniyelik sinematik bir açılış turu (şafaktan sabaha), ardından ziyaretçinin kendi başına yürüyebildiği ya da balonla uçabildiği serbest keşif.
Hiçbir harici model, doku veya ses dosyası yok — arazi, peribacaları, kaya evleri, balonlar, gökyüzü, müzik ve sesler kodla üretiliyor.

## Nasıl açılır

**`index.html` dosyasını çift tıklayıp Chrome / Edge / Firefox / Safari'de açmak yeterli** (sunucu gerekmez, `file://` ile çalışır; internet de gerekmez — yazı tipleri `fonts/` içinde).
İlk açılışta ~3–4 saniye "vadiler oluşturuluyor" ekranı görünür, sonra:

* **Yolculuğa başla** → sinematik açılış turu (kulaklık önerilir; ses bu tıklamayla başlar). Tur `Boşluk` / `Esc` / "Turu geç" ile atlanabilir.
* **Turu atla · doğrudan keşfet** → doğrudan serbest gezinti.

Gereksinim: WebGL 2 destekleyen tarayıcı (2018 sonrası hemen her masaüstü/mobil). Ekran kartı ne kadar iyiyse o kadar akıcı; çözünürlük kare hızına göre otomatik ayarlanır.

Kaynağı yeniden derlemek isterseniz (gerekli değil, `dist/app.js` hazır):
```
npm install
npm run build        # esbuild ile src/ → dist/app.js (tek dosya, klasik <script>)
```

## Ne var?

**Açılış turu (6 plan, ~92 sn, sürekli ilerleyen gün doğumu):**
1. *Şafak öncesi mavi saat* — balon kalkış alanında, brülörleri yanan balonların arasında alçak vinç çekimi, sis, yıldızlar
2. *Göreme* — pencereleri yanan taş evler, minare, vadi sisi
3. *Aşk Vadisi* — sisin içinden yükselen yüzlerce peribacası
4. *Gökyüzü* — bir balonu takip; güneş balonun arkasında, kumaş içten aydınlanır, ufukta karlı Erciyes
5. *Uçhisar Kalesi* — yüzlerce oyuğu olan kaya kütlesi
6. *İniş* — bağların arasından vadi tabanına; tur bittiğinde kamera tam olarak oyuncunun başladığı noktada, kesintisiz devam eder

**Serbest keşif:**
* Yürü / koş / zıpla, peribacalarına ve evlere çarpar, dik yamaçlara tırmanamazsın
* **Balon modu (F):** kendi balonun şişer, `Boşluk` ile brülör yakıp yükselirsin, `C` ile alçalırsın; balonun içinden yukarı bakınca kumaşın ışıldadığını görürsün
* **8 gizli yer** (Göreme, Uçhisar Kalesi, Aşk Vadisi, Güvercinlik, Gül Vadisi, Devrent, Paşabağ, Balon Kalkış Alanı): yaklaşınca kart açılır, pusulada işaretlenir, "Sıradaki hedef" mesafesiyle gösterilir; keşifler `localStorage`'da saklanır
* **Günün saati kaydırıcısı** (sol altta) — gün doğumu, öğle, altın saat, gece (ay ışığı, yıldızlar, yanan pencereler, cırcır böcekleri); `T` ile zaman akar
* Pusula şeridi, dönen mini harita, `M` ile büyük harita, `P` ile arayüzsüz fotoğraf modu, `O` ile PNG kaydetme
* Dokunmatik ekranlarda iki sanal joystick

### Kontroller
| Tuş | İş |
|---|---|
| `W A S D` / ok tuşları | yürü / uç |
| Fare (ekrana tıkla) | etrafa bak (imleç kilitlenir, `Esc` ile çıkılır) |
| `Shift` | koş / hızlı uç |
| `Boşluk` | zıpla · balonda yüksel (brülör) |
| `C` | balonda alçal |
| `F` | yürüme ⇄ balon modu |
| `T` | zamanı akıt |
| `[` `]` | saati yarım saat geri/ileri |
| `M` | büyük harita |
| `P` | fotoğraf modu (arayüzü gizle) |
| `O` | ekran görüntüsünü PNG olarak indir |
| `N` | sesi aç/kapat |
| `H` | yardım / duraklat |

## Dosyalar

```
index.html        giriş noktası (arayüz, CSS, yazı tipi tanımları)
dist/app.js       derlenmiş uygulama (three.js dahil, tek dosya)
fonts/            Cormorant Garamond + Inter (woff2, yerel)
src/              kaynak kod
  main.js           döngü, durum makinesi (yükleme → tur → keşif), girdi, uyarlanabilir çözünürlük
  terrain.js        GPU'da arazi üretimi (2048², 2 m), parçalı LOD ağ, arazi gölgelendiricisi
  chimneys.js       peribacaları: 4 profil, ~5600 örnek, kaya evi/oyuk gölgelendirici, gölge damgası
  props.js          kaya oyukları (kapı/pencere/güvercinlik), Göreme evleri + cami/minare, ağaçlar
  balloons.js       balonlar (kumaş, brülör, sepet, kablolar), yatan balonlar ve araçlar, oyuncu balonu
  birds.js          köşe gölgelendiricide uçan güvercin sürüleri
  far.js            ufuk: step, tepeler, karlı Erciyes / Hasan Dağı
  sky.js            gökyüzü, bulut, yıldız, ay, gün-saati paleti
  glsl.js           ortak GLSL: gürültü, atmosfer, yükseklik sisi, vadi sisi, gölge ışını, AO
  tour.js           açılış turu: kamera yolları, altyazılar
  player.js         yürüme/uçma fiziği, çarpışma
  audio.js          üretken ses: rüzgâr, adım, brülör, kuş, cırcır, Hicaz dizisinde saz benzeri müzik
  ui.js, post.js    HUD/harita/pusula, sinema post-işlem (bloom, vinyet, gren, ton)
tools/            geliştirme betikleri (puppeteer ile ekran görüntüsü/harita/kamera avcısı; teslim için gerekmez)
onizleme/         ekran görüntüleri
```

## Teknik notlar

* **Arazi:** yükseklik haritası GPU'da (üç seviyeli vadi ağı + alan çarpıtma + basamaklı tüf katmanları + ikinci geçişte yamaç boyunca oluklu erozyon) 4×4 km için 2048² olarak üretilip RGBA8'e kodlanarak okunur; CPU tarafı yürüme, yerleştirme ve harita için aynı diziyi kullanır.
* **Işık:** güneş gölgeleri yükseklik dokusunda ışın yürütülerek (yumuşak, uzun şafak gölgeleri) hesaplanır; peribacaları bu haritaya profil şekilleriyle "damgalanır", böylece hem araziye hem birbirlerine doğru gölge düşer. Balonların gölgesi araziye ayrıca düşer.
* **Atmosfer:** güneş yüksekliğine bağlı gökyüzü paleti, üstel yükseklik sisi + vadi tabanında yoğun sabah sisi, tüm nesnelerde aynı sis fonksiyonu (havadan perspektif).
* **Performans:** ~1000 arazi parçası × 4 LOD (etekli), hücre bazlı örneklemeli (instanced) nesneler ve mesafe kırpma; kare süresine göre `pixelRatio` otomatik 0.55–1.6 arasında ayarlanır. RTX sınıfı kartta 1080p'de kare süresi birkaç ms.
* **Ses** Web Audio ile tamamen üretilir; tarayıcı kuralı gereği ilk tıklamadan sonra başlar.

## Doğrulama (bu klasörde yapıldı)

Chromium'da (GPU'lu, headless) gerçek arayüzle: yükleme → tur → atla → yürü → balon modu → harita akışı, 45 sn'lik rastgele girdi testi (hata yok), yürüme çarpışma simülasyonu, gündüz/gece/şafak kareleri, dar ekran (mobil) yerleşimi kontrol edildi. Tur kareleri `onizleme/` içinde.

## Bilinen sınırlar

* Yapılar (evler, ağaçlar) kutu/blob düzeyinde stilize; fotogerçekçi model değil.
* Tarayıcı ses kuralları yüzünden müzik/ses ancak ilk tıklamadan sonra başlar.
* Çok eski / WebGL 2 desteklemeyen cihazlarda açılış ekranı uyarı verir.
