import pandas as pd, numpy as np
pd.set_option('display.width',200); pd.set_option('display.max_columns',30); pd.set_option('display.max_rows',200)
f='/home/forn/sonnet-vs-astra/td-excel-rapor/girdi/demlik-satis-2025.xlsx'
d=pd.read_excel(f,sheet_name='Satışlar'); g=pd.read_excel(f,sheet_name='Giderler')
print(d.dtypes); print(d.isna().sum()); print(d.describe(include='all').T)
print(g)
for c in ['Kanal','Ürün','Kategori','İade','İndirim','Adet']:
    print(d[c].value_counts(dropna=False).head(40))
print(d.groupby(['Kategori','Ürün'])['Birim Fiyat (TL)'].agg(['min','max','nunique','count']))
print('dup sipno',d['Sipariş No'].duplicated().sum(), 'dup rows', d.duplicated().sum(), 'dup excl no', d.drop(columns='Sipariş No').duplicated().sum())
d['Tarih']=pd.to_datetime(d['Tarih'],errors='coerce'); print(d['Tarih'].min(), d['Tarih'].max(), d['Tarih'].isna().sum())
chk=(d['Adet']*d['Birim Fiyat (TL)']*(1-d['İndirim'])).round(2)
print('tutar mismatch', ((chk-d['Tutar (TL)']).abs()>0.01).sum())
print(d[((chk-d['Tutar (TL)']).abs()>0.01)].head(20))
print(d['Sipariş No'].diff().value_counts().head())
