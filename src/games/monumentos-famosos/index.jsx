import { useState, useEffect, useRef, useMemo } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import useGameProgress from "../../hooks/useGameProgress";
import worldGeo from "./world-geo.js";

// =================== MONUMENTS DATA ===================
const MONUMENTS = [
  { name:"Torre Eiffel", city:"París", country:"Francia", continent:"Europa", lat:48.8584, lng:2.2945, year:"1889", icon:"🗼", fun:"Fue construida como entrada temporal para la Exposición Universal de 1889" },
  { name:"Estatua de la Libertad", city:"Nueva York", country:"Estados Unidos", continent:"América", lat:40.6892, lng:-74.0445, year:"1886", icon:"🗽", fun:"Fue un regalo de Francia a Estados Unidos como símbolo de amistad" },
  { name:"Taj Mahal", city:"Agra", country:"India", continent:"Asia", lat:27.1751, lng:78.0421, year:"1653", icon:"🕌", fun:"Construido por el emperador Shah Jahan en memoria de su esposa Mumtaz" },
  { name:"Coliseo Romano", city:"Roma", country:"Italia", continent:"Europa", lat:41.8902, lng:12.4922, year:"80 d.C.", icon:"🏛️", fun:"Podía albergar hasta 80.000 espectadores en sus combates de gladiadores" },
  { name:"Gran Muralla China", city:"Beijing", country:"China", continent:"Asia", lat:40.4319, lng:116.5704, year:"siglo VII a.C.", icon:"🧱", fun:"Tiene más de 21.000 km de longitud total y es visible desde el espacio" },
  { name:"Machu Picchu", city:"Cusco", country:"Perú", continent:"América", lat:-13.1631, lng:-72.5450, year:"1450", icon:"🏔️", fun:"Ciudad inca a 2.430 metros sobre el nivel del mar, redescubierta en 1911" },
  { name:"Cristo Redentor", city:"Río de Janeiro", country:"Brasil", continent:"América", lat:-22.9519, lng:-43.2105, year:"1931", icon:"✝️", fun:"Pesa 635 toneladas y tiene los brazos abiertos de 28 metros de ancho" },
  { name:"Pirámides de Giza", city:"El Cairo", country:"Egipto", continent:"África", lat:29.9792, lng:31.1342, year:"2560 a.C.", icon:"🔺", fun:"La Gran Pirámide fue la estructura más alta del mundo durante 3.800 años" },
  { name:"Big Ben", city:"Londres", country:"Reino Unido", continent:"Europa", lat:51.5007, lng:-0.1246, year:"1859", icon:"🕰️", fun:"Big Ben es el nombre de la campana de 13 toneladas, no de la torre" },
  { name:"Ópera de Sídney", city:"Sídney", country:"Australia", continent:"Oceanía", lat:-33.8568, lng:151.2153, year:"1973", icon:"🎭", fun:"Su techo icónico está cubierto por más de un millón de azulejos blancos" },
  { name:"Petra", city:"Wadi Musa", country:"Jordania", continent:"Asia", lat:30.3285, lng:35.4444, year:"300 a.C.", icon:"🏜️", fun:"Ciudad tallada directamente en la roca de arenisca rosa del desierto" },
  { name:"Chichén Itzá", city:"Yucatán", country:"México", continent:"América", lat:20.6843, lng:-88.5678, year:"600 d.C.", icon:"🏯", fun:"Durante los equinoccios, la sombra forma una serpiente descendiendo" },
  { name:"Sagrada Familia", city:"Barcelona", country:"España", continent:"Europa", lat:41.4036, lng:2.1744, year:"1882", icon:"⛪", fun:"Lleva más de 140 años en construcción y Gaudí sabía que no la vería terminada" },
  { name:"Burj Khalifa", city:"Dubái", country:"Emiratos Árabes", continent:"Asia", lat:25.1972, lng:55.2744, year:"2010", icon:"🏗️", fun:"Es el edificio más alto del mundo con 828 metros y 163 pisos" },
  { name:"Moái", city:"Isla de Pascua", country:"Chile", continent:"América", lat:-27.1127, lng:-109.3497, year:"1250", icon:"🗿", fun:"Hay casi 900 estatuas de piedra volcánica repartidas por la isla" },
  { name:"Partenón", city:"Atenas", country:"Grecia", continent:"Europa", lat:37.9715, lng:23.7267, year:"432 a.C.", icon:"🏛️", fun:"Templo dedicado a la diosa Atenea, patrona de la ciudad de Atenas" },
  { name:"Angkor Wat", city:"Siem Riep", country:"Camboya", continent:"Asia", lat:13.4125, lng:103.8670, year:"1150", icon:"🛕", fun:"Es el monumento religioso más grande del mundo, patrimonio UNESCO" },
  { name:"Stonehenge", city:"Wiltshire", country:"Reino Unido", continent:"Europa", lat:51.1789, lng:-1.8262, year:"3000 a.C.", icon:"🪨", fun:"Nadie sabe con certeza cómo se transportaron piedras de 25 toneladas" },
  { name:"Torre de Pisa", city:"Pisa", country:"Italia", continent:"Europa", lat:43.7230, lng:10.3966, year:"1372", icon:"🗼", fun:"Se inclina 3.97 grados y tardó casi 200 años en construirse" },
  { name:"Monte Rushmore", city:"Dakota del Sur", country:"Estados Unidos", continent:"América", lat:43.8791, lng:-103.4591, year:"1941", icon:"⛰️", fun:"Tiene los rostros de 4 presidentes de EE.UU. tallados en granito" },
];

