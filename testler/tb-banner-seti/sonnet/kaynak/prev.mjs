import fs from 'fs';
import { ROOT, FONT_CSS } from './kit.mjs';
const S = ['300x250','336x280','728x90','970x250','300x600','160x600','320x50','1080x1080','1080x1920','1200x628'];
const names = {'300x250':'Orta dikdörtgen','336x280':'Büyük dikdörtgen','728x90':'Leaderboard','970x250':'Billboard','300x600':'Half page','160x600':'Wide skyscraper','320x50':'Mobil banner','1080x1080':'Sosyal kare','1080x1920':'Story / Reels','1200x628':'Link / OG'};
const fit = (w,h,mw,mh)=>Math.min(1,mw/w,mh/h);
const png = S.map(k=>{const [w,h]=k.split('x').map(Number);return `<a class="card" href="png/${k}.png" target="_blank"><figure><img src="png/${k}.png" width="${w}" height="${h}" style="width:${Math.round(w*fit(w,h,w>=1000?520:w>700?700:420,h>1000?620:460))}px" alt="${k}"></figure><figcaption><b>${k}</b><span>${names[k]}</span></figcaption></a>`}).join('');
const anim = S.map(k=>{const [w,h]=k.split('x').map(Number);const sc=fit(w,h,w>=1000?520:w>700?700:420,h>1000?620:460);return `<div class="card"><div class="frame" style="width:${Math.round(w*sc)}px;height:${Math.round(h*sc)}px"><iframe id="f${k}" src="html5/${k}/index.html" width="${w}" height="${h}" style="transform:scale(${sc})" scrolling="no" title="${k}"></iframe></div><figcaption><b>${k}</b><span>${names[k]}</span><button onclick="var f=document.getElementById('f${k}');f.src=f.src">↻ Tekrar oynat</button></figcaption></div>`}).join('');
fs.writeFileSync(`${ROOT}/onizleme.html`,`<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Demlik — Demini Al · Banner seti</title><style>${FONT_CSS}
*{box-sizing:border-box;margin:0}
body{background:#140B18;color:#FFF3DE;font-family:NS,'Noto Sans',sans-serif;line-height:1.55;-webkit-font-smoothing:antialiased}
header{padding:64px 6vw 40px;background:linear-gradient(180deg,#160C26,#3a1a44 60%,#7b3050);border-bottom:1px solid #FFB45455;position:relative;overflow:hidden}
header::after{content:"";position:absolute;right:-120px;top:-120px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,#FFB454 0,#F0703A 45%,transparent 70%);opacity:.35}
.eb{font-weight:700;letter-spacing:.2em;font-size:13px;color:#FFB454;text-transform:uppercase}
h1{font-family:ND,serif;font-size:clamp(56px,9vw,132px);line-height:.92;letter-spacing:-.03em;margin:14px 0 18px}
h1 em{color:#FFB454}
header p{max-width:760px;font-size:17px;color:#FFE9C6;position:relative;z-index:1}
.sw{display:flex;gap:10px;margin-top:26px;flex-wrap:wrap;position:relative;z-index:1}
.sw span{font-size:12px;font-weight:700;padding:8px 14px;border-radius:99px;border:1px solid #ffffff33}
main{padding:20px 6vw 80px}
h2{font-family:ND,serif;font-size:36px;margin:54px 0 6px;letter-spacing:-.02em}
h2+p{color:#F2D3B0;opacity:.8;margin-bottom:24px;font-size:15px}
.grid{display:flex;flex-wrap:wrap;gap:34px 30px;align-items:flex-start}
.card{display:block;color:inherit;text-decoration:none}
.card img,.frame{display:block;border-radius:6px;box-shadow:0 10px 40px #0009,0 0 0 1px #ffffff1c}
.frame{position:relative;overflow:hidden;background:#000}
.frame iframe{border:0;transform-origin:0 0;position:absolute;left:0;top:0}
figcaption{display:flex;gap:10px;align-items:center;margin-top:10px;font-size:13px;color:#F2D3B0;flex-wrap:wrap}
figcaption b{color:#FFB454}
button{margin-left:auto;background:#FFB454;color:#2B0F1E;border:0;border-radius:99px;padding:5px 12px;font:700 12px NS,sans-serif;cursor:pointer}
.note{margin-top:60px;font-size:14px;color:#F2D3B0;opacity:.75;max-width:820px}
</style></head><body>
<header><div class="eb">Demlik · Ekim kampanyası · Banner seti</div><h1>Demini <em>al.</em></h1>
<p><b>Fikir:</b> Çayın “demi” bir zamanlayıcıdır. Güneş batarken ince belli bardak dem alır; ring kadran gibi dolar, çay koyulaşır — ve reklam kendi kendine söyler: <i>Çay acele sevmez. Demini al.</i> Yeni sonbahar harmanı <b>Kadıköy Akşamı</b>, ilk hafta atölyeye %20 indirim.</p>
<div class="sw"><span style="background:#2E1640">Alacakaranlık eflatun</span><span style="background:#F49A50;color:#2B0F1E">Ufuk turuncusu</span><span style="background:#FFB454;color:#2B0F1E">Dem kehribarı</span><span style="background:#E2382B">Lale kırmızısı</span><span style="background:#FFF3DE;color:#2B0F1E">Porselen krem</span></div></header>
<main>
<h2>Hareketli HTML5 — 10 boyut</h2><p>Her biri tek dosya (yazı tipleri gömülü), clickTag hazır, ~7 sn oynar, son kareyi tutar, bir kez tekrar eder (toplam ≤ 25 sn).</p><div class="grid">${anim}</div>
<h2>Statik PNG — 10 boyut</h2><p>Animasyonun son karesi (CTA dahil). Tam boyut için tıkla; <code>png/2x/</code> içinde küçük boyutların 2× sürümleri de var.</p><div class="grid">${png}</div>
<p class="note">Tüm görseller kodla üretildi (SVG/CSS): bardak, güneş kadranı, Kadıköy silüeti, martılar, mühür rozeti. Harici görsel/ikon/font dosyası yok; yazı tipleri açık lisanslı Noto Serif Display + Noto Sans (OFL).</p>
</main></body></html>`);
