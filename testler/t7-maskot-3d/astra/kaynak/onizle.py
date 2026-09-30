"""Yerel video önizlemesi; ileri/geri sarma için HTTP Range desteği."""
import os,re
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
os.chdir(Path(__file__).resolve().parent.parent)
class Handler(SimpleHTTPRequestHandler):
 def send_head(self):
  self.byte_range=None
  path=self.translate_path(self.path)
  header=self.headers.get('Range')
  if not header or not os.path.isfile(path):return super().send_head()
  m=re.fullmatch(r'bytes=(\d*)-(\d*)',header)
  if not m:return super().send_head()
  f=open(path,'rb');size=os.fstat(f.fileno()).st_size
  start=int(m[1]) if m[1] else max(0,size-int(m[2]));end=min(size-1,int(m[2])) if m[1] and m[2] else size-1
  if start>end or start>=size:
   f.close();self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.end_headers();return None
  self.byte_range=(start,end);self.send_response(206);self.send_header('Content-Type',self.guess_type(path));self.send_header('Content-Length',str(end-start+1));self.send_header('Content-Range',f'bytes {start}-{end}/{size}');self.end_headers();return f
 def end_headers(self):
  self.send_header('Accept-Ranges','bytes');super().end_headers()
 def copyfile(self,source,output):
  if not self.byte_range:return super().copyfile(source,output)
  start,end=self.byte_range;source.seek(start);remaining=end-start+1
  try:
   while remaining:
    data=source.read(min(65536,remaining))
    if not data:break
    output.write(data);remaining-=len(data)
  except (BrokenPipeError,ConnectionResetError):pass
print('http://localhost:18765/onizleme.html',flush=True)
ThreadingHTTPServer(('127.0.0.1',18765),Handler).serve_forever()
