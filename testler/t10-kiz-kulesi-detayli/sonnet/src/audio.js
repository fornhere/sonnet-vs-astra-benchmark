// Tamamen Web Audio ile kodla üretilmiş fırtına sesi: yağmur, rüzgâr, dalga, gök gürültüsü,
// uzaktan vapur düdüğü ve martı çığlıkları. Dış ses dosyası yok. Fırtına şiddetiyle birlikte değişir.
import { mulberry32, clamp, lerp } from './util/rng.js';

function makeNoise(ctx, seconds, kind, seed = 1) {
  const n = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  const rnd = mulberry32(seed);
  if (kind === 'white') {
    for (let i = 0; i < n; i++) d[i] = rnd() * 2 - 1;
  } else if (kind === 'pink') {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < n; i++) {
      const w = rnd() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
    }
  } else if (kind === 'brown') {
    let last = 0;
    for (let i = 0; i < n; i++) { const w = rnd() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
  } else if (kind === 'patter') {
    // seyrek, kısa damla darbeleri (yağmurun çıtırtısı)
    for (let i = 0; i < n; i++) d[i] = 0;
    const drops = Math.floor(seconds * 900);
    for (let k = 0; k < drops; k++) {
      const p = Math.floor(rnd() * n), amp = (0.15 + rnd() * 0.85) * (rnd() < 0.08 ? 1.6 : 1);
      const len = 40 + Math.floor(rnd() * 160);
      for (let i = 0; i < len && p + i < n; i++) d[p + i] += (rnd() * 2 - 1) * amp * Math.exp(-i / (len * 0.28));
    }
  }
  return buf;
}

