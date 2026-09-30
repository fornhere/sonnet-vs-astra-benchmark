import fs from 'fs'; import zlib from 'zlib'; import vm from 'vm';
const src = fs.readFileSync('dist/world-data.js', 'utf8'); const ctx = { window: {} }; vm.runInNewContext(src, ctx); globalThis.window = ctx.window;
const { W, D } = ctx.window.NYDATA; const bytes = zlib.inflateSync(Buffer.from(ctx.window.NYGRID, 'base64'));
const { decodeGrid, buildWorld } = await import('../src/world.js');
const world = buildWorld(decodeGrid(new Uint8Array(bytes), W, D));
const hero = await import('../src/hero.js');
// monkey: Model.mesh -> dump
const orig = hero.Model.prototype.mesh; hero.Model.prototype.mesh = function () { if (this.W > 300) { let hi = []; for (let x = 0; x < this.W; x++) for (let z = 0; z < this.D; z++) for (let y = 60; y < this.H; y++) if (this.get(x, y, z)) hi.push([x, y, z]); const cols = new Map(); for (const [x,y,z] of hi) { const k = x+','+z; cols.set(k, Math.max(cols.get(k)||0, y)); } console.log('cols', [...cols.entries()].slice(0,40).join(' ; ')); } return null; };
globalThis.__dbg = 1; let shown=0; const os = hero.Model.prototype.set; hero.Model.prototype.set = function (x,y,z,m) { if (this.W>300 && (y + this.H * (x + this.W * z)) === (79 + 84*(70+383*24)) && shown++<3) console.log('SET', x,y,z, new Error('trace').stack.split('\n').slice(1,4).join(' | ')); return os.call(this,x,y,z,m); };
const { buildBridge } = await import('../src/bridges.js');
const P = (k) => [ctx.window.NYDATA.pts[k][0], D - ctx.window.NYDATA.pts[k][1]];
buildBridge(world, { name: 'mb', type: 'steelsusp', A: P('mbr_m'), B: P('mbr_b'), deckW: 9, deckY: 13.8 }, { add() {} }, {});
