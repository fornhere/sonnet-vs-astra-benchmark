import fs from 'node:fs';
import {spawn} from 'node:child_process';
const lines=JSON.parse(fs.readFileSync('gps-film/script.json'));
for(const line of lines){
 fs.writeFileSync(`gps-film/assets/${line.id}.txt`,line.text);
 const args=['/home/forn/.agents/skills/media-use/audio/scripts/heygen-tts.mjs',`gps-film/assets/${line.id}.txt`,'-o',`gps-film/assets/vo-${line.id}.wav`,'--words',`gps-film/assets/vo-${line.id}.json`,'--lang','tr','--speed','1.05'];
 await new Promise((res,rej)=>{let p=spawn('node',args,{stdio:'inherit'});p.on('exit',c=>c?rej(new Error('voice '+c)):res())});
}
