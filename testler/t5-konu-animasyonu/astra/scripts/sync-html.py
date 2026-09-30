from pathlib import Path
p=Path('gps-film/index.html');s=p.read_text();start=s.index('/* All frames are pure functions');end=s.index('</script>',start);s=s[:start]+Path('gps-film/film.js').read_text()+'\n'+s[end:];p.write_text(s)
