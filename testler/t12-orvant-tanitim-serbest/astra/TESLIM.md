# Orvant — Operatörün ötesi

**Ana teslim: `tanitim.mp4`**

52 saniyelik, 1920×1080 çözünürlükte, 60 fps motion graphics tanıtım filmi. Türkçe kinetik tipografi, hareketli üç boyutlu geometrik çekirdek, görev akışı, bağımsız doğrulama kapısı, ritmik geçişler ve bu film için sentezlenmiş stereo elektronik müzik/efektler içerir. Seslendirme yoktur; anlatı ekrandaki metinlerle ilerler.

## İzleme

`tanitim.mp4` dosyasını VLC, mpv veya herhangi bir güncel video oynatıcıyla açın. Video H.264, ses AAC stereo olarak hazırlanmıştır.

Tarayıcıda düzenlenebilir kaynağı izlemek için `film/player.html` dosyasını Chromium'da açıp **Filmi oynat** düğmesine basın. Alternatif:

```bash
python3 -m http.server 8765 --directory film
```

Ardından `http://localhost:8765/player.html` adresini açın. Yazı tipleri ve tüm çalışma varlıkları yereldir.

## Dosyalar

- `tanitim.mp4` — bitmiş video.
- `orvant-kaynak.zip` — düzenlenebilir kaynakların taşınabilir arşivi; MP4 ayrıca teslim edilir.
- `film/index.html` — ana HyperFrames kompozisyonu.
- `film/compositions/s1.html` … `s6.html` — altı sahnenin düzenlenebilir kaynakları.
- `film/player.html` — bağımsız tarayıcı önizlemesi.
- `film/assets/` — çizim kodu, yazı tipleri, GSAP ve özgün ses tasarımı.
- `film/assets/licenses/` — kullanılan yazı tiplerinin lisansları.
- `film/BRIEF.md`, `design.md`, `STORYBOARD.md` — yaratıcı kararlar ve sahne planı.
- `scripts/build.py` — HTML, animasyon ve yerel oynatıcı kaynaklarını yeniden üretir.
- `scripts/score.py` — müzik/efektleri yeniden sentezler; NumPy gerektirir.
- `yeniden-render.sh` — aynı ayarlarla MP4 üretir; Node.js, FFmpeg ve Chromium gerekir.
- `qa/` — tarayıcı kareleri, HyperFrames kontrolleri ve render kayıtları.

## Kurgu

| Zaman | Bölüm |
|---|---|
| 00:00–00:07 | Ajanlar çalışıyor; operatör yükü insanda. |
| 00:07–00:13 | Orvant'ın marka açılışı ve amacı. |
| 00:13–00:23 | S1 Karşılama → S2 Mimar → S3 Yürütücü. |
| 00:23–00:32 | Kanıtsız “bitti” yok; bağımsız kabul kapısı. |
| 00:32–00:43 | S4–S6 hedefleri ve operatör payı ölçüsü. |
| 00:43–00:52 | İlk gerçek proje ve marka kapanışı. |

## Kaynağa bağlılık

Ürün anlatısı yalnız verilen `URUN.md` belgesine dayanır. S1–S3 çalışan aşamalar; S4–S6 gelecek hedefleri olarak açıkça gösterilmiştir. Performans yüzdesi, süre kazancı veya ürünün tamamlandığı iddiası eklenmemiştir. Akışlar kavramsal anlatımdır; gerçek ürün arayüzü olarak sunulmaz.

## Yeniden render

Çalışma klasöründe:

```bash
./yeniden-render.sh
```

Kaynağı değiştirirken doğrudan sahne HTML'lerini düzenleyebilirsiniz. `python3 scripts/build.py` çalıştırmak sahne HTML'lerini betikteki tasarımdan yeniden oluşturur; doğrudan HTML düzenlemelerinin üstüne yazar.

HyperFrames sürümü: **0.8.91**. Son görsel kaynak kontrolü çalışma zamanı, yerleşim ve lint hatası vermedi. Geçiş anlarındaki kaplama/kontrast uyarıları, sahneyi bilerek örten hareketli panellerden kaynaklanır.

## Son MP4 doğrulaması

FFprobe: 1920×1080, 60/1 fps, 52.000 saniye; H.264/yuv420p ve 48 kHz stereo AAC. Dosya boyutu 28.401.059 bayt. Final MP4 içinden altı sahnenin kareleri çıkarılıp incelendi (`qa/final-contact.jpg`). Ölçülen ses seviyesi −14,64 LUFS, true peak −1,07 dBTP.

MP4 ayrıca Chromium’da baştan sona oynatıldı: 52 saniye sonunda `ended=true`, medya hatası yok, bozuk kare yok. Tam FFmpeg çözümleme kontrolü de hatasız tamamlandı. Tarayıcı raporu: `qa/browser-playback.json`.
