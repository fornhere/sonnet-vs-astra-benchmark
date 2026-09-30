import { build } from 'esbuild';
const watch = process.argv.includes('--dev');
await build({
  entryPoints: ['src/main.js'], bundle: true, format: 'iife', outfile: 'dist/app.js',
  minify: !watch, sourcemap: false, target: 'es2020', legalComments: 'none',
  loader: { '.bin': 'binary' }, logLevel: 'info',
});
