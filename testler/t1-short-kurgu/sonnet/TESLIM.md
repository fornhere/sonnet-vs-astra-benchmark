# TESLİM — Sonnet 5.5 / t1-short-kurgu

**Çıktı:** `short.mp4` — 1080×1920, 30 fps, H.264 + AAC, **46,8 sn**, ≈ −15 LUFS. Doğrudan Shorts/Reels'e yüklenebilir.

## Ne yaptım
- 29 dakikalık kaydı yerel Whisper large-v3 ile yazıya döktüm. Kayıt bir sunumun (slayt 11/14) canlı anlatımı. Aynı cümle birçok kez çekilmiş ve aralarda uzun sessizlikler var.
- Seçtiğim an: **"Ajan 'bitti' dedi, peki gerçekten bitti mi?"** bölümü (ham kayıtta ≈ 15:58–22:10). Bu anlatı en net "iddia → kanıt → sonuç" akışına sahip.
- Kaydın bu kısmından **yedi temiz take** seçtim (her cümlenin son/en temiz çekimi). Kesim noktalarını ses enerjisi ve kelime zamanlarıyla belirledim. Video ve ses aynı aralıklardan kesildi, birbirinden kopmuyor. Kaynak: 958.55–961.22, 989.68–993.40, 1003.40–1013.90, 1041.95–1047.35, 1054.35–1060.75, 1118.55–1126.65, 1323.30–1330.80 sn.
- **Kanca (0–2,7 sn):** İlk karede mascot + "AJAN "BİTTİ" DEDİ. GERÇEKTEN BİTTİ Mİ?" tam boy görünüyor. Mascotun yarı kapalı, şüpheci gözü mesajı taşıyor. Sohbet balonu ve soru işaretleri var. Konuşma hemen "ajan bitti diyebiliyor" ile başlıyor.
- **Dikey kompozisyon:** 16:9 sunum karesi dikey formata sığmıyor. Slayttaki başlığı, kart alanını ve mascotu ayrı katmanlar olarak kırpıp yeniden yerleştirdim. Kartlar kaynak videodan canlı geliyor (Beklenen → İncelenen → Ayrı değerlendirme). Henüz açılmamış kartların yerinde kesik çizgili boş yuvalar duruyor. Üçüncü kart açılışını ayrıca animasyonla verdim. Her kesimde hafif punch-in ve yavaş zoom var.
- **Altyazı:** Kelime kelime, konuşmayla senkron beliren büyük altyazı. Anahtar kelimeler (bitti, dayanağa, kayıt, sürüm, beğenmedim, koşul…) lime vurgulu. Whisper'ın "çıktığı" gibi hatalarını düzelttim ("çıktıyı"). Altyazı Shorts arayüzünün üstünde, güvenli alanda.
- **Kicker etiketleri:** Mascotun yanında her bölüm için kısa etiket ("1 · Beklenen sonuç", "2 · Kontrol kaydı", "Sürüm değişti: kontrol geçersiz", "3 · Benim işime yarıyor mu?").
- **Kapanış (44,3–46,8 sn):** "Bitti" demek yetmez. Kanıt iste. — kanalın lime/krem/koyu kimliğiyle.
- **Ses:** Track 0'ı highpass, hafif denoise, EQ, kompresör ve loudness normalizasyonuyla işledim. Altına konuşmaya göre kısılan (sidechain) sentezlenmiş ambiyans pad'i ve kart/geçiş SFX'leri ekledim (hepsi kodla üretildi, telifsiz).
- Görsel kimlik: kaydın kendi paleti (koyu zemin, lime `#E6FA4B`, krem kartlar, Anton başlık fontu) korundu.

## Dosyalar
- `short.mp4` — teslim.
- `TESLIM.md` — bu dosya.
- `work/` — yeniden üretim kaynakları: `sahne.html` (tüm animasyon/altyazı, `setFrame(n,t)` ile deterministik), `render.mjs` (Chromium/puppeteer-core ile kare kare render → ffmpeg), `synth.py` (SFX + pad), `edit.json`/`edit2.json` (kesim listesi), `chunks.json`/`words.json` (altyazı zamanları), `regions.py`/`probe.py`/`words.py` (Whisper yardımcıları), `assets/` (mascot, logo), `fonts/`, transkript (`2026-09-16 21-47-12.txt/.srt/.json`).

## Yeniden üretmek için
Kare dizisi (`work/frames/`) ve ara wav'lar temizlendi; `edit2.json`'daki aralıklarla ham kayıttan yeniden çıkarılır (ffmpeg `crop=1330:890:1040:280,scale=990:662`, 30 fps). Sonra `node render.mjs` (puppeteer-core gerekir) ve ses için `synth.py` + ffmpeg karışımı. Ham kayıt hiç değiştirilmedi.

## Dürüst notlar
- Ham kaydın üç ses izi birbirinin aynısı çıktı; izlerden biri kullanıldı.
- Kayıttaki fare imleci ve nadiren görünen metin imleci kart kırpmasında kalıyor (kaynaktan geliyor).
- Ses miksini kulakla değil ölçümle (LUFS, tepe, spektrum) kontrol ettim; final dinleme yapılmadı.
