"""LibreOffice yeniden hesabı ile önbellek değerlerini karşılaştırır."""
import sys, openpyxl, math, datetime
a = openpyxl.load_workbook('/home/forn/sonnet-vs-astra/td-excel-rapor/sonnet/panel.xlsx', data_only=True)
b = openpyxl.load_workbook(sys.argv[1] if len(sys.argv) > 1 else '/tmp/lo_out/panel.xlsx', data_only=True)
fm = openpyxl.load_workbook('/home/forn/sonnet-vs-astra/td-excel-rapor/sonnet/panel.xlsx')
tot = bad = 0
for ws in a:
    wb_ = b[ws.title]; wf = fm[ws.title]
    nb = 0
    for row in wf.iter_rows():
        for c in row:
            v = c.value
            if isinstance(v, str) and v.startswith('=') or (hasattr(v, 'text')):
                tot += 1
                x = ws[c.coordinate].value; y = wb_[c.coordinate].value
                ok = False
                if isinstance(x, (int, float)) and isinstance(y, (int, float)):
                    ok = math.isclose(x, y, rel_tol=1e-6, abs_tol=1e-6)
                elif isinstance(x, datetime.datetime) and isinstance(y, datetime.datetime):
                    ok = x == y
                elif isinstance(x, datetime.datetime) and isinstance(y, (int, float)) or isinstance(y, datetime.datetime) and isinstance(x, (int, float)):
                    ok = True
                else:
                    ok = (x == y) or (x in (None, '') and y in (None, ''))
                if not ok:
                    bad += 1; nb += 1
                    if nb <= 8:
                        print(ws.title, c.coordinate, 'önbellek=', repr(x), 'LO=', repr(y), '|', str(v)[:90])
    print('--', ws.title, 'farklı:', nb)
print('formül:', tot, 'farklı:', bad)
