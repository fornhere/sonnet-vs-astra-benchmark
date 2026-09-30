const C = /*CUES*/;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const S = {}, E = {}, V = {};
C.scenes.forEach(s => { S[s.id] = s.start; E[s.id] = s.end; });
C.vo.forEach(v => { V[v.line] = v.words; });
const TOTAL = C.total;
const tl = gsap.timeline({ paused: true });
const OUT = "power3.out", IO = "power2.inOut";
const TYPES = [], HITS = [];
const hit = (t, k, g) => HITS.push({ t, k, g: g || 1 });

/* ---------- helpers ---------- */
function show(el, t, o = {}) {
  const { y = 22, x = 0, dur = 0.6, scale = 1, ease = OUT } = o;
  tl.fromTo(el, { opacity: 0, y, x, scale }, { opacity: 1, y: 0, x: 0, scale: 1, duration: dur, ease }, t);
}
function hide(el, t, dur = 0.35) { tl.to(el, { opacity: 0, duration: dur, ease: "power2.in" }, t); }
function splitChars(el) {
  const txt = el.textContent; el.textContent = "";
  const words = txt.split(" ");
  words.forEach((w, wi) => {
    const ws = document.createElement("span"); ws.className = "w";
    [...w].forEach(c => { const s = document.createElement("span"); s.className = "ch"; s.textContent = c; ws.appendChild(s); });
    el.appendChild(ws);
    if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  return [...el.querySelectorAll(".ch")];
}
function typeInto(el, text, t0, cps, opt = {}) {
  el.textContent = "";
  const chars = [];
  if (opt.prefix) { const p = document.createElement("span"); p.className = "pr"; p.textContent = opt.prefix; p.style.display = "none"; el.appendChild(p); chars.push(p); }
  [...text].forEach(c => { const s = document.createElement("span"); s.textContent = c; s.style.display = "none"; el.appendChild(s); chars.push(s); });
  const cur = document.createElement("span"); cur.className = "cursor"; cur.style.display = "none"; el.appendChild(cur);
  tl.set(cur, { display: "inline-block" }, t0);
  tl.fromTo(chars, { display: "none" }, { display: "inline", duration: 0.001, stagger: 1 / cps }, t0);
  const end = t0 + chars.length / cps;
  if (opt.keepCursor) {
    tl.fromTo(cur, { opacity: 1 }, { opacity: 0, duration: 0.001, repeat: 12, repeatDelay: 0.42, yoyo: true }, end + 0.2);
  } else { tl.set(cur, { display: "none" }, end + 0.35); }
  TYPES.push({ t: t0, n: text.length, cps });
  return { chars, cur, end };
}
function draw(path, t, dur = 0.7, ease = IO) {
  const L = path.getTotalLength();
  path.style.strokeDasharray = L;
  tl.fromTo(path, { strokeDashoffset: L }, { strokeDashoffset: 0, duration: dur, ease }, t);
  return L;
}
const NS = "http://www.w3.org/2000/svg";
function mk(tag, attrs, parent) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; }
function pulse(path, circ, t, dur) {
  const L = path.getTotalLength(), o = { p: 0 };
  tl.set(circ, { opacity: 1 }, t);
  tl.fromTo(o, { p: 0 }, { p: 1, duration: dur, ease: "power1.inOut", onUpdate() { const pt = path.getPointAtLength(o.p * L); circ.setAttribute("cx", pt.x); circ.setAttribute("cy", pt.y); } }, t);
  tl.set(circ, { opacity: 0 }, t + dur);
}

/* ---------- scene enter / exit ---------- */
C.scenes.forEach((s, i) => {
  const sc = $("#s-" + s.id + " .sc");
  const last = i === C.scenes.length - 1;
  tl.fromTo(sc, { opacity: 0, scale: i ? 1.03 : 1 }, { opacity: 1, scale: 1, duration: i ? 0.55 : 0.4, ease: OUT }, s.start);
  if (!last) tl.to(sc, { opacity: 0, scale: 0.985, duration: 0.42, ease: "power2.in" }, s.end);
  else tl.to(sc, { opacity: 0, duration: 0.55, ease: "power2.in" }, s.end - 0.55);
  if (i) hit(s.start - 0.05, "whoosh");
});

/* ---------- backdrop drift ---------- */
tl.to("#glow", { opacity: 0.22, duration: 1.2 }, 0.2);
tl.to("#glow", { x: 340, y: 70, opacity: 0.55, scale: 1.5, duration: 1.5, ease: OUT }, S.title);
tl.to("#glow", { x: -500, y: 70, opacity: 0.22, scale: 1, duration: 1.4, ease: IO }, S.vault);
tl.to("#glow", { x: 640, y: 50, opacity: 0.28, duration: 1.4, ease: IO }, S.hub);
tl.to("#glow", { x: -40, y: 110, opacity: 0.3, duration: 1.4, ease: IO }, S.recall);
tl.to("#glow", { x: 340, y: -30, opacity: 0.25, duration: 1.4, ease: IO }, S.review);
tl.to("#glow", { x: 0, y: 110, opacity: 0.2, duration: 1.4, ease: IO }, S.install);
tl.to("#glow", { x: -460, y: 10, opacity: 0.3, duration: 1.4, ease: IO }, S.proof);
tl.to("#glow", { x: 0, y: -10, opacity: 0.6, scale: 1.4, duration: 1.6, ease: OUT }, S.end);
tl.fromTo("#grain", { x: 0, y: 0 }, { x: -300, y: -300, duration: TOTAL, ease: "steps(" + Math.round(TOTAL * 12) + ")" }, 0);
tl.fromTo("#prog", { scaleX: 0 }, { scaleX: 1, duration: TOTAL, ease: "none" }, 0);

/* ---------- chrome ---------- */
tl.fromTo("#chrome", { opacity: 0 }, { opacity: 1, duration: 0.5 }, S.vault + 0.2);
tl.to("#chrome", { opacity: 0, duration: 0.4 }, E.proof);
const chapAt = [null, S.vault, S.hub, S.recall, S.review, S.install, S.proof];
for (let i = 1; i <= 6; i++) {
  const el = $("#chl" + i);
  const end = i < 6 ? chapAt[i + 1] : E.proof;
  tl.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, chapAt[i] + 0.25);
  tl.to(el, { opacity: 0, y: -8, duration: 0.3 }, end);
}

