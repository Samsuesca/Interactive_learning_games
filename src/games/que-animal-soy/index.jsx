import { useState, useEffect, useRef } from "react";
import useGameProgress from "../../hooks/useGameProgress";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { Confetti, Stars, ProgressBar } from "../../components/game";
import { shuffle, pill } from "../../components/game/utils";

/* =================== DATOS DEL JUEGO =================== */
const ANIMALS = [
  {
    name: "León", emoji: "🦁", category: "Mamífero", habitat: "Sabana africana",
    fun: "Es el único felino que vive en grupos llamados manadas",
    clues: [
      "Puedo dormir hasta 20 horas al día",
      "Vivo en grupos familiares en la sabana",
      "Los machos de mi especie tienen una gran melena",
      "Me llaman 'el rey de la selva'",
      "Soy un gran felino de color dorado"
    ]
  },
  {
    name: "Delfín", emoji: "🐬", category: "Mamífero marino", habitat: "Océanos y mares",
    fun: "Duermen con la mitad del cerebro despierto para seguir respirando",
    clues: [
      "Uso ecolocalización para encontrar mi comida",
      "Puedo nadar a más de 30 km/h",
      "Vivo en grupos llamados vainas o pods",
      "Soy uno de los animales más inteligentes del océano",
      "Salto fuera del agua y tengo un hocico alargado"
    ]
  },
  {
    name: "Elefante", emoji: "🐘", category: "Mamífero", habitat: "África y Asia",
    fun: "Tienen una memoria extraordinaria y pueden recordar rutas por décadas",
    clues: [
      "Mis dientes pueden pesar hasta 6 kilogramos cada uno",
      "Puedo comunicarme con sonidos que los humanos no escuchan",
      "Soy el animal terrestre más grande del planeta",
      "Tengo una trompa que uso como mano, nariz y ducha",
      "Soy gris, enorme y tengo grandes orejas y colmillos"
    ]
  },
  {
    name: "Pingüino", emoji: "🐧", category: "Ave", habitat: "Antártida y hemisferio sur",
    fun: "El pingüino emperador puede aguantar hasta -60°C sin comer por meses",
    clues: [
      "Puedo beber agua salada gracias a unas glándulas especiales",
      "El macho de mi especie incuba el huevo durante el invierno",
      "Camino de forma graciosa balanceándome de lado a lado",
      "Soy un ave pero no puedo volar; nado muy bien",
      "Soy blanco y negro y vivo donde hace mucho frío"
    ]
  },
  {
    name: "Águila", emoji: "🦅", category: "Ave rapaz", habitat: "Montañas y bosques",
    fun: "Pueden ver un conejo a más de 3 km de distancia",
    clues: [
      "Mi vista es 8 veces más potente que la de un humano",
      "Construyo nidos enormes que reutilizo año tras año",
      "Puedo alcanzar velocidades de 160 km/h en picada",
      "Soy el símbolo de muchos países y escudos nacionales",
      "Soy una gran ave rapaz con garras poderosas"
    ]
  },
  {
    name: "Pulpo", emoji: "🐙", category: "Molusco", habitat: "Fondos marinos",
    fun: "Tienen tres corazones y su sangre es de color azul",
    clues: [
      "Tengo tres corazones y sangre azul",
      "Puedo cambiar de color y textura en milisegundos",
      "Cada uno de mis brazos tiene su propio 'mini cerebro'",
      "Puedo abrir frascos y resolver laberintos",
      "Tengo ocho brazos y vivo en el mar"
    ]
  },
  {
    name: "Camaleón", emoji: "🦎", category: "Reptil", habitat: "Bosques tropicales",
    fun: "Sus ojos pueden moverse independientemente uno del otro",
    clues: [
      "Mis ojos se mueven de forma independiente para ver en dos direcciones",
      "Mi lengua es más larga que mi cuerpo y la disparo en milisegundos",
      "Mis patas tienen forma de pinza para agarrarme a las ramas",
      "Cambio de color según mi estado de ánimo y temperatura",
      "Soy un reptil famoso por cambiar de color"
    ]
  },
  {
    name: "Abeja", emoji: "🐝", category: "Insecto", habitat: "Prados y jardines",
    fun: "Para hacer 1 kg de miel necesitan visitar 4 millones de flores",
    clues: [
      "Me comunico con mis compañeras haciendo una 'danza' especial",
      "En mi colonia solo una hembra puede poner huevos",
      "Visito cientos de flores al día ayudando a la polinización",
      "Vivo en una colmena con miles de compañeras organizadas",
      "Soy un insecto amarillo y negro que produce miel"
    ]
  },
  {
    name: "Tiburón", emoji: "🦈", category: "Pez cartilaginoso", habitat: "Océanos",
    fun: "Pueden detectar una gota de sangre en millones de litros de agua",
    clues: [
      "Mi esqueleto está hecho de cartílago, no de hueso",
      "Tengo varios pares de dientes que se reemplazan constantemente",
      "Puedo detectar campos eléctricos de otros animales",
      "Llevo existiendo desde antes que los dinosaurios",
      "Soy un gran depredador marino con aleta dorsal"
    ]
  },
  {
    name: "Koala", emoji: "🐨", category: "Marsupial", habitat: "Bosques de Australia",
    fun: "Duermen hasta 22 horas al día porque su dieta les da poca energía",
    clues: [
      "Mis huellas dactilares son casi idénticas a las humanas",
      "Duermo hasta 22 horas al día porque mi dieta es muy baja en energía",
      "Tengo un sistema digestivo especial para procesar hojas tóxicas",
      "Solo como un tipo de hoja y vivo en Australia",
      "Parezco un osito de peluche y me aferro a los árboles"
    ]
  },
  {
    name: "Jirafa", emoji: "🦒", category: "Mamífero", habitat: "Sabana africana",
    fun: "Su corazón pesa unos 11 kg para bombear sangre hasta su cabeza",
    clues: [
      "Mi corazón pesa unos 11 kilogramos para poder bombear sangre hasta mi cabeza",
      "Cada uno de nosotros tiene un patrón de manchas único, como una huella",
      "Solo necesito dormir unos 30 minutos al día",
      "Mi lengua mide casi medio metro y es de color azul oscuro",
      "Soy el animal más alto del mundo con un cuello muy largo"
    ]
  },
  {
    name: "Canguro", emoji: "🦘", category: "Marsupial", habitat: "Australia",
    fun: "No pueden caminar hacia atrás, por eso es símbolo de progreso en Australia",
    clues: [
      "No puedo caminar hacia atrás debido a la forma de mis patas",
      "Al nacer mido solo 2 centímetros y peso menos de un gramo",
      "Puedo saltar hasta 9 metros de distancia de un solo brinco",
      "Las mamás de mi especie cargan a sus crías en una bolsa",
      "Soy un marsupial australiano que se desplaza saltando"
    ]
  },
  {
    name: "Oso polar", emoji: "🐻‍❄️", category: "Mamífero", habitat: "Ártico",
    fun: "Su piel es negra debajo del pelaje blanco para absorber calor",
    clues: [
      "Mi piel debajo del pelaje es completamente negra",
      "Puedo oler una foca a más de un kilómetro de distancia bajo el hielo",
      "Soy un excelente nadador y puedo recorrer 100 km sin parar",
      "Soy el depredador terrestre más grande del mundo",
      "Soy un gran oso blanco que vive entre hielo y nieve"
    ]
  },
  {
    name: "Tortuga", emoji: "🐢", category: "Reptil", habitat: "Todo el mundo",
    fun: "Algunas especies pueden vivir más de 200 años",
    clues: [
      "Algunas de mi especie pueden vivir más de 200 años",
      "Existía antes que los dinosaurios, llevo 220 millones de años en la Tierra",
      "Puedo meter mi cabeza y patas dentro de mi protección cuando tengo miedo",
      "Me muevo muy lento pero soy muy resistente",
      "Llevo mi casa en la espalda: un caparazón duro"
    ]
  },
  {
    name: "Murciélago", emoji: "🦇", category: "Mamífero volador", habitat: "Cuevas y bosques",
    fun: "Son los únicos mamíferos que pueden volar de verdad",
    clues: [
      "Soy el único mamífero capaz de volar de verdad",
      "Uso sonidos ultrasónicos para orientarme en la oscuridad",
      "Algunas de mis especies se alimentan del néctar de las flores",
      "Duermo colgado boca abajo durante el día",
      "Salgo de noche, tengo alas y vivo en cuevas"
    ]
  },
  {
    name: "Loro", emoji: "🦜", category: "Ave", habitat: "Bosques tropicales",
    fun: "Algunos loros pueden vivir más de 80 años y aprender cientos de palabras",
    clues: [
      "Puedo vivir más de 80 años en cautiverio",
      "Uso mis patas como manos para agarrar comida",
      "Mi pico es tan fuerte que puede romper una nuez fácilmente",
      "Puedo aprender a imitar la voz humana y otros sonidos",
      "Soy un ave colorida y tropical que puede hablar"
    ]
  },
  {
    name: "Rana", emoji: "🐸", category: "Anfibio", habitat: "Zonas húmedas",
    fun: "Absorben agua a través de su piel en lugar de beberla",
    clues: [
      "Absorbo el agua que necesito directamente a través de mi piel",
      "Algunas de mis especies son tan venenosas que pueden matar con solo tocarlas",
      "Cuando era bebé tenía cola y vivía solo en el agua",
      "Puedo saltar hasta 20 veces mi propia longitud",
      "Soy verde, salto y hago 'croac' junto a los estanques"
    ]
  },
  {
    name: "Ballena azul", emoji: "🐋", category: "Mamífero marino", habitat: "Todos los océanos",
    fun: "Su corazón es del tamaño de un auto pequeño",
    clues: [
      "Mi corazón es tan grande como un auto pequeño",
      "Mi lengua puede pesar tanto como un elefante",
      "A pesar de mi tamaño me alimento de criaturas diminutas",
      "Mi canto puede escucharse a cientos de kilómetros bajo el agua",
      "Soy el animal más grande que ha existido en la Tierra"
    ]
  },
  {
    name: "Cocodrilo", emoji: "🐊", category: "Reptil", habitat: "Ríos y pantanos tropicales",
    fun: "No pueden sacar la lengua porque está pegada al paladar",
    clues: [
      "No puedo sacar la lengua porque está pegada a mi paladar",
      "Puedo permanecer bajo el agua más de una hora sin respirar",
      "Mis ancestros convivieron con los dinosaurios hace 200 millones de años",
      "Tengo la mordida más poderosa del reino animal",
      "Soy un gran reptil con escamas que vive en ríos y pantanos"
    ]
  },
  {
    name: "Mariposa", emoji: "🦋", category: "Insecto", habitat: "Jardines y prados",
    fun: "Algunas mariposas monarca viajan más de 4,000 km en su migración",
    clues: [
      "Antes de ser lo que soy pasé por una transformación completa llamada metamorfosis",
      "Puedo detectar el sabor con mis patas al posarme sobre una flor",
      "Algunas de mi especie migran miles de kilómetros cada año",
      "Cuando era joven era una oruga que comía hojas",
      "Tengo alas coloridas y vuelo de flor en flor"
    ]
  },
];

