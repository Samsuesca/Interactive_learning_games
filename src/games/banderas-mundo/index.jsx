import { useState, useEffect, useRef, useMemo } from "react";
import useGameProgress from "../../hooks/useGameProgress";

/* =================== GAME DATA =================== */
const COUNTRIES = [
  // Europa (14)
  { name:"España", cap:"Madrid", flag:"🇪🇸", cont:"europa", lang:"Español", currency:"Euro", fun:"Tiene más de 8,000 km de costa" },
  { name:"Francia", cap:"París", flag:"🇫🇷", cont:"europa", lang:"Francés", currency:"Euro", fun:"La Torre Eiffel recibe 7 millones de visitantes al año" },
  { name:"Alemania", cap:"Berlín", flag:"🇩🇪", cont:"europa", lang:"Alemán", currency:"Euro", fun:"Tiene más de 1,500 tipos de cerveza" },
  { name:"Italia", cap:"Roma", flag:"🇮🇹", cont:"europa", lang:"Italiano", currency:"Euro", fun:"Tiene forma de bota y más de 50 sitios UNESCO" },
  { name:"Reino Unido", cap:"Londres", flag:"🇬🇧", cont:"europa", lang:"Inglés", currency:"Libra esterlina", fun:"El Big Ben es en realidad el nombre de la campana" },
  { name:"Portugal", cap:"Lisboa", flag:"🇵🇹", cont:"europa", lang:"Portugués", currency:"Euro", fun:"El país más occidental de Europa continental" },
  { name:"Países Bajos", cap:"Ámsterdam", flag:"🇳🇱", cont:"europa", lang:"Neerlandés", currency:"Euro", fun:"Un tercio del país está bajo el nivel del mar" },
  { name:"Suecia", cap:"Estocolmo", flag:"🇸🇪", cont:"europa", lang:"Sueco", currency:"Corona sueca", fun:"Estocolmo está construida sobre 14 islas" },
  { name:"Noruega", cap:"Oslo", flag:"🇳🇴", cont:"europa", lang:"Noruego", currency:"Corona noruega", fun:"País de los fiordos y las auroras boreales" },
  { name:"Grecia", cap:"Atenas", flag:"🇬🇷", cont:"europa", lang:"Griego", currency:"Euro", fun:"Cuna de la democracia y los Juegos Olímpicos" },
  { name:"Polonia", cap:"Varsovia", flag:"🇵🇱", cont:"europa", lang:"Polaco", currency:"Zloty", fun:"Tiene el bosque primigenio de Białowieża" },
  { name:"Suiza", cap:"Berna", flag:"🇨🇭", cont:"europa", lang:"Alemán / Francés / Italiano", currency:"Franco suizo", fun:"Tiene cuatro idiomas oficiales" },
  { name:"Rusia", cap:"Moscú", flag:"🇷🇺", cont:"europa", lang:"Ruso", currency:"Rublo", fun:"El país más grande del mundo por superficie" },
  { name:"Irlanda", cap:"Dublín", flag:"🇮🇪", cont:"europa", lang:"Inglés / Irlandés", currency:"Euro", fun:"Conocida como la Isla Esmeralda por su verdor" },
  // América (13)
  { name:"México", cap:"Ciudad de México", flag:"🇲🇽", cont:"america", lang:"Español", currency:"Peso mexicano", fun:"Tiene la pirámide más grande del mundo en Cholula" },
  { name:"Brasil", cap:"Brasilia", flag:"🇧🇷", cont:"america", lang:"Portugués", currency:"Real", fun:"El país más grande de América Latina" },
  { name:"Argentina", cap:"Buenos Aires", flag:"🇦🇷", cont:"america", lang:"Español", currency:"Peso argentino", fun:"Cuna del tango y el asado" },
  { name:"Colombia", cap:"Bogotá", flag:"🇨🇴", cont:"america", lang:"Español", currency:"Peso colombiano", fun:"El segundo país con más biodiversidad del mundo" },
  { name:"Chile", cap:"Santiago", flag:"🇨🇱", cont:"america", lang:"Español", currency:"Peso chileno", fun:"El país más largo y angosto del mundo" },
  { name:"Perú", cap:"Lima", flag:"🇵🇪", cont:"america", lang:"Español", currency:"Sol", fun:"Hogar de Machu Picchu y la civilización Inca" },
  { name:"Estados Unidos", cap:"Washington D.C.", flag:"🇺🇸", cont:"america", lang:"Inglés", currency:"Dólar", fun:"Tiene 50 estados y su bandera tiene 50 estrellas" },
  { name:"Canadá", cap:"Ottawa", flag:"🇨🇦", cont:"america", lang:"Inglés / Francés", currency:"Dólar canadiense", fun:"El segundo país más grande del mundo" },
  { name:"Cuba", cap:"La Habana", flag:"🇨🇺", cont:"america", lang:"Español", currency:"Peso cubano", fun:"La isla más grande del Caribe" },
  { name:"Venezuela", cap:"Caracas", flag:"🇻🇪", cont:"america", lang:"Español", currency:"Bolívar", fun:"Tiene el Salto Ángel, la cascada más alta del mundo" },
  { name:"Ecuador", cap:"Quito", flag:"🇪🇨", cont:"america", lang:"Español", currency:"Dólar", fun:"Nombrado por la línea del Ecuador que lo cruza" },
  { name:"Costa Rica", cap:"San José", flag:"🇨🇷", cont:"america", lang:"Español", currency:"Colón", fun:"No tiene ejército desde 1948" },
  { name:"Jamaica", cap:"Kingston", flag:"🇯🇲", cont:"america", lang:"Inglés", currency:"Dólar jamaicano", fun:"Cuna del reggae y Bob Marley" },
  // Asia (12)
  { name:"Japón", cap:"Tokio", flag:"🇯🇵", cont:"asia", lang:"Japonés", currency:"Yen", fun:"El país del sol naciente tiene más de 6,800 islas" },
  { name:"China", cap:"Pekín", flag:"🇨🇳", cont:"asia", lang:"Mandarín", currency:"Yuan", fun:"Tiene la muralla más larga del mundo" },
  { name:"India", cap:"Nueva Delhi", flag:"🇮🇳", cont:"asia", lang:"Hindi / Inglés", currency:"Rupia", fun:"El país con más películas producidas al año" },
  { name:"Corea del Sur", cap:"Seúl", flag:"🇰🇷", cont:"asia", lang:"Coreano", currency:"Won", fun:"Líder mundial en tecnología y K-pop" },
  { name:"Tailandia", cap:"Bangkok", flag:"🇹🇭", cont:"asia", lang:"Tailandés", currency:"Baht", fun:"Conocida como la tierra de las sonrisas" },
  { name:"Vietnam", cap:"Hanói", flag:"🇻🇳", cont:"asia", lang:"Vietnamita", currency:"Dong", fun:"La bahía de Ha Long tiene más de 1,600 islas" },
  { name:"Indonesia", cap:"Yakarta", flag:"🇮🇩", cont:"asia", lang:"Indonesio", currency:"Rupia indonesia", fun:"El archipiélago más grande del mundo con 17,000 islas" },
  { name:"Turquía", cap:"Ankara", flag:"🇹🇷", cont:"asia", lang:"Turco", currency:"Lira turca", fun:"Está en dos continentes: Europa y Asia" },
  { name:"Arabia Saudita", cap:"Riad", flag:"🇸🇦", cont:"asia", lang:"Árabe", currency:"Riyal", fun:"Tiene los desiertos de arena más grandes del mundo" },
  { name:"Israel", cap:"Jerusalén", flag:"🇮🇱", cont:"asia", lang:"Hebreo / Árabe", currency:"Shekel", fun:"El Mar Muerto es el punto más bajo de la Tierra" },
  { name:"Filipinas", cap:"Manila", flag:"🇵🇭", cont:"asia", lang:"Filipino / Inglés", currency:"Peso filipino", fun:"Tiene más de 7,000 islas" },
  { name:"Malasia", cap:"Kuala Lumpur", flag:"🇲🇾", cont:"asia", lang:"Malayo", currency:"Ringgit", fun:"Las Torres Petronas fueron las más altas del mundo" },
  // África (8)
  { name:"Egipto", cap:"El Cairo", flag:"🇪🇬", cont:"africa", lang:"Árabe", currency:"Libra egipcia", fun:"Hogar de las pirámides de Giza y la Esfinge" },
  { name:"Sudáfrica", cap:"Pretoria", flag:"🇿🇦", cont:"africa", lang:"11 idiomas oficiales", currency:"Rand", fun:"Tiene 11 idiomas oficiales" },
  { name:"Nigeria", cap:"Abuya", flag:"🇳🇬", cont:"africa", lang:"Inglés", currency:"Naira", fun:"El país más poblado de África" },
  { name:"Marruecos", cap:"Rabat", flag:"🇲🇦", cont:"africa", lang:"Árabe / Bereber", currency:"Dirham", fun:"Tiene el desierto del Sahara al sur" },
  { name:"Kenia", cap:"Nairobi", flag:"🇰🇪", cont:"africa", lang:"Suajili / Inglés", currency:"Chelín keniano", fun:"Famosa por sus safaris y el Gran Valle del Rift" },
  { name:"Etiopía", cap:"Adís Abeba", flag:"🇪🇹", cont:"africa", lang:"Amárico", currency:"Birr", fun:"El único país africano nunca colonizado" },
  { name:"Ghana", cap:"Acra", flag:"🇬🇭", cont:"africa", lang:"Inglés", currency:"Cedi", fun:"Uno de los mayores productores de cacao del mundo" },
  { name:"Tanzania", cap:"Dodoma", flag:"🇹🇿", cont:"africa", lang:"Suajili / Inglés", currency:"Chelín tanzano", fun:"Tiene el Monte Kilimanjaro, el más alto de África" },
  // Oceanía (3)
  { name:"Australia", cap:"Canberra", flag:"🇦🇺", cont:"oceania", lang:"Inglés", currency:"Dólar australiano", fun:"Es un continente y un país a la vez" },
  { name:"Nueva Zelanda", cap:"Wellington", flag:"🇳🇿", cont:"oceania", lang:"Inglés / Maorí", currency:"Dólar neozelandés", fun:"Tiene más ovejas que personas" },
  { name:"Fiyi", cap:"Suva", flag:"🇫🇯", cont:"oceania", lang:"Inglés / Fiyiano", currency:"Dólar fiyiano", fun:"Formado por más de 330 islas tropicales" },
];

