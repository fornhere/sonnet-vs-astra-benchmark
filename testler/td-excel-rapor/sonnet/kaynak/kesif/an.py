import pandas as pd, numpy as np
pd.set_option('display.width',250); pd.set_option('display.max_columns',40); pd.set_option('display.max_rows',300); pd.set_option('display.float_format',lambda x:f'{x:,.2f}')
f='/home/forn/sonnet-vs-astra/td-excel-rapor/girdi/demlik-satis-2025.xlsx'
d=pd.read_excel(f,sheet_name='Satışlar'); g=pd.read_excel(f,sheet_name='Giderler')
d.columns=['no','tarih','kanal','urun','kat','adet','fiyat','ind','tutar','kargo','iade']
g.columns=['ay','kira','personel','pazarlama','hammadde']
d['tarih']=pd.to_datetime(d.tarih)
d['kanal']=d.kanal.replace({'web sitesi':'Web sitesi'})
d=d.drop_duplicates(subset='no',keep='first').copy()
print(len(d))
d['ay']=d.tarih.dt.strftime('%Y-%m')
d['ret']=d.iade.eq('Evet')
d['net']=np.where(d.ret,0,d.tutar)
d['brut']=d.adet*d.fiyat
d['indtl']=d.brut-d.tutar
print('brut',d.brut.sum(),'tutar',d.tutar.sum(),'iade tutar',d[d.ret].tutar.sum(),'net',d.net.sum(),'kargo',d.kargo.sum(),'ind tl',d.indtl.sum())
m=d.groupby('ay').agg(sip=('no','count'),tutar=('tutar','sum'),net=('net','sum'),iade=('ret','sum'),kargo=('kargo','sum'),ind=('indtl','sum'))
m=m.join(g.set_index('ay'))
m['gider']=m[['kira','personel','pazarlama','hammadde']].sum(axis=1)
m['kar']=m.net-m.kargo-m.gider
m['ham%']=m.hammadde/m.net*100; m['gidersiz%']=m.kar/m.net*100
print(m); print(m.sum())
print('year net',m.net.sum(),'kar',m.kar.sum())
def grp(k):
    x=d.groupby(k).agg(sip=('no','count'),adet=('adet','sum'),tutar=('tutar','sum'),net=('net','sum'),iade=('ret','sum'),kargo=('kargo','sum'),ind=('indtl','sum'),brut=('brut','sum'))
    x['iade%']=x.iade/x.sip*100; x['ind%']=x.ind/x.brut*100; x['pay%']=x.net/x.net.sum()*100; x['aov']=x.tutar/x.sip; x['kargo/net%']=x.kargo/x.net*100
    x['net-kargo']=x.net-x.kargo
    return x
for k in ['kanal','urun','kat']: print(grp(k))
print(grp(['kanal','kat']))
print(d.pivot_table(index='ay',columns='kanal',values='net',aggfunc='sum'))
print(d.pivot_table(index='ay',columns='kat',values='net',aggfunc='sum'))
print(d.pivot_table(index='ay',columns='urun',values='net',aggfunc='sum'))
print(d.pivot_table(index='kanal',columns='urun',values='ret',aggfunc='mean')*100)
print(d.pivot_table(index='ay',columns='kanal',values='ret',aggfunc='mean')*100)
d['dow']=d.tarih.dt.dayofweek
print(d.groupby('dow').agg(sip=('no','count'),net=('net','sum')))
print(d.groupby(d.tarih.dt.day).agg(sip=('no','count')).T)
# Trendyol discount vs return
t=d[d.kanal=='Trendyol']
print(t.groupby('ind').agg(sip=('no','count'),iade=('ret','mean'),aov=('tutar','mean')))
print(t.pivot_table(index='ay',columns='ind',values='no',aggfunc='count'))
print(d.groupby('ind').agg(sip=('no','count'),iade=('ret','mean')))
# orders per day
od=d.groupby('tarih').size(); print(od.describe()); print(od.sort_values().tail(10)); print(od.sort_values().head(10))