/* ---------- captions ---------- */
const capHide = new Set(["l2", "l3", "l10"]);
C.caps.forEach(c => {
  if (capHide.has(c.l)) return;
  const d = document.createElement("div"); d.className = "cap"; d.textContent = c.t; $("#capwrap").appendChild(d);
  tl.fromTo(d, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25, ease: OUT }, c.s);
  tl.to(d, { opacity: 0, duration: 0.2 }, c.e - 0.05);
});

/* ================= 1 HOOK ================= */
{
  const rows = $("#rows"), agents = ["Claude Code", "Codex", "Antigravity"];
  const T = [0.2, 1.30, 1.66, 2.0, 2.3, 2.58, 2.84, 3.08, 3.3];
  const els = [];
  for (let i = 0; i < 9; i++) {
    const r = document.createElement("div"); r.className = "row";
    r.innerHTML = '<span class="pr">›</span><span class="lt"></span><span class="lb">' + agents[i % 3] + ' · #' + String(i + 1).padStart(2, "0") + '</span>';
    rows.appendChild(r); els.push(r);
  }
  els.forEach((r, i) => {
    const t = T[i];
    if (i === 0) {
      tl.fromTo(r, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: OUT }, t);
      typeInto(r.querySelector(".lt"), "Önce sana projemi anlatayım…", t + 0.15, 30);
    } else {
      r.querySelector(".lt").textContent = "Önce sana projemi anlatayım…";
      tl.fromTo(r, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.28, ease: OUT }, t);
      hit(t, "tick", 0.7);
    }
    for (let j = 0; j < i; j++) tl.to(els[j], { opacity: Math.max(0.16, 1 - 0.15 * (i - j)), duration: 0.3 }, t);
  });
}

