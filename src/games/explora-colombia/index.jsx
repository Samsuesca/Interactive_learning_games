import { useState, useEffect, useRef } from "react";

const DEPTS = [
  { dept:"Amazonas", cap:"Leticia", x:227, y:396, r:"amazonia" },
  { dept:"Antioquia", cap:"Medellín", x:82, y:144, r:"andina" },
  { dept:"Arauca", cap:"Arauca", x:200, y:120, r:"orinoquia" },
  { dept:"Atlántico", cap:"Barranquilla", x:112, y:32, r:"caribe" },
  { dept:"Bolívar", cap:"Cartagena", x:92, y:58, r:"caribe" },
  { dept:"Boyacá", cap:"Tunja", x:138, y:155, r:"andina" },
  { dept:"Caldas", cap:"Manizales", x:80, y:168, r:"andina" },
  { dept:"Caquetá", cap:"Florencia", x:90, y:258, r:"amazonia" },
  { dept:"Casanare", cap:"Yopal", x:168, y:160, r:"orinoquia" },
  { dept:"Cauca", cap:"Popayán", x:60, y:236, r:"pacifica" },
  { dept:"Cesar", cap:"Valledupar", x:148, y:42, r:"caribe" },
  { dept:"Chocó", cap:"Quibdó", x:55, y:158, r:"pacifica" },
  { dept:"Córdoba", cap:"Montería", x:78, y:82, r:"caribe" },
  { dept:"Cundinamarca", cap:"Bogotá", x:118, y:185, r:"andina" },
  { dept:"Guainía", cap:"Inírida", x:272, y:205, r:"amazonia" },
  { dept:"Guaviare", cap:"San José del Guaviare", x:165, y:238, r:"amazonia" },
  { dept:"Huila", cap:"Neiva", x:96, y:228, r:"andina" },
  { dept:"La Guajira", cap:"Riohacha", x:168, y:15, r:"caribe" },
  { dept:"Magdalena", cap:"Santa Marta", x:130, y:22, r:"caribe" },
  { dept:"Meta", cap:"Villavicencio", x:140, y:200, r:"orinoquia" },
  { dept:"Nariño", cap:"Pasto", x:43, y:262, r:"pacifica" },
  { dept:"Norte de Santander", cap:"Cúcuta", x:168, y:100, r:"andina" },
  { dept:"Putumayo", cap:"Mocoa", x:66, y:275, r:"amazonia" },
  { dept:"Quindío", cap:"Armenia", x:88, y:190, r:"andina" },
  { dept:"Risaralda", cap:"Pereira", x:72, y:180, r:"andina" },
  { dept:"San Andrés y Providencia", cap:"San Andrés", x:18, y:18, r:"insular" },
  { dept:"Santander", cap:"Bucaramanga", x:148, y:120, r:"andina" },
  { dept:"Sucre", cap:"Sincelejo", x:88, y:70, r:"caribe" },
  { dept:"Tolima", cap:"Ibagué", x:94, y:195, r:"andina" },
  { dept:"Valle del Cauca", cap:"Cali", x:62, y:212, r:"pacifica" },
  { dept:"Vaupés", cap:"Mitú", x:220, y:268, r:"amazonia" },
  { dept:"Vichada", cap:"Puerto Carreño", x:285, y:148, r:"orinoquia" },
];

const REGIONS = {
  caribe: { name:"Caribe", color:"#FF6B6B", emoji:"🏖️" },
  andina: { name:"Andina", color:"#667eea", emoji:"🏔️" },
  pacifica: { name:"Pacífica", color:"#4ECDC4", emoji:"🌊" },
  orinoquia: { name:"Orinoquía", color:"#F9A825", emoji:"🌾" },
  amazonia: { name:"Amazonía", color:"#66BB6A", emoji:"🌿" },
  insular: { name:"Insular", color:"#AB47BC", emoji:"🏝️" },
};

