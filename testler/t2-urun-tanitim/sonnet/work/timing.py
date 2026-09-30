import json, subprocess
SC = [  # id, start, vo line, vo offset, end
 ("hook",   0.0, "l1", 0.60, 4.40),
 ("lose",   4.4, "l2", 0.40, 8.60),
 ("title",  8.6, "l3", 0.50, 15.30),
 ("vault", 15.3, "l4", 0.45, 22.10),
 ("hub",   22.1, "l5", 0.40, 27.00),
 ("recall",27.0, "l6", 0.40, 35.50),
 ("review",35.5, "l7", 0.40, 45.60),
 ("install",45.6,"l8", 0.40, 51.40),
 ("proof", 51.4, "l9", 0.40, 59.50),
 ("end",   59.5, "l10",0.40, 66.00),
]
CAP = {
 "l1":[(0,7,"Her yeni sohbette, aynı şeyleri baştan anlatıyorsun.")],
 "l2":[(0,2,"Ajan değişir."),(2,4,"Bağlam kaybolur.")],
 "l3":[(0,2,"Hafıza OS."),(2,8,"Ajanlar değişsin, hafızan aynı yerde kalsın.")],
 "l4":[(0,5,"Tercihlerin, kararların, işlerin ve kaynakların,"),(5,11,"kendi bilgisayarında düz Markdown dosyalarında durur.")],
 "l5":[(0,8,"Claude Code, Codex, Antigravity: hepsi aynı kasaya bağlanır.")],
 "l6":[(0,4,"Ajan hatırlarken kaynağını gösterir:"),(4,7,"dosya yolu, sürüm."),(7,12,"Eski bilgi, güncel karar sayılmaz.")],
 "l7":[(0,9,"Yeni bilgi doğrudan yazılmaz; kaynaklı aday olarak incelemeden geçer."),(9,18,"Kaynak, öneri, senin kararın ve doğrulanmış sonuç ayrı tutulur.")],
 "l8":[(0,4,"Tek bir komutla kur."),(4,11,"Ya da depoyu ajanına ver, o kursun.")],
 "l9":[(0,6,"Açık kaynak, MIT lisanslı."),(6,16,"Linux, macOS ve Windows'ta 360 testlik paket başarılı.")],
 "l10":[(0,4,"Hafıza OS. Şimdi GitHub'da.")],
}
out={"scenes":[], "vo":[], "caps":[]}
for sid,st,ln,off,en in SC:
    w=json.load(open(f"audio/{ln}.json"))
    s0=w[0]["s"]; e0=w[-1]["s"]+w[-1]["d"]
    vs=st+off
    # trimmed VO clip
    subprocess.run(["ffmpeg","-v","error","-y","-i",f"audio/{ln}.mp3","-ss",f"{s0-0.03:.3f}","-t",f"{e0-s0+0.12:.3f}","-ar","48000","-ac","1",f"audio/{ln}_t.wav"],check=True)
    words=[{"w":x["w"],"s":round(vs+x["s"]-s0,3),"e":round(vs+x["s"]+x["d"]-s0,3)} for x in w]
    out["scenes"].append({"id":sid,"start":st,"end":en,"dur":round(en-st,3)})
    out["vo"].append({"line":ln,"start":round(vs-0.03+0.03,3),"end":round(vs+e0-s0,3),"words":words})
    for a,b,t in CAP[ln]:
        out["caps"].append({"s":words[a]["s"]-0.05,"e":words[b-1]["e"]+0.25,"t":t,"l":ln})
# make caps non-overlapping
for i in range(len(out["caps"])-1):
    out["caps"][i]["e"]=min(out["caps"][i]["e"], out["caps"][i+1]["s"]-0.02)
for c in out["caps"]: c["s"]=round(c["s"],3); c["e"]=round(c["e"],3)
out["total"]=SC[-1][4]
json.dump(out,open("cues.json","w"),ensure_ascii=False,indent=1)
print(out["total"]); 
for v in out["vo"]: print(v["line"],v["start"],v["end"])