const EMOJIS = ["🏛️","⭐","🌟","💫","🌍","🏆","👏","💪","🗺️","📸","🎊","🔺"];

// =================== UTILITIES ===================
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

// Haversine distance in km
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distanceScore(km) {
  if (km <= 50) return 5000;
  if (km <= 150) return 4500;
  if (km <= 300) return 4000;
  if (km <= 500) return 3000;
  if (km <= 1000) return 2000;
  if (km <= 1500) return 1500;
  if (km <= 2500) return 1000;
  if (km <= 5000) return 500;
  return Math.max(0, Math.round(250 - (km - 5000) * 0.02));
}

function distanceLabel(km) {
  if (km < 1) return "< 1 km";
  if (km < 100) return `${Math.round(km)} km`;
  return `${(km / 1000).toFixed(1)}k km`;
}

function scoreEmoji(km) {
  if (km <= 150) return "🎯";
  if (km <= 500) return "✅";
  if (km <= 1500) return "👍";
  if (km <= 3000) return "🤔";
  return "😅";
}

// =================== SHARED UI COMPONENTS ===================
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
          borderRadius:"50%", background:v.c, animation:`mfCFall 1.5s ${v.dl}s ease-in forwards`
        }} />
      ))}
      <style>{`@keyframes mfCFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>
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
      <div style={{ width:`${mx > 0 ? (v/mx)*100 : 0}%`, height:"100%", background:"linear-gradient(90deg,#FF8F00,#F4511E)", borderRadius:5, transition:"width 0.5s" }} />
    </div>
  );
}

function makeQuestions(count) {
  return shuffle(MONUMENTS).slice(0, count).map(item => {
    const askType = Math.floor(Math.random() * 3);
    let question, correct, pool;

    if (askType === 0) {
      question = { text: `¿En qué país se encuentra...?`, subject: `${item.icon} ${item.name}` };
      correct = item.country;
      pool = MONUMENTS.filter(m => m.country !== item.country).map(m => m.country);
    } else if (askType === 1) {
      question = { text: `¿En qué ciudad está...?`, subject: `${item.icon} ${item.name}` };
      correct = item.city;
      pool = MONUMENTS.filter(m => m.city !== item.city).map(m => m.city);
    } else {
      question = { text: `¿Qué monumento famoso está en...?`, subject: `📍 ${item.city}, ${item.country}` };
      correct = item.name;
      pool = MONUMENTS.filter(m => m.name !== item.name).map(m => m.name);
    }

    let opts = [correct];
    const unique = [...new Set(pool)];
    while (opts.length < 4 && unique.length > 0) {
      const idx = Math.floor(Math.random() * unique.length);
      if (!opts.includes(unique[idx])) opts.push(unique[idx]);
      unique.splice(idx, 1);
    }

    return { item, question, correct, opts: shuffle(opts) };
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

/* =================== WORLD MAP =================== */
const MAP_W = 480;
const MAP_H = 300;

const CONTINENT_COLORS = {
  "América del Norte": "#81d4fa",
  "América Central": "#a5d6a7",
  "América del Sur": "#a5d6a7",
  "Europa": "#ce93d8",
  "Europa/Asia": "#f48fb1",
  "África": "#ffe082",
  "Asia": "#ffab91",
  "Oceanía": "#80cbc4",
};

function useWorldMap() {
  return useMemo(() => {
    const projection = geoNaturalEarth1().fitSize([MAP_W, MAP_H], worldGeo);
    const pathGen = geoPath().projection(projection);
    const graticuleGen = geoGraticule().step([30, 30]);

    const features = worldGeo.features.map(feat => ({
      name: feat.properties.name,
      continent: feat.properties.continent,
      path: pathGen(feat),
    }));

    const graticulePath = pathGen(graticuleGen());
    const outlinePath = pathGen({ type: "Sphere" });

    return { features, graticulePath, outlinePath, projection };
  }, []);
}

function WorldMapSVG({ onClickMap, guessPoint, actualPoint, showResult, highlightCountry }) {
  const { features, graticulePath, outlinePath, projection } = useWorldMap();

  const handleClick = (e) => {
    if (!onClickMap) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = MAP_W / rect.width;
    const scaleY = MAP_H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const coords = projection.invert([x, y]);
    if (coords) onClickMap(coords);
  };

  const guessPixel = guessPoint ? projection([guessPoint[0], guessPoint[1]]) : null;
  const actualPixel = actualPoint ? projection([actualPoint[0], actualPoint[1]]) : null;

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{ width:"100%", height:"auto", cursor: onClickMap ? "crosshair" : "default", borderRadius:12 }} onClick={handleClick}>
      <defs>
        <filter id="mfShadow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.12" /></filter>
        <radialGradient id="mfOcean" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#e3f2fd" />
          <stop offset="100%" stopColor="#bbdefb" />
        </radialGradient>
      </defs>

      {/* Ocean */}
      <path d={outlinePath} fill="url(#mfOcean)" stroke="#90caf9" strokeWidth="0.5" />

      {/* Graticule */}
      <path d={graticulePath} fill="none" stroke="#e0e0e0" strokeWidth="0.3" strokeDasharray="2,2" />

      {/* Countries */}
      {features.map(({ name, continent, path }) => {
        const baseColor = CONTINENT_COLORS[continent] || "#e0e0e0";
        const isHighlight = highlightCountry === name;
        return (
          <path key={name} d={path}
            fill={isHighlight ? "#fff176" : baseColor}
            stroke="#fff" strokeWidth={isHighlight ? 1.5 : 0.5} strokeLinejoin="round"
            opacity={isHighlight ? 1 : 0.75}
            style={{ transition:"fill 0.3s, opacity 0.3s" }}
          />
        );
      })}

      {/* Line between guess and actual */}
      {showResult && guessPixel && actualPixel && (
        <line x1={guessPixel[0]} y1={guessPixel[1]} x2={actualPixel[0]} y2={actualPixel[1]}
          stroke="#ef5350" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.8" />
      )}

      {/* Actual location pin */}
      {showResult && actualPixel && (
        <g>
          <circle cx={actualPixel[0]} cy={actualPixel[1]} r="8" fill="#66BB6A" opacity="0.3" />
          <circle cx={actualPixel[0]} cy={actualPixel[1]} r="4" fill="#2e7d32" stroke="#fff" strokeWidth="1.5" />
          <text x={actualPixel[0]} y={actualPixel[1] - 10} textAnchor="middle" fontSize="8" fontWeight="700" fill="#2e7d32">✓</text>
        </g>
      )}

      {/* Guess pin */}
      {guessPixel && (
        <g>
          <circle cx={guessPixel[0]} cy={guessPixel[1]} r={showResult ? 4 : 6} fill={showResult ? "#ef5350" : "#FF8F00"} stroke="#fff" strokeWidth="1.5" />
          {!showResult && <circle cx={guessPixel[0]} cy={guessPixel[1]} r="10" fill="none" stroke="#FF8F00" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" from="6" to="16" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite" />
          </circle>}
        </g>
      )}
    </svg>
  );
}

/* =================== MONUMENT CARD =================== */
function MonumentCard({ monument, showDetails, compact }) {
  if (!monument) return null;

  if (compact) {
    return (
      <div style={{ background:"linear-gradient(135deg,#5D4037,#795548)", borderRadius:16, padding:"12px 18px", color:"#fff", textAlign:"center", width:"100%" }}>
        <div style={{ fontSize:32 }}>{monument.icon}</div>
        <div style={{ fontSize:18, fontWeight:800, marginTop:4 }}>{monument.name}</div>
        {showDetails && <div style={{ fontSize:12, opacity:0.85, marginTop:4 }}>📍 {monument.city}, {monument.country}</div>}
      </div>
    );
  }

  return (
    <div style={{ background:"linear-gradient(135deg,#5D4037,#795548)", borderRadius:20, padding:"18px 22px", color:"#fff", textAlign:"center", width:"100%", maxWidth:400, boxShadow:"0 8px 30px rgba(93,64,55,0.4)" }}>
      <div style={{ fontSize:48, marginBottom:4 }}>{monument.icon}</div>
      <div style={{ fontSize:22, fontWeight:800 }}>{monument.name}</div>
      <div style={{ fontSize:14, opacity:0.9, marginTop:6 }}>📍 {monument.city}, {monument.country}</div>
      {showDetails && (
        <>
          <div style={{ fontSize:12, opacity:0.8, marginTop:4 }}>🌍 {monument.continent} · 📅 {monument.year}</div>
          <div style={{ fontSize:12, marginTop:8, background:"rgba(255,255,255,0.15)", padding:"6px 14px", borderRadius:12, lineHeight:1.4 }}>💡 {monument.fun}</div>
        </>
      )}
    </div>
  );
}

/* =================== LOCATE MODE =================== */
function LocateMode({ onBack }) {
  const [monuments] = useState(() => shuffle(MONUMENTS).slice(0, 10));
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [scores, setScores] = useState([]);
  const [conf, setConf] = useState(0);
  const [done, setDone] = useState(false);

  const current = monuments[idx];
  const totalScore = scores.reduce((a, b) => a + b, 0);

  const handleMapClick = (coords) => {
    if (confirmed) return;
    setGuess(coords);
  };

  const handleConfirm = () => {
    if (!guess || confirmed) return;
    setConfirmed(true);
    const km = haversine(current.lat, current.lng, guess[1], guess[0]);
    const pts = distanceScore(km);
    setScores(s => [...s, pts]);
    if (pts >= 3000) setConf(c => c + 1);
  };

  const handleNext = () => {
    if (idx + 1 >= monuments.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setGuess(null);
      setConfirmed(false);
    }
  };

  const km = confirmed ? haversine(current.lat, current.lng, guess[1], guess[0]) : null;
  const pts = confirmed ? scores[scores.length - 1] : null;

  if (done) {
    const maxScore = monuments.length * 5000;
    const pct = totalScore / maxScore;
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize:48 }}>🏆</div>
        <h2 style={{ fontSize:24, fontWeight:800, color:"#333" }}>¡Ronda completada!</h2>
        <Stars s={pct >= 0.8 ? 3 : pct >= 0.5 ? 2 : 1} t={3} />
        <div style={{ background:"linear-gradient(135deg,#FF8F00,#F4511E)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:42, fontWeight:800 }}>{totalScore.toLocaleString()}</div>
          <div style={{ fontSize:15, opacity:0.9, marginTop:4 }}>de {maxScore.toLocaleString()} puntos</div>
          <div style={{ fontSize:14, opacity:0.8, marginTop:4 }}>📊 Promedio: {Math.round(totalScore / monuments.length).toLocaleString()} pts</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>
          {pct >= 0.8 ? "🌍 ¡Experto en monumentos!" : pct >= 0.5 ? "💪 ¡Buen conocimiento geográfico!" : "📚 ¡Sigue explorando el mundo!"}
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => { setIdx(0); setGuess(null); setConfirmed(false); setScores([]); setDone(false); }} style={pill("#FF8F00","#fff")}>🔄 Jugar de nuevo</button>
          <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, padding:"0 8px" }}>
      <Confetti active={conf} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:480, alignItems:"center" }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <div style={{ display:"flex", gap:12, fontSize:14, fontWeight:600 }}>
          <span>📍 {idx + 1}/{monuments.length}</span>
          <span>🏆 {totalScore.toLocaleString()}</span>
        </div>
      </div>

      <PBar v={idx + 1} mx={monuments.length} />

      {/* Monument card */}
      <MonumentCard monument={current} showDetails={false} compact />

      <div style={{ fontSize:12, color:"#888", textAlign:"center" }}>
        {!guess ? "👆 Haz clic en el mapa donde crees que está" : !confirmed ? "¿Seguro? Haz clic en Confirmar o mueve tu pin" : ""}
      </div>

      {/* World Map */}
      <div style={{ width:"100%", maxWidth:480, background:"#e3f2fd", borderRadius:12, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.1)" }}>
        <WorldMapSVG
          onClickMap={confirmed ? null : handleMapClick}
          guessPoint={guess}
          actualPoint={confirmed ? [current.lng, current.lat] : null}
          showResult={confirmed}
          highlightCountry={null}
        />
      </div>

      {/* Result */}
      {confirmed && km !== null && (
        <div style={{ background:pts >= 3000 ? "linear-gradient(135deg,#66BB6A,#43A047)" : pts >= 1000 ? "linear-gradient(135deg,#FFA726,#F57C00)" : "linear-gradient(135deg,#ef5350,#d32f2f)", borderRadius:16, padding:"12px 18px", color:"#fff", textAlign:"center", width:"100%", maxWidth:400 }}>
          <div style={{ fontSize:14 }}>{scoreEmoji(km)} Distancia: {distanceLabel(km)}</div>
          <div style={{ fontSize:28, fontWeight:800 }}>+{pts.toLocaleString()} pts</div>
          <div style={{ fontSize:12, opacity:0.85, marginTop:2 }}>📍 {current.city}, {current.country}</div>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display:"flex", gap:12 }}>
        {!confirmed && guess && (
          <button onClick={handleConfirm} style={{ ...pill("#FF8F00","#fff"), animation:"mfPulse 1.5s infinite" }}>✓ Confirmar</button>
        )}
        {confirmed && (
          <button onClick={handleNext} style={pill("#FF8F00","#fff")}>
            {idx + 1 >= monuments.length ? "🏆 Ver resultado" : "▶ Siguiente"}
          </button>
        )}
      </div>

      <style>{`@keyframes mfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
    </div>
  );
}

