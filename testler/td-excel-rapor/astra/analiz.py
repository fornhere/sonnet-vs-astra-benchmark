from pathlib import Path
import json, hashlib
import pandas as pd
import numpy as np

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'calisma'; OUT.mkdir(exist_ok=True)
SRC=Path('/home/forn/sonnet-vs-astra/td-excel-rapor/girdi/demlik-satis-2025.xlsx')
s=pd.read_excel(SRC,sheet_name='Satışlar'); g=pd.read_excel(SRC,sheet_name='Giderler')
raw=s.copy()
duplicates=raw.duplicated()
excluded=raw[duplicates].copy(); excluded.insert(0,'Kaynak satır',excluded.index+2)
raw_for_export=raw.copy(); raw_for_export['Dahil']=np.where(duplicates,0,1)
s=s[~duplicates].copy()
s.columns=['id','date','channel','product','category','qty','price','discount','amount','shipping','returned']
s['channel']=s.channel.replace({'web sitesi':'Web sitesi'})
s['date']=pd.to_datetime(s.date); s['month']=s.date.dt.strftime('%Y-%m')
s['gross']=s.qty*s.price; s['discount_tl']=s.gross-s.amount
s['return_tl']=np.where(s.returned.eq('Evet'),s.amount,0)
s['net']=s.amount-s.return_tl; s['kept']=s.returned.eq('Hayır').astype(int)
s['net_qty']=np.where(s.kept,s.qty,0); s['post_shipping']=s.net-s.shipping
def agg(df,by):
    a=df.groupby(by,sort=False).agg(orders=('id','size'),qty=('qty','sum'),gross=('gross','sum'),discount_tl=('discount_tl','sum'),amount=('amount','sum'),returns=('returned',lambda x:sum(x=='Evet')),return_tl=('return_tl','sum'),net=('net','sum'),shipping=('shipping','sum'),kept=('kept','sum'),net_qty=('net_qty','sum'),post_shipping=('post_shipping','sum')).reset_index()
    a['return_rate']=a.returns/a.orders; a['discount_rate']=a.discount_tl/a.gross
    a['aov']=a.net/a.kept; a['shipping_rate']=a.shipping/a.net
    return a
m=agg(s,'month').sort_values('month'); g.columns=['month','rent','staff','marketing','material']
m=m.merge(g,on='month'); m['expenses']=m[['rent','staff','marketing','material']].sum(axis=1)
m['result']=m.net-m.shipping-m.expenses; m['contribution']=m.net-m.shipping-m.material
m['contribution_rate']=m.contribution/m.net
c=agg(s,'channel').sort_values('net',ascending=False)
p=agg(s,'product').sort_values('net',ascending=False)
cat=agg(s,'category').sort_values('net',ascending=False)
t={k:float(m[k].sum()) for k in ['orders','qty','gross','discount_tl','amount','returns','return_tl','net','shipping','kept','net_qty','post_shipping','rent','staff','marketing','material','expenses','result','contribution']}
t.update(return_rate=t['returns']/t['orders'],discount_rate=t['discount_tl']/t['gross'],aov=t['net']/t['kept'],contribution_rate=t['contribution']/t['net'])
t['break_even_annual']=(t['rent']+t['staff']+t['marketing'])/t['contribution_rate']
t['gap']=t['break_even_annual']-t['net']
checks={'raw_rows':len(raw),'rows':len(s),'unique_orders':s.id.nunique(),'excluded_exact_duplicates':int(duplicates.sum()),'duplicate_ids_after_cleaning':int(s.id.duplicated().sum()),'missing_cells':int(raw.isna().sum().sum()),'start':str(s.date.min().date()),'end':str(s.date.max().date()),'unique_days':int(s.date.nunique()),'amount_mismatches':int((abs(s.amount-(s.qty*s.price*(1-s.discount)).round(2))>0.011).sum()),'return_flags':s.returned.value_counts().to_dict(),'source_sha256':hashlib.sha256(SRC.read_bytes()).hexdigest(),'excluded_net':float(excluded.loc[excluded['İade']=='Hayır','Tutar (TL)'].sum()),'excluded_shipping':float(excluded['Kargo Maliyeti (TL)'].sum()),'excluded_amount':float(excluded['Tutar (TL)'].sum())}
def records(x): return json.loads(x.to_json(orient='records',force_ascii=False))
data={'totals':t,'months':records(m),'channels':records(c),'products':records(p),'categories':records(cat),'monthly_channels':records(agg(s,['month','channel'])),'monthly_products':records(agg(s,['month','product'])),'checks':checks,'sales_headers':raw_for_export.columns.tolist(),'sales':raw_for_export.values.tolist(),'expenses_headers':['Ay','Kira','Personel','Pazarlama','Hammadde'],'expenses':g.values.tolist(),'excluded':records(excluded),'half_channels':records(agg(s.assign(half=np.where(s.date.dt.month<=6,'H1','H2')),['half','channel']))}
(OUT/'veri.json').write_text(json.dumps(data,ensure_ascii=False,indent=2,default=str))
print('TOTALS',json.dumps(t,indent=2)); print('CHECKS',checks)
for name,x in [('MONTH',m),('CHANNEL',c),('PRODUCT',p),('CATEGORY',cat)]: print(name,x.to_string(index=False))
print('CHANNEL by half',agg(s.assign(half=np.where(s.date.dt.month<=6,'H1','H2')),['half','channel']).to_string(index=False))
print('MONTH PRODUCT',s.pivot_table(index='product',columns='month',values='net',aggfunc='sum').to_string())
print('PRICES',s.groupby('product').price.unique().to_string())
print('DISCOUNT',agg(s.assign(discount_band=s.discount.astype(str)),['channel','discount_band']).to_string(index=False))
