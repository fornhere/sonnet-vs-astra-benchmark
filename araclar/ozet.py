#!/usr/bin/env python3
"""Koşu özeti: süre, token ve API liste fiyatıyla tahmini karşılık (ek ödeme/fatura değildir).
Fiyatlar $/M token (resmî sayfalar, 28.09.2026): Sonnet 5.5 girdi 2, cache okuma 0.2, cache yazma(5dk) 2.5, çıktı 10;
Astra girdi 10, cache okuma 1, çıktı 50. Kullanım: python3 ozet.py t4-lansman-sayfasi/sonnet ..."""
import json, sys
from pathlib import Path
K = Path('/home/forn/sonnet-vs-astra')
def ozet(yol):
    W = K / yol; m = W.name
    bit = json.loads((W / '.kosu-bitis.json').read_text()) if (W / '.kosu-bitis.json').exists() else {}
    r = dict(kosu=yol, sure_dk=round(bit.get('sure_sn', 0) / 60, 1), cikis=bit.get('cikis'))
    son = None
    for l in open(W / '.log.jsonl', errors='replace'):
        try: e = json.loads(l)
        except Exception: continue
        if m == 'sonnet' and e.get('type') == 'result': son = e
        if m == 'astra' and e.get('type') == 'turn.completed': son = e
    if not son: r['durum'] = 'kullanım kaydı yok'; return r
    if m == 'sonnet':
        mu = son.get('modelUsage') or {}
        g = sum(v.get('inputTokens', 0) for v in mu.values()); cr = sum(v.get('cacheReadInputTokens', 0) for v in mu.values())
        cw = sum(v.get('cacheCreationInputTokens', 0) for v in mu.values()); o = sum(v.get('outputTokens', 0) for v in mu.values())
        r.update(modeller=list(mu), girdi=g, cache_okuma=cr, cache_yazma=cw, cikti=o, tur=son.get('num_turns'),
                 cli_maliyet_usd=round(son.get('total_cost_usd', 0), 2), is_error=son.get('is_error'))
    else:
        u = son['usage']; g = u['input_tokens'] - u.get('cached_input_tokens', 0)
        r.update(girdi=g, cache_okuma=u.get('cached_input_tokens', 0), cikti=u['output_tokens'],
                 akil_yurutme=u.get('reasoning_output_tokens', 0),
                 tahmini_usd=round((g * 10 + u.get('cached_input_tokens', 0) * 1 + u['output_tokens'] * 50) / 1e6, 2))
    return r
for a in sys.argv[1:]: print(json.dumps(ozet(a), ensure_ascii=False))