const MAP_PATH = "M60,118 L68,105 L78,95 L88,78 L98,65 L110,48 L125,38 L145,34 L160,28 L178,22 L195,16 L210,8 L215,18 L210,32 L198,52 L190,68 L188,88 L186,108 L190,128 L200,138 L220,142 L255,148 L285,152 L305,162 L310,180 L308,200 L305,225 L298,260 L280,290 L262,310 L250,340 L244,370 L240,400 L236,418 L230,420 L200,390 L170,365 L145,340 L115,318 L90,305 L68,290 L52,278 L42,262 L40,240 L44,222 L50,208 L52,190 L50,172 L52,155 L56,140 L58,128 Z";
const EMOJIS = ["🎉","⭐","🌟","💫","🎊","🏆","👏","💪","🇨🇴","🦜","☕","🌺"];

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
      <div style={{ width:`${mx > 0 ? (v/mx)*100 : 0}%`, height:"100%", background:"linear-gradient(90deg,#F9A825,#FF6B6B)", borderRadius:5, transition:"width 0.5s" }} />
    </div>
  );
}

function makeQuestions(count) {
  return shuffle(DEPTS).slice(0, count).map(item => {
    const askC = Math.random() > 0.5;
    const cor = askC ? item.cap : item.dept;
    let opts = [cor];
    const pool = DEPTS.filter(d => d.dept !== item.dept);
    while (opts.length < 4) {
      const r = pool[Math.floor(Math.random() * pool.length)];
      const v = askC ? r.cap : r.dept;
      if (!opts.includes(v)) opts.push(v);
    }
    return { item, askC, cor, opts: shuffle(opts) };
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

/* =================== MAP MODE =================== */
function MapMode({ onBack }) {
  const [sel, setSel] = useState(null);
  const [found, setFound] = useState(new Set());
  const [mode, setMode] = useState("explore");
  const [target, setTarget] = useState(null);
  const [msg, setMsg] = useState("");
  const [fScore, setFScore] = useState(0);
  const [conf, setConf] = useState(0);
  const [queue, setQueue] = useState([]);

  const startFind = () => {
    const q = shuffle([...DEPTS]);
    setQueue(q); setTarget(q[0]); setMode("findIt");
    setFScore(0); setMsg(""); setSel(null); setFound(new Set());
  };

  const handleDot = (d, i) => {
    if (mode === "explore") {
      setSel(sel === i ? null : i);
      setFound(s => { const n = new Set(s); n.add(i); return n; });
    } else if (mode === "findIt" && target) {
      if (d.dept === target.dept) {
        setFScore(s => s + 1);
        setMsg("✅ ¡Correcto!");
        setConf(c => c + 1);
        setFound(s => { const n = new Set(s); n.add(i); return n; });
        setSel(i);
        setTimeout(() => {
          const nq = [...queue]; nq.shift();
          if (nq.length === 0) { setMode("explore"); setMsg("🏆 ¡Encontraste todos!"); return; }
          setQueue(nq); setTarget(nq[0]); setMsg(""); setSel(null);
        }, 1200);
      } else {
        setMsg(`❌ Ese es ${d.dept}. ¡Intenta de nuevo!`);
        setTimeout(() => setMsg(""), 1500);
      }
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:440, alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => { setMode("explore"); setSel(null); setMsg(""); }} style={pill(mode === "explore" ? "#667eea" : "#e0e0e0", mode === "explore" ? "#fff" : "#333")}>🔍 Explorar</button>
          <button onClick={startFind} style={pill(mode === "findIt" ? "#f12711" : "#e0e0e0", mode === "findIt" ? "#fff" : "#333")}>🎯 Encuéntralo</button>
        </div>
      </div>

      {mode === "explore" && (
        <div style={{ fontSize:13, color:"#888" }}>📍 Toca un punto para ver info ({found.size}/32 explorados)</div>
      )}

      {mode === "findIt" && target && (
        <div style={{ background:"linear-gradient(135deg,#f5af19,#f12711)", borderRadius:16, padding:"12px 20px", color:"#fff", textAlign:"center", maxWidth:400, width:"100%" }}>
          <div style={{ fontSize:13, opacity:0.85 }}>¿Dónde queda...? (✅ {fScore})</div>
          <div style={{ fontSize:22, fontWeight:800 }}>🏔️ {target.dept}</div>
        </div>
      )}

      {msg && <div style={{ fontSize:16, fontWeight:700, textAlign:"center", padding:4 }}>{msg}</div>}

      <div style={{ width:"100%", maxWidth:440, position:"relative" }}>
        <svg viewBox="-5 -5 340 440" style={{ width:"100%", height:"auto" }}>
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e8f5e9" /><stop offset="100%" stopColor="#f1f8e9" /></linearGradient>
          </defs>
          <path d={MAP_PATH} fill="url(#mapGrad)" stroke="#81C784" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="6" y="6" width="26" height="26" rx="6" fill="#f3e5f5" stroke="#AB47BC" strokeWidth="1" strokeDasharray="3,2" />
          <text x="19" y="16" textAnchor="middle" fontSize="5" fill="#AB47BC" fontWeight="600">Isla</text>

          {DEPTS.map((d, i) => {
            const rc = REGIONS[d.r];
            const isSel = sel === i;
            const isFound = found.has(i);
            return (
              <g key={d.dept} onClick={() => handleDot(d, i)} style={{ cursor:"pointer" }}>
                {isSel && (
                  <circle cx={d.x} cy={d.y} r="14" fill={rc.color} opacity="0.15">
                    <animate attributeName="r" values="12;18;12" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={d.x} cy={d.y} r={isSel ? 7 : 5} fill={rc.color} stroke="#fff" strokeWidth="1.5"
                  filter={isSel ? "url(#glow)" : ""} opacity={isFound ? 1 : 0.75} />
                {isSel && (
                  <g>
                    <rect x={d.x - 55} y={d.y - 48} width="110" height="38" rx="8" fill="white" stroke={rc.color} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }} />
                    <polygon points={`${d.x - 5},${d.y - 10} ${d.x + 5},${d.y - 10} ${d.x},${d.y - 4}`} fill="white" stroke={rc.color} strokeWidth="1" />
                    <text x={d.x} y={d.y - 33} textAnchor="middle" fontSize="7" fontWeight="800" fill="#333">{d.dept}</text>
                    <text x={d.x} y={d.y - 22} textAnchor="middle" fontSize="6.5" fill={rc.color} fontWeight="600">🏛️ {d.cap}</text>
                    <text x={d.x} y={d.y - 13} textAnchor="middle" fontSize="5" fill="#999">{rc.emoji} {rc.name}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", maxWidth:440 }}>
        {Object.entries(REGIONS).map(([k, v]) => (
          <div key={k} style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, fontWeight:600, background:"#fff", padding:"4px 10px", borderRadius:20, border:`2px solid ${v.color}`, color:v.color }}>
            <span>{v.emoji}</span>{v.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== LEARN MODE =================== */
function LearnMode({ onBack }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(new Set());
  const d = DEPTS[idx];
  const rc = REGIONS[d.r];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"0 8px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", maxWidth:420 }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <span style={{ fontSize:14, fontWeight:600, color:"#666" }}>📚 {learned.size}/{DEPTS.length}</span>
      </div>
      <PBar v={learned.size} mx={DEPTS.length} />
      <div onClick={() => setFlipped(!flipped)} style={{ width:"100%", maxWidth:380, minHeight:220, perspective:800, cursor:"pointer" }}>
        <div style={{ width:"100%", minHeight:220, position:"relative", transformStyle:"preserve-3d", transition:"transform 0.5s", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#667eea,#764ba2)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, color:"white", boxShadow:"0 10px 40px rgba(102,126,234,0.4)" }}>
            <div style={{ fontSize:14, opacity:0.8, marginBottom:4 }}>🏔️ Departamento</div>
            <div style={{ fontSize:28, fontWeight:800, textAlign:"center" }}>{d.dept}</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"4px 12px", borderRadius:20 }}>{rc.emoji} Región {rc.name}</div>
            <div style={{ fontSize:13, opacity:0.7, marginTop:12 }}>👆 Toca para ver la capital</div>
          </div>
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#f093fb,#f5576c)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, color:"white", transform:"rotateY(180deg)", boxShadow:"0 10px 40px rgba(245,87,108,0.4)" }}>
            <div style={{ fontSize:14, opacity:0.8, marginBottom:4 }}>🏛️ Capital</div>
            <div style={{ fontSize:28, fontWeight:800, textAlign:"center" }}>{d.cap}</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"4px 12px", borderRadius:20 }}>{rc.emoji} Región {rc.name}</div>
            <div style={{ fontSize:13, opacity:0.7, marginTop:12 }}>👆 Toca para voltear</div>
          </div>
        </div>
      </div>
      <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"center" }}>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIdx(i => (i - 1 + DEPTS.length) % DEPTS.length), 150); }} style={circ("#4ECDC4")}>◀</button>
        <button onClick={() => setLearned(s => { const n = new Set(s); n.has(idx) ? n.delete(idx) : n.add(idx); return n; })} style={{ ...pill(learned.has(idx) ? "#66BB6A" : "#e0e0e0", learned.has(idx) ? "#fff" : "#333"), minWidth:140 }}>
          {learned.has(idx) ? "✅ Aprendido" : "Marcar aprendido"}
        </button>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIdx(i => (i + 1) % DEPTS.length), 150); }} style={circ("#4ECDC4")}>▶</button>
      </div>
      <div style={{ fontSize:14, color:"#999" }}>Tarjeta {idx + 1} de {DEPTS.length}</div>
    </div>
  );
}

/* =================== QUIZ MODE =================== */
function QuizMode({ onBack }) {
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sc, setSc] = useState(0);
  const [str, setStr] = useState(0);
  const [bStr, setBStr] = useState(0);
  const [conf, setConf] = useState(0);
  const [done, setDone] = useState(false);
  const T = 15;

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
        <div style={{ background:"linear-gradient(135deg,#667eea,#764ba2)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:42, fontWeight:800 }}>{sc}/{T}</div>
          <div style={{ fontSize:15, opacity:0.9, marginTop:8 }}>Correctas</div>
          <div style={{ fontSize:14, opacity:0.8, marginTop:4 }}>🔥 Mejor racha: {bStr}</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>{sc >= 13 ? "🏆 ¡Experta en Colombia!" : sc >= 9 ? "💪 ¡Muy bien!" : "📚 ¡Sigue practicando!"}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={gen} style={pill("#F9A825","#fff")}>🔄 Jugar de nuevo</button>
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
        <div style={{ display:"flex", gap:12, fontSize:14, fontWeight:600 }}><span>✅ {sc}</span><span>🔥 {str}</span></div>
      </div>
      <PBar v={qi + 1} mx={T} />
      <div style={{ fontSize:13, color:"#999" }}>Pregunta {qi + 1} de {T}</div>
      <div style={{ background:"linear-gradient(135deg,#f5af19,#f12711)", borderRadius:20, padding:24, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:14, opacity:0.85, marginBottom:6 }}>{q.askC ? "¿Cuál es la capital de...?" : "¿A qué departamento pertenece...?"}</div>
        <div style={{ fontSize:24, fontWeight:800 }}>{q.askC ? `🏔️ ${q.item.dept}` : `🏛️ ${q.item.cap}`}</div>
        <div style={{ fontSize:11, opacity:0.75, marginTop:8 }}>{REGIONS[q.item.r].emoji} Región {REGIONS[q.item.r].name}</div>
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
function ChallengeMode({ onBack }) {
  const [st, setSt] = useState("ready");
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sc, setSc] = useState(0);
  const [tm, setTm] = useState(60);
  const [sel, setSel] = useState(null);
  const [conf, setConf] = useState(0);
  const [str, setStr] = useState(0);
  const ref = useRef(null);

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
        <div style={{ background:"linear-gradient(135deg,#f5af19,#f12711)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:350, width:"100%" }}>
          <p style={{ fontSize:16, margin:0, lineHeight:1.6 }}>¡Tienes <strong>60 segundos</strong> para responder la mayor cantidad! 🏁</p>
        </div>
        <button onClick={start} style={{ ...pill("#F9A825","#fff"), fontSize:20, padding:"14px 40px", animation:"pulse 1.5s infinite" }}>🚀 ¡Empezar!</button>
        <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
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
          <button onClick={start} style={pill("#F9A825","#fff")}>⚡ Otra vez</button>
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
        <div style={{ fontSize:28, fontWeight:800, color:tc, animation: tm <= 10 ? "pulse 0.5s infinite" : "none" }}>⏱ {tm}s</div>
        <div style={{ display:"flex", gap:12, fontSize:15, fontWeight:700 }}><span>✅ {sc}</span><span>🔥 {str}</span></div>
      </div>
      <div style={{ width:"100%", maxWidth:420, height:8, background:"#e0e0e0", borderRadius:4, overflow:"hidden" }}>
        <div style={{ width:`${(tm/60)*100}%`, height:"100%", background:tc, transition:"width 1s linear", borderRadius:4 }} />
      </div>
      <div style={{ background:`linear-gradient(135deg,${tm <= 10 ? "#ff5252,#f44336" : "#667eea,#764ba2"})`, borderRadius:18, padding:20, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:13, opacity:0.85 }}>{q.askC ? "¿Capital de...?" : "¿Departamento de...?"}</div>
        <div style={{ fontSize:22, fontWeight:800 }}>{q.askC ? q.item.dept : q.item.cap}</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, width:"100%", maxWidth:400 }}>
        {q.opts.map((o, i) => (
          <OptionButton key={i} text={o} sel={sel} cor={q.cor} onClick={() => pick(o)} />
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
    </div>
  );
}

/* =================== MAIN GAME COMPONENT =================== */
export default function ExploraColombia() {
  const [screen, setScreen] = useState("menu");
  const [floats, setFloats] = useState([]);

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
        <Screen onBack={() => setScreen("menu")} />
      </div>
    );
  }

  const modes = [
    { key:"map", icon:"🗺️", title:"Mapa Interactivo", desc:"Explora Colombia tocando el mapa", gradient:"linear-gradient(135deg,#11998e,#38ef7d)" },
    { key:"learn", icon:"📚", title:"Aprende", desc:"Tarjetas con departamentos y capitales", gradient:"linear-gradient(135deg,#667eea,#764ba2)" },
    { key:"quiz", icon:"🧠", title:"Quiz", desc:"Pon a prueba tu conocimiento", gradient:"linear-gradient(135deg,#f093fb,#f5576c)" },
    { key:"challenge", icon:"⚡", title:"Desafío Relámpago", desc:"60 segundos. ¿Cuántas aciertas?", gradient:"linear-gradient(135deg,#f5af19,#f12711)" },
  ];

  return (
    <div style={gameCtn}>
      <div style={{ position:"relative", overflow:"hidden", minHeight:"100%" }}>
        {floats.map(f => (
          <div key={f.id} style={{ position:"absolute", left:`${f.x}%`, top:-30, fontSize:24, animation:"floatUp 4s ease-in forwards", pointerEvents:"none", zIndex:0 }}>{f.emoji}</div>
        ))}
        <style>{`@keyframes floatUp{0%{transform:translateY(0);opacity:1}100%{transform:translateY(600px);opacity:0}}`}</style>
        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"0 8px" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:4 }}>🇨🇴</div>
            <h1 style={{ fontSize:30, fontWeight:900, margin:0, background:"linear-gradient(135deg,#F9A825,#f12711)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Explora Colombia
            </h1>
            <p style={{ fontSize:15, color:"#777", margin:"4px 0 0" }}>¡Aprende jugando los departamentos y capitales!</p>
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
          <div style={{ fontSize:12, color:"#bbb", textAlign:"center", marginTop:8 }}>32 departamentos · 32 capitales · 6 regiones · ¡A jugar! 🎮</div>
        </div>
      </div>
    </div>
  );
}

const gameCtn = {
  maxWidth:480, margin:"0 auto", padding:"24px 12px", minHeight:"100vh",
  background:"linear-gradient(180deg,#fef9f0 0%,#fff5f5 50%,#f0f4ff 100%)"
};
