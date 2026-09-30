GÖREV: Fırtınalı bir gecede İstanbul Kız Kulesi'ni Three.js ile tarayıcıda çalışan, gerçek zamanlı, sinematik bir
animasyon olarak yap. Aşağıdaki şartname ZORUNLUDUR; her maddeyi karşıla ve TESLIM.md'de madde madde nasıl
karşıladığını yaz.

1) TEKNİK: Three.js yerel kurulum (çalışma anında CDN yok); index.html file:// veya `python3 -m http.server` ile açılır.
   1920×1080'de ≥ 60 fps hedefi, `?q=low` düşük kalite modu, gizlenebilir fps sayacı. src/ altında modüler kod.
2) KULE: Kız Kulesi'nin tanınır silueti — kayalık adacık, rıhtım, ana gövde, üstte kule ve fener odası, kurşun
   kaplı kubbe/külah. Oranlar gerçeğe sadık; taş/sıva dokusu prosedürel.
3) DENİZ: Gerstner dalgaları (en az 4 dalga bileşeni), kayalığa çarpan dalgalarda köpük ve sıçrayan su parçacıkları,
   fresnel yansıma, fener ışığının suda parıltısı.
4) FIRTINA: parçacıklı eğik yağmur (rüzgârla), sis/alçak bulut katmanı, rastgele aralıklarla şimşek: ekranı
   aydınlatan flaş + gökyüzünde çatallı yıldırım + 1–3 sn gecikmeli gök gürültüsü.
5) FENER: dönen fener, yağmur/sis içinde görünen hacimsel ışık hüzmesi (god rays / volumetrik koni).
6) ÇEVRE: şimşekte bir an beliren İstanbul silueti (Üsküdar ve Sarayburnu tarafı, minareli camiler), uzakta
   dalgalarla yalpalayan ışıklı bir vapur, martılar.
7) KAMERA: 60 sn'lik kusursuz döngü halinde sinematik kamera yolu (uzak plan → dalga seviyesi → kule etrafında dönüş
   → fener yakın plan); fareyle serbest kamera modu ve tekrar sinematiğe dönüş düğmesi.
8) KONTROLLER: fırtına şiddeti kaydırıcısı (sakin gece → tam fırtına), saat kaydırıcısı (gece → şafak), şimşeği
   elle tetikleme düğmesi, fotoğraf modu (arayüzü gizle, PNG indir).
9) SES: Web Audio ile kodla üretilmiş yağmur, rüzgâr, dalga ve gök gürültüsü (varsayılan kapalı, düğmeyle açılır),
   şiddet kaydırıcısıyla birlikte değişir.
10) SÜREÇ: headless Chromium ile kamera yolunun en az 6 noktasından ve serbest moddan ekran görüntüsü al, kendin
   incele, hatalı/zayıf olanları düzelt (en az 2 düzeltme turu); konsol hatası sıfır; fps ölçümünü TESLIM.md'ye yaz;
   onizleme/ klasörüne ekran görüntülerini koy.
TESLİM: index.html (+ src/, dist/ vb.), onizleme/, TESLIM.md.
