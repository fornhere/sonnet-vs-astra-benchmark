# Demlik — "Demini Al" banner seti

**Fikir:** Çayın "demi" bir zamanlayıcıdır. Kadıköy'de güneş batarken ince belli bardak dem alır: kadran gibi bir halka dolar, çay açık kehribardan koyu demli rengine geçer. Reklam önce "Çay acele sevmez." der, sonra "Demini al." Ardından yeni harman **Kadıköy Akşamı**, "İlk hafta atölyeye %20 indirim" mührü ve CTA (**Yerini ayır →**) gelir. Tek fikir, 10 boyutta aynı görsel dil: alacakaranlık gökyüzü, Moda silüeti (minareler, çatılar, yanan pencereler), martılar, kremsi porselen tabak, lale kırmızısı mühür, kehribar CTA.

Tüm görseller kodla üretildi (SVG + CSS). Görsel üretim modeli, harici görsel/ikon/font indirmesi yok. Yazı tipleri sistemdeki açık lisanslı (OFL) Noto Serif Display ve Noto Sans; yalnız Latin+Türkçe alt kümesi woff2 olarak her HTML'e gömülü.

## Dosyalar
- `png/<genişlik>x<yükseklik>.png` — 10 statik boyut (animasyonun son karesi): 300×250, 336×280, 728×90, 970×250, 300×600, 160×600, 320×50, 1080×1080, 1080×1920, 1200×628
- `png/2x/` — küçük boyutların (≤970 genişlik) 2× sürümleri
- `html5/<boyut>/index.html` — **10 boyutun tamamı** için hareketli HTML5 (istenen en az 3'ün üstünde). Tek dosya, yazı tipleri gömülü, ~110–130 KB, harici istek yok. `clickTag` değişkeni ve `ad.size` meta etiketi var.
- `onizleme.html` — tüm seti tek sayfada gösterir (canlı animasyonlu HTML5'ler + "Tekrar oynat" düğmeleri + PNG'ler)
- `kaynak/` — üretici betikler (`kit.mjs` bileşenler/animasyon, `build.mjs` 10 düzen, `render.mjs` PNG üretimi, `prev.mjs` önizleme). `fonts-src/` gömülen font alt kümeleri.

## Nasıl açılır
- `onizleme.html` dosyasını tarayıcıda aç (sunucu gerekmez).
- Tek bir banner: `html5/300x250/index.html` vb. Reklam sunucusuna yüklerken `clickTag` değerini kendi izleme URL'nizle değiştirin (varsayılan https://demlik.com.tr).

## Animasyon (~7 sn, sonra son kare tutulur; 12.5. sn'de bir kez tekrar → toplam ≤ 25 sn)
0–3 sn: güneş yükselir, bardak dolar ve demlenir, halka/ibre dolar, "Çay acele sevmez." → 3.4 sn: halka tamamlanır, "Demini al." → 4.2 sn: eyebrow + alt metin → 4.9 sn: %20 mühür damgası → 5.7 sn: CTA belirir, parlama geçer. Yalnız CSS animasyonları; sonsuz döngüde yalnız buhar, yıldız ve martı.

## Yeniden üretim
`cd kaynak && node build.mjs && node render.mjs all 9000 png` (playwright-core + /usr/bin/chromium gerekir; `render.mjs` animasyonu 9. sn'ye sabitleyip PNG alır).

## Notlar
- Metin tek kaynaktan (`build.mjs`) gelir; 160×600 ve 320×50 gibi dar boyutlarda içerik sadeleştirilir (adres/handle yalnız büyük boyutlarda).
- 1080×1920: logo ve başlık üst ~130 px arayüz alanının altında; CTA (1612–1762 px) alt ~250 px platform arayüzüne kısmen girer, gerekirse `build.mjs` içinde yukarı alınabilir.
