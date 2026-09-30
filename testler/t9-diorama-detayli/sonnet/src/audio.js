// Web Audio ile kodla üretilen şehir ambiyansı (varsayılan kapalı). Gürültü + filtre + LFO + rastgele olaylar (korna, siren, kuş, dalga).
export class CityAudio {
  constructor() { this.ctx = null; this.on = false; this.timers = []; this.level = { night: 0, snow: 0, fog: 0, zoom: 0.5 }; }
  _noise(type = 'brown', secs = 4) {
    const c = this.ctx, n = c.sampleRate * secs, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    let l = 0, b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      if (type === 'brown') { l = (l + 0.02 * w) / 1.02; d[i] = l * 3.5; } else if (type === 'pink') { b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2; } else d[i] = w;
    }
    const s = c.createBufferSource(); s.buffer = buf; s.loop = true; return s;
  }
  _start() {
    const c = this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.master = c.createGain(); this.master.gain.value = 0; this.master.connect(c.destination);
    const comp = c.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 4; comp.connect(this.master); this.bus = comp;
    // 1) şehir uğultusu (kahverengi gürültü, alçak geçiren)
    const hum = this._noise('brown'); const hf = c.createBiquadFilter(); hf.type = 'lowpass'; hf.frequency.value = 380; const hg = c.createGain(); hg.gain.value = 0.55; hum.connect(hf).connect(hg).connect(this.bus); hum.start(); this.hf = hf;
    // 2) trafik hışırtısı (bant geçiren, yavaş LFO ile)
    const tr = this._noise('pink'); const tf = c.createBiquadFilter(); tf.type = 'bandpass'; tf.frequency.value = 900; tf.Q.value = 0.6; const tg = c.createGain(); tg.gain.value = 0.12;
    const lfo = c.createOscillator(); lfo.frequency.value = 0.11; const lg = c.createGain(); lg.gain.value = 0.06; lfo.connect(lg).connect(tg.gain); lfo.start(); tr.connect(tf).connect(tg).connect(this.bus); tr.start(); this.trafficGain = tg; this.tf = tf;
    // 3) su / rüzgâr
    const wn = this._noise('pink'); const wf = c.createBiquadFilter(); wf.type = 'lowpass'; wf.frequency.value = 700; const wg = c.createGain(); wg.gain.value = 0.05;
    const wl = c.createOscillator(); wl.frequency.value = 0.07; const wlg = c.createGain(); wlg.gain.value = 0.03; wl.connect(wlg).connect(wg.gain); wl.start(); wn.connect(wf).connect(wg).connect(this.bus); wn.start(); this.windGain = wg;
    // 4) gece cırcır böceği (yüksek frekans, tremolo)
    const cr = c.createOscillator(); cr.type = 'sine'; cr.frequency.value = 4300; const cg = c.createGain(); cg.gain.value = 0; const cl = c.createOscillator(); cl.frequency.value = 22; const clg = c.createGain(); clg.gain.value = 0.5; const cb = c.createGain(); cb.gain.value = 0.5;
    cl.connect(clg).connect(cb.gain); cr.connect(cb).connect(cg).connect(this.bus); cr.start(); cl.start(); this.cricket = cg;
  }
  _panner() { const c = this.ctx; if (c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = Math.random() * 2 - 1; return p; } return c.createGain(); }
  _horn() {
    const c = this.ctx, t = c.currentTime, p = this._panner(), g = c.createGain(); g.gain.value = 0; g.connect(p).connect(this.bus);
    const f = 330 + Math.random() * 180; for (const m of [1, 1.26]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f * m; const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; o.connect(lp).connect(g); o.start(t); o.stop(t + 0.6); }
    const dur = 0.15 + Math.random() * 0.35; g.gain.linearRampToValueAtTime(0.05 * (0.5 + this.level.zoom), t + 0.03); g.gain.setValueAtTime(0.05, t + dur); g.gain.linearRampToValueAtTime(0, t + dur + 0.08);
    if (Math.random() < 0.4) setTimeout(() => this.on && this._horn(), 260);
  }
  _siren() {
    const c = this.ctx, t = c.currentTime, p = this._panner(), g = c.createGain(); g.gain.value = 0; g.connect(p).connect(this.bus);
    const o = c.createOscillator(); o.type = 'triangle'; const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800; o.connect(lp).connect(g);
    for (let i = 0; i < 6; i++) { o.frequency.linearRampToValueAtTime(i % 2 ? 640 : 960, t + 0.7 * (i + 1)); }
    g.gain.linearRampToValueAtTime(0.02 * (0.4 + this.level.zoom), t + 1); g.gain.setValueAtTime(0.02, t + 3.4); g.gain.linearRampToValueAtTime(0, t + 4.4); o.frequency.setValueAtTime(700, t); o.start(t); o.stop(t + 4.6);
  }
  _bird() {
    if (this.level.night > 0.6 || this.level.snow > 0.5) return;
    const c = this.ctx, t = c.currentTime, p = this._panner(), g = c.createGain(); g.gain.value = 0; g.connect(p).connect(this.bus);
    const n = 2 + Math.floor(Math.random() * 4), base = 2600 + Math.random() * 1800;
    for (let i = 0; i < n; i++) { const o = c.createOscillator(); o.type = 'sine'; const t0 = t + i * 0.09; o.frequency.setValueAtTime(base * (1 + 0.25 * Math.random()), t0); o.frequency.exponentialRampToValueAtTime(base * 0.7, t0 + 0.07); const gg = c.createGain(); gg.gain.setValueAtTime(0, t0); gg.gain.linearRampToValueAtTime(0.015 * (0.4 + this.level.zoom), t0 + 0.015); gg.gain.linearRampToValueAtTime(0, t0 + 0.08); o.connect(gg).connect(g); o.start(t0); o.stop(t0 + 0.1); }
    g.gain.value = 1;
  }
  _schedule() {
    const loop = (fn, min, max) => { const go = () => { if (!this.on) return; fn(); this.timers.push(setTimeout(go, (min + Math.random() * (max - min)) * 1000)); }; this.timers.push(setTimeout(go, (min + Math.random() * (max - min)) * 1000 * 0.4)); };
    loop(() => this._horn(), 2.5, 9); loop(() => this._siren(), 26, 60); loop(() => this._bird(), 3, 9);
  }
  // her karede değil, ara sıra çağrılır: gündüz/gece, hava ve yakınlığa göre karışım
  setState({ night = 0, snow = 0, fog = 0, zoom = 0.5 } = {}) {
    this.level = { night, snow, fog, zoom }; if (!this.ctx) return; const c = this.ctx, t = c.currentTime;
    this.cricket.gain.setTargetAtTime(0.012 * Math.max(0, night - 0.55) * (1 - snow), t, 0.6);
    this.trafficGain.gain.setTargetAtTime(0.09 + 0.11 * zoom - 0.05 * snow, t, 0.5);
    this.hf.frequency.setTargetAtTime(380 - 140 * snow - 60 * fog + 80 * zoom, t, 0.5);
    this.windGain.gain.setTargetAtTime(0.04 + 0.05 * (1 - zoom) + 0.03 * snow, t, 0.5);
  }
  async toggle() {
    if (!this.ctx) this._start(); if (this.ctx.state === 'suspended') await this.ctx.resume();
    this.on = !this.on; const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t); this.master.gain.setTargetAtTime(this.on ? 0.9 : 0, t, 0.25);
    if (this.on) this._schedule(); else { this.timers.forEach(clearTimeout); this.timers = []; }
    return this.on;
  }
}