function makeImpulse(ctx, seconds, decay) {
  const n = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, n, ctx.sampleRate);
  const rnd = mulberry32(42);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < n; i++) d[i] = (rnd() * 2 - 1) * Math.pow(1 - i / n, decay);
  }
  return buf;
}

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.on = false;
    this.built = false;
    this.rnd = mulberry32(2718);
    this.nextWave = 0;
    this.nextHorn = 0;
    this.nextGull = 0;
    this.storm = 0.7;
    this.wind = 10;
  }

  /** ctx verilmezse gerçek zamanlı AudioContext oluşturur (kullanıcı hareketinden sonra çağrılmalı) */
  async enable(ctx) {
    if (!this.ctx) {
      this.ctx = ctx || new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive' });
      this.build();
    }
    if (this.ctx.resume) await this.ctx.resume();
    this.on = true;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(0.72, t, 0.4);
    this.nextWave = t + 1; this.nextHorn = t + 14 + this.rnd() * 20; this.nextGull = t + 5;
  }

  disable() {
    if (!this.ctx) return;
    this.on = false;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(0, t, 0.15);
    setTimeout(() => { if (!this.on && this.ctx.suspend) this.ctx.suspend(); }, 700);
  }

  build() {
    const ctx = this.ctx;
    const out = ctx.destination;
    this.master = ctx.createGain(); this.master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.knee.value = 20; comp.ratio.value = 4; comp.attack.value = 0.005; comp.release.value = 0.25;
    this.master.connect(comp); comp.connect(out);

    // uzay hissi için reverb
    this.verb = ctx.createConvolver(); this.verb.buffer = makeImpulse(ctx, 3.2, 2.6);
    this.verbGain = ctx.createGain(); this.verbGain.gain.value = 0.5;
    this.verb.connect(this.verbGain); this.verbGain.connect(this.master);

    const loop = (buf, dest, rate = 1) => {
      const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.playbackRate.value = rate; s.connect(dest); s.start(); return s;
    };
    this.white = makeNoise(ctx, 4, 'white', 1);
    this.pink = makeNoise(ctx, 6, 'pink', 2);
    this.brown = makeNoise(ctx, 8, 'brown', 3);
    this.patter = makeNoise(ctx, 3.7, 'patter', 4);
    this.patter2 = makeNoise(ctx, 5.3, 'patter', 5);

    // --- yağmur ---
    this.rainGain = ctx.createGain(); this.rainGain.gain.value = 0;
    const rHP = ctx.createBiquadFilter(); rHP.type = 'highpass'; rHP.frequency.value = 700;
    const rLP = ctx.createBiquadFilter(); rLP.type = 'lowpass'; rLP.frequency.value = 9500;
    const rPk = ctx.createBiquadFilter(); rPk.type = 'peaking'; rPk.frequency.value = 3600; rPk.gain.value = 4; rPk.Q.value = 0.7;
    rHP.connect(rPk); rPk.connect(rLP); rLP.connect(this.rainGain);
    loop(this.white, rHP);
    this.patterGain = ctx.createGain(); this.patterGain.gain.value = 0;
    const pBP = ctx.createBiquadFilter(); pBP.type = 'bandpass'; pBP.frequency.value = 2600; pBP.Q.value = 0.5;
    pBP.connect(this.patterGain);
    loop(this.patter, pBP); loop(this.patter2, pBP, 1.03);
    this.rainGain.connect(this.master); this.patterGain.connect(this.master);
    const rainSend = ctx.createGain(); rainSend.gain.value = 0.25; this.rainGain.connect(rainSend); rainSend.connect(this.verb);

    // --- rüzgâr ---
    this.windGain = ctx.createGain(); this.windGain.gain.value = 0;
    this.windBP = ctx.createBiquadFilter(); this.windBP.type = 'bandpass'; this.windBP.frequency.value = 300; this.windBP.Q.value = 1.1;
    loop(this.brown, this.windBP);
    this.windBP.connect(this.windGain);
    const hBP = ctx.createBiquadFilter(); hBP.type = 'bandpass'; hBP.frequency.value = 780; hBP.Q.value = 7;
    this.howlGain = ctx.createGain(); this.howlGain.gain.value = 0;
    loop(this.pink, hBP); hBP.connect(this.howlGain);
    this.howlBP = hBP;
    this.windGain.connect(this.master); this.howlGain.connect(this.master);
    const windSend = ctx.createGain(); windSend.gain.value = 0.3; this.windGain.connect(windSend); windSend.connect(this.verb);
    // hamle LFO'ları
    const lfo = (freq, depth, param) => {
      const o = ctx.createOscillator(); o.frequency.value = freq; const g = ctx.createGain(); g.gain.value = depth;
      o.connect(g); g.connect(param); o.start(); return o;
    };
    lfo(0.11, 140, this.windBP.frequency); lfo(0.29, 90, this.windBP.frequency);
    lfo(0.07, 260, hBP.frequency); lfo(0.19, 120, hBP.frequency);
    this.windGust = ctx.createGain(); this.windGust.gain.value = 1;
    lfo(0.13, 0.28, this.windGain.gain); lfo(0.043, 0.2, this.howlGain.gain);

    // --- dalgalar ---
    this.seaBase = ctx.createGain(); this.seaBase.gain.value = 0;
    const sLP = ctx.createBiquadFilter(); sLP.type = 'lowpass'; sLP.frequency.value = 260;
    loop(this.brown, sLP, 0.7); sLP.connect(this.seaBase); this.seaBase.connect(this.master);
    this.waveGain = ctx.createGain(); this.waveGain.gain.value = 0;
    this.waveLP = ctx.createBiquadFilter(); this.waveLP.type = 'lowpass'; this.waveLP.frequency.value = 400; this.waveLP.Q.value = 0.8;
    const wHP = ctx.createBiquadFilter(); wHP.type = 'highpass'; wHP.frequency.value = 90;
    loop(this.pink, this.waveLP, 0.9); this.waveLP.connect(wHP); wHP.connect(this.waveGain); this.waveGain.connect(this.master);
    const waveSend = ctx.createGain(); waveSend.gain.value = 0.35; this.waveGain.connect(waveSend); waveSend.connect(this.verb);
    this.built = true;
  }

  setStorm(storm, wind) {
    this.storm = storm; this.wind = wind;
    if (!this.built || !this.on) return;
    const t = this.ctx.currentTime, k = 0.35;
    const rain = clamp((storm - 0.08) / 0.85, 0, 1);
    this.rainGain.gain.setTargetAtTime(Math.pow(rain, 1.15) * 0.34, t, k);
    this.patterGain.gain.setTargetAtTime(Math.pow(rain, 1.4) * 0.5, t, k);
    this.windGain.gain.setTargetAtTime(0.03 + Math.pow(storm, 1.2) * 0.42, t, k);
    this.howlGain.gain.setTargetAtTime(Math.pow(storm, 2.2) * 0.13, t, k);
    this.seaBase.gain.setTargetAtTime(0.10 + storm * 0.34, t, k);
    this.windBP.Q.setTargetAtTime(0.9 + storm * 1.6, t, 0.5);
    this.verbGain.gain.setTargetAtTime(0.35 + storm * 0.3, t, 0.5);
  }

  // Bir dalga şişmesi, kırılması ve geri çekilmesi
  swell(t0, level) {
    const ctx = this.ctx;
    const g = this.waveGain.gain, f = this.waveLP.frequency;
    const rise = 1.6 + this.rnd() * 1.4;
    const peak = t0 + rise;
    const decay = 2.6 + this.rnd() * 2.0;
    g.setValueAtTime(0.0001, t0);
    g.linearRampToValueAtTime(level * 0.45, peak - 0.25);
    g.linearRampToValueAtTime(level, peak);
    g.exponentialRampToValueAtTime(0.0002, peak + decay);
    f.setValueAtTime(300, t0);
    f.exponentialRampToValueAtTime(700, peak - 0.2);
    f.exponentialRampToValueAtTime(2600 + this.storm * 1500, peak + 0.12);
    f.exponentialRampToValueAtTime(380, peak + decay);
  }

  // Zamanlayıcı: horizon zamanına kadar olayları planla
  schedule(horizon) {
    if (!this.built) return;
    const r = this.rnd;
    while (this.nextWave < horizon) {
      const lvl = (0.08 + this.storm * 0.42) * (0.6 + r() * 0.6);
      this.swell(this.nextWave, lvl);
      this.nextWave += lerp(9.5, 5.5, this.storm) + r() * 3.5;
    }
    if (this.nextHorn < horizon) { this.horn(this.nextHorn); this.nextHorn += 45 + r() * 50; }
    if (this.nextGull < horizon) {
      if (this.storm < 0.85) this.gull(this.nextGull);
      this.nextGull += (7 + r() * 12) * (1 + this.storm * 1.5);
    }
  }

  update() {
    if (!this.built || !this.on) return;
    this.schedule(this.ctx.currentTime + 2.5);
  }

  /** delay: sn, loudness 0..1 */
  thunder({ delay, distance, loudness = 0.7 }) {
    if (!this.built || !this.on) return;
    const ctx = this.ctx, r = this.rnd;
    const t0 = ctx.currentTime + delay;
    const near = clamp(1 - (distance - 300) / 800, 0, 1);
    // çatlama (yakın şimşekte belirgin)
    if (near > 0.2) {
      const src = ctx.createBufferSource(); src.buffer = this.white;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2500 + r() * 1500; bp.Q.value = 0.6;
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(loudness * 0.65 * near, t0 + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0005, t0 + 0.22 + near * 0.25);
      src.connect(bp); bp.connect(g); g.connect(this.master); g.connect(this.verb);
      src.start(t0, r() * 2); src.stop(t0 + 0.6);
    }
    // gümleme: kahverengi gürültü + alçalan alçak geçiren
    const dur = 4.2 + r() * 3.5 + (1 - near) * 1.5;
    const src = ctx.createBufferSource(); src.buffer = this.brown; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 0.9;
    lp.frequency.setValueAtTime(600 + near * 900, t0);
    lp.frequency.exponentialRampToValueAtTime(70, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    let t = t0; const base = loudness * (1.25 + near * 1.3);
    g.gain.linearRampToValueAtTime(base * 1.0, t0 + 0.05);
    const bursts = 4 + Math.floor(r() * 5);
    for (let i = 0; i < bursts; i++) {
      t += (dur / bursts) * (0.6 + r() * 0.8);
      const a = base * Math.pow(1 - i / (bursts + 1), 1.6) * (0.35 + r() * 0.65);
      g.gain.linearRampToValueAtTime(a, t);
      g.gain.linearRampToValueAtTime(a * 0.25, t + 0.25 + r() * 0.5);
    }
    g.gain.linearRampToValueAtTime(0.0001, t0 + dur + 1.2);
    src.connect(lp); lp.connect(g); g.connect(this.master);
    const send = ctx.createGain(); send.gain.value = 0.6; g.connect(send); send.connect(this.verb);
    src.start(t0, r() * 5); src.stop(t0 + dur + 1.5);
    // sub bas
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(58 + r() * 12, t0); o.frequency.exponentialRampToValueAtTime(32, t0 + dur);
    const og = ctx.createGain(); og.gain.setValueAtTime(0, t0); og.gain.linearRampToValueAtTime(base * 0.55, t0 + 0.2); og.gain.exponentialRampToValueAtTime(0.0005, t0 + dur * 0.8);
    o.connect(og); og.connect(this.master); o.start(t0); o.stop(t0 + dur);
  }

  // Uzaktan vapur düdüğü: iki tonlu testere dalgası
  horn(t0) {
    const ctx = this.ctx;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t0);
    const level = 0.05 + 0.03 * (1 - this.storm);
    g.gain.linearRampToValueAtTime(level, t0 + 0.35);
    g.gain.setValueAtTime(level, t0 + 1.9);
    g.gain.exponentialRampToValueAtTime(0.0004, t0 + 3.6);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = 2;
    for (const [f, dt] of [[98, 0], [123.5, 0], [196, 0]]) {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = (this.rnd() - 0.5) * 8;
      const og = ctx.createGain(); og.gain.value = f > 150 ? 0.35 : 1;
      o.connect(og); og.connect(lp); o.start(t0 + dt); o.stop(t0 + 3.7);
    }
    lp.connect(g); g.connect(this.master);
    const send = ctx.createGain(); send.gain.value = 0.9; g.connect(send); send.connect(this.verb);
  }

  gull(t0) {
    const ctx = this.ctx, r = this.rnd;
    const n = 2 + Math.floor(r() * 3);
    let t = t0;
    const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (pan) { pan.pan.value = (r() - 0.5) * 1.6; pan.connect(this.master); }
    for (let i = 0; i < n; i++) {
      const o = ctx.createOscillator(); o.type = 'sawtooth';
      const f0 = 900 + r() * 500;
      o.frequency.setValueAtTime(f0 * 0.75, t);
      o.frequency.linearRampToValueAtTime(f0 * 1.5, t + 0.12);
      o.frequency.linearRampToValueAtTime(f0 * 0.9, t + 0.32);
      const vib = ctx.createOscillator(); vib.frequency.value = 38; const vg = ctx.createGain(); vg.gain.value = 60;
      vib.connect(vg); vg.connect(o.frequency);
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1900; bp.Q.value = 1.2;
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.028, t + 0.04); g.gain.exponentialRampToValueAtTime(0.0005, t + 0.4);
      o.connect(bp); bp.connect(g); g.connect(pan || this.master);
      o.start(t); o.stop(t + 0.45); vib.start(t); vib.stop(t + 0.45);
      t += 0.32 + r() * 0.12;
    }
  }
}
