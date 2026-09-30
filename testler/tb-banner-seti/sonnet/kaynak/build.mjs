import fs from 'fs';
import { ROOT, FONT_CSS, BASE_CSS, LOOP_JS, scene, hero, glassHero, logo, badge, arrow } from './kit.mjs';

const CTA = t => `<div class="cta">${t}${arrow}</div>`;
const tx = {
  eyebrow: 'Yeni sonbahar harmanı',
  sub: `<b>Kadıköy Akşamı</b> şimdi Demlik’te.`,
  offer: `İlk hafta atölyeye <i>%20</i> indirim`,
  foot: `Moda Cd. No: 42 Kadıköy · @demlik.kadikoy · demlik.com.tr`,
};

// hero: [x, y, h]  (svg 400x350; masa üstü = y + .92h)
const LAYOUTS = {
  '300x250': { W: 300, H: 250, hero: [118, 50, 172], sh: 30, css: `
.logo{left:14px;top:13px;font-size:14px}
.eyebrow{left:15px;top:44px;font-size:7.4px}
.f1,.head{left:14px;top:56px}.f1{font-size:29px;width:150px}.head{font-size:42px}
.sub{left:15px;top:146px;width:118px;font-size:10.5px}
.badge{right:8px;top:9px;width:70px;height:70px;font-size:70px}
.cta{left:14px;top:215px;width:112px;height:27px;font-size:11.5px}
.foot{left:15px;top:190px;font-size:8px}.foot .a,.foot .b{display:none}
.offer{display:none}` },
  '336x280': { W: 336, H: 280, hero: [132, 56, 192], sh: 34, css: `
.logo{left:16px;top:14px;font-size:15.5px}
.eyebrow{left:17px;top:49px;font-size:8.2px}
.f1,.head{left:16px;top:63px}.f1{font-size:32px;width:170px}.head{font-size:50px}
.sub{left:17px;top:164px;width:132px;font-size:11.6px}
.badge{right:9px;top:10px;width:78px;height:78px;font-size:78px}
.cta{left:16px;top:241px;width:126px;height:30px;font-size:12.5px}
.foot{left:17px;top:213px;font-size:9px}.foot .a,.foot .b{display:none}
.offer{display:none}` },
  '728x90': { W: 728, H: 90, hero: [138, 0, 88], sh: 16, css: `
.logo{left:16px;top:26px;font-size:20px}
.eyebrow{display:none}
.f1,.head{left:236px;top:14px}.f1{font-size:33px;white-space:nowrap}.head{font-size:40px;white-space:nowrap}
.f1 .ln,.head .ln{display:inline-block}
.head .ln{margin-right:.22em}
.sub{left:238px;top:59px;font-size:12.5px;white-space:nowrap}
.badge{left:494px;top:8px;width:74px;height:74px;font-size:74px}
.offer{display:none}
.cta{right:16px;top:16px;width:128px;height:34px;font-size:14px}
.foot{right:16px;top:60px;font-size:10px;width:128px;text-align:center}.foot .a,.foot .b{display:none}` },
  '970x250': { W: 970, H: 250, hero: [432, 12, 222], sh: 28, css: `
.logo{left:36px;top:18px;font-size:25px}
.eyebrow{left:38px;top:80px;font-size:12px}
.f1,.head{left:36px;top:97px;white-space:nowrap}.f1{font-size:56px}.head{font-size:72px}
.f1 .ln,.head .ln{display:inline-block}.head .ln{margin-right:.2em}
.sub{left:38px;top:174px;font-size:19px}
.badge{left:664px;top:22px;width:134px;height:134px;font-size:134px}
.offer{display:none}
.cta{left:812px;top:108px;width:146px;height:42px;font-size:16px}
.foot{left:814px;top:166px;font-size:11.5px;white-space:normal;line-height:1.5}.foot .a{display:block}.foot .b{display:block}.foot s{display:none}` },
  '300x600': { W: 300, H: 600, hero: [17, 252, 268], sh: 62, css: `
.logo{left:20px;top:20px;font-size:22px}
.eyebrow{left:22px;top:82px;font-size:10.5px}
.f1,.head{left:20px;top:98px}.f1{font-size:50px;width:270px}.head{font-size:70px}
.sub{left:22px;top:238px;width:200px;font-size:15px}
.badge{right:8px;top:186px;width:106px;height:106px;font-size:106px}
.offer{display:none}
.cta{left:20px;top:530px;width:260px;height:40px;font-size:16.5px}
.foot{left:22px;top:578px;font-size:9.5px}.foot .a{display:none}` },
  '160x600': { W: 160, H: 600, hero: [-23, 232, 180], sh: 44, css: `
.logo{left:14px;top:16px;font-size:17px}
.eyebrow{left:15px;top:66px;font-size:7.6px;letter-spacing:.12em}
.f1,.head{left:14px;top:84px}.f1{font-size:29px;width:140px}.head{font-size:39px}
.sub{left:15px;top:168px;width:126px;font-size:12px}
.badge{left:36px;top:412px;width:88px;height:88px;font-size:88px;display:flex}
.offer{display:none}
.cta{left:14px;top:508px;width:132px;height:38px;font-size:14px}
.foot{left:14px;top:558px;font-size:8.4px;white-space:normal;line-height:1.5}.foot .a,.foot .b{display:none}` },
  '320x50': { W: 320, H: 50, hero: [4, -2, 52], sh: 7, css: `
.logo{display:none}
.eyebrow{display:none}
.f1,.head{left:60px;top:3px;white-space:nowrap}.f1{font-size:19px}.head{font-size:22px}
.f1 .ln,.head .ln{display:inline-block}.head .ln{margin-right:.2em}
.sub{display:none}.badge{display:none}
.offer{left:62px;top:28px;font-size:9px}.offer i{color:#FFB454}.offer::before{content:'demlik · ';font-family:ND,serif;font-size:11px;color:#FFB454;letter-spacing:0}
.cta{right:8px;top:11px;width:88px;height:28px;font-size:11.5px}
.foot{display:none}` },
  '1080x1080': { W: 1080, H: 1080, hero: [420, 216, 660], sh: 130, css: `
.logo{left:64px;top:60px;font-size:54px}
.eyebrow{left:68px;top:186px;font-size:26px}
.f1,.head{left:60px;top:224px}.f1{font-size:118px;width:560px}.head{font-size:186px}
.sub{left:68px;top:606px;width:420px;font-size:40px}
.badge{left:66px;top:760px;width:234px;height:234px;font-size:234px}
.offer{display:none}
.cta{right:64px;top:906px;width:420px;height:100px;font-size:40px}
.foot{left:68px;top:1024px;font-size:26px}.foot .a,.foot .b{display:inline}` },
  '1080x1920': { W: 1080, H: 1920, hero: [200, 912, 680], sh: 210, css: `
.logo{left:70px;top:130px;font-size:66px}
.eyebrow{left:76px;top:296px;font-size:32px}
.f1,.head{left:66px;top:336px}.f1{font-size:170px;width:900px}.head{font-size:252px}
.sub{left:76px;top:840px;width:960px;font-size:56px}
.badge{left:44px;top:1176px;width:320px;height:320px;font-size:320px}
.offer{display:none}
.cta{left:110px;top:1612px;width:860px;height:150px;font-size:58px}
.foot{left:0;right:0;top:1792px;text-align:center;font-size:30px}` },
  '1200x628': { W: 1200, H: 628, hero: [650, 46, 550], sh: 90, css: `
.logo{left:64px;top:44px;font-size:40px}
.eyebrow{left:68px;top:132px;font-size:20px}
.f1,.head{left:60px;top:160px}.f1{font-size:88px;width:560px}.head{font-size:138px}
.sub{left:68px;top:430px;width:500px;font-size:29px}
.badge{left:1004px;top:28px;width:164px;height:164px;font-size:164px}
.offer{display:none}
.cta{left:64px;top:540px;width:290px;height:62px;font-size:24px}
.foot{left:388px;top:559px;font-size:17px}.foot .a{display:none}` },
};

