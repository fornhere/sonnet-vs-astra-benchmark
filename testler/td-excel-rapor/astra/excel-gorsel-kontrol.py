import uno,json
from pathlib import Path
from com.sun.star.beans import PropertyValue
from com.sun.star.table import CellRangeAddress
R=Path(__file__).resolve().parent
def prop(n,v):p=PropertyValue();p.Name=n;p.Value=v;return p
ctx0=uno.getComponentContext();resolver=ctx0.ServiceManager.createInstanceWithContext('com.sun.star.bridge.UnoUrlResolver',ctx0);ctx=resolver.resolve('uno:socket,host=127.0.0.1,port=20120;urp;StarOffice.ComponentContext');desk=ctx.ServiceManager.createInstanceWithContext('com.sun.star.frame.Desktop',ctx)
doc=desk.loadComponentFromURL(uno.systemPathToFileUrl(str(R/'panel.xlsx')),'_blank',0,(prop('Hidden',True),prop('ReadOnly',True),prop('UpdateDocMode',3)))
doc.calculateAll();ss=doc.Sheets;logs={'dates':ss.getByName('Satışlar').getCellRangeByName('B5').String,'net':ss.getByName('Panel').getCellRangeByName('B8').Value,'result':ss.getByName('Panel').getCellRangeByName('G8').Value,'tables':list(doc.DatabaseRanges.ElementNames)}
for i,(name,rg) in enumerate([('Panel','B2:N44'),('Kanal ve Ürün','B2:O40'),('Aylık hesap','B2:N36'),('Satışlar','A1:P15'),('Giderler','A1:F16'),('Kullanım','B2:J52')]):
 s=ss.getByName(name);s.setPrintAreas((s.getCellRangeByName(rg).RangeAddress,))
 style=doc.StyleFamilies.getByName('PageStyles').getByName(s.PageStyle);style.IsLandscape=True;style.Width=29700;style.Height=21000;style.ScaleToPagesX=1;style.ScaleToPagesY=1
doc.storeToURL(uno.systemPathToFileUrl(str(R/'calisma/excel-onizleme.pdf')),(prop('FilterName','calc_pdf_Export'),))
(R/'calisma/excel-native-kontrol.json').write_text(json.dumps(logs,ensure_ascii=False,indent=2));print(logs)
doc.close(True);desk.terminate()
