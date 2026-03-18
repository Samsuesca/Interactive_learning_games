import { useState, useEffect, useRef, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import useGameProgress from "../../hooks/useGameProgress";
import southAmericaGeo from "./southamerica-geo.js";

const COUNTRIES = [
  { name:"Argentina", cap:"Buenos Aires", flag:"🇦🇷", currency:"Peso argentino", lang:"Español", pop:"46M", fun:"Cuna del tango y el asado" },
  { name:"Bolivia", cap:"Sucre", flag:"🇧🇴", currency:"Boliviano", lang:"Español", pop:"12M", fun:"Tiene el Salar de Uyuni, el más grande del mundo" },
  { name:"Brasil", cap:"Brasilia", flag:"🇧🇷", currency:"Real", lang:"Portugués", pop:"215M", fun:"El país más grande de Sudamérica" },
  { name:"Chile", cap:"Santiago", flag:"🇨🇱", currency:"Peso chileno", lang:"Español", pop:"19M", fun:"El país más largo y angosto del mundo" },
  { name:"Colombia", cap:"Bogotá", flag:"🇨🇴", currency:"Peso colombiano", lang:"Español", pop:"52M", fun:"El segundo país con más biodiversidad" },
  { name:"Ecuador", cap:"Quito", flag:"🇪🇨", currency:"Dólar", lang:"Español", pop:"18M", fun:"Nombrado por la línea del Ecuador que lo cruza" },
  { name:"Guyana", cap:"Georgetown", flag:"🇬🇾", currency:"Dólar guyanés", lang:"Inglés", pop:"0.8M", fun:"El único país sudamericano de habla inglesa" },
  { name:"Paraguay", cap:"Asunción", flag:"🇵🇾", currency:"Guaraní", lang:"Español / Guaraní", pop:"7M", fun:"Su bandera es diferente por cada lado" },
  { name:"Perú", cap:"Lima", flag:"🇵🇪", currency:"Sol", lang:"Español", pop:"34M", fun:"Hogar de Machu Picchu y la civilización Inca" },
  { name:"Surinam", cap:"Paramaribo", flag:"🇸🇷", currency:"Dólar surinamés", lang:"Neerlandés", pop:"0.6M", fun:"El país más pequeño de Sudamérica" },
  { name:"Uruguay", cap:"Montevideo", flag:"🇺🇾", currency:"Peso uruguayo", lang:"Español", pop:"3.5M", fun:"Ganó la primera Copa del Mundo en 1930" },
  { name:"Venezuela", cap:"Caracas", flag:"🇻🇪", currency:"Bolívar", lang:"Español", pop:"29M", fun:"Tiene el Salto Ángel, la cascada más alta del mundo" },
];

const EMOJIS = ["🎉","⭐","🌟","💫","🌎","🏆","👏","💪","🦜","☕","🌺","🎊"];

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
      <div style={{ width:`${mx > 0 ? (v/mx)*100 : 0}%`, height:"100%", background:"linear-gradient(90deg,#11998e,#38ef7d)", borderRadius:5, transition:"width 0.5s" }} />
    </div>
  );
}

function makeQuestions(count) {
  return shuffle(COUNTRIES).slice(0, count).map(item => {
    const askCap = Math.random() > 0.5;
    const cor = askCap ? item.cap : item.name;
    let opts = [cor];
    const pool = COUNTRIES.filter(c => c.name !== item.name);
    while (opts.length < 4) {
      const r = pool[Math.floor(Math.random() * pool.length)];
      const v = askCap ? r.cap : r.name;
      if (!opts.includes(v)) opts.push(v);
    }
    return { item, askCap, cor, opts: shuffle(opts) };
  });
}

