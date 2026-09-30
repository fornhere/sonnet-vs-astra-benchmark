import fs from 'node:fs/promises';
import { Workbook, SpreadsheetFile, FileBlob } from '@oai/artifact-tool';
const d=JSON.parse(await fs.readFile('calisma/veri.json','utf8'));
const w=Workbook.create();
const names=['Panel','Kanal ve Ürün','Aylık hesap','Satışlar','Giderler','Kullanım'];
const [pan,seg,mo,sales,cost,guide]=names.map(n=>w.worksheets.add(n));
const C={ink:'#193B36',green:'#24766A',orange:'#B35D37',cream:'#FAF8F1',light:'#EDF2EE',input:'#FFF0CE',red:'#AE3B35',blue:'#245A9A',gray:'#63756F'};
const num='#,##0;(#,##0);"–"',money='#,##0.00;(#,##0.00);"–"',pct='0.0%;(0.0%);"–"';
const cell=(s,a,v)=>s.getRange(a).values=[[v]];
const form=(s,a,f)=>s.getRange(a).formulas=[[f]];
function text(s,range,t,size=11,color=C.ink,bold=false){s.mergeCells(range); const r=s.getRange(range);r.values=[[t]];r.format.font={name:'Arial',size,color,bold};}
function band(s,range,t){text(s,range,t,11,'#FFFFFF',true);s.getRange(range).format.fill=C.ink;s.getRange(range).format.rowHeight=25;}
function base(s,range){s.showGridLines=false;s.getRange(range).format.font={name:'Arial',size:11,color:C.ink};s.getRange(range).format.rowHeight=24;s.getRange(range).format.verticalAlignment='center';s.getRange(range).format.columnWidth=13;s.getRange('A:A').format.columnWidth=3;}
function header(s,range){s.getRange(range).format.fill=C.ink;s.getRange(range).format.font={name:'Arial',size:10,bold:true,color:'#FFFFFF'};s.getRange(range).format.wrapText=true;s.getRange(range).format.rowHeight=36;}
function conditional(s,range){s.getRange(range).conditionalFormats.add('cellIs',{operator:'lessThan',formula:0,format:{font:{color:C.red},fill:'#FCECE7'}});}
function chart(s,type,ranges,title,a,b,colors=[C.green,C.orange],fmt='#,##0," bin"'){
 const c=s.charts.add(type,ranges.map(x=>s.getRange(x)));c.title=title;c.setPosition(a,b);c.titleTextStyle.fontSize=14;c.titleTextStyle.typeface='Arial';c.hasLegend=ranges.length>2;
 c.legend={position:'bottom',textStyle:{typeface:'Arial',fontSize:11}};
 c.xAxis={axisType:'textAxis',textStyle:{typeface:'Arial',fontSize:10}};
 c.yAxis={numberFormatCode:fmt,numberFormatSourceLinked:false,textStyle:{typeface:'Arial',fontSize:10}};
 c.series.items.forEach((x,i)=>{x.fill=colors[i%colors.length];if(type==='line')x.line={fill:colors[i%colors.length],style:'solid',width:2}});
 return c;
}
const date=x=>new Date(x+'T00:00:00Z');
// Original source fields remain intact; only dates become typed Excel dates.
base(sales,'A1:L8640');sales.getRange('A:A').format.columnWidth=13;
text(sales,'A1:L1','SATIŞ KAYITLARI',16,C.ink,true);
text(sales,'A2:L2','A:K kaynak veridir. L = Dahil: 1 hesaba katılır, 0 hariç tutulur. Sarı sütunu her yeni kayıtta doldurun.',11,C.gray);
text(sales,'A3:L3','Yeni satır: tablonun son hücresinde Tab tuşuna basın; 12 alanı doldurun. Tablo genişleyince özetler güncellenir.',10,C.gray);
sales.getRange('A4:P4').values=[[...d.sales_headers,'Kanal grubu','Liste değeri','İndirim tutarı','Tutar farkı']];
sales.getRange(`A5:L${d.sales.length+4}`).values=d.sales.map(r=>r.map((v,i)=>i===1?date(v):v));
sales.getRange(`M5:P${d.sales.length+4}`).formulas=d.sales.map((r,i)=>{let n=i+5;return [`=IF(LOWER(C${n})="web sitesi","Web sitesi",C${n})`,`=F${n}*G${n}`,`=N${n}-I${n}`,`=ABS(I${n}-ROUND(N${n}*(1-H${n}),2))`]});
const st=sales.tables.add(`A4:P${d.sales.length+4}`,true,'Sat');
sales.getRange('M:P').format.columnWidth=19;sales.getRange('M5:P8640').format.font.color=C.green;sales.getRange('N5:P8640').setNumberFormat(money);
sales.getRange('B5:B8640').setNumberFormat('dd.mm.yyyy');sales.getRange('F5:G8640').setNumberFormat(num);sales.getRange('H5:H8640').setNumberFormat(pct);sales.getRange('I5:J8640').setNumberFormat(money);
sales.getRange('C:C').format.columnWidth=18;sales.getRange('D:D').format.columnWidth=30;sales.getRange('E:E').format.columnWidth=13;sales.getRange('G:J').format.columnWidth=18;
sales.getRange('L5:L8640').format.fill=C.input;sales.getRange('L5:L8640').format.font.color=C.blue;
sales.getRange('L5:L25000').dataValidation={rule:{type:'list',values:['0','1']}};
sales.getRange('K5:K25000').dataValidation={rule:{type:'list',values:['Hayır','Evet']}};
sales.getRange('C5:C25000').dataValidation={rule:{type:'list',values:['Mağaza','Trendyol','Web sitesi','Instagram DM']}};
sales.getRange('L5:L8640').conditionalFormats.add('cellIs',{operator:'equal',formula:0,format:{fill:'#FADCCE',font:{color:C.red,bold:true}}});
header(sales,'A4:P4');sales.freezePanes.freezeRows(4);sales.freezePanes.freezeColumns(2);
base(cost,'A1:F18');cost.getRange('A:A').format.columnWidth=16;cost.getRange('B:F').format.columnWidth=19;
text(cost,'A1:E1','AYLIK GİDERLER · TL',16,C.ink,true);
text(cost,'A2:E2','Her ay tek satır. Ayı gerçek tarih olarak ayın ilk günü girin.',10,C.gray);
text(cost,'A3:E3','Hammadde, kaynakta verilen aylık tutardır; ürün maliyetine dağıtılmaz.',10,C.gray);
cost.getRange('A4:F4').values=[[...d.expenses_headers,'Eksik alan']];cost.getRange('A5:E16').values=d.expenses.map(r=>[date(r[0]+'-01'),...r.slice(1)]);
cost.getRange('F5:F16').formulas=d.expenses.map((r,i)=>[`=4-COUNT(B${i+5}:E${i+5})`]);
cost.tables.add('A4:F16',true,'Gid');cost.getRange('A5:A16').setNumberFormat('mmm yyyy');cost.getRange('B5:E16').setNumberFormat(num);cost.getRange('A5:E16').format.font.color=C.blue;cost.getRange('A5:E16').format.fill=C.input;header(cost,'A4:F4');cost.freezePanes.freezeRows(4);
base(mo,'A1:N39');mo.getRange('B:B').format.columnWidth=29;mo.getRange('C:N').format.columnWidth=15;
text(mo,'B2:N2','AYLIK HESAP · TL',16,C.ink,true);text(mo,'B3:N3','Net satış = indirim sonrası tutar − iade. Kargo, iade edilen kayıtlar dahil korunur. Hammadde kaynak gideridir.',10,C.gray);
cell(mo,'B4','Dönem');
const months=['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
for(let i=0;i<12;i++){let col=String.fromCharCode(67+i);form(mo,`${col}4`,`=DATE('Panel'!$D$5,${i+1},1)`)}
mo.getRange('C4:N4').setNumberFormat('mmm yyyy');header(mo,'B4:N4');
const labels={6:'Sipariş',7:'İade siparişi',8:'İade oranı',10:'Liste değeri',11:'İndirim tutarı',12:'İndirim sonrası tutar',13:'İade tutarı',14:'NET SATIŞ',15:'Kargo gideri',16:'Hammadde gideri',17:'Hammadde ve kargo sonrası',18:'Katkı oranı (yaklaşım)',20:'Kira',21:'Personel',22:'Pazarlama',23:'BİLİNEN GİDERLER SONRASI',24:'Sonuç / net satış',26:'Başa baş net satış',27:'Net satış − başa baş',29:'Gider ay kaydı (beklenen 1)',30:'Gider boş hücre (beklenen 0)'};
Object.entries(labels).forEach(([r,l])=>cell(mo,`B${r}`,l));
const sr=col=>`Sat[${col}]`;
const sum=(col,crit='')=>`SUMIFS(${sr(col)},Sat[Dahil],1,Sat[Tarih],">="&CC$4,Sat[Tarih],"<"&EDATE(CC$4,1)${crit})`;
const count=(crit='')=>`COUNTIFS(Sat[Dahil],1,Sat[Tarih],">="&CC$4,Sat[Tarih],"<"&EDATE(CC$4,1)${crit})`;
for(let i=0;i<12;i++){
 let c=String.fromCharCode(67+i),set=(r,f)=>form(mo,`${c}${r}`,f.replaceAll('CC',c));
 set(6,'='+count());set(7,'='+count(',Sat[İade],"Evet"'));set(8,'=IF(CC6=0,"n.a.",CC7/CC6)');
 set(10,'='+sum('Liste değeri'));
 set(12,'='+sum('Tutar (TL)'));set(11,'=CC10-CC12');set(13,'='+sum('Tutar (TL)',',Sat[İade],"Evet"'));set(14,'=CC12-CC13');set(15,'='+sum('Kargo Maliyeti (TL)'));
 for(const [r,n] of [[16,'Hammadde'],[20,'Kira'],[21,'Personel'],[22,'Pazarlama']])set(r,`=IF(OR(CC29<>1,CC30>0),"n.a.",SUMIFS(Gid[${n}],Gid[Ay],CC$4))`);
 set(17,'=IF(ISNUMBER(CC16),CC14-CC15-CC16,"n.a.")');set(18,'=IF(OR(CC14=0,NOT(ISNUMBER(CC17))),"n.a.",CC17/CC14)');
 set(23,'=IF(OR(CC6=0,CC29<>1,CC30>0),"n.a.",CC17-SUM(CC20:CC22))');set(24,'=IF(OR(CC14=0,NOT(ISNUMBER(CC23))),"n.a.",CC23/CC14)');
 set(26,'=IF(OR(NOT(ISNUMBER(CC18)),CC18<=0),"n.a.",SUM(CC20:CC22)/CC18)');set(27,'=IF(ISNUMBER(CC26),CC14-CC26,"n.a.")');
 set(29,'=COUNTIFS(Gid[Ay],CC$4)');set(30,'=SUMIFS(Gid[Eksik alan],Gid[Ay],CC$4)');
}
mo.getRange('C6:N30').setNumberFormat(num);for(const r of [8,18,24])mo.getRange(`C${r}:N${r}`).setNumberFormat(pct);
for(const r of [14,17,23,26]){mo.getRange(`B${r}:N${r}`).format.fill=C.light;mo.getRange(`B${r}:N${r}`).format.font.bold=true;}
conditional(mo,'C23:N24');conditional(mo,'C27:N27');
text(mo,'B33:N33','Başa baş yaklaşımı: (kira + personel + pazarlama) / [(net satış − hammadde − kargo) / net satış].',10,C.gray);
text(mo,'B34:N34','Hammadde ve kargo oransal, diğer üç gider sabit varsayılır. Muhasebe kârı, nakit akışı veya tahmin değildir.',10,C.gray);
text(mo,'B36:N36','Gider ayı eksik / mükerrer ya da gider tutarı boşsa ilgili sonuç n.a. olur. Sıfır gider gerçek 0 olarak girilmelidir.',10,C.gray);
mo.freezePanes.freezeRows(4);mo.freezePanes.freezeColumns(2);
// Channel and product summaries share one source and one year control.
base(seg,'A1:N48');seg.getRange('B:B').format.columnWidth=31;seg.getRange('C:I').format.columnWidth=16;
text(seg,'B2:N2','KANAL VE ÜRÜN · '+ 'Yıllık görünüm',16,C.ink,true);text(seg,'B3:N3','Paneldeki yıla bağlıdır. Kanal karşılaştırmaları komisyon ve ürün maliyeti içermez; kârlılık sıralaması değildir.',10,C.gray);
const heads=['Kanal / ürün','Sipariş','Net satış TL','Pay','İade oranı','İndirim TL','Kargo TL','Kargo / satış'];
seg.getRange('B5:I5').values=[heads];header(seg,'B5:I5');seg.getRange('B14:I14').values=[heads];header(seg,'B14:I14');
const filter=`Sat[Dahil],1,Sat[Tarih],">="&DATE('Panel'!$D$5,1,1),Sat[Tarih],"<"&DATE('Panel'!$D$5+1,1,1)`;
for(const [r,name,key] of [...d.channels.map((v,i)=>[6+i,v.channel,'Kanal grubu']),...d.products.map((v,i)=>[15+i,v.product,'Ürün'])]){
 cell(seg,`B${r}`,name);const crit=`${filter},Sat[${key}],$B${r}`;
 form(seg,`C${r}`,`=COUNTIFS(${crit})`);form(seg,`D${r}`,`=SUMIFS(Sat[Tutar (TL)],${crit},Sat[İade],"Hayır")`);
 form(seg,`E${r}`,`=IF('Panel'!B8=0,"n.a.",D${r}/'Panel'!B8)`);
 form(seg,`F${r}`,`=IF(C${r}=0,"n.a.",COUNTIFS(${crit},Sat[İade],"Evet")/C${r})`);
 form(seg,`G${r}`,`=SUMIFS(Sat[İndirim tutarı],${crit})`);
 form(seg,`H${r}`,`=SUMIFS(Sat[Kargo Maliyeti (TL)],${crit})`);form(seg,`I${r}`,`=IF(D${r}=0,"n.a.",H${r}/D${r})`);
}
seg.getRange('C6:I20').setNumberFormat(num);for(const r of ['E6:F9','I6:I9','E15:F20','I15:I20'])seg.getRange(r).setNumberFormat(pct);
seg.getRange('F6:F9').conditionalFormats.add('cellIs',{operator:'greaterThan',formula:.05,format:{fill:'#FCECE7',font:{color:C.red}}});
text(seg,'B11:N11','Web sitesi ve web sitesi aynı kanaldır. Satışlar M sütunu yazımı standartlaştırır; kaynak kanal C sütununda korunur.',10,C.gray);
text(seg,'B22:N22','Ürün satırları 2025 net satış büyüklüğüne göre dizilidir; yeni veride sıra sabit kalır. Yeni ürün için satır ekleyin.',10,C.gray);
chart(seg,'bar',['B5:B9','D5:D9'],'Kanal net satışı (TL)','B25','H40');
chart(seg,'bar',['B5:B9','F5:F9'],'Kanal iade oranı','I25','O40',[C.orange],'0%');
// Main owner dashboard.
base(pan,'A1:N47');pan.getRange('B:N').format.columnWidth=13;pan.tabColor=C.ink;seg.tabColor=C.green;
text(pan,'B2:N2','DEMLİK / Yönetim paneli',16,C.ink,true);
text(pan,'B3:N3','İade sonrası satış, aylık sonuç ve komisyon riski. Tüm tutarlar TL; sarı hücreler değiştirilebilir.',10,C.gray);
cell(pan,'B5','Rapor yılı');cell(pan,'D5',2025);pan.getRange('D5').format.fill=C.input;pan.getRange('D5').format.font.color=C.blue;pan.getRange('D5').dataValidation={rule:{type:'whole',operator:'between',formula1:2020,formula2:2100}};
text(pan,'F5:N5','Kaynak: demlik-satis-2025.xlsx · Satışlar ve Giderler',10,C.gray);
for(const [a,b,label] of [['B7','E7','NET SATIŞ'],['G7','J7','BİLİNEN GİDERLER SONRASI'],['L7','N7','İADE ORANI']])text(pan,`${a}:${b}`,label,10,C.gray,true);
for(const [range,f,fmt] of [['B8:E9',"=SUM('Aylık hesap'!C14:N14)",num],['G8:J9',"=IF(COUNT('Aylık hesap'!C23:N23)<>12,\"n.a.\",SUM('Aylık hesap'!C23:N23))",num],['L8:N9',"=IF(SUM('Aylık hesap'!C6:N6)=0,\"n.a.\",SUM('Aylık hesap'!C7:N7)/SUM('Aylık hesap'!C6:N6))",pct]]){pan.mergeCells(range);pan.getRange(range).formulas=[[f]];pan.getRange(range).setNumberFormat(fmt);pan.getRange(range).format.font={name:'Arial',size:24,bold:true,color:C.ink};}
text(pan,'B11:N11','Sonuç; komisyon, vergi, finansman, stok değişimi ve kayıtsız giderleri içermez. Gerçek kâr olarak yorumlamayın.',10,C.orange);
pan.getRange('B29:H29').values=[['Ay','Net satış','Sonuç','İade oranı','Sipariş','Başa baş','Kargo']];header(pan,'B29:H29');
for(let i=0;i<12;i++){let r=30+i,c=String.fromCharCode(67+i);cell(pan,`B${r}`,months[i]);for(const [out,mr] of [['C',14],['D',23],['E',8],['F',6],['G',26],['H',15]])form(pan,`${out}${r}`,`='Aylık hesap'!${c}${mr}`)}
pan.getRange('C30:H41').setNumberFormat(num);pan.getRange('E30:E41').setNumberFormat(pct);conditional(pan,'D30:D41');
chart(pan,'line',['B29:B41','C29:C41','G29:G41'],'Net satış ve başa baş (TL)','B13','H27');
chart(pan,'line',['B29:B41','D29:D41'],'Bilinen giderler sonrası (TL)','I13','N27',[C.orange]);
band(pan,'J29:N29','KOMİSYON TESTİ');
text(pan,'J30:M30','Trendyol varsayımsal oran',10);cell(pan,'N30',.10);pan.getRange('N30').setNumberFormat(pct);pan.getRange('N30').format.fill=C.input;pan.getRange('N30').format.font.color=C.blue;
pan.getRange('N30').dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1}};
text(pan,'J32:M32','Varsayımsal komisyon TL',10);form(pan,'N32',"='Kanal ve Ürün'!D7*N30");pan.getRange('N32').setNumberFormat(num);
text(pan,'J34:M34','Test sonrası yıllık sonuç TL',10);form(pan,'N34','=IF(ISNUMBER(G8),G8-N32,"n.a.")');pan.getRange('N34').setNumberFormat(num);conditional(pan,'N34');
text(pan,'J36:M36','Sonucu sıfırlayan oran',10);form(pan,'N36',"=IF(OR(NOT(ISNUMBER(G8)),'Kanal ve Ürün'!D7=0),\"n.a.\",G8/'Kanal ve Ürün'!D7)");pan.getRange('N36').setNumberFormat(pct);
text(pan,'J38:N40','%10 yalnız test girdisidir. Gerçek komisyon bilinmiyor. Matrah: Trendyol net satışı. Diğer eksik giderler hariç.',10,C.gray);pan.getRange('J38:N40').format.wrapText=true;
text(pan,'B44:N44','Güncelleme: Satışlar tablosuna kayıt, Giderler tablosuna ay ekleyin; gerekirse yıl seçin. Ayrıntılar Kullanım sayfasında.',10,C.gray);
// Usage and traceable data-quality controls.
base(guide,'A1:J53');guide.getRange('B:B').format.columnWidth=25;guide.getRange('C:J').format.columnWidth=15;
text(guide,'B2:J2','GÜNCELLEME VE KONTROLLER',16,C.ink,true);
const notes=[
 ['01 · Satış ekleme','Satışlar tablosunun son hücresinden Tab ile satır açın. A:K alanlarını ve L Dahil=1 girin. M:P formülleri gelmezse üstten kopyalayın.'],
 ['02 · Tarih ve tutar','Tarih gerçek Excel tarihi olmalı. İndirim 0,10 = %10. Tutar, indirim sonrası ve iade düşülmeden önceki satış tutarıdır.'],
 ['03 · Gider ekleme','Giderler tablosunda her ay bir satır; ayın ilk günü. Bilinen sıfır gideri 0 girin. F kontrol formülü gelmezse üstten kopyalayın.'],
 ['04 · Kopyaları ayırma','Yeni kayıtları Sipariş No ile kontrol edin. Doğrulanmış birebir kopyada Dahil=0 seçin. Ayrı gerçek siparişi silmeyin.'],
 ['05 · Paneli yenileme','Rapor yılını Panel D5 hücresinden seçin. Otomatik hesaplama açık olmalı. Excel: Ctrl+Alt+F9. Grafikler özetlere bağlıdır.'],
 ['06 · Yeni ürün / kanal','Kanal ve Ürün özetine uygun satırı kopyalayıp adı değiştirin. Grafik aralığını genişletin. Yıllık toplamlar zaten tüm kayıtları kapsar.'],
 ['07 · Dönem kapsamı','Yıllık panel 12 tamamlanmış ay içindir. Eksik gider ayında sonuç n.a. olur. Kaynak 2025; aylık giderler tekrar tahmin edilmedi.'],
 ['Tanım ve sınır','İade=Evet tam iade varsayılır ve satış tarihinde düşülür. İade kargosu ayrıca yoktur. Tüm kayıtlı çıkış kargosu korunur.'],
 ['Kâr tanımı','Sonuç = net satış − kargo − hammadde − kira − personel − pazarlama. KDV, stok, komisyon ve tahsilat verisi yoktur.'],
 ['Temizleme','12 tam kopya analiz dışı bırakıldı. Kaynak A:K saklandı. 6 küçük harfli web sitesi kaydı aynı kanala dahil edildi.']
];
notes.forEach(([a,b],i)=>{let r=5+i*2;text(guide,`B${r}:C${r+1}`,a,10,C.ink,true);text(guide,`D${r}:J${r+1}`,b,10,C.gray);guide.getRange(`D${r}:J${r+1}`).format.wrapText=true;});
band(guide,'B27:J27','CANLI KONTROLLER · Tüm kayıtlar / seçilen yıl');
const controls=[['Kaynak kayıt sayısı','=COUNTA(Sat[Sipariş No])'],['Hariç tutulan kayıt','=COUNTIFS(Sat[Dahil],0)'],['Dahil alanı eksik/geçersiz','=COUNTA(Sat[Sipariş No])-COUNTIFS(Sat[Dahil],1)-COUNTIFS(Sat[Dahil],0)'],['Yıllık satış mutabakatı',`=SUMIFS(Sat[Tutar (TL)],${filter},Sat[İade],"Hayır")-Panel!B8`],['Kanal toplamı farkı',"=SUM('Kanal ve Ürün'!D6:D9)-Panel!B8"],['Ürün toplamı farkı',"=SUM('Kanal ve Ürün'!D15:D20)-Panel!B8"],['Tutar hesabı farkı (mutlak TL)','=SUM(Sat[Tutar farkı])']];
controls.forEach(([a,b],i)=>{let r=28+i;text(guide,`B${r}:E${r}`,a,10);form(guide,`F${r}`,b);guide.getRange(`F${r}`).setNumberFormat(money);if(i>=2)guide.getRange(`F${r}`).conditionalFormats.add('cellIs',{operator:'notEqual',formula:0,format:{fill:'#FCECE7',font:{color:C.red}}});});
text(guide,'H28:J31','Fark kontrolleri 0 olmalı. Yeni kategori fark üretirse özet satırını ekleyin.',10,C.gray);guide.getRange('H28:J31').format.wrapText=true;
band(guide,'B37:J37','HARIÇ TUTULAN BİREBİR KOPYALAR · Kaynak satır numaraları');
guide.getRange('B38:F38').values=[['Kaynak satır','Sipariş No','Tarih','Tutar TL','Kargo TL']];header(guide,'B38:F38');
guide.getRange('B39:F50').values=d.excluded.map(x=>[x['Kaynak satır'],x['Sipariş No'],date(x['Tarih']),x['Tutar (TL)'],x['Kargo Maliyeti (TL)']]);guide.getRange('D39:D50').setNumberFormat('dd.mm.yyyy');guide.getRange('E39:F50').setNumberFormat(money);
text(guide,'H38:J44','Hariç bırakma net satışı 5.398,25 TL, kargoyu 318,00 TL ve sonucu 5.080,25 TL azaltır. Giderler değiştirilmedi.',10,C.gray);guide.getRange('H38:J44').format.wrapText=true;
text(guide,'B52:J52','Kaynak: demlik-satis-2025.xlsx · Satışlar A1:K8637 ve Giderler A1:E13. Rapor ve PDF, 2025 verisinin sabit görünümüdür.',10,C.gray);
w.recalculate();
function assertNear(actual,expected,name){if(typeof actual!=='number'||Math.abs(actual-expected)>0.011)throw Error(`${name}: ${actual} != ${expected}`)}
assertNear(pan.getRange('B8').values[0][0],d.totals.net,'Net sales');assertNear(pan.getRange('G8').values[0][0],d.totals.result,'Result');
for(let i=0;i<12;i++){let c=String.fromCharCode(67+i);for(const [r,key] of [[6,'orders'],[7,'returns'],[10,'gross'],[11,'discount_tl'],[12,'amount'],[13,'return_tl'],[14,'net'],[15,'shipping'],[16,'material'],[23,'result']])assertNear(mo.getRange(`${c}${r}`).values[0][0],d.months[i][key],`Month ${i} ${key}`)}
for(const [start,arr] of [[6,d.channels],[15,d.products]])arr.forEach((v,i)=>{for(const [c,key] of [['C','orders'],['D','net'],['F','return_rate'],['G','discount_tl'],['H','shipping']])assertNear(seg.getRange(`${c}${start+i}`).values[0][0],v[key],`${start+i} ${key}`)});
console.log('PASS: independently verified monthly, channel and product summaries');
console.log((await w.inspect({kind:'table',range:'Panel!B7:N9',include:'values,formulas',tableMaxRows:3,tableMaxCols:13})).ndjson);
console.log((await w.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!|#NULL!',options:{useRegex:true,maxResults:20},summary:'Formula errors'})).ndjson);
console.log('Key values',pan.getRange('B8').values,pan.getRange('G8').values,pan.getRange('L8').values);
await (await SpreadsheetFile.exportXlsx(w)).save('panel.xlsx');
for(const [s,range,file] of [['Panel','A1:O45','panel'],['Kanal ve Ürün','A1:O41','kanal'],['Aylık hesap','A1:N36','aylik'],['Satışlar','A1:P13','satis'],['Giderler','A1:F17','gider'],['Kullanım','A1:J35','kullanim']]){
 try{const p=await w.render({sheetName:s,range,scale:1.5,format:'png'});await fs.writeFile(`calisma/${file}.png`,new Uint8Array(await p.arrayBuffer()));}catch(e){console.log('Render',s,e.message)}
}
await fs.writeFile('calisma/panel-kontrol.json',JSON.stringify({net:pan.getRange('B8').values,result:pan.getRange('G8').values,returns:pan.getRange('L8').values,checks:guide.getRange('F28:F34').values},null,2));
