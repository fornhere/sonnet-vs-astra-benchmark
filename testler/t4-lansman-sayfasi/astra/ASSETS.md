# Kaynaklar

- **Ürün tasarımı ve 3D model:** Bu proje için kodla oluşturuldu. Dışarıdan model kullanılmadı. Alüminyum gövde, örgü, sürücü, vidalar, üst kontrol, bağlantı noktası ve taban `main.js` içindedir.
- **Ürün PNG'leri:** Aynı 3D sahnenin yerel renderları. WebGL bulunmadığında yedek görünüm olarak kullanılır.
- **Malzeme dokuları:** JavaScript Canvas üzerinde deterministik olarak üretildi.
- **Ses:** Web Audio API ile kullanıcı etkileşimi sonrasında üretilen özgün bir ambient akor. Gerçek bir hoparlör kaydı değildir.
- **İç mekân fotoğrafı:** Unsplash CDN, https://images.unsplash.com/photo-1600210492486-724fe5c67fb0 — `assets/interior.jpg`. Yalnızca yaşam alanı atmosferi için kullanılır.
- **Manrope ve Instrument Serif:** Google Fonts. Yerel font dosyaları kullanılır. SIL Open Font License metinleri `assets/` içindedir.
- **Three.js:** MIT lisansı; metin `vendor/THREE-LICENSE.txt`. Dağıtım, `app.js` içine paketlenmiştir.
- **İkonlar:** Bu proje için hazırlanmış satır içi SVG'ler.

Sayfa açılırken harici CDN, font sunucusu, analiz hizmeti veya API isteği yapılmaz.
