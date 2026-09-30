import asyncio, json, edge_tts, sys
LINES = {
 "l1": "Her yeni sohbette, aynı şeyleri baştan anlatıyorsun.",
 "l2": "Ajan değişir. Bağlam kaybolur.",
 "l3": "Hafıza OS. Ajanlar değişsin, hafızan aynı yerde kalsın.",
 "l4": "Tercihlerin, kararların, işlerin ve kaynakların, kendi bilgisayarında düz Markdown dosyalarında durur.",
 "l5": "Claude Code, Codex, Antigravity: hepsi aynı kasaya bağlanır.",
 "l6": "Ajan hatırlarken kaynağını gösterir: dosya yolu, sürüm. Eski bilgi, güncel karar sayılmaz.",
 "l7": "Yeni bilgi doğrudan yazılmaz; kaynaklı aday olarak incelemeden geçer. Kaynak, öneri, senin kararın ve doğrulanmış sonuç ayrı tutulur.",
 "l8": "Tek bir komutla kur. Ya da depoyu ajanına ver, o kursun.",
 "l9": "Açık kaynak, Em Ay Ti lisanslı. Linux, macOS ve Windows'ta üç yüz altmış testlik paket başarılı.",
 "l10": "Hafıza OS. Şimdi GitHub'da.",
}
VOICE = sys.argv[1] if len(sys.argv)>1 else "tr-TR-AhmetNeural"
RATE = sys.argv[2] if len(sys.argv)>2 else "-4%"
async def one(k,t):
    c = edge_tts.Communicate(t, VOICE, rate=RATE, boundary="WordBoundary")
    words=[]
    with open(f"audio/{k}.mp3","wb") as f:
        async for ch in c.stream():
            if ch["type"]=="audio": f.write(ch["data"])
            elif ch["type"]=="WordBoundary":
                words.append({"w":ch["text"],"s":ch["offset"]/1e7,"d":ch["duration"]/1e7})
    json.dump(words, open(f"audio/{k}.json","w"), ensure_ascii=False)
import os
async def main():
    for k,t in LINES.items():
        if os.environ.get('ONLY') and k not in os.environ['ONLY'].split(','): continue
        await one(k,t)
asyncio.run(main())
