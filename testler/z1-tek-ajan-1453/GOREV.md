GÖREV (tek ajan referans koşusu): Masa üstünde duran bir İstanbul MAKETİNİN üzerinde yalnız "29 Mayıs 1453 şafağı"
çağını kur. ALT AJAN KULLANMA; işi tek başına yap.
KİT (salt okunur): /home/forn/zaman-yarigi/kit → önce OKUBENI.md'yi, sonra kaynak_kartlari/C3_1453_Safak.md'yi oku.
Kitteki arazi_kiyi.blend'in bir kopyasını bu klasörde sahne.blend olarak kaydet ve yalnız C3_1453_Safak yuvasını doldur
(KIT_* nesnelerine ve kameraya dokunma). İnsan figürü, şiddet, bayrak yok; hazır model/doku indirme yok.
SÜRE SINIRI: 45 dakika. Süre bitmeden mutlaka teslim et.
TESLİM: sahne.blend ve kare.png — kitin kamerasından 1365. karenin 1920×1080 render'ı:
  blender -b sahne.blend --python /home/forn/zaman-yarigi/kit/araclar/kare_render.py -- <klasör> 100 1 1365 1365
  (çıkan k_1365.png dosyasını kare.png olarak kaydet)
