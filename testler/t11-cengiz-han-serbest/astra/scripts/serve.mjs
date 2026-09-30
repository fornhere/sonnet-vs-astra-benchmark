import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const port=Number(process.env.PORT||5173),root=process.cwd();
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.json':'application/json','.png':'image/png','.jpg':'image/jpeg'};
http.createServer((req,res)=>{let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return;}const file=path.resolve(root,'.'+(url==='/'?'/index.html':url));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.stat(file,(err,stat)=>{if(err||!stat.isFile()){res.writeHead(404).end('Bulunamadı');return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(file).pipe(res);});}).listen(port,'127.0.0.1',()=>console.log(`Ebedî Bozkır → http://localhost:${port}`));
