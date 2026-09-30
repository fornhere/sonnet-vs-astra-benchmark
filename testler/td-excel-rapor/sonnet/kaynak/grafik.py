"""Kodla üretilen SVG grafik kütüphanesi (dış bağımlılık yok)."""
from html import escape as esc

INK = '#1E2B27'; MUTED = '#66706B'; LINE = '#E4DED2'; PAPER = '#FAF7F2'
GREEN = '#1F5A45'; GREEN_L = '#DCE9E1'; COPPER = '#C1662B'; RED = '#B23A2E'; AMBER = '#D9A441'; BLUE = '#3B6E9E'
KANAL_RENK = {'Mağaza': '#1F5A45', 'Trendyol': '#E2732C', 'Web sitesi': '#3B6E9E', 'Instagram DM': '#9A4C8B'}
URUN_RENK = {'Demlik Seti (el yapımı)': '#B5651D', 'İnce Belli Bardak 6lı': '#E3A857', 'Karadeniz Sabahı 250g': '#2A6B52',
             'Adaçaylı Bergamot 100g': '#8DBB9C', 'Kadıköy Akşamı 250g': '#2F8F9D', 'Demleme Atölyesi': '#6E5A7E'}
FONT = "'Noto Sans','Segoe UI',system-ui,sans-serif"


def sayi(n, d=0):
    s = f'{abs(n):,.{d}f}'.replace(',', '§').replace('.', ',').replace('§', '.')
    return ('−' if n < 0 and round(abs(n), d) != 0 else '') + s


_ONES = {0: 'sıfır', 1: 'bir', 2: 'iki', 3: 'üç', 4: 'dört', 5: 'beş', 6: 'altı', 7: 'yedi', 8: 'sekiz', 9: 'dokuz'}
_TENS = {1: 'on', 2: 'yirmi', 3: 'otuz', 4: 'kırk', 5: 'elli', 6: 'altmış', 7: 'yetmiş', 8: 'seksen', 9: 'doksan'}


