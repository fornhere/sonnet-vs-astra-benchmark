# Demlik — Demini Al

## Kampanya fikri
Akşamın ince belli hâli. Şehrin hızı karşısında çayın yavaş ritmi: batan güneş ve ince belli bardak tek bir sakin odak oluşturur. Bardağın daralan formu zaman fikrini de çağrıştırır. Renkli bir ürün fotoğrafı yerine çizgisel cam, saydamlık, amber çay ve tabak ayrıntıları kodla çizildi.

Ana mesaj: **Demini Al.**
Destek: **Şehrin acelesi var. Çayın acelesi yok.**
Ürün: **Kadıköy Akşamı — yeni sonbahar harmanı.**
Teklif: **İlk hafta atölyede %20 indirim.**
CTA: **Demini keşfet.** En küçük mobil boyutta **Keşfet**.

İndirim atölyeye aittir; çayın fiyatında indirim ima edilmez. Küçük 320×50 banner'da okunabilirliği korumak için ana mesaj, marka, ürün adı ve CTA bırakıldı. Büyük boyutlarda mağaza ve iletişim bilgileri eklendi. 1080×1920 hikâyede ana mesaj ve CTA, üst ve alt arayüz alanlarından uzak tutuldu.

## Görsel sistem

| Kullanım | Renk |
|---|---|
| Krem / zemin | `#F4ECD9` |
| Koyu çay / yazı, CTA | `#49241F` |
| Kiremit / akşam güneşi | `#CC5835` |
| Amber / çay yansıması | `#EBA456` |
| Cam ışığı | `#FFF8E9` |

- Başlık: sistemde kurulu URW Bookman Demi / Demi Italic.
- Destek metni: sistemde kurulu Nimbus Sans Regular / Bold.
- Reklam dosyalarında tüm yazı vektör path'tir. Font dosyası yüklemesi, lisans sunucusu veya harici font isteği yoktur.
- Wordmark brief'te hazır logo verilmediği için bu set için dizildi; nokta yerine küçük çay yaprağı kullanıldı.
- Güneş: üç ince çember, deterministik nokta dokusu.
- Bardak: SVG Bézier eğrileri, yerel vektör gradyanlar, yansımalar ve el çizimi tabak detayları.
- Sistem font dosyalarının metadata telifi: `(URW)++, Copyright 2014 by (URW)++ Design & Development`. Font yazılımı paket içinde dağıtılmıyor.

## Hareket
0–1,4 sn: güneş açılır, başlık ve bardak yerleşir.
0,95–1,75 sn: yuvarlak teklif mührü görünür (mühür kullanılan boyutlarda).
1,25–1,95 sn: CTA yerleşir.
1,2–13,2 sn: buhar üç yavaş döngü yapar; sonra tüm öğeler son kompozisyonda kalır.

Sonsuz döngü, ses, flaş veya hızlı yanıp sönme yok. `prefers-reduced-motion: reduce` tercihinde doğrudan sabit kompozisyon görünür.
