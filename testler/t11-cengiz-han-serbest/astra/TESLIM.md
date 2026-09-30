# Ebedî Bozkır — Cengiz Han

Tsonjin Boldog'daki Cengiz Han Atlı Heykeli için Three.js ile hazırlanmış, tamamen yerel çalışan sinematik bir web deneyimi.

## Açılış

**Bu klasördeki `index.html` dosyasını Chromium veya Chrome ile açın.** Çift tıklama yeterlidir; sunucu, npm kurulumu ve internet bağlantısı gerekmez. JavaScript ve WebGL açık olmalıdır.

İsteğe bağlı yerel sunucu:

```sh
npm run dev
# http://localhost:5173
```

Alternatif:

```sh
python3 -m http.server 8080
# http://localhost:8080
```

`dist/` klasörü aynı deneyimin taşınabilir dağıtım kopyasıdır. İçeriği herhangi bir statik web sunucusuna yüklenebilir; `dist/index.html` da doğrudan açılabilir.

## Deneyim

- **60 saniyelik yolculuk:** Bozkır → Anıt → Sonsuzluk; yumuşak kamera geçişleri ve hareketli kadrajlar.
- **Serbest keşif:** Fareyle veya tek parmakla sürükleyerek dönün. Fare tekerleği / iki parmakla yakınlaşın. Sürüklemek sinematik rotayı durdurur; alttaki bölüm düğmeleri tasarlanmış kadrajlara döndürür.
- **Işık:** Şafaktan altın saate, mavi saate ve geceye kesintisiz geçiş. Gece anıtın çevresindeki sıcak aydınlatmalar devreye girer.
- **Anıt detayları:** Alt çubuktaki bilgi düğmesi, figür, at ve kaide üzerindeki keşif noktalarını gösterir.
- **Hikâye paneli:** Anıtın bağlamı, ölçüleri ve kaynak bağlantısı.
- **Ses:** Hoparlör düğmesiyle yerel olarak sentezlenen rüzgâr ve düşük tonlu ortam sesi. Başlangıçta kapalıdır.
- **Tam ekran ve temiz kadraj:** Tam ekran düğmesi; `H` ile arayüzü gizleme.
- **Kısayollar:** `1`, `2`, `3` kamera görünümleri; `H` arayüz; `Esc` açık paneli kapatır ve yolculuğu durdurur.

## Tasarım ve model

Model kodla, bu çalışma için oluşturuldu. Atın gövdesi, dört bacağı, yelesi, kuyruğu, koşumları ve dizginleri; binicinin kaftanı, örgüleri, başlığı, kırbacı ve üzengileri ayrı geometrik ayrıntılardır. Dairesel kaide 36 sütun, kemerli pencereler, silmeler, basamaklar ve döşeme derzleri içerir.

Çevrede çok katmanlı dağlar, yükseklik alanından üretilen arazi, 16.000 örneklenmiş ot, dalgalanan Moğol bayrakları, kuşlar ve ölçeği gösteren insan figürleri bulunur. Çelik için fiziksel tabanlı malzemeler, özel yansıma ortamı ve prosedürel yüzey pürüzü kullanıldı. Gökyüzü, bulutlar, güneş ve yıldızlar shader ile üretilir.

**Bu bir sanat yorumudur:** Fotoğraflardan esinlenir; fotogrametri, birebir tarama veya ölçülü mimari rekonstrüksiyon değildir. Çevre ve ışık sinematik olarak tasarlanmıştır. Aynı açıklama sayfanın bilgi panelinde de yer alır.

## Dosyalar

