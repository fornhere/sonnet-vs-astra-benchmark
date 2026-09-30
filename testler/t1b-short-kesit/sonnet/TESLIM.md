# TESLİM — Dikey Shorts/Reels (Astra 3D dünya testi)

**Ana çıktı:** `short.mp4` — 1080×1920, 30 fps, H.264 + AAC, **51,9 sn** (60 sn altında), ≈-14 LUFS, tepe -0,6 dBFS, faststart.
Doğrudan oynatılır / YouTube Shorts, Reels, TikTok'a yüklenir.

## Ne yaptım
102 sn'lik yatay (2560×1440) kesitten, konuşmayı transkripte çevirip (faster-whisper large-v3, GPU) en güçlü anları seçtim ve bir hikâye yayına çevirdim:

1. **Kanca (0–2,3 sn):** konuşmacının "Bunların hepsini tek promptta oluşturdu" cümlesi + üç hızlı kesmelik montaj (ışık hüzmeli dünya → çöken köprü → domino/kıvılcım tahtası). Dev "TEK PROMPT" başlığı, flaş kesmeleri, açılış darbesi.
2. **Test 1 – Taş Viyadük:** köprü yıkımı ("Ooo taşlar bak nasıl uçtu"). Geniş sahne olduğu için bulanık dolgulu pencere düzeni kullanıldı ki yıkım kaybolmasın.
3. **Test 2 – Öteki Yarı:** sinematik tur, "kodla yapılması inanılmaz", Claude modellerinin 3B'de zayıflığı; Fable / Opus 5 rozetleri "kötüler" denince üstü çizilir, "Astra'ya göre" ile **ASTRA** parıltılı açılır.
4. **Test 3 – Kritik Kütle:** domino zinciri ve kütle hesaplı süperkritik tahta; "Hayal gücü gerçekten çok yüksek" ile kapanış (sonda yumuşak fade).

Atılanlar: yavaş/tekrarlı yerler, sessiz boşluklar, "Anthropic..." spekülasyon kısmı ve deprem sahnesi (kısa sürede etkisi zayıf).

## Teknik kararlar
- 16:9 → 9:16 kırpma her sahne için ayrı kamera yolu (yumuşak pan + yavaş zoom + kesmede hafif vuruş); sinematik sahnelerde siyah letterbox bantları kırpıldı.
- Kelime kelime altyazı (Archivo Black, aktif kelime amber, vurgulu kelimeler camgöbeği), güvenli bölgede (alt UI'ın üstünde). Whisper'ın "cloud" çıktısını "Claude" olarak düzelttim.
- Üst rozetler (TEST 1/3…), "</> KODLA YAPILDI" rozeti, üst ilerleme çubuğu, alt/üst hafif karartma gradyanı.
- Ses: orijinal konuşma+oyun sesi kesme noktalarında 18 ms fade ile birleştirildi; üzerine numpy ile sentezlenmiş whoosh, darbe, tık ve "ASTRA" parıltısı eklendi; loudnorm + limiter. Video karesi ve ses/altyazı kare-hassas hizalıdır (her parça tam kare sayısına sabitlendi).
- Kaynak dosyada yalnız okuma yapıldı; `girdi/` değiştirilmedi.

## Dosyalar
- `short.mp4` — teslim.
- `kaynak/` — üretim betikleri: `plan.py` (kurgu planı), `render_video.py` (kırpma/kamera), `build_ass.py` (altyazı+grafik → ASS), `build_audio.py` (ses).
- `work/` — ara dosyalar (transkript `kesit.txt/.json/.srt`, `overlay.ass`, `mix.wav`, `base.mp4`, fontlar).

## Yeniden üretim
```
cd work
python3 render_video.py                       # base.mp4
.venv/bin/python build_ass.py                 # overlay.ass (.venv: numpy scipy pillow)
.venv/bin/python build_audio.py               # mix.wav
ffmpeg -i base.mp4 -i grad.png -i mix.wav -filter_complex "[0:v][1:v]overlay=0:0,ass=overlay.ass:fontsdir=fc,fade=t=out:st=51.3:d=0.55[v];[2:a]volume=-2dB,alimiter=limit=0.85[a]" -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -movflags +faststart -t 51.8667 ../short.mp4
```
