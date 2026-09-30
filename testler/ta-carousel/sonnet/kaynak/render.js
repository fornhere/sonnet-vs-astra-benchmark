// html -> png (1080x1350) chromium headless
const { execFileSync, spawn } = require('child_process');
const fs = require('fs'), path = require('path');
function renderOne(html, png) {
  return new Promise((res, rej) => {
    const p = spawn('/usr/bin/chromium', ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
      '--window-size=1080,1350', '--virtual-time-budget=4000', `--screenshot=${png}`, 'file://' + html], { stdio: 'ignore' });
    p.on('exit', c => c === 0 ? res() : rej(new Error('chromium ' + c + ' ' + html)));
  });
}
async function renderAll(jobs, conc = 4) {
  const q = jobs.slice();
  await Promise.all([...Array(conc)].map(async () => { while (q.length) { const j = q.shift(); await renderOne(j.html, j.png); } }));
}
module.exports = { renderAll, renderOne };
