import { useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import useGameProgress from "../../hooks/useGameProgress";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { Confetti } from "../../components/game";
import { shuffle, pill } from "../../components/game/utils";
import colombiaGeo from "./colombia-geo.js";

/* =================== DATA =================== */
const DEPTS = [
  { dept:"Amazonas", cap:"Leticia", r:"amazonia" },
  { dept:"Antioquia", cap:"Medellín", r:"andina" },
  { dept:"Arauca", cap:"Arauca", r:"orinoquia" },
  { dept:"Atlántico", cap:"Barranquilla", r:"caribe" },
  { dept:"Bolívar", cap:"Cartagena", r:"caribe" },
  { dept:"Boyacá", cap:"Tunja", r:"andina" },
  { dept:"Caldas", cap:"Manizales", r:"andina" },
  { dept:"Caquetá", cap:"Florencia", r:"amazonia" },
  { dept:"Casanare", cap:"Yopal", r:"orinoquia" },
  { dept:"Cauca", cap:"Popayán", r:"pacifica" },
  { dept:"Cesar", cap:"Valledupar", r:"caribe" },
  { dept:"Chocó", cap:"Quibdó", r:"pacifica" },
  { dept:"Córdoba", cap:"Montería", r:"caribe" },
  { dept:"Cundinamarca", cap:"Bogotá", r:"andina" },
  { dept:"Guainía", cap:"Inírida", r:"amazonia" },
  { dept:"Guaviare", cap:"San José del Guaviare", r:"amazonia" },
  { dept:"Huila", cap:"Neiva", r:"andina" },
  { dept:"La Guajira", cap:"Riohacha", r:"caribe" },
  { dept:"Magdalena", cap:"Santa Marta", r:"caribe" },
  { dept:"Meta", cap:"Villavicencio", r:"orinoquia" },
  { dept:"Nariño", cap:"Pasto", r:"pacifica" },
  { dept:"Norte de Santander", cap:"Cúcuta", r:"andina" },
  { dept:"Putumayo", cap:"Mocoa", r:"amazonia" },
  { dept:"Quindío", cap:"Armenia", r:"andina" },
  { dept:"Risaralda", cap:"Pereira", r:"andina" },
  { dept:"San Andrés y Providencia", cap:"San Andrés", r:"insular" },
  { dept:"Santander", cap:"Bucaramanga", r:"andina" },
  { dept:"Sucre", cap:"Sincelejo", r:"caribe" },
  { dept:"Tolima", cap:"Ibagué", r:"andina" },
  { dept:"Valle del Cauca", cap:"Cali", r:"pacifica" },
  { dept:"Vaupés", cap:"Mitú", r:"amazonia" },
  { dept:"Vichada", cap:"Puerto Carreño", r:"orinoquia" },
];

const REGIONS = {
  caribe: { name:"Caribe", color:"#FF6B6B", emoji:"🏖️" },
  andina: { name:"Andina", color:"#667eea", emoji:"🏔️" },
  pacifica: { name:"Pacífica", color:"#4ECDC4", emoji:"🌊" },
  orinoquia: { name:"Orinoquía", color:"#F9A825", emoji:"🌾" },
  amazonia: { name:"Amazonía", color:"#66BB6A", emoji:"🌿" },
  insular: { name:"Insular", color:"#AB47BC", emoji:"🏝️" },
};

const QUESTION_TYPES = [
  {
    prompt: (item) => `¿Cuál es la capital de 🏔️ ${item.dept}?`,
    answer: (item) => item.cap,
  },
  {
    prompt: (item) => `¿A qué departamento pertenece 🏛️ ${item.cap}?`,
    answer: (item) => item.dept,
  },
];

/* =================== MAP COMPONENT =================== */
const MAP_W = 480;
const MAP_H = 560;

function useColombiaMap() {
  return useMemo(() => {
    const projection = geoMercator().fitSize([MAP_W, MAP_H], colombiaGeo);
    const pathGen = geoPath().projection(projection);
    const deptMap = new Map();
    DEPTS.forEach((d, i) => deptMap.set(d.dept, { ...d, idx: i }));

    const features = colombiaGeo.features.map(feat => {
      const name = feat.properties.name;
      const info = deptMap.get(name);
      const centroid = pathGen.centroid(feat);
      return { feat, name, path: pathGen(feat), centroid, info };
    }).filter(f => f.info);

    return { features };
  }, []);
}

function ColombiaMapSVG({ sel, found, hovered, setHovered, onClickDept, mode }) {
  const { features } = useColombiaMap();

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Mapa interactivo de Colombia con departamentos" style={{ width:"100%", height:"auto", maxHeight:"60vh" }}>
      <defs>
        <filter id="mapShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" /></filter>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {features.map(({ name, path, info }) => {
        if (!info || !path) return null;
        const rc = REGIONS[info.r];
        const isSel = sel === name;
        const isHov = hovered === name;
        const isFound = found.has(name);

        let fill = rc.color + "55", strokeW = 0.8, stroke = "#fff";
        if (isSel) { fill = rc.color; strokeW = 2; }
        else if (isHov) { fill = rc.color + "99"; strokeW = 1.5; }
        else if (isFound) { fill = rc.color + "88"; }

        if (mode === "findIt" && !isSel) {
          fill = isFound ? rc.color + "88" : "#e0e0e0";
          stroke = isFound ? "#fff" : "#ccc";
        }

        return (
          <path key={name} d={path} fill={fill} stroke={stroke} strokeWidth={strokeW} strokeLinejoin="round"
            role="button" aria-label={`Departamento de ${name}`} tabIndex={0}
            style={{ cursor:"pointer", transition:"fill 0.2s, stroke-width 0.2s" }}
            onClick={() => onClickDept(name)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClickDept(name); } }}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}

      {features.map(({ name, centroid, info }) => {
        if (!info || sel !== name) return null;
        const rc = REGIONS[info.r];
        const [cx, cy] = centroid;
        if (isNaN(cx) || isNaN(cy)) return null;
        const lW = 150, lH = 52;
        const lX = Math.max(5, Math.min(cx - lW / 2, MAP_W - lW - 5));
        const lY = Math.max(5, cy - lH - 12);
        return (
          <g key={`label-${name}`} style={{ pointerEvents:"none" }}>
            <rect x={lX} y={lY} width={lW} height={lH} rx="10" fill="white" stroke={rc.color} strokeWidth="2" filter="url(#mapShadow)" />
            <polygon points={`${cx-6},${lY+lH} ${cx+6},${lY+lH} ${cx},${lY+lH+8}`} fill="white" stroke={rc.color} strokeWidth="1.5" />
            <text x={lX+lW/2} y={lY+18} textAnchor="middle" fontSize="12" fontWeight="800" fill="#333">{info.dept}</text>
            <text x={lX+lW/2} y={lY+33} textAnchor="middle" fontSize="11" fill={rc.color} fontWeight="600">🏛️ {info.cap}</text>
            <text x={lX+lW/2} y={lY+46} textAnchor="middle" fontSize="9" fill="#999">{rc.emoji} Región {rc.name}</text>
          </g>
        );
      })}

      {hovered && hovered !== sel && features.map(({ name, centroid, info }) => {
        if (!info || name !== hovered) return null;
        const [cx, cy] = centroid;
        if (isNaN(cx) || isNaN(cy)) return null;
        return (
          <g key={`hover-${name}`} style={{ pointerEvents:"none" }}>
            <rect x={cx-50} y={cy-28} width="100" height="22" rx="6" fill="rgba(0,0,0,0.75)" />
            <text x={cx} y={cy-13} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{info.dept}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* =================== MAP MODE (game-specific) =================== */
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

  const deptByName = useMemo(() => {
    const m = new Map();
    DEPTS.forEach(d => m.set(d.dept, d));
    return m;
  }, []);

  const startFind = () => {
    const q = shuffle([...DEPTS]);
    setQueue(q); setTarget(q[0]); setMode("findIt");
    setFScore(0); setMsg(""); setSel(null); setFound(new Set());
  };

  const handleClick = (name) => {
    const d = deptByName.get(name);
    if (!d) return;

    if (mode === "explore") {
      setSel(sel === name ? null : name);
      setFound(s => { const n = new Set(s); n.add(name); return n; });
    } else if (mode === "findIt" && target) {
      if (d.dept === target.dept) {
        setFScore(s => s + 1); setMsg("✅ ¡Correcto!"); setConf(c => c + 1);
        setFound(s => { const n = new Set(s); n.add(name); return n; });
        setSel(name);
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
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:480, alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => { setMode("explore"); setSel(null); setMsg(""); }} style={pill(mode === "explore" ? "#667eea" : "#e0e0e0", mode === "explore" ? "#fff" : "#333")}>🔍 Explorar</button>
          <button onClick={startFind} style={pill(mode === "findIt" ? "#f12711" : "#e0e0e0", mode === "findIt" ? "#fff" : "#333")}>🎯 Encuéntralo</button>
        </div>
      </div>

      {mode === "explore" && (
        <div style={{ fontSize:13, color:"#888" }}>📍 Toca un departamento para ver info ({found.size}/32 explorados)</div>
      )}

      {mode === "findIt" && target && (
        <div style={{ background:"linear-gradient(135deg,#f5af19,#f12711)", borderRadius:16, padding:"12px 20px", color:"#fff", textAlign:"center", maxWidth:400, width:"100%" }}>
          <div style={{ fontSize:13, opacity:0.85 }}>¿Dónde queda...? (✅ {fScore})</div>
          <div style={{ fontSize:22, fontWeight:800 }}>🏔️ {target.dept}</div>
        </div>
      )}

      {msg && <div style={{ fontSize:16, fontWeight:700, textAlign:"center", padding:4 }}>{msg}</div>}

      <div style={{ width:"100%", maxWidth:480, position:"relative", background:"#f8fffe", borderRadius:16, padding:8, boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}>
        <ColombiaMapSVG sel={sel} found={found} hovered={hovered} setHovered={setHovered} onClickDept={handleClick} mode={mode} />
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", maxWidth:480 }}>
        {Object.entries(REGIONS).map(([k, v]) => (
          <div key={k} style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, fontWeight:600, background:"#fff", padding:"4px 10px", borderRadius:20, border:`2px solid ${v.color}`, color:v.color }}>
            <span>{v.emoji}</span>{v.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== WIRED MODES =================== */
function COLearnMode(props) {
  return (
    <LearnMode
      {...props}
      data={DEPTS}
      frontGradient="linear-gradient(135deg,#667eea,#764ba2)"
      backGradient="linear-gradient(135deg,#f093fb,#f5576c)"
      progressGradient="linear-gradient(90deg,#F9A825,#FF6B6B)"
      navColor="#4ECDC4"
      renderFront={(d) => {
        const rc = REGIONS[d.r];
        return (
          <>
            <div style={{ fontSize:14, opacity:0.8, marginBottom:4 }}>🏔️ Departamento</div>
            <div style={{ fontSize:28, fontWeight:800, textAlign:"center" }}>{d.dept}</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"4px 12px", borderRadius:20 }}>{rc.emoji} Región {rc.name}</div>
          </>
        );
      }}
      renderBack={(d) => {
        const rc = REGIONS[d.r];
        return (
          <>
            <div style={{ fontSize:14, opacity:0.8, marginBottom:4 }}>🏛️ Capital</div>
            <div style={{ fontSize:28, fontWeight:800, textAlign:"center" }}>{d.cap}</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"4px 12px", borderRadius:20 }}>{rc.emoji} Región {rc.name}</div>
          </>
        );
      }}
    />
  );
}

function COQuizMode(props) {
  return (
    <QuizMode
      {...props}
      data={DEPTS}
      questionTypes={QUESTION_TYPES}
      count={15}
      questionGradient="linear-gradient(135deg,#f5af19,#f12711)"
      progressGradient="linear-gradient(90deg,#F9A825,#FF6B6B)"
    />
  );
}

function COChallengeMode(props) {
  return (
    <ChallengeMode
      {...props}
      data={DEPTS}
      questionTypes={QUESTION_TYPES}
      questionGradient="linear-gradient(135deg,#667eea,#764ba2)"
    />
  );
}

/* =================== MAIN COMPONENT =================== */
export default function ExploraColombia() {
  const { saveQuiz, saveChallenge, saveLearned } = useGameProgress("explora-colombia");

  return (
    <GameShell
      config={{
        id: "explora-colombia",
        title: "Explora Colombia",
        icon: "🇨🇴",
        gradient: "linear-gradient(180deg,#fef9f0 0%,#fff5f5 50%,#f0f4ff 100%)",
        titleGradient: "linear-gradient(135deg,#F9A825,#f12711)",
        subtitle: "¡Aprende jugando los departamentos y capitales!",
        footer: "32 departamentos · 32 capitales · 6 regiones · ¡A jugar! 🎮",
        emojis: ["🎉","⭐","🌟","💫","🎊","🏆","👏","💪","🇨🇴","🦜","☕","🌺"],
        modes: [
          { key:"map", icon:"🗺️", title:"Mapa Interactivo", desc:"Explora Colombia tocando el mapa", gradient:"linear-gradient(135deg,#11998e,#38ef7d)", component: MapMode },
          { key:"learn", icon:"📚", title:"Aprende", desc:"Tarjetas con departamentos y capitales", gradient:"linear-gradient(135deg,#667eea,#764ba2)", component: COLearnMode },
          { key:"quiz", icon:"🧠", title:"Quiz", desc:"Pon a prueba tu conocimiento", gradient:"linear-gradient(135deg,#f093fb,#f5576c)", component: COQuizMode },
          { key:"challenge", icon:"⚡", title:"Desafío Relámpago", desc:"60 segundos. ¿Cuántas aciertas?", gradient:"linear-gradient(135deg,#f5af19,#f12711)", component: COChallengeMode },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}
