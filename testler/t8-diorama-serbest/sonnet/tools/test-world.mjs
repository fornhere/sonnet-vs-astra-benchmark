import fs from 'fs'; import zlib from 'zlib'; import vm from 'vm';
const src = fs.readFileSync('dist/world-data.js', 'utf8'); const ctx = { window: {} }; vm.runInNewContext(src, ctx);
const { W, D } = ctx.window.NYDATA; const bytes = zlib.inflateSync(Buffer.from(ctx.window.NYGRID, 'base64'));
const { decodeGrid, buildWorld } = await import('../src/world.js'); const { meshWorld } = await import('../src/mesher.js');
let t = performance.now(); const g = decodeGrid(new Uint8Array(bytes), W, D); const w = buildWorld(g); console.log('world', (performance.now() - t) | 0, 'ms');
t = performance.now(); const st = meshWorld(w, { statsOnly: false }); console.log('mesh', (performance.now() - t) | 0, 'ms', 'faces', st.totalFaces, 'chunks', st.chunks.length);
