# Orvant — tanıtım videosu (TESLIM)

**Ana çıktı:** `tanitim.mp4` — 1920×1080, 60 fps, 72 sn, H.264 + AAC (~71 MB, -16 LUFS).

## Ne yaptım
HyperFrames (HTML + GSAP, tek duraklatılmış zaman çizelgesi) ile After Effects tarzı, tamamen kodla üretilmiş bir motion graphics filmi.
Bütün metinler `URUN.md`'ye dayanır; özellik uydurulmadı (S1–S3 "çalışıyor", S4–S6 "hedef" olarak gösterildi; operatör payı çubuğu "ŞEMATİK" etiketli, sayı yok; örnek istek/görev adları yalnızca örnek).

Akış (72 sn, 120 BPM ızgarasına oturur):
1. 0–8 sn — **Acı:** operatörün döngüsü (iş tanımı yaz / model seç / doğrula / teşhis et), üstü çizilir → "Ya operatör, sistemin kendisi olsa?"
2. 8–16 — **Logo:** halka + yörüngedeki ajan noktası, "Orvant" wordmark, "Kodlama ajanlarının operatörü."
3. 16–26 — **S1 Karşılama:** yazılan tek cümle → karar haritası + sorular → onaylı sözleşme (mühür).
4. 26–34 — **S2 Mimar:** sözleşmeden görev grafiği (3B eğimli) + varsayılan kapalı yetki istekleri (2 onay, 1 kapalı kalır).
5. 34–48 — **S3 Yürütücü:** Claude/Codex → bağımsız kapı; "tamamlandı" iddiası reddedilir, düzeltilir, kabul edilir, birleşir; canlı olay günlüğü.
6. 48–54 — **Dört ilke** (kapı, yetki, kanıtlı yöntem, dürüst değerlendirme).
7. 54–62 — **Yol haritası S1–S6** + "operatör payı" çubuğu.
8. 62–72 — **İlk gerçek proje** (kurgu uygulaması zaman çizelgesi), "Uygulama geliştikçe Orvant da gelişir", final logo + durum ("geliştirme aşamasında").

Ses: `audio/synth.py` (numpy) ile prosedürel müzik + senkron ses efektleri (tıklama, kapı taraması, kabul/red, mühür, geçiş whoosh'ları). Sahne zamanlarıyla eşleşir. Not: sesi işitsel olarak dinleyemedim; yalnızca seviye/spektrum ile doğruladım.

## Dosyalar
- `tanitim.mp4` — teslim çıktısı
- `orvant/index.html` — derlenmiş HyperFrames kompozisyonu (kaynak `orvant/src/` içinden üretilir)
- `orvant/src/` — `cues.json` (sahne zamanları), `base.css`, `s?.html/css`, `j?.js` (sahne başına), `build.py`
- `orvant/audio/synth.py`, `orvant/audio/orvant.wav`
- `orvant/assets/` — yerel fontlar (Instrument Serif, Inter Tight, JetBrains Mono) ve gsap

## Yeniden üretme
```
cd orvant
python3 src/build.py                      # index.html'i derler
npx hyperframes preview                   # tarayıcıda önizleme
python3 audio/synth.py                    # sesi üretir
npx hyperframes render --quality looks --crf 20 --fps 60 -o /home/<kullanıcı>/silent.mp4   # /tmp tmpfs küçük, proje altına yaz
ffmpeg -i silent.mp4 -i audio/orvant.wav -filter_complex "[1:a]loudnorm=I=-16:TP=-1.5,aformat=sample_rates=48000[a]" -map 0:v -map "[a]" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 256k -shortest ../tanitim.mp4
```
