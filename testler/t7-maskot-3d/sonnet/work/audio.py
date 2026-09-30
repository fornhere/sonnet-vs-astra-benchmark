import numpy as np, wave, json
SR = 44100; FPS = 30; N = 306
T = N / FPS
out = np.zeros((int(T * SR) + SR, 2))
rng = np.random.RandomState(3)
def t_(d): return np.arange(int(d * SR)) / SR
def add(sig, f, gain=1.0, pan=0.0):
    i = int(f / FPS * SR)
    n = min(len(sig), len(out) - i)
    if n <= 0: return
    out[i:i + n, 0] += sig[:n] * gain * (1 - pan) ** 0.5 * 1.0
    out[i:i + n, 1] += sig[:n] * gain * (1 + pan) ** 0.5 * 1.0
def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)):
        s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def env_(n, a=0.005, d=0.3, power=3.0):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1.0) * np.exp(-t / d * power / 3)
def marimba(freq, dur=0.7, g=1.0):
    t = t_(dur)
    s = np.sin(2 * np.pi * freq * t) * np.exp(-t * 6) + 0.35 * np.sin(2 * np.pi * freq * 4 * t) * np.exp(-t * 18) + 0.15 * np.sin(2 * np.pi * freq * 10 * t) * np.exp(-t * 40)
    s *= np.minimum(t / 0.002, 1)
    return s * g
def pluck(freq, dur=0.35, g=1.0):
    t = t_(dur)
    s = np.sin(2 * np.pi * freq * t) * np.exp(-t * 9) + 0.4 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-t * 14)
    return s * np.minimum(t / 0.003, 1) * g
def noise(dur): return rng.randn(int(dur * SR))
def glide(f0, f1, dur, shape=1.0):
    t = t_(dur); ph = 2 * np.pi * np.cumsum(f0 * (f1 / f0) ** ((t / dur) ** shape)) / SR
    return np.sin(ph)
def hz(n): return 440 * 2 ** ((n - 69) / 12)
C5, D5, E5, G5, A5, C6 = 72, 74, 76, 79, 81, 84

# nefes / horlama
for f0 in (0, 13, 26):
    d = 0.9; t = t_(d)
    br = lp(noise(d), 500) * np.sin(np.pi * t / d) ** 2
    add(br * 0.7, f0, 0.05)
# esneme
d = 0.7; t = t_(d)
y = glide(330, 190, d) * np.sin(np.pi * t / d) ** 1.5
y += 0.4 * glide(660, 380, d) * np.sin(np.pi * t / d) ** 1.5
add(y, 38, 0.10)
# aşağı bakış: "!" bip
add(marimba(hz(88), 0.25), 56, 0.10)
# kanca gıcırtısı
for f in (74, 80, 85, 90, 95):
    d = 0.16; t = t_(d)
    sq = glide(1900 + rng.randint(-200, 200), 1500, d) * np.exp(-t * 14) * 0.5 + lp(noise(d), 4000) * np.exp(-t * 20) * 0.5
    add(sq, f, 0.09, pan=0.2)
# düşüş: ıslık + çığlık
d = 0.5; t = t_(d)
add(glide(1300, 380, d, 0.8) * np.exp(-t * 2) , 98, 0.10)
add(glide(760, 520, d) * (1 + 0.15 * np.sin(2 * np.pi * 9 * t)) * np.minimum(t / 0.02, 1) * np.exp(-t * 3), 99, 0.10)
add(lp(noise(d), 1500) * np.minimum(t / 0.1, 1) * np.exp(-t * 4), 98, 0.16)
# iniş: thump + toz
d = 0.6; t = t_(d)
thump = glide(120, 38, d, 0.4) * np.exp(-t * 9)
add(thump, 112, 0.9)
add(lp(noise(0.25), 900) * np.exp(-t[:int(0.25 * SR)] * 16), 112, 0.5)
# squash boing
d = 0.35; t = t_(d)
add(glide(260, 620, d, 0.6) * np.exp(-t * 5) * (1 + 0.3 * np.sin(2 * np.pi * 14 * t)), 115, 0.14)
# iç çekme (sigh) L+37 = 149
d = 0.9; t = t_(d)
add(lp(noise(d), 1200) * np.sin(np.pi * t / d) ** 2 * 0.6 + glide(240, 170, d) * np.sin(np.pi * t / d) ** 2 * 0.25, 148, 0.16)
# ta-da whoosh (164)
d = 0.45; t = t_(d)
add(lp(noise(d), 3000) * np.sin(np.pi * (t / d) ** 0.7) ** 2, 160, 0.16, pan=-0.3)
# harfler
for f, n_ in zip((162, 168, 174, 180), (C5, E5, G5, C6)):
    add(marimba(hz(n_), 0.9), f + 8, 0.30, pan=-0.35 + 0.1 * (f - 162) / 6)
    add(marimba(hz(n_ - 12), 0.6), f + 8, 0.14)
    add(glide(200, 500, 0.12) * np.exp(-t_(0.12) * 25), f, 0.14)   # pop
    add(np.sin(2 * np.pi * hz(n_ + 24) * t_(0.5)) * np.exp(-t_(0.5) * 9), f + 12, 0.05)  # kıvılcım
# final akor
for k, n_ in enumerate((C5, E5, G5, C6)):
    add(marimba(hz(n_ - 12), 1.4), 185, 0.10)
# zıplama kutlaması: harf sıçramaları (216..228)
for i, n_ in enumerate((C5, D5, E5, G5)):
    add(pluck(hz(n_), 0.4), 216 + 4 * i, 0.22, pan=-0.3 + 0.2 * i)
d = 0.3; t = t_(d)
add(glide(200, 700, d, 0.7) * np.exp(-t * 6), 219, 0.14)          # jump boing
add(glide(110, 45, 0.4, 0.4) * np.exp(-t_(0.4) * 10), 225, 0.5)  # land thump
# el sallama "selam"
add(marimba(hz(G5), 0.5), 243, 0.2); add(marimba(hz(C6), 0.8), 248, 0.22)
# müzik yatağı: 150'den sonrası, 120 bpm
beat = 60 / 120
notes = [36, 36, 43, 36, 41, 41, 43, 43]
start = 150 / FPS
k = 0
tt = start
while tt < T - 0.9:
    n_ = notes[k % len(notes)]
    add(pluck(hz(n_ + 12), 0.28), tt * FPS, 0.12)
    if k % 2 == 1:
        add(pluck(hz(n_ + 24 + (0 if k % 4 == 1 else 4)), 0.2), tt * FPS + 0.5 * beat * FPS / 2, 0.06)
    # şaker
    add(lp(noise(0.06), 9000)[:int(0.06 * SR)] * np.exp(-t_(0.06) * 60), tt * FPS + beat / 2 * FPS, 0.05) if False else None
    k += 1; tt += beat / 2
# kapanış çan
add(marimba(hz(C6), 1.2) + marimba(hz(E5 + 12), 1.2) * 0.6, 292, 0.16)
# ana seviye + kırpma
peak = np.abs(out).max()
out /= max(peak / 0.85, 1.0)
n = int(T * SR)
fade = np.ones(n); fo = int(0.7 * SR); fade[-fo:] = np.linspace(1, 0, fo)
res = (out[:n] * fade[:, None] * 32767).astype(np.int16)
w = wave.open('audio.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(res.tobytes()); w.close()
print('audio ok', T, peak)
