# İstanbul, 29 Mayıs 1453 şafağı — Sarayburnu'ndan tek sabit kamera

## Dosyalar
- `sahne.blend` — Blender 5.2 sahnesi (kamera `Sarayburnu_Kamera`, Cycles/OptiX ayarlı)
- `kare.png` — 1920×1080 render
- `build.py` — sahneyi sıfırdan üreten betik (indirilen model/doku/görsel yok; her şey Blender içinde prosedürel)

## Nasıl açılır / yeniden üretilir
- `blender sahne.blend` ile açın (F12 render).
- Sıfırdan kurmak için: `blender -b --python build.py -- --render` (`--test` yarı çözünürlük hızlı önizleme verir).

## Sahne
Kamera Sarayburnu burun kulesinden yarımadanın ekseni boyunca batıya bakar. Solda Marmara ve deniz surları, sağda Haliç, ufukta Galata yakası. Kamera sabittir.
- **Ayasofya** ana odaktır. 40 nervürlü ve 40 pencereli merkez kubbe, doğu-batı yarım kubbeleri, doğu apsisi, dev payandalar, köşe merdiven kuleleri, narteks, atrium ve vaftizhane var. **Minare yoktur** (1453 durumu).
- **Deniz surları** Marmara ve Haliç kıyısı boyunca kule ve mazgallarla uzanır. Sur dokusu tuğla kuşaklı kesme taştır. Burun ucunda Eugenios kulesi ve Haliç ağzında yüzen **zincir (bom)** var.
- Bizans kubbeli kiliseleri (Aya İrini, Küçük Ayasofya, mahalle kiliseleri), Justinianos ve Konstantinos sütunları, Hipodrom seti, Mese boyunca kiremit çatılı ~1800 ev ve selvi/çınar ağaçları.
- Karşı yakada Ceneviz **Galata Kulesi** (Christea Turris, 1348, konik çatılı) ve surları.
- **Gemiler:** kürekli ve lateen yelkenli Osmanlı kadırgaları, kare yelkenli Ceneviz/Bizans naoları. Bayrak, sancak, haç veya arma yok.
- **Atmosfer:** Nishita gökyüzü ve alçak (≈4.6°) sıcak güneş, prosedürel şafak bulutları, yüksekliğe bağlı hacimsel sabah sisi. Şehir bacalarından ve Galata yamacındaki kamp ateşlerinden ince dumanlar yükselir, ufukta ise kara surları yönünde koyu bir duman kolonu görünür. İnsan figürü ve şiddet sahnesi yoktur.

## Notlar
- Ölçekler sıkıştırılmıştır: Ayasofya, Haliç ve Galata gerçek mesafelerinden yakındır. Bu bilinçli bir kompozisyon tercihidir.
- Süre sınırı nedeniyle final render düşük örnekleme (18 spp, adaptif) ve OpenImageDenoise ile alındı.