function OptionButton({ text, sel, cor, onClick }) {
  const ok = text === cor;
  const isSel = sel === text;
  let bg = "white", bd = "#ddd", cl = "#333";
  if (sel !== null) {
    if (ok) { bg = "#c8e6c9"; bd = "#66BB6A"; cl = "#2e7d32"; }
    else if (isSel) { bg = "#ffcdd2"; bd = "#ef5350"; cl = "#c62828"; }
  }
  return (
    <button onClick={onClick} style={{
      background:bg, border:`2px solid ${bd}`, borderRadius:16, padding:"14px 10px",
      fontSize:15, fontWeight:600, color:cl, cursor: sel !== null ? "default" : "pointer",
      transition:"all 0.3s", transform: isSel ? "scale(1.04)" : "scale(1)",
      boxShadow: isSel ? "0 4px 15px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      {sel !== null && ok && "✅ "}{sel !== null && isSel && !ok && "❌ "}{text}
    </button>
  );
}

/* =================== MAP COMPONENT =================== */
const MAP_W = 480;
const MAP_H = 580;

const COUNTRY_COLORS = {
  Argentina: "#74b9ff",
  Bolivia: "#fdcb6e",
  Brasil: "#55efc4",
  Chile: "#e17055",
  Colombia: "#ffeaa7",
  Ecuador: "#fab1a0",
  Guyana: "#81ecec",
  Paraguay: "#dfe6e9",
  Perú: "#fd79a8",
  Surinam: "#a29bfe",
  Uruguay: "#00cec9",
  Venezuela: "#6c5ce7",
};

function useSouthAmericaMap() {
  return useMemo(() => {
    const projection = geoMercator().fitSize([MAP_W, MAP_H], southAmericaGeo);
    const pathGen = geoPath().projection(projection);
    const countryMap = new Map();
    COUNTRIES.forEach(c => countryMap.set(c.name, c));

    const features = southAmericaGeo.features.map(feat => {
      const name = feat.properties.name;
      const info = countryMap.get(name);
      const centroid = pathGen.centroid(feat);
      return { feat, name, path: pathGen(feat), centroid, info };
    }).filter(f => f.info);

    return { features };
  }, []);
}

function SouthAmericaMapSVG({ sel, found, hovered, setHovered, onClickCountry, mode }) {
  const { features } = useSouthAmericaMap();

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Mapa interactivo de Sudamérica con países" style={{ width:"100%", height:"auto", maxHeight:"62vh" }}>
      <defs>
        <filter id="saShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" /></filter>
      </defs>

      {features.map(({ name, path, info }) => {
        if (!info || !path) return null;
        const baseColor = COUNTRY_COLORS[name] || "#ccc";
        const isSel = sel === name;
        const isHov = hovered === name;
        const isFound = found.has(name);

        let fill = baseColor + "88";
        let strokeW = 1;
        let stroke = "#fff";

        if (isSel) { fill = baseColor; strokeW = 2.5; stroke = "#333"; }
        else if (isHov) { fill = baseColor + "cc"; strokeW = 1.5; }
        else if (isFound) { fill = baseColor + "bb"; }

        if (mode === "findIt" && !isSel) {
          fill = isFound ? baseColor + "bb" : "#e0e0e0";
          stroke = isFound ? "#fff" : "#ccc";
        }

        return (
          <path key={name} d={path} fill={fill} stroke={stroke} strokeWidth={strokeW} strokeLinejoin="round"
            role="button"
            aria-label={`País: ${name}`}
            tabIndex={0}
            style={{ cursor:"pointer", transition:"fill 0.2s" }}
            onClick={() => onClickCountry(name)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClickCountry(name); } }}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}

      {/* Selected label */}
      {features.map(({ name, centroid, info }) => {
        if (!info || sel !== name) return null;
        const [cx, cy] = centroid;
        if (isNaN(cx) || isNaN(cy)) return null;
        const lW = 160, lH = 56;
        const lX = Math.max(5, Math.min(cx - lW / 2, MAP_W - lW - 5));
        const lY = Math.max(5, cy - lH - 14);
        return (
          <g key={`label-${name}`} style={{ pointerEvents:"none" }}>
            <rect x={lX} y={lY} width={lW} height={lH} rx="10" fill="white" stroke={COUNTRY_COLORS[name]} strokeWidth="2" filter="url(#saShadow)" />
            <polygon points={`${cx-6},${lY+lH} ${cx+6},${lY+lH} ${cx},${lY+lH+8}`} fill="white" stroke={COUNTRY_COLORS[name]} strokeWidth="1.5" />
            <text x={lX+lW/2} y={lY+20} textAnchor="middle" fontSize="13" fontWeight="800" fill="#333">{info.flag} {info.name}</text>
            <text x={lX+lW/2} y={lY+36} textAnchor="middle" fontSize="11" fill="#555" fontWeight="600">🏛️ {info.cap}</text>
            <text x={lX+lW/2} y={lY+50} textAnchor="middle" fontSize="9" fill="#999">🗣️ {info.lang} · 👥 {info.pop}</text>
          </g>
        );
      })}

      {/* Hover tooltip */}
      {hovered && hovered !== sel && features.map(({ name, centroid, info }) => {
        if (!info || name !== hovered) return null;
        const [cx, cy] = centroid;
        if (isNaN(cx) || isNaN(cy)) return null;
        return (
          <g key={`hover-${name}`} style={{ pointerEvents:"none" }}>
            <rect x={cx-55} y={cy-28} width="110" height="22" rx="6" fill="rgba(0,0,0,0.75)" />
            <text x={cx} y={cy-13} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{info.flag} {info.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* =================== MAP MODE =================== */
function MapMode({ onBack }) {
  const [sel, setSel] = useState(null);
  const [found, setFound] = useState(new Set());
  const [hovered, setHovered] = useState(null);
  const [mode, setMode] = useState("explore");
  const [target, setTarget] = useState(null);
  const [msg, setMsg] = useState("");
  const [fScore, setFScore] = useState(0);
  const [conf, setConf] = useState(0);
  const [queue, setQueue] = useState([]);

  const countryByName = useMemo(() => {
    const m = new Map();
    COUNTRIES.forEach(c => m.set(c.name, c));
    return m;
  }, []);

  const startFind = () => {
    const q = shuffle([...COUNTRIES]);
    setQueue(q); setTarget(q[0]); setMode("findIt");
    setFScore(0); setMsg(""); setSel(null); setFound(new Set());
  };

  const handleClick = (name) => {
    const c = countryByName.get(name);
    if (!c) return;

    if (mode === "explore") {
      setSel(sel === name ? null : name);
      setFound(s => { const n = new Set(s); n.add(name); return n; });
    } else if (mode === "findIt" && target) {
      if (c.name === target.name) {
        setFScore(s => s + 1);
        setMsg("✅ ¡Correcto!");
        setConf(p => p + 1);
        setFound(s => { const n = new Set(s); n.add(name); return n; });
        setSel(name);
        setTimeout(() => {
          const nq = [...queue]; nq.shift();
          if (nq.length === 0) { setMode("explore"); setMsg("🏆 ¡Encontraste todos!"); return; }
          setQueue(nq); setTarget(nq[0]); setMsg(""); setSel(null);
        }, 1200);
      } else {
        setMsg(`❌ Ese es ${c.name}. ¡Intenta de nuevo!`);
        setTimeout(() => setMsg(""), 1500);
      }
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:480, alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => { setMode("explore"); setSel(null); setMsg(""); }} style={pill(mode === "explore" ? "#11998e" : "#e0e0e0", mode === "explore" ? "#fff" : "#333")}>🔍 Explorar</button>
          <button onClick={startFind} style={pill(mode === "findIt" ? "#e17055" : "#e0e0e0", mode === "findIt" ? "#fff" : "#333")}>🎯 Encuéntralo</button>
        </div>
      </div>

      {mode === "explore" && (
        <div style={{ fontSize:13, color:"#888" }}>🌎 Toca un país para ver info ({found.size}/12 explorados)</div>
      )}

      {mode === "findIt" && target && (
        <div style={{ background:"linear-gradient(135deg,#e17055,#d63031)", borderRadius:16, padding:"12px 20px", color:"#fff", textAlign:"center", maxWidth:400, width:"100%" }}>
          <div style={{ fontSize:13, opacity:0.85 }}>¿Dónde queda...? (✅ {fScore})</div>
          <div style={{ fontSize:22, fontWeight:800 }}>{target.flag} {target.name}</div>
        </div>
      )}

      {msg && <div style={{ fontSize:16, fontWeight:700, textAlign:"center", padding:4 }}>{msg}</div>}

      <div style={{ width:"100%", maxWidth:480, background:"#f0f8ff", borderRadius:16, padding:8, boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}>
        <SouthAmericaMapSVG sel={sel} found={found} hovered={hovered} setHovered={setHovered} onClickCountry={handleClick} mode={mode} />
      </div>
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
      <div onClick={() => setFlipped(!flipped)} style={{ width:"100%", maxWidth:380, minHeight:260, perspective:800, cursor:"pointer" }}>
        <div style={{ width:"100%", minHeight:260, position:"relative", transformStyle:"preserve-3d", transition:"transform 0.5s", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
          {/* Front - Country */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#11998e,#38ef7d)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, color:"white", boxShadow:"0 10px 40px rgba(17,153,142,0.4)" }}>
            <div style={{ fontSize:48, marginBottom:4 }}>{c.flag}</div>
            <div style={{ fontSize:28, fontWeight:800, textAlign:"center" }}>{c.name}</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"4px 14px", borderRadius:20 }}>🗣️ {c.lang} · 💰 {c.currency}</div>
            <div style={{ fontSize:13, opacity:0.7, marginTop:12 }}>👆 Toca para ver la capital</div>
          </div>
          {/* Back - Capital + Fun fact */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#6c5ce7,#a29bfe)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, color:"white", transform:"rotateY(180deg)", boxShadow:"0 10px 40px rgba(108,92,231,0.4)" }}>
            <div style={{ fontSize:14, opacity:0.8 }}>🏛️ Capital de {c.name}</div>
            <div style={{ fontSize:28, fontWeight:800, textAlign:"center", marginTop:4 }}>{c.cap}</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"6px 14px", borderRadius:12, textAlign:"center", lineHeight:1.4 }}>💡 {c.fun}</div>
            <div style={{ fontSize:12, marginTop:8, opacity:0.7 }}>👥 Población: {c.pop}</div>
            <div style={{ fontSize:13, opacity:0.7, marginTop:8 }}>👆 Toca para voltear</div>
          </div>
        </div>
      </div>
      <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"center" }}>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIdx(i => (i - 1 + COUNTRIES.length) % COUNTRIES.length), 150); }} style={circ("#11998e")}>◀</button>
        <button onClick={() => setLearned(s => { const n = new Set(s); n.has(idx) ? n.delete(idx) : n.add(idx); return n; })} style={{ ...pill(learned.has(idx) ? "#66BB6A" : "#e0e0e0", learned.has(idx) ? "#fff" : "#333"), minWidth:140 }}>
          {learned.has(idx) ? "✅ Aprendido" : "Marcar aprendido"}
        </button>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIdx(i => (i + 1) % COUNTRIES.length), 150); }} style={circ("#11998e")}>▶</button>
      </div>
      <div style={{ fontSize:14, color:"#999" }}>Tarjeta {idx + 1} de {COUNTRIES.length}</div>
    </div>
  );
}

/* =================== QUIZ MODE =================== */
function QuizMode({ onBack, saveQuiz }) {
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sc, setSc] = useState(0);
  const [str, setStr] = useState(0);
  const [bStr, setBStr] = useState(0);
  const [conf, setConf] = useState(0);
  const [done, setDone] = useState(false);
  const T = 12;
  useEffect(() => { if (done) saveQuiz?.(sc, T, bStr); }, [done]);

  useEffect(() => { gen(); }, []);

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
        <div style={{ background:"linear-gradient(135deg,#11998e,#38ef7d)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:42, fontWeight:800 }}>{sc}/{T}</div>
          <div style={{ fontSize:15, opacity:0.9, marginTop:8 }}>Correctas</div>
          <div style={{ fontSize:14, opacity:0.8, marginTop:4 }}>🔥 Mejor racha: {bStr}</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>{sc >= 11 ? "🏆 ¡Geógrafa experta!" : sc >= 8 ? "💪 ¡Muy bien!" : "📚 ¡Sigue practicando!"}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={gen} style={pill("#11998e","#fff")}>🔄 Jugar de nuevo</button>
          <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        </div>
      </div>
    );
  }

  if (!qs.length) return null;
  const q = qs[qi];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:420, alignItems:"center" }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <div aria-live="polite" style={{ display:"flex", gap:12, fontSize:14, fontWeight:600 }}><span>✅ {sc}</span><span>🔥 {str}</span></div>
      </div>
      <PBar v={qi + 1} mx={T} />
      <div style={{ fontSize:13, color:"#999" }}>Pregunta {qi + 1} de {T}</div>
      <div style={{ background:"linear-gradient(135deg,#6c5ce7,#a29bfe)", borderRadius:20, padding:24, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:14, opacity:0.85, marginBottom:6 }}>{q.askCap ? "¿Cuál es la capital de...?" : "¿De qué país es capital...?"}</div>
        <div style={{ fontSize:24, fontWeight:800 }}>{q.askCap ? `${q.item.flag} ${q.item.name}` : `🏛️ ${q.item.cap}`}</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, width:"100%", maxWidth:400 }}>
        {q.opts.map((o, i) => (
          <OptionButton key={i} text={o} sel={sel} cor={q.cor} onClick={() => pick(o)} />
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
          <p style={{ fontSize:16, margin:0, lineHeight:1.6 }}>¡Tienes <strong>60 segundos</strong> para responder la mayor cantidad de capitales! 🏁</p>
        </div>
        <button onClick={start} style={{ ...pill("#11998e","#fff"), fontSize:20, padding:"14px 40px", animation:"sacPulse 1.5s infinite" }}>🚀 ¡Empezar!</button>
        <style>{`@keyframes sacPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
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
        <div style={{ background:"linear-gradient(135deg,#11998e,#38ef7d)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:48, fontWeight:800 }}>{sc}</div>
          <div style={{ fontSize:16 }}>correctas en 60s</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>{sc >= 15 ? "🏆 ¡Increíble!" : sc >= 10 ? "🔥 ¡Muy rápida!" : sc >= 5 ? "💪 ¡Bien!" : "📚 ¡Practica más!"}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={start} style={pill("#11998e","#fff")}>⚡ Otra vez</button>
          <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        </div>
      </div>
    );
  }

  if (!qs.length) return null;
  const q = qs[qi];
  const tc = tm <= 10 ? "#ef5350" : tm <= 30 ? "#FFA726" : "#66BB6A";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:420, alignItems:"center" }}>
        <div aria-live="assertive" aria-atomic="true" style={{ fontSize:28, fontWeight:800, color:tc, animation: tm <= 10 ? "sacPulse 0.5s infinite" : "none" }}>⏱ {tm}s</div>
        <div aria-live="polite" style={{ display:"flex", gap:12, fontSize:15, fontWeight:700 }}><span>✅ {sc}</span><span>🔥 {str}</span></div>
      </div>
      <div style={{ width:"100%", maxWidth:420, height:8, background:"#e0e0e0", borderRadius:4, overflow:"hidden" }}>
        <div style={{ width:`${(tm/60)*100}%`, height:"100%", background:tc, transition:"width 1s linear", borderRadius:4 }} />
      </div>
      <div style={{ background:`linear-gradient(135deg,${tm <= 10 ? "#ff5252,#f44336" : "#6c5ce7,#a29bfe"})`, borderRadius:18, padding:20, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:13, opacity:0.85 }}>{q.askCap ? "¿Capital de...?" : "¿País de...?"}</div>
        <div style={{ fontSize:22, fontWeight:800 }}>{q.askCap ? `${q.item.flag} ${q.item.name}` : q.item.cap}</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, width:"100%", maxWidth:400 }}>
        {q.opts.map((o, i) => (
          <OptionButton key={i} text={o} sel={sel} cor={q.cor} onClick={() => pick(o)} />
        ))}
      </div>
      <style>{`@keyframes sacPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
    </div>
  );
}

/* =================== MAIN GAME COMPONENT =================== */
export default function CapitalesSudamerica() {
  const [screen, setScreen] = useState("menu");
  const [floats, setFloats] = useState([]);
  const { saveQuiz, saveChallenge, saveLearned } = useGameProgress("capitales-sudamerica");

  useEffect(() => {
    if (screen !== "menu") return;
    const iv = setInterval(() => {
      setFloats(f => [...f, { id: Date.now(), emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], x: Math.random() * 90 + 5 }].slice(-8));
    }, 1800);
    return () => clearInterval(iv);
  }, [screen]);

  const screens = { map: MapMode, learn: LearnMode, quiz: QuizMode, challenge: ChallengeMode };
  const Screen = screens[screen];

  if (Screen) {
    return (
      <div style={gameCtn}>
        <Screen onBack={() => setScreen("menu")} saveQuiz={saveQuiz} saveChallenge={saveChallenge} saveLearned={saveLearned} />
      </div>
    );
  }

  const modes = [
    { key:"map", icon:"🗺️", title:"Mapa Interactivo", desc:"Explora Sudamérica tocando cada país", gradient:"linear-gradient(135deg,#11998e,#38ef7d)" },
    { key:"learn", icon:"📚", title:"Aprende", desc:"Tarjetas con países, capitales y datos curiosos", gradient:"linear-gradient(135deg,#6c5ce7,#a29bfe)" },
    { key:"quiz", icon:"🧠", title:"Quiz", desc:"¿Conoces todas las capitales?", gradient:"linear-gradient(135deg,#fd79a8,#e84393)" },
    { key:"challenge", icon:"⚡", title:"Desafío Relámpago", desc:"60 segundos. ¿Cuántas aciertas?", gradient:"linear-gradient(135deg,#e17055,#d63031)" },
  ];

  return (
    <div style={gameCtn}>
      <div style={{ position:"relative", overflow:"hidden", minHeight:"100%" }}>
        {floats.map(f => (
          <div key={f.id} style={{ position:"absolute", left:`${f.x}%`, top:-30, fontSize:24, animation:"saFloat 4s ease-in forwards", pointerEvents:"none", zIndex:0 }}>{f.emoji}</div>
        ))}
        <style>{`@keyframes saFloat{0%{transform:translateY(0);opacity:1}100%{transform:translateY(600px);opacity:0}}`}</style>
        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"0 8px" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:4 }}>🌎</div>
            <h1 style={{ fontSize:28, fontWeight:900, margin:0, background:"linear-gradient(135deg,#11998e,#38ef7d)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Capitales de Sudamérica
            </h1>
            <p style={{ fontSize:15, color:"#777", margin:"4px 0 0" }}>¡Aprende las capitales de los 12 países!</p>
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
          <div style={{ fontSize:12, color:"#bbb", textAlign:"center", marginTop:8 }}>12 países · 12 capitales · Datos curiosos · ¡A jugar! 🎮</div>
          <a href="/" style={{ fontSize:13, color:"#aaa", textDecoration:"none", textAlign:"center" }}>← Volver al menú principal</a>
        </div>
      </div>
    </div>
  );
}

const gameCtn = {
  fontFamily:"'Segoe UI',system-ui,-apple-system,sans-serif",
  maxWidth:640, margin:"0 auto", padding:"24px 12px", minHeight:"100vh",
  background:"linear-gradient(180deg,#f0fff4 0%,#f0f8ff 50%,#faf0ff 100%)"
};
