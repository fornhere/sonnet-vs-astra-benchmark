// Tamamen üretken ses: rüzgâr, brülör, adım, kuş, cırcır böceği ve Hicaz dizisinde saz benzeri müzik.
export class Sound {
  constructor() {
    this.ctx = null; this.muted = false; this.started = false;
    this.flamePrev = new Map();
    this.nextBird = 4; this.nextStep = 0; this.musicVol = 0.9;
  }

  start() {
    if (this.started) { this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = this.ctx = new AC();
    this.started = true;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 4; comp.attack.value = 0.01; comp.release.value = 0.25; comp.connect(ctx.destination);
    const master = this.master = ctx.createGain(); master.gain.value = 0; master.connect(comp);
    master.gain.linearRampToValueAtTime(this.muted ? 0 : 0.8, ctx.currentTime + 3);
    // gürültü tamponları
    const len = ctx.sampleRate * 4;
    const nb = this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = nb.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) { // pembe gürültü
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.0990460; b1 = 0.96300 * b1 + w * 0.2965164; b2 = 0.57000 * b2 + w * 1.0526913;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.22;
    }
    // yankı
    const conv = this.reverb = ctx.createConvolver();
    const irLen = ctx.sampleRate * 3.2, ir = ctx.createBuffer(2, irLen, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const ch = ir.getChannelData(c); for (let i = 0; i < irLen; i++) { const t = i / irLen; ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.6) * (t < 0.01 ? t * 100 : 1); } }
    conv.buffer = ir;
    const revGain = this.revGain = ctx.createGain(); revGain.gain.value = 0.55;
    conv.connect(revGain); revGain.connect(master);
    this.musicBus = ctx.createGain(); this.musicBus.gain.value = 0.55; this.musicBus.connect(master); this.musicBus.connect(conv);
    // rüzgâr
    const wind = ctx.createBufferSource(); wind.buffer = nb; wind.loop = true;
    const wbp = this.windBP = ctx.createBiquadFilter(); wbp.type = 'bandpass'; wbp.frequency.value = 500; wbp.Q.value = 0.5;
    const wg = this.windGain = ctx.createGain(); wg.gain.value = 0.05;
    wind.connect(wbp); wbp.connect(wg); wg.connect(master);
    wind.start();
    const wl = ctx.createOscillator(); wl.frequency.value = 0.09; const wlg = ctx.createGain(); wlg.gain.value = 180; wl.connect(wlg); wlg.connect(wbp.frequency); wl.start();
    // alçak gürültü (vadi uğultusu)
    const lo = ctx.createBufferSource(); lo.buffer = nb; lo.loop = true; lo.playbackRate.value = 0.5;
    const lf = ctx.createBiquadFilter(); lf.type = 'lowpass'; lf.frequency.value = 160;
    const lg = this.lowGain = ctx.createGain(); lg.gain.value = 0.10;
    lo.connect(lf); lf.connect(lg); lg.connect(master); lo.start();
    // cırcır böceği
    const cr = ctx.createOscillator(); cr.type = 'sine'; cr.frequency.value = 4300;
    const crAm = ctx.createGain(); crAm.gain.value = 0;
    const crLfo = ctx.createOscillator(); crLfo.type = 'square'; crLfo.frequency.value = 26;
    const crLg = ctx.createGain(); crLg.gain.value = 0.5; crLfo.connect(crLg);
    const crEnv = ctx.createGain(); crEnv.gain.value = 0.5; crLg.connect(crEnv.gain);
    cr.connect(crEnv); crEnv.connect(crAm); crAm.connect(master); cr.start(); crLfo.start();
    this.cricketGain = crAm;
    const crSlow = ctx.createOscillator(); crSlow.frequency.value = 0.35; const csg = ctx.createGain(); csg.gain.value = 8; crSlow.connect(csg); csg.connect(crLfo.frequency); crSlow.start();
    this.scheduleMusic();
  }

  setMuted(m) {
    this.muted = m;
    if (this.ctx) this.master.gain.linearRampToValueAtTime(m ? 0 : 0.8, this.ctx.currentTime + 0.4);
  }
  setMusic(v) { this.musicVol = v; if (this.musicBus) this.musicBus.gain.value = 0.55 * v; }

  // --- müzik ---
  scheduleMusic() {
    const ctx = this.ctx;
    const root = 146.83; // Re
    // Hicaz: Re Mib Fa# Sol La Sib Do Re
    const ratios = [1, 16 / 15, 5 / 4 * 1.0 + 0.0, 4 / 3, 3 / 2, 8 / 5, 9 / 5, 2];
    const scale = [0, 1, 4, 5, 7, 8, 10, 12].map(s => root * Math.pow(2, s / 12));
    this.music = { t: ctx.currentTime + 0.5, bar: 0, scale, root };
    const tick = () => {
      if (!this.ctx) return;
      const m = this.music;
      while (m.t < ctx.currentTime + 1.5) { this.playBar(m); }
      setTimeout(tick, 400);
    };
    tick();
  }
  playBar(m) {
    const ctx = this.ctx, t0 = m.t, beat = 0.62;
    const barLen = beat * 8;
    // pedal + pad
    const chords = [[0, 7], [0, 7], [8, 12 + 0], [5, 12]];
    const ch = chords[m.bar % chords.length];
    for (const semi of ch) this.pad(t0, barLen * 1.05, m.root * Math.pow(2, (semi - 12) / 12), 0.045);
    this.pad(t0, barLen * 1.05, m.root * 0.5, 0.05);
    // saz benzeri kopuzlar
    const phrases = [
      [0, 2, 3, 4, 3, 2, 1, 0], [4, 5, 4, 3, 2, 3, 1, 0], [0, 1, 2, 3, 4, 5, 6, 7], [7, 6, 5, 4, 3, 4, 2, 0], [3, 4, 5, 4, 3, 2, 1, 2],
    ];
    if (m.bar % 4 !== 3 || Math.random() < 0.4) {
      const ph = phrases[Math.floor(Math.random() * phrases.length)];
      let t = t0 + beat * (Math.random() < 0.5 ? 0 : 1);
      for (const idx of ph) {
        if (Math.random() < 0.28) { t += beat * 0.5; continue; }
        const f = m.scale[idx] * (Math.random() < 0.25 ? 2 : 1);
        this.pluck(t, f, 0.09 + Math.random() * 0.05);
        t += beat * (Math.random() < 0.3 ? 1 : 0.5);
        if (t > t0 + barLen) break;
      }
    }
    m.t += barLen; m.bar++;
  }
  pad(t, dur, f, vol) {
    const ctx = this.ctx;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + dur * 0.4); g.gain.linearRampToValueAtTime(0, t + dur);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.Q.value = 0.3;
    for (const det of [-6, 5]) {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det;
      o.connect(lp); o.start(t); o.stop(t + dur + 0.1);
    }
    lp.connect(g); g.connect(this.musicBus);
  }
  pluck(t, f, vol) {
    const ctx = this.ctx;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0008, t + 1.6);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(3600, t); lp.frequency.exponentialRampToValueAtTime(500, t + 0.5);
    const o1 = ctx.createOscillator(); o1.type = 'triangle'; o1.frequency.value = f;
    const o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = f * 2.003; const g2 = ctx.createGain(); g2.gain.value = 0.18;
    o1.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(g); g.connect(this.musicBus);
    o1.start(t); o2.start(t); o1.stop(t + 1.7); o2.stop(t + 1.7);
  }

  // --- olay sesleri ---
  noiseBurst(t, dur, freq, q, vol, type = 'bandpass', pan = 0) {
    const ctx = this.ctx;
    const s = ctx.createBufferSource(); s.buffer = this.noiseBuf; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + Math.min(0.04, dur * 0.2)); g.gain.exponentialRampToValueAtTime(0.0005, t + dur);
    s.connect(f); f.connect(g);
    if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; g.connect(p); p.connect(this.master); } else g.connect(this.master);
    s.start(t, Math.random() * 3); s.stop(t + dur + 0.1);
  }
  footstep(speed) { if (!this.ctx) return; const t = this.ctx.currentTime; this.noiseBurst(t, 0.12, 380 + Math.random() * 200, 0.8, 0.10 * Math.min(1.4, speed / 5), 'lowpass'); this.noiseBurst(t + 0.005, 0.05, 2400, 1, 0.02, 'highpass'); }
  burner(vol, pan = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.noiseBurst(t, 1.9, 420, 0.4, vol * 0.5, 'bandpass', pan);
    this.noiseBurst(t, 2.0, 140, 0.6, vol * 0.7, 'lowpass', pan);
  }
  bird() {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime + 0.05;
    const base = 2200 + Math.random() * 2600, n = 2 + Math.floor(Math.random() * 4);
    const pan = (Math.random() * 2 - 1) * 0.8;
    for (let i = 0; i < n; i++) {
      const o = ctx.createOscillator(); o.type = 'sine';
      const g = ctx.createGain(); const ts = t + i * 0.13;
      o.frequency.setValueAtTime(base, ts); o.frequency.exponentialRampToValueAtTime(base * (1.3 + Math.random() * 0.5), ts + 0.09);
      g.gain.setValueAtTime(0, ts); g.gain.linearRampToValueAtTime(0.018, ts + 0.02); g.gain.exponentialRampToValueAtTime(0.0003, ts + 0.11);
      o.connect(g);
      if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; g.connect(p); p.connect(this.master); p.connect(this.reverb); } else g.connect(this.master);
      o.start(ts); o.stop(ts + 0.13);
    }
  }
  chime() { // keşif sesi
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [0, 7, 12, 19].forEach((s, i) => this.pluck(t + i * 0.09, 293.66 * Math.pow(2, s / 12), 0.10));
  }

  // her karede
  update(dt, s) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const alt = Math.min(1, Math.max(0, (s.agl || 0) / 300));
    const wind = 0.035 + 0.10 * alt + 0.06 * Math.min(1, (s.speed || 0) / 30);
    this.windGain.gain.setTargetAtTime(wind, t, 0.4);
    this.windBP.frequency.setTargetAtTime(380 + 500 * alt + 350 * Math.min(1, (s.speed || 0) / 25), t, 0.6);
    this.lowGain.gain.setTargetAtTime(0.06 + 0.06 * alt, t, 0.5);
    // gece: cırcır
    const night = s.night || 0;
    this.cricketGain.gain.setTargetAtTime(alt < 0.15 ? 0.012 * night : 0, t, 0.8);
    // kuşlar
    this.nextBird -= dt;
    if (this.nextBird < 0) {
      this.nextBird = 3 + Math.random() * 8;
      if ((s.elev || 0) > -6 && (s.elev || 0) < 60 && alt < 0.4) this.bird();
    }
    // adımlar
    if (s.walking) {
      this.nextStep -= dt;
      if (this.nextStep <= 0) { this.footstep(s.speed); this.nextStep = s.sprint ? 0.29 : 0.44; }
    } else this.nextStep = 0.1;
    // brülörler
    if (s.balloons) {
      for (const it of s.balloons) {
        const prev = this.flamePrev.get(it.i) || 0;
        if (prev < 0.5 && it.flame >= 0.5) {
          const dx = it.x - s.pos.x, dy = it.y - s.pos.y, dz = it.z - s.pos.z;
          const d = Math.hypot(dx, dy, dz);
          const vol = Math.min(0.55, 60 / (30 + d) * 0.4);
          if (d < 900 && vol > 0.01) {
            // sağ-sol yönü
            const pan = Math.max(-1, Math.min(1, (dx * Math.cos(s.yaw) - dz * Math.sin(s.yaw)) / (Math.abs(dx) + Math.abs(dz) + 1)));
            this.burner(vol, pan);
          }
        }
        this.flamePrev.set(it.i, it.flame);
      }
    }
    // üstte yükseliş: kendi brülörü
    if (s.selfBurn && !this._selfBurn) { this.burner(0.5); }
    this._selfBurn = !!s.selfBurn;
  }
}
