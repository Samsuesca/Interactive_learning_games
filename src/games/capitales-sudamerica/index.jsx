import { useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import useGameProgress from "../../hooks/useGameProgress";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { Confetti } from "../../components/game";
import { shuffle, pill } from "../../components/game/utils";
import southAmericaGeo from "./southamerica-geo.js";

/* =================== DATA =================== */
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

const QUESTION_TYPES = [
  {
    prompt: (item) => `¿Cuál es la capital de ${item.flag} ${item.name}?`,
    answer: (item) => item.cap,
  },
  {
    prompt: (item) => `¿De qué país es capital 🏛️ ${item.cap}?`,
    answer: (item) => item.name,
  },
];

/* =================== MAP COMPONENT =================== */
const MAP_W = 480;
const MAP_H = 580;

const COUNTRY_COLORS = {
  Argentina: "#74b9ff", Bolivia: "#fdcb6e", Brasil: "#55efc4", Chile: "#e17055",
  Colombia: "#ffeaa7", Ecuador: "#fab1a0", Guyana: "#81ecec", Paraguay: "#dfe6e9",
  Perú: "#fd79a8", Surinam: "#a29bfe", Uruguay: "#00cec9", Venezuela: "#6c5ce7",
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
            role="button" aria-label={`País: ${name}`} tabIndex={0}
            style={{ cursor:"pointer", transition:"fill 0.2s" }}
            onClick={() => onClickCountry(name)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClickCountry(name); } }}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}

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
        setFScore(s => s + 1); setMsg("✅ ¡Correcto!"); setConf(p => p + 1);
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

/* =================== WIRED LEARN MODE =================== */
function SALearnMode(props) {
  return (
    <LearnMode
      {...props}
      data={COUNTRIES}
      frontGradient="linear-gradient(135deg,#11998e,#38ef7d)"
      backGradient="linear-gradient(135deg,#6c5ce7,#a29bfe)"
      progressGradient="linear-gradient(90deg,#11998e,#38ef7d)"
      renderFront={(c) => (
        <>
          <div style={{ fontSize:48, marginBottom:4 }}>{c.flag}</div>
          <div style={{ fontSize:28, fontWeight:800, textAlign:"center" }}>{c.name}</div>
          <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"4px 14px", borderRadius:20 }}>🗣️ {c.lang} · 💰 {c.currency}</div>
        </>
      )}
      renderBack={(c) => (
        <>
          <div style={{ fontSize:14, opacity:0.8 }}>🏛️ Capital de {c.name}</div>
          <div style={{ fontSize:28, fontWeight:800, textAlign:"center", marginTop:4 }}>{c.cap}</div>
          <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"6px 14px", borderRadius:12, textAlign:"center", lineHeight:1.4 }}>💡 {c.fun}</div>
          <div style={{ fontSize:12, marginTop:8, opacity:0.7 }}>👥 Población: {c.pop}</div>
        </>
      )}
    />
  );
}

/* =================== WIRED QUIZ MODE =================== */
function SAQuizMode(props) {
  return (
    <QuizMode
      {...props}
      data={COUNTRIES}
      questionTypes={QUESTION_TYPES}
      count={12}
      questionGradient="linear-gradient(135deg,#6c5ce7,#a29bfe)"
      progressGradient="linear-gradient(90deg,#11998e,#38ef7d)"
    />
  );
}

/* =================== WIRED CHALLENGE MODE =================== */
function SAChallengeMode(props) {
  return (
    <ChallengeMode
      {...props}
      data={COUNTRIES}
      questionTypes={QUESTION_TYPES}
      questionGradient="linear-gradient(135deg,#6c5ce7,#a29bfe)"
    />
  );
}

/* =================== MAIN COMPONENT =================== */
export default function CapitalesSudamerica() {
  const { saveQuiz, saveChallenge, saveLearned } = useGameProgress("capitales-sudamerica");

  return (
    <GameShell
      config={{
        id: "capitales-sudamerica",
        title: "Capitales de Sudamérica",
        icon: "🌎",
        gradient: "linear-gradient(180deg,#f0fff4 0%,#f0f8ff 50%,#faf0ff 100%)",
        titleGradient: "linear-gradient(135deg,#11998e,#38ef7d)",
        subtitle: "¡Aprende las capitales de los 12 países!",
        footer: "12 países · 12 capitales · Datos curiosos · ¡A jugar! 🎮",
        emojis: ["🎉","⭐","🌟","💫","🌎","🏆","👏","💪","🦜","☕","🌺","🎊"],
        modes: [
          { key:"map", icon:"🗺️", title:"Mapa Interactivo", desc:"Explora Sudamérica tocando cada país", gradient:"linear-gradient(135deg,#11998e,#38ef7d)", component: MapMode },
          { key:"learn", icon:"📚", title:"Aprende", desc:"Tarjetas con países, capitales y datos curiosos", gradient:"linear-gradient(135deg,#6c5ce7,#a29bfe)", component: SALearnMode },
          { key:"quiz", icon:"🧠", title:"Quiz", desc:"¿Conoces todas las capitales?", gradient:"linear-gradient(135deg,#fd79a8,#e84393)", component: SAQuizMode },
          { key:"challenge", icon:"⚡", title:"Desafío Relámpago", desc:"60 segundos. ¿Cuántas aciertas?", gradient:"linear-gradient(135deg,#e17055,#d63031)", component: SAChallengeMode },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}
