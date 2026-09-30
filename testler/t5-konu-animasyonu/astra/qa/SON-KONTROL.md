# Son kontrol

- MP4: H.264, 1920×1080, 30 fps, 2640 kare, 88,000 saniye.
- Ses: AAC stereo; dil etiketi tur.
- Kaynak miks: −15,91 LUFS integrated, −3,06 dBTP; 3,9 LU loudness range.
- FFmpeg tam kod çözümü: hata yok (`decode-errors.txt` boş).
- HyperFrames: 12 zaman örneğinde runtime, layout ve motion hatası yok.
- İlk, orta ve son sahneler MP4'ten çıkarılıp incelendi (`encoded/final-contact.jpg`).
- Sesin tamamı bağımsız Whisper base Türkçe çözümüyle kontrol edildi; 29 parça, son konuşma 87,6 saniyede sona eriyor. ASR metni teslim altyazılarına aktarılmadı; teslim altyazıları üretim metni ve sağlayıcının sözcük zamanlarını kullanır.
- Dünya görseli son render öncesinde açık kaynak Natural Earth kamu malı verisine geçirildi.
- TESLIM.md, KAYNAKLAR.md ve altyazı mevcut.
