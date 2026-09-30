export function createAudio() {
  let ctx,
    master,
    on = false;
  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0,
      seed = 8731;
    for (let i = 0; i < data.length; i++) {
      seed = (seed * 16807) % 2147483647;
      last = (last + 0.02 * ((seed / 2147483647) * 2 - 1)) / 1.02;
      data[i] = last * 5;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const low = ctx.createBiquadFilter();
    low.type = "lowpass";
    low.frequency.value = 520;
    source.connect(low);
    low.connect(master);
    source.start();
    for (const [freq, gain] of [
      [52, 0.075],
      [104, 0.026],
      [207, 0.008],
    ]) {
      const osc = ctx.createOscillator(),
        g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      g.gain.value = gain;
      osc.connect(g);
      g.connect(master);
      osc.start();
    }
    const lfo = ctx.createOscillator(),
      lg = ctx.createGain();
    lfo.frequency.value = 0.12;
    lg.gain.value = 110;
    lfo.connect(lg);
    lg.connect(low.frequency);
    lfo.start();
  }
  return {
    async toggle() {
      if (!ctx) init();
      await ctx.resume();
      on = !on;
      master.gain.setTargetAtTime(on ? 0.28 : 0, ctx.currentTime, 0.6);
      return on;
    },
    get on() {
      return on;
    },
  };
}
