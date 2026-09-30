import * as esbuild from 'esbuild';
await esbuild.build({ entryPoints: ['src/main.js'], bundle: true, format: 'iife', outfile: 'dist/app.js', minify: process.argv.includes('--min'), sourcemap: false, target: 'es2020', logLevel: 'info' });
