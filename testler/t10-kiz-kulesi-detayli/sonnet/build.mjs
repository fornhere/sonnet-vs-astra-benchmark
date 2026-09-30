// src/ altindaki moduler kodu tek bir klasik script'e (dist/app.js) paketler.
// Boylece index.html hem file:// hem de http.server ile acilir (ES module CORS sorunu yok).
import { build, context } from 'esbuild';

const opts = {
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'iife',
  target: 'es2022',
  outfile: 'dist/app.js',
  sourcemap: true,
  minify: !process.argv.includes('--dev'),
  legalComments: 'none',
  logLevel: 'info',
};

if (process.argv.includes('--watch')) {
  const ctx = await context(opts);
  await ctx.watch();
} else {
  await build(opts);
}
