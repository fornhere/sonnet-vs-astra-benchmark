# Forn — 3D maskot + animasyon

## Teslim edilenler
- `maskot.blend` — Blender 5.2 sahnesi: rig'li Forn karakteri, stüdyo, FORN harfleri, ışıklar, kamera ve tüm animasyon (kare 0–305, 30 fps).
- `animasyon.mp4` — 1920×1080, 30 fps, ~10 sn, sesli (H.264 + AAC). Cycles/OptiX ile render edildi.
- `work/` — üretim kodu (Python) + `char.blend` (yalnız karakter+rig): karakteri, rig'i, ortamı ve animasyonu sıfırdan kuran betikler; yeniden üretim/düzenleme içindir.

## Ne yaptım
Karakter sayfasındaki Forn (parlak kobalt "anahtarlık" disk, tek ağır kapaklı göz, L burun, çizgi ağız, ince hortum kollar/bacaklar, eldiven eller, oval ayakkabılar) Blender'da tamamen prosedürel olarak modellendi:
- Gövde: süper-elips disk + gerçek anahtarlık deliği (bevel'lı). Parlak vinil/cam gibi boya (coat + hafif subsurface).
- Yüz: kabartma plakalar (kaş, kapak, beyaz, iris, göz bebeği, burun, ağız) gövdeye shrinkwrap ile yapışık; kapak/kaş/ağız şekil anahtarlı.
- Kollar/bacaklar/eller: Skin modifier ile tek parça, 5 parmaklı eller; ağırlıklar kodla.
- Çizgi stili: ters-kabuk (inverted hull) siyah kontur, karakter sayfasındaki çizgi diline uygun.
- Rig (`Forn_Rig`): `root`, `body` (squash&stretch dahil), kollarda IK + dirsek kutbu, bacaklarda IK + diz kutbu, 15'er kemikli eller (parmak kıvırma), `face` kemiği üzerinde yüz kontrolleri (custom property + driver): `lid, lid_tilt, brow_y, brow_tilt, brow_arch, brow_vee, look_x, look_y, iris_size, pupil_size, mouth_smile, mouth_dot, mouth_oval`.

## Animasyon (kısa hikâye)
"Forn kancadan düşüyor": Forn duvardaki kancaya anahtarlık deliğinden asılı uyuyor (Zzz) → esniyor, uyanıyor, aşağı bakıp "!" diyor → kancadan kıvranarak sıyrılıp düşüyor → squash&stretch ile iniyor, toz kalkıyor → iç çekiyor, kaşını kaldırıyor → "ta-da" hareketiyle harfler yerden fırlayıp **FORN** yazıyor (kıvılcımlar, marimba notaları) → zıplayıp harfleri "dalga" halinde sıçratıyor → kameraya el sallıyor. Ses (foley + marimba) `work/audio.py` ile sentezlendi.

## Nasıl açılır / çalıştırılır
- `maskot.blend`'i Blender 5.x ile aç; zaman çizelgesinde oynat. Rig seçilince pose modunda `face` kemiğinin özel özellikleriyle yüz ifadeleri düzenlenir.
- Render: Cycles (GPU/OptiX) ayarlı, 64 örnek, denoise açık. Tek kare: `blender -b maskot.blend -f 130`.
- Yeniden üretmek: `cd work && blender -b --python build_char.py && blender -b --python build_maskot.py` (ardından `python3 audio.py`).
