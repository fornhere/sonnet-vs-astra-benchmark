// All sound is synthesized locally. No audio files and no network requests.
export class StormAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.intensity = 0.78;
    this.timers = new Set();
  }
  async toggle() {
    if (!this.ctx) this.init();
    this.enabled = !this.enabled;
    await this.ctx.resume();
    this.master.gain.setTargetAtTime(
      this.enabled ? 0.58 : 0,
      this.ctx.currentTime,
      0.25,
    );
    return this.enabled;
  }
  init() {
    const C = window.AudioContext || window.webkitAudioContext;
    this.ctx = new C();
    const c = this.ctx;
    this.master = c.createGain();
    this.master.gain.value = 0;
    const limiter = c.createDynamicsCompressor();
    limiter.threshold.value = -14;
    limiter.ratio.value = 6;
    this.master.connect(limiter);
    limiter.connect(c.destination);
    this.layers = [];
    const b = c.createBuffer(2, c.sampleRate * 6, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      let brown = 0;
      for (let i = 0; i < d.length; i++) {
        brown = (brown + (Math.random() * 2 - 1) * 0.045) / 1.025;
        d[i] = brown * 3 + (Math.random() * 2 - 1) * 0.3;
      }
    }
    for (const [type, freq, q, volume, lfoHz] of [
      ["highpass", 1800, 0.3, 0.2, 0.13],
      ["lowpass", 430, 0.7, 0.48, 0.085],
      ["bandpass", 720, 0.5, 0.15, 0.19],
    ]) {
      const s = c.createBufferSource();
      s.buffer = b;
      s.loop = true;
      const f = c.createBiquadFilter();
      f.type = type;
      f.frequency.value = freq;
      f.Q.value = q;
      const g = c.createGain();
      g.gain.value = volume;
      const lfo = c.createOscillator(),
        lg = c.createGain();
      lfo.frequency.value = lfoHz;
      lg.gain.value = volume * 0.3;
      lfo.connect(lg);
      lg.connect(g.gain);
      lfo.start();
      s.connect(f);
      f.connect(g);
      g.connect(this.master);
      s.start(Math.random() * 0.1);
      this.layers.push({ g, volume, lg });
    }
    this.setIntensity(this.intensity);
  }
  setIntensity(v) {
    this.intensity = v;
    if (this.ctx)
      for (let { g, volume, lg } of this.layers) {
        g.gain.setTargetAtTime(
          volume * (0.12 + v * 0.88),
          this.ctx.currentTime,
          0.5,
        );
        lg.gain.setTargetAtTime(
          volume * (0.06 + v * 0.24),
          this.ctx.currentTime,
          0.5,
        );
      }
  }
  thunder(delay = 1 + Math.random() * 2) {
    if (!this.enabled) return;
    const id = setTimeout(() => {
      this.timers.delete(id);
      if (!this.enabled) return;
      const c = this.ctx,
        t = c.currentTime,
        n = c.sampleRate * 5,
        b = c.createBuffer(1, n, c.sampleRate),
        d = b.getChannelData(0);
      let brown = 0;
      for (let i = 0; i < n; i++) {
        brown = (brown + (Math.random() * 2 - 1) * 0.1) / 1.02;
        d[i] = brown * 2.3 + (Math.random() * 2 - 1) * 0.12;
      }
      let s = c.createBufferSource();
      s.buffer = b;
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(1200, t);
      f.frequency.exponentialRampToValueAtTime(90, t + 4.5);
      const g = c.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.85, t + 0.07);
      g.gain.exponentialRampToValueAtTime(0.015, t + 4.8);
      s.connect(f);
      f.connect(g);
      g.connect(this.master);
      s.start();
      s.stop(t + 5);
      s.onended = () => {
        s.disconnect();
        f.disconnect();
        g.disconnect();
      };
    }, delay * 1000);
    this.timers.add(id);
  }
}