const CONTINENTS = {
  europa:  { name:"Europa",  color:"#667eea", emoji:"🏰" },
  america: { name:"América", color:"#11998e", emoji:"🌎" },
  asia:    { name:"Asia",    color:"#e17055", emoji:"🏯" },
  africa:  { name:"África",  color:"#fdcb6e", emoji:"🌍" },
  oceania: { name:"Oceanía", color:"#a29bfe", emoji:"🏝️" },
};

const EMOJIS = ["🎉","⭐","🌟","💫","🏳️","🏆","👏","💪","🌎","🌍","🌏","🎊"];

/* =================== UTILITIES =================== */
function shuffle(a) {
  let b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

const pill = (bg, c) => ({ background:bg, color:c, border:"none", borderRadius:30, padding:"10px 20px", fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" });
const circ = (bg) => ({ background:bg, color:"#fff", border:"none", borderRadius:"50%", width:44, height:44, fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 10px rgba(0,0,0,0.15)" });

/* =================== SHARED COMPONENTS =================== */
function Confetti({ active }) {
  const [p, setP] = useState([]);
  useEffect(() => {
    if (!active) { setP([]); return; }
    setP(Array.from({ length: 25 }, (_, i) => ({
      id: i, x: Math.random() * 100, dl: Math.random() * 0.5,
      c: ["#FFD700","#FF6B6B","#4ECDC4","#45B7D1","#F9A825","#AB47BC"][i % 6],
      s: Math.random() * 8 + 4
    })));
    const t = setTimeout(() => setP([]), 1500);
    return () => clearTimeout(t);
  }, [active]);
  if (!p.length) return null;
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:999 }}>
      {p.map(v => (
        <div key={v.id} style={{
          position:"absolute", left:`${v.x}%`, top:-10, width:v.s, height:v.s,
          borderRadius:"50%", background:v.c, animation:`cFall 1.5s ${v.dl}s ease-in forwards`
        }} />
      ))}
      <style>{`@keyframes cFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>
    </div>
  );
}

function Stars({ s, t }) {
  const n = t > 0 ? (s / t >= 0.9 ? 3 : s / t >= 0.6 ? 2 : s / t > 0 ? 1 : 0) : 0;
  return (
    <div style={{ display:"flex", gap:4, justifyContent:"center", fontSize:32 }}>
      {[0,1,2].map(i => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.25 }}>{i < n ? "⭐" : "☆"}</span>
      ))}
    </div>
  );
}

function PBar({ v, mx }) {
  return (
    <div style={{ width:"100%", height:10, background:"#e0e0e0", borderRadius:5, overflow:"hidden" }}>
      <div style={{ width:`${mx > 0 ? (v/mx)*100 : 0}%`, height:"100%", background:"linear-gradient(90deg,#0052D4,#6FB1FC)", borderRadius:5, transition:"width 0.5s" }} />
    </div>
  );
}

/* =================== QUESTION SYSTEM =================== */
const Q_FLAG_TO_COUNTRY = 0;
const Q_COUNTRY_TO_FLAG = 1;
const Q_COUNTRY_TO_CAP  = 2;

function makeQuestions(count) {
  const pool = count > COUNTRIES.length
    ? [...shuffle(COUNTRIES), ...shuffle(COUNTRIES)].slice(0, count)
    : shuffle(COUNTRIES).slice(0, count);

  return pool.map(item => {
    const type = [Q_FLAG_TO_COUNTRY, Q_COUNTRY_TO_FLAG, Q_COUNTRY_TO_CAP][Math.floor(Math.random() * 3)];
    let cor, opts;
    const others = COUNTRIES.filter(c => c.name !== item.name);

    if (type === Q_FLAG_TO_COUNTRY) {
      cor = item.name;
      opts = [cor];
      while (opts.length < 4) {
        const r = others[Math.floor(Math.random() * others.length)];
        if (!opts.includes(r.name)) opts.push(r.name);
      }
    } else if (type === Q_COUNTRY_TO_FLAG) {
      cor = item.flag;
      opts = [cor];
      while (opts.length < 4) {
        const r = others[Math.floor(Math.random() * others.length)];
        if (!opts.includes(r.flag)) opts.push(r.flag);
      }
    } else {
      cor = item.cap;
      opts = [cor];
      while (opts.length < 4) {
        const r = others[Math.floor(Math.random() * others.length)];
        if (!opts.includes(r.cap)) opts.push(r.cap);
      }
    }

    return { item, type, cor, opts: shuffle(opts) };
  });
}

function OptionButton({ text, sel, cor, onClick, isFlag }) {
  const ok = text === cor;
  const isSel = sel === text;
  let bg = "white", bd = "#ddd", cl = "#333";
  if (sel !== null) {
    if (ok) { bg = "#c8e6c9"; bd = "#66BB6A"; cl = "#2e7d32"; }
    else if (isSel) { bg = "#ffcdd2"; bd = "#ef5350"; cl = "#c62828"; }
  }
  return (
    <button onClick={onClick} style={{
      background:bg, border:`2px solid ${bd}`, borderRadius:16, padding: isFlag ? "10px" : "14px 10px",
      fontSize: isFlag ? 32 : 15, fontWeight:600, color:cl, cursor: sel !== null ? "default" : "pointer",
      transition:"all 0.3s", transform: isSel ? "scale(1.04)" : "scale(1)",
      boxShadow: isSel ? "0 4px 15px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      {!isFlag && sel !== null && ok && "✅ "}
      {!isFlag && sel !== null && isSel && !ok && "❌ "}
      {text}
      {isFlag && sel !== null && ok && " ✅"}
      {isFlag && sel !== null && isSel && !ok && " ❌"}
    </button>
  );
}

/* =================== GALLERY MODE =================== */
function GalleryMode({ onBack }) {
  const [sel, setSel] = useState(null);
  const [found, setFound] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState("explore");
  const [target, setTarget] = useState(null);
  const [msg, setMsg] = useState("");
  const [fScore, setFScore] = useState(0);
  const [conf, setConf] = useState(0);
  const [queue, setQueue] = useState([]);

  const filtered = useMemo(() =>
    filter === "all" ? COUNTRIES : COUNTRIES.filter(c => c.cont === filter),
  [filter]);

  const startFind = () => {
    const q = shuffle([...COUNTRIES]);
    setQueue(q); setTarget(q[0]); setMode("findIt");
    setFScore(0); setMsg(""); setSel(null); setFound(new Set()); setFilter("all");
  };

  const handleClick = (c) => {
    if (mode === "explore") {
      setSel(sel === c.name ? null : c.name);
      setFound(s => { const n = new Set(s); n.add(c.name); return n; });
    } else if (mode === "findIt" && target) {
      if (c.name === target.name) {
        setFScore(s => s + 1);
        setMsg("✅ ¡Correcto!");
        setConf(p => p + 1);
        setFound(s => { const n = new Set(s); n.add(c.name); return n; });
        setSel(c.name);
        setTimeout(() => {
          const nq = [...queue]; nq.shift();
          if (nq.length === 0) { setMode("explore"); setMsg("🏆 ¡Encontraste todas las banderas!"); return; }
          setQueue(nq); setTarget(nq[0]); setMsg(""); setSel(null);
        }, 1200);
      } else {
        setMsg(`❌ Esa es la bandera de ${c.name}. ¡Intenta de nuevo!`);
        setTimeout(() => setMsg(""), 1500);
      }
    }
  };

  const selCountry = sel ? COUNTRIES.find(c => c.name === sel) : null;
  const contKeys = ["all", ...Object.keys(CONTINENTS)];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:480, alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => { setMode("explore"); setSel(null); setMsg(""); }} style={pill(mode === "explore" ? "#0052D4" : "#e0e0e0", mode === "explore" ? "#fff" : "#333")}>🔍 Explorar</button>
          <button onClick={startFind} style={pill(mode === "findIt" ? "#e17055" : "#e0e0e0", mode === "findIt" ? "#fff" : "#333")}>🎯 Encuéntralo</button>
        </div>
      </div>

      {mode === "explore" && (
        <>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
            {contKeys.map(k => {
              const active = filter === k;
              const color = k === "all" ? "#0052D4" : CONTINENTS[k].color;
              const label = k === "all" ? "Todos" : CONTINENTS[k].emoji + " " + CONTINENTS[k].name;
              return (
                <button key={k} onClick={() => { setFilter(k); setSel(null); }} style={{
                  background: active ? color : "#f0f0f0", color: active ? "#fff" : "#666",
                  border:"none", borderRadius:20, padding:"5px 12px", fontSize:11, fontWeight:700, cursor:"pointer",
                  transition:"all 0.2s"
                }}>{label}</button>
              );
            })}
          </div>
          <div style={{ fontSize:13, color:"#888" }}>🏳️ Toca una bandera para ver info ({found.size}/{COUNTRIES.length} explorados)</div>
        </>
      )}

      {mode === "findIt" && target && (
        <div style={{ background:"linear-gradient(135deg,#e17055,#d63031)", borderRadius:16, padding:"12px 20px", color:"#fff", textAlign:"center", maxWidth:400, width:"100%" }}>
          <div style={{ fontSize:13, opacity:0.85 }}>¿Cuál es la bandera de...? (✅ {fScore}/{COUNTRIES.length})</div>
          <div style={{ fontSize:22, fontWeight:800 }}>{target.name}</div>
        </div>
      )}

      {msg && <div style={{ fontSize:16, fontWeight:700, textAlign:"center", padding:4 }}>{msg}</div>}

      <div style={{
        display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:8,
        width:"100%", maxWidth:460, padding:8,
        background:"#fff", borderRadius:16, boxShadow:"0 4px 20px rgba(0,0,0,0.08)"
      }}>
        {filtered.map(c => {
          const isSel = sel === c.name;
          const isFound = found.has(c.name);
          const contColor = CONTINENTS[c.cont].color;
          return (
            <div key={c.name} onClick={() => handleClick(c)} style={{
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              padding:"8px 2px", borderRadius:12, cursor:"pointer",
              background: isSel ? contColor + "22" : isFound ? "#f5f5f5" : "white",
              border: isSel ? `2px solid ${contColor}` : "2px solid transparent",
              transition:"all 0.2s",
              boxShadow: isSel ? "0 4px 12px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)"
            }}>
              <span style={{ fontSize:36 }}>{c.flag}</span>
              {mode === "explore" && (
                <span style={{ fontSize:8, fontWeight:700, color:"#888", marginTop:2, textAlign:"center", lineHeight:1.1, maxWidth:70, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {c.name}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {selCountry && mode === "explore" && (
        <div style={{
          background:"white", borderRadius:20, padding:20, width:"100%", maxWidth:420,
          boxShadow:"0 6px 25px rgba(0,0,0,0.1)", border:`2px solid ${CONTINENTS[selCountry.cont].color}20`
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
            <span style={{ fontSize:48 }}>{selCountry.flag}</span>
            <div>
              <div style={{ fontSize:20, fontWeight:800 }}>{selCountry.name}</div>
              <div style={{
                fontSize:11, fontWeight:600, display:"inline-block",
                background: CONTINENTS[selCountry.cont].color + "22",
                color: CONTINENTS[selCountry.cont].color,
                padding:"2px 10px", borderRadius:12
              }}>
                {CONTINENTS[selCountry.cont].emoji} {CONTINENTS[selCountry.cont].name}
              </div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, fontSize:13, color:"#555" }}>
            <div>🏛️ <strong>Capital:</strong> {selCountry.cap}</div>
            <div>🗣️ <strong>Idioma:</strong> {selCountry.lang}</div>
            <div>💰 <strong>Moneda:</strong> {selCountry.currency}</div>
            <div style={{ gridColumn:"1 / -1" }}>💡 <strong>Dato:</strong> {selCountry.fun}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =================== LEARN MODE =================== */
function LearnMode({ onBack, saveLearned }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(new Set());
  useEffect(() => { if (learned.size > 0) saveLearned?.(learned.size); }, [learned.size]);
  const c = COUNTRIES[idx];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"0 8px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", maxWidth:420 }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <span style={{ fontSize:14, fontWeight:600, color:"#666" }}>📚 {learned.size}/{COUNTRIES.length}</span>
      </div>
      <PBar v={learned.size} mx={COUNTRIES.length} />
      <div onClick={() => setFlipped(!flipped)} style={{ width:"100%", maxWidth:380, minHeight:280, perspective:800, cursor:"pointer" }}>
        <div style={{ width:"100%", minHeight:280, position:"relative", transformStyle:"preserve-3d", transition:"transform 0.5s", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
          {/* Front - Flag + Country */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#0052D4,#4364F7)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, color:"white", boxShadow:"0 10px 40px rgba(0,82,212,0.4)" }}>
            <div style={{ fontSize:56, marginBottom:4 }}>{c.flag}</div>
            <div style={{ fontSize:26, fontWeight:800, textAlign:"center" }}>{c.name}</div>
            <div style={{
              fontSize:11, marginTop:10, display:"inline-block",
              background:"rgba(255,255,255,0.2)", padding:"4px 14px", borderRadius:20
            }}>
              {CONTINENTS[c.cont].emoji} {CONTINENTS[c.cont].name}
            </div>
            <div style={{ fontSize:12, marginTop:8, background:"rgba(255,255,255,0.15)", padding:"4px 14px", borderRadius:20 }}>🗣️ {c.lang} · 💰 {c.currency}</div>
            <div style={{ fontSize:13, opacity:0.7, marginTop:12 }}>👆 Toca para ver más</div>
          </div>
          {/* Back - Capital + Fun fact */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#6c5ce7,#a29bfe)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, color:"white", transform:"rotateY(180deg)", boxShadow:"0 10px 40px rgba(108,92,231,0.4)" }}>
            <div style={{ fontSize:14, opacity:0.8 }}>🏛️ Capital de {c.name}</div>
            <div style={{ fontSize:28, fontWeight:800, textAlign:"center", marginTop:4 }}>{c.cap}</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"6px 14px", borderRadius:12, textAlign:"center", lineHeight:1.4 }}>💡 {c.fun}</div>
            <div style={{ fontSize:12, marginTop:8, opacity:0.7 }}>{CONTINENTS[c.cont].emoji} {CONTINENTS[c.cont].name} · 💰 {c.currency}</div>
            <div style={{ fontSize:13, opacity:0.7, marginTop:8 }}>👆 Toca para voltear</div>
          </div>
        </div>
      </div>
      <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"center" }}>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIdx(i => (i - 1 + COUNTRIES.length) % COUNTRIES.length), 150); }} style={circ("#0052D4")}>◀</button>
        <button onClick={() => setLearned(s => { const n = new Set(s); n.has(idx) ? n.delete(idx) : n.add(idx); return n; })} style={{ ...pill(learned.has(idx) ? "#66BB6A" : "#e0e0e0", learned.has(idx) ? "#fff" : "#333"), minWidth:140 }}>
          {learned.has(idx) ? "✅ Aprendido" : "Marcar aprendido"}
        </button>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIdx(i => (i + 1) % COUNTRIES.length), 150); }} style={circ("#0052D4")}>▶</button>
      </div>
      <div style={{ fontSize:14, color:"#999" }}>Tarjeta {idx + 1} de {COUNTRIES.length}</div>
    </div>
  );
}

/* =================== QUIZ MODE =================== */
function QuizMode({ onBack, saveQuiz }) {
  const T = 15;
  const [qs, setQs] = useState(() => makeQuestions(T));
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sc, setSc] = useState(0);
  const [str, setStr] = useState(0);
  const [bStr, setBStr] = useState(0);
  const [conf, setConf] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => { if (done) saveQuiz?.(sc, T, bStr); }, [done]);

  const gen = () => {
    setQs(makeQuestions(T));
    setQi(0); setSel(null); setSc(0); setStr(0); setBStr(0); setDone(false);
  };

  const pick = (o) => {
    if (sel !== null) return;
    setSel(o);
    const ok = o === qs[qi].cor;
    if (ok) { setSc(s => s + 1); setStr(s => { const n = s + 1; if (n > bStr) setBStr(n); return n; }); setConf(c => c + 1); }
    else { setStr(0); }
    setTimeout(() => { if (qi + 1 >= T) setDone(true); else { setQi(i => i + 1); setSel(null); } }, 1200);
  };

  if (done) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize:48 }}>🎉</div>
        <h2 style={{ fontSize:24, fontWeight:800, color:"#333" }}>¡Quiz terminado!</h2>
        <Stars s={sc} t={T} />
        <div style={{ background:"linear-gradient(135deg,#0052D4,#6FB1FC)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:42, fontWeight:800 }}>{sc}/{T}</div>
          <div style={{ fontSize:15, opacity:0.9, marginTop:8 }}>Correctas</div>
          <div style={{ fontSize:14, opacity:0.8, marginTop:4 }}>🔥 Mejor racha: {bStr}</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>{sc >= 13 ? "🏆 ¡Experta en banderas!" : sc >= 9 ? "💪 ¡Muy bien!" : "📚 ¡Sigue practicando!"}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={gen} style={pill("#0052D4","#fff")}>🔄 Jugar de nuevo</button>
          <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        </div>
      </div>
    );
  }

  if (!qs.length) return null;
  const q = qs[qi];

  const questionText = q.type === Q_FLAG_TO_COUNTRY
    ? "¿De qué país es esta bandera?"
    : q.type === Q_COUNTRY_TO_FLAG
    ? "¿Cuál es la bandera de...?"
    : "¿Cuál es la capital de...?";

  const questionDisplay = q.type === Q_FLAG_TO_COUNTRY
    ? q.item.flag
    : `${q.item.flag} ${q.item.name}`;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:420, alignItems:"center" }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <div style={{ display:"flex", gap:12, fontSize:14, fontWeight:600 }}><span>✅ {sc}</span><span>🔥 {str}</span></div>
      </div>
      <PBar v={qi + 1} mx={T} />
      <div style={{ fontSize:13, color:"#999" }}>Pregunta {qi + 1} de {T}</div>
      <div style={{ background:"linear-gradient(135deg,#0052D4,#4364F7)", borderRadius:20, padding:24, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:14, opacity:0.85, marginBottom:6 }}>{questionText}</div>
        <div style={{ fontSize: q.type === Q_FLAG_TO_COUNTRY ? 56 : 24, fontWeight:800 }}>{questionDisplay}</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, width:"100%", maxWidth:400 }}>
        {q.opts.map((o, i) => (
          <OptionButton key={i} text={o} sel={sel} cor={q.cor} onClick={() => pick(o)} isFlag={q.type === Q_COUNTRY_TO_FLAG} />
        ))}
      </div>
    </div>
  );
}

/* =================== CHALLENGE MODE =================== */
function ChallengeMode({ onBack, saveChallenge }) {
  const [st, setSt] = useState("ready");
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sc, setSc] = useState(0);
  const [tm, setTm] = useState(60);
  const [sel, setSel] = useState(null);
  const [conf, setConf] = useState(0);
  const [str, setStr] = useState(0);
  const ref = useRef(null);
  useEffect(() => { if (st === "done") saveChallenge?.(sc); }, [st]);

  const start = () => {
    setQs(makeQuestions(96));
    setQi(0); setSc(0); setTm(60); setSel(null); setStr(0); setSt("playing");
  };

  useEffect(() => {
    if (st !== "playing") return;
    ref.current = setInterval(() => {
      setTm(t => {
        if (t <= 1) { clearInterval(ref.current); setSt("done"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [st]);

  const pick = (o) => {
    if (sel !== null || st !== "playing") return;
    setSel(o);
    if (o === qs[qi].cor) { setSc(s => s + 1); setStr(s => s + 1); setConf(c => c + 1); }
    else { setStr(0); }
    setTimeout(() => {
      if (qi + 1 >= qs.length) { clearInterval(ref.current); setSt("done"); }
      else { setQi(i => i + 1); setSel(null); }
    }, 600);
  };

  if (st === "ready") {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"0 8px" }}>
        <button onClick={onBack} style={{ ...pill("#e0e0e0","#333"), alignSelf:"flex-start" }}>← Menú</button>
        <div style={{ fontSize:64 }}>⚡</div>
        <h2 style={{ fontSize:24, fontWeight:800, color:"#333", textAlign:"center" }}>Desafío Relámpago</h2>
        <div style={{ background:"linear-gradient(135deg,#e17055,#d63031)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:350, width:"100%" }}>
          <p style={{ fontSize:16, margin:0, lineHeight:1.6 }}>¡Tienes <strong>60 segundos</strong> para identificar la mayor cantidad de banderas y capitales! 🏁</p>
        </div>
        <button onClick={start} style={{ ...pill("#0052D4","#fff"), fontSize:20, padding:"14px 40px", animation:"bdmPulse 1.5s infinite" }}>🚀 ¡Empezar!</button>
        <style>{`@keyframes bdmPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
      </div>
    );
  }

  if (st === "done") {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize:48 }}>⚡</div>
        <h2 style={{ fontSize:24, fontWeight:800, color:"#333" }}>¡Tiempo!</h2>
        <Stars s={sc} t={Math.max(sc + 3, 10)} />
        <div style={{ background:"linear-gradient(135deg,#0052D4,#6FB1FC)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:48, fontWeight:800 }}>{sc}</div>
          <div style={{ fontSize:16 }}>correctas en 60s</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>{sc >= 15 ? "🏆 ¡Increíble!" : sc >= 10 ? "🔥 ¡Muy rápida!" : sc >= 5 ? "💪 ¡Bien!" : "📚 ¡Practica más!"}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={start} style={pill("#0052D4","#fff")}>⚡ Otra vez</button>
          <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        </div>
      </div>
    );
  }

  if (!qs.length) return null;
  const q = qs[qi];
  const tc = tm <= 10 ? "#ef5350" : tm <= 30 ? "#FFA726" : "#66BB6A";

  const questionText = q.type === Q_FLAG_TO_COUNTRY
    ? "¿De qué país es?"
    : q.type === Q_COUNTRY_TO_FLAG
    ? "¿Bandera de...?"
    : "¿Capital de...?";

  const questionDisplay = q.type === Q_FLAG_TO_COUNTRY
    ? q.item.flag
    : `${q.item.flag} ${q.item.name}`;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:420, alignItems:"center" }}>
        <div style={{ fontSize:28, fontWeight:800, color:tc, animation: tm <= 10 ? "bdmPulse 0.5s infinite" : "none" }}>⏱ {tm}s</div>
        <div style={{ display:"flex", gap:12, fontSize:15, fontWeight:700 }}><span>✅ {sc}</span><span>🔥 {str}</span></div>
      </div>
      <div style={{ width:"100%", maxWidth:420, height:8, background:"#e0e0e0", borderRadius:4, overflow:"hidden" }}>
        <div style={{ width:`${(tm/60)*100}%`, height:"100%", background:tc, transition:"width 1s linear", borderRadius:4 }} />
      </div>
      <div style={{ background:`linear-gradient(135deg,${tm <= 10 ? "#ff5252,#f44336" : "#0052D4,#4364F7"})`, borderRadius:18, padding:20, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:13, opacity:0.85 }}>{questionText}</div>
        <div style={{ fontSize: q.type === Q_FLAG_TO_COUNTRY ? 48 : 22, fontWeight:800 }}>{questionDisplay}</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, width:"100%", maxWidth:400 }}>
        {q.opts.map((o, i) => (
          <OptionButton key={i} text={o} sel={sel} cor={q.cor} onClick={() => pick(o)} isFlag={q.type === Q_COUNTRY_TO_FLAG} />
        ))}
      </div>
      <style>{`@keyframes bdmPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
    </div>
  );
}

/* =================== MAIN GAME COMPONENT =================== */
export default function BanderasMundo() {
  const [screen, setScreen] = useState("menu");
  const [floats, setFloats] = useState([]);
  const { saveQuiz, saveChallenge, saveLearned } = useGameProgress("banderas-mundo");

  useEffect(() => {
    if (screen !== "menu") return;
    const iv = setInterval(() => {
      setFloats(f => [...f, { id: Date.now(), emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], x: Math.random() * 90 + 5 }].slice(-8));
    }, 1800);
    return () => clearInterval(iv);
  }, [screen]);

  const screens = { gallery: GalleryMode, learn: LearnMode, quiz: QuizMode, challenge: ChallengeMode };
  const Screen = screens[screen];

  if (Screen) {
    return (
      <div style={gameCtn}>
        <Screen onBack={() => setScreen("menu")} saveQuiz={saveQuiz} saveChallenge={saveChallenge} saveLearned={saveLearned} />
      </div>
    );
  }

  const modes = [
    { key:"gallery", icon:"🏳️", title:"Galería de Banderas", desc:"Explora las banderas de 50 países del mundo", gradient:"linear-gradient(135deg,#0052D4,#4364F7)" },
    { key:"learn", icon:"📚", title:"Aprende", desc:"Tarjetas con banderas, capitales y datos curiosos", gradient:"linear-gradient(135deg,#6c5ce7,#a29bfe)" },
    { key:"quiz", icon:"🧠", title:"Quiz", desc:"¿Reconoces todas las banderas?", gradient:"linear-gradient(135deg,#fd79a8,#e84393)" },
    { key:"challenge", icon:"⚡", title:"Desafío Relámpago", desc:"60 segundos. ¿Cuántas aciertas?", gradient:"linear-gradient(135deg,#e17055,#d63031)" },
  ];

  return (
    <div style={gameCtn}>
      <div style={{ position:"relative", overflow:"hidden", minHeight:"100%" }}>
        {floats.map(f => (
          <div key={f.id} style={{ position:"absolute", left:`${f.x}%`, top:-30, fontSize:24, animation:"bdmFloat 4s ease-in forwards", pointerEvents:"none", zIndex:0 }}>{f.emoji}</div>
        ))}
        <style>{`@keyframes bdmFloat{0%{transform:translateY(0);opacity:1}100%{transform:translateY(600px);opacity:0}}`}</style>
        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"0 8px" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:4 }}>🌍</div>
            <h1 style={{ fontSize:28, fontWeight:900, margin:0, background:"linear-gradient(135deg,#0052D4,#6FB1FC)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Banderas del Mundo
            </h1>
            <p style={{ fontSize:15, color:"#777", margin:"4px 0 0" }}>¡Aprende las banderas de 50 países!</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14, width:"100%", maxWidth:380 }}>
            {modes.map(m => (
              <button key={m.key} onClick={() => setScreen(m.key)} style={{
                background:m.gradient, border:"none", borderRadius:20, padding:"20px 22px",
                color:"white", textAlign:"left", cursor:"pointer", transition:"transform 0.2s",
                boxShadow:"0 6px 25px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", gap:16
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                <span style={{ fontSize:36 }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize:18, fontWeight:800 }}>{m.title}</div>
                  <div style={{ fontSize:13, opacity:0.9 }}>{m.desc}</div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ fontSize:12, color:"#bbb", textAlign:"center", marginTop:8 }}>50 países · 5 continentes · Banderas y capitales · ¡A jugar! 🎮</div>
        </div>
      </div>
    </div>
  );
}

const gameCtn = {
  fontFamily:"'Segoe UI',system-ui,-apple-system,sans-serif",
  maxWidth:480, margin:"0 auto", padding:"24px 12px", minHeight:"100vh",
  background:"linear-gradient(180deg,#f0f4ff 0%,#e8f0ff 50%,#f5f0ff 100%)"
};