const EMOJIS = ["🎉","⭐","🌟","💫","🐾","🏆","👏","💪","🦁","🐬","🌺","🎊"];
const POINTS = [50, 40, 30, 20, 10];

const QUESTION_TYPES = [
  {
    prompt: (item) => `${item.emoji} ¿Qué animal ${item.clues[Math.floor(Math.random() * 3)].toLowerCase()}?`,
    answer: (item) => item.name,
  },
  {
    prompt: (item) => `¿A qué categoría pertenece ${item.emoji} ${item.name}?`,
    answer: (item) => item.category,
  },
  {
    prompt: (item) => `¿Dónde vive ${item.emoji} ${item.name}?`,
    answer: (item) => item.habitat,
  },
];

/* =================== MODO CLÁSICO - ¿Qué animal soy? (game-specific) =================== */
function ClueMode({ onBack }) {
  const TOTAL_ROUNDS = 10;
  const [rounds, setRounds] = useState([]);
  const [ri, setRi] = useState(0);
  const [clueIdx, setClueIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [done, setDone] = useState(false);
  const [conf, setConf] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const maxScore = TOTAL_ROUNDS * 50;

  useEffect(() => { generate(); }, []);

  const generate = () => {
    const picked = shuffle(ANIMALS).slice(0, TOTAL_ROUNDS);
    const rnds = picked.map(animal => {
      let opts = [animal.name];
      const pool = ANIMALS.filter(a => a.name !== animal.name);
      while (opts.length < 3) {
        const r = pool[Math.floor(Math.random() * pool.length)];
        if (!opts.includes(r.name)) opts.push(r.name);
      }
      return { animal, options: shuffle(opts) };
    });
    setRounds(rnds);
    setRi(0); setClueIdx(0); setSel(null); setScore(0); setRoundScore(0);
    setDone(false); setStreak(0); setBestStreak(0);
  };

  const revealNext = () => {
    if (clueIdx < 4) setClueIdx(c => c + 1);
  };

  const pick = (option) => {
    if (sel !== null) return;
    setSel(option);
    const correct = option === rounds[ri].animal.name;
    const pts = correct ? POINTS[clueIdx] : 0;
    setRoundScore(pts);
    if (correct) {
      setScore(s => s + pts);
      setStreak(s => { const n = s + 1; if (n > bestStreak) setBestStreak(n); return n; });
      setConf(c => c + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      if (ri + 1 >= TOTAL_ROUNDS) { setDone(true); }
      else { setRi(i => i + 1); setClueIdx(0); setSel(null); setRoundScore(0); }
    }, 2000);
  };

  if (done) {
    const pct = maxScore > 0 ? score / maxScore : 0;
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize:48 }}>🏆</div>
        <h2 style={{ fontSize:24, fontWeight:800, color:"#333" }}>¡Juego terminado!</h2>
        <Stars score={pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct > 0 ? 1 : 0} total={3} />
        <div style={{ background:"linear-gradient(135deg,#f5af19,#f12711)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:42, fontWeight:800 }}>{score}</div>
          <div style={{ fontSize:14, opacity:0.9, marginTop:4 }}>de {maxScore} puntos posibles</div>
          <div style={{ fontSize:14, opacity:0.8, marginTop:4 }}>🔥 Mejor racha: {bestStreak}</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>
          {pct >= 0.9 ? "🧠 ¡Eres un genio de los animales!" : pct >= 0.6 ? "💪 ¡Muy buen conocimiento!" : pct > 0.3 ? "📚 ¡Vas por buen camino!" : "🐾 ¡Sigue aprendiendo sobre animales!"}
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={generate} style={pill("#f5af19","#fff")}>🔄 Jugar de nuevo</button>
          <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        </div>
      </div>
    );
  }

  if (!rounds.length) return null;
  const round = rounds[ri];
  const animal = round.animal;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"0 8px" }}>
      <Confetti active={conf} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:420, alignItems:"center" }}>
        <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        <div style={{ display:"flex", gap:12, fontSize:14, fontWeight:600 }}>
          <span>💰 {score}</span>
          <span>🔥 {streak}</span>
        </div>
      </div>

      <ProgressBar value={ri + 1} max={TOTAL_ROUNDS} gradient="linear-gradient(90deg,#f5af19,#f12711)" />
      <div style={{ fontSize:13, color:"#999" }}>Ronda {ri + 1} de {TOTAL_ROUNDS}</div>

      {/* Clue card */}
      <div style={{ background:"linear-gradient(135deg,#f5af19,#f12711)", borderRadius:20, padding:24, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:14, opacity:0.85, marginBottom:8 }}>🔍 ¿Qué animal soy?</div>
        <div style={{ fontSize:13, opacity:0.7, marginBottom:12 }}>
          Pista {clueIdx + 1} de 5 · Vale {POINTS[clueIdx]} puntos
        </div>

        {/* All revealed clues */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {Array.from({ length: clueIdx + 1 }, (_, i) => (
            <div key={i} style={{
              background: i === clueIdx ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
              borderRadius:12, padding:"10px 14px", fontSize: i === clueIdx ? 16 : 14,
              fontWeight: i === clueIdx ? 700 : 400, opacity: i === clueIdx ? 1 : 0.8,
              transition:"all 0.3s"
            }}>
              <span style={{ opacity:0.7, marginRight:6 }}>#{i + 1}</span>
              {animal.clues[i]}
            </div>
          ))}
        </div>
      </div>

      {/* Next clue button */}
      {sel === null && clueIdx < 4 && (
        <button onClick={revealNext} style={{
          ...pill("rgba(245,175,25,0.15)","#f5af19"),
          border:"2px dashed #f5af19", width:"100%", maxWidth:400, textAlign:"center"
        }}>
          💡 Pedir otra pista (siguiente vale {POINTS[clueIdx + 1]} pts)
        </button>
      )}

      {/* Options */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:400 }}>
        {round.options.map((opt, i) => {
          const isCorrect = opt === animal.name;
          const isSel = sel === opt;
          let bg = "white", bd = "#ddd", cl = "#333";
          if (sel !== null) {
            if (isCorrect) { bg = "#c8e6c9"; bd = "#66BB6A"; cl = "#2e7d32"; }
            else if (isSel) { bg = "#ffcdd2"; bd = "#ef5350"; cl = "#c62828"; }
          }
          return (
            <button key={i} onClick={() => pick(opt)} style={{
              background:bg, border:`2px solid ${bd}`, borderRadius:16, padding:"14px 16px",
              fontSize:16, fontWeight:600, color:cl, cursor: sel !== null ? "default" : "pointer",
              transition:"all 0.3s", transform: isSel ? "scale(1.04)" : "scale(1)",
              boxShadow: isSel ? "0 4px 15px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
              display:"flex", alignItems:"center", gap:10
            }}>
              {sel !== null && isCorrect && "✅ "}
              {sel !== null && isSel && !isCorrect && "❌ "}
              {ANIMALS.find(a => a.name === opt)?.emoji} {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback after answer */}
      {sel !== null && (
        <div style={{
          background: sel === animal.name ? "linear-gradient(135deg,#11998e,#38ef7d)" : "linear-gradient(135deg,#e17055,#d63031)",
          borderRadius:16, padding:"12px 20px", color:"white", textAlign:"center", width:"100%", maxWidth:400,
          animation:"qasSlideUp 0.3s ease-out"
        }}>
          {sel === animal.name ? (
            <div>
              <div style={{ fontSize:18, fontWeight:800 }}>¡Correcto! +{roundScore} pts 🎉</div>
              <div style={{ fontSize:13, opacity:0.9, marginTop:4 }}>{animal.emoji} {animal.name} — {animal.fun}</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize:18, fontWeight:800 }}>Era {animal.emoji} {animal.name}</div>
              <div style={{ fontSize:13, opacity:0.9, marginTop:4 }}>{animal.fun}</div>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes qasSlideUp{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );
}

/* =================== MODO DESAFÍO PERSONALIZADO (con pistas progresivas) =================== */
function AnimalChallengeMode({ onBack, saveChallenge }) {
  const [st, setSt] = useState("ready");
  const [rounds, setRounds] = useState([]);
  const [ri, setRi] = useState(0);
  const [clueIdx, setClueIdx] = useState(0);
  const [sc, setSc] = useState(0);
  const [tm, setTm] = useState(60);
  const [sel, setSel] = useState(null);
  const [conf, setConf] = useState(0);
  const [str, setStr] = useState(0);
  const ref = useRef(null);
  useEffect(() => { if (st === "done") saveChallenge?.(sc); }, [st]);

  const start = () => {
    const picked = [];
    for (let i = 0; i < 30; i++) {
      picked.push(...shuffle(ANIMALS));
    }
    const rnds = picked.slice(0, 60).map(animal => {
      let opts = [animal.name];
      const pool = ANIMALS.filter(a => a.name !== animal.name);
      while (opts.length < 3) {
        const r = pool[Math.floor(Math.random() * pool.length)];
        if (!opts.includes(r.name)) opts.push(r.name);
      }
      return { animal, options: shuffle(opts) };
    });
    setRounds(rnds);
    setRi(0); setClueIdx(0); setSc(0); setTm(60); setSel(null); setStr(0); setSt("playing");
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
    const correct = o === rounds[ri].animal.name;
    if (correct) { setSc(s => s + POINTS[clueIdx]); setStr(s => s + 1); setConf(c => c + 1); }
    else { setStr(0); }
    setTimeout(() => {
      if (ri + 1 >= rounds.length) { clearInterval(ref.current); setSt("done"); }
      else { setRi(i => i + 1); setClueIdx(0); setSel(null); }
    }, 500);
  };

  const revealNext = () => {
    if (clueIdx < 4) setClueIdx(c => c + 1);
  };

  if (st === "ready") {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"0 8px" }}>
        <button onClick={onBack} style={{ ...pill("#e0e0e0","#333"), alignSelf:"flex-start" }}>← Menú</button>
        <div style={{ fontSize:64 }}>⚡</div>
        <h2 style={{ fontSize:24, fontWeight:800, color:"#333", textAlign:"center" }}>Desafío Relámpago</h2>
        <div style={{ background:"linear-gradient(135deg,#e17055,#d63031)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:350, width:"100%" }}>
          <p style={{ fontSize:16, margin:0, lineHeight:1.6 }}>
            ¡Tienes <strong>60 segundos</strong> para adivinar la mayor cantidad de animales!
          </p>
          <p style={{ fontSize:13, margin:"8px 0 0", opacity:0.85 }}>
            Se muestra 1 pista por animal · Pide más pistas pero ganarás menos puntos
          </p>
        </div>
        <button onClick={start} style={{ ...pill("#f5af19","#fff"), fontSize:20, padding:"14px 40px", animation:"qasPulse 1.5s infinite" }}>🚀 ¡Empezar!</button>
        <style>{`@keyframes qasPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
      </div>
    );
  }

  if (st === "done") {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize:48 }}>⚡</div>
        <h2 style={{ fontSize:24, fontWeight:800, color:"#333" }}>¡Tiempo!</h2>
        <Stars score={sc} total={Math.max(sc + 50, 200)} />
        <div style={{ background:"linear-gradient(135deg,#f5af19,#f12711)", borderRadius:20, padding:24, color:"white", textAlign:"center", maxWidth:300, width:"100%" }}>
          <div style={{ fontSize:48, fontWeight:800 }}>{sc}</div>
          <div style={{ fontSize:16 }}>puntos en 60s</div>
          <div style={{ fontSize:14, opacity:0.8, marginTop:4 }}>🎯 {ri} animales vistos</div>
        </div>
        <div style={{ fontSize:18, textAlign:"center" }}>{sc >= 300 ? "🧠 ¡Increíble!" : sc >= 200 ? "🔥 ¡Muy rápido!" : sc >= 100 ? "💪 ¡Bien!" : "📚 ¡Practica más!"}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={start} style={pill("#f5af19","#fff")}>⚡ Otra vez</button>
          <button onClick={onBack} style={pill("#e0e0e0","#333")}>← Menú</button>
        </div>
      </div>
    );
  }

  if (!rounds.length) return null;
  const round = rounds[ri];
  const animal = round.animal;
  const tc = tm <= 10 ? "#ef5350" : tm <= 30 ? "#FFA726" : "#66BB6A";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, padding:"0 8px" }}>
      <Confetti active={conf} />

      {/* Timer and score */}
      <div style={{ display:"flex", justifyContent:"space-between", width:"100%", maxWidth:420, alignItems:"center" }}>
        <div aria-live="assertive" aria-atomic="true" style={{ fontSize:28, fontWeight:800, color:tc, animation: tm <= 10 ? "qasPulse 0.5s infinite" : "none" }}>⏱ {tm}s</div>
        <div aria-live="polite" style={{ display:"flex", gap:12, fontSize:15, fontWeight:700 }}><span>💰 {sc}</span><span>🔥 {str}</span></div>
      </div>
      <div style={{ width:"100%", maxWidth:420, height:8, background:"#e0e0e0", borderRadius:4, overflow:"hidden" }}>
        <div style={{ width:`${(tm/60)*100}%`, height:"100%", background:tc, transition:"width 1s linear", borderRadius:4 }} />
      </div>

      {/* Clue */}
      <div style={{ background:`linear-gradient(135deg,${tm <= 10 ? "#ff5252,#f44336" : "#f5af19,#f12711"})`, borderRadius:18, padding:16, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
        <div style={{ fontSize:12, opacity:0.8, marginBottom:4 }}>🔍 ¿Qué animal soy? · Pista {clueIdx + 1}/5 · Vale {POINTS[clueIdx]} pts</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {Array.from({ length: clueIdx + 1 }, (_, i) => (
            <div key={i} style={{
              background: i === clueIdx ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
              borderRadius:10, padding:"8px 12px", fontSize: i === clueIdx ? 15 : 13,
              fontWeight: i === clueIdx ? 700 : 400
            }}>
              {animal.clues[i]}
            </div>
          ))}
        </div>
      </div>

      {/* Next clue button (compact for challenge) */}
      {sel === null && clueIdx < 4 && (
        <button onClick={revealNext} style={{
          background:"transparent", border:"1px dashed #f5af19", borderRadius:12,
          padding:"6px 16px", fontSize:12, color:"#f5af19", cursor:"pointer"
        }}>
          💡 +pista ({POINTS[clueIdx + 1]} pts)
        </button>
      )}

      {/* Options */}
      <div style={{ display:"flex", flexDirection:"column", gap:8, width:"100%", maxWidth:400 }}>
        {round.options.map((opt, i) => {
          const isCorrect = opt === animal.name;
          const isSel = sel === opt;
          let bg = "white", bd = "#ddd", cl = "#333";
          if (sel !== null) {
            if (isCorrect) { bg = "#c8e6c9"; bd = "#66BB6A"; cl = "#2e7d32"; }
            else if (isSel) { bg = "#ffcdd2"; bd = "#ef5350"; cl = "#c62828"; }
          }
          return (
            <button key={i} onClick={() => pick(opt)} style={{
              background:bg, border:`2px solid ${bd}`, borderRadius:14, padding:"12px 14px",
              fontSize:15, fontWeight:600, color:cl, cursor: sel !== null ? "default" : "pointer",
              transition:"all 0.2s", transform: isSel ? "scale(1.03)" : "scale(1)",
              boxShadow: isSel ? "0 3px 12px rgba(0,0,0,0.12)" : "0 2px 6px rgba(0,0,0,0.05)",
              display:"flex", alignItems:"center", gap:8
            }}>
              {sel !== null && isCorrect && "✅ "}
              {sel !== null && isSel && !isCorrect && "❌ "}
              {ANIMALS.find(a => a.name === opt)?.emoji} {opt}
            </button>
          );
        })}
      </div>

      <style>{`@keyframes qasPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
    </div>
  );
}

/* =================== WIRED LEARN MODE =================== */
function AnimalLearnMode(props) {
  return (
    <LearnMode
      {...props}
      data={ANIMALS}
      frontGradient="linear-gradient(135deg,#f5af19,#f12711)"
      backGradient="linear-gradient(135deg,#6c5ce7,#a29bfe)"
      progressGradient="linear-gradient(90deg,#f5af19,#f12711)"
      navColor="#f5af19"
      renderFront={(a) => (
        <>
          <div style={{ fontSize:64, marginBottom:8 }}>{a.emoji}</div>
          <div style={{ fontSize:28, fontWeight:800, textAlign:"center" }}>{a.name}</div>
          <div style={{ fontSize:12, marginTop:12, background:"rgba(255,255,255,0.2)", padding:"4px 14px", borderRadius:20 }}>
            {a.category} · {a.habitat}
          </div>
        </>
      )}
      renderBack={(a) => (
        <>
          <div style={{ fontSize:14, opacity:0.8, marginBottom:8 }}>🔍 Pistas de {a.emoji} {a.name}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, width:"100%" }}>
            {a.clues.map((clue, i) => (
              <div key={i} style={{
                background:"rgba(255,255,255,0.15)", borderRadius:10, padding:"6px 10px",
                fontSize:12, lineHeight:1.4
              }}>
                <span style={{ opacity:0.6 }}>#{i + 1}</span> {clue}
              </div>
            ))}
          </div>
          <div style={{ fontSize:11, marginTop:10, background:"rgba(255,255,255,0.2)", padding:"6px 12px", borderRadius:12, textAlign:"center", lineHeight:1.4 }}>
            💡 {a.fun}
          </div>
        </>
      )}
    />
  );
}

/* =================== WIRED QUIZ MODE =================== */
function AnimalQuizMode(props) {
  return (
    <QuizMode
      {...props}
      data={ANIMALS}
      questionTypes={QUESTION_TYPES}
      count={15}
      questionGradient="linear-gradient(135deg,#6c5ce7,#a29bfe)"
      progressGradient="linear-gradient(90deg,#f5af19,#f12711)"
      renderQuestion={(q, { selected, pick }) => (
        <>
          <div style={{ background:"linear-gradient(135deg,#6c5ce7,#a29bfe)", borderRadius:20, padding:24, color:"white", textAlign:"center", width:"100%", maxWidth:400 }}>
            <div style={{ fontSize:36, marginBottom:8 }}>{q.item.emoji}</div>
            <div style={{ fontSize:17, fontWeight:700, lineHeight:1.4 }}>{q.prompt}</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, width:"100%", maxWidth:400 }}>
            {q.options.map((o, i) => {
              const ok = o === q.correct;
              const isSel = selected === o;
              let bg = "white", bd = "#ddd", cl = "#333";
              if (selected !== null) {
                if (ok) { bg = "#c8e6c9"; bd = "#66BB6A"; cl = "#2e7d32"; }
                else if (isSel) { bg = "#ffcdd2"; bd = "#ef5350"; cl = "#c62828"; }
              }
              return (
                <button key={i} onClick={() => pick(o)} style={{
                  background:bg, border:`2px solid ${bd}`, borderRadius:16, padding:"14px 10px",
                  fontSize:14, fontWeight:600, color:cl, cursor: selected !== null ? "default" : "pointer",
                  transition:"all 0.3s", transform: isSel ? "scale(1.04)" : "scale(1)",
                  boxShadow: isSel ? "0 4px 15px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)"
                }}>
                  {selected !== null && ok && "✅ "}{selected !== null && isSel && !ok && "❌ "}{o}
                </button>
              );
            })}
          </div>
        </>
      )}
    />
  );
}

/* =================== MAIN COMPONENT =================== */
export default function QueAnimalSoy() {
  const { saveQuiz, saveChallenge, saveLearned } = useGameProgress("que-animal-soy");

  return (
    <GameShell
      config={{
        id: "que-animal-soy",
        title: "¿Qué Animal Soy?",
        icon: "🐾",
        gradient: "linear-gradient(180deg,#fff8f0 0%,#fff5ee 50%,#faf0ff 100%)",
        titleGradient: "linear-gradient(135deg,#f5af19,#f12711)",
        subtitle: "¡Adivina el animal con las pistas! 🔍",
        footer: "20 animales · 5 pistas cada uno · Datos curiosos · ¡A jugar! 🎮",
        emojis: EMOJIS,
        modes: [
          { key:"clue", icon:"🔍", title:"¿Qué animal soy?", desc:"5 pistas progresivas. ¡Menos pistas = más puntos!", gradient:"linear-gradient(135deg,#f5af19,#f12711)", component: ClueMode },
          { key:"learn", icon:"📚", title:"Aprende", desc:"Tarjetas con animales, hábitats y datos curiosos", gradient:"linear-gradient(135deg,#6c5ce7,#a29bfe)", component: AnimalLearnMode },
          { key:"quiz", icon:"🧠", title:"Quiz", desc:"¿Cuánto sabes sobre el reino animal?", gradient:"linear-gradient(135deg,#fd79a8,#e84393)", component: AnimalQuizMode },
          { key:"challenge", icon:"⚡", title:"Desafío Relámpago", desc:"60 segundos. ¡Adivina el animal con las pistas!", gradient:"linear-gradient(135deg,#e17055,#d63031)", component: AnimalChallengeMode },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}
