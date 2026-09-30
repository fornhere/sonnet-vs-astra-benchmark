# İçerik ve varlık kaynakları

Ürün hakkındaki tek kaynak kullanıcı tarafından verilen temiz kamu deposudur:
`/home/forn/sonnet-vs-astra/t2-urun-tanitim/girdi/hafiza-os/`.
Depoya ve kişisel Hafıza kasasına yazılmadı. Kurulum komutu çalıştırılmadı.

| Filmdeki iddia | Depodaki dayanak |
|---|---|
| “Ajanlar değişsin, hafızan aynı yerde kalsın.” | README.md, açılış vaadi; birebir slogan |
| Açık kaynak başlangıç sistemi; kişisel Markdown kasası | README.md, ilk iki paragraf |
| Tercihler, kararlar, işler aynı kasada | README.md, açılış ve “Neler yapabilirsin?” |
| Claude Code, Codex, Antigravity ortak kasaya yönlendirilebilir | README.md, açılış ve “Hangi ajanla?” tablosu |
| Kaynak yolu, özgün alıntı ve kaynak sürümü denetimi | README.md “Kaynağıyla hatırla”; BILGI-AGI.md “Kapsam ve örnekler” ve “Komutlar ve kayıt sözleşmesi” |
| Değişmiş kaynağın yeniden incelenmesi | BILGI-AGI.md “Kaynak değişirse kayıt yeni sürüm incelenene kadar…” |
| Son karar, açık iş, sonraki adım | README.md “Günlük kullanım”; CODEX.md kaynak ve kayıt rehberi |
| Ekrandaki günlük kullanım cümlesi | README.md “Kaldığın yerden devam” örneğinden kısaltılmış alıntı |
| Otomatik sohbet kaydı ayrıca kurulur | README.md kurulum ve günlük kullanım açıklaması |
| Anahtarsız yerel kullanım; Obsidian isteğe bağlı | README.md açılış ve kurulum |
| MIT; github.com/fornhere/hafiza-os | README.md lisans ve kurulum URL'si |

İlk sahnedeki üç cümle problemin temsili anlatımıdır; müşteri yorumu değildir.
Filmde gerçek bir ürün arayüzü, çalışma sonucu, test sonucu veya otomatik sohbetler arası senkronizasyon gösterilmez. Şemalar ürün belgelerinin görsel anlatımıdır. Kaynak bölümünde “Temsili bilgi akışı” etiketi vardır.

## Görsel ve ses varlıkları

- Tipografi, düzen, SVG bağlantılar ve kağıt yığını bu film için kodla oluşturuldu.
- Manrope: Google Fonts deposu, ofl/manrope; SIL Open Font License. Lisans assets/Manrope-OFL.txt.
- IBM Plex Mono: Google Fonts deposu, ofl/ibmplexmono; SIL Open Font License. Lisans assets/IBMPlexMono-OFL.txt.
- GSAP 3.14.2: jsDelivr dağıtımı, assets/gsap.min.js içinde lisans başlığı.
- Kinetic type swap mekanizması: HyperFrames `kinetic-type-swap` registry bileşeninden uyarlanmış, yerel kopyası compositions/components/ altında.
- Müzik ve geçiş sesleri: bu görev için NumPy ile sıfırdan sentezlendi; harici ses örneği veya stok kayıt kullanılmadı. 120 BPM, stereo, 48 kHz. Üretici kod ../scripts/score.py.
- Konuşma yok: sosyal akışlarda sessiz izlemeyi destekleyen, tüm anlatımı ekranda taşıyan bilinçli tercih.
