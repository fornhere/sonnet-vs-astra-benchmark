# Teslim: Bir noktanın arkasındaki uzay

GPS'nin nasıl konum bulduğunu anlatan, genel izleyici için hazırlanmış Türkçe eğitici animasyon.

**Ana dosya: `final.mp4`** — 1920×1080, 30 fps, 88 saniye; H.264 video ve stereo AAC ses. Türkçe seslendirme ve görüntüye işlenmiş altyazı, sekiz özgün animasyon sahnesi, özgün müzik ve sinyal efektleri içerir.

## Açma

`final.mp4` dosyasını VLC, mpv veya tarayıcıyla açabilirsiniz. Alternatif olarak `IZLE.html` dosyasını açın. YouTube'a doğrudan yüklenebilir.

## Dosyalar

- `final.mp4`: tamamlanmış video.
- `IZLE.html`: basit yerel video oynatıcısı.
- `kapak.jpg`: 1920×1080 kapak karesi.
- `altyazi.srt`: zaman kodlu Türkçe altyazı; videoda altyazılar zaten görünür.
- `KAYNAKLAR.md`: bilimsel kaynaklar ve kullanılan varlıkların kaynak bilgileri.
- `gps-film/`: düzenlenebilir HyperFrames projesi, ses dosyaları ve yerel fontlar.
- `gps-film/film.js`: özgün çizim ve animasyon kodu.
- `gps-film/script.json`, `timing.json`: anlatım ve kesin sahne zamanları.
- `scripts/`: ses sentezi, zamanlama, görsel kontrol ve kaynak senkronizasyon araçları.
- `qa/`: kare kontrolü, ses ölçümü ve teknik doğrulama kayıtları.

## Yeniden çalıştırma

Çalışma klasöründe:

```bash
python3 scripts/serve.py
```

Tarayıcıda `http://localhost:8124/IZLE.html` adresini açın.

Kaynak projeyi HyperFrames Studio'da açmak için:

```bash
cd gps-film
npm run dev
```

Çizim kodunu değiştirdikten sonra çalışma klasöründe `python3 scripts/sync-html.py` çalıştırın. Bu komut `film.js` değişikliklerini render için `index.html` içine aktarır. Yerel JS dosyasını doğrudan kullanan ilk sürümde render derleyicisinin script yükleme sırası sorunu oluştuğu için çizim kodu HTML içine gömülüdür.

Tekrar render:

```bash
cd gps-film
npm run check
npm run render -- --quality delivery --workers 4 --output ../final.mp4
```

Proje HyperFrames 0.8.86 sürümüne sabitlidir. Render için Node.js, Chromium ve FFmpeg gerekir. Seslendirme dosyaları teslimde hazırdır; tekrar render için ses hizmetine bağlanmak gerekmez.

## Yapılan kontrol

Tarayıcıda sahne kareleri açılıp görsel olarak incelendi. HyperFrames denetimi 12 zaman örneğinde hatasız geçti. Canvas içindeki yazılar otomatik DOM kontrast kontrolünün dışında olduğundan bunların yerleşim ve okunabilirliği ayrıca kare görüntüleri üzerinden incelendi. Ses seviyesi yaklaşık −16 LUFS; yapay ses ayrıca bağımsız konuşma tanıma ile Türkçe olarak kontrol edildi. Son MP4'ün çözünürlüğü, süresi, kare hızı, ses izi ve kod çözümü doğrulandı.

Bilimsel sadeleştirme: çember sahnesi etiketli 2B öğretim modelidir. Gerçek hesapta 3B konum ve alıcı saati hatası birlikte çözülür. Sinyal hareketi ve tüm geometrik çizimler temsilidir.
