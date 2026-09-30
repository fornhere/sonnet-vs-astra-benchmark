# RAVENHOLD (Kuzgun Kalesi) — Blender şato + sinematik tanıtım

Göl kıyısında, 50 m yüksekliğindeki bir kayalığın üstünde yükselen gotik‑masalsı bir şato: 11 kuleli
çevre suru, kapı yapısı, kemerli taş viyadük yolu, donjon (ana kule), büyük salon, şapel + çan kulesi,
yarı ahşap avlu evleri, gölün karşı kıyısında bir köy ve iskele, çam/sonbahar ormanı, dağlar ve göl.
Sahne gün batımında; video boyunca güneş alçalır (altın saat → alacakaranlık) ve pencereler yavaş yavaş yanar.

Kim kullanabilir: oyun geliştirici (ölçekli, parçalara ayrılmış sahne + GLB geometri), masaüstü RPG
(kalenin harita/illüstrasyon referansı, 4 sabit kapak kamerası), kapak tasarımcısı (hazır kameralar + kapak kareleri).

## Teslim edilen dosyalar

| Dosya | Ne |
|---|---|
| `sato.blend` | Ana Blender 5.2 sahnesi (Cycles/OptiX). Tüm materyaller prosedürel — dış doku dosyası YOK. |
| `render.mp4` | 1920×1080, 24 fps, ~20 sn sinematik uçuş (H.264 + sentetik ambiyans sesi). |
| `kapaklar/` | 2560×1440 4 kapak/illüstrasyon karesi: `kapak_1_altin_saat`, `kapak_2_alacakaranlik`, `kapak_3_havadan`, `kapak_4_avlu` (sahnedeki sabit kameralardan, 128 örnek). |
| `sato_kale_geometri.glb` | Kale + köy geometrisi (UV'li, materyal slotlu) — oyun motoruna geometri olarak aktarmak için. |
| `src/` | Sahneyi sıfırdan üreten Python kaynağı (`build.py` ana betik). |
| `render_film.py`, `run_all.sh`, `assemble.sh` | Filmi kare kare render eden ve mp4'e birleştiren betikler. |
| `render_stills.py`, `export_glb.py`, `finalize_blend.py`, `run_preview.sh` | Kapak karelerini üretir / GLB dışa aktarır / .blend'i son haline getirir / düşük çözünürlüklü önizleme. |

## Nasıl açılır

1. Blender 5.2 ile `sato.blend` dosyasını açın. Sahne Cycles'a ayarlıdır; GPU için
   *Preferences → System → Cycles Render Devices → OptiX* seçin (cihaz seçimi dosyada değil kullanıcı ayarındadır).
2. Aktif kamera `Kamera_Ucus` (kare 1–480, 24 fps; hedef boşluğu `Kamera_Hedef` ile). Timeline'ı oynatın veya
   `Ctrl+F12` ile animasyonu render edin. Tek kare için `F12`.
3. Sabit kameralar: `Kamera_Kapak_Ana`, `Kamera_Kapak_Havadan`, `Kamera_Avlu`, `Kamera_Gun_Batimi_Goldan`
   (Outliner → Kameralar; kamerayı seçip Ctrl+Numpad0 ile aktif yapın). Günün saati zaman çizelgesiyle animedir:
   kare 1 = altın saat, kare 480 = alacakaranlık (pencereler tam parlak).
4. Komut satırı: `blender -b sato.blend -a` (tam animasyon), veya `./run_all.sh 36` + `./assemble.sh` (mp4).
5. Sahneyi kaynaktan yeniden üretmek: `blender -b --python src/build.py` (çıktı: `sato.blend`, `OUT=...` ile değiştirilebilir).

## Sahne düzeni (1 Blender birimi = 1 metre)

* Su seviyesi z = 0; kale platosu / avlu z = 50 m; ana kule sivri çatısı ≈ z 145 m; surlar ≈ 13 m, kuleler 25–46 m.
* Kale kökü: `Ravenhold_Kale_Koku` (Empty); parçalar ayrı nesnelerdir:
  `Sur_ve_Kuleler`, `Kapi_Yapisi`, `Ana_Kule_Donjon`, `Buyuk_Salon`, `Sapel`, `Avlu_Evleri`,
  `Avlu_Zemini_ve_Detaylar` (kaldırım, kuyu, pazar tezgâhları, variller), `Viyaduk`, `Kale_Yolu`.
* `Koy` koleksiyonu: köy evleri, kilise, iskele. `Bitki_Ortusu`: çam ağaçları (7000), yaprak döken/sonbahar ağaçları (900), avlu ağaçları.
* `Arazi_ve_Su`: arazi (yükseklik haritası + yol kesme/dolgu), göl, sis hacimleri (`Sis_Genel`, `Sis_Vadi`).
* `Bayraklar_Kuslar`: 29 bayrak ve dikey sancak (Wave modifier ile rüzgârda dalgalanır — zamanla otomatik animedir),
  10 karga (kanat çırpma + dairesel uçuş anahtar kareli).
* `Isiklar`: duvar/kapı meşale ışıkları (sıcak nokta ışıklar). Gün ışığı Nishita gökyüzü + güneşten gelir (World → `Gok`).
* Pencere ışığı: `Pencere_Isik` materyalindeki `GlowStrength` düğümüyle anime edilir (kare 1: 2.2 → kare 480: 9).
* Materyaller: taş (tuğla dokusu + bevel + AO kirlenme), çatı kayrağı/kiremit/patinalı bakır, ahşap, sıva, demir, altın,
  kumaş, kaldırım, arazi (eğim/yükseklik/kar/sahil karışımı), su.
* Tüm yüzeylerin UV'si vardır (yüzey yönüne göre projeksiyon); materyaller prosedüreldir — oyun motoru için bake alınabilir.

## Video (render.mp4) anlatısı

1. Göl yüzeyinden alçak süzülme, gölde şatonun yansıması (altın saat).
2. Kıyıya kayış, köy ve kıvrımlı yol; yol boyunca şatoya yükselen kamera.
3. Kemerli viyadük ve kapı yapısına yaklaşma, kapı kulelerinin üstünden yükselme (vinç çekimi).
4. Avlu ve donjon üzerinden dönerek yükselme (yanan pencereler, bayraklar, meşaleler), şatonun etrafında yörünge.
5. Geriye çekilip alacakaranlıkta yanan pencereli, dağlarda alpenglow'lu kahraman kadraj.

Render: Cycles, OptiX GPU (RTX 5060), 36 örnek/kare + OptiX denoise, AgX (Punchy) renk yönetimi; kareler PNG olarak
render edilip `assemble.sh` ile (başlık, hafif vinyet/grain, ambiyans ses) mp4'e birleştirildi.

## Notlar / sınırlar (dürüst)

* Binaların içi boştur (dışarıdan ve avludan tam detaylı; iç mekân modellenmedi).
* Ağaçlar stilize / düşük poligonlu; uzak dağlar yükseklik haritası + gürültü ile üretildi (fotogerçekçi değil, illüstratif).
* Kale + köy toplamı yaklaşık 30 bin poligon (çoğu detay materyalde: tuğla, bump, bevel) — motora aktarırken
  materyalleri bake etmek gerekir. GLB yalnızca geometri, UV ve materyal slotlarını taşır.
* Kare sırası: render önce tek kareler, sonra çift kareler olarak iki turda alındı (kesilirse devam edilebilir).
  İlk turda 16 karede (207–237, tek numaralı) duvar tabanında siyah materyal hatası görüldü; bu kareler düzeltilmiş dosyayla yeniden render edildi.
* Kare PNG dizisi (≈1.2 GB) teslimden çıkarıldı; `./run_all.sh 36 && ./assemble.sh` ile yeniden üretilebilir (≈1 saat, RTX 5060).
* Video sesi ffmpeg ile üretilmiş sentetik bir ambiyanstır (rüzgâr + derin drone); müzik değildir.