def ek(n, d, tur):
    """Rakamın okunuşuna göre Türkçe ek: tur = p3 (-(s)ı), acc (-(y)ı), dat (-(y)a), abl (-dan), loc (-da)"""
    v = int(round(abs(n) * 10 ** d))
    if d > 0:
        w = _ONES[v % 10]
    elif v == 0:
        w = 'sıfır'
    elif v % 10:
        w = _ONES[v % 10]
    elif v % 100 == 0:
        w = 'yüz'
    else:
        w = _TENS[(v // 10) % 10]
    vow = 'aıoueiöü'
    lv = [c for c in w if c in vow][-1]
    endv = w[-1] in vow
    back = lv in 'aıou'
    four = {'a': 'ı', 'ı': 'ı', 'o': 'u', 'u': 'u', 'e': 'i', 'i': 'i', 'ö': 'ü', 'ü': 'ü'}[lv]
    two = 'a' if back else 'e'
    hard = w[-1] in 'çfhkpsşt'
    if tur == 'p3':
        return "'" + ('s' if endv else '') + four
    if tur == 'acc':
        return "'" + ('y' if endv else '') + four
    if tur == 'dat':
        return "'" + ('y' if endv else '') + two
    if tur == 'abl':
        return "'" + ('t' if hard else 'd') + two + 'n'
    if tur == 'loc':
        return "'" + ('t' if hard else 'd') + two
    raise ValueError(tur)


def kisa(n, d=0):
    """1.234.567 -> '1,23 mn'; 71.000 -> '71 bin'"""
    a = abs(n)
    if a >= 1e6:
        return sayi(n / 1e6, 2) + ' mn'
    if a >= 1e3:
        return sayi(n / 1e3, d) + ' bin'
    return sayi(n, 0)


def isaret(n, d=0):
    return ('+' if n > 0 else '') + kisa(n, d)


def nice_ticks(lo, hi, n=5):
    import math
    span = hi - lo
    raw = span / n
    mag = 10 ** math.floor(math.log10(raw))
    for m in (1, 2, 2.5, 5, 10):
        if raw <= m * mag:
            step = m * mag
            break
    t0 = math.floor(lo / step) * step
    t1 = math.ceil(hi / step) * step
    ticks = []
    v = t0
    while v <= t1 + step * 1e-6:
        ticks.append(round(v, 6))
        v += step
    return ticks


def svg_open(w, h, label):
    return (f'<svg class="chart" viewBox="0 0 {w} {h}" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" '
            f'aria-label="{esc(label)}" style="font-family:{FONT}">')


def txt(x, y, s, size=11, fill=MUTED, anchor='start', weight=400, extra=''):
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" '
            f'font-weight="{weight}" {extra}>{esc(str(s))}</text>')


def tip(s):
    return f'data-tip="{esc(s)}"'


class Axis:
    def __init__(self, w, h, l=48, r=14, t=14, b=30, lo=0, hi=1, ticks=None, fmt=kisa):
        self.w, self.h, self.l, self.r, self.t, self.b = w, h, l, r, t, b
        self.lo, self.hi, self.fmt = lo, hi, fmt
        self.ticks = ticks

    def y(self, v):
        return self.t + (self.h - self.t - self.b) * (1 - (v - self.lo) / (self.hi - self.lo))

    def grid(self, zero_line=True, labels=True):
        o = []
        for tv in self.ticks:
            yy = self.y(tv)
            col = '#B9B2A3' if (tv == 0 and zero_line) else LINE
            o.append(f'<line x1="{self.l}" x2="{self.w - self.r}" y1="{yy:.1f}" y2="{yy:.1f}" stroke="{col}" stroke-width="{1.2 if tv == 0 else 1}"/>')
            if labels:
                o.append(txt(self.l - 8, yy + 3.5, self.fmt(tv), 10.5, MUTED, 'end'))
        return ''.join(o)


def bars_v(cats, values, w=640, h=300, colors=None, fmt=kisa, label_fmt=None, lo=None, hi=None, l=52, r=14, t=18, b=30,
           gap=0.32, tips=None, hline=None, hline_label='', value_labels=True, label_size=10.5, cat_size=11, title='',
           bold_idx=(), zero_line=True, ticks=None, lab_color=INK, show_cats=True, hline_x=None):
    lo = min(0, min(values)) if lo is None else lo
    hi = max(values) * 1.12 if hi is None else hi
    if ticks is None:
        ticks = nice_ticks(lo, hi, 4)
    lo, hi = min(lo, ticks[0]), max(hi, ticks[-1])
    ax = Axis(w, h, l, r, t, b, lo, hi, ticks, fmt)
    o = [svg_open(w, h, title), ax.grid(zero_line)]
    n = len(cats)
    slot = (w - l - r) / n
    bw = slot * (1 - gap)
    for i, (c, v) in enumerate(zip(cats, values)):
        x = l + slot * i + (slot - bw) / 2
        y0, y1 = ax.y(0), ax.y(v)
        col = colors[i] if isinstance(colors, (list, tuple)) else (colors or GREEN)
        tp = tip(tips[i]) if tips else tip(f'{c}: {sayi(v)}')
        o.append(f'<rect x="{x:.1f}" y="{min(y0, y1):.1f}" width="{bw:.1f}" height="{abs(y1 - y0):.1f}" rx="2.5" fill="{col}" {tp}/>')
        if value_labels:
            lab = (label_fmt or fmt)(v)
            ly = y1 - 5 if v >= 0 else y1 + 13
            o.append(txt(x + bw / 2, ly, lab, label_size, lab_color, 'middle', 600 if i in bold_idx else 500,
                         'paint-order="stroke" stroke="#fff" stroke-width="3" stroke-linejoin="round"'))
        if show_cats:
            o.append(txt(x + bw / 2, h - b + 16, c, cat_size, INK if i in bold_idx else MUTED, 'middle', 600 if i in bold_idx else 400))
    if hline is not None:
        yy = ax.y(hline)
        o.append(f'<line x1="{l}" x2="{w - r}" y1="{yy:.1f}" y2="{yy:.1f}" stroke="{COPPER}" stroke-width="1.6" stroke-dasharray="5 4"/>')
        if hline_label:
            o.append(txt(w - r if hline_x is None else hline_x, yy - 6, hline_label, 10.5, COPPER, 'end' if hline_x is None else 'middle', 700,
                         'paint-order="stroke" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"'))
    o.append('</svg>')
    return ''.join(o)


def lines(cats, series, w=640, h=300, fmt=lambda v: sayi(v), lo=None, hi=None, l=44, r=14, t=16, b=30, title='', ticks=None,
          widths=None, dash=None, end_labels=True, area=None, xlabel_every=1, cat_size=11, marks=None, markers=True):
    allv = [v for s in series.values() for v in s if v is not None]
    lo = min(0, min(allv)) if lo is None else lo
    hi = max(allv) * 1.1 if hi is None else hi
    ticks = ticks or nice_ticks(lo, hi, 4)
    lo, hi = min(lo, ticks[0]), max(hi, ticks[-1])
    ax = Axis(w, h, l, r + (86 if end_labels else 0), t, b, lo, hi, ticks, fmt)
    ax.w = w
    o = [svg_open(w, h, title)]
    o.append(ax.grid(False))
    n = len(cats)
    xs = [l + (w - l - r - (86 if end_labels else 0)) * i / (n - 1) for i in range(n)]
    for i, c in enumerate(cats):
        if i % xlabel_every == 0:
            o.append(txt(xs[i], h - b + 16, c, cat_size, MUTED, 'middle'))
    if marks:  # [(x0_idx, x1_idx, label, color)]
        for a, bb, lab, colr in marks:
            o.append(f'<rect x="{xs[a]:.1f}" y="{ax.t}" width="{xs[bb] - xs[a]:.1f}" height="{h - ax.t - ax.b}" fill="{colr}" opacity="0.10"/>')
            o.append(txt((xs[a] + xs[bb]) / 2, ax.t + 12, lab, 10.5, colr, 'middle', 700))
    ends = []
    for si, (name, vals) in enumerate(series.items()):
        col = (KANAL_RENK.get(name) or URUN_RENK.get(name) or GREEN) if not isinstance(name, tuple) else GREEN
        sw = (widths or {}).get(name, 2)
        pts = [(xs[i], ax.y(v)) for i, v in enumerate(vals) if v is not None]
        if area and name in area:
            poly = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
            o.append(f'<polygon points="{ax.l},{ax.y(0):.1f} {poly} {pts[-1][0]:.1f},{ax.y(0):.1f}" fill="{col}" opacity="0.14"/>')
        d = ' '.join(('M' if j == 0 else 'L') + f'{x:.1f},{y:.1f}' for j, (x, y) in enumerate(pts))
        da = f'stroke-dasharray="{dash[name]}"' if dash and name in dash else ''
        o.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round" {da}/>')
        if markers:
            for i, v in enumerate(vals):
                if v is None:
                    continue
                o.append(f'<circle cx="{xs[i]:.1f}" cy="{ax.y(v):.1f}" r="{3.4 if sw >= 3 else 2.4}" fill="{col}" stroke="#fff" stroke-width="1" {tip(f"{name} · {cats[i]}: {fmt(v)}")}/>')
        if end_labels:
            ends.append([pts[-1][1], name, col, sw])
    if end_labels:
        ends.sort()
        for i in range(1, len(ends)):
            if ends[i][0] - ends[i - 1][0] < 13:
                ends[i][0] = ends[i - 1][0] + 13
        for yv, name, col, sw in ends:
            o.append(txt(xs[-1] + 8, yv + 4, name, 11, col, 'start', 700 if sw >= 3 else 600))
    o.append('</svg>')
    return ''.join(o), xs, ax


def hbars(rows, w=520, row_h=34, fmt=kisa, l=150, r=90, colors=None, max_v=None, title='', sub=None, val_fmt=None, bar_h=18, size=12):
    """rows: [(label, value, tip?)]"""
    h = row_h * len(rows) + 6
    mx = max_v or max(v for _, v, *_ in rows) * 1.0
    o = [svg_open(w, h, title)]
    for i, row in enumerate(rows):
        lab, v = row[0], row[1]
        y = i * row_h + 3
        col = colors[i] if isinstance(colors, (list, tuple)) else (colors or GREEN)
        bw = (w - l - r) * (v / mx)
        tp = tip(row[2]) if len(row) > 2 else tip(f'{lab}: {sayi(v)}')
        o.append(txt(l - 10, y + row_h / 2 + 4, lab, size, INK, 'end', 500))
        o.append(f'<rect x="{l}" y="{y + (row_h - bar_h) / 2:.1f}" width="{max(bw, 1):.1f}" height="{bar_h}" rx="3" fill="{col}" {tp}/>')
        o.append(txt(l + bw + 8, y + row_h / 2 + 4, (val_fmt or fmt)(v), size, INK, 'start', 700))
        if sub:
            o.append(txt(w - 2, y + row_h / 2 + 4, sub[i], size - 1, MUTED, 'end'))
    o.append('</svg>')
    return ''.join(o)


def stack_h(rows, segs, w=560, row_h=44, l=104, r=14, title='', bar_h=26, total=100, seg_colors=None, min_label=5.5):
    """rows: [(label, [v1..vn])] toplam = total ; segs: [(ad, renk)]"""
    h = row_h * len(rows) + 8
    o = [svg_open(w, h, title)]
    scale = (w - l - r) / total
    for i, (lab, vals) in enumerate(rows):
        y = i * row_h + 4
        o.append(txt(l - 10, y + row_h / 2 + 4, lab, 12.5, INK, 'end', 600))
        x = l
        for (nm, col), v in zip(segs, vals):
            ww = v * scale
            o.append(f'<rect x="{x:.1f}" y="{y + (row_h - bar_h) / 2:.1f}" width="{max(ww, 0):.1f}" height="{bar_h}" fill="{col}" '
                     f'stroke="#fff" stroke-width="1.5" {tip(f"{lab} · {nm}: {sayi(v, 1)}")}/>')
            if v >= min_label:
                tc = '#fff' if col not in ('#E9C9A6', '#F4E1D2', '#DCE9E1', '#EFD9B6') else INK
                o.append(txt(x + ww / 2, y + row_h / 2 + 4, sayi(v, 1), 11, tc, 'middle', 700))
            x += ww
    o.append('</svg>')
    return ''.join(o)


def waterfall(items, w=660, h=320, l=14, r=14, t=30, b=44, fmt=kisa, title='', cat_size=11, lab_size=11):
    """items: [(label, value, kind)] kind: total | delta"""
    run = 0; levels = []
    for lab, v, kind in items:
        if kind == 'total':
            levels.append((lab, 0, v, kind, v)); run = v
        else:
            levels.append((lab, run, run + v, kind, v)); run += v
    hi = max(max(a, b_) for _, a, b_, _, _ in levels) * 1.14
    lo = min(0, min(min(a, b_) for _, a, b_, _, _ in levels))
    ax = Axis(w, h, l, r, t, b, lo, hi, [], fmt)
    o = [svg_open(w, h, title)]
    n = len(levels)
    slot = (w - l - r) / n
    bw = slot * 0.66
    o.append(f'<line x1="{l}" x2="{w - r}" y1="{ax.y(0):.1f}" y2="{ax.y(0):.1f}" stroke="#B9B2A3"/>')
    prev = None
    for i, (lab, a, b_, kind, v) in enumerate(levels):
        x = l + slot * i + (slot - bw) / 2
        ya, yb = ax.y(a), ax.y(b_)
        if kind == 'total':
            col = GREEN if v >= 0 else RED
        else:
            col = RED if v < 0 else '#2E8B57'
        if lab.startswith('Kâr') or lab.startswith('Bugünkü'):
            col = COPPER if v > 0 else RED
        if prev is not None:
            o.append(f'<line x1="{prev[0]:.1f}" x2="{x:.1f}" y1="{prev[1]:.1f}" y2="{prev[1]:.1f}" stroke="#A8A18F" stroke-dasharray="2 3"/>')
        o.append(f'<rect x="{x:.1f}" y="{min(ya, yb):.1f}" width="{bw:.1f}" height="{max(abs(yb - ya), 1.5):.1f}" rx="2.5" fill="{col}" {tip(f"{lab}: {sayi(v)} TL")}/>')
        txt_v = fmt(v) if kind == 'total' else (('+' if v > 0 else '−') + fmt(abs(v)))
        o.append(txt(x + bw / 2, min(ya, yb) - 6, txt_v, lab_size, INK, 'middle', 700))
        # kategori etiketi (2 satır destekli)
        parts = lab.split('\n')
        for j, p in enumerate(parts):
            o.append(txt(x + bw / 2, h - b + 17 + j * 13, p, cat_size, INK if kind == 'total' else MUTED, 'middle', 600 if kind == 'total' else 400))
        prev = (x + bw, ax.y(b_))
    o.append('</svg>')
    return ''.join(o)


def dumbbell(rows, w=520, row_h=38, l=170, r=40, lo=0, hi=20, c1='#8A928E', c2=COPPER, title='', fmt=lambda v: f'%{sayi(v, 1)}', ticks=(0, 5, 10, 15, 20), tfmt=lambda v: f'%{sayi(v, 0)}'):
    h = row_h * len(rows) + 30
    o = [svg_open(w, h, title)]
    xs = lambda v: l + (w - l - r) * (v - lo) / (hi - lo)
    for tv in ticks:
        o.append(f'<line x1="{xs(tv):.1f}" x2="{xs(tv):.1f}" y1="6" y2="{h - 24}" stroke="{LINE}"/>')
        o.append(txt(xs(tv), h - 8, tfmt(tv), 10.5, MUTED, 'middle'))
    for i, (lab, a, b_) in enumerate(rows):
        y = i * row_h + row_h / 2 + 6
        o.append(txt(l - 12, y + 4, lab, 12, INK, 'end', 500))
        if a is not None:
            o.append(f'<line x1="{xs(a):.1f}" x2="{xs(b_):.1f}" y1="{y}" y2="{y}" stroke="#D7CDBB" stroke-width="3"/>')
            o.append(f'<circle cx="{xs(a):.1f}" cy="{y}" r="6" fill="{c1}" {tip(f"{lab} · Oca–Tem: {fmt(a)}")}/>')
            o.append(txt(xs(a), y - 11, fmt(a), 10.5, MUTED, 'middle'))
        o.append(f'<circle cx="{xs(b_):.1f}" cy="{y}" r="6.5" fill="{c2}" {tip(f"{lab} · Ağu–Ara: {fmt(b_)}")}/>')
        o.append(txt(xs(b_) + 11, y + 4, fmt(b_), 11, c2, 'start', 700))
    o.append('</svg>')
    return ''.join(o)


def stacked_v(cats, series, w=640, h=300, l=52, r=14, t=16, b=30, colors=None, fmt=kisa, title='', gap=0.3, ticks=None, totals=True, hi=None):
    tot = [sum(s[i] for s in series.values()) for i in range(len(cats))]
    hi = hi or max(tot) * 1.12
    ticks = ticks or nice_ticks(0, hi, 4)
    hi = max(hi, ticks[-1])
    ax = Axis(w, h, l, r, t, b, 0, hi, ticks, fmt)
    o = [svg_open(w, h, title), ax.grid()]
    slot = (w - l - r) / len(cats); bw = slot * (1 - gap)
    for i, c in enumerate(cats):
        x = l + slot * i + (slot - bw) / 2
        acc = 0
        for nm, vals in series.items():
            v = vals[i]
            if v <= 0:
                continue
            ya, yb = ax.y(acc), ax.y(acc + v)
            o.append(f'<rect x="{x:.1f}" y="{yb:.1f}" width="{bw:.1f}" height="{ya - yb:.1f}" fill="{(colors or {}).get(nm, GREEN)}" '
                     f'stroke="#fff" stroke-width="0.8" {tip(f"{nm} · {c}: {sayi(v)} TL")}/>')
            acc += v
        if totals:
            o.append(txt(x + bw / 2, ax.y(acc) - 5, kisa(acc), 10, INK, 'middle', 600))
        o.append(txt(x + bw / 2, h - b + 16, c, 11, MUTED, 'middle'))
    o.append('</svg>')
    return ''.join(o)
