// Fully procedural soundscape: steppe wind, overtone drone, sparse morin-khuur-like phrases, crickets at night.
export function makeAudio() {
  let ctx = null, master, wind, windG, windF, droneG, musG, cricketG, verbIn, on = false, started = false, nextNote = 0, nextChirp = 0;
  const mood = { steppe: 0.55, scale: 0.7, gaze: 0.9, whip: 0.8, deck: 0.6, dusk: 1.0, explore: 0.45 };
  let musLevel = 0.5;

  function noiseBuffer(sec, color) {
    const b = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate), d = b.getChannelData(0);
    let l = 0; for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; l = color ? (l + 0.02 * w) / 1.02 : w; d[i] = color ? l * 3.5 : w; }
    return b;
  }
  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    // reverb
    const conv = ctx.createConvolver(); const len = ctx.sampleRate * 3.6, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    conv.buffer = ir; const verbG = ctx.createGain(); verbG.gain.value = 0.55; conv.connect(verbG); verbG.connect(master);
    verbIn = ctx.createGain(); verbIn.connect(conv);
    // wind
    wind = ctx.createBufferSource(); wind.buffer = noiseBuffer(6, true); wind.loop = true;
    windF = ctx.createBiquadFilter(); windF.type = 'bandpass'; windF.frequency.value = 500; windF.Q.value = 0.55;
    windG = ctx.createGain(); windG.gain.value = 0.2;
    wind.connect(windF); windF.connect(windG); windG.connect(master); windG.connect(verbIn);
    const lfo = ctx.createOscillator(), lfoG = ctx.createGain(); lfo.frequency.value = 0.07; lfoG.gain.value = 260; lfo.connect(lfoG); lfoG.connect(windF.frequency); lfo.start();
    wind.start();
    // drone with formants
    droneG = ctx.createGain(); droneG.gain.value = 0.0; droneG.connect(master); droneG.connect(verbIn);
    const f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 520; f1.Q.value = 6;
    const f2 = ctx.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 1600; f2.Q.value = 11;
    const mix = ctx.createGain(); mix.gain.value = 1; f1.connect(mix); f2.connect(mix); mix.connect(droneG);
    const dl = ctx.createOscillator(), dlg = ctx.createGain(); dl.frequency.value = 0.045; dlg.gain.value = 700; dl.connect(dlg); dlg.connect(f2.frequency); dl.start();
    for (const [f, g] of [[55, 0.9], [55.3, 0.6], [82.4, 0.35], [110.2, 0.25]]) {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const og = ctx.createGain(); og.gain.value = g * 0.5;
      o.connect(og); og.connect(f1); og.connect(f2); o.start();
    }
    const sub = ctx.createOscillator(); sub.frequency.value = 55; const sg = ctx.createGain(); sg.gain.value = 0.16; sub.connect(sg); sg.connect(droneG); sub.start();
    // music bus
    musG = ctx.createGain(); musG.gain.value = 0.5; musG.connect(master); musG.connect(verbIn);
    // crickets
    cricketG = ctx.createGain(); cricketG.gain.value = 0; cricketG.connect(master);
    const co = ctx.createOscillator(); co.frequency.value = 4300; const am = ctx.createGain(); am.gain.value = 0;
    const ml = ctx.createOscillator(); ml.type = 'square'; ml.frequency.value = 33; const mg = ctx.createGain(); mg.gain.value = 0.5; ml.connect(mg); mg.connect(am.gain);
    const gate = ctx.createOscillator(); gate.type = 'square'; gate.frequency.value = 2.2; const gg = ctx.createGain(); gg.gain.value = 0.5; gate.connect(gg); gg.connect(am.gain);
    co.connect(am); am.connect(cricketG); co.start(); ml.start(); gate.start();
    const co2 = ctx.createOscillator(); co2.frequency.value = 3600; const am2 = ctx.createGain(); am2.gain.value = 0;
    const ml2 = ctx.createOscillator(); ml2.type = 'square'; ml2.frequency.value = 27; const mg2 = ctx.createGain(); mg2.gain.value = 0.5; ml2.connect(mg2); mg2.connect(am2.gain);
    const gate2 = ctx.createOscillator(); gate2.type = 'square'; gate2.frequency.value = 1.7; const gg2 = ctx.createGain(); gg2.gain.value = 0.5; gate2.connect(gg2); gg2.connect(am2.gain);
    co2.connect(am2); am2.connect(cricketG); co2.start(); ml2.start(); gate2.start();
  }
  const PENT = [0, 2, 4, 7, 9, 12, 14, 16, 19];  // major pentatonic degrees
  function note(freq, t, dur, vel) {
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(freq * 0.985, t); o.frequency.linearRampToValueAtTime(freq, t + 0.12);
    const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = freq * 2.003;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(700, t); f.frequency.linearRampToValueAtTime(2100, t + 0.35); f.frequency.linearRampToValueAtTime(900, t + dur); f.Q.value = 2;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vel, t + 0.25); g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    const vib = ctx.createOscillator(); vib.frequency.value = 5.2; const vg = ctx.createGain(); vg.gain.value = freq * 0.006; vib.connect(vg); vg.connect(o.frequency);
    o.connect(f); o2.connect(f); f.connect(g); g.connect(musG);
    o.start(t); o2.start(t); vib.start(t); o.stop(t + dur + 0.1); o2.stop(t + dur + 0.1); vib.stop(t + dur + 0.1);
  }
  function chirp(t) {
    const o = ctx.createOscillator(); o.type = 'sine'; const g = ctx.createGain(); const f0 = 2600 + Math.random() * 1800;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f0 * 1.5, t + 0.07); o.frequency.exponentialRampToValueAtTime(f0 * 0.8, t + 0.16);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.03, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0005, t + 0.18);
    o.connect(g); g.connect(master); g.connect(verbIn); o.start(t); o.stop(t + 0.22);
  }
  return {
    start() { if (started) return; started = true; try { init(); ctx.resume(); on = true; master.gain.setTargetAtTime(0.85, ctx.currentTime, 1.5); nextNote = ctx.currentTime + 3; } catch (e) { started = false; } },
    toggle() {
      if (!started) { this.start(); return on; }
      on = !on; master.gain.setTargetAtTime(on ? 0.85 : 0, ctx.currentTime, 0.4); if (on) ctx.resume(); return on;
    },
    update(night, chapter, dt) {
      if (!started || !on) return;
      const t = ctx.currentTime, m = mood[chapter] ?? 0.5;
      musLevel += (m - musLevel) * Math.min(1, dt * 0.4);
      windG.gain.setTargetAtTime(0.16 + 0.10 * (1 - night) - 0.05 * night, t, 0.8);
      droneG.gain.setTargetAtTime(0.05 + 0.09 * musLevel, t, 1.2);
      musG.gain.setTargetAtTime(0.35 + 0.35 * musLevel, t, 1.0);
      cricketG.gain.setTargetAtTime(0.028 * night, t, 1.5);
      if (t > nextNote) {
        const base = 146.83; // D3
        let deg = PENT[(Math.random() * PENT.length) | 0];
        const f = base * Math.pow(2, deg / 12);
        note(f, t + 0.05, 3.2 + Math.random() * 2.5, 0.07 + 0.06 * musLevel);
        if (Math.random() < 0.45) note(base * Math.pow(2, PENT[(Math.random() * 5) | 0] / 12), t + 0.9, 3.5, 0.045);
        nextNote = t + 2.6 + Math.random() * (5.5 - 2.4 * musLevel);
      }
      if (night < 0.5 && t > nextChirp) { chirp(t); if (Math.random() < 0.5) chirp(t + 0.24); nextChirp = t + 1.5 + Math.random() * 6; }
    },
  };
}
