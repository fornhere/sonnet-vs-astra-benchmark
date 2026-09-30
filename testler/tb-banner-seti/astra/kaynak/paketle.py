from pathlib import Path
import json, zipfile, hashlib
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'kaynak/manifest.json').read_text())
animated=[i for i in data if i['animated']]
for item in animated:
 name=item['size']
 with zipfile.ZipFile(ROOT/'html5'/f'{name}.zip','w',zipfile.ZIP_DEFLATED,9) as z:
  z.write(ROOT/'html5'/name/'index.html','index.html')
rows=[]
for i in data:
 name=i['size']; kb=(ROOT/'png'/f'{name}.png').stat().st_size/1024
 zkb=(ROOT/'html5'/f'{name}.zip').stat().st_size/1024 if i['animated'] else 0
 rows.append(f'| {i["width"]}×{i["height"]} | `png/{name}.png` | {kb:.1f} KB | '+(f'`html5/{name}/index.html` · ZIP {zkb:.1f} KB' if i['animated'] else '—')+' |')
doc='''# Demlik — “Demini Al” kampanya teslimi

**Başlangıç:** `onizleme.html` dosyasını tarayıcıda açın. Tüm 10 görsel tek sayfadadır; beş boyutun hareketli sürümlerini kart üzerindeki “Hareketli izle” düğmesinden açabilirsiniz. PNG ve HTML5 ZIP indirme bağlantıları kartlardadır. Dosya doğrudan, internet veya sunucu gerektirmeden açılır.

## Ne yapıldı?

“Akşamın ince belli hâli” fikri, Kadıköy Akşamı sonbahar harmanı için tek bir görsel dile dönüştürüldü: akşam güneşi, çizgisel ince belli bardak, krem/kiremit palet ve güçlü “Demini Al.” tipografisi. Destek mesajı: “Şehrin acelesi var. Çayın acelesi yok.”

10 boyuta özel PNG; 5 boyuta özel hareketli HTML5; tek sayfalık duyarlı önizleme; düzenlenebilir SVG'ler ve üretim kaynakları hazırlandı. Görsel üretim modeli, stok görsel, indirilen ikon veya font kullanılmadı. İllüstrasyonlar tamamen kodla çizildi. Sistemdeki açık lisanslı URW Bookman ve Nimbus Sans yazıları vektörleştirildi; reklamlar font kurulumu gerektirmez.

## Dosyalar

| Boyut | PNG | PNG büyüklüğü | HTML5 |
|---|---|---|---|
'''+ '\n'.join(rows)+'''

- `onizleme.html` — tüm set, masaüstü/mobil önizleme ve indirme bağlantıları.
- `html5/index.html` — HTML5 dosyalarının ve ZIP paketlerinin kısa kataloğu.
- `html5/<boyut>.zip` — her reklam için ayrı paket; ZIP kökünde tek `index.html` vardır.
- `demlik-demini-al.zip` — temiz teslim arşivi: PNG, HTML5, önizleme, SVG, kaynak kod ve belgeler. Geliştirme bağımlılıkları dahil edilmez.
- `kaynak/svg/` — 10 ölçeklenebilir, fonttan bağımsız SVG kaynak.
- `kaynak/uret.py` — metinler, palet, çizim ve boyuta özel yerleşimler.
- `kaynak/KREATIF.md` — kampanya fikri, renkler, yazı karakterleri ve hareket akışı.
- `kontrol/` — tarayıcı raporları, önizleme ekran görüntüleri ve animasyon kontrol kareleri.

## HTML5 kullanımı

Her `index.html` tek başına çalışır; harici görsel, font, JS veya CSS gerektirmez. Reklam ölçüsü `ad.size` meta etiketiyle tanımlıdır. Reklam yüzeyinin tamamı klavye ile de erişilebilen bir bağlantıdır.

Varsayılan hedef brief'teki kurgusal `https://demlik.com.tr` adresidir. Gerçek yayında her dosyanın başındaki `var clickTag = "https://demlik.com.tr";` değerini kampanya hedefiyle değiştirin. JS kapalı yedek davranışı için bağlantının `href` değerini de aynı adrese ayarlayın. Reklam sunucusu aynı pencereye `window.clickTag` atayabilir. Bu paket genel HTML5 teslimidir; platforma özgü exit makrosu gerektiğinde bu noktaya bağlanır. Reklam hesabına yükleme veya yayın işlemi yapılmadı.

Giriş animasyonu 1,95 saniyede tamamlanır. Buhar hareketi 13,2 saniyede sonlanır; kompozisyon sonrasında sabit kalır. Sonsuz döngü ve ses yoktur. `prefers-reduced-motion` etkinse tüm animasyonlar kapanır. Dosyanın sonuna `?static=1` eklemek de sabit sürümü gösterir.

Teklif ilk hafta **atölye** için %20 indirimdir. Çay ürününde indirim iddiası yoktur. 320×50 boyutta okunabilirlik için marka, kampanya, ürün adı ve CTA kullanıldı; teklif metni sıkıştırılmadı. 1080×1080 HTML5 sürümü web kullanımı içindir; sosyal medya yüklemesinde ilgili PNG kullanılır.

## Kontrol

- Chromium'da 10 PNG doğal boyutlarında üretildi ve boyutları doğrulandı; RGB, opak PNG.
- Küçük formatlar gerçek piksel boyutunda, tüm set toplu olarak görsel incelendi.
- Beş HTML5 için 0 / 0,65 / 1,8 / 6,8 / 14 saniye kareleri alındı ve incelendi.
- HTML5 dosyalarında JS hatası ve harici kaynak isteği bulunmadı; reklam boyutunda kaydırma/taşma yok.
- 1440 ve 390 piksel ekran genişliğinde önizleme kontrol edildi: 10/10 görsel yükleniyor, 5/5 hareketli önizleme açılıyor, yatay taşma yok.
- Azaltılmış hareket tercihinde 0 aktif animasyon; yerel dosya açılışı ve JavaScript kapalı bağlantı yedeği doğrulandı.
- `clickTag` değişikliği ve yeni sekmenin `opener` yalıtımı, dış siteye gerçek istek göndermeyen yerel yönlendirme testiyle doğrulandı.
- Platforma özel reklam ağı sertifikasyonu yapılmadı.

## Yeniden üretme

Görüntülemek için kurulum gerekmez. Kaynakları değiştirmek ve yeniden üretmek için bu klasörde:

```bash
python3 -m venv .venv
.venv/bin/pip install -r kaynak/requirements.txt
npm install
.venv/bin/python kaynak/uret.py
node kaynak/render.mjs
.venv/bin/python kaynak/onizleme_uret.py
.venv/bin/python kaynak/paketle.py
```

Üretim Linux'ta `/usr/bin/chromium` ve `/usr/share/fonts/gsfonts/` altındaki URW Bookman Demi / Demi Italic ile Nimbus Sans Regular / Bold sistem fontlarını kullanır. Başka ortamda bu yolları `kaynak/uret.py` ve `kaynak/render.mjs` içinde güncelleyin. Bu bağımlılıklar yalnız yeniden üretim içindir; hazır reklam dosyalarına gerekli değildir.

İsteğe bağlı yerel sunucu:

```bash
python3 -m http.server 18973 --bind 127.0.0.1
```

Ardından `http://127.0.0.1:18973/onizleme.html` adresini açın. Sunucu çalışırken `npm run qa` kontrolleri tekrar çalıştırır.
'''
(ROOT/'TESLIM.md').write_text(doc)
links=''.join(f'<tr><td>{i["width"]} × {i["height"]}</td><td><a href="{i["size"]}/index.html">Reklamı aç ↗</a></td><td><a href="{i["size"]}.zip" download>ZIP indir ↓</a></td><td>{(ROOT/"html5"/i["size"]/"index.html").stat().st_size/1024:.1f} KB HTML</td></tr>' for i in animated)
(ROOT/'html5/index.html').write_text('''<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Demlik · HTML5 teslimleri</title><style>body{background:#f4ecd9;color:#49241f;font:15px/1.7 Arial,sans-serif;margin:0;padding:6vw;max-width:1000px}h1{font:700 48px Georgia,serif;letter-spacing:-2px}a{color:inherit;text-underline-offset:4px}table{border-collapse:collapse;width:100%;margin:40px 0}td{border-top:1px solid #49241f30;padding:18px 8px}p{max-width:720px}small{opacity:.7}@media(max-width:500px){body{font-size:12px}td{padding:15px 4px}h1{font-size:36px}}</style><a href="../onizleme.html">← Tüm kampanya</a><h1>Biraz hareket.<br>Bolca dem.</h1><p>Beş bağımsız HTML5 reklam. Her ZIP'in kökünde tek bir index.html bulunur. Harici kaynak yok; 13,2 saniye sonra hareket durur.</p><table>'''+links+'''</table><small>Varsayılan hedef: demlik.com.tr · Hedef değişikliği ve kullanım için <a href="../TESLIM.md">TESLIM.md</a></small></html>''')
files=[ROOT/'onizleme.html',ROOT/'TESLIM.md',ROOT/'package.json']
for folder in ['png','html5','kaynak']:
 files.extend(p for p in (ROOT/folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts)
for name in ['tarayici-raporu.json','etkilesim-raporu.json','kalite-raporu.json','hareket-seridi.jpg','onizleme-1440.png','onizleme-390.png','tum-set.jpg']:
 p=ROOT/'kontrol'/name
 if p.exists():files.append(p)
with zipfile.ZipFile(ROOT/'demlik-demini-al.zip','w',zipfile.ZIP_DEFLATED,9) as z:
 for p in files:z.write(p,p.relative_to(ROOT))
with zipfile.ZipFile(ROOT/'demlik-demini-al.zip') as z:assert z.testzip() is None
print(f'TESLIM.md + 5 reklam ZIP + teslim arşivi hazır ({(ROOT/"demlik-demini-al.zip").stat().st_size/1024/1024:.2f} MB).')
