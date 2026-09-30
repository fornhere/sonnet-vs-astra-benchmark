import asyncio, json, sys, edge_tts
VOICE = sys.argv[1] if len(sys.argv)>1 else "tr-TR-EmelNeural"
RATE = sys.argv[2] if len(sys.argv)>2 else "+0%"
SCENES = [
 ("s1","Yazın hava neden sıcak, kışın neden soğuk? Çoğu kişi şöyle cevap verir: “Yazın Dünya, Güneş’e daha yakındır.” Mantıklı geliyor. Ama yanlış."),
 ("s2","Dünya, Güneş’e en çok ocak ayında yaklaşır: yüz kırk yedi milyon kilometre. Temmuzda ise yüz elli iki milyon. Yani biz kışı yaşarken, Dünya Güneş’e en yakın hâlindedir."),
 ("s3","Peki asıl sebep ne? Eğiklik. Dünya’nın dönme ekseni, yörüngesine göre yirmi üç buçuk derece yatıktır. Üstelik bu eksen, yıl boyu hep aynı yönü gösterir."),
 ("s4","Dünya Güneş’in etrafında döndükçe, kuzey yarımküre bazen Güneş’e eğilir, bazen ondan uzaklaşır. Haziranda Güneş’e döner: yaz. Aralıkta uzaklaşır: kış. Güney yarımkürede ise tam tersi."),
 ("s5","Bu eğiklik iki şeyi değiştirir. Birincisi, ışığın geliş açısı. Dik gelen ışık enerjisini küçük bir alanda toplar; eğik gelen ışık aynı enerjiyi geniş bir alana yayar. İkincisi, gün uzunluğu: yazın Güneş gökyüzünde uzun kalır, kışın kısa."),
 ("s6","Kısacası, mevsimleri getiren şey uzaklık değil, eğikliktir. Eksen dik olsaydı, mevsim olmazdı. Bir dahaki yaz sıcağında şunu düşün: Dünya şu an Güneş’ten neredeyse en uzak noktasında."),
]
async def one(k,text):
    c = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
    words=[]; 
    with open(f"audio/{k}.mp3","wb") as f:
        async for ch in c.stream():
            if ch["type"]=="audio": f.write(ch["data"])
            elif ch["type"]=="WordBoundary":
                words.append({"w":ch["text"],"t":ch["offset"]/1e7,"d":ch["duration"]/1e7})
    return k,words
async def main():
    import os; os.makedirs("audio",exist_ok=True)
    res = await asyncio.gather(*[one(k,t) for k,t in SCENES])
    json.dump({k:w for k,w in res}, open("audio/words.json","w"), ensure_ascii=False, indent=1)
asyncio.run(main())
