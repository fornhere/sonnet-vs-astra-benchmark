# Teslim — “Bitti” demek yetmez

**Paylaşılacak dosya: `short.mp4`**

40,70 saniye · 1080 × 1920 · 9:16 · 30 fps · H.264 / yuv420p · AAC, 48 kHz.
Türkçe altyazılar görüntüye gömülüdür; yüklerken ayrıca altyazı eklemek gerekmez.

## Ne yaptım?

29 dakikalık ham kaydı taradım. Tek başına anlaşılabilen bir fikri seçtim: **ajanın “bitti” demesi, çıktının kullanılabilir olduğuna karar vermek için yeterli değil.** Anlatı, beklentiyi baştan tanımlamadan kontrolün izini tutmaya; oradan “beğenmedim” yerine karşılanmayan koşulu söylemeye ilerliyor.

- Orijinal konuşmayı kullandım; sentetik ses ya da yeni konuşma eklemedim.
- Tekrar çekimleri ve uzun beklemeleri çıkardım. Konuşmayı hızlandırmadım.
- Yatay sunumu dikey ekrana yeniden düzenledim. Kaydın kendi maskotunu, koyu zeminini ve sarı vurgularını korudum; gerçek sunum kartlarını yakın planda gösterdim.
- 27 kısa altyazı grubu ve konuşmayla ilerleyen kelime vurguları hazırladım. Otomatik transkriptteki “çıktığı” ifadesini bağlama uygun “çıktıyı”, “hala” yazımını “hâlâ” olarak düzelttim.
- Az sayıda, yerel olarak sentezlenmiş geçiş/vurgu sesi kullandım. Müzik veya haricî konuşma eklemedim.
- Ses seviyesini iki geçişli loudness işlemiyle düzenledim. Video bu aşamada yeniden kodlanmadı.

Ham dosya yalnızca okundu; değiştirilmedi.

## Dosyalar

| Dosya | İşlev |
|---|---|
| `short.mp4` | Nihai paylaşım videosu |
| `preview.html` | Yerel tarayıcı oynatıcısı |
| `short.srt` | Ayrı, düzenlenebilir Türkçe altyazılar |
| `edit.tsrct` | Tesseract 0.2.0 projesi; görüntü, ses, fontlar ve katmanlar paketli |
| `edit-map.json` | Ham kayıttaki seçimler ve final zamanlarına eşlemeleri |
| `captions.words.json` | Kelime düzeyinde zamanlama |
| `build_edit.py` | Tasarım, kurgu, altyazı ve hareket katmanlarını yeniden kuran kaynak |
| `render.sh`, `master_audio.py` | Render ve ses sonlandırma komutları |
| `assets/` | Kaynaktan çıkarılmış parçalar, fontlar/lisanslar ve ses vurguları |
| `previews/` | Kaynak taraması, dalga biçimleri ve görsel kontrol kareleri |
| `work/` | Transkriptler, teknik ölçümler ve üretim kayıtları |

## Nasıl açılır?

`short.mp4` dosyasını herhangi bir video oynatıcıda açın. Tarayıcı için `preview.html` dosyasını açabilir veya bu klasörde aşağıdaki komutu çalıştırabilirsiniz:

```bash
python3 serve.py
```

Ardından `http://127.0.0.1:8767/preview.html` adresini açın. Sunucu, videoda ileri/geri sarma için byte-range isteklerini destekler.

Bu makinede düzenlenebilir projeyi yeniden render etmek için:

```bash
./render.sh
```

Komut, paketlenmiş `edit.tsrct` projesinden çalışır; ham kayda ihtiyaç duymaz. Kurgu/tasarım değişiklikleri için `build_edit.py` kullanılır; Python ortamında Pillow gerekir. Tesseract 0.2.0, FFmpeg ve Chromium'un SwiftShader Vulkan sürücüsüyle üretildi. Bu oturumda NVIDIA sürücüsüne erişilemediği için render yazılımsal sürücüyle alındı.

## Kaynak seçimleri

| Ham kayıt | Amaç |
|---|---|
| 16:29.700–16:33.233 | Tamamlanmayı bir dayanağa bağlamak |
| 16:43.400–16:54.033 | Beklenen sonucu ve inceleme ölçütünü tanımlamak |
| 17:21.930–17:27.363 | Çıktıyı incelemek, kontrol kaydını bağlamak |
| 17:34.300–17:40.800 | Dosya, girdi ve kontrolün izini tutmak |
| 21:59.250–22:11.050 | Kullanım kararı ve somut geri bildirim |

İlk iki konuşma parçası arasına yaklaşık 167 ms nefes payı eklendi. Açılıştaki maskot, kaydın 17:38 karesinden alınmıştır; diğer kaynak görüntüler ilgili konuşma kesitlerindendir.

## Kontrol

- Nihai MP4'ün çözünürlük, süre, kare hızı ve ses/video codec bilgileri `work/final-probe.json` içinde.
- Kodlanmış sesin ölçümü `work/loudness-final.json` içinde: yaklaşık **−15,04 LUFS**, **−1,36 dBTP**.
- MP4'ün 1221 karesi FFmpeg ile hatasız çözüldü; siyah boşluk taraması yapıldı.
- Kompozisyon kareleri, açılış/çıkış ve uzun altyazılar görsel olarak incelendi. Chromium'da video açıldı; telefon genişliğinde ekran görüntüleri kontrol edildi.
- Konuşma kesimleri kelime zamanları, dalga biçimleri ve ikinci otomatik transkripsiyonla denetlendi. Bu araç oturumunda sesin doğrudan işitsel dinlemesi desteklenmedi; dinlenmiş gibi raporlanmamıştır.

Fontlar: Google Fonts'tan Anton ve Barlow; OFL lisansları `assets/` içinde. Haricî müzik veya stok görüntü kullanılmadı.
