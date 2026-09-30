# İstanbul — 29 Mayıs 1453, şafak

Tek, sabit ve yükseltilmiş bir Sarayburnu bakışı: ilk ışığın vurduğu deniz surları, minaresiz Ayasofya, servi bahçeleri, Haliç'te Latin yelkenli tekneler ve uzaktaki duman. İnsan figürü, şiddet sahnesi ve bayrak yoktur.

## Teslim dosyaları

- **sahne.blend** — Düzenlenebilir Blender 5.2 sahnesi. Kamera, Cycles ışıklandırması, malzemeler ve atmosfer dahildir. Sekiz adlandırılmış koleksiyonla düzenlenmiştir.
- **kare.png** — 1920 × 1080 nihai render.
- **sahne_uret.py** — Geometriyi ve malzemeleri sıfırdan kuran kaynak kod.

## Açılış

`blender sahne.blend`

Kayıtlı kamerayı görmek için Numpad 0; yeniden render için F12. Sahne dış dosyaya bağımlı değildir. Hiçbir hazır model, doku veya görsel indirilmemiştir. Taş, sıva, ahşap, kurşun, su ve dumanın yüzeyleri Blender düğümleriyle; binalar, gemiler, halatlar ve bitkiler programatik geometriyle üretilmiştir.

## Tarihsel yaklaşım

Ayasofya, geniş merkezî kubbe, kırk pencereli kubbe kasnağı, iki ana yarım kubbe ve alt eksedralarla yorumlandı. Minareler, Topkapı Sarayı ve daha geç Osmanlı camileri eklenmedi. Karşı kıyıda ortaçağ Galata yerleşimi ve kulesi; Haliç ağzında yüzer destekli liman zinciri bulunur. Şehir içinde boş bahçeler ve eski yapı parçaları bırakıldı.

Bu çalışma, 1453 topografyasının ölçülü arkeolojik restitüsyonu değil, tarihsel çerçeveye dikkat eden atmosferik bir canlandırmadır. Kıyı mesafeleri, mahallelerin yerleşimi, gemilerin konumları ve dumanın dağılımı kadraj için yorumlanmıştır.

Başvurulan metinler (yalnız tarihsel bilgi; görsel/varlık kullanılmadı):

- Metropolitan Museum of Art, [Hagia Sophia, 532–37](https://www.metmuseum.org/de/essays/hagia-sophia-532-37): ana kubbe, yarım kubbeler ve Osmanlı döneminde eklenen minareler.
- Alexander Van Millingen, [Byzantine Constantinople — Golden Horn walls](https://textbase.scriptorium.ro/van_millingen/byzantine_constantinople/the_walls_along): Haliç surları ve liman zinciri.

## Teknik not

Bu çalışma ortamında Cycles aygıt taraması yalnız CPU döndürdü; render CPU ile alındı. Sahne, uygun NVIDIA sürücüsü bulunan bir Blender kurulumunda Cycles / OptiX ile de render edilebilir.

## Kaynaktan yeniden üretim

Aynı klasördeki dört Python dosyası birlikte kullanılır:

- `sahne_uret.py`: ana sahne, mimari, kent, gemiler, kamera ve render.
- `detay_ekle.py`: patikalar, döşemeler, zeytinler, iskele, iç arazi ve mimari ayrıntılar.
- `son_isik.py`: sabah göğü ve rüzgârda dağılan sürekli duman hacimleri.
- `yuzeyler.py`: taş derzleri, sıva yaşlandırması ve yüksekliğe/mesafeye bağlı sis.

```sh
blender -b --threads 14 --python sahne_uret.py
```

Bu komut teslimdeki `sahne.blend` ve `kare.png` dosyalarını yeniden üretir ve üzerlerine yazar. Nihai ayarlar: Cycles, 96 örnek üst sınırı, uyarlamalı örnekleme ve denoise, AgX, 1920 × 1080. `onizleme.png`, çalışma sırasında kontrol edilen ara görüntüdür; teslim görüntüsü `kare.png` dosyasıdır.
