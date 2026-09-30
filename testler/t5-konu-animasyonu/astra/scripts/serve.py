"""Local video preview server with HTTP byte-range support for seeking."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
import os

ROOT = Path(__file__).resolve().parent.parent
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*a,**k): super().__init__(*a,directory=str(ROOT),**k)
    def send_head(self):
        self.byte_range=None
        path=self.translate_path(self.path)
        request=self.headers.get('Range')
        if request and os.path.isfile(path):
            size=os.path.getsize(path);m=re.fullmatch(r'bytes=(\d*)-(\d*)',request)
            if m:
                start=int(m[1]) if m[1] else max(0,size-int(m[2]));end=min(int(m[2]) if m[1] and m[2] else size-1,size-1)
                if start>=size or end<start:
                    self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.end_headers();return None
                f=open(path,'rb');f.seek(start);self.byte_range=(start,end)
                self.send_response(206);self.send_header('Content-Type',self.guess_type(path));self.send_header('Accept-Ranges','bytes');self.send_header('Content-Range',f'bytes {start}-{end}/{size}');self.send_header('Content-Length',str(end-start+1));self.end_headers();return f
        return super().send_head()
    def end_headers(self):
        self.send_header('Accept-Ranges','bytes');super().end_headers()
    def copyfile(self,source,outputfile):
        if self.byte_range is None:return super().copyfile(source,outputfile)
        left=self.byte_range[1]-self.byte_range[0]+1
        while left>0:
            chunk=source.read(min(left,1024*1024))
            if not chunk:break
            outputfile.write(chunk);left-=len(chunk)

print('http://127.0.0.1:8124/IZLE.html',flush=True)
ThreadingHTTPServer(('127.0.0.1',8124),Handler).serve_forever()
