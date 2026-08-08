"use client";

import { useEffect, useMemo, useState } from "react";

type Stats = { mood: number; full: number; energy: number; hearts: number };
type Outfit = "none" | "crown" | "hat" | "duck";

const initial: Stats = { mood: 78, full: 65, energy: 82, hearts: 12 };
const photos = Array.from({ length: 10 }, (_, i) => `/photos/monkey-${String(i + 1).padStart(2, "0")}.jpg`);

export default function Home() {
  const [stats, setStats] = useState<Stats>(initial);
  const [outfit, setOutfit] = useState<Outfit>("none");
  const [message, setMessage] = useState("今天也要和你黏在一起！");
  const [action, setAction] = useState("");
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("houzai-state");
    if (saved) setStats(JSON.parse(saved));
  }, []);

  useEffect(() => localStorage.setItem("houzai-state", JSON.stringify(stats)), [stats]);

  const level = useMemo(() => Math.max(1, Math.floor(stats.hearts / 5)), [stats.hearts]);

  function play(kind: string) {
    const actions: Record<string, { msg: string; mood: number; full: number; energy: number; hearts: number }> = {
      pet: { msg: "嘿嘿，好舒服呀～ 再摸一下！", mood: 12, full: 0, energy: 0, hearts: 1 },
      banana: { msg: "香蕉是世界上最好吃的东西！", mood: 5, full: 22, energy: 4, hearts: 1 },
      game: { msg: "抓到你啦！这一局算我赢。", mood: 18, full: -5, energy: -12, hearts: 2 },
      sleep: { msg: "晚安，梦里也要来找我哦…", mood: 3, full: -3, energy: 28, hearts: 1 },
    };
    const a = actions[kind];
    setAction(kind);
    setMessage(a.msg);
    setStats((s) => ({
      mood: Math.min(100, Math.max(0, s.mood + a.mood)),
      full: Math.min(100, Math.max(0, s.full + a.full)),
      energy: Math.min(100, Math.max(0, s.energy + a.energy)),
      hearts: s.hearts + a.hearts,
    }));
    window.setTimeout(() => setAction(""), 900);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#home"><span className="brand-face">●</span><span>猴仔小窝</span></a>
        <div className="nav-links"><a href="#play">陪伴</a><a href="#closet">衣橱</a><a href="#album">回忆册</a></div>
        <div className="level">♥ {stats.hearts} · Lv.{level}</div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">YOUR POCKET FRIEND · 你的口袋朋友</p>
          <h1>想我了吗？<br/><em>我一直在这里。</em></h1>
          <p className="intro">摸摸我的头，喂我一根香蕉，或者什么也不做，只是安静地待在一起。</p>
          <a className="primary" href="#play">现在去找猴仔 <span>→</span></a>
          <div className="mini-note"><span>●</span> 今日已陪伴 <b>1 天</b>　·　所有进度会留在这台设备</div>
        </div>
        <div className="portrait-wrap">
          <div className="sun sun-one"/><div className="sun sun-two"/>
          <div className={`portrait ${action}`} onClick={() => play("pet")} role="button" tabIndex={0} aria-label="摸摸猴仔" onKeyDown={(e) => e.key === "Enter" && play("pet")}>
            <img src="/photos/monkey-01.jpg" alt="坐在沙发上的猴仔公仔" />
            <span className="tap-badge">轻轻摸摸我</span>
            {action === "pet" && <span className="float-heart">♥</span>}
          </div>
          <div className="hero-sticker">陪伴模式<br/><b>ON</b></div>
        </div>
      </section>

      <section className="play-section" id="play">
        <div className="section-heading"><div><p className="eyebrow">TODAY WITH HOUZAI</p><h2>今天，想一起做什么？</h2></div><p>每一次互动都会变成我们的小小回忆。</p></div>
        <div className="play-grid">
          <div className="room-card">
            <div className="room-top"><span>猴仔的客厅</span><span className="online">● 正在等你</span></div>
            <div className="speech">{message}</div>
            <div className={`mini-monkey ${action}`} onClick={() => play("pet")} role="button" tabIndex={0} aria-label="摸摸猴仔" onKeyDown={(e) => e.key === "Enter" && play("pet")}>
              <img src="/houzai-character.png" alt="张开手臂等你互动的绒毛猴仔" />
              {outfit === "crown" && <div className="wear crown">♛</div>}
              {outfit === "hat" && <div className="wear hat">⌒</div>}
              {outfit === "duck" && <div className="wear duck">●</div>}
            </div>
            <div className="rug"/>
          </div>
          <div className="control-panel">
            <div className="stats">
              <Stat icon="♥" label="心情" value={stats.mood}/><Stat icon="●" label="饱腹" value={stats.full}/><Stat icon="☀" label="精力" value={stats.energy}/>
            </div>
            <div className="actions">
              <button onClick={() => play("pet")}><span>♡</span><b>摸摸头</b><small>心情 +12</small></button>
              <button onClick={() => play("banana")}><span>🍌</span><b>喂香蕉</b><small>饱腹 +22</small></button>
              <button onClick={() => play("game")}><span>✦</span><b>陪玩耍</b><small>心情 +18</small></button>
              <button onClick={() => play("sleep")}><span>☾</span><b>哄睡觉</b><small>精力 +28</small></button>
            </div>
            <p className="tip">小提示：直接点击猴仔也可以摸摸他。</p>
          </div>
        </div>
      </section>

      <section className="closet" id="closet">
        <div><p className="eyebrow">HOUZAI'S CLOSET</p><h2>今天戴哪一顶？</h2><p>给猴仔选一件心情配饰，拍下今日份可爱。</p></div>
        <div className="outfits">
          {[{id:"none",icon:"○",name:"原本就很可爱"},{id:"crown",icon:"♛",name:"生日小王冠"},{id:"hat",icon:"⌒",name:"度假遮阳帽"},{id:"duck",icon:"●",name:"小黄鸭派对"}].map((item) => (
            <button key={item.id} className={outfit === item.id ? "selected" : ""} onClick={() => {setOutfit(item.id as Outfit); setMessage(item.id === "none" ? "轻装上阵，也很神气！" : `新造型「${item.name}」怎么样？`);}}><span>{item.icon}</span><b>{item.name}</b><small>{outfit === item.id ? "正在穿戴" : "点击试穿"}</small></button>
          ))}
        </div>
      </section>

      <section className="album" id="album">
        <div className="section-heading"><div><p className="eyebrow">OUR LITTLE MOMENTS</p><h2>猴仔回忆册</h2></div><p>那些被认真记录下来的普通日子，都闪闪发光。</p></div>
        <div className="photo-grid">
          {photos.slice(1).map((src, i) => <button key={src} className={`photo p${i+1}`} onClick={() => setActivePhoto(src)} aria-label={`打开第 ${i+1} 张回忆`}><img src={src} alt={`猴仔生活回忆 ${i+1}`} loading="lazy"/><span>{["朋友来做客","香蕉下午茶","一岁生日会","睡前说晚安","和小伙伴一起","全员大合照","悄悄话时间","夏日新造型","小鸭子王冠"][i]}</span></button>)}
        </div>
      </section>

      <footer><div className="footer-face">●</div><h2>明天也要来找我哦。</h2><p>猴仔会记得你留下的每一颗爱心。</p><a href="#home">回到猴仔身边 ↑</a></footer>

      {activePhoto && <div className="lightbox" onClick={() => setActivePhoto(null)} role="dialog" aria-modal="true"><button aria-label="关闭">×</button><img src={activePhoto} alt="放大的猴仔回忆"/></div>}
    </main>
  );
}

function Stat({icon,label,value}:{icon:string;label:string;value:number}) {
  return <div className="stat"><span>{icon}</span><div><p><b>{label}</b><em>{value}%</em></p><div className="bar"><i style={{width:`${value}%`}}/></div></div></div>;
}
