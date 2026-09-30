import puppeteer from 'puppeteer-core';
const flagsets = {
  a: ['--headless=new','--no-sandbox','--use-angle=vulkan','--enable-features=Vulkan','--ignore-gpu-blocklist','--enable-gpu-rasterization'],
  b: ['--headless=new','--no-sandbox','--use-gl=angle','--use-angle=gl-egl','--ignore-gpu-blocklist'],
  c: ['--headless=new','--no-sandbox','--enable-unsafe-swiftshader'],
};
for (const [k,flags] of Object.entries(flagsets)) {
  try {
    const b = await puppeteer.launch({executablePath:'/usr/bin/chromium', args:flags, headless:true});
    const p = await b.newPage();
    await p.setContent('<canvas id=c></canvas>');
    const r = await p.evaluate(()=>{const gl=document.getElementById('c').getContext('webgl2'); if(!gl) return 'nogl'; const e=gl.getExtension('WEBGL_debug_renderer_info'); return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'?';});
    console.log(k, r);
    await b.close();
  } catch(e){ console.log(k,'ERR',e.message.slice(0,200)); }
}