/* =================== LEARN MODE =================== */
function LearnMode({ onBack, saveLearned }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(new Set());
  useEffect(() => { if (learned.size > 0) saveLearned?.(learned.size); }, [learned.size]);
  const m = MONUMENTS[idx];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"0 8px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", maxWidth:420 }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <span style={{ fontSize:14, fontWeight:600, color:"#666" }}>📚 {learned.size}/{MONUMENTS.length}</span>
      </div>
      <PBar v={learned.size} mx={MONUMENTS.length} />

      {/* Flashcard */}
      <div onClick={() => setFlipped(!flipped)} style={{ width:"100%", maxWidth:380, minHeight:280, perspective:800, cursor:"pointer" }}>
        <div style={{ width:"100%", minHeight:280, position:"relative", transformStyle:"preserve-3d", transition:"transform 0.5s", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
          {/* Front - Monument */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#FF8F00,#F4511E)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, color:"white", boxShadow:"0 10px 40px rgba(255,143,0,0.4)" }}>
            <div style={{ fontSize:56, marginBottom:4 }}>{m.icon}</div>
            <div style={{ fontSize:26, fontWeight:800, textAlign:"center" }}>{m.name}</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"4px 14px", borderRadius:20 }}>📅 {m.year} · 🌍 {m.continent}</div>
            <div style={{ fontSize:13, opacity:0.7, marginTop:16 }}>👆 Toca para ver detalles</div>
          </div>
          {/* Back - Details */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#5D4037,#795548)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, color:"white", transform:"rotateY(180deg)", boxShadow:"0 10px 40px rgba(93,64,55,0.4)" }}>
            <div style={{ fontSize:14, opacity:0.8 }}>📍 Ubicación</div>
            <div style={{ fontSize:24, fontWeight:800, textAlign:"center", marginTop:4 }}>{m.city}, {m.country}</div>
            <div style={{ fontSize:12, marginTop:10, opacity:0.85 }}>🌐 {m.lat.toFixed(2)}°, {m.lng.toFixed(2)}°</div>
            <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.15)", padding:"8px 14px", borderRadius:12, textAlign:"center", lineHeight:1.5 }}>💡 {m.fun}</div>
            <div style={{ fontSize:13, opacity:0.7, marginTop:12 }}>👆 Toca para voltear</div>
          </div>
        </div>
      </div>

      {/* Mini map */}
      <div style={{ width:"100%", maxWidth:380, borderRadius:12, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.08)" }}>
        <WorldMapSVG
          onClickMap={null}
          guessPoint={null}
          actualPoint={[m.lng, m.lat]}
          showResult={true}
          highlightCountry={null}
        />
      </div>

      {/* Navigation */}
      <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"center" }}>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIdx(i => (i - 1 + MONUMENTS.length) % MONUMENTS.length), 150); }} style={circ("#5D4037")}>◀</button>
        <button onClick={() => setLearned(s => { const n = new Set(s); n.has(idx) ? n.delete(idx) : n.add(idx); return n; })} style={{ ...pill(learned.has(idx) ? "#66BB6A" : "#e0e0e0", learned.has(idx) ? "#fff" : "#333"), minWidth:140 }}>
          {learned.has(idx) ? "✅ Aprendido" : "Marcar aprendido"}
        </button>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIdx(i => (i + 1) % MONUMENTS.length), 150); }} style={circ("#5D4037")}>▶</button>
      </div>
      <div style={{ fontSize:14, color:"#999" }}>Tarjeta {idx + 1} de {MONUMENTS.length}</div>
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
  const T = 15;
  useEffect(() => { if (done) saveQuiz?.(sc, T, bStr); }, [done]);

  useEffect(() => { gen(); }, []);

  const gen = () => {
    setQs(makeQuestions(T));
    setQi(0); setSel(null); setSc(0); setStr(0); setBStr(0); setDone(false);
  };

  const pick = (o) => {
    if (sel !== null) return;
    setSel(o);
    const ok = o === qs[qi].correct;
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
        <div style={{ background:"linear-gradient(135deg,#FF8F00,#F4511E)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:42, fontWeight:800 }}>{sc}/{T}</div>
          <div style={{ fontSize:15, opacity:0.9, marginTop:8 }}>Correctas</div>
          <div style={{ fontSize:14, opacity:0.8, marginTop:4 }}>🔥 Mejor racha: {bStr}</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>{sc >= 13 ? "🏆 ¡Experto en monumentos!" : sc >= 9 ? "💪 ¡Muy bien!" : "📚 ¡Sigue practicando!"}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={gen} style={pill("#FF8F00","#fff")}>🔄 Jugar de nuevo</button>
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
      <div style={{ background:"linear-gradient(135deg,#5D4037,#795548)", borderRadius:20, padding:24, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:14, opacity:0.85, marginBottom:6 }}>{q.question.text}</div>
        <div style={{ fontSize:22, fontWeight:800 }}>{q.question.subject}</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, width:"100%", maxWidth:400 }}>
        {q.opts.map((o, i) => (
          <OptionButton key={i} text={o} sel={sel} cor={q.correct} onClick={() => pick(o)} />
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
    if (o === qs[qi].correct) { setSc(s => s + 1); setStr(s => s + 1); setConf(c => c + 1); }
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
        <div style={{ background:"linear-gradient(135deg,#F4511E,#BF360C)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:350, width:"100%" }}>
          <p style={{ fontSize:16, margin:0, lineHeight:1.6 }}>¡Tienes <strong>60 segundos</strong> para responder sobre los monumentos más famosos del mundo! 🏛️</p>
        </div>
        <button onClick={start} style={{ ...pill("#FF8F00","#fff"), fontSize:20, padding:"14px 40px", animation:"mfPulse 1.5s infinite" }}>🚀 ¡Empezar!</button>
        <style>{`@keyframes mfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
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
        <div style={{ background:"linear-gradient(135deg,#FF8F00,#F4511E)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:48, fontWeight:800 }}>{sc}</div>
          <div style={{ fontSize:16 }}>correctas en 60s</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>{sc >= 15 ? "🏆 ¡Increíble!" : sc >= 10 ? "🔥 ¡Muy rápido!" : sc >= 5 ? "💪 ¡Bien!" : "📚 ¡Practica más!"}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={start} style={pill("#FF8F00","#fff")}>⚡ Otra vez</button>
          <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        </div>
      </div>
    );
  }

  if (!qs.length || qi >= qs.length) return null;
  const q = qs[qi];
  const tc = tm <= 10 ? "#ef5350" : tm <= 30 ? "#FFA726" : "#66BB6A";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:420, alignItems:"center" }}>
        <div style={{ fontSize:28, fontWeight:800, color:tc, animation: tm <= 10 ? "mfPulse 0.5s infinite" : "none" }}>⏱ {tm}s</div>
        <div style={{ display:"flex", gap:12, fontSize:15, fontWeight:700 }}><span>✅ {sc}</span><span>🔥 {str}</span></div>
      </div>
      <div style={{ width:"100%", maxWidth:420, height:8, background:"#e0e0e0", borderRadius:4, overflow:"hidden" }}>
        <div style={{ width:`${(tm/60)*100}%`, height:"100%", background:tc, transition:"width 1s linear", borderRadius:4 }} />
      </div>
      <div style={{ background:`linear-gradient(135deg,${tm <= 10 ? "#ff5252,#f44336" : "#5D4037,#795548"})`, borderRadius:18, padding:20, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:13, opacity:0.85 }}>{q.question.text}</div>
        <div style={{ fontSize:20, fontWeight:800, marginTop:4 }}>{q.question.subject}</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, width:"100%", maxWidth:400 }}>
        {q.opts.map((o, i) => (
          <OptionButton key={i} text={o} sel={sel} cor={q.correct} onClick={() => pick(o)} />
        ))}
      </div>
      <style>{`@keyframes mfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
    </div>
  );
}

/* =================== MAIN GAME COMPONENT =================== */
export default function MonumentosFamosos() {
  const [screen, setScreen] = useState("menu");
  const [floats, setFloats] = useState([]);
  const { saveQuiz, saveChallenge, saveLearned } = useGameProgress("monumentos-famosos");

  useEffect(() => {
    if (screen !== "menu") return;
    const iv = setInterval(() => {
      setFloats(f => [...f, { id: Date.now(), emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], x: Math.random() * 90 + 5 }].slice(-8));
    }, 1800);
    return () => clearInterval(iv);
  }, [screen]);

  const screens = { locate: LocateMode, learn: LearnMode, quiz: QuizMode, challenge: ChallengeMode };
  const Screen = screens[screen];

  if (Screen) {
    return (
      <div style={gameCtn}>
        <Screen onBack={() => setScreen("menu")} saveQuiz={saveQuiz} saveChallenge={saveChallenge} saveLearned={saveLearned} />
      </div>
    );
  }

  const modes = [
    { key:"locate", icon:"🗺️", title:"Ubica el Monumento", desc:"¿Sabes dónde están? Haz clic en el mapa mundial", gradient:"linear-gradient(135deg,#FF8F00,#F4511E)" },
    { key:"learn", icon:"📚", title:"Aprende", desc:"Tarjetas con monumentos, ubicaciones y datos curiosos", gradient:"linear-gradient(135deg,#5D4037,#795548)" },
    { key:"quiz", icon:"🧠", title:"Quiz", desc:"¿Conoces los monumentos más famosos del mundo?", gradient:"linear-gradient(135deg,#6D4C41,#4E342E)" },
    { key:"challenge", icon:"⚡", title:"Desafío Relámpago", desc:"60 segundos. ¿Cuántos monumentos conoces?", gradient:"linear-gradient(135deg,#F4511E,#BF360C)" },
  ];

  return (
    <div style={gameCtn}>
      <div style={{ position:"relative", overflow:"hidden", minHeight:"100%" }}>
        {floats.map(f => (
          <div key={f.id} style={{ position:"absolute", left:`${f.x}%`, top:-30, fontSize:24, animation:"mfFloat 4s ease-in forwards", pointerEvents:"none", zIndex:0 }}>{f.emoji}</div>
        ))}
        <style>{`@keyframes mfFloat{0%{transform:translateY(0);opacity:1}100%{transform:translateY(600px);opacity:0}}`}</style>
        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"0 8px" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:4 }}>🏛️</div>
            <h1 style={{ fontSize:26, fontWeight:900, margin:0, background:"linear-gradient(135deg,#FF8F00,#F4511E)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Monumentos Famosos
            </h1>
            <p style={{ fontSize:15, color:"#777", margin:"4px 0 0" }}>¡Ubica los monumentos más icónicos del mundo!</p>
          </div>

          {/* Mini world map preview */}
          <div style={{ width:"100%", maxWidth:380, borderRadius:12, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}>
            <WorldMapSVG onClickMap={null} guessPoint={null} actualPoint={null} showResult={false} highlightCountry={null} />
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
          <div style={{ fontSize:12, color:"#bbb", textAlign:"center", marginTop:8 }}>20 monumentos · 6 continentes · Mapa mundial · ¡A jugar! 🎮</div>
        </div>
      </div>
    </div>
  );
}

const gameCtn = {
  fontFamily:"'Segoe UI',system-ui,-apple-system,sans-serif",
  maxWidth:480, margin:"0 auto", padding:"24px 12px", minHeight:"100vh",
  background:"linear-gradient(180deg,#fff8e1 0%,#ffe0b2 50%,#ffccbc 100%)"
};