/* ================= 2 LOSE ================= */
{
  const t0 = S.lose;
  const tabs = $$(".tab"), hl = $("#tabhl"), ctrn = $("#ctrn");
  tabs[0].style.color = "var(--paper)";
  const ctx = $$(".ctxl .v"), ks = $$(".ctxl .k");
  const chars = ctx.map(v => splitChars(v));
  show("#lpanel", t0 + 0.1, { y: 30, dur: 0.7 });
  chars.forEach((cs, i) => tl.fromTo(cs, { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: 0.018 }, t0 + 0.3 + i * 0.1));
  // switch to Codex
  const sw1 = 5.35, sw2 = 6.75;
  const switchTab = (idx, t) => {
    tl.to(hl, { x: idx * 336, duration: 0.45, ease: "power3.inOut" }, t);
    tabs.forEach((tb, k) => tl.to(tb, { color: k === idx ? "#F1EADB" : "#5E5A50", duration: 0.3 }, t));
    hit(t, "tick");
  };
  switchTab(1, sw1);
  chars.forEach((cs, i) => tl.to(cs, { opacity: 0, y: (k) => -6 - (k % 4) * 4, duration: 0.5, ease: "power2.in", stagger: { each: 0.012, from: "end" } }, sw1 + 0.05 + i * 0.05));
  tl.to(ks, { opacity: 0, duration: 0.4 }, sw1 + 0.1);
  const cnt = { v: 3 };
  tl.to(cnt, { v: 0, duration: 0.5, ease: "none", onUpdate() { ctrn.textContent = Math.round(cnt.v); } }, sw1 + 0.1);
  const lp = $("#lprompt");
  const ty1 = typeInto(lp, "Önce sana projemi anlatayım…", sw1 + 0.75, 30, { prefix: "› " });
  // switch to Antigravity: prompt dissolves and is typed again
  switchTab(2, sw2);
  const pch = ty1.chars;
  tl.to(pch, { opacity: 0, y: (k) => -4 - (k % 3) * 3, duration: 0.45, ease: "power2.in", stagger: { each: 0.01, from: "end" } }, sw2 + 0.05);
  // second typing in a fresh element
  const lp2 = document.createElement("div"); lp2.id = "lprompt2"; lp2.style.cssText = "position:absolute;left:44px;top:158px;font-family:'JetBrains Mono',monospace;font-size:34px;white-space:pre-wrap;width:1000px"; lp.parentNode.appendChild(lp2);
  typeInto(lp2, "Önce sana projemi anlatayım…", sw2 + 0.7, 30, { prefix: "› ", keepCursor: true });
  // headline
  const h1 = splitChars($("#lh1")), h2 = splitChars($("#lh2"));
  const w = V.l2;
  tl.fromTo(h1, { opacity: 0, y: 50, rotate: 4 }, { opacity: 1, y: 0, rotate: 0, duration: 0.6, ease: OUT, stagger: 0.035 }, w[0].s - 0.05);
  tl.fromTo(h2, { opacity: 0, y: 50, rotate: 4 }, { opacity: 1, y: 0, rotate: 0, duration: 0.6, ease: OUT, stagger: 0.035 }, w[2].s - 0.05);
  const kay = h2.slice(7);
  tl.to(kay, { opacity: 0, y: (k) => 8 + (k % 3) * 6, duration: 0.7, ease: "power2.in", stagger: { each: 0.06, from: "start" } }, w[3].e + 0.05);
  hit(w[2].s, "deny");
}

