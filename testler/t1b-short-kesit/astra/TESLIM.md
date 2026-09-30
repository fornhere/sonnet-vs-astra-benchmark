# Bunu kodla yaptı.

**Teslim: `short.mp4` — 35,20 saniye, 1080 × 1920, dikey 9:16.**

Doğrudan YouTube Shorts veya Reels'e yüklenebilir. Altyazılar görüntüye gömülüdür; ayrıca altyazı yüklemek gerekmez.

## Kurgu

İlk kareden itibaren zincirleme tepkime ve “Bunu kodla yaptı.” başlığı. Açılışta videonun sonundaki “Bu testi sen nasıl yaptın abi?” tepkisi öne alındı. Ardından üç örnek birbirini takip ediyor:

| Çıkış zamanı | İçerik |
|---|---|
| 00:00–00:01,79 | Domino finalinden merak uyandıran açılış |
| 00:01,79–00:07,04 | Tek promptla oluşturulan dünya ve sinematik görüntüsü |
| 00:07,04–00:17,00 | Taşları sökme ve köprünün çöküşü |
| 00:17,00–00:32,71 | Küçük dominodan zincirleme tepkimeye ilerleyen fizik testi |
| 00:32,71–00:35,20 | Özgün anlatıcının son değerlendirmesi; “Sence hangisi?” kapanışı |

Kısa parçalar hâlinde, konuşulan kelimeyi yeşille vurgulayan Türkçe altyazı; sahneye göre kayan kadraj; aynı görüntüden yumuşak arka plan; üç bölümlü ilerleme göstergesi. “Tek prompt” başlığı yalnız ilgili dünya bölümünde kullanıldı. Anlatıcının sesi ve kaynak görüntüler korundu; yeni seslendirme, müzik veya yapay konuşma eklenmedi.

## Dosyalar ve açılış

- **`short.mp4`**: Asıl teslim. VLC, mpv, tarayıcı veya telefonla açılabilir.
- `work/preview.html`: Videolu yerel önizleme; tarayıcıda aç.
- `kapak.jpg`: Videodan alınmış dikey açılış karesi.
- `onizleme.jpg`: Son videonun 12 karelik görsel özeti.
- `short.srt`: Ayrı, sade Türkçe altyazı kopyası. MP4 zaten altyazılı olduğu için oynatıcıda ayrıca açmak çift altyazı oluşturabilir.
- `build.py`: Yeniden üretilebilir kurgu ve render betiği.
- `work/plan.json`: Kaynak kesme aralıkları, kadrajlar ve başlıklar.
- `work/timeline.json`: Kaynak zamanlarının çıkış zamanlarıyla eşleşmesi.
- `work/graphics.ass`: Düzenlenebilir başlıklar ve kelime vurguları.
- `work/fonts/`: Barlow yazı tipleri ve OFL lisansı; fontlar sisteme kurulmadan renderda kullanılır.
- `work/`: Transkript, ara renderlar ve kontrol kanıtları.

## Yeniden render

Bu klasörde Python 3 ve FFmpeg (libx264 + libass) ile:

```bash
python3 build.py
```

Kadraj veya kaynak kesme aralıklarını değiştirdikten sonra:

```bash
python3 build.py --rebuild
```

Kaynak konumu `work/plan.json` içindedir. Girdi başka yere taşınırsa yalnız `source` alanını güncelle. Betik kaynak dosyayı değiştirmez; çıktıları bu klasöre yazar. Transkripsiyonun yeniden çalıştırılması gerekmez. Render GPU gerektirmez.

## Kontrol sonuçları

- H.264 High, yuv420p, BT.709, **1080 × 1920, 24 fps / 844 kare**.
- AAC stereo, 48 kHz, 256 kbps. MP4 hızlı web başlangıcı için `faststart` ile kaydedildi.
- Video süresi 35,1667 sn; AAC paketlemesiyle kapsayıcı süresi **35,20 sn**.
- Dosya boyutu yaklaşık **25,0 MB**.
- Son MP4'ün tamamı FFmpeg ile çözüldü: hata yok (`work/decode-check.log`).
- Son kodlanmış ses: **−15,29 LUFS**, **−1,49 dBTP**, 3,5 LU aralık (`work/final-loudness.json`).
- Chromium'da altı farklı zamana atlama ve görüntü çözünürlüğü kontrol edildi; ayrıca video baştan sona 35,20 saniyeye kadar oynatıldı (`work/playback-verification.json`). Kareler `work/browser-*.png`, sonuçlar `work/browser-verification.json` içinde.
- Başlıklar, Türkçe karakterler, altyazı yerleşimi ve son kareler görsel olarak incelendi. İlk sürümdeki altyazı çakışmaları ve koyulaştırma çizgileri düzeltildi.

**Kontrol sınırı:** Bu araç oturumu doğrudan işitsel dinlemeyi desteklemedi. Ses, yerel Türkçe transkript, dalgaformları, zaman eşlemesi ve son dosyanın ses ölçümleriyle kontrol edildi; dinlenmiş gibi değerlendirilmedi.

Tesseract'ın yerel GPU denemesi bu oturumda Vulkan aygıtı bulamadığından nihai video FFmpeg ile üretildi. Kaynak `kesit.mp4` yalnız okundu.
