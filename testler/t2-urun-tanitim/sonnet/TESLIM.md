# Hafıza OS — tanıtım videosu

**Teslim:** `tanitim.mp4` — 1920×1080, 30 fps, 66 sn, H.264 + AAC (~65 MB).

## Ne yaptım
Türkçe seslendirmeli, ürünün kendi sesiyle ("Ajanlar değişsin, hafızan aynı yerde kalsın.") 10 sahnelik bir lansman videosu:

1. **Kanca:** her yeni sohbette aynı cümlenin baştan yazılması (Claude Code / Codex / Antigravity sekmeleri).
2. **Sorun:** ajan değişince bağlamın dağılması.
3. **Ürün adı ve slogan.**
4. **Kasa:** README'deki gerçek klasör yapısı (agents.md, zihin/, komuta/, projeler/, günlük/, gelen-kutusu/, araclar/, arşiv/) ve "tercihlerin, kararların, işlerin, kaynakların".
5. **Ajanlar:** README tablosundaki üç istemci ve yönerge hedefleri (`~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`, `~/.gemini/GEMINI.md`) tek kasaya bağlanır; diğer ajanlara yalnız yönerge aktarımı.
6. **Kaynaklı hatırlama:** kaynak yolu + sürüm, eski bilgi güncel karar sayılmaz. Bu sahne "örnek senaryo" olarak etiketlidir; içerik uydurma örnektir, kullanıcı mesajı README'deki günlük kullanım örneğidir, komut `hafiza.py context …` README'den.
7. **İnceleme akışı:** ajan doğrudan kayda yazmaz → kaynaklı aday → inceleme → katalog (SISTEM.md şeması); kaynak / öneri / kullanıcı kararı / doğrulanmış sonuç ayrımı (agents.md).
8. **Kurulum:** README'deki tek komut ve "ajanına yapıştır" yolu; Mem0/Jev isteğe bağlı.
9. **Güvence:** MIT, 2026.09.19.1 sürümünde 360 testlik paket Linux/macOS/Windows'ta başarılı, "işletim sistemine özgü bir test diğer platformda atlanır" notu ve README'nin "Dürüst sınır" cümlesi (kurulum, tüm sohbetleri otomatik hatırlama garantisi değildir).
10. **Kapanış:** `github.com/fornhere/hafiza-os`.

Yalnızca depoda yazan iddialar kullanıldı; rakam/özellik eklenmedi.

## Görsel ve ses dili
Sıcak siyah zemin, kâğıt beyazı yazı, tek vurgu rengi kehribar; başlıklarda Instrument Serif, kod/dosya yollarında JetBrains Mono, arayüzde Inter. Yazma efektleri, çizilen bağlantılar, geri sayım, sahneler arası yumuşak geçiş, alt yazı ve ilerleme çizgisi.
Ses: edge-tts `tr-TR-AhmetNeural` seslendirme (Whisper ile kontrol edildi: metinle uyumlu), numpy ile sentezlenmiş müzik yatağı (pad, arp, sub, çan) ve UI efektleri; seslendirme üstünde otomatik ducking, −16 LUFS.

## Dosyalar
- `tanitim.mp4` — teslim edilen video.
- `proje/` — HyperFrames kaynak projesi. `index.html` üretilmiş dosyadır; kaynaklar `src/` (style.css, body.html, main.js), `build.py` ile birleştirilir.
- `work/` — `tts.py` (seslendirme), `timing.py` (sahne/altyazı zamanları → `cues.json`), `audio.py` + `mix.sh` (müzik, efekt, miks), `fonts/`, `audio/`.

## Yeniden üretmek
```
cd work && python3 timing.py            # cues.json
cd ../proje && python3 build.py         # index.html
npx hyperframes@0.8.91 render --output renders/silent.mp4 --quality delivery
# ses: work/audio.py + mix.sh (numpy, scipy, edge-tts gerekir) → work/audio/mix.wav
ffmpeg -i renders/silent.mp4 -i ../work/audio/mix.wav -map 0:v -map 1:a -c:v libx264 -crf 17 -pix_fmt yuv420p -c:a aac -b:a 256k tanitim.mp4
```
Önizleme: `cd proje && npx hyperframes preview`.

## Notlar
- Ses kalitesini kulakla değil, transkripsiyon ve seviye ölçümüyle doğruladım.
- `hyperframes check` 0 hata verir; kalan 11 uyarı Studio zaman çizelgesi düzeni (alt kompozisyon önerisi) ile ilgilidir, çıktıyı etkilemez.
