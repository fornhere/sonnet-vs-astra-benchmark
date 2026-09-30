"""Add native Excel table calculated-column metadata and print/view settings.

The workbook itself is authored and recalculated with @oai/artifact-tool.
This small OOXML pass adds table autofill metadata missing from that export.
"""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from lxml import etree as E
import openpyxl
R=Path(__file__).resolve().parent;src=R/'panel.xlsx';NS='http://schemas.openxmlformats.org/spreadsheetml/2006/main';q=lambda n:f'{{{NS}}}{n}'
cached=openpyxl.load_workbook(src,data_only=True)
with ZipFile(src) as z: files={n:z.read(n) for n in z.namelist()}
for file in ['xl/tables/table1.xml','xl/tables/table2.xml']:
 root=E.fromstring(files[file]);name=root.get('name');cols=root.find(q('tableColumns'))
 formulas=({'Kanal grubu':'IF(LOWER([@Kanal])="web sitesi","Web sitesi",[@Kanal])','Liste değeri':'[@Adet]*[@[Birim Fiyat (TL)]]','İndirim tutarı':'[@[Liste değeri]]-[@[Tutar (TL)]]','Tutar farkı':'ABS([@[Tutar (TL)]]-ROUND([@[Liste değeri]]*(1-[@İndirim]),2))'} if name=='Sat' else {'Eksik alan':'4-COUNT([@Kira],[@Personel],[@Pazarlama],[@Hammadde])'})
 for col in cols:
  if col.get('name') in formulas:
   old=col.find(q('calculatedColumnFormula'))
   if old is None:old=E.SubElement(col,q('calculatedColumnFormula'))
   old.text=formulas[col.get('name')]
 af=root.find(q('autoFilter'))
 if af is None:af=E.Element(q('autoFilter'));root.insert(0,af)
 af.set('ref',root.get('ref'))
 root.find(q('tableStyleInfo')).set('name','TableStyleLight1')
 files[file]=E.tostring(root,xml_declaration=True,encoding='UTF-8')
book=E.fromstring(files['xl/workbook.xml']);calc=book.find(q('calcPr'))
if calc is None:calc=E.SubElement(book,q('calcPr'))
calc.set('calcMode','auto');calc.set('fullCalcOnLoad','1');calc.set('forceFullCalc','1')
dn=book.find(q('definedNames'))
if dn is None:dn=E.Element(q('definedNames'));book.insert(list(book).index(calc),dn)
for old in list(dn):
 if old.get('name') in ['_xlnm.Print_Area','_xlnm.Print_Titles']:dn.remove(old)
areas=["'Panel'!$B$2:$N$44","'Kanal ve Ürün'!$B$2:$O$40","'Aylık hesap'!$B$2:$N$36","'Satışlar'!$A$1:$P$8640","'Giderler'!$A$1:$F$16","'Kullanım'!$B$2:$J$52"]
for i,area in enumerate(areas):
 el=E.SubElement(dn,q('definedName'),name='_xlnm.Print_Area',localSheetId=str(i));el.text=area
 if i==3:
  el=E.SubElement(dn,q('definedName'),name='_xlnm.Print_Titles',localSheetId=str(i));el.text="'Satışlar'!$1:$4"
files['xl/workbook.xml']=E.tostring(book,xml_declaration=True,encoding='UTF-8')
for i in range(1,7):
 file=f'xl/worksheets/sheet{i}.xml';root=E.fromstring(files[file]);props=root.find(q('sheetPr'))
 if props is None:props=E.Element(q('sheetPr'));root.insert(0,props)
 setup=props.find(q('pageSetUpPr'))
 if setup is None:setup=E.SubElement(props,q('pageSetUpPr'))
 setup.set('fitToPage','1')
 view=root.find(q('sheetViews')).find(q('sheetView'));view.set('zoomScale','85' if i in [1,2,3,6] else '95')
 # Place settings before drawing/table relationships, as required by the schema.
 for old in root.findall(q('pageMargins'))+root.findall(q('pageSetup')):root.remove(old)
 idx=next((j for j,x in enumerate(root) if E.QName(x).localname in ['drawing','legacyDrawing','tableParts','extLst']),len(root))
 margin=E.Element(q('pageMargins'),left='.25',right='.25',top='.3',bottom='.3',header='.1',footer='.1');root.insert(idx,margin)
 setup=E.Element(q('pageSetup'),paperSize='9',orientation='landscape',fitToWidth='1',fitToHeight='0' if i==4 else '1');root.insert(idx+1,setup)
 files[file]=E.tostring(root,xml_declaration=True,encoding='UTF-8')
