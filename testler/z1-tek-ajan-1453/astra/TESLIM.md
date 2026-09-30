# 1453 — 29 Mayıs Şafağı

Kitin masa üstü İstanbul maketi üzerinde, yalnız **C3_1453_Safak** koleksiyonunda hazırlanmış mimari diorama.

## Ana teslimler

- **sahne.blend** — Düzenlenebilir, kendi içinde yeterli Blender sahnesi. Açılış karesi **1365**; render kamerası kitin özgün kamerası; varsayılan çıktı **1920×1080 / %100**. Kullanılan yerel yazı tipi dosyaya paketlendi.
- **kare.png** — Kitin özgün kamerasından, aşağıdaki render komutuyla üretilen 1365. karenin tam çözünürlüklü PNG çıktısı.

Blender ile `sahne.blend` dosyasını açın. Kamera görünümü için sayısal tuş takımındaki **0**, yeniden render için **F12** kullanın. `kare.png` herhangi bir görüntüleyicide doğrudan açılır.

## Sahne

Yükseltilmiş kubbesi, kırk pencereli kasnağı, yarım kubbeleri ve dış payandalarıyla **minaresiz Ayasofya**; **Aya İrini**; kuleli deniz surları ve çift kara surlarının kadraja giren bölümü; Ceneviz surları içinde **Galata Kulesi**; Eugenios–Galata arasında halkalı ve ahşap şamandıralı **Haliç zinciri**; Kasımpaşa tarafında, Haliç içinde kürekli ve Latin yelkenli Osmanlı gemileri.

Seyrek kiremit çatılı mahalleler arasında bostanlar, serviler, bahçe duvarları, çatısız yapılar, eski sarnıç ve Hipodrom kalıntıları bulunuyor. Doğudan gelen alçak sıcak ışık ve ince hacimsel duman şafak atmosferini tamamlıyor. Pirinç tonlu açıklamalar, tarih başlığı ve yön gülü müze maketi sunumunun parçalarıdır.

Mimari okunurluk için ana anıtlarda seçici ölçek kullanıldı. Yapı ve mahalle ayrıntıları dönemsel bir tasarım yorumudur; birebir arkeolojik restitüsyon iddiası taşımaz. Geometri ve malzemeler kodla üretildi; hazır model veya doku indirilmedi. İnsan, bayrak, şiddet, minare, Osmanlı camisi, Topkapı Sarayı, Galata Köprüsü ve buharlı gemi yoktur.

## Yeniden render

Bu klasörde:

```bash
blender -b sahne.blend --python /home/forn/zaman-yarigi/kit/araclar/kare_render.py -- "$PWD" 100 1 1365 1365
cp k_1365.png kare.png
```

C3 nesneleri yalnız kitin bu çağ için ayırdığı **1141–1590** kare aralığında görünür.

## Kontrol ve üretim dosyaları

- `dogrulama.json` — Özgün KIT geometrisi, malzemeleri, dünya ayarları ve kamera hareketi karşılaştırması; koleksiyon ve çıktı ayarı denetimleri.
- `dogrula.py` — Yukarıdaki kontrolü yeniden çalıştırır: `blender -b sahne.blend --python dogrula.py`.
- `sahne_kur.py`, `detay_ekle.py` — Sabit rastgelelik tohumu ile bütün sahneyi yeniden üretir. Kitten başlatma: `blender -b /home/forn/zaman-yarigi/kit/arazi_kiyi.blend --python sahne_kur.py`.
- `onizleme.png` — %65 çözünürlüklü görsel kontrol çıktısı.
- `k_1365.png` — Kit aracının ürettiği, `kare.png` ile aynı final görüntü.
- `render.log`, `dogrulama.log`, `yapim.log` — İşlem kayıtları.

Kontrolde KIT nesnelerinin dönüşümleri, mesh verileri, malzeme düğümleri, ışığı, dünya düğümleri ve kamera verileri karşılaştırıldı. Kameranın **1, 601, 1141, 1365, 1590, 2221 ve 3300**. karelerdeki dönüşümleri de aynı kaldı. Diğer çağ koleksiyonları boş; bütün ek nesneler C3 yuvasında.

## Kaynak temeli

Esas kapsam: kitin `OKUBENI.md` ve `kaynak_kartlari/C3_1453_Safak.md` dosyaları.

Ek mimari kontrol: [Kültür ve Turizm Bakanlığı — Ayasofya](https://www.ktb.gov.tr/EN-113776/ayasofya-hagia-sophia.html), [Encyclopaedia of the Hellenic World — Hagia Eirene](https://constantinople.ehw.gr/Forms/fLemmaBody.aspx?lemmaid=10895).

Tam kare ile Ayasofya–Aya İrini ve Haliç ayrıntıları büyütülerek görsel olarak kontrol edildi; kıyıya taşan sur ucu ve kaidelerin araziye oturuşu düzeltildi.

Çalışma tek ajanla yapıldı.
