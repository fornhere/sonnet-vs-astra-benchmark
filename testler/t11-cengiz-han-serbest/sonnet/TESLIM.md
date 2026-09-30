# Cengiz Han Atlı Heykeli (Tsonjin Boldog) — Three.js sinematik deneyim

## Açmak
`index.html` dosyasını Chromium/Chrome/Edge/Firefox'ta çift tıklayarak açın. Sunucu, internet ya da kurulum gerekmez
(three.js ve tüm veri `app.js` içine gömülü; `file://` ile çalışır). WebGL2 gerekir. Ses için "Yolculuğu Başlat" tıklaması gerekir; `F` tam ekran, `Boşluk` duraklat.

## Ne var
- **Heykel**: 40 m'lik atlı Cengiz Han, tamamen prosedürel. Bir SDF (mesafe alanı) ile at + süvari + yüz/şapka/sakal modellenip
  surface-nets ile örgüye çevrildi (`_build/bake`), gzip+base64 olarak `app.js`'e gömüldü. Paslanmaz çelik malzeme: PBR + panel dikişleri, gökyüzünden üretilen ortam yansıması.
  Altın kamçı, dizgin. Kaide: 36 sütunlu bina, cam duvar, çatı terası, bayraklar, ışıklı sütunlar.
- **Dünya**: bozkır (rüzgârda salınan, kameraya göre kayan ~420 bin ot yaprağı), Hentii dağları, Tuul nehri, yol + araç konvoyu, gerler, at sürüleri (aynı SDF'ten pişirilmiş),
  yürüyen ziyaretçiler, kartallar, ışıkta uçuşan toz.
- **Gökyüzü / gün döngüsü**: gerçek zamanlı gökyüzü shader'ı (şafak, gündüz, gün batımı, gece; bulut, yıldız, samanyolu, ay), gölgeler, sis, gece aydınlatması.
- **Sinematik tur (~116 sn)**: 6 bölüm — Bozkır, Ölçek, Doğuya Bakış, Altın Kamçı, Seyir Terası, Gün Batımı. Kamera yolu, saat ve altyazılar senkron. Zaman çizelgesinden bölüme atlanabilir.
- **Serbest keşif**: fare ile döndür/yakınlaş, hazır bakış noktaları (yüz, kamçı, sütunlar, at başı, profil), gün saati kaydırıcısı.
- Post-process: bloom, ışık huzmeleri, renk derecelendirme, vinyet, grain. Prosedürel ses (rüzgâr, gırtlak/overtone drone, morin khuur tarzı frazlar, cırcır böcekleri). TR/EN dil düğmesi. Otomatik çözünürlük ayarı (1080p'de 60 fps ölçüldü, RTX 5060).

## Dosyalar
- `index.html` — arayüz + stiller; `app.js` — derlenmiş uygulama (three.js + heykel verisi dahil).
- `_build/` — kaynak: `src/` (main, sky, terrain, monument, world, tour, post, audio, i18n), `bake/` (SDF heykel + pişirme), test betikleri.
  Yeniden derlemek için: `cd _build && npm i three esbuild puppeteer-core && node bake/bake.mjs && sh build.sh`.

## Notlar
Heykelin oranları/ayrıntıları yorumdur (SDF ile stilize); yön doğuya (+x), tüm kararlar yaratıcıdır.
Hata ayıklama: `index.html?t=45` (tur zamanı), `?view=face&hour=9`.
