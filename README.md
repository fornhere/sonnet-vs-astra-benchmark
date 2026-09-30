# Claude Sonnet 5.5 vs GPT-6 Astra — 18 gerçek iş

Forn AI YouTube videosunun test deposu: iki modele **birebir aynı gevşek prompt** verildi, ikisi de
**high reasoning** ile kendi aracında (Sonnet 5.5 → Claude Code, GPT-6 Astra → Codex CLI) tek ajan olarak çalıştı.
Burada promptlar, modellerin ürettiği çıktılar (kod, sayfalar, görseller, videolar), her koşunun token/süre/maliyet
kaydı ve karşılaştırma araçları var.

> *English summary:* Same loose prompt, 18 real tasks (Blender, Three.js worlds, video editing, landing page, agency
> work), both models on `high` reasoning in their native harness. Totals at API list price: **Sonnet 5.5 $138.41 vs
> GPT-6 Astra $154.63** — Sonnet was cheaper on 12/18 tasks, but 1.5–2.3× more expensive on large Three.js scenes
> (it wrote 3–7× more output tokens). Astra was ~1.7× faster overall. Prompts in `ORTAK.md` + each `testler/*/GOREV.md`.

## Sonuçlar

Maliyet = **API liste fiyatıyla tahmini karşılık** (abonelikten ek ödeme değil).
Sonnet: Claude Code'un raporladığı oturum maliyeti · Astra: token × resmî fiyat ($10 girdi / $1 cache / $50 çıktı, M token).
Süreler paylaşılan GPU/RAM ile ölçüldü; kesin hız ölçümü değildir.

| Test | Sonnet 5.5 | GPT-6 Astra | Ucuz |
|---|---|---|---|
| t1 Short (29 dk ham kayıttan) | $2,60 · 36 dk | $12,06 · 29 dk | Sonnet 4,6× |
| t1b Short (hazır kesitten) | $1,88 · 20 dk | $6,36 · 17 dk | Sonnet 3,4× |
| t2 Ürün tanıtım videosu | $3,65 · 19 dk | $6,75 · 15 dk | Sonnet 1,8× |
| t3 Şato (Blender) | $13,97 · 164 dk | $19,99 · 75 dk | Sonnet 1,4× |
| t4 3D lansman sayfası | $4,75 · 29 dk | $8,45 · 33 dk | Sonnet 1,8× |
| t5 Konu animasyonu | $6,95 · 52 dk | $9,57 · 20 dk | Sonnet 1,4× |
| t6 Kapadokya (Three.js) | $15,87 · 72 dk | $7,75 · 32 dk | **Astra 2×** |
| t7 Maskot (Blender) | $7,39 · 170 dk | $15,54 · 59 dk | Sonnet 2,1× |
| t8 NY diorama, serbest | $14,34 · 60 dk | $6,24 · 27 dk | **Astra 2,3×** |
| t9 NY diorama, sıkı şartname | $18,69 · 73 dk | $12,15 · 41 dk | **Astra 1,5×** |
| t10 Kız Kulesi, sıkı şartname | $18,51 · ~74 dk ¹ | $8,90 · 25 dk | **Astra 2,1×** |
| t11 Cengiz Han heykeli, serbest | $5,88 · 29 dk | $8,56 · 32 dk | Sonnet 1,5× |
| t12 Ürün tanıtımı (motion), serbest | $4,10 · 32 dk | $6,08 · 17 dk | Sonnet 1,5× |
| ta Instagram carousel | $3,89 · 20 dk | $3,72 · 17 dk | ≈ eşit |
| tb Banner seti (10 boyut) | $1,71 · 10 dk | $4,07 · 19 dk | Sonnet 2,4× |
| tc Pitch deck | $2,01 · 10 dk | $3,03 · 13 dk | Sonnet 1,5× |
| td Excel yönetim raporu | $5,96 · 28 dk · 10/10 bulgu | $10,84 · 34 dk · 9/10 | Sonnet 1,8× |
| te Marka kiti | $6,26 · 25 dk | $4,57 · 23 dk | Astra 1,4× |
| **Toplam (18 iş)** | **$138,41** | **$154,63** | Sonnet ~%10 |

¹ Claude kullanım limiti 72. dakikada oturumu kesti, aynı oturum `--resume` ile 2 dakikada tamamlandı; `sonuclar.jsonl`
yalnız ilk parçayı ($16,63) gösterir, tablo toplamı ($18,51) iki parçanın toplamıdır.

Ek referans (tek ajan, aynı 1453 İstanbul Blender sahnesi): `z0` kalite kapısı, `z1` tek ajan — `sonuclar.jsonl`.

**td gizli bulgu testi:** `girdi/demlik-satis-2025.xlsx` sentetik veri; içine 10 bulgu yerleştirildi, cevap anahtarı
koşu sırasında modellerin erişemeyeceği yerde tutuldu.

## Nasıl okunur

```
ORTAK.md                  iki modele giden ortak prompt (her testin başına eklendi)
ortak-girdi/              ajans testlerinin ortak (kurgusal) marka brief'i
testler/<test>/GOREV.md   testin kendi görevi (2–5 satır)
testler/<test>/sonnet/    Claude Sonnet 5.5'in çıktısı (TESLIM.md: ne yaptığını kendisi anlatıyor)
testler/<test>/astra/     GPT-6 Astra'nın çıktısı
testler/<test>/*/istem.txt  modele giden promptun birebir hâli
medya/                    videoda kullanılan 720p önizleme kayıtları (tNN-son = Sonnet, tNN-ast = Astra)
sonuclar.jsonl            her koşunun süre, token ve maliyet özeti (araclar/ozet.py çıktısı)
araclar/kosu.sh           koşu betiği (Claude Code / Codex headless)
araclar/ozet.py           log → özet
araclar/kayit.mjs         web çıktıları için tarafsız ekran kaydı (Playwright)
```

Three.js sayfalarını açmak için klasörde yerel bir sunucu çalıştırın (ör. `python3 -m http.server`) ve
`index.html`'i tarayıcıda açın; bazıları `file://` ile modül yükleyemez.

## Neler bu depoda yok

- Bağımlılık klasörleri (`node_modules`), ara render kareleri, 45 MB'tan büyük videolar ve 60 MB'tan büyük `.blend` dosyaları.
- Kanalın ham çekimleri: t1/t1b testlerinin girdisi ve çıktı videoları Forn'un kendi kaydı olduğu için yalnız prompt ve teslim notları var.
- Oturum logları (sistem bağlamı içerdikleri için); yerine `sonuclar.jsonl` özeti konuldu.

## Dürüstlük notları

- Her test **tek koşu**. Model varyansı yüksek; aynı testi yeniden koşmak farklı sonuç verebilir.
- Karşılaştırma **model + araç** birlikte: Sonnet Claude Code'da, Astra Codex'te koştu.
- Kalite yargıları videodaki kişisel değerlendirmedir; kör jüri yalnız ayrı bir çok-ajanlı testte kullanıldı.
- Promptlar kasıtlı olarak gevşek ("bu bir benchmark, en iyi işini yap"); t9 ve t10 sıkı şartnameli karşılaştırmadır.

## Lisans

Kod ve betikler MIT (`LICENSE`). Model çıktılarının içindeki üçüncü taraf varlıklar (fontlar, dokular, three.js gibi kütüphaneler) kendi lisanslarına tabidir.

Video: Forn AI (YouTube).
