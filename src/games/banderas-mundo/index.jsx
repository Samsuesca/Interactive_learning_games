import { useState, useMemo } from "react";
import useGameRewards from "../../hooks/useGameRewards";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { Confetti, OptionButton } from "../../components/game";
import { shuffle, pill } from "../../components/game/utils";

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

/* =================== QUESTION TYPES =================== */
const QUESTION_TYPES = [
  {
    prompt: (item) => `flag_to_country::${item.flag}`,
    answer: (item) => item.name,
  },
  {
    prompt: (item) => `country_to_flag::${item.flag} ${item.name}`,
    answer: (item) => item.flag,
  },
  {
    prompt: (item) => `country_to_cap::${item.flag} ${item.name}`,
    answer: (item) => item.cap,
  },
];

/* Helper to parse question type from prompt string */
function parseQuestion(prompt) {
  const [type, display] = prompt.split("::");
  if (type === "flag_to_country") {
    return { type: "flag_to_country", text: "¿De qué país es esta bandera?", display, displaySize: 56 };
  }
  if (type === "country_to_flag") {
    return { type: "country_to_flag", text: "¿Cuál es la bandera de...?", display, displaySize: 24 };
  }
  return { type: "country_to_cap", text: "¿Cuál es la capital de...?", display, displaySize: 24 };
}

/* =================== CUSTOM FLAG OPTION BUTTON =================== */
function FlagOptionButton({ text, selected, correct, onClick, isFlag }) {
  const ok = text === correct;
  const isSel = selected === text;
  let bg = "white", bd = "#ddd", cl = "#333";
  if (selected !== null) {
    if (ok) { bg = "#c8e6c9"; bd = "#66BB6A"; cl = "#2e7d32"; }
    else if (isSel) { bg = "#ffcdd2"; bd = "#ef5350"; cl = "#c62828"; }
  }
  return (
    <button onClick={onClick} style={{
      background:bg, border:`2px solid ${bd}`, borderRadius:16, padding: isFlag ? "10px" : "14px 10px",
      fontSize: isFlag ? 32 : 15, fontWeight:600, color:cl, cursor: selected !== null ? "default" : "pointer",
      transition:"all 0.3s", transform: isSel ? "scale(1.04)" : "scale(1)",
      boxShadow: isSel ? "0 4px 15px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      {!isFlag && selected !== null && ok && "✅ "}
      {!isFlag && selected !== null && isSel && !ok && "❌ "}
      {text}
      {isFlag && selected !== null && ok && " ✅"}
      {isFlag && selected !== null && isSel && !ok && " ❌"}
    </button>
  );
}

/* =================== CUSTOM QUESTION RENDERER =================== */
function renderBWQuestion(gradient) {
  return (q, { selected, pick }) => {
    const parsed = parseQuestion(q.prompt);
    const isFlag = parsed.type === "country_to_flag";
    return (
      <>
        <div style={{ background: gradient, borderRadius: 20, padding: 24, color: "white", textAlign: "center", width: "100%", maxWidth: 400 }}>
          <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 6 }}>{parsed.text}</div>
          <div style={{ fontSize: parsed.displaySize, fontWeight: 800 }}>{parsed.display}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 400 }}>
          {q.options.map((o, i) => (
            <FlagOptionButton key={i} text={o} selected={selected} correct={q.correct} onClick={() => pick(o)} isFlag={isFlag} />
          ))}
        </div>
      </>
    );
  };
}

/* =================== GALLERY MODE (game-specific) =================== */
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

