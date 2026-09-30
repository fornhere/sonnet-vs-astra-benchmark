import {build} from 'esbuild';
import {mkdir,copyFile,rm} from 'node:fs/promises';
await build({entryPoints:['main.js'],bundle:true,minify:true,format:'iife',target:['es2020'],outfile:'app.js',legalComments:'eof'});
await rm('dist',{recursive:true,force:true});
await mkdir('dist/assets',{recursive:true});
for(const name of ['index.html','style.css','app.js'])await copyFile(name,'dist/'+name);
for(const name of ['emblem.svg','cormorant.ttf','manrope.ttf','Three-LICENSE.txt','Cormorant-OFL.txt','Manrope-OFL.txt'])await copyFile('assets/'+name,'dist/assets/'+name);
console.log('Hazır: index.html doğrudan açılabilir. Dağıtım kopyası: dist/');
