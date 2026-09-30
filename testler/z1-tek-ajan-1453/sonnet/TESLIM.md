# TESLİM — C3_1453_Safak (29 Mayıs 1453 şafağı)

Tek ajan, alt ajan yok. Kit: `arazi_kiyi.blend` kopyası → `sahne.blend`; yalnız `C3_1453_Safak` yuvası dolduruldu.
Hazır model/doku indirilmedi; her şey Blender Python'ıyla üretildi (kod: `build_c3.py`, `build_c3_b.py`).

## Dosyalar
- `sahne.blend` — teslim sahnesi (çağ yalnız 1131–1600 kareleri arasında görünür; 1141–1590 çağın kendi aralığı).
- `kare.png` — kit kamerasından 1365. kare, 1920×1080 (kitin `kare_render.py` komutuyla).
- `build_c3.py` + `build_c3_b.py` — sahneyi kit dosyasından baştan kuran betikler; `run.sh` kurup önizleme karesi alır.

Yeniden kurmak: `blender -b /home/forn/zaman-yarigi/kit/arazi_kiyi.blend --python build_c3.py` (sahne.blend'i yazar).
Kare: `blender -b sahne.blend --python /home/forn/zaman-yarigi/kit/araclar/kare_render.py -- <klasör> 100 1 1365 1365`

## Sahnede ne var (kaynak kartına göre OLMALI)
- **Ayasofya**: yükseltilmiş, 40 nervürlü kubbe + tambur, doğu/batı yarım kubbeler, apsis, payandalar, narteks, atrium — **minaresiz**.
- **Aya İrini**: iki kubbeli, apsisli bazilika.
- **Deniz surları ve kuleler**: kit kıyı hattından (deniz seviyesi konturu) üretilen sur + kule dizisi (Marmara ve Haliç kıyısı); bazı kesimler harap.
- **Haliç ağzında zincir**: iki ucunda kule (Eugenios / Galata yakası), aralarında yüzen kütükler.
- **Galata**: surlarla çevrili sık Ceneviz dokusu ve **Galata Kulesi** (1348; kalın gövde, galeri, konik çatı).
- **Osmanlı gemileri**: Haliç'in Kasımpaşa yakasında (ve Boğaz kıyısında) yelkenli kadırgalar; ayrıca Pera yamacında, kızak yolu üzerinde **karadan indirilen** üç gemi (22 Nisan). Sancak/bayrak yok, insan yok.
- **Harap, seyrek Bizans dokusu**: ~1100 ev (bir kısmı harabe), ağaç öbekleri, boyalı zemin örtüsü, ruin Hipodrom, Valens su kemeri, küçük Bizans kiliseleri.
- **Duman ve şafak**: 8 duman sütunu, alçak sabah sisi, alçak/sıcak güneş (kare 1141'de alacakaranlık → 1590'da gün), gökyüzü kubbesi, sallanan gemiler, akan deniz dokusu.
- OLMAMALI listesi: minare, Topkapı, Sultanahmet, Süleymaniye, Yeni Cami, Galata Köprüsü, buharlı gemi, insan, bayrak, şiddet — hiçbiri yok.

## Kit kuralları
- `KIT_*` nesneleri ve kamera değişmedi (konum/veri/görünürlük kontrol edildi, kit ile aynı).
- Kit güneşini (`KIT_Gunes_varsayilan`) elle kapatmak yerine, C3 koleksiyonunda kameraya görünmeyen büyük bir "perde" (`C3_KitGunesPerdesi`) onun ışığını keser; şafak ışığı C3'ün kendi güneşidir. Kit dünyasına dokunulmadı; şafak gökyüzü `C3_Gokyuzu` kubbesidir. Deniz kit denizinin hemen üstündeki `C3_Deniz` ile örtülür (kit denizi silinmedi).
- Sahne düzeyinde yalnız EEVEE ayarı değişti: render örnekleri 128, ışın izleme açık.

## Bilinen sınırlar / dürüst notlar
- Maket zanaatı: yapılar (özellikle Ayasofya, Galata Kulesi, gemiler) okunabilsin diye ölçek olarak abartılıdır; yerleşimler yaklaşık, birebir tarihî konum değildir. Zincirin tam hattı ve kızak yolu tahminîdir.
- Kaynak kartları insan onayını bekliyor (00-OKU.md); belirsiz maddeler için kesin doğruluk iddiası yoktur.
- Galata Kulesi'nin 1453'teki çatı biçimi (konik) kesin değil; kalın gövde nedeniyle minare gibi durmaması amaçlandı.
- Geçiş (çağlar arası 3 sn) tasarlanmadı; C3 yalnız kendi aralığında görünür.
