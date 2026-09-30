# Hafıza OS — Aynı yerde

**Teslim: [tanitim.mp4](tanitim.mp4)**

56 saniyelik Türkçe lansman filmi. **1920 × 1080, 30 fps**, H.264 / AAC stereo 48 kHz, 7,4 MiB. İnternette hızlı başlaması için MP4 başlığı dosyanın başındadır (fast start).

## Yaratıcı yaklaşım

“Ajanlar değişsin, hafızan aynı yerde kalsın.” vaadini altı sahnede anlatan, büyük tipografili bir film: tekrar anlatma problemi → kişisel Markdown kasası → ortak kasaya yönlenen ajanlar → kaynak ve sürüm denetimi → kaldığın yerden devam → depo çağrısı.

Kömür siyahı, sıcak kâğıt ve sarı; hareketli notlar, katmanlı sayfalar ve çizilen bağlantılar. 120 BPM özgün elektronik müzik ve geçiş sesleri bu iş için sentezlendi. Konuşma yok; bütün anlatım sessizde de okunabiliyor.

Ürün özellikleri yalnız verilen depodaki README.md, BILGI-AGI.md ve CODEX.md belgelerine dayanır. Kaynak eşlemesi [film/SOURCES.md](film/SOURCES.md) içindedir. Girdi deposu değiştirilmedi. Kişisel hafıza kasasına erişilmedi, ürün kurulmadı.

## Dosyalar

| Dosya / klasör | İçerik |
|---|---|
| `tanitim.mp4` | Yayına hazır nihai film |
| `izleme.html` | Videoyu tarayıcıda izlemek için yerel oynatıcı |
| `kapak.jpg` | 1920 × 1080 poster karesi |
| `film/index.html` | Düzenlenebilir HyperFrames ana kompozisyonu |
| `film/compositions/s1.html` … `s6.html` | Altı sahnenin HTML, CSS ve GSAP animasyonları |
| `film/assets/` | Yerel fontlar, font lisansları, GSAP ve özgün müzik |
| `film/BRIEF.md`, `design.md`, `STORYBOARD.md` | Yaratıcı brief, tasarım ve zaman akışı |
| `film/SOURCES.md` | Ürün iddiaları ve varlıkların kaynakları |
| `scripts/build.py` | Görsel kompozisyonu yeniden üreten kod |
| `scripts/score.py` | Müziğin ve efektlerin sentez kodu |
| `scripts/render.sh` | Nihai MP4'ü yeniden render eder |
| `qa/` | Tarayıcı kareleri, kodlanmış MP4 kareleri, kontroller ve render raporu |

## Nasıl açılır?

`tanitim.mp4` dosyasını VLC, mpv veya herhangi bir güncel video oynatıcıyla açın. Alternatif olarak `izleme.html` dosyasını Chromium'a sürükleyin; MP4 ve poster aynı klasörde kalmalı.

Düzenleme ve zaman çizelgesi için:

```bash
cd film
npm run dev
```

Node.js 22+ ve internet, HyperFrames CLI'nin ilk çalıştırılmasında gerekir. Görsel ve ses varlıkları yereldir.

Mevcut kaynakları yeniden render etmek için çalışma klasöründe:

```bash
bash scripts/render.sh
```

Bu komut mevcut `tanitim.mp4` dosyasını yeniler. Chromium ve FFmpeg gereklidir. Bu ortamda NVIDIA sürücüsüne erişilemediğinden teslim yazılım yakalama ile üretildi; aynı güvenilir yol render betiğinin varsayılanıdır.

Sahneleri üretici koddan yeniden kurmak isterseniz `python3 scripts/build.py` çalıştırın. Bu, sahne HTML dosyalarına elle yaptığınız değişikliklerin üzerine yazar. Müzik dosyası teslimde hazırdır; sentezi yeniden üretmek için Python NumPy ve FFmpeg gerekir.

## Doğrulama

- HyperFrames lint, runtime, layout ve kontrast: **0 hata, 0 uyarı, 0 bilgi bulgusu**. `qa/check-final.json`.
- Altı sahnenin tarayıcı kareleri ve nihai MP4'ten çıkarılmış kareler gözle incelendi. `qa/encoded/contact.jpg`.
- Hareket haritası çıkarıldı ve incelendi: 64 tween; bilinçli maskeleme/sayfa katmanları ve yavaş bekleme hareketleri değerlendirildi. `qa/motion/`.
- MP4 Chromium'da açıldı, oynatıldı ve 33. saniyeye gidilerek görüntüsü alındı: 1920 × 1080, 56 s, medya/JavaScript hatası yok. `qa/browser-playback.json`.
- 1.680 kare; video ve ses süreleri tam 56 saniye. Baştan sona FFmpeg decode hatası ve siyah boş kare aralığı yok.
- Nihai AAC ses: −15,7 LUFS, −1,4 dBTP. Başlangıç ve bitişte kontrollü ses zarfı.
