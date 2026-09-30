# FORN — Merakın peşinden

Referanstaki nazar boncuğu maskotunun düzenlenebilir 3D yorumu ve sekiz saniyelik kanal açılışı. Karakter havada dönerek gelir, esneyerek yere iner, tek gözüyle kameraya bakar, el sallar ve FORN imzasını sunar. Kobalt seramik yüzey, sıcak beyaz stüdyo, özgün kısa ses tasarımı. Son iki saniye, rahat okunması ve kolay kesilmesi için sabit marka pozudur.

## Ana dosyalar

- **maskot.blend** — Blender 5.2 sahnesi: model, malzemeler, ışıklar, kamera, logo, animasyon ve paketlenmiş ses/referans.
- **animasyon.mp4** — 1280 × 720, 24 fps, 8 saniye; H.264 video ve stereo AAC ses.
- **onizleme.html** — tarayıcıda video oynatıcı ve Blender dosyası bağlantısı.

## Açma ve düzenleme

`maskot.blend` dosyasını Blender 5.2 ile açın. Numpad 0 kamera görünümüne geçirir, Space animasyonu oynatır. Zaman çizelgesi 1–192 kare; dönüş, iniş, selam ve kapanış işaretlenmiştir. Dosya kapanış pozunda açılır.

Sahne koleksiyonları **MASKOT**, **KONTROLLER**, **SAHNE**, **LOGO**, **IŞIK VE KAMERA** olarak ayrılmıştır. `RIG • Ana hareket` tüm karakterin konum/dönüş/esnemesini; el kontrolleri avuçları; `RIG • Bakış` irisi yönetir. `YÜZ • Animasyonlu göz kapağı` üzerindeki **Göz kırp** ve **Merak** shape keyleri ifadeyi değiştirir. Kollar NURBS eğrileridir; logo ayrı metin nesneleridir. Malzemeler adlandırılmıştır. Model nesne ve eğri tabanlı anahtar karelerle canlandırılmıştır.

Karakteri şeffaf arka planla almak için **SAHNE** ve **LOGO** koleksiyonlarını render dışında bırakın, **Render > Film > Transparent** seçeneğini açın ve PNG/RGBA çıktı seçin.

Videoyu doğrudan bir oynatıcıda açabilir veya bu klasörde `python3 kaynak/onizle.py` çalıştırıp `http://localhost:18765/onizleme.html` adresini ziyaret edebilirsiniz.

## Yeniden üretme

```bash
# Mevcut Blender sahnesinden Full HD, yüksek örneklemli render (OPTIX varsa otomatik kullanır):
blender -b maskot.blend --python kaynak/render.py -- 64 1920

# PNG karelerini sesle MP4'e birleştir:
bash kaynak/videoyu-birlestir.sh
```

`kaynak/uret.py` sahneyi baştan kuran kaynak betiktir; çalıştırılması mevcut maskot.blend dosyasını yeniden üretir. `kaynak/ses.py` dış ses kütüphanesi kullanmadan ses tasarımını sentezler; bu yardımcı betik Python ve NumPy kullanır. `kaynak/karakter-sayfasi.png` verilen referansın yerel kopyasıdır. `kareler/` render dizisini, `onizleme/` görsel kontrol karelerini ve işlem günlüklerini içerir.

## Doğrulama

MP4: 192 kare, 24 fps, tam 8 saniye; 1280×720 H.264 ve 48 kHz stereo AAC. Dosyanın tamamı FFmpeg ile hatasız çözüldü. Açılış, dönüş, selam, yazı gelişi ve kapanış kareleri görsel olarak kontrol edildi. Blender dosyası yeniden açıldı; referans, yazı tipi ve sesin paketli olduğu doğrulandı.
Video Chromium’da açıldı ve altıncı saniyeye ileri sarılarak kapanış görüntüsü doğrulandı.
