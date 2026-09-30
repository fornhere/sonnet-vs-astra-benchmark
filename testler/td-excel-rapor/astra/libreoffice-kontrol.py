"""Read-only source access. Test workbook in memory; never save changes to panel.xlsx."""
import uno, json, math
from pathlib import Path
from com.sun.star.beans import PropertyValue
from com.sun.star.table import CellRangeAddress

R=Path(__file__).resolve().parent
def prop(n,v):
 p=PropertyValue();p.Name=n;p.Value=v;return p
local=uno.getComponentContext();resolver=local.ServiceManager.createInstanceWithContext('com.sun.star.bridge.UnoUrlResolver',local)
ctx=resolver.resolve('uno:socket,host=127.0.0.1,port=20120;urp;StarOffice.ComponentContext')
desktop=ctx.ServiceManager.createInstanceWithContext('com.sun.star.frame.Desktop',ctx)
doc=desktop.loadComponentFromURL(uno.systemPathToFileUrl(str(R/'panel.xlsx')),'_blank',0,(prop('Hidden',True),prop('ReadOnly',False),prop('UpdateDocMode',3)))
doc.calculateAll();ss=doc.Sheets
p=ss.getByName('Panel');s=ss.getByName('Satışlar');g=ss.getByName('Giderler');m=ss.getByName('Aylık hesap');k=ss.getByName('Kanal ve Ürün');u=ss.getByName('Kullanım')
log=[];expected=json.loads((R/'calisma/veri.json').read_text())
def value(sh,addr):return sh.getCellRangeByName(addr).Value
def check(name,actual,expected,tol=.011):
 ok=abs(actual-expected)<tol if isinstance(expected,(int,float)) else actual==expected
 log.append({'test':name,'actual':actual,'expected':expected,'pass':ok})
 if not ok:raise AssertionError(log[-1])
def calc():doc.calculateAll()
try:
 check('base net',value(p,'B8'),4908772.25);check('base result',value(p,'G8'),70787.25)
 for i,month in enumerate(expected['months']):
  c=chr(67+i)
  for row,key in [(6,'orders'),(7,'returns'),(10,'gross'),(11,'discount_tl'),(14,'net'),(23,'result')]:check(f'month {i+1} {key}',value(m,f'{c}{row}'),month[key])
 for start,arr in [(6,expected['channels']),(15,expected['products'])]:
  for i,x in enumerate(arr):
   for c,key in [('C','orders'),('D','net'),('G','discount_tl'),('H','shipping')]:check(f'segment {start+i} {key}',value(k,f'{c}{start+i}'),x[key])
 for r in range(30,35):check(f'audit row {r}',value(u,f'F{r}'),0)
 p.getCellRangeByName('N30').Value=0;calc();check('commission zero',value(p,'N34'),70787.25)
 p.getCellRangeByName('N30').Value=.2;calc();check('commission twenty',value(p,'N34'),-176903.8)
 p.getCellRangeByName('N30').Value=.1
 s.getCellRangeByName('F5').Value=3;s.getCellRangeByName('I5').Value=555;calc()
 check('edited sale net +185',value(p,'B8'),4908957.25);check('edited sale result +185',value(p,'G8'),70972.25)
 s.getCellRangeByName('F5').Value=2;s.getCellRangeByName('I5').Value=370
 s.getCellRangeByName('K5').String='Evet';calc();check('full return net -370',value(p,'B8'),4908402.25)
 s.getCellRangeByName('K5').String='Hayır';calc()
 old=g.getCellRangeByName('E5').Value;g.getCellRangeByName('E5').String='';calc();check('missing cost result n.a.',p.getCellRangeByName('G8').String,'n.a.')
 g.getCellRangeByName('E5').Value=0;calc();check('zero cost stays zero',value(p,'G8'),70787.25+old)
 g.getCellRangeByName('E5').Value=old;calc()
 p.getCellRangeByName('D5').Value=2026;calc();check('missing year net',value(p,'B8'),0);check('missing year result',p.getCellRangeByName('G8').String,'n.a.')
 p.getCellRangeByName('D5').Value=2025;calc()
 db=doc.DatabaseRanges.getByName('Sat');area=db.DataArea;newrow=area.EndRow+1
 serial=value(s,'B8640')
 s.getCellRangeByPosition(0,newrow,11,newrow).setDataArray(((99999,serial,'Web sitesi','Karadeniz Sabahı 250g','Çay',2,100,.1,180,45,'Hayır',1),))
 rr=newrow+1
 for col,f in [(12,f'=IF(LOWER(C{rr})="web sitesi";"Web sitesi";C{rr})'),(13,f'=F{rr}*G{rr}'),(14,f'=N{rr}-I{rr}'),(15,f'=ABS(I{rr}-ROUND(N{rr}*(1-H{rr});2))')]:s.getCellByPosition(col,newrow).Formula=f
 area.EndRow=newrow;db.DataArea=area;calc()
 check('appended sale net',value(p,'B8'),4908952.25);check('appended sale result',value(p,'G8'),70922.25)
 check('appended web net',value(k,'D8'),1165627)
 check('appended December discount',value(m,'N11'),17532)
 # Restore in-memory input before closing; no changes written to delivery file.
 s.getCellByPosition(11,newrow).Value=0;calc();check('excluded appended sale',value(p,'G8'),70787.25)
 print('PASS',len(log),'checks in LibreOffice')
finally:
 (R/'calisma/libreoffice-kontrol.json').write_text(json.dumps(log,ensure_ascii=False,indent=2))
 doc.close(True);desktop.terminate()