CN='http://schemas.openxmlformats.org/drawingml/2006/chart';cq=lambda n:f'{{{CN}}}{n}'
for file in list(files):
 if '/charts/' not in file or not file.endswith('.xml'):continue
 root=E.fromstring(files[file])
 # Use a line for signed monthly results: the target Calc version renders
 # imported negative columns upwards despite correct signed source data.
 if file.endswith('/chart2.xml'):
  bar=root.find('.//'+cq('barChart'))
  if bar is not None:
   bar.tag=cq('lineChart')
   for el in list(bar):
    if E.QName(el).localname in ['barDir','grouping','gapWidth','overlap']:bar.remove(el)
   bar.insert(0,E.Element(cq('grouping'),val='standard'))
   a='http://schemas.openxmlformats.org/drawingml/2006/main'
   for ser in bar.findall(cq('ser')):
    sp=ser.find(cq('spPr'))
    ln=E.SubElement(sp,f'{{{a}}}ln',w='25400');fill=E.SubElement(ln,f'{{{a}}}solidFill');E.SubElement(fill,f'{{{a}}}srgbClr',val='B35D37')
 for bar in root.findall('.//'+cq('barChart')):
  group=bar.find(cq('grouping'))
  if group is None:group=E.Element(cq('grouping'));bar.insert(1,group)
  group.set('val','clustered')
 for lc in root.findall('.//'+cq('lineChart')):
  for parent in [lc]+lc.findall(cq('ser')):
   smooth=parent.find(cq('smooth'))
   if smooth is None:
    smooth=E.Element(cq('smooth'))
    idx=next((i for i,x in enumerate(parent) if E.QName(x).localname=='axId'),len(parent));parent.insert(idx,smooth)
   smooth.set('val','0')
 for axis in root.findall('.//'+cq('catAx'))+root.findall('.//'+cq('valAx')):
  cross=axis.find(cq('crosses'))
  if cross is None:
   cross=E.Element(cq('crosses'));idx=list(axis).index(axis.find(cq('crossAx')))+1;axis.insert(idx,cross)
  cross.set('val','autoZero')
 for typ,cachetyp in [('numRef','numCache'),('strRef','strCache')]:
  for ref in root.findall('.//'+cq(typ)):
   formula=ref.find(cq('f')).text
   if '!' not in formula:continue
   sheet,rg=formula.split('!',1);sheet=sheet.strip("'").replace("''","'");rg=rg.replace('$','')
   vals=[c.value for row in cached[sheet][rg] for c in row]
   cache=ref.find(cq(cachetyp))
   if cache is None:cache=E.SubElement(ref,cq(cachetyp))
   for el in list(cache):
    if E.QName(el).localname!='formatCode':cache.remove(el)
   E.SubElement(cache,cq('ptCount'),val=str(len(vals)))
   for i,v in enumerate(vals):
    pt=E.SubElement(cache,cq('pt'),idx=str(i));E.SubElement(pt,cq('v')).text=str(v if v is not None else '')
 files[file]=E.tostring(root,xml_declaration=True,encoding='UTF-8')
with ZipFile(src,'w',ZIP_DEFLATED) as z:
 for n,data in files.items():z.writestr(n,data)
print('Native filters, calculated columns, auto calculation and print layouts added.')
