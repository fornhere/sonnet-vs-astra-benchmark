const path = require('path'), fs = require('fs');
const { renderAll } = require('./render');
(async () => {
  const which = process.argv.slice(2);
  const posts = ['p1', 'p2', 'p3', 'p4'].filter(p => !which.length || which.includes(p));
  const jobs = [];
  for (const p of posts) {
    if (!fs.existsSync(path.join(__dirname, 'posts', p + '.js'))) continue;
    const post = require('./posts/' + p);
    const hd = path.join(__dirname, 'html', post.dir), od = path.join(__dirname, '..', 'gonderiler', post.dir);
    fs.mkdirSync(hd, { recursive: true }); fs.mkdirSync(od, { recursive: true });
    post.slides.forEach((h, i) => { const n = String(i + 1).padStart(2, '0'); fs.writeFileSync(path.join(hd, n + '.html'), h); jobs.push({ html: path.join(hd, n + '.html'), png: path.join(od, n + '.png') }); });
  }
  await renderAll(jobs, 1); console.log('rendered', jobs.length);
})();
