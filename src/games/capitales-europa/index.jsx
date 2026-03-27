import { useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import useGameRewards from "../../hooks/useGameRewards";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { Confetti } from "../../components/game";
import { shuffle, pill } from "../../components/game/utils";
import europeGeo from "./europe-geo.js";

/* =================== DATA =================== */
const COUNTRIES = [
  { name: "España", nameGeo: "Spain", flag: "🇪🇸", cap: "Madrid", pop: "48M", lang: "Español", currency: "Euro (€)", fun: "Tiene el segundo mayor número de Patrimonios de la Humanidad UNESCO" },
  { name: "Francia", nameGeo: "France", flag: "🇫🇷", cap: "París", pop: "68M", lang: "Francés", currency: "Euro (€)", fun: "La Torre Eiffel fue construida como estructura temporal en 1889" },
  { name: "Alemania", nameGeo: "Germany", flag: "🇩🇪", cap: "Berlín", pop: "84M", lang: "Alemán", currency: "Euro (€)", fun: "Tiene más de 1.500 tipos de cerveza y 1.300 cervecerías" },
  { name: "Italia", nameGeo: "Italy", flag: "🇮🇹", cap: "Roma", pop: "59M", lang: "Italiano", currency: "Euro (€)", fun: "Roma tiene más de 2.000 fuentes y 900 iglesias" },
  { name: "Reino Unido", nameGeo: "United Kingdom", flag: "🇬🇧", cap: "Londres", pop: "67M", lang: "Inglés", currency: "Libra esterlina (£)", fun: "El Big Ben es en realidad el nombre de la campana, no de la torre" },
  { name: "Portugal", nameGeo: "Portugal", flag: "🇵🇹", cap: "Lisboa", pop: "10M", lang: "Portugués", currency: "Euro (€)", fun: "Es el país más antiguo de Europa con sus fronteras casi iguales desde 1249" },
  { name: "Países Bajos", nameGeo: "Netherlands", flag: "🇳🇱", cap: "Ámsterdam", pop: "18M", lang: "Neerlandés", currency: "Euro (€)", fun: "Cerca del 26% del país está bajo el nivel del mar" },
  { name: "Bélgica", nameGeo: "Belgium", flag: "🇧🇪", cap: "Bruselas", pop: "12M", lang: "Francés / Neerlandés / Alemán", currency: "Euro (€)", fun: "Produce más de 220.000 toneladas de chocolate al año" },
  { name: "Suiza", nameGeo: "Switzerland", flag: "🇨🇭", cap: "Berna", pop: "9M", lang: "Alemán / Francés / Italiano / Romanche", currency: "Franco suizo (CHF)", fun: "Tiene 4 idiomas oficiales y no pertenece a la Unión Europea" },
  { name: "Austria", nameGeo: "Austria", flag: "🇦🇹", cap: "Viena", pop: "9M", lang: "Alemán", currency: "Euro (€)", fun: "Viena ha sido votada como la ciudad con mejor calidad de vida del mundo" },
  { name: "Polonia", nameGeo: "Poland", flag: "🇵🇱", cap: "Varsovia", pop: "38M", lang: "Polaco", currency: "Złoty (PLN)", fun: "Marie Curie, doble premio Nobel, nació en Varsovia" },
  { name: "República Checa", nameGeo: "Czech Republic", flag: "🇨🇿", cap: "Praga", pop: "11M", lang: "Checo", currency: "Corona checa (CZK)", fun: "Praga tiene el castillo antiguo más grande del mundo" },
  { name: "Suecia", nameGeo: "Sweden", flag: "🇸🇪", cap: "Estocolmo", pop: "10M", lang: "Sueco", currency: "Corona sueca (SEK)", fun: "Tiene más de 200.000 islas y es el tercer país más grande de la UE" },
  { name: "Noruega", nameGeo: "Norway", flag: "🇳🇴", cap: "Oslo", pop: "5M", lang: "Noruego", currency: "Corona noruega (NOK)", fun: "Inventó el queso en rebanadas y el clip para papeles" },
  { name: "Dinamarca", nameGeo: "Denmark", flag: "🇩🇰", cap: "Copenhague", pop: "6M", lang: "Danés", currency: "Corona danesa (DKK)", fun: "LEGO fue inventado aquí; su nombre viene de 'leg godt' (juega bien)" },
  { name: "Finlandia", nameGeo: "Finland", flag: "🇫🇮", cap: "Helsinki", pop: "6M", lang: "Finés / Sueco", currency: "Euro (€)", fun: "Tiene más de 3 millones de saunas para 5.5 millones de habitantes" },
  { name: "Irlanda", nameGeo: "Ireland", flag: "🇮🇪", cap: "Dublín", pop: "5M", lang: "Inglés / Irlandés", currency: "Euro (€)", fun: "El arpa es el símbolo nacional, no el trébol" },
  { name: "Grecia", nameGeo: "Greece", flag: "🇬🇷", cap: "Atenas", pop: "10M", lang: "Griego", currency: "Euro (€)", fun: "Es la cuna de la democracia y los Juegos Olímpicos" },
  { name: "Rumanía", nameGeo: "Romania", flag: "🇷🇴", cap: "Bucarest", pop: "19M", lang: "Rumano", currency: "Leu rumano (RON)", fun: "El Palacio del Parlamento es el segundo edificio administrativo más grande del mundo" },
  { name: "Hungría", nameGeo: "Hungary", flag: "🇭🇺", cap: "Budapest", pop: "10M", lang: "Húngaro", currency: "Forinto (HUF)", fun: "Budapest tiene el sistema de metro más antiguo de Europa continental" },
  { name: "Bulgaria", nameGeo: "Bulgaria", flag: "🇧🇬", cap: "Sofía", pop: "7M", lang: "Búlgaro", currency: "Lev búlgaro (BGN)", fun: "Es el país más antiguo de Europa que no ha cambiado su nombre desde el 681 d.C." },
  { name: "Croacia", nameGeo: "Croatia", flag: "🇭🇷", cap: "Zagreb", pop: "4M", lang: "Croata", currency: "Euro (€)", fun: "La corbata fue inventada en Croacia en el siglo XVII" },
  { name: "Serbia", nameGeo: "Serbia", flag: "🇷🇸", cap: "Belgrado", pop: "7M", lang: "Serbio", currency: "Dinar serbio (RSD)", fun: "Belgrado es una de las ciudades más antiguas de Europa, con más de 7.000 años" },
  { name: "Ucrania", nameGeo: "Ukraine", flag: "🇺🇦", cap: "Kiev", pop: "44M", lang: "Ucraniano", currency: "Grivna (UAH)", fun: "Es el país más grande de Europa por superficie (sin contar Rusia)" },
  { name: "Turquía", nameGeo: "Turkey", flag: "🇹🇷", cap: "Ankara", pop: "85M", lang: "Turco", currency: "Lira turca (TRY)", fun: "Estambul es la única ciudad del mundo que se extiende por dos continentes" },
  { name: "Islandia", nameGeo: "Iceland", flag: "🇮🇸", cap: "Reikiavik", pop: "0.4M", lang: "Islandés", currency: "Corona islandesa (ISK)", fun: "Tiene más de 130 volcanes y genera casi toda su energía de fuentes renovables" },
  { name: "Luxemburgo", nameGeo: "Luxembourg", flag: "🇱🇺", cap: "Luxemburgo", pop: "0.7M", lang: "Francés / Alemán / Luxemburgués", currency: "Euro (€)", fun: "Es uno de los países más ricos del mundo por PIB per cápita" },
  { name: "Estonia", nameGeo: "Estonia", flag: "🇪🇪", cap: "Tallin", pop: "1.3M", lang: "Estonio", currency: "Euro (€)", fun: "Fue el primer país del mundo en implementar voto electrónico en 2005" },
  { name: "Letonia", nameGeo: "Latvia", flag: "🇱🇻", cap: "Riga", pop: "1.8M", lang: "Letón", currency: "Euro (€)", fun: "Riga tiene la mayor colección de edificios Art Nouveau del mundo" },
  { name: "Lituania", nameGeo: "Lithuania", flag: "🇱🇹", cap: "Vilna", pop: "2.8M", lang: "Lituano", currency: "Euro (€)", fun: "El lituano es una de las lenguas vivas más antiguas de Europa" },
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
  {
    prompt: (item) => `¿A qué país pertenece esta bandera? ${item.flag}`,
    answer: (item) => item.name,
  },
];

/* =================== REGION COLORS =================== */
const REGION_COLORS = {
  // Nordic - cool blues
  Sweden: "#74b9ff", Norway: "#0984e3", Denmark: "#6c5ce7", Finland: "#a29bfe", Iceland: "#81ecec",
  // Western - greens
  France: "#55efc4", Belgium: "#00b894", Netherlands: "#00cec9", Luxembourg: "#00b894", Switzerland: "#2ed573", Ireland: "#26de81",
  // Central - warm yellows/oranges
  Germany: "#ffeaa7", Austria: "#fdcb6e", "Czech Republic": "#fab1a0", Poland: "#f9ca24", Hungary: "#f0932b",
  // Southern - reds/pinks
  Spain: "#e17055", Portugal: "#fd79a8", Italy: "#ff7675", Greece: "#d63031", Croatia: "#e84393", Turkey: "#eb4d4b",
  // Eastern - ambers/teals
  Romania: "#f39c12", Bulgaria: "#e67e22", Serbia: "#d35400", Ukraine: "#1abc9c",
  // Baltic - purples
  Estonia: "#9b59b6", Latvia: "#8e44ad", Lithuania: "#6c5ce7",
  // UK
  "United Kingdom": "#636e72",
};

/* =================== MAP COMPONENT =================== */
const MAP_W = 520;
const MAP_H = 580;

function useEuropeMap() {
  return useMemo(() => {
    const projection = geoMercator()
      .center([15, 55])
      .scale(550)
      .translate([MAP_W / 2, MAP_H / 2]);
    const pathGen = geoPath().projection(projection);
    const countryMap = new Map();
    COUNTRIES.forEach((c) => countryMap.set(c.nameGeo, c));

    const features = europeGeo.features
      .map((feat) => {
        const nameGeo = feat.properties.name;
        const info = countryMap.get(nameGeo);
        const path = pathGen(feat);
        const centroid = pathGen.centroid(feat);
        return { feat, nameGeo, path, centroid, info };
      })
      .filter((f) => f.info);

    return { features };
  }, []);
}

function EuropeMapSVG({ sel, found, hovered, setHovered, onClickCountry, mode }) {
  const { features } = useEuropeMap();

  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="img"
      aria-label="Mapa interactivo de Europa con países"
      style={{ width: "100%", height: "auto", maxHeight: "62vh" }}
    >
      <defs>
        <filter id="euShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>

      {features.map(({ nameGeo, path, info }) => {
        if (!info || !path) return null;
        const baseColor = REGION_COLORS[nameGeo] || "#bbb";
        const isSel = sel === nameGeo;
        const isHov = hovered === nameGeo;
        const isFound = found.has(nameGeo);

        let fill = baseColor + "88";
        let strokeW = 0.8;
        let stroke = "#fff";

        if (isSel) {
          fill = baseColor;
          strokeW = 2.5;
          stroke = "#333";
        } else if (isHov) {
          fill = baseColor + "cc";
          strokeW = 1.5;
        } else if (isFound) {
          fill = baseColor + "bb";
        }

        if (mode === "findIt" && !isSel) {
          fill = isFound ? baseColor + "bb" : "#e0e0e0";
          stroke = isFound ? "#fff" : "#ccc";
        }

        return (
          <path
            key={nameGeo}
            d={path}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeW}
            strokeLinejoin="round"
            role="button"
            aria-label={`País: ${info.name}`}
            tabIndex={0}
            style={{ cursor: "pointer", transition: "fill 0.2s" }}
            onClick={() => onClickCountry(nameGeo)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClickCountry(nameGeo);
              }
            }}
            onMouseEnter={() => setHovered(nameGeo)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}

      {/* Selected country label */}
      {features.map(({ nameGeo, centroid, info }) => {
        if (!info || sel !== nameGeo) return null;
        const [cx, cy] = centroid;
        if (isNaN(cx) || isNaN(cy)) return null;
        const lW = 170;
        const lH = 58;
        const lX = Math.max(5, Math.min(cx - lW / 2, MAP_W - lW - 5));
        const lY = Math.max(5, cy - lH - 14);
        const baseColor = REGION_COLORS[nameGeo] || "#999";
        return (
          <g key={`label-${nameGeo}`} style={{ pointerEvents: "none" }}>
            <rect x={lX} y={lY} width={lW} height={lH} rx="10" fill="white" stroke={baseColor} strokeWidth="2" filter="url(#euShadow)" />
            <polygon points={`${cx - 6},${lY + lH} ${cx + 6},${lY + lH} ${cx},${lY + lH + 8}`} fill="white" stroke={baseColor} strokeWidth="1.5" />
            <text x={lX + lW / 2} y={lY + 20} textAnchor="middle" fontSize="13" fontWeight="800" fill="#333">
              {info.flag} {info.name}
            </text>
            <text x={lX + lW / 2} y={lY + 36} textAnchor="middle" fontSize="11" fill="#555" fontWeight="600">
              🏛️ {info.cap}
            </text>
            <text x={lX + lW / 2} y={lY + 50} textAnchor="middle" fontSize="9" fill="#999">
              🗣️ {info.lang.split(" / ")[0]} · 👥 {info.pop}
            </text>
          </g>
        );
      })}

      {/* Hover tooltip */}
      {hovered &&
        hovered !== sel &&
        features.map(({ nameGeo, centroid, info }) => {
          if (!info || nameGeo !== hovered) return null;
          const [cx, cy] = centroid;
          if (isNaN(cx) || isNaN(cy)) return null;
          return (
            <g key={`hover-${nameGeo}`} style={{ pointerEvents: "none" }}>
              <rect x={cx - 60} y={cy - 28} width="120" height="22" rx="6" fill="rgba(0,0,0,0.75)" />
              <text x={cx} y={cy - 13} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
                {info.flag} {info.name}
              </text>
            </g>
          );
        })}
    </svg>
  );
}

/* =================== MAP MODE =================== */
function EuropeMapMode({ onBack }) {
  const [sel, setSel] = useState(null);
  const [found, setFound] = useState(new Set());
  const [hovered, setHovered] = useState(null);
  const [mode, setMode] = useState("explore");
  const [target, setTarget] = useState(null);
  const [msg, setMsg] = useState("");
  const [fScore, setFScore] = useState(0);
  const [conf, setConf] = useState(0);
  const [queue, setQueue] = useState([]);

  const countryByGeoName = useMemo(() => {
    const m = new Map();
    COUNTRIES.forEach((c) => m.set(c.nameGeo, c));
    return m;
  }, []);

  const startFind = () => {
    const q = shuffle([...COUNTRIES]);
    setQueue(q);
    setTarget(q[0]);
    setMode("findIt");
    setFScore(0);
    setMsg("");
    setSel(null);
    setFound(new Set());
  };

  const handleClick = (nameGeo) => {
    const c = countryByGeoName.get(nameGeo);
    if (!c) return;

    if (mode === "explore") {
      setSel(sel === nameGeo ? null : nameGeo);
      setFound((s) => {
        const n = new Set(s);
        n.add(nameGeo);
        return n;
      });
    } else if (mode === "findIt" && target) {
      if (c.nameGeo === target.nameGeo) {
        setFScore((s) => s + 1);
        setMsg("✅ ¡Correcto!");
        setConf((p) => p + 1);
        setFound((s) => {
          const n = new Set(s);
          n.add(nameGeo);
          return n;
        });
        setSel(nameGeo);
        setTimeout(() => {
          const nq = [...queue];
          nq.shift();
          if (nq.length === 0) {
            setMode("explore");
            setMsg("🏆 ¡Encontraste todos los países!");
            return;
          }
          setQueue(nq);
          setTarget(nq[0]);
          setMsg("");
          setSel(null);
        }, 1200);
      } else {
        setMsg(`❌ Ese es ${c.name}. ¡Intenta de nuevo!`);
        setTimeout(() => setMsg(""), 1500);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 520, alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <button onClick={onBack} style={pill("#e0e0e0", "#333")}>
          ← Menú
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => {
              setMode("explore");
              setSel(null);
              setMsg("");
            }}
            style={pill(mode === "explore" ? "#003399" : "#e0e0e0", mode === "explore" ? "#fff" : "#333")}
          >
            🔍 Explorar
          </button>
          <button onClick={startFind} style={pill(mode === "findIt" ? "#e17055" : "#e0e0e0", mode === "findIt" ? "#fff" : "#333")}>
            🎯 Encuéntralo
          </button>
        </div>
      </div>

      {mode === "explore" && <div style={{ fontSize: 13, color: "#888" }}>🗺️ Toca un país para ver info ({found.size}/30 explorados)</div>}

      {mode === "findIt" && target && (
        <div
          style={{
            background: "linear-gradient(135deg,#e17055,#d63031)",
            borderRadius: 16,
            padding: "12px 20px",
            color: "#fff",
            textAlign: "center",
            maxWidth: 420,
            width: "100%",
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.85 }}>¿Dónde queda...? (✅ {fScore})</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>
            {target.flag} {target.name}
          </div>
        </div>
      )}

      {msg && <div style={{ fontSize: 16, fontWeight: 700, textAlign: "center", padding: 4 }}>{msg}</div>}

      <div style={{ width: "100%", maxWidth: 520, background: "#f0f4ff", borderRadius: 16, padding: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <EuropeMapSVG sel={sel} found={found} hovered={hovered} setHovered={setHovered} onClickCountry={handleClick} mode={mode} />
      </div>

      {/* Info card when a country is selected in explore mode */}
      {mode === "explore" && sel && (() => {
        const c = COUNTRIES.find((x) => x.nameGeo === sel);
        if (!c) return null;
        return (
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 16,
              width: "100%",
              maxWidth: 420,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              border: `2px solid ${REGION_COLORS[sel] || "#ccc"}`,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
              {c.flag} {c.name}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 13 }}>
              <div>🏛️ <strong>Capital:</strong> {c.cap}</div>
              <div>👥 <strong>Población:</strong> {c.pop}</div>
              <div>🗣️ <strong>Idioma:</strong> {c.lang}</div>
              <div>💰 <strong>Moneda:</strong> {c.currency}</div>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: "#555", background: "#f8f9fa", borderRadius: 10, padding: "8px 12px" }}>
              💡 {c.fun}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* =================== WIRED LEARN MODE =================== */
function EuropeLearnMode(props) {
  return (
    <LearnMode
      {...props}
      data={COUNTRIES}
      frontGradient="linear-gradient(135deg,#003399,#1a5276)"
      backGradient="linear-gradient(135deg,#6c5ce7,#a29bfe)"
      progressGradient="linear-gradient(90deg,#003399,#1a5276)"
      navColor="#003399"
      renderFront={(c) => (
        <>
          <div style={{ fontSize: 56, marginBottom: 4 }}>{c.flag}</div>
          <div style={{ fontSize: 28, fontWeight: 800, textAlign: "center" }}>{c.name}</div>
          <div style={{ fontSize: 12, marginTop: 12, background: "rgba(255,255,255,0.2)", padding: "4px 14px", borderRadius: 20 }}>
            🗣️ {c.lang.split(" / ")[0]} · 💰 {c.currency}
          </div>
        </>
      )}
      renderBack={(c) => (
        <>
          <div style={{ fontSize: 14, opacity: 0.8 }}>🏛️ Capital de {c.name}</div>
          <div style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginTop: 4 }}>{c.cap}</div>
          <div
            style={{
              fontSize: 12,
              marginTop: 12,
              background: "rgba(255,255,255,0.2)",
              padding: "6px 14px",
              borderRadius: 12,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            💡 {c.fun}
          </div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.7 }}>👥 Población: {c.pop}</div>
        </>
      )}
    />
  );
}

/* =================== WIRED QUIZ MODE =================== */
function EuropeQuizMode(props) {
  return (
    <QuizMode
      {...props}
      data={COUNTRIES}
      questionTypes={QUESTION_TYPES}
      count={12}
      questionGradient="linear-gradient(135deg,#003399,#1a5276)"
      progressGradient="linear-gradient(90deg,#003399,#6c5ce7)"
    />
  );
}

/* =================== WIRED CHALLENGE MODE =================== */
function EuropeChallengeMode(props) {
  return (
    <ChallengeMode
      {...props}
      data={COUNTRIES}
      questionTypes={QUESTION_TYPES}
      questionGradient="linear-gradient(135deg,#003399,#1a5276)"
    />
  );
}

/* =================== MAIN COMPONENT =================== */
export default function CapitalesEuropa() {
  const { saveQuiz, saveChallenge, saveLearned } = useGameRewards("capitales-europa");

  return (
    <GameShell
      config={{
        id: "capitales-europa",
        title: "Capitales de Europa",
        icon: "🇪🇺",
        gradient: "linear-gradient(180deg,#003399 0%,#1a5276 50%,#0e6655 100%)",
        titleGradient: "linear-gradient(135deg,#003399,#1a5276)",
        subtitle: "Aprende las capitales de 30 países europeos",
        footer: "30 países · Mapa · Quiz · Desafío",
        emojis: ["🇪🇺", "🗼", "🏰", "⚽", "🎭", "🌍"],
        modes: [
          {
            key: "map",
            icon: "🗺️",
            title: "Explorar Mapa",
            desc: "Explora Europa interactivamente",
            gradient: "linear-gradient(135deg,#003399,#1a5276)",
            component: EuropeMapMode,
          },
          {
            key: "learn",
            icon: "📚",
            title: "Aprender",
            desc: "Tarjetas con datos de cada país",
            gradient: "linear-gradient(135deg,#11998e,#38ef7d)",
            component: EuropeLearnMode,
          },
          {
            key: "quiz",
            icon: "🧠",
            title: "Quiz",
            desc: "Pon a prueba tus conocimientos",
            gradient: "linear-gradient(135deg,#6c5ce7,#a29bfe)",
            component: EuropeQuizMode,
          },
          {
            key: "challenge",
            icon: "⚡",
            title: "Desafío",
            desc: "60 segundos para responder",
            gradient: "linear-gradient(135deg,#e17055,#d63031)",
            component: EuropeChallengeMode,
          },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}
