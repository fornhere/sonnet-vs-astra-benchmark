# TESLİM — "Mevsimler neden oluşur?"

**Ana çıktı:** `final.mp4` — 1920×1080, 30 fps, ≈83 sn, Türkçe seslendirmeli eğitici animasyon.

## Konu ve kurgu
Yaygın yanılgıyı yıkıp gerçek sebebi adım adım gösteriyor:

1. **Yanılgı** — "Yazın Dünya Güneş'e daha yakındır" → çizilip "YANLIŞ" damgası.
2. **Gerçek mesafe** — Ocak 147,1 milyon km, Temmuz 152,1 milyon km; fark yalnızca %3 ve kışın Dünya Güneş'e *daha yakın*.
3. **Eğiklik** — dönme ekseni yörünge düzlemine göre 23,5° yatık, eksen Kutup Yıldızı'nı gösteriyor.
4. **Yörünge** — Dünya bir yıl boyunca Güneş'in etrafında dönüyor; 21 Haziran / 21 Aralık, Kuzey–Güney zıtlığı.
5. **İki etki** — ışığın geliş açısı (73° / 27° → birim alana %96 / %45 enerji) ve gün uzunluğu (≈15 / ≈9 saat, 24 saatlik kadranlar).
6. **Sonuç** — eksen dik olsaydı mevsim olmazdı (eksen 23,5° → 0° animasyonu); temmuzda Dünya Güneş'ten en uzakta.

Sayılar: 147,1 / 152,1 milyon km (günberi / günöte), 23,5° eksen eğikliği, gündüz süreleri Ankara enlemi için yaklaşık değerlerdir (ekranda da belirtildi).

## Nasıl yapıldı
- **Görüntü:** HyperFrames (HTML → MP4) projesi. Dünya, hiçbir hazır 3B kütüphane kullanılmadan, **piksel piksel çalışan özel bir küre işleyicisiyle** (`assets/engine.js`) çiziliyor: gerçek kıta maskesi (Natural Earth 50m, `world-atlas`), doğru eksen eğikliği, gerçek gündüz/gece terminatörü, gün batımı halkası, şehir ışıkları, bulut, okyanus yansıması. Mevsimlerdeki aydınlanma (ör. Haziran'da Kuzey Kutbu'nun sürekli aydınlık, Aralık'ta karanlık olması) fiziksel olarak hesaplanıyor, çizim değil.
- **Zamanlama:** tüm tuval çizimi `t` zamanının saf bir fonksiyonu (deterministik); ekran metinleri/diyagramlar GSAP zaman çizelgesinde. Animasyonlar, TTS'in **kelime düzeyi zaman damgalarına** kilitli (`assets/timing.js`).
- **Ses:** `edge-tts` (tr-TR-EmelNeural, +%6 hız) sahne sahne üretildi; üzerine numpy ile sentezlenmiş ambient müzik yatağı (konuşmada otomatik kısılıyor — sidechain), geçiş "whoosh"ları, damga darbesi ve vurgu çanları. Tümü `work/make_audio.py` ile üretilip `ffmpeg` ile karıştırıldı (≈ −15 LUFS).
- **Altyazı:** kelime kelime dolan Türkçe altyazı (erişilebilirlik).

## Dosyalar
| Yol | Ne |
|---|---|
| `final.mp4` | Teslim edilen video (1920×1080) |
| `proje/` | HyperFrames projesi (kaynak) |
| `proje/index.html` | Sahne iskeleti, tipografi, CSS |
| `proje/assets/main.js` | Tüm sahneler, zaman çizelgesi, altyazı |
| `proje/assets/engine.js` | Küre/aydınlatma işleyicisi |
| `proje/assets/timing.js`, `land.js` | Kelime zamanları, kıta maskesi (gömülü) |
| `proje/audio/mix.wav` | Nihai ses karışımı (ses + müzik + efekt) |
| `work/` | Üretim betikleri (`tts.py`, `make_audio.py`) ve ara dosyalar |

## Yeniden üretme / açma
```bash
cd proje
npx hyperframes preview            # tarayıcıda canlı önizleme
npx hyperframes render -o ../final.mp4 -f 30 -q looks   # MP4'e render (~7 dk, GPU)
```
Ses yeniden üretmek için (`work/` içinde, `edge-tts` kurulu venv ile): `python tts.py tr-TR-EmelNeural +6%` → `python make_audio.py` → `mix.wav` için `work/` altındaki ffmpeg karışım komutu (bkz. bu belgenin sonu).

<details><summary>ffmpeg karışım komutu</summary>

```bash
ffmpeg -y -i audio/voice.wav -i audio/music_raw.wav -i audio/sfx.wav -filter_complex "
[0:a]highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=4,asplit=2[v][vsc];
[1:a]lowpass=f=9000,volume=0.2[m0];
[m0][vsc]sidechaincompress=threshold=0.02:ratio=5:attack=20:release=600[md];
[2:a]volume=0.5[s];
[v][md][s]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.95,loudnorm=I=-15:TP=-1.5:LRA=8[o]" \
 -map "[o]" -ar 48000 -ac 2 ../proje/audio/mix.wav
```
</details>

## Doğrulama
- `final.mp4`: H.264 1920×1080 @30 fps, AAC stereo, 83,4 sn (≈ −15 LUFS).
- Ses, yerel Whisper (large-v3) ile geri yazıldı: metin senaryoyla birebir örtüşüyor (yalnızca birkaç Whisper artefaktı).
- Anahtar kareler ekran görüntüsüyle tek tek kontrol edildi (yazı taşması, örtüşme, altyazı bölgesi).
