import { useState, useMemo } from "react";
import useGameProgress from "../../hooks/useGameProgress";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { Confetti } from "../../components/game";
import { pill, shuffle } from "../../components/game/utils";

// =================== EUROPEAN COUNTRIES DATA ===================
const COUNTRIES = [
  { name: "España", flag: "🇪🇸", capital: "Madrid", population: "47M", language: "Español", currency: "Euro (€)", fact: "Tiene el segundo mayor número de Patrimonios UNESCO del mundo", region: "sur", x: 18, y: 70 },
  { name: "Francia", flag: "🇫🇷", capital: "París", population: "68M", language: "Francés", currency: "Euro (€)", fact: "Es el país más visitado del mundo con más de 90 millones de turistas al año", region: "oeste", x: 24, y: 52 },
  { name: "Alemania", flag: "🇩🇪", capital: "Berlín", population: "84M", language: "Alemán", currency: "Euro (€)", fact: "Tiene más de 1,500 tipos diferentes de cerveza", region: "centro", x: 36, y: 42 },
  { name: "Italia", flag: "🇮🇹", capital: "Roma", population: "59M", language: "Italiano", currency: "Euro (€)", fact: "Tiene más sitios UNESCO que cualquier otro país del mundo", region: "sur", x: 38, y: 64 },
  { name: "Reino Unido", flag: "🇬🇧", capital: "Londres", population: "67M", language: "Inglés", currency: "Libra esterlina (£)", fact: "El metro de Londres fue el primer sistema de metro subterráneo del mundo (1863)", region: "oeste", x: 18, y: 38 },
  { name: "Portugal", flag: "🇵🇹", capital: "Lisboa", population: "10M", language: "Portugués", currency: "Euro (€)", fact: "Es el país más antiguo de Europa con fronteras definidas desde 1139", region: "sur", x: 10, y: 72 },
  { name: "Países Bajos", flag: "🇳🇱", capital: "Ámsterdam", population: "18M", language: "Neerlandés", currency: "Euro (€)", fact: "Un tercio del país está bajo el nivel del mar", region: "oeste", x: 28, y: 38 },
  { name: "Bélgica", flag: "🇧🇪", capital: "Bruselas", population: "12M", language: "Francés/Neerlandés", currency: "Euro (€)", fact: "Es sede de la Unión Europea y la OTAN", region: "oeste", x: 26, y: 42 },
  { name: "Suiza", flag: "🇨🇭", capital: "Berna", population: "9M", language: "Alemán/Francés/Italiano", currency: "Franco suizo (CHF)", fact: "Tiene cuatro idiomas oficiales y no pertenece a la UE", region: "centro", x: 32, y: 54 },
  { name: "Austria", flag: "🇦🇹", capital: "Viena", population: "9M", language: "Alemán", currency: "Euro (€)", fact: "Viena fue la capital del Imperio Austrohúngaro durante más de 400 años", region: "centro", x: 42, y: 52 },
  { name: "Polonia", flag: "🇵🇱", capital: "Varsovia", population: "38M", language: "Polaco", currency: "Złoty (PLN)", fact: "La Universidad de Cracovia (1364) es una de las más antiguas del mundo", region: "este", x: 50, y: 40 },
  { name: "República Checa", flag: "🇨🇿", capital: "Praga", population: "11M", language: "Checo", currency: "Corona checa (CZK)", fact: "Praga tiene el castillo más grande del mundo (Castillo de Praga)", region: "centro", x: 42, y: 44 },
  { name: "Suecia", flag: "🇸🇪", capital: "Estocolmo", population: "10M", language: "Sueco", currency: "Corona sueca (SEK)", fact: "Tiene más de 200,000 islas, la mayor cantidad en Europa", region: "norte", x: 42, y: 18 },
  { name: "Noruega", flag: "🇳🇴", capital: "Oslo", population: "5M", language: "Noruego", currency: "Corona noruega (NOK)", fact: "Tiene la costa más larga de Europa con sus fiordos (más de 25,000 km)", region: "norte", x: 34, y: 16 },
  { name: "Dinamarca", flag: "🇩🇰", capital: "Copenhague", population: "6M", language: "Danés", currency: "Corona danesa (DKK)", fact: "Tiene la bandera más antigua del mundo en uso continuo (desde 1219)", region: "norte", x: 36, y: 32 },
  { name: "Finlandia", flag: "🇫🇮", capital: "Helsinki", population: "6M", language: "Finés/Sueco", currency: "Euro (€)", fact: "Tiene más saunas que automóviles (3.3 millones de saunas)", region: "norte", x: 56, y: 14 },
  { name: "Irlanda", flag: "🇮🇪", capital: "Dublín", population: "5M", language: "Inglés/Irlandés", currency: "Euro (€)", fact: "No tiene serpientes: San Patricio supuestamente las expulsó", region: "oeste", x: 10, y: 38 },
  { name: "Grecia", flag: "🇬🇷", capital: "Atenas", population: "10M", language: "Griego", currency: "Euro (€)", fact: "Es la cuna de la democracia, la filosofía y los Juegos Olímpicos", region: "sur", x: 52, y: 72 },
  { name: "Rumanía", flag: "🇷🇴", capital: "Bucarest", population: "19M", language: "Rumano", currency: "Leu (RON)", fact: "Tiene el palacio más pesado del mundo: el Palacio del Parlamento", region: "este", x: 58, y: 56 },
  { name: "Hungría", flag: "🇭🇺", capital: "Budapest", population: "10M", language: "Húngaro", currency: "Florín (HUF)", fact: "Budapest tiene el sistema de metro más antiguo de Europa continental (1896)", region: "centro", x: 50, y: 52 },
  { name: "Bulgaria", flag: "🇧🇬", capital: "Sofía", population: "7M", language: "Búlgaro", currency: "Lev (BGN)", fact: "Es uno de los países más antiguos de Europa, fundado en 681", region: "este", x: 58, y: 64 },
  { name: "Croacia", flag: "🇭🇷", capital: "Zagreb", population: "4M", language: "Croata", currency: "Euro (€)", fact: "La corbata fue inventada en Croacia en el siglo XVII", region: "sur", x: 44, y: 58 },
  { name: "Serbia", flag: "🇷🇸", capital: "Belgrado", population: "7M", language: "Serbio", currency: "Dinar (RSD)", fact: "Belgrado es una de las ciudades más antiguas de Europa (7,000 años)", region: "este", x: 52, y: 60 },
  { name: "Ucrania", flag: "🇺🇦", capital: "Kiev", population: "44M", language: "Ucraniano", currency: "Grivna (UAH)", fact: "Es el país más grande enteramente dentro de Europa", region: "este", x: 68, y: 40 },
  { name: "Turquía", flag: "🇹🇷", capital: "Ankara", population: "85M", language: "Turco", currency: "Lira turca (TRY)", fact: "Estambul es la única ciudad del mundo en dos continentes", region: "sur", x: 72, y: 68 },
  { name: "Islandia", flag: "🇮🇸", capital: "Reikiavik", population: "0.4M", language: "Islandés", currency: "Corona islandesa (ISK)", fact: "Tiene el parlamento más antiguo del mundo, fundado en 930", region: "norte", x: 2, y: 8 },
  { name: "Luxemburgo", flag: "🇱🇺", capital: "Luxemburgo", population: "0.7M", language: "Francés/Alemán/Luxemburgués", currency: "Euro (€)", fact: "Es uno de los países más pequeños y ricos del mundo", region: "oeste", x: 28, y: 46 },
  { name: "Estonia", flag: "🇪🇪", capital: "Tallin", population: "1.3M", language: "Estonio", currency: "Euro (€)", fact: "Es el país más digital del mundo: se puede votar por internet", region: "norte", x: 56, y: 24 },
  { name: "Letonia", flag: "🇱🇻", capital: "Riga", population: "1.8M", language: "Letón", currency: "Euro (€)", fact: "Riga fue llamada la 'París del Norte' por su arquitectura art nouveau", region: "norte", x: 56, y: 30 },
  { name: "Lituania", flag: "🇱🇹", capital: "Vilna", population: "2.8M", language: "Lituano", currency: "Euro (€)", fact: "Su idioma es el más antiguo de las lenguas indoeuropeas vivas", region: "norte", x: 56, y: 36 },
];

