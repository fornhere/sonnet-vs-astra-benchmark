"""Chromium PDF'sinin sayfa sınırını tam 16:9 yapar; metin ve çizime dokunmaz."""
from pathlib import Path
import json
import subprocess
root=Path(__file__).resolve().parents[1]
source=root/'kontrol/taslak.pdf'
doc=json.loads(subprocess.check_output(['qpdf','--json-output=2','--json-stream-data=none',str(source)]))
changed={}
for key, record in doc['qpdf'][1].items():
    value=record.get('value',{})
    if isinstance(value,dict) and value.get('/Type')=='/Page':
        value['/MediaBox']=[0,0,1200,675]
        value['/CropBox']=[0,0,1200,675]
        changed[key]=record
assert len(changed)==12
patch=root/'kontrol/pdf-boyut.json'
patch.write_text(json.dumps({'qpdf':[doc['qpdf'][0],changed]}),encoding='utf-8')
subprocess.run(['qpdf',str(source),f'--update-from-json={patch}',str(root/'sunum.pdf')],check=True)
