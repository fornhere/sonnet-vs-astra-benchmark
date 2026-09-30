# KARAKIYI — Gelgit Kalesi

Sisli bir deniz adasında, kireçtaşı surları ve oksitlenmiş bakır çatılarıyla özgün bir fantezi şatosu. Altı kemerli yaklaşım köprüsü; açık giriş kemeri, kalkık parmaklık ve açılmış ahşap kapılar; ana şato, köşe kuleleri, gül pencereli şapel, revaklı bahçe ve döşeli avlular birlikte tasarlandı.

## Ana teslimler

| Dosya | İçerik |
|---|---|
| `sato.blend` | Blender 5.2 sahnesi; düzenlenebilir mimari, prosedürel malzemeler, ışıklar ve kamera animasyonu. |
| `render.mp4` | Müzikli sinematik tanıtım filmi. 24 saniye, 1280 × 720, H.264 / AAC, 24 fps. |
| `kapak.png` | 1920 × 1080, yazısız kapak / sunum görseli. |
| `avlu_plani.png` | 1600 × 1600, dış mekânın üstten ortografik görünüşü. |
| `index.html` | Film, görseller ve indirme bağlantıları bulunan yerel sunum sayfası. |

`sato.blend` dosyasını Blender ile, `render.mp4` dosyasını herhangi bir güncel video oynatıcıyla açabilirsiniz. `index.html` dosyası tarayıcıda doğrudan açılabilir; internet bağlantısı gerektirmez.

## Blender'da kullanım

- Ölçek: **1 Blender birimi = 1 metre**.
- Teslim sürümü: **158.015 poligon, 383 mesh nesnesi, 37 taşınabilir grup, 30 malzeme ve 5 kamera**.
- `Numpad 0` kamera görünümünü, `Space` animasyonu, `F12` aktif karenin renderını açar.
- `00–13` koleksiyonları çevre, mimari ve sahne detaylarını; `90` ışıkları, `91` kameraları içerir.
- Adı `ASSET` ile biten Empty nesneleri, kendi mimari grubunu birlikte taşır. Kuleyi veya bir yapıyı taşımak için ilgili Empty'yi seçin.
- Kameraların geçişleri zaman çizelgesindeki işaretlere bağlıdır: **1–240** adaya yaklaşım, **241–408** kapı yaklaşımı, **409–576** yükselen avlu uçuşu. Sahne 24 fps'dir.
- `STILL / cover portrait` ve `MAP / orthographic courtyard plan` kameraları ek görsel üretimi içindir. Başka bir kamerayla sabit görüntü almak için zaman çizelgesinin kamera işaretlerini geçici olarak devre dışı bırakın.
- Blender içindeki `READ ME • KARAKIYI` metninde de kısa kullanım notları bulunur.
- Tüm malzemeler yereldir ve prosedüreldir. Harici doku, HDRI, model, eklenti veya ücretli varlık gerekmez.

Bu, **dış mekân görselleştirme ve düzenlenebilir oyun çevresi kaynak sahnesidir**. Pencereler dekoratif girintilerle temsil edilir; döşenmiş iç mekânlar yoktur. Oyun motoruna aktarım öncesinde hedef projeye göre UV / doku fırınlama, LOD ve çarpışma geometrisi hazırlanmalıdır. Üstten görsel çatılarla birlikte dış yerleşimi gösterir; kat planı değildir. Üstten PNG, yatayda 57 metrelik alanı kapsar; kare ızgara eklenmemiştir. Model 3B baskıya hazırlanmış tek parça, su geçirmez bir mesh değildir.

## Yeniden üretim

Çalışma dizininde:

```bash
# Geometri, malzeme, ışık ve kameraları sıfırdan oluşturur.
blender -b --python build_castle.py

# Mimari grup merkezlerini, ana sahne ayarlarını ve dosya içi notları hazırlar.
blender -b sato.blend --python finish_scene.py -- --no-preview

# Film kareleri: var olan PNG'leri atlayarak devam eder.
blender -b sato.blend --python render_film.py -- 1 574 3

# Özgün müziği üretir ve son filmi birleştirir.
python3 make_audio.py
python3 encode_film.py

# Yüksek çözünürlüklü ek görseller.
blender -b sato.blend --python render_stills.py
```

Python ses üretimi NumPy, video birleştirme FFmpeg gerektirir. Model oluşturma yalnız Blender'ın yerleşik Python API'sini kullanır.

CPU render süresini yönetmek için filmdeki özgün kamera uçuşları **8 fps** olarak örneklenir; her plan kendi içinde hareket kestirimiyle **24 fps**'ye tamamlanır. Plan kesmelerinin üzerinden ara kare üretilmez. Blender dosyasında tam 24 fps kamera animasyonu vardır; istenirse render betiğinin son parametresi `1` yapılarak her kare yerel olarak render edilebilir. Bu durumda `python3 encode_film.py 1` komutu 24 fps kaynak kareleri kullanır.

Bu oturumda NVIDIA aygıtı Blender'a açılmadığından teslim için CPU uyumlu ayarlar kullanıldı. OptiX çalışan bir kurulumda Preferences → System üzerinden aygıtı etkinleştirip Cycles → Device → GPU Compute seçebilirsiniz.

## Kaynaklar ve yardımcı dosyalar

Geometri, malzemeler, armalar ve müzik bu iş için özgün olarak üretildi. Müzik; sentezlenmiş düşük yaylı benzeri tonlar, çan motifi ve deniz/rüzgâr dokusundan oluşur. Üçüncü taraf kayıt veya görsel kullanılmadı.

- `build_castle.py`, `finish_scene.py`: sahne üretimi ve düzenleme.
- `render_film.py`, `encode_film.py`: devam edebilir render ve kurgu.
- `render_stills.py`: ek görseller.
- `make_audio.py`, `assets/tidal_score.wav`: özgün ses kaynağı.
- `previews/`: kadraj, ışık ve son çıktı kontrol kareleri.
- `renders/`: filme ait kaynak kareler ve ara kurgu dosyaları.

Sahne değiştiğinde eski `renders/frame_*.png` karelerini ayrı bir klasöre taşıyın; aksi halde devam edebilir render betiği onları yeniden üretmez.

## Son kontrol

Blender sahnesi yeniden açılarak geometri, 5 kamera, 3 kamera kesmesi ve eksik dosya kontrol edildi. Harici görüntü bağımlılığı yok. 192 kaynak PNG'nin bütünlüğü doğrulandı. Son MP4 **576 kare / 24,000 saniye / 24 fps** olarak denetlendi; video ve ses akışları hatasız çözümlendi. Yerel sunum sayfası ve videonun 12. saniyesi Chromium'da açılarak ekran görüntüleri alındı. Kontrol kayıtları `previews/scene_audit.json`, `previews/video_audit.json`, `previews/film_contact.png` ve `previews/browser_playback.png` dosyalarındadır.
