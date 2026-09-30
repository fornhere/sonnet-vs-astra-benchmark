import pandas as pd, numpy as np
pd.set_option('display.width',250); pd.set_option('display.max_columns',40); pd.set_option('display.max_rows',400); pd.set_option('display.float_format',lambda x:f'{x:,.2f}')
f='/home/forn/sonnet-vs-astra/td-excel-rapor/girdi/demlik-satis-2025.xlsx'
d0=pd.read_excel(f,sheet_name='Satışlar'); g=pd.read_excel(f,sheet_name='Giderler')
d0.columns=['no','tarih','kanal','urun','kat','adet','fiyat','ind','tutar','kargo','iade']
g.columns=['ay','kira','personel','pazarlama','hammadde']
d0['tarih']=pd.to_datetime(d0.tarih); d0['ay']=d0.tarih.dt.strftime('%Y-%m'); d0['ret']=d0.iade.eq('Evet')
# hammadde ratio with dups
for name,dd in [('withdups',d0),('dedup',d0.drop_duplicates('no'))]:
    dd=dd.copy(); dd['net']=np.where(dd.ret,0,dd.tutar); dd['kanal']=dd.kanal.str.capitalize()
    s=dd.groupby('ay').agg(net=('net','sum'),tutar=('tutar','sum')).join(g.set_index('ay'))
    print(name,(s.hammadde/s.net).round(4).tolist()); print((s.hammadde/s.tutar).round(4).tolist())
d=d0.drop_duplicates('no').copy(); d['kanal']=d.kanal.replace({'web sitesi':'Web sitesi'}); d['net']=np.where(d.ret,0,d.tutar)
b=d[d.urun.str.startswith('İnce')]
print(b.pivot_table(index='ay',columns='kanal',values='no',aggfunc='count'))
# weekly gaps per product
d['hafta']=d.tarih.dt.isocalendar().week
print(b.groupby(b.tarih.dt.to_period('W')).size().to_string())
# daily by product zero-day runs
allday=pd.date_range('2025-01-01','2025-12-31')
for u,x in d.groupby('urun'):
    dc=x.groupby('tarih').size().reindex(allday,fill_value=0)
    z=(dc==0); runs=[]; c=0
    for i,(dt,v) in enumerate(z.items()):
        if v: c+=1
        else:
            if c>=5: runs.append((allday[i-c].date(),c)); 
            c=0
    if c>=5: runs.append((allday[len(allday)-c].date(),c))
    print(u, x.tarih.min().date(), x.tarih.max().date(), runs)
# Trendyol returns pre/post Aug
t=d[d.kanal=='Trendyol'].copy(); t['donem']=np.where(t.tarih<'2025-08-01','Oca-Tem','Agu-Ara')
print(t.pivot_table(index='urun',columns='donem',values='ret',aggfunc=['mean','count']))
print(t.groupby('donem').agg(sip=('no','count'),iade=('ret','mean'),tutar=('tutar','sum')))
print(t.pivot_table(index='donem',columns='ind',values='ret',aggfunc='mean'))
o=d[d.kanal!='Trendyol'].copy(); o['donem']=np.where(o.tarih<'2025-08-01','Oca-Tem','Agu-Ara'); print(o.groupby(['kanal','donem']).ret.mean())
# weekly Trendyol return rate, find change date
tw=t.groupby(t.tarih.dt.to_period('W')).ret.agg(['mean','count']); print(tw.iloc[22:36])
# Trendyol orders by month, ind share
print(d.groupby(['ay','kanal']).size().unstack())
# mag apr
print(d.pivot_table(index='ay',columns=['kat'],values='no',aggfunc='count'))
# web May
w=d[d.kanal=='Web sitesi']; print(w.pivot_table(index='ay',columns='urun',values='no',aggfunc='count'))
