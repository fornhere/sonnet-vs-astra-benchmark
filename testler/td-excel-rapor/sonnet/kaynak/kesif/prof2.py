import pandas as pd, numpy as np
pd.set_option('display.width',220); pd.set_option('display.max_columns',30); pd.set_option('display.max_rows',300)
f='/home/forn/sonnet-vs-astra/td-excel-rapor/girdi/demlik-satis-2025.xlsx'
d=pd.read_excel(f,sheet_name='Satışlar'); g=pd.read_excel(f,sheet_name='Giderler')
d.columns=['no','tarih','kanal','urun','kat','adet','fiyat','ind','tutar','kargo','iade']
d['tarih']=pd.to_datetime(d.tarih)
print(d[d.no.duplicated(keep=False)].sort_values('no'))
print(d[d.adet<0])
print(d[d.kanal=='web sitesi'])
print(d[(d.no.diff()!=1)].head(40))
# tutar sign for iade
print(d.groupby('iade').tutar.agg(['sum','count']))
print(d.groupby(['kanal','iade']).size().unstack())
print(d.groupby('kanal').kargo.agg(['min','max','mean','sum']))
print(d.groupby(['kanal','kat']).kargo.agg(['min','max']))
print(d.groupby('kanal').ind.agg(['mean',lambda s:(s>0).mean()]))
print(d.groupby(['urun','kanal']).size().unstack())
print(d.groupby(['urun','ind']).size().unstack())
print(d.groupby(['kanal','ind']).size().unstack())
