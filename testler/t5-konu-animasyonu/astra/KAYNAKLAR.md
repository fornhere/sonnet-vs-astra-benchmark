# Bilgi ve varlık kaynakları

Video metni ve grafikler bu çalışma için hazırlandı. İnceleme: 29 Eylül 2026.

- **Tek yönlü yayın, uydunun konumu ve saat bilgisi:** [GPS.gov — GPS Overview](https://www.gps.gov/systems/gps/index.php).
- **Süre × ışık hızı = uzaklık; en az dört uydu:** [GPS.gov — How GPS Works](https://www.gps.gov/multimedia/poster/poster-web.pdf), [FAA — GPS: How It Works](https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/gps/howitworks).
- **Atom saatleri:** [GPS.gov — GPS and Telling Time](https://www.gps.gov/gps-and-telling-time).
- **Binalardan yansıma ve konum hatası:** [GPS.gov — GPS Accuracy](https://www.gps.gov/gps-accuracy-0).
- **300 metre karşılaştırması:** 299.792.458 m/s × 0,000001 s = 299,792458 m. Bu, sinyal mesafesi hatasıdır; doğrudan her koşulda 300 metre konum hatası olduğu iddia edilmez.

Çemberler sahnesi açıkça iki boyutlu öğretici model olarak etiketlidir. Takip eden sahne gerçek üç boyutlu geometrinin ve alıcı saat hatasının farkını açıklar. Uyduların yörüngeleri, boyutları, sinyallerin hızı ve şehir planı görsel anlatım amacıyla temsilidir.

## Varlıklar

- Dünya sınırları: [Natural Earth 1:110m admin-0](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson), [kamu malı kullanım koşulları](https://www.naturalearthdata.com/about/terms-of-use/).
- Tipografi: Noto Sans / Noto Serif; SIL Open Font License, kopyası `gps-film/assets/LICENSE`.
- Türkçe yapay ses: HeyGen Starfish, Orson; ses dosyaları ve sözcük zamanları projede.
- Müzik ve efektler: bu film için Python ile sentezlenen özgün kayıtlar; stok müzik veya ticari şarkı kullanılmadı.
- Görseller: Canvas 2D üzerinde özgün kodla çizilmiş ve canlandırılmış uydu, telefon, harita, çemberler, saat ve şehir.
- Zaman çizgisi / render: GSAP 3.14.2 ve HyperFrames 0.8.86.