// =================== REGION CONFIG ===================
const REGION_COLORS = {
  norte: { fill: "#64B5F6", label: "Nórdicos" },
  oeste: { fill: "#81C784", label: "Occidental" },
  centro: { fill: "#FFB74D", label: "Central" },
  sur: { fill: "#E57373", label: "Sur" },
  este: { fill: "#BA68C8", label: "Este" },
};

// =================== QUESTION TYPES ===================
const QUESTION_TYPES = [
  { prompt: (c) => `¿Cuál es la capital de ${c.name}?`, answer: (c) => c.capital },
  { prompt: (c) => `${c.capital} es la capital de...`, answer: (c) => c.name },
  { prompt: (c) => `¿A qué país pertenece esta bandera? ${c.flag}`, answer: (c) => c.name },
];

// =================== MAP MODE ===================
function EuropeMapMode({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("explore"); // explore | findIt
  const [findTarget, setFindTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const [regionFilter, setRegionFilter] = useState("all");

  const startFindIt = () => {
    const shuffled = shuffle(COUNTRIES);
    setFindTarget(shuffled[0]);
    setMode("findIt");
    setScore(0);
    setTotal(0);
    setFeedback(null);
    setSelected(null);
  };

  const handleMapClick = (country) => {
    if (mode === "explore") {
      setSelected(selected?.name === country.name ? null : country);
    } else if (mode === "findIt" && findTarget) {
      setTotal((t) => t + 1);
      if (country.name === findTarget.name) {
        setScore((s) => s + 1);
        setConfetti((c) => c + 1);
        setFeedback({ correct: true, msg: `¡Correcto! ${country.flag} ${country.name}` });
        setTimeout(() => {
          const remaining = COUNTRIES.filter((c) => c.name !== findTarget.name);
          if (remaining.length > 0) {
            setFindTarget(shuffle(remaining)[0]);
            setFeedback(null);
          } else {
            setMode("explore");
            setFindTarget(null);
          }
        }, 1200);
      } else {
        setFeedback({ correct: false, msg: `Ese es ${country.flag} ${country.name}. ¡Busca de nuevo!` });
      }
    }
  };

  const filtered = regionFilter === "all"
    ? COUNTRIES
    : COUNTRIES.filter((c) => c.region === regionFilter);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "0 8px" }}>
      <Confetti active={confetti} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 420, alignItems: "center" }}>
        <button onClick={onBack} style={pill("#e0e0e0", "#333")}>← Menú</button>
        {mode === "findIt" ? (
          <span style={{ fontSize: 14, fontWeight: 700, color: "#333" }}>✅ {score}/{total}</span>
        ) : (
          <button onClick={startFindIt} style={pill("#003399", "#fff")}>🎯 ¡Encuéntralo!</button>
        )}
      </div>

      {mode === "findIt" && findTarget && (
        <div style={{
          background: "linear-gradient(135deg,#003399,#1a5276)",
          borderRadius: 16, padding: "12px 20px", color: "white",
          textAlign: "center", width: "100%", maxWidth: 400,
        }}>
          <div style={{ fontSize: 14, opacity: 0.85 }}>¿Dónde está...</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{findTarget.flag} {findTarget.name}?</div>
        </div>
      )}

      {feedback && (
        <div style={{
          background: feedback.correct ? "#c8e6c9" : "#ffcdd2",
          color: feedback.correct ? "#2e7d32" : "#c62828",
          borderRadius: 12, padding: "8px 16px", fontWeight: 600, fontSize: 14,
        }}>
          {feedback.correct ? "✅" : "❌"} {feedback.msg}
        </div>
      )}

      {/* Region filter (explore mode) */}
      {mode === "explore" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => setRegionFilter("all")}
            style={{ ...filterBtn, background: regionFilter === "all" ? "#333" : "#eee", color: regionFilter === "all" ? "#fff" : "#666" }}
          >
            Todos
          </button>
          {Object.entries(REGION_COLORS).map(([key, { fill, label }]) => (
            <button
              key={key}
              onClick={() => setRegionFilter(key)}
              style={{ ...filterBtn, background: regionFilter === key ? fill : "#eee", color: regionFilter === key ? "#fff" : "#666" }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Map */}
      <div style={{
        width: "100%", maxWidth: 420, aspectRatio: "4/3",
        background: "#e3f2fd", borderRadius: 16, position: "relative",
        overflow: "hidden", border: "2px solid #bbdefb",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}>
        {filtered.map((c) => (
          <button
            key={c.name}
            onClick={() => handleMapClick(c)}
            style={{
              position: "absolute",
              left: `${c.x}%`, top: `${c.y}%`,
              transform: "translate(-50%, -50%)",
              fontSize: selected?.name === c.name ? 28 : 22,
              cursor: "pointer",
              background: "none", border: "none", padding: 2,
              transition: "all 0.2s",
              filter: selected?.name === c.name ? "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" : "none",
              zIndex: selected?.name === c.name ? 10 : 1,
            }}
            title={c.name}
          >
            {c.flag}
          </button>
        ))}
      </div>

      {/* Legend */}
      {mode === "explore" && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", fontSize: 11 }}>
          {Object.entries(REGION_COLORS).map(([, { fill, label }]) => (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: fill, display: "inline-block" }} />
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Info card */}
      {selected && mode === "explore" && (
        <div style={{
          background: "white", borderRadius: 18, padding: 20,
          width: "100%", maxWidth: 400,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          border: `3px solid ${REGION_COLORS[selected.region]?.fill || "#ddd"}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 40 }}>{selected.flag}</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#333" }}>{selected.name}</div>
              <div style={{
                fontSize: 11, background: REGION_COLORS[selected.region]?.fill || "#ddd",
                color: "white", padding: "2px 8px", borderRadius: 8, display: "inline-block",
              }}>
                {REGION_COLORS[selected.region]?.label || selected.region}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13 }}>
            <div><strong>🏛️ Capital:</strong> {selected.capital}</div>
            <div><strong>👥 Población:</strong> {selected.population}</div>
            <div><strong>🗣️ Idioma:</strong> {selected.language}</div>
            <div><strong>💰 Moneda:</strong> {selected.currency}</div>
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: "#555", background: "#f8f9fa", borderRadius: 10, padding: 10 }}>
            💡 {selected.fact}
          </div>
        </div>
      )}
    </div>
  );
}

const filterBtn = {
  border: "none",
  borderRadius: 14,
  padding: "6px 12px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s",
};

// =================== LEARN MODE WRAPPER ===================
function EuropeLearnMode(props) {
  return (
    <LearnMode
      data={COUNTRIES}
      renderFront={(item) => (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64 }}>{item.flag}</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>{item.name}</div>
          <div style={{
            fontSize: 12, background: "rgba(255,255,255,0.2)",
            padding: "3px 10px", borderRadius: 10, marginTop: 6, display: "inline-block",
          }}>
            {REGION_COLORS[item.region]?.label}
          </div>
        </div>
      )}
      renderBack={(item) => (
        <div style={{ textAlign: "center", fontSize: 14, lineHeight: 1.8 }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>🏛️ {item.capital}</div>
          <div>👥 Población: {item.population}</div>
          <div>🗣️ {item.language}</div>
          <div>💰 {item.currency}</div>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85, fontStyle: "italic" }}>💡 {item.fact}</div>
        </div>
      )}
      frontGradient="linear-gradient(135deg,#003399,#1a5276)"
      backGradient="linear-gradient(135deg,#0e6655,#1abc9c)"
      navColor="#003399"
      {...props}
    />
  );
}

// =================== QUIZ MODE WRAPPER ===================
function EuropeQuizMode(props) {
  return (
    <QuizMode
      data={COUNTRIES}
      questionTypes={QUESTION_TYPES}
      count={12}
      questionGradient="linear-gradient(135deg,#003399,#1a5276)"
      progressGradient="linear-gradient(90deg,#003399,#1a5276)"
      {...props}
    />
  );
}

// =================== CHALLENGE MODE WRAPPER ===================
function EuropeChallengeMode(props) {
  return (
    <ChallengeMode
      data={COUNTRIES}
      questionTypes={QUESTION_TYPES}
      questionGradient="linear-gradient(135deg,#003399,#1a5276)"
      {...props}
    />
  );
}

// =================== MAIN COMPONENT ===================
export default function CapitalesEuropa() {
  const { saveQuiz, saveChallenge, saveLearned } = useGameProgress("capitales-europa");

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
          { key: "map", icon: "🗺️", title: "Explorar Mapa", desc: "Explora Europa con banderas interactivas", gradient: "linear-gradient(135deg,#003399,#1a5276)", component: EuropeMapMode },
          { key: "learn", icon: "📚", title: "Aprender", desc: "Tarjetas con datos de cada país", gradient: "linear-gradient(135deg,#11998e,#38ef7d)", component: EuropeLearnMode },
          { key: "quiz", icon: "🧠", title: "Quiz", desc: "Pon a prueba tus conocimientos", gradient: "linear-gradient(135deg,#6c5ce7,#a29bfe)", component: EuropeQuizMode },
          { key: "challenge", icon: "⚡", title: "Desafío", desc: "60 segundos para responder", gradient: "linear-gradient(135deg,#e17055,#d63031)", component: EuropeChallengeMode },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}