/* ================= 3 TITLE ================= */
{
  const t0 = S.title, w = V.l3;
  tl.fromTo("#tmark", { opacity: 0, scale: 0.6, rotate: -8 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, t0 + 0.25);
  const tc = splitChars($("#ttitle"));
  tl.fromTo(tc, { opacity: 0, y: 120, rotate: 6 }, { opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, w[0].s - 0.15);
  hit(w[0].s - 0.1, "chime");
  const tg = $("#ttag");
  const words = "Ajanlar değişsin, hafızan aynı yerde kalsın.".split(" ");
  const spans = words.map((wd, i) => { const s = document.createElement("span"); s.className = "w" + (i >= 2 ? " amber" : ""); s.textContent = wd; tg.appendChild(s); if (i < words.length - 1) tg.appendChild(document.createTextNode(" ")); return s; });
  spans.forEach((s, i) => tl.fromTo(s, { opacity: 0, y: 26, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: OUT }, w[i + 2].s - 0.08));
  const chips = $$("#tchips .chip");
  tl.fromTo(chips, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: OUT, stagger: 0.12 }, w[7].s + 0.15);
    tl.to("#thead", { scale: 1.035, duration: 6, ease: "none" }, t0);
}

/* ================= 4 VAULT ================= */
{
  const t0 = S.vault, w = V.l4;
  show("#vwin", t0 + 0.15, { y: 40, dur: 0.8 });
  const items = [
    ["Hafiza/", "", "", true],
    ["├ agents.md", "", "kasa kuralları ve çalışma biçimi"],
    ["├ zihin/", "", "kimlik · kaynaklı hafıza · açık işler"],
    ["├ komuta/", "", "öncelikler · ajan brief'i"],
    ["├ projeler/", "", "süren işler"],
    ["├ günlük/", "", "tarihli kayıtlar"],
    ["├ gelen-kutusu/", "", "henüz ayıklanmamış girdiler"],
    ["├ araclar/", "", "yerel erişim ve bakım araçları"],
    ["└ arşiv/", "", "kapanmış işler"],
  ];
  const tree = $("#vtree"), lines = [];
  items.forEach((it, i) => {
    const d = document.createElement("div"); d.className = "tl";
    d.innerHTML = '<span class="nm">' + (i === 0 ? '<span class="amber">' + it[0] + '</span>' : it[0]) + '</span><span class="cm">' + it[2] + '</span>';
    tree.appendChild(d); lines.push(d);
    tl.fromTo(d, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, t0 + 0.55 + i * 0.16);
  });
  const vw = ["#vw1", "#vw2", "#vw3", "#vw4"];
  [0, 1, 2, 4].forEach((wi, k) => {
    tl.fromTo(vw[k], { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out" }, w[wi].s - 0.1);
    hit(w[wi].s, "tick");
  });
  // sweep highlight down the tree on "dosyalarında durur"
  const hl = $("#vhl"), y0 = 14 + 64 * 1, step = 64;
  tl.set(hl, { y: 14 + 64 }, 0);
  tl.fromTo(hl, { opacity: 0 }, { opacity: 1, duration: 0.3 }, w[8].s);
  for (let i = 1; i < lines.length; i++) tl.to(hl, { y: 14 + 64 * i, duration: 0.3, ease: "power2.inOut" }, w[8].s + 0.3 + (i - 1) * 0.3);
  tl.to(hl, { opacity: 0, duration: 0.4 }, w[10].e + 0.5);
  tl.fromTo("#vc1", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, w[5].s);
  tl.fromTo("#vc2", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, w[7].s);
  tl.fromTo("#vc3", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, w[9].s);
}

/* ================= 5 HUB ================= */
{
  const t0 = S.hub, w = V.l5;
  const svg = $("#hubsvg");
  const ys = [225, 415, 605, 795];
  tl.fromTo("#vnode", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, t0 + 0.2);
  const ag = ["#ag1", "#ag2", "#ag3", "#ag4"];
  const appear = [w[0].s - 0.15, w[2].s - 0.15, w[3].s - 0.15, w[7].e - 0.6];
  const paths = [];
  ys.forEach((y, i) => {
    const p = mk("path", { d: `M760,${y} C 960,${y} 1000,500 1180,500`, fill: "none", stroke: i < 3 ? "rgba(246,169,59,.55)" : "rgba(143,136,122,.5)", "stroke-width": 3, "stroke-linecap": "round" }, svg);
    if (i === 3) p.setAttribute("stroke-dasharray", "4 12");
    paths.push(p);
    tl.fromTo(ag[i], { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.65, ease: OUT }, appear[i]);
    if (i < 3) draw(p, appear[i] + 0.2, 0.7);
    else tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.6 }, appear[i] + 0.2);
    hit(appear[i], "tick");
  });
  // flowing pulses from all three to the vault on "hepsi aynı kasaya bağlanır"
  [0, 1, 2].forEach(i => {
    for (let r = 0; r < 2; r++) {
      const c = mk("circle", { r: 8, fill: "#F6A93B", opacity: 0, cx: 760, cy: ys[i] }, svg);
      pulse(paths[i], c, w[4].s + r * 0.9 + i * 0.12, 0.95);
    }
  });
  hit(w[7].s, "chime", 0.8);
  tl.to("#vnode", { boxShadow: "0 0 200px rgba(246,169,59,.38), 0 40px 100px rgba(0,0,0,.6)", duration: 0.8 }, w[7].s - 0.3);
}

/* ================= 6 RECALL ================= */
{
  const t0 = S.recall, w = V.l6;
  show("#cpanel", t0 + 0.1, { y: 34, dur: 0.7 });
  show("#ornek", t0 + 0.4, { y: 10, dur: 0.5 });
  tl.fromTo("#mu", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, t0 + 0.4);
  typeInto($("#mut"), "Bu projede son kararımız neydi? Kaynağını bul, açık kalan işi söyle ve oradan devam edelim.", t0 + 0.7, 62);
  tl.fromTo("#ma", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, t0 + 2.2);
  const ma = $("#mat");
  typeInto(ma, "Son karar: fiyat sayfasında tek sütun. Açık iş: mobil menü testi.", t0 + 2.55, 46);
  ma.parentNode.style.top = "290px";
  ["#sc1", "#sc2", "#sc3"].forEach((s, i) => {
    tl.fromTo(s, { opacity: 0, y: 16, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.5)" }, w[4 + i].s - 0.05);
    hit(w[4 + i].s, "tick");
  });
  tl.fromTo("#rcmd", { opacity: 0 }, { opacity: 0.85, duration: 0.6 }, t0 + 0.9);
  // stale vs current
  tl.fromTo("#cold", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6, ease: OUT }, w[7].s - 0.1);
  tl.fromTo("#strike", { width: 0 }, { width: "104%", duration: 0.5, ease: IO }, w[9].s);
  tl.to("#cold", { opacity: 0.5, duration: 0.5 }, w[9].s + 0.6);
  hit(w[9].s, "deny", 0.8);
  tl.fromTo("#rarrow", { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4 }, w[10].e);
  tl.fromTo("#cnew", { opacity: 0, x: 50, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(1.3)" }, w[11].s);
  hit(w[11].s + 0.1, "success");
}

/* ================= 7 REVIEW ================= */
{
  const t0 = S.review, w = V.l7;
  const svg = $("#rsvg");
  const nodes = ["#n1", "#n2", "#n3", "#n4"];
  tl.fromTo("#n1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: OUT }, w[0].s - 0.1);
  tl.fromTo("#n4", { opacity: 0.0, y: 30 }, { opacity: 0.38, y: 0, duration: 0.6, ease: OUT }, w[0].s + 0.1);
  // forbidden direct arc
  const arc = mk("path", { d: "M255,425 C 255,190 1665,190 1665,425", fill: "none", stroke: "#EA6A50", "stroke-width": 3.5, "stroke-dasharray": "14 12", "stroke-linecap": "round" }, svg);
  tl.fromTo(arc, { opacity: 0, strokeDashoffset: 0 }, { opacity: 0.95, duration: 0.3 }, w[2].s);
  const arcL = arc.getTotalLength();
  const mask = mk("path", { d: "M255,425 C 255,190 1665,190 1665,425", fill: "none", stroke: "#0C0B09", "stroke-width": 9 }, svg);
  mask.style.strokeDasharray = arcL;
  tl.fromTo(mask, { strokeDashoffset: 0 }, { strokeDashoffset: -arcL, duration: 0.8, ease: IO }, w[2].s);
  tl.fromTo("#nolabel", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, w[3].s);
  hit(w[3].s + 0.1, "deny");
  tl.to([arc, mask, "#nolabel"], { opacity: 0.4, duration: 0.6 }, w[8].e + 0.9);
  // real path
  const arrows = [[425, 555], [895, 1025], [1365, 1495]];
  const heads = [];
  arrows.forEach(([x1, x2], i) => {
    const p = mk("path", { d: `M${x1 + 6},515 L${x2 - 16},515`, stroke: "rgba(246,169,59,.85)", "stroke-width": 4, fill: "none", "stroke-linecap": "round" }, svg);
    const h = mk("path", { d: `M${x2 - 26},503 L${x2 - 8},515 L${x2 - 26},527`, stroke: "rgba(246,169,59,.95)", "stroke-width": 4, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, svg);
    heads.push([p, h]);
  });
  const nodeT = [w[0].s, w[4].s - 0.1, w[7].s - 0.1, w[8].s - 0.1];
  tl.fromTo("#n2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: OUT }, nodeT[1]);
  tl.fromTo("#f2", { opacity: 0 }, { opacity: 1, duration: 0.5 }, nodeT[1] + 0.3);
  tl.fromTo("#n3", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: OUT }, nodeT[2]);
  tl.to("#n4", { opacity: 1, duration: 0.6 }, nodeT[3]);
  tl.fromTo("#f4", { opacity: 0 }, { opacity: 1, duration: 0.5 }, nodeT[3] + 0.3);
  [nodeT[1], nodeT[2], nodeT[3]].forEach((t, i) => {
    draw(heads[i][0], t - 0.05, 0.4);
    tl.fromTo(heads[i][1], { opacity: 0 }, { opacity: 1, duration: 0.15 }, t + 0.35);
    hit(t, "tick");
  });
  // four separated kinds
  [10, 11, 13, 15].forEach((wi, k) => {
    const t = [w[9].s, w[10].s, w[11].s, w[14].s][k];
    tl.fromTo("#rc" + (k + 1), { opacity: 0, y: 36, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.5)" }, t - 0.05);
    hit(t, "tick");
  });
  hit(w[15].e, "success", 0.9);
}

/* ================= 8 INSTALL ================= */
{
  const t0 = S.install, w = V.l8;
  show("#iterm", t0 + 0.15, { y: 34, dur: 0.7 });
  typeInto($("#icmd"), "curl -fsSL https://raw.githubusercontent.com/fornhere/hafiza-os/main/install.sh | bash", t0 + 0.75, 62, { prefix: "$ ", keepCursor: false });
  show("#iagent", w[4].s - 0.2, { y: 34, dur: 0.7 });
  typeInto($("#iprompt"), "https://github.com/fornhere/hafiza-os adresindeki hafıza sistemini bilgisayarıma kur. Önce depodaki AJANLA-KURULUM.md yönergesini oku ve uygula. Kişisel dosyalarımın üzerine yazma.", w[4].s + 0.35, 82);
  ["#ic1", "#ic2", "#ic3"].forEach((s, i) => tl.fromTo(s, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: OUT }, w[8].s + 0.2 + i * 0.25));
}

/* ================= 9 PROOF ================= */
{
  const t0 = S.proof, w = V.l9;
  tl.fromTo("#pc1", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: OUT }, w[0].s);
  tl.fromTo("#pc2", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: OUT }, w[5].s);
  ["#os1", "#os2", "#os3"].forEach((s, i) => {
    const t = [w[6].s, w[7].s, w[9].s][i] - 0.15;
    tl.fromTo(s, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.6, ease: OUT }, t);
    tl.fromTo(s + " .bar i", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: IO }, t + 0.25);
    hit(t + 0.5, "tick");
  });
  const cnt = { v: 0 }, el = $("#p360");
  tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 }, w[10].s - 0.3);
  tl.to(cnt, { v: 360, duration: (w[12].e - w[10].s) + 0.1, ease: "power2.out", onUpdate() { el.textContent = Math.round(cnt.v); } }, w[10].s - 0.05);
  tl.fromTo("#ptest", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: OUT }, w[13].s);
  tl.fromTo("#pskip", { opacity: 0 }, { opacity: 1, duration: 0.6 }, w[15].s);
  hit(w[12].e, "success");
  tl.fromTo("#pnote", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: OUT }, w[14].s);
}