| Dosya | İşlev |
|---|---|
| `index.html` | Ana giriş, Türkçe arayüz ve bilgi metinleri |
| `app.js` | Three.js dahil, tarayıcıda doğrudan çalışan derlenmiş kod |
| `style.css` | Masaüstü / mobil tasarım ve yerel font tanımları |
| `main.js` | Kamera, etkileşimler, zaman, ses ve render yönetimi |
| `monument.js` | Özgün heykel ve kaide geometrisi |
| `world.js` | Arazi, atmosfer, ışık, otlar, bayraklar ve kuşlar |
| `assets/` | Yerel fontlar, simge, lisanslar ve görsel referans |
| `dist/` | Dağıtıma hazır bağımsız kopya |
| `EBEDI-BOZKIR.zip` | index.html ile başlayan taşınabilir teslim paketi |
| `ONIZLEME.png` | Ana sahnenin tarayıcı ekran görüntüsü |
| `scripts/build.mjs` | Kaynaklardan app.js ve dist oluşturma |
| `scripts/serve.mjs` | Bağımlılıksız yerel HTTP sunucusu |
| `scripts/qa.mjs` | Chromium üzerinde etkileşim ve ekran görüntüsü kontrolleri |
| `qa/` | Kontrol ekran görüntüleri ve sonuçları |

## Kaynağı düzenleme

Çalışan teslim dosyaları önceden derlenmiştir. Kaynak JavaScript'i değiştirirseniz:

```sh
npm install --cache .npm-cache
npm run build
```

Ardından sayfayı yenileyin. CSS ve HTML değişiklikleri kök sayfada doğrudan görünür; `dist/` kopyasını güncellemek için yeniden build alın.

## Kaynaklar ve lisanslar

- [Amicus Mongolia — anıtın ölçüleri, çelik ağırlığı ve 36 sütun](https://www.amicusmongolia.com/ulaanbaatar/chinggis-genghis-khaan-statue-complex-equestrian)
- [View Mongolia — konum ve ziyaretçi terası](https://www.viewmongolia.com/mongolia-genghis-khan-statue.html)
- [Wikimedia Commons — incelenen fotoğrafın kaynak sayfası](https://commons.wikimedia.org/wiki/File:GenghisKhanEquestrianMonument_(1).jpg). `assets/reference.jpg` yalnız modelleme referansıdır; web deneyiminde görüntülenmez ve dağıtım paketine alınmaz.
- Three.js r180: MIT, `assets/Three-LICENSE.txt`.
- Cormorant Garamond ve Manrope: SIL Open Font License, `assets/*-OFL.txt`.

Sayfa açılışında harici ağ isteği, analitik, çerez, hesap veya API anahtarı kullanılmaz. Kaynak bağlantıları yalnız tıklandığında dış siteyi açar.

## Doğrulama

Chromium **152.0.7977.82** ile gerçek WebGL sahnesi açıldı ve ekran görüntüleri görsel olarak incelendi. 1440×900 masaüstü ve 390×844 mobil kadrajlar kontrol edildi. Testler doğrudan `file://.../index.html` üzerinden yapıldı.

- 11 etkileşim kontrolü geçti: bölüm geçişi, gece ışığı, detay kartı, hikâye paneli, Escape, ses düğmesi, arayüz gizleme, yolculuğu başlatma/durdurma, serbest kamera ve mobil taşma kontrolü.
- 60 saniyelik yolculuk gerçek süreyle baştan sona çalıştırıldı; ikinci ve üçüncü sahneye geçiş, otomatik bitiş ve tam ekran doğrulandı.
- Mobil ve masaüstü bilgi panelinde yatay kayma olmadığı ayrıca ölçüldü.
- Son testlerde JavaScript hatası yok. Sonuçlar: `qa/report.json`, `qa/tour-report.json`, `qa/layout-report.json`.
- Ekran görüntüleri: `qa/hero.png`, `qa/night.png`, `qa/infinity.png`, `qa/detail.png`, `qa/story.png`, `qa/mobile.png`, `qa/mobile-story.png`.

Bu çalışma ortamında NVIDIA sürücüsüne erişilemediğinden tarayıcı kontrolleri Chromium'un yazılım WebGL sürücüsüyle yapıldı. Donanım FPS ölçümü yapılmadı. Uygulama yazılım renderer'ını algıladığında bloom efektini kapatır; temel sahne ve tüm etkileşimler korunur.
