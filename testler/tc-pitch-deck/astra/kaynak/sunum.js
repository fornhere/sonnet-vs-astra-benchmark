(() => {
  const slides = [...document.querySelectorAll('.slide')];
  let index = Math.max(0, Math.min(slides.length - 1, Number(location.hash.slice(2) || 1) - 1));
  document.body.classList.add('presenting');
  function resize(){ document.documentElement.style.setProperty('--scale', Math.min(innerWidth / 1600, innerHeight / 900)); }
  function show(n){ index = Math.max(0, Math.min(slides.length - 1, n)); slides.forEach((s,i) => s.classList.toggle('active',i===index)); document.getElementById('counter').textContent = `${index+1} / ${slides.length}`; history.replaceState(null,'',`#s${index+1}`); }
  document.getElementById('prev').onclick=()=>show(index-1);
  document.getElementById('next').onclick=()=>show(index+1);
  document.getElementById('full').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
  addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(index+1);}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(index-1);}if(e.key==='Home')show(0);if(e.key==='End')show(slides.length-1);if(e.key.toLowerCase()==='f')document.getElementById('full').click();});
  addEventListener('resize',resize);resize();show(index);
})();
