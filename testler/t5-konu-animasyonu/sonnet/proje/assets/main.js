/* Mevsimler neden oluşur? — ana kompozisyon. Tüm tuval çizimi saf bir draw(t) fonksiyonudur. */
(function () {
  const tl = gsap.timeline({ paused: true });
  window.__mainTl = tl;
  function build() {
  const { TAU, D2R, clamp, lerp, smooth, easeOut, easeInOut, easeOutBack, sstep, kf, norm, vadd, vmul, dot } = E;
  const TM = window.TIMING;
  const S = TM.starts, TOTAL = TM.total;
  const w = (k, i) => S[k] + TM.words[k][i].t;
  const we = (k, i) => S[k] + TM.words[k][i].t + TM.words[k][i].d;
  ['800 60px Bricolage', '700 30px InterV', '650 30px InterV'].forEach((f) => document.fonts.load(f, 'ĞÜŞİÖÇığüşöç'));
  E.initLand();
  E.buildTex();

  const cv = document.getElementById('gl');
  const ctx = cv.getContext('2d');

  // ---------- sahne pencereleri ----------
  const keys = ['s1', 's2', 's3', 's4', 's5', 's6'];
  const B = {};
  keys.forEach((k, i) => (B[k] = i === 0 ? 0 : S[k] - 0.35));
  const FADE = 0.6;
  function sceneAlpha(k, t) {
    const i = keys.indexOf(k);
    const a = B[k];
    const b = i < 5 ? B[keys[i + 1]] : TOTAL - 0.7;
    const inA = i === 0 ? 1 : smooth((t - a) / FADE);
    const outA = 1 - smooth((t - b) / FADE);
    return inA * outA;
  }

  // ---------- yıldızlar ----------
  function rng(seed) { return function () { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const R0 = rng(7);
  const STARS = [];
  for (let i = 0; i < 300; i++) STARS.push({ x: R0() * 1920, y: R0() * 1080, r: 0.4 + R0() * 1.5, p: R0() * TAU, s: 0.5 + R0() * 2.2, l: 0.2 + R0() * 0.8 });
  function drawStars(t) {
    for (const s of STARS) {
      const x = ((s.x - t * 3 * s.l) % 1920 + 1920) % 1920;
      const a = (0.25 + 0.55 * s.l) * (0.65 + 0.35 * Math.sin(t * s.s + s.p));
      ctx.globalAlpha = a;
      ctx.fillStyle = s.r > 1.4 ? '#cfe4ff' : '#ffffff';
      ctx.beginPath(); ctx.arc(x, s.y, s.r, 0, TAU); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // ---------- yardımcı çizimler ----------
  function drawSun(x, y, r, a, t) {
    if (a <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = a;
    const g = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 3.8);
    g.addColorStop(0, 'rgba(255,190,80,0.6)');
    g.addColorStop(0.35, 'rgba(255,140,40,0.16)');
    g.addColorStop(1, 'rgba(255,120,30,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3.8, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(255,210,120,0.45)'; ctx.lineCap = 'round';
    const n = 28;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * TAU + t * 0.06;
      const l1 = r * 1.1, l2 = r * (1.24 + 0.14 * Math.sin(i * 2.7 + t * 1.6));
      ctx.lineWidth = Math.max(1.5, r * 0.035);
      ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * l1, y + Math.sin(ang) * l1); ctx.lineTo(x + Math.cos(ang) * l2, y + Math.sin(ang) * l2); ctx.stroke();
    }
    const d = ctx.createRadialGradient(x - r * 0.28, y - r * 0.3, r * 0.05, x, y, r);
    d.addColorStop(0, '#fffbe0'); d.addColorStop(0.45, '#ffd25a'); d.addColorStop(1, '#ff8a1f');
    ctx.fillStyle = d; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.restore();
  }

  function txt(str, x, y, o = {}) {
    ctx.save();
    ctx.globalAlpha = o.a ?? 1;
    ctx.font = `${o.weight || 700} ${o.size || 28}px ${o.font || 'InterV'}`;
    ctx.fillStyle = o.color || '#f6f1e7';
    ctx.textAlign = o.align || 'center';
    ctx.textBaseline = o.base || 'middle';
    if (o.spacing) ctx.letterSpacing = o.spacing + 'px';
    if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = 16; }
    ctx.fillText(str, x, y);
    ctx.restore();
  }

  function earthAt(x, y, R, o) {
    // o: eps, h0, e, spin, sun, alpha, haloA, clouds
    const { a, ref } = E.axisFor(o.eps, o.h0 || [-1, 0, 0]);
    const cam = E.camera(o.e);
    ctx.save();
    ctx.globalAlpha = o.alpha ?? 1;
    E.halo(ctx, x, y, R, o.haloA ?? 1);
    E.renderGlobe(ctx, x, y, R, { cam, basis: E.earthBasis(a, ref, o.spin), sun: o.sun, clouds: o.clouds });
    ctx.restore();
    const ax = dot(a, cam.right), ay = -dot(a, cam.up); // ekran (y aşağı)
    return { ax, ay, a, cam };
  }

  function axisLine(x, y, R, ax, ay, alpha, opts = {}) {
    const top = opts.top ?? 1.45, bot = opts.bot ?? 1.3;
    const l = Math.hypot(ax, ay); const ux = ax / l, uy = ay / l;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(255,209,102,.9)'; ctx.shadowBlur = 16;
    ctx.strokeStyle = '#ffd166'; ctx.lineWidth = opts.w ?? 4;
    ctx.beginPath(); ctx.moveTo(x + ux * R * 0.98, y + uy * R * 0.98); ctx.lineTo(x + ux * R * top, y + uy * R * top); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - ux * R * 0.98, y - uy * R * 0.98); ctx.lineTo(x - ux * R * bot, y - uy * R * bot); ctx.stroke();
    ctx.shadowBlur = 0; ctx.globalAlpha = alpha * 0.35; ctx.setLineDash([2, 10]); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - ux * R * 0.98, y - uy * R * 0.98); ctx.lineTo(x + ux * R * 0.98, y + uy * R * 0.98); ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = alpha; ctx.fillStyle = '#ffd166'; ctx.shadowColor = 'rgba(255,209,102,.9)'; ctx.shadowBlur = 14;
    ctx.beginPath(); ctx.arc(x + ux * R * top, y + uy * R * top, opts.dot ?? 8, 0, TAU); ctx.fill();
    ctx.restore();
    return { tx: x + ux * R * top, ty: y + uy * R * top, ux, uy };
  }

  function tiltBack(x, y, R, e, a) {
    if (a <= 0.001) return;
    const rx = R * 1.85, ry = rx * Math.sin(e);
    ctx.save(); ctx.globalAlpha = a;
    const g = ctx.createRadialGradient(x, y, R * 0.6, x, y, rx);
    g.addColorStop(0, 'rgba(90,150,255,0.14)'); g.addColorStop(1, 'rgba(90,150,255,0.02)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(140,190,255,0.5)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, Math.PI, TAU); ctx.stroke();
    ctx.restore();
  }
  function tiltFront(x, y, R, e, a, label) {
    if (a <= 0.001) return;
    const rx = R * 1.85, ry = rx * Math.sin(e);
    ctx.save(); ctx.globalAlpha = a;
    ctx.strokeStyle = 'rgba(140,190,255,0.75)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI); ctx.stroke();
    ctx.restore();
    if (label) txt('yörünge düzlemi', x + rx * 0.9, y + ry * 0.55 + 52, { size: 25, weight: 600, color: 'rgba(160,205,255,.85)', a });
  }
  function verticalRef(x, y, R, a) {
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(246,241,231,.7)'; ctx.lineWidth = 2.5; ctx.setLineDash([12, 10]);
    ctx.beginPath(); ctx.moveTo(x, y - R * 1.45); ctx.lineTo(x, y + R * 1.3); ctx.stroke(); ctx.restore();
  }
  function tiltArc(x, y, R, ax, ay, a, label, p = 1) {
    if (a <= 0.001) return;
    const rr = R * 1.12;
    const angA = Math.atan2(ay, ax), angV = -Math.PI / 2;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(255,209,102,.8)'; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(x, y, rr, angA, angA + (angV - angA) * p, false); ctx.stroke();
    ctx.restore();
    if (label) {
      const mid = (angA + angV) / 2;
      txt(label, x + Math.cos(mid) * (rr + 62), y + Math.sin(mid) * (rr + 46), { size: 50, weight: 800, font: 'Bricolage', color: '#ffd166', a, shadow: 'rgba(0,0,0,.6)' });
    }
  }
  function polaris(x, y, a, t) {
    if (a <= 0.001) return;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 70);
    g.addColorStop(0, 'rgba(255,250,220,.85)'); g.addColorStop(0.3, 'rgba(255,230,160,.28)'); g.addColorStop(1, 'rgba(255,230,160,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 70, 0, TAU); ctx.fill();
    const pulse = 1 + 0.08 * Math.sin(t * 3);
    ctx.fillStyle = '#fffbe6';
    for (let k = 0; k < 2; k++) {
      ctx.rotate(k * Math.PI / 4);
      const L = (k === 0 ? 30 : 18) * pulse;
      ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(4, -4); ctx.lineTo(L, 0); ctx.lineTo(4, 4); ctx.lineTo(0, L); ctx.lineTo(-4, 4); ctx.lineTo(-L, 0); ctx.lineTo(-4, -4); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }

  // ---------- yörünge sahnesi ----------
  const ORB = { cx: 960, cy: 560, A: 530, e: 0.42, R0: 76 };
  function orbitPos(th) {
    const P = [Math.cos(th), 0, Math.sin(th)];
    return { P, x: ORB.cx + P[0] * ORB.A, y: ORB.cy + Math.sin(ORB.e) * ORB.A * P[2], R: ORB.R0 * (1 + 0.24 * P[2]) };
  }
  function drawOrbitRing(a, theta, trailA) {
    if (a <= 0.001) return;
    const ry = ORB.A * Math.sin(ORB.e);
    ctx.save(); ctx.globalAlpha = a;
    ctx.strokeStyle = 'rgba(160,190,255,0.28)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(ORB.cx, ORB.cy, ORB.A, ry, 0, 0, TAU); ctx.stroke();
    // iz
    if (trailA > 0.001) {
      for (let i = 0; i < 70; i++) {
        const th0 = theta + i * 0.032, th1 = theta + (i + 1) * 0.032;
        const p0 = orbitPos(th0), p1 = orbitPos(th1);
        ctx.strokeStyle = `rgba(255,214,140,${0.7 * (1 - i / 70) * trailA})`;
        ctx.lineWidth = 4 * (1 - i / 90);
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
      }
    }
    // istasyonlar
    const st = [[Math.PI / 2, '21 Mart', 0, 128], [0, '21 Haziran', 160, 0], [-Math.PI / 2, '23 Eylül', 0, -92], [Math.PI, '21 Aralık', -160, 0]];
    for (const [th, lab, dx, dy] of st) {
      const p = orbitPos(th);
      ctx.fillStyle = 'rgba(200,220,255,.7)'; ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, TAU); ctx.fill();
      txt(lab, p.x + dx, p.y + dy, { size: 26, weight: 650, color: 'rgba(210,225,255,.68)' });
    }
    ctx.restore();
  }

  /**
   * c: { alpha, free:{x,y,R,e,sun}, orb, orbA, theta, eps, spin, axisA, trailA, tiltA, tiltLabel, arcA, arcLabel, arcP, refA, polA, sunA, showN }
   */
  function drawWorld(c, t) {
    const op = orbitPos(c.theta);
    const orb = c.orb;
    const x = lerp(c.free.x, op.x, orb), y = lerp(c.free.y, op.y, orb), R = lerp(c.free.R, op.R, orb);
    const e = lerp(c.free.e, ORB.e, orb);
    const so = vmul(op.P, -1);
    const sun = norm([lerp(c.free.sun[0], so[0], orb), lerp(c.free.sun[1], so[1], orb), lerp(c.free.sun[2], so[2], orb)]);
    const behind = orb > 0.5 && op.P[2] < 0;

    drawOrbitRing(c.orbA, c.theta, c.trailA);
    tiltBack(x, y, R, e, c.tiltA);
    const earth = () => {
      const r = earthAt(x, y, R, { eps: c.eps, e, spin: c.spin, sun, alpha: c.alpha, haloA: c.alpha });
      if (c.refA > 0.001) verticalRef(x, y, R, c.refA * c.alpha);
      const tip = axisLine(x, y, R, r.ax, r.ay, c.axisA * c.alpha, { top: c.tipTop ?? 1.45 });
      if (c.arcA > 0.001) tiltArc(x, y, R, r.ax, r.ay, c.arcA * c.alpha, c.arcLabel, c.arcP ?? 1);
      if (c.axLabelA > 0.001) txt('dönme ekseni', tip.tx - 24, tip.ty + 2, { size: 28, weight: 700, color: '#ffd166', align: 'right', a: c.axLabelA * c.alpha });
      if (c.showN > 0.001) txt('KUZEY', tip.tx + tip.ux * 26, tip.ty + tip.uy * 26 - 6, { size: 22, weight: 800, color: '#ffd166', a: c.showN * c.alpha, spacing: 3 });
      if (c.polA > 0.001) {
        const px = x + tip.ux * R * 1.85, py = y + tip.uy * R * 1.85;
        ctx.save(); ctx.globalAlpha = c.polA * c.alpha; ctx.strokeStyle = 'rgba(255,240,190,.5)'; ctx.lineWidth = 2; ctx.setLineDash([3, 9]); ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(tip.tx + tip.ux * 12, tip.ty + tip.uy * 12); ctx.lineTo(px - tip.ux * 30, py - tip.uy * 30); ctx.stroke(); ctx.restore();
        polaris(px, py, c.polA * c.alpha, t);
        txt('Kutup Yıldızı', px + 96, py + 4, { size: 30, weight: 700, color: '#fff2c4', align: 'left', a: c.polA * c.alpha });
      }
    };
    if (behind) earth();
    if (c.sunA > 0.001) drawSun(ORB.cx, ORB.cy, 74, c.sunA, t);
    if (!behind) earth();
    tiltFront(x, y, R, e, c.tiltA, c.tiltLabel);
    return { x, y, R };
  }

  // ---------- SAHNE ÇİZİMLERİ ----------
  function drawS1(t, a) {
    const ts = t - S.s1;
    // köşe güneşi
    ctx.save(); ctx.globalAlpha = a * 0.85;
    const g = ctx.createRadialGradient(1960, -80, 40, 1960, -80, 1000);
    g.addColorStop(0, 'rgba(255,190,90,0.75)'); g.addColorStop(0.25, 'rgba(255,130,40,0.25)'); g.addColorStop(1, 'rgba(255,120,30,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080); ctx.restore();
    const grow = easeOut((ts - 0.1) / 1.6);
    const dim = 1 - 0.55 * smooth((ts - (w('s1', 19) - S.s1)) / 0.4);
    const R = 262 * (0.82 + 0.18 * grow);
    earthAt(1450, 580, R, { eps: 23.5 * D2R, e: 0.16, spin: 1.3 + t * 0.32, sun: norm([0.7, 0.5, 0.5]), alpha: a * grow * dim, haloA: dim });
  }

  const S2 = { sunX: 60, sunY: 575, sunR: 210, y1: 420, y2: 730, k: 8.9 };
  function drawS2(t, a) {
    const ts = t - S.s2;
    const rel = (k, i) => w(k, i) - S.s2;
    drawSun(S2.sunX, S2.sunY, S2.sunR, a, t);
    const rows = [
      { y: S2.y1, d: 147.1, h0: [1, 0, 0], p: easeInOut((ts - 1.0) / 2.4), col: '127,207,255', spin: 0.6 },
      { y: S2.y2, d: 152.1, h0: [-1, 0, 0], p: easeInOut((ts - (rel('s2', 12) - 0.2)) / 2.0), col: '255,181,46', spin: 2.4 },
    ];
    const hi = smooth((ts - rel('s2', 22)) / 0.5);
    rows.forEach((r, i) => {
      if (r.p <= 0.001) return;
      const xEnd = S2.sunX + r.d * S2.k;
      const ex = lerp(S2.sunX + S2.sunR + 90, xEnd, r.p);
      const R = 50;
      // cetvel çizgisi
      ctx.save(); ctx.globalAlpha = a * Math.min(1, r.p * 3);
      const active = i === 0 ? hi : 0;
      ctx.strokeStyle = `rgba(${active > 0.01 ? '87,230,184' : '246,241,231'},${0.5 + 0.4 * active})`;
      ctx.lineWidth = 3 + 2 * active; ctx.lineCap = 'round'; ctx.setLineDash([1, 15]);
      ctx.beginPath(); ctx.moveTo(S2.sunX + S2.sunR + 30, r.y); ctx.lineTo(ex - R - 14, r.y); ctx.stroke(); ctx.setLineDash([]);
      // 50 milyon km çentikleri
      ctx.strokeStyle = 'rgba(246,241,231,.5)'; ctx.lineWidth = 2;
      for (let m = 50; m <= 150; m += 50) {
        const tx = S2.sunX + m * S2.k;
        if (tx < ex - R - 20 && tx > S2.sunX + S2.sunR + 40) { ctx.beginPath(); ctx.moveTo(tx, r.y - 12); ctx.lineTo(tx, r.y + 12); ctx.stroke(); }
      }
      ctx.restore();
      // dünya
      const glow = active * (0.6 + 0.4 * Math.sin(t * 6));
      if (glow > 0.01) {
        ctx.save(); ctx.globalAlpha = a * glow * 0.5;
        const gg = ctx.createRadialGradient(ex, r.y, R, ex, r.y, R * 2.6);
        gg.addColorStop(0, 'rgba(87,230,184,.7)'); gg.addColorStop(1, 'rgba(87,230,184,0)');
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(ex, r.y, R * 2.6, 0, TAU); ctx.fill(); ctx.restore();
      }
      earthAt(ex, r.y, R, { eps: 23.5 * D2R, h0: r.h0, e: 0.14, spin: r.spin + t * 0.5, sun: norm([-1, 0.05, 0.28]), alpha: a * Math.min(1, r.p * 4), haloA: 0.8 });
    });
    // parantez
    const bp = easeOut((ts - (rel('s2', 18) - 0.05)) / 0.7);
    if (bp > 0.001) {
      const bx = S2.sunX + 152.1 * S2.k + 92;
      ctx.save(); ctx.globalAlpha = a * bp; ctx.strokeStyle = '#57e6b8'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(87,230,184,.7)'; ctx.shadowBlur = 14;
      const y1 = S2.y1 + (S2.y2 - S2.y1) * (0.5 - 0.5 * bp), y2 = S2.y1 + (S2.y2 - S2.y1) * (0.5 + 0.5 * bp);
      ctx.beginPath(); ctx.moveTo(bx - 22, y1); ctx.lineTo(bx, y1); ctx.lineTo(bx, y2); ctx.lineTo(bx - 22, y2); ctx.stroke(); ctx.restore();
    }
  }

  // sahne 3 + 4 birlikte: tek kahraman Dünya
  const FREE3 = { x: 640, y: 560, R: 270, e: 0.21, sun: norm([0.5, 0.2, 0.84]) };
  function thetaS4(t) {
    const r = t - S.s4;
    const jun = w('s4', 12) - S.s4 - 0.15, dec = w('s4', 18) - S.s4 - 0.1;
    return kf(r, [[0, Math.PI / 2], [1.5, Math.PI / 2], [jun, 0], [jun + 2.0, -0.13], [jun + 2.1, -0.13], [dec, -Math.PI - 0.02], [dec + 4.5, -Math.PI - 0.55]], easeInOut);
  }
  function drawS34(t) {
    const heroA = smooth((t - B.s3) / FADE) * (1 - smooth((t - B.s5) / FADE));
    if (heroA <= 0.001) return;
    const r3 = t - S.s3, r4 = t - S.s4;
    const eps = kf(r3, [[0, 0], [w('s3', 6) - S.s3, 0], [w('s3', 14) - S.s3 + 0.15, 23.5 * D2R]], easeInOut);
    const orb = easeInOut(r4 / 1.5);
    const inS4 = smooth((t - B.s4) / 0.5);
    const c = {
      alpha: heroA, free: FREE3, orb, orbA: smooth((r4 - 0.3) / 1.0) * heroA, theta: thetaS4(t), eps,
      spin: 0.9 + t * 0.55,
      axisA: smooth((r3 - (w('s3', 5) - S.s3)) / 0.6),
      trailA: smooth((r4 - 3) / 1.5), tiltA: (1 - smooth(r4 / 0.7)) * smooth((r3 - (w('s3', 5) - S.s3)) / 0.6) * heroA,
      tiltLabel: r4 < 0.2, arcA: smooth((r3 - (w('s3', 10) - S.s3 - 0.3)) / 0.5) * (1 - smooth(r4 / 0.5)), arcLabel: null, arcP: 1,
      refA: smooth((r3 - (w('s3', 5) - S.s3)) / 0.6) * (1 - smooth(r4 / 0.5)),
      polA: smooth((r3 - (w('s3', 17) - S.s3 - 0.1)) / 0.8) * (1 - smooth(r4 / 0.5)),
      sunA: smooth((r4 - 0.5) / 1.0) * heroA, showN: smooth((r4 - 4) / 0.6) * (1 - smooth((r4 - 13) / 0.8)),
      tipTop: lerp(1.42, 1.5, orb),
      axLabelA: smooth((r3 - (w('s3', 5) - S.s3)) / 0.6) * (1 - smooth((r3 - 11.4) / 0.6)),
    };
    drawWorld(c, t);
  }

  const FREE6 = { x: 1330, y: 560, R: 270, e: 0.21, sun: norm([-0.55, 0.2, 0.8]) };
  function drawS6(t) {
    const a = sceneAlpha('s6', t);
    if (a <= 0.001) return;
    const r = t - S.s6;
    const relw = (i) => w('s6', i) - S.s6;
    const eps = kf(r, [[0, 23.5 * D2R], [relw(7) - 0.05, 23.5 * D2R], [relw(9) + 0.25, 0], [relw(12) - 0.2, 0], [relw(12) + 1.3, 23.5 * D2R]], easeInOut);
    const orb = easeInOut((r - (relw(12) - 0.1)) / 1.6);
    const endDim = 1 - smooth((t - (we('s6', 25) + 0.05)) / 0.5);
    const arcVis = 1 - smooth((r - (relw(12) - 0.1)) / 0.5);
    const c = {
      alpha: a * endDim, free: FREE6, orb, orbA: orb * a * endDim, theta: -0.23, eps, spin: 2.1 + t * 0.5,
      axisA: 1, trailA: 0, tiltA: smooth((r - 0.4) / 0.6) * arcVis, tiltLabel: false,
      arcA: smooth((r - 0.6) / 0.6) * arcVis * smooth(eps / (3 * D2R)), arcLabel: (eps / D2R).toFixed(1).replace('.', ',') + '°', arcP: 1,
      refA: smooth((r - 0.4) / 0.6) * arcVis, polA: 0, sunA: orb * a * endDim, showN: 0, tipTop: 1.42,
    };
    const pos = drawWorld(c, t);
    // güneş-dünya mesafe çizgisi
    const la = easeOut((r - (relw(20) - 0.2)) / 1.4) * orb * a * endDim;
    if (la > 0.001) {
      const op = orbitPos(-0.23);
      const sx = ORB.cx + 80, sy = ORB.cy;
      const ex = lerp(sx, op.x - op.R - 18, easeOut((r - (relw(20) - 0.2)) / 1.4)), ey = lerp(sy, op.y, easeOut((r - (relw(20) - 0.2)) / 1.4));
      ctx.save(); ctx.globalAlpha = la; ctx.strokeStyle = '#ffb52e'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([1, 15]);
      ctx.shadowColor = 'rgba(255,181,46,.8)'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.restore();
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, 1920, 1080);
    drawStars(t);
    const a1 = sceneAlpha('s1', t); if (a1 > 0.001) drawS1(t, a1);
    const a2 = sceneAlpha('s2', t); if (a2 > 0.001) drawS2(t, a2);
    drawS34(t);
    drawS6(t);
  }
  window.__draw = draw;

  // ================= DOM ZAMAN ÇİZELGESİ =================
  const IN = (sel, at, o = {}) => tl.fromTo(sel, { opacity: 0, y: o.y ?? 34, x: o.x ?? 0, scale: o.s ?? 1 }, { opacity: 1, y: 0, x: 0, scale: 1, duration: o.d ?? 0.7, ease: o.ease ?? 'power3.out' }, at);
  const OUT = (sel, at, o = {}) => tl.to(sel, { opacity: 0, y: o.y ?? -24, duration: o.d ?? 0.45, ease: 'power2.in' }, at);

  // canvas'ı süren sahte tween (modifier her render'da çalışır)
  const P = { t: 0 };
  tl.to(P, { t: TOTAL, duration: TOTAL, ease: 'none', modifiers: { t: (v) => { draw(v); return v; } } }, 0);

  // sahne kapları
  gsap.set('#sc1', { opacity: 1 });
  tl.to('#sc1', { opacity: 0, duration: FADE, ease: 'none' }, B.s2);
  ['s2', 's3', 's4', 's5'].forEach((k, i) => {
    const n = k.slice(1);
    tl.fromTo('#sc' + n, { opacity: 0 }, { opacity: 1, duration: FADE, ease: 'none' }, B[k]);
    tl.to('#sc' + n, { opacity: 0, duration: FADE, ease: 'none' }, B[keys[keys.indexOf(k) + 1]]);
  });
  tl.fromTo('#sc6', { opacity: 0 }, { opacity: 1, duration: FADE, ease: 'none' }, B.s6);
  tl.to('#sc6', { opacity: 0, duration: 0.7, ease: 'none' }, TOTAL - 0.7);

  // HUD
  tl.to('#prog', { scaleX: 1, duration: TOTAL, ease: 'none' }, 0);
  gsap.set('#prog', { scaleX: 0 });
  const chaps = [['s1', '01 · Yanılgı'], ['s2', '02 · Gerçek mesafe'], ['s3', '03 · Eğiklik'], ['s4', '04 · Yörünge'], ['s5', '05 · İki etki'], ['s6', '06 · Sonuç']];
  chaps.forEach(([k, s], i) => { if (i > 0) tl.set('#chap', { textContent: s }, B[k] + 0.3); });

  // ---- S1 ----
  const t1 = (i) => w('s1', i);
  const titleIds = ['#t1a', '#t1b', '#t1c', '#t1d', '#t1e', '#t1f', '#t1g'];
  titleIds.forEach((id, i) => IN(id, t1(i) - 0.05, { y: 60, d: 0.65, ease: 'back.out(1.6)' }));
  tl.to('#s1-title', { opacity: 0, y: -50, scale: 0.94, duration: 0.5, ease: 'power2.in', transformOrigin: '0 50%' }, t1(7) - 0.3);
  IN('#q-label', t1(8) - 0.1, { y: 20 });
  [['#qa', 12], ['#qb', 13], ['#qc', 14], ['#qd', 15], ['#qe', 16]].forEach(([id, i]) => IN(id, t1(i) - 0.05, { y: 50, d: 0.6, ease: 'back.out(1.5)' }));
  tl.fromTo('#q .strike', { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.28, stagger: 0.13, ease: 'power3.inOut' }, t1(19) - 0.05);
  gsap.set('#q .strike', { scaleX: 0 });
  tl.fromTo('#stamp', { opacity: 0, scale: 3, rotation: -18 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.32, ease: 'power4.in' }, t1(20) - 0.05);
  tl.fromTo('#flash', { opacity: 0 }, { opacity: 1, duration: 0.05 }, t1(20) + 0.25);
  tl.to('#flash', { opacity: 0, duration: 0.5, ease: 'power2.out' }, t1(20) + 0.3);
  [['#sc1', 14, 0.05], ['#sc1', -12, 0.1], ['#sc1', 8, 0.15], ['#sc1', -4, 0.2], ['#sc1', 0, 0.25]].forEach(([s, x, d]) => tl.to(s, { x, duration: 0.05 }, t1(20) + 0.25 + d));
  gsap.set('#stamp', { opacity: 0 });
  gsap.set('#q-label', { opacity: 0 });

  // ---- S2 ----
  const r2 = (i) => w('s2', i);
  IN('#r1tag', r2(4) - 0.2, { x: -30, y: 0 });
  IN('#r1num', r2(6) - 0.4, { y: 20, d: 0.5 });
  const n1 = { v: 0 }, n2 = { v: 0 };
  tl.to(n1, { v: 147.1, duration: 1.9, ease: 'power2.out', onUpdate: () => (document.getElementById('n1').textContent = n1.v.toFixed(1).replace('.', ',')) }, r2(7) - 0.1);
  IN('#r2tag', r2(12) - 0.2, { x: -30, y: 0 });
  IN('#r2num', r2(13) - 0.1, { y: 20, d: 0.5 });
  tl.to(n2, { v: 152.1, duration: 1.9, ease: 'power2.out', onUpdate: () => (document.getElementById('n2').textContent = n2.v.toFixed(1).replace('.', ',')) }, r2(14) - 0.1);
  IN('#br-text', r2(18), { x: 30, y: 0, d: 0.7 });
  IN('#verdict', r2(20) - 0.1, { y: 26 });
  gsap.set('#n1', { textContent: '0,0' }); gsap.set('#n2', { textContent: '0,0' });

  // ---- S3 ----
  const r3 = (i) => w('s3', i);
  IN('#s3-k', r3(0) - 0.1, { y: 16, d: 0.5 });
  tl.fromTo('#s3-h', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)', transformOrigin: '0 50%' }, r3(4) - 0.05);
  IN('#s3-num', r3(10) - 0.2, { y: 30, d: 0.6 });
  const n3 = { v: 0 };
  tl.to(n3, { v: 23.5, duration: 1.7, ease: 'power2.inOut', onUpdate: () => (document.getElementById('n3').textContent = n3.v.toFixed(1).replace('.', ',')) }, w('s3', 6) - 0.3 + 0.0);
  IN('#s3-note', r3(15) - 0.05, { y: 24, d: 0.6 });
  tl.to('#s3-r', { opacity: 0, duration: 0.5 }, B.s4 - 0.1);

  // ---- S4 ----
  const r4 = (i) => w('s4', i);
  const cardIn = (sel, at, x) => tl.fromTo(sel, { opacity: 0, y: 30, x }, { opacity: 1, y: 0, x: 0, duration: 0.6, ease: 'power3.out' }, at);
  cardIn('#c-jun', r4(12) - 0.35, 40);
  cardIn('#c-dec', r4(16) + 0.35, -40);
  tl.to('#c-jun', { opacity: 0.55, duration: 0.5 }, r4(17) + 0.4);
  gsap.set('#c-jun-s', { opacity: 0 }); gsap.set('#c-dec-s', { opacity: 0 });
  tl.to('#c-jun', { opacity: 1, duration: 0.4 }, r4(19) - 0.1);
  tl.fromTo('#c-jun-s', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, r4(19) + 0.1);
  tl.fromTo('#c-dec-s', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, r4(22) - 0.2);
  tl.fromTo('#sc4 .kicker', { opacity: 0 }, { opacity: 1, duration: 0.6 }, B.s4 + 1.2);
  gsap.set('#sc4 .kicker', { opacity: 0 });

  // ---- S5 ----
  const r5 = (i) => w('s5', i);
  IN('#chip1', r5(2) - 0.05, { y: 30, d: 0.55 });
  IN('#chip2', r5(3) + 0.1, { y: 30, d: 0.55 });
  tl.to('#chip1', { borderColor: 'rgba(255,181,46,.9)', backgroundColor: 'rgba(255,181,46,.14)', duration: 0.4 }, r5(5));
  tl.to('#chip1', { borderColor: 'rgba(255,255,255,.16)', backgroundColor: 'rgba(255,255,255,.07)', duration: 0.4 }, r5(26) - 0.3);
  tl.to('#chip2', { borderColor: 'rgba(255,181,46,.9)', backgroundColor: 'rgba(255,181,46,.14)', duration: 0.4 }, r5(26));

  function svgEl(tag, attrs) { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function buildLight(svgId, el, cx, warm, label) {
    const svg = document.getElementById(svgId);
    const GY = 380, wB = 120, D = 300;
    const rad = el * D2R, ux = Math.cos(rad), uy = -Math.sin(rad);
    const L = wB / Math.sin(rad);
    const xL = cx - L / 2, xR = cx + L / 2;
    const defs = svgEl('defs', {});
    const lg = svgEl('linearGradient', { id: svgId + '-g', x1: '0', y1: '0', x2: String(ux), y2: String(uy) });
    // gradient yönü: zeminden güneşe
    lg.setAttribute('gradientUnits', 'userSpaceOnUse');
    lg.setAttribute('x1', String(cx)); lg.setAttribute('y1', String(GY)); lg.setAttribute('x2', String(cx + ux * D)); lg.setAttribute('y2', String(GY + uy * D));
    [['0', 'rgba(255,190,70,0.16)'], ['1', 'rgba(255,200,90,0.55)']].forEach(([o, c]) => lg.appendChild(svgEl('stop', { offset: o, 'stop-color': c })));
    defs.appendChild(lg);
    const gl = svgEl('filter', { id: svgId + '-glow', x: '-50%', y: '-200%', width: '200%', height: '500%' });
    gl.appendChild(svgEl('feGaussianBlur', { stdDeviation: '9' }));
    defs.appendChild(gl);
    svg.appendChild(defs);
    // zemin
    svg.appendChild(svgEl('rect', { x: 0, y: GY, width: 760, height: 90, fill: 'rgba(255,255,255,0.05)' }));
    svg.appendChild(svgEl('line', { x1: 10, y1: GY, x2: 750, y2: GY, stroke: 'rgba(246,241,231,.55)', 'stroke-width': 4, 'stroke-linecap': 'round' }));
    const g = svgEl('g', { id: svgId + '-beam' });
    const poly = svgEl('polygon', { points: `${xL},${GY} ${xR},${GY} ${xR + ux * D},${GY + uy * D} ${xL + ux * D},${GY + uy * D}`, fill: `url(#${svgId}-g)` });
    g.appendChild(poly);
    // ışınlar
    for (let i = 0; i < 6; i++) {
      const f = (i + 0.5) / 6, bx = xL + (xR - xL) * f;
      g.appendChild(svgEl('line', { class: svgId + '-ray', x1: bx, y1: GY, x2: bx + ux * D, y2: GY + uy * D, stroke: 'rgba(255,225,140,.85)', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '14 22', 'stroke-dashoffset': '0' }));
    }
    g.appendChild(svgEl('line', { x1: xL, y1: GY, x2: xL + ux * D, y2: GY + uy * D, stroke: 'rgba(255,200,90,.5)', 'stroke-width': 2 }));
    g.appendChild(svgEl('line', { x1: xR, y1: GY, x2: xR + ux * D, y2: GY + uy * D, stroke: 'rgba(255,200,90,.5)', 'stroke-width': 2 }));
    svg.appendChild(g);
    // güneş
    const sxp = cx + ux * (D + 44), syp = GY + uy * (D + 44);
    const sg = svgEl('g', { id: svgId + '-sun' });
    sg.appendChild(svgEl('circle', { cx: sxp, cy: syp, r: 46, fill: 'rgba(255,190,70,.25)' }));
    sg.appendChild(svgEl('circle', { cx: sxp, cy: syp, r: 30, fill: '#ffd25a' }));
    svg.appendChild(sg);
    // zemin yaması
    const patchOp = warm ? 1 : 0.5;
    svg.appendChild(svgEl('line', { id: svgId + '-pg', x1: xL, y1: GY, x2: xR, y2: GY, stroke: warm ? '#ff9a2e' : '#ff9a2e', 'stroke-width': 20, 'stroke-linecap': 'round', filter: `url(#${svgId}-glow)`, opacity: patchOp }));
    svg.appendChild(svgEl('line', { id: svgId + '-p', x1: xL, y1: GY, x2: xR, y2: GY, stroke: warm ? '#fff3c4' : '#ffd9a0', 'stroke-width': 12, 'stroke-linecap': 'round', opacity: warm ? 1 : 0.6 }));
    // ölçü çizgisi
    const dm = svgEl('g', { id: svgId + '-dim' });
    dm.appendChild(svgEl('path', { d: `M${xL},${GY + 34} v14 H${xR} v-14`, fill: 'none', stroke: 'rgba(246,241,231,.85)', 'stroke-width': 3 }));
    const tx = svgEl('text', { x: cx, y: GY + 86, 'text-anchor': 'middle', fill: warm ? '#ffd45e' : '#7fcfff', 'font-family': 'InterV', 'font-weight': 800, 'font-size': 34 });
    tx.textContent = label; dm.appendChild(tx);
    svg.appendChild(dm);
    // açı yayı
    const ar = 74;
    const ax0 = xR + ar, ay0 = GY, ax1 = xR + Math.cos(rad) * ar, ay1 = GY - Math.sin(rad) * ar;
    const arc = svgEl('path', { id: svgId + '-arc', d: `M${ax0},${ay0} A${ar},${ar} 0 0 0 ${ax1},${ay1}`, fill: 'none', stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round' });
    svg.appendChild(arc);
    const am = rad / 2;
    const at = svgEl('text', { id: svgId + '-at', x: xR + Math.cos(am) * (ar + 46), y: GY - Math.sin(am) * (ar + 30) + 12, 'text-anchor': 'middle', fill: '#fff', 'font-family': 'Bricolage', 'font-weight': 800, 'font-size': 42 });
    at.textContent = Math.round(el) + '°';
    svg.appendChild(at);
    return { xL, xR, GY };
  }
  buildLight('svg-yaz', 73.4, 330, true, '1×  alan');
  buildLight('svg-kis', 26.6, 235, false, '≈ 2×  geniş alan');

  const pa = (id) => '#' + id;
  const showPanel = (pid, at, to) => {
    tl.fromTo(pid, { opacity: 0, y: 40 }, { opacity: to, y: 0, duration: 0.7, ease: 'power3.out' }, at);
  };
  showPanel('#pa-yaz', r5(5) + 0.35, 1);
  showPanel('#pa-kis', r5(5) + 0.65, 0.4);
  // ışınlar akar
  ['svg-yaz', 'svg-kis'].forEach((id) => {
    tl.fromTo('.' + id + '-ray', { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -360 }, duration: 12.5, ease: 'none' }, r5(5) + 0.4);
    tl.fromTo('#' + id + '-beam', { opacity: 0 }, { opacity: 1, duration: 0.8 }, r5(5) + 0.5);
    tl.fromTo('#' + id + '-sun', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, r5(5) + 0.5);
    tl.fromTo(['#' + id + '-arc', '#' + id + '-at'], { opacity: 0 }, { opacity: 1, duration: 0.5 }, r5(6) + 0.2);
    tl.fromTo('#' + id + '-dim', { opacity: 0 }, { opacity: 1, duration: 0.5 }, id === 'svg-yaz' ? r5(11) : r5(19));
  });
  gsap.set(['#m-yaz', '#m-kis'], { scaleX: 0 });
  gsap.set(['#pct-yaz', '#pct-kis'], { opacity: 0 });
  tl.to('#m-yaz', { scaleX: 1, duration: 1.0, ease: 'power2.out' }, r5(12));
  tl.fromTo('#pct-yaz', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5 }, r5(13));
  tl.to('#m-kis', { scaleX: 1, duration: 1.0, ease: 'power2.out' }, r5(21));
  tl.fromTo('#pct-kis', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5 }, r5(22));
  // vurgu: yaz -> kış
  tl.to('#pa-yaz', { opacity: 0.35, duration: 0.6 }, r5(17) - 0.1);
  tl.to('#pa-kis', { opacity: 1, duration: 0.6 }, r5(17) - 0.1);
  tl.to('#s5a', { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, r5(26) - 0.5);

  // gün uzunluğu kadranları
  const svgD = document.getElementById('svg-dial');
  const DIAL = [{ cx: 560, cy: 400, day: 15, col: '#ffb52e', id: 'y' }, { cx: 1360, cy: 400, day: 9, col: '#7fcfff', id: 'k' }];
  const RR = 200, CC = TAU * RR;
  DIAL.forEach((d) => {
    const g = svgEl('g', { id: 'dial-' + d.id });
    g.appendChild(svgEl('circle', { cx: d.cx, cy: d.cy, r: RR, fill: 'rgba(8,12,40,.55)', stroke: '#141d4d', 'stroke-width': 46 }));
    g.appendChild(svgEl('circle', { cx: d.cx, cy: d.cy, r: RR + 34, fill: 'none', stroke: 'rgba(255,255,255,.12)', 'stroke-width': 2 }));
    // gece yıldızları
    for (let i = 0; i < 14; i++) { const an = (i / 14) * TAU + 0.3; g.appendChild(svgEl('circle', { cx: d.cx + Math.sin(an) * RR, cy: d.cy - Math.cos(an) * RR, r: 2.4, fill: 'rgba(255,255,255,.35)' })); }
    ['a', 'b'].forEach((s, i) => {
      g.appendChild(svgEl('circle', { id: `arc-${d.id}${s}`, cx: d.cx, cy: d.cy, r: RR, fill: 'none', stroke: d.col, 'stroke-width': 46, 'stroke-dasharray': `0 ${CC}`, transform: `${i ? `translate(${d.cx * 2},0) scale(-1,1) ` : ''}rotate(-90 ${d.cx} ${d.cy})` }));
    });
    g.appendChild(svgEl('circle', { id: `sun-${d.id}`, cx: d.cx, cy: d.cy - RR, r: 21, fill: '#fff6c8', stroke: d.col, 'stroke-width': 7 }));
    // gece etiketi
    const nt = svgEl('text', { x: d.cx, y: d.cy + RR + 76, 'text-anchor': 'middle', fill: 'rgba(160,180,255,.6)', 'font-family': 'InterV', 'font-weight': 650, 'font-size': 28 });
    const ly = d.cy + RR + 80;
    g.appendChild(svgEl('circle', { cx: d.cx - 128, cy: ly - 9, r: 11, fill: d.col }));
    const t1 = svgEl('text', { x: d.cx - 108, y: ly, fill: 'rgba(246,241,231,.85)', 'font-family': 'InterV', 'font-weight': 650, 'font-size': 30 }); t1.textContent = 'gündüz'; g.appendChild(t1);
    g.appendChild(svgEl('circle', { cx: d.cx + 42, cy: ly - 9, r: 11, fill: '#232f7a' }));
    const t2 = svgEl('text', { x: d.cx + 62, y: ly, fill: 'rgba(246,241,231,.85)', 'font-family': 'InterV', 'font-weight': 650, 'font-size': 30 }); t2.textContent = 'gece'; g.appendChild(t2);

    svgD.appendChild(g);
  });
  const drawDial = (d, p) => {
    const half = ((d.day / 24) * CC / 2) * p;
    ['a', 'b'].forEach((s) => document.getElementById(`arc-${d.id}${s}`).setAttribute('stroke-dasharray', `${half} ${CC}`));
    const ang = (d.day / 24) * TAU / 2 * p;
    // güneş: -ang..+ang arasında gezer (p ile aynı anda uçlara açılır) — sonra doğuş->batış
    return ang;
  };
  DIAL.forEach((d, i) => {
    const o = { p: 0, s: -1 };
    const at = i === 0 ? r5(29) - 0.2 : r5(34) - 0.35;
    const num = { v: 0 };
    tl.to(o, { p: 1, duration: 1.3, ease: 'power2.inOut', onUpdate: () => {
      const ang = drawDial(d, o.p);
      const sunA = ang * o.s; // sağ uçta (batış) başlar
      const sun = document.getElementById('sun-' + d.id);
      sun.setAttribute('cx', d.cx + Math.sin(sunA) * RR); sun.setAttribute('cy', d.cy - Math.cos(sunA) * RR);
    } }, at);
    tl.to(o, { s: 1, duration: 2.6, ease: 'sine.inOut', onUpdate: () => {
      const ang = (d.day / 24) * TAU / 2;
      const sunA = ang * o.s;
      const sun = document.getElementById('sun-' + d.id);
      sun.setAttribute('cx', d.cx + Math.sin(sunA) * RR); sun.setAttribute('cy', d.cy - Math.cos(sunA) * RR);
    } }, at + 1.3);
    tl.to(num, { v: d.day, duration: 1.3, ease: 'power2.out', onUpdate: () => (document.getElementById(i === 0 ? 'dyv' : 'dkv').textContent = Math.round(num.v)) }, at);
  });
  gsap.set('#dyv', { textContent: '0' }); gsap.set('#dkv', { textContent: '0' });
  tl.fromTo('#s5b', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, r5(26) + 0.2);
  tl.fromTo('#dh-yaz', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, r5(29) - 0.3);
  tl.fromTo('#dn-yaz', { opacity: 0 }, { opacity: 1, duration: 0.5 }, r5(29) - 0.2);
  tl.fromTo('#dh-kis', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, r5(34) - 0.4);
  tl.fromTo('#dn-kis', { opacity: 0 }, { opacity: 1, duration: 0.5 }, r5(34) - 0.3);
  tl.fromTo('#dnote', { opacity: 0 }, { opacity: 1, duration: 0.6 }, r5(35));
  tl.fromTo('#dial-y', { opacity: 0, scale: 0.85, transformOrigin: '560px 400px' }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, r5(27) + 0.2);
  tl.fromTo('#dial-k', { opacity: 0, scale: 0.85, transformOrigin: '1360px 400px' }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, r5(29) + 0.2);
  gsap.set('#s5b', { opacity: 0 });
  gsap.set(['#dh-yaz', '#dn-yaz', '#dh-kis', '#dn-kis', '#dnote'], { opacity: 0 });

  // ---- S6 ----
  const r6 = (i) => w('s6', i);
  IN('#u1', r6(4) - 0.1, { y: 40, d: 0.5 });
  IN('#u2', r6(5) - 0.05, { y: 40, d: 0.5 });
  tl.fromTo('#s6-a .old i', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.inOut' }, r6(5) + 0.1);
  gsap.set('#s6-a .old i', { scaleX: 0 });
  tl.fromTo('#e1', { opacity: 0, scale: 0.5, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.8)', transformOrigin: '0 50%' }, r6(6) - 0.05);
  IN('#s6-a', r6(0) - 0.05, { y: 20, d: 0.01 });
  tl.to(['#s6-a', '#s6-b'], { opacity: 0, y: -30, duration: 0.45, ease: 'power2.in' }, r6(7) - 0.1);
  tl.fromTo('#nm1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, r6(9) + 0.25);
  tl.fromTo('#nm2', { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)', transformOrigin: '0 50%' }, r6(10) - 0.05);
  tl.to('#nomev', { opacity: 0, y: -24, duration: 0.45, ease: 'power2.in' }, r6(12) - 0.25);
  gsap.set(['#nm1', '#nm2'], { opacity: 0 });
  tl.fromTo('#jul', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, r6(20) - 0.2);
  gsap.set('#jul', { opacity: 0 });
  tl.to('#jul', { opacity: 0, duration: 0.4 }, we('s6', 25) + 0.05);
  tl.fromTo('#end > div', { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, we('s6', 25) + 0.75);
  gsap.set('#end > div', { opacity: 0 });

  // ---- altyazı ----
  const TEXTS = {
    s1: 'Yazın hava neden sıcak, kışın neden soğuk? Çoğu kişi şöyle cevap verir: “Yazın Dünya, Güneş’e daha yakındır.” Mantıklı geliyor. Ama yanlış.',
    s2: 'Dünya, Güneş’e en çok ocak ayında yaklaşır: yüz kırk yedi milyon kilometre. Temmuzda ise yüz elli iki milyon. Yani biz kışı yaşarken, Dünya Güneş’e en yakın hâlindedir.',
    s3: 'Peki asıl sebep ne? Eğiklik. Dünya’nın dönme ekseni, yörüngesine göre yirmi üç buçuk derece yatıktır. Üstelik bu eksen, yıl boyu hep aynı yönü gösterir.',
    s4: 'Dünya Güneş’in etrafında döndükçe, kuzey yarımküre bazen Güneş’e eğilir, bazen ondan uzaklaşır. Haziranda Güneş’e döner: yaz. Aralıkta uzaklaşır: kış. Güney yarımkürede ise tam tersi.',
    s5: 'Bu eğiklik iki şeyi değiştirir. Birincisi, ışığın geliş açısı. Dik gelen ışık enerjisini küçük bir alanda toplar; eğik gelen ışık aynı enerjiyi geniş bir alana yayar. İkincisi, gün uzunluğu: yazın Güneş gökyüzünde uzun kalır, kışın kısa.',
    s6: 'Kısacası, mevsimleri getiren şey uzaklık değil, eğikliktir. Eksen dik olsaydı, mevsim olmazdı. Bir dahaki yaz sıcağında şunu düşün: Dünya şu an Güneş’ten neredeyse en uzak noktasında.',
  };
  const capwrap = document.getElementById('capwrap');
  keys.forEach((k) => {
    const toks = TEXTS[k].split(/\s+/);
    const words = TM.words[k];
    const toksUse = toks.length === words.length ? toks : words.map((x) => x.w);
    const chunks = []; let cur = [];
    toksUse.forEach((tok, i) => {
      cur.push(i);
      const end = /[.?!:;]$|[.?!]”$/.test(tok) || (/,$/.test(tok) && cur.length >= 4) || cur.length >= 7;
      if (end || i === toksUse.length - 1) { chunks.push(cur); cur = []; }
    });
    // çok kısa artıkları birleştir
    for (let c = chunks.length - 1; c > 0; c--) if (chunks[c].length <= 2 && chunks[c - 1].length + chunks[c].length <= 8 && !/[.?!]$/.test(toksUse[chunks[c - 1][chunks[c - 1].length - 1]])) { chunks[c - 1] = chunks[c - 1].concat(chunks[c]); chunks.splice(c, 1); }
    chunks.forEach((ch, ci) => {
      const el = document.createElement('div'); el.className = 'cap';
      ch.forEach((wi) => { const s = document.createElement('span'); s.className = 'cw'; s.textContent = toksUse[wi]; el.appendChild(s); });
      capwrap.appendChild(el);
      const start = w(k, ch[0]) - 0.08;
      const nextStart = ci < chunks.length - 1 ? w(k, chunks[ci + 1][0]) - 0.08 : Infinity;
      const end = Math.min(nextStart, we(k, ch[ch.length - 1]) + 0.28);
      tl.set(el, { opacity: 1 }, start);
      tl.set(el, { opacity: 0 }, end);
      const sp = el.querySelectorAll('.cw');
      gsap.set(sp, { color: 'rgba(246,241,231,0.5)' });
      ch.forEach((wi, j) => tl.set(sp[j], { color: '#ffffff' }, w(k, wi) - 0.02));
    });
  });
  gsap.set('.cap', { opacity: 0 });

  draw(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