/* ================= 10 END ================= */
{
  const t0 = S.end, w = V.l10;
  tl.fromTo("#emark", { opacity: 0, scale: 0.6, rotate: -8 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, t0 + 0.55);
  const ec = splitChars($("#etitle"));
  tl.fromTo(ec, { opacity: 0, y: 100, rotate: 5 }, { opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: "expo.out", stagger: 0.05 }, t0 + 0.45);
  hit(t0 + 0.45, "chime");
  tl.fromTo("#etag", { opacity: 0, y: 22, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: OUT }, w[2].s - 0.1);
  tl.fromTo("#eurlc", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: OUT }, w[3].s - 0.15);
  typeInto($("#eurlt"), "github.com/fornhere/hafiza-os", w[3].s + 0.1, 26);
  tl.fromTo("#ecmd", { opacity: 0 }, { opacity: 0.9, duration: 0.7 }, w[3].e + 0.4);
  tl.to("#s-end .sc", { scale: 1.02, duration: 6.4, ease: "none" }, t0 + 0.2);
}


/* ---------- file-name texture behind title / end ---------- */
{
  const names = ["agents.md","zihin/çekirdek.md","zihin/hafıza-sistemi.md","zihin/açık-işler.md","komuta/ajan-isletimi.md","BILGI-AGI.md","KONU-SENTEZI.md","HAFIZA-DONGUSU.md","SISTEM.md","ENTEGRASYONLAR.md","CODEX.md","KULLANIM.md","JEV.md","MIMARI.md","hafıza-kataloğu.jsonl","hafıza-adayları.jsonl"];
  [["#tex1", S.title, 7.1], ["#tex2", S.end, 6.6]].forEach(([sel, t0, dur], k) => {
    const host = $(sel); let n = 0;
    for (let col = 0; col < 4; col++) for (let r = 0; r < 12; r++) {
      const d = document.createElement("div");
      d.textContent = names[(n * 5 + col * 3 + k) % names.length]; n++;
      d.style.left = (40 + col * 480 + ((r * 37) % 60)) + "px"; d.style.top = (r * 96 - 40) + "px";
      host.appendChild(d);
    }
    tl.fromTo(host, { y: 0 }, { y: -110, duration: dur + 0.6, ease: "none" }, t0);
  });
}

window.__cues = { TYPES, HITS };
document.documentElement.setAttribute("data-sfx", JSON.stringify(window.__cues));
window.__timelines = window.__timelines || {};
window.__timelines["main"] = tl;