function page(key, L) {
  const { W, H } = L, [hx, hy, hh] = L.hero, hw = hh * 400 / 350, TT = Math.round(hy + .92 * hh);
  const box = `left:${hx}px;top:${hy}px;width:${hw.toFixed(1)}px;height:${hh}px`;
  const big = W >= 728 && H >= 250 || W >= 1000;
  return `<!DOCTYPE html>
<html lang="tr"><head><meta charset="utf-8">
<meta name="ad.size" content="width=${W},height=${H}">
<title>Demlik — Demini Al · ${key}</title>
<style>${FONT_CSS}${BASE_CSS}
#ad{width:${W}px;height:${H}px}
.bg{height:${TT}px}.table{top:${TT}px}
.sun,.hero{${box}}
${L.css}
</style></head><body>
<script>var clickTag="https://demlik.com.tr";</script>
<a id="ad" class="go" href="https://demlik.com.tr" target="_blank" onclick="window.open(window.clickTag,'_blank');return false" aria-label="Demlik — Demini Al">
<div class="bg"></div>
${hero()}
${scene(W, H, TT, L.sh, { gulls: H >= 250, stars: Math.round(W * H / 9000) + 6, seed: W % 13 + 3 })}
<div class="table"></div>
${glassHero()}
${logo()}
<div class="f1"><span class="ln"><span>Çay acele</span></span> <span class="ln"><span>sevmez.</span></span></div>
<div class="eyebrow">${tx.eyebrow}</div>
<div class="head"><span class="ln"><span>Demini</span></span> <span class="ln"><span><em>al.</em></span></span></div>
<div class="sub">${tx.sub}</div>
${badge()}
<div class="offer">${tx.offer}</div>
${CTA('Yerini ayır')}
<div class="foot"><span class="a">Moda Cd. No: 42 Kadıköy<s> · </s></span><span class="b">@demlik.kadikoy<s> · </s></span>demlik.com.tr</div>
</a>
<script>${LOOP_JS}</script>
</body></html>`;
}

const only = process.argv[2];
for (const [k, L] of Object.entries(LAYOUTS)) {
  if (only && only !== k) continue;
  fs.mkdirSync(`${ROOT}/html5/${k}`, { recursive: true });
  fs.writeFileSync(`${ROOT}/html5/${k}/index.html`, page(k, L));
}
export { LAYOUTS };