/* =================== WIRED LEARN MODE =================== */
function BWLearnMode(props) {
  return (
    <LearnMode
      {...props}
      data={COUNTRIES}
      frontGradient="linear-gradient(135deg,#0052D4,#4364F7)"
      backGradient="linear-gradient(135deg,#6c5ce7,#a29bfe)"
      progressGradient="linear-gradient(90deg,#0052D4,#6FB1FC)"
      navColor="#0052D4"
      renderFront={(c) => (
        <>
          <div style={{ fontSize:56, marginBottom:4 }}>{c.flag}</div>
          <div style={{ fontSize:26, fontWeight:800, textAlign:"center" }}>{c.name}</div>
          <div style={{
            fontSize:11, marginTop:10, display:"inline-block",
            background:"rgba(255,255,255,0.2)", padding:"4px 14px", borderRadius:20
          }}>
            {CONTINENTS[c.cont].emoji} {CONTINENTS[c.cont].name}
          </div>
          <div style={{ fontSize:12, marginTop:8, background:"rgba(255,255,255,0.15)", padding:"4px 14px", borderRadius:20 }}>🗣️ {c.lang} · 💰 {c.currency}</div>
        </>
      )}
      renderBack={(c) => (
        <>
          <div style={{ fontSize:14, opacity:0.8 }}>🏛️ Capital de {c.name}</div>
          <div style={{ fontSize:28, fontWeight:800, textAlign:"center", marginTop:4 }}>{c.cap}</div>
          <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"6px 14px", borderRadius:12, textAlign:"center", lineHeight:1.4 }}>💡 {c.fun}</div>
          <div style={{ fontSize:12, marginTop:8, opacity:0.7 }}>{CONTINENTS[c.cont].emoji} {CONTINENTS[c.cont].name} · 💰 {c.currency}</div>
        </>
      )}
    />
  );
}

/* =================== WIRED QUIZ MODE =================== */
function BWQuizMode(props) {
  return (
    <QuizMode
      {...props}
      data={COUNTRIES}
      questionTypes={QUESTION_TYPES}
      count={15}
      questionGradient="linear-gradient(135deg,#0052D4,#4364F7)"
      progressGradient="linear-gradient(90deg,#0052D4,#6FB1FC)"
      renderQuestion={renderBWQuestion("linear-gradient(135deg,#0052D4,#4364F7)")}
    />
  );
}

/* =================== WIRED CHALLENGE MODE =================== */
function BWChallengeMode(props) {
  return (
    <ChallengeMode
      {...props}
      data={COUNTRIES}
      questionTypes={QUESTION_TYPES}
      questionGradient="linear-gradient(135deg,#0052D4,#4364F7)"
      renderQuestion={renderBWQuestion("linear-gradient(135deg,#0052D4,#4364F7)")}
    />
  );
}

/* =================== MAIN COMPONENT =================== */
export default function BanderasMundo() {
  const { saveQuiz, saveChallenge, saveLearned } = useGameRewards("banderas-mundo");

  return (
    <GameShell
      config={{
        id: "banderas-mundo",
        title: "Banderas del Mundo",
        icon: "🌍",
        gradient: "linear-gradient(180deg,#f0f4ff 0%,#e8f0ff 50%,#f5f0ff 100%)",
        titleGradient: "linear-gradient(135deg,#0052D4,#6FB1FC)",
        subtitle: "¡Aprende las banderas de 50 países!",
        footer: "50 países · 5 continentes · Banderas y capitales · ¡A jugar! 🎮",
        emojis: ["🎉","⭐","🌟","💫","🏳️","🏆","👏","💪","🌎","🌍","🌏","🎊"],
        modes: [
          { key:"gallery", icon:"🏳️", title:"Galería de Banderas", desc:"Explora las banderas de 50 países del mundo", gradient:"linear-gradient(135deg,#0052D4,#4364F7)", component: GalleryMode },
          { key:"learn", icon:"📚", title:"Aprende", desc:"Tarjetas con banderas, capitales y datos curiosos", gradient:"linear-gradient(135deg,#6c5ce7,#a29bfe)", component: BWLearnMode },
          { key:"quiz", icon:"🧠", title:"Quiz", desc:"¿Reconoces todas las banderas?", gradient:"linear-gradient(135deg,#fd79a8,#e84393)", component: BWQuizMode },
          { key:"challenge", icon:"⚡", title:"Desafío Relámpago", desc:"60 segundos. ¿Cuántas aciertas?", gradient:"linear-gradient(135deg,#e17055,#d63031)", component: BWChallengeMode },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}
