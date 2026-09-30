# Font kaynakları ve lisanslar

Bu kitte dışarıdan font dosyası indirilmedi. Fontların tamamı çalışma makinesindeki açık lisanslı sistem fontlarından alındı; özgün dosyalar `../fonts/kaynak/` içindedir.

## URW Bookman

- Light, Light Italic ve Demi. Yerel paket: `gsfonts 20200910-6`.
- Copyright: (URW)++, 2014, (URW)++ Design & Development.
- Lisans: AGPL 3.0, PostScript/PDF font istisnasıyla.
- Tam metinler: `URW-AGPL-3.0.txt`, `URW-LICENSE.txt`.
- Resmî kaynak: https://github.com/ArtifexSoftware/urw-base35-fonts
- Lisans kaynağı: https://github.com/ArtifexSoftware/urw-base35-fonts/blob/master/LICENSE
- Sistemde bulunan özgün OTF dosyaları `../fonts/kaynak/` içinde korunmuştur.

## Noto Sans

- Regular ve Medium.
- Copyright 2022 The Noto Project Authors.
- Font dosyalarının kendi metadata kaydı esas alındı: SIL Open Font License 1.1.
- Tam metin: `Noto-Sans-OFL-1.1.txt`.
- Resmî kaynak ve lisans: https://github.com/notofonts/latin-greek-cyrillic/blob/main/OFL.txt
- Sistemdeki özgün TTF dosyaları `../fonts/kaynak/` içindedir.

## Yerel dönüşümler

29 Eylül 2026: FontTools ile Türkçe ve Latin karakterleri içeren WOFF2 alt kümeleri üretildi. Glif biçimleri değiştirilmedi; karakter kapsamı küçültüldü ve dosya biçimi dönüştürüldü. Dönüşüm kodu `../../kaynak/uret.py` içindedir. Font dosyaları kendi özgün lisansları altında dağıtılır.

Logo ve uygulama SVG'lerindeki yazılar aynı yerel fontlardan vektör eğrilere çevrildi. Dosyaların açılması için font kurulumu gerekmez. HTML'de kullanılan WOFF2 dosyaları kendi klasöründe tutulmalıdır.
