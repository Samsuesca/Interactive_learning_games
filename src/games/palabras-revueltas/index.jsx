import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────── DATOS DEL JUEGO ───────────────── */

const CATEGORIES = [
  {
    name: "Animales",
    emoji: "🐾",
    color: "#FF6B6B",
    words: [
      { word: "ELEFANTE", hint: "El mamífero terrestre más grande" },
      { word: "COCODRILO", hint: "Reptil con mandíbulas poderosas" },
      { word: "MARIPOSA", hint: "Insecto con alas coloridas" },
      { word: "DELFIN", hint: "Mamífero marino muy inteligente" },
      { word: "JIRAFA", hint: "El animal más alto del mundo" },
      { word: "TORTUGA", hint: "Lleva su casa a cuestas" },
      { word: "CONEJO", hint: "Roedor de orejas largas" },
      { word: "SERPIENTE", hint: "Reptil sin patas" },
      { word: "PINGÜINO", hint: "Ave que no vuela pero nada muy bien" },
      { word: "CANGURO", hint: "Salta y lleva a sus crías en una bolsa" },
      { word: "CABALLO", hint: "Animal de monta noble y veloz" },
      { word: "LAGARTO", hint: "Reptil pequeño que toma sol" },
    ],
  },
  {
    name: "Frutas",
    emoji: "🍎",
    color: "#4ECDC4",
    words: [
      { word: "MANZANA", hint: "Fruta roja o verde muy común" },
      { word: "PLATANO", hint: "Fruta amarilla y alargada" },
      { word: "NARANJA", hint: "Cítrico del mismo nombre que su color" },
      { word: "SANDIA", hint: "Grande, verde por fuera, roja por dentro" },
      { word: "CEREZA", hint: "Fruta pequeña y roja con hueso" },
      { word: "MANGO", hint: "Fruta tropical dulce y jugosa" },
      { word: "DURAZNO", hint: "Fruta aterciopelada con hueso" },
      { word: "GRANADA", hint: "Fruta llena de semillas rojas" },
      { word: "PAPAYA", hint: "Fruta tropical anaranjada" },
      { word: "GUAYABA", hint: "Fruta tropical aromática" },
      { word: "FRESA", hint: "Pequeña, roja y con semillas por fuera" },
      { word: "CIRUELA", hint: "Fruta ovalada de color morado" },
    ],
  },
  {
    name: "Países",
    emoji: "🌍",
    color: "#667eea",
    words: [
      { word: "COLOMBIA", hint: "País sudamericano cafetero" },
      { word: "ARGENTINA", hint: "País del tango y el mate" },
      { word: "MEXICO", hint: "País de los tacos y los mariachis" },
      { word: "BRASIL", hint: "El país más grande de Sudamérica" },
      { word: "ALEMANIA", hint: "País europeo de las salchichas" },
      { word: "AUSTRALIA", hint: "País-continente con canguros" },
      { word: "JAPON", hint: "País del sol naciente" },
      { word: "EGIPTO", hint: "País de las pirámides" },
      { word: "FRANCIA", hint: "País de la Torre Eiffel" },
      { word: "CANADA", hint: "País norteamericano con hoja de arce" },
      { word: "ITALIA", hint: "País de la pizza y la pasta" },
      { word: "PERU", hint: "País de Machu Picchu" },
    ],
  },
  {
    name: "Profesiones",
    emoji: "👩‍💼",
    color: "#F9A825",
    words: [
      { word: "DOCTORA", hint: "Cuida la salud de las personas" },
      { word: "BOMBERO", hint: "Apaga incendios y rescata personas" },
      { word: "MAESTRA", hint: "Enseña en la escuela" },
      { word: "PILOTO", hint: "Vuela aviones" },
      { word: "ABOGADO", hint: "Defiende con la ley" },
      { word: "CHEF", hint: "Cocina platos profesionalmente" },
      { word: "INGENIERA", hint: "Diseña y construye soluciones" },
      { word: "ASTRONAUTA", hint: "Viaja al espacio" },
      { word: "VETERINARIO", hint: "Cuida la salud de los animales" },
      { word: "MUSICO", hint: "Toca instrumentos o canta" },
      { word: "ARQUITECTA", hint: "Diseña edificios y espacios" },
      { word: "PERIODISTA", hint: "Informa sobre las noticias" },
    ],
  },
  {
    name: "Deportes",
    emoji: "⚽",
    color: "#AB47BC",
    words: [
      { word: "FUTBOL", hint: "El deporte más popular del mundo" },
      { word: "NATACION", hint: "Deporte acuático por excelencia" },
      { word: "ATLETISMO", hint: "Correr, saltar y lanzar" },
      { word: "CICLISMO", hint: "Deporte sobre dos ruedas" },
      { word: "VOLEIBOL", hint: "Se juega con red y sin tocar el suelo" },
      { word: "GIMNASIA", hint: "Acrobacias y equilibrio" },
      { word: "ESGRIMA", hint: "Lucha con espadas" },
      { word: "TENIS", hint: "Se juega con raqueta y pelota" },
      { word: "BOXEO", hint: "Combate con puños y guantes" },
      { word: "KARATE", hint: "Arte marcial japonés" },
      { word: "SURF", hint: "Sobre las olas del mar" },
      { word: "PATINAJE", hint: "Deslizarse sobre ruedas o hielo" },
    ],
  },
  {
    name: "Colores",
    emoji: "🎨",
    color: "#e84393",
    words: [
      { word: "AMARILLO", hint: "Color del sol" },
      { word: "VIOLETA", hint: "Mezcla de rojo y azul" },
      { word: "NARANJA", hint: "Color cálido cítrico" },
      { word: "TURQUESA", hint: "Azul verdoso como el mar" },
      { word: "DORADO", hint: "Color del oro" },
      { word: "PLATEADO", hint: "Color de la plata" },
      { word: "CELESTE", hint: "Azul claro como el cielo" },
      { word: "ESCARLATA", hint: "Rojo intenso y brillante" },
      { word: "CARMESI", hint: "Rojo profundo y oscuro" },
      { word: "MAGENTA", hint: "Rosa intenso tirando a púrpura" },
      { word: "ESMERALDA", hint: "Verde intenso como la gema" },
      { word: "MARFIL", hint: "Blanco cálido y cremoso" },
    ],
  },
];

const ALL_WORDS = CATEGORIES.flatMap((cat) =>
  cat.words.map((w) => ({ ...w, category: cat.name, emoji: cat.emoji, color: cat.color }))
);

const EMOJIS = ["🔤", "✨", "🧩", "💡", "🎯", "🔠", "📝", "🌟"];

/* ───────────────── UTILIDADES ───────────────── */

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const scrambleWord = (word) => {
  let scrambled = shuffle(word.split(""));
  // Ensure the scrambled version is different from the original
  let attempts = 0;
  while (scrambled.join("") === word && attempts < 20) {
    scrambled = shuffle(word.split(""));
    attempts++;
  }
  return scrambled;
};

const pill = (bg, c) => ({
  background: bg,
  color: c,
  border: "none",
  borderRadius: 30,
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
});

const circ = (bg) => ({
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 44,
  height: 44,
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
});

/* ───────────────── COMPONENTES COMPARTIDOS ───────────────── */

function Confetti({ active }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    setParticles(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#F9A825", "#AB47BC"][i % 6],
        size: Math.random() * 8 + 4,
      }))
    );
    const timeout = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(timeout);
  }, [active]);

  if (!particles.length) return null;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 999 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: -10,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.size > 8 ? "50%" : "2px",
            animation: `confetti-fall 1.5s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity:1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity:0; }
        }
      `}</style>
    </div>
  );
}

function Stars({ score, total }) {
  const stars = total > 0 ? (score / total >= 0.9 ? 3 : score / total >= 0.6 ? 2 : score / total > 0 ? 1 : 0) : 0;
  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center", fontSize: 32 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ opacity: i < stars ? 1 : 0.25 }}>
          {i < stars ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

function ProgressBar({ value, max }) {
  return (
    <div style={{ width: "100%", height: 10, background: "#e0e0e0", borderRadius: 5, overflow: "hidden" }}>
      <div
        style={{
          width: `${max > 0 ? (value / max) * 100 : 0}%`,
          height: "100%",
          background: "linear-gradient(90deg,#F9A825,#FF6B6B)",
          borderRadius: 5,
          transition: "width 0.5s",
        }}
      />
    </div>
  );
}

/* ───────────────── LETTER TILE ───────────────── */

function LetterTile({ letter, index, onClick, disabled, state }) {
  let bg = "linear-gradient(135deg,#667eea,#764ba2)";
  let shadow = "0 4px 12px rgba(102,126,234,0.35)";
  let transform = "scale(1)";

  if (state === "placed") {
    bg = "#ccc";
    shadow = "none";
    transform = "scale(0.9)";
  } else if (state === "correct") {
    bg = "linear-gradient(135deg,#11998e,#38ef7d)";
    shadow = "0 4px 12px rgba(17,153,142,0.35)";
  } else if (state === "wrong") {
    bg = "linear-gradient(135deg,#f5af19,#f12711)";
    shadow = "0 4px 12px rgba(241,39,17,0.35)";
  }

  return (
    <button
      onClick={() => !disabled && onClick(index)}
      disabled={disabled}
      style={{
        background: bg,
        color: state === "placed" ? "#999" : "#fff",
        border: "none",
        borderRadius: 12,
        width: 44,
        height: 52,
        fontSize: 22,
        fontWeight: 800,
        cursor: disabled ? "default" : "pointer",
        boxShadow: shadow,
        transition: "all 0.2s",
        transform,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {letter}
    </button>
  );
}

/* ───────────────── ANSWER SLOT ───────────────── */

function AnswerSlot({ letter, index, onClick, highlight }) {
  let borderColor = "#ddd";
  let bg = "white";

  if (highlight === "correct") {
    borderColor = "#66BB6A";
    bg = "#c8e6c9";
  } else if (highlight === "wrong") {
    borderColor = "#ef5350";
    bg = "#ffcdd2";
  } else if (letter) {
    borderColor = "#667eea";
    bg = "#f0f0ff";
  }

  return (
    <button
      onClick={() => letter && onClick(index)}
      style={{
        width: 40,
        height: 48,
        border: `2px dashed ${borderColor}`,
        borderRadius: 10,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        fontWeight: 800,
        color: "#333",
        cursor: letter ? "pointer" : "default",
        transition: "all 0.2s",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {letter || ""}
    </button>
  );
}

/* ───────────────── WORD PUZZLE COMPONENT ───────────────── */

function WordPuzzle({ wordData, onSolved, onFailed, timeLimit, showHint, showCategory }) {
  const { word } = wordData;
  const [scrambled] = useState(() => scrambleWord(word));
  const [placed, setPlaced] = useState(Array(word.length).fill(null));
  const [sourceUsed, setSourceUsed] = useState(Array(scrambled.length).fill(false));
  const [time, setTime] = useState(timeLimit);
  const [status, setStatus] = useState("playing"); // playing | solved | failed
  const [highlight, setHighlight] = useState(null); // null | correct | wrong
  const timerRef = useRef(null);

  const onFailedRef = useRef(onFailed);
  useEffect(() => { onFailedRef.current = onFailed; }, [onFailed]);

  useEffect(() => {
    if (status !== "playing") return;
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setStatus("failed");
          setHighlight("wrong");
          setTimeout(() => onFailedRef.current(), 1200);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [status]);

  const nextEmptySlot = placed.indexOf(null);

  const placeLetter = useCallback(
    (sourceIndex) => {
      if (status !== "playing") return;
      const slot = placed.indexOf(null);
      if (slot === -1) return;

      const newPlaced = [...placed];
      newPlaced[slot] = { letter: scrambled[sourceIndex], sourceIndex };
      setPlaced(newPlaced);

      const newUsed = [...sourceUsed];
      newUsed[sourceIndex] = true;
      setSourceUsed(newUsed);

      // Check if word is complete
      if (slot === word.length - 1) {
        clearInterval(timerRef.current);
        const answer = newPlaced.map((p) => p.letter).join("");
        if (answer === word) {
          setStatus("solved");
          setHighlight("correct");
          setTimeout(() => onSolved(time), 800);
        } else {
          setStatus("failed");
          setHighlight("wrong");
        }
      }
    },
    [status, placed, scrambled, sourceUsed, word, time, onSolved]
  );

  const removeLetter = useCallback(
    (slotIndex) => {
      if (status !== "playing") return;
      const entry = placed[slotIndex];
      if (!entry) return;

      // Remove this and all letters after it
      const newPlaced = [...placed];
      const newUsed = [...sourceUsed];
      for (let i = slotIndex; i < newPlaced.length; i++) {
        if (newPlaced[i]) {
          newUsed[newPlaced[i].sourceIndex] = false;
          newPlaced[i] = null;
        }
      }
      setPlaced(newPlaced);
      setSourceUsed(newUsed);
    },
    [status, placed, sourceUsed]
  );

  const clearAll = () => {
    if (status !== "playing") return;
    setPlaced(Array(word.length).fill(null));
    setSourceUsed(Array(scrambled.length).fill(false));
  };

  const timerColor = time <= 5 ? "#f12711" : time <= 10 ? "#F9A825" : "#11998e";
  const timerPulse = time <= 5 && status === "playing";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      {/* Timer */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        style={{
          fontSize: 36,
          fontWeight: 900,
          color: timerColor,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
          animation: timerPulse ? "pulse-timer 0.5s ease-in-out infinite alternate" : "none",
        }}
      >
        {time}s
      </div>

      {/* Category & Hint */}
      {showCategory && (
        <div style={{ ...pill("#f0f0f0", "#555"), fontSize: 12, padding: "6px 14px" }}>
          {wordData.emoji} {wordData.category}
        </div>
      )}
      {showHint && (
        <div
          style={{
            fontSize: 13,
            color: "#888",
            textAlign: "center",
            fontStyle: "italic",
            padding: "0 10px",
          }}
        >
          💡 {wordData.hint}
        </div>
      )}

      {/* Answer slots */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {placed.map((entry, i) => (
          <AnswerSlot
            key={i}
            letter={entry?.letter || ""}
            index={i}
            onClick={removeLetter}
            highlight={
              highlight === "correct"
                ? "correct"
                : highlight === "wrong"
                  ? "wrong"
                  : i === nextEmptySlot
                    ? null
                    : null
            }
          />
        ))}
      </div>

      {/* Scrambled letters */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        {scrambled.map((letter, i) => (
          <LetterTile
            key={i}
            letter={letter}
            index={i}
            onClick={placeLetter}
            disabled={sourceUsed[i] || status !== "playing"}
            state={sourceUsed[i] ? "placed" : status === "solved" ? "correct" : status === "failed" ? "wrong" : null}
          />
        ))}
      </div>

      {/* Clear button */}
      {status === "playing" && placed.some((p) => p !== null) && (
        <button onClick={clearAll} style={{ ...pill("transparent", "#999"), border: "1px solid #ddd", fontSize: 12 }}>
          🔄 Borrar todo
        </button>
      )}

      {/* Show correct answer on failure */}
      {status === "failed" && (
        <div style={{ textAlign: "center", marginTop: 4 }}>
          <div style={{ fontSize: 13, color: "#999" }}>La respuesta era:</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#667eea", letterSpacing: 2 }}>{word}</div>
        </div>
      )}

      <style>{`
        @keyframes pulse-timer {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

/* ───────────────── MODO EXPLORAR (Categorías) ───────────────── */

function ExploreMode({ onBack }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(new Set());

  if (!selectedCat) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <button onClick={onBack} style={circ("linear-gradient(135deg,#667eea,#764ba2)")}>←</button>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#333" }}>🗂️ Explorar Categorías</h2>
        </div>
        <p style={{ fontSize: 14, color: "#888", margin: "0 0 8px" }}>
          Elige una categoría para ver las palabras y practicar
        </p>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setSelectedCat(cat);
              setCurrentIndex(0);
              setFlipped(false);
              setLearned(new Set());
            }}
            style={{
              background: `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)`,
              color: "white",
              border: "none",
              borderRadius: 16,
              padding: "18px 20px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: `0 4px 15px ${cat.color}44`,
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span style={{ fontSize: 28 }}>{cat.emoji}</span>
            <div style={{ textAlign: "left" }}>
              <div>{cat.name}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{cat.words.length} palabras</div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  const words = selectedCat.words;
  const current = words[currentIndex];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setSelectedCat(null)} style={circ(`linear-gradient(135deg, ${selectedCat.color}, ${selectedCat.color}dd)`)}>←</button>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#333" }}>
            {selectedCat.emoji} {selectedCat.name}
          </h2>
          <div style={{ fontSize: 12, color: "#999" }}>
            {currentIndex + 1} de {words.length} · {learned.size} aprendidas
          </div>
        </div>
      </div>

      <ProgressBar value={learned.size} max={words.length} />

      {/* Flashcard */}
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          perspective: 600,
          cursor: "pointer",
          minHeight: 200,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: 200,
            transition: "transform 0.6s",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
          }}
        >
          {/* Front */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              minHeight: 200,
              backfaceVisibility: "hidden",
              background: "white",
              borderRadius: 20,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              border: `2px solid ${selectedCat.color}33`,
            }}
          >
            <div style={{ fontSize: 14, color: "#999" }}>Toca para ver la pista</div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: 4,
                color: selectedCat.color,
                textAlign: "center",
              }}
            >
              {current.word}
            </div>
            <div style={{ ...pill(`${selectedCat.color}22`, selectedCat.color), fontSize: 12 }}>
              {selectedCat.emoji} {selectedCat.name}
            </div>
          </div>

          {/* Back */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              minHeight: 200,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: `linear-gradient(135deg, ${selectedCat.color}, ${selectedCat.color}cc)`,
              borderRadius: 20,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              color: "white",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.8 }}>Pista:</div>
            <div style={{ fontSize: 18, fontWeight: 700, textAlign: "center" }}>
              💡 {current.hint}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: 3,
                marginTop: 8,
              }}
            >
              {current.word}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => {
            setCurrentIndex((i) => (i > 0 ? i - 1 : words.length - 1));
            setFlipped(false);
          }}
          style={circ("#e0e0e0")}
        >
          ◀
        </button>
        <button
          onClick={() => {
            setLearned((s) => {
              const n = new Set(s);
              n.add(current.word);
              return n;
            });
            if (currentIndex < words.length - 1) {
              setCurrentIndex((i) => i + 1);
              setFlipped(false);
            }
          }}
          style={{
            ...pill(
              learned.has(current.word)
                ? "#e0e0e0"
                : `linear-gradient(135deg,#11998e,#38ef7d)`,
              learned.has(current.word) ? "#999" : "#fff"
            ),
          }}
        >
          {learned.has(current.word) ? "✓ Aprendida" : "✅ Marcar aprendida"}
        </button>
        <button
          onClick={() => {
            setCurrentIndex((i) => (i < words.length - 1 ? i + 1 : 0));
            setFlipped(false);
          }}
          style={circ("#e0e0e0")}
        >
          ▶
        </button>
      </div>

      {learned.size === words.length && (
        <div
          style={{
            textAlign: "center",
            padding: 16,
            background: "#c8e6c9",
            borderRadius: 16,
            fontSize: 15,
            fontWeight: 700,
            color: "#2e7d32",
          }}
        >
          🎉 ¡Aprendiste todas las palabras de {selectedCat.name}!
        </div>
      )}
    </div>
  );
}

/* ───────────────── MODO APRENDER (Práctica libre) ───────────────── */

function LearnMode({ onBack }) {
  const [category, setCategory] = useState(null);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(0);

  const startCategory = (cat) => {
    setCategory(cat);
    setWords(shuffle(cat.words).slice(0, 8));
    setCurrentIndex(0);
    setScore(0);
    setDone(false);
  };

  if (!category) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <button onClick={onBack} style={circ("linear-gradient(135deg,#6c5ce7,#a29bfe)")}>←</button>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#333" }}>📚 Aprender</h2>
        </div>
        <p style={{ fontSize: 14, color: "#888", margin: "0 0 8px" }}>
          Ordena las letras con calma. 30 segundos por palabra, con pista.
        </p>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => startCategory(cat)}
            style={{
              background: `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)`,
              color: "white",
              border: "none",
              borderRadius: 16,
              padding: "18px 20px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: `0 4px 15px ${cat.color}44`,
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span style={{ fontSize: 28 }}>{cat.emoji}</span>
            <div style={{ textAlign: "left" }}>
              <div>{cat.name}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>8 palabras · 30s cada una</div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  if (done) {
    const total = words.length;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>📚</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#333" }}>¡Práctica completa!</h2>
        <Stars score={score} total={total} />
        <div style={{ fontSize: 18, fontWeight: 700, color: "#667eea" }}>
          {score}/{total} palabras correctas
        </div>
        <div style={{ fontSize: 14, color: "#888" }}>
          {score === total
            ? "🏆 ¡Perfecto! Dominaste esta categoría"
            : score >= total * 0.6
              ? "💪 ¡Muy bien! Sigue practicando"
              : "📚 ¡No te rindas! Practica de nuevo"}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => startCategory(category)} style={pill("linear-gradient(135deg,#6c5ce7,#a29bfe)", "#fff")}>
            🔄 Repetir
          </button>
          <button onClick={() => setCategory(null)} style={pill("#f0f0f0", "#555")}>
            🗂️ Categorías
          </button>
          <button onClick={onBack} style={pill("#f0f0f0", "#555")}>
            🏠 Menú
          </button>
        </div>
      </div>
    );
  }

  const currentWord = { ...words[currentIndex], category: category.name, emoji: category.emoji, color: category.color };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Confetti active={confetti} />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setCategory(null)} style={circ(`linear-gradient(135deg, ${category.color}, ${category.color}dd)`)}>←</button>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#333" }}>
            {category.emoji} {category.name}
          </h2>
          <div style={{ fontSize: 12, color: "#999" }}>
            Palabra {currentIndex + 1} de {words.length} · Puntaje: {score}
          </div>
        </div>
      </div>

      <ProgressBar value={currentIndex} max={words.length} />

      <WordPuzzle
        key={currentIndex}
        wordData={currentWord}
        timeLimit={30}
        showHint={true}
        showCategory={false}
        onSolved={() => {
          setScore((s) => s + 1);
          setConfetti((c) => c + 1);
          if (currentIndex + 1 >= words.length) {
            setDone(true);
          } else {
            setCurrentIndex((i) => i + 1);
          }
        }}
        onFailed={() => {
          if (currentIndex + 1 >= words.length) {
            setDone(true);
          } else {
            setCurrentIndex((i) => i + 1);
          }
        }}
      />
    </div>
  );
}

/* ───────────────── MODO QUIZ ───────────────── */

const QUIZ_TOTAL = 12;

function QuizMode({ onBack }) {
  const [words, setWords] = useState(() => shuffle(ALL_WORDS).slice(0, QUIZ_TOTAL));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(0);

  const reset = () => {
    setWords(shuffle(ALL_WORDS).slice(0, QUIZ_TOTAL));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setDone(false);
  };

  if (done) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🧠</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#333" }}>¡Quiz completo!</h2>
        <Stars score={score} total={QUIZ_TOTAL} />
        <div style={{ fontSize: 22, fontWeight: 700, color: "#667eea" }}>
          {score}/{QUIZ_TOTAL}
        </div>
        <div style={{ fontSize: 14, color: "#888" }}>
          {score >= QUIZ_TOTAL * 0.9
            ? "🏆 ¡Eres un genio de las palabras!"
            : score >= QUIZ_TOTAL * 0.6
              ? "💪 ¡Muy bien! Sigues mejorando"
              : "📚 ¡Practica más y lo lograrás!"}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={reset} style={pill("linear-gradient(135deg,#f093fb,#f5576c)", "#fff")}>
            🔄 Jugar de nuevo
          </button>
          <button onClick={onBack} style={pill("#f0f0f0", "#555")}>
            🏠 Menú
          </button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Confetti active={confetti} />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={circ("linear-gradient(135deg,#f093fb,#f5576c)")}>←</button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#333" }}>
            🧠 Quiz · Palabra {currentIndex + 1}/{QUIZ_TOTAL}
          </h2>
          <div aria-live="polite" style={{ fontSize: 12, color: "#999" }}>
            Puntaje: {score} {streak >= 3 ? `· 🔥 Racha: ${streak}` : ""}
          </div>
        </div>
      </div>

      <ProgressBar value={currentIndex} max={QUIZ_TOTAL} />

      <WordPuzzle
        key={currentIndex}
        wordData={currentWord}
        timeLimit={30}
        showHint={true}
        showCategory={true}
        onSolved={() => {
          setScore((s) => s + 1);
          setStreak((s) => s + 1);
          setConfetti((c) => c + 1);
          if (currentIndex + 1 >= QUIZ_TOTAL) {
            setDone(true);
          } else {
            setCurrentIndex((i) => i + 1);
          }
        }}
        onFailed={() => {
          setStreak(0);
          if (currentIndex + 1 >= QUIZ_TOTAL) {
            setDone(true);
          } else {
            setCurrentIndex((i) => i + 1);
          }
        }}
      />
    </div>
  );
}

/* ───────────────── MODO DESAFÍO (Contrarreloj) ───────────────── */

function ChallengeMode({ onBack }) {
  const [status, setStatus] = useState("ready"); // ready | playing | done
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [globalTime, setGlobalTime] = useState(60);
  const [confetti, setConfetti] = useState(0);
  const [wordKey, setWordKey] = useState(0);
  const globalTimerRef = useRef(null);

  const start = () => {
    setWords(shuffle(ALL_WORDS));
    setCurrentIndex(0);
    setScore(0);
    setGlobalTime(60);
    setStatus("playing");
    setWordKey(0);
  };

  useEffect(() => {
    if (status !== "playing") return;
    globalTimerRef.current = setInterval(() => {
      setGlobalTime((t) => {
        if (t <= 1) {
          clearInterval(globalTimerRef.current);
          setStatus("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(globalTimerRef.current);
  }, [status]);

  if (status === "ready") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, alignSelf: "flex-start" }}>
          <button onClick={onBack} style={circ("linear-gradient(135deg,#f5af19,#f12711)")}>←</button>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#333" }}>⚡ Desafío Contrarreloj</h2>
        </div>
        <div style={{ fontSize: 64 }}>⚡</div>
        <p style={{ fontSize: 15, color: "#666", lineHeight: 1.6 }}>
          Tienes <strong>60 segundos</strong> para resolver la mayor cantidad de palabras.
          Cada palabra tiene <strong>30 segundos</strong> como límite individual.
          <br />
          ¡Sin pistas! ¿Cuántas puedes resolver?
        </p>
        <button onClick={start} style={{ ...pill("linear-gradient(135deg,#f5af19,#f12711)", "#fff"), fontSize: 18, padding: "14px 40px" }}>
          🚀 ¡Comenzar!
        </button>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
        <Confetti active={score > 0 ? 1 : 0} />
        <div style={{ fontSize: 48 }}>⚡</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#333" }}>¡Tiempo!</h2>
        <Stars score={score} total={Math.max(score, 5)} />
        <div style={{ fontSize: 28, fontWeight: 900, color: "#f12711" }}>
          {score} {score === 1 ? "palabra" : "palabras"}
        </div>
        <div style={{ fontSize: 14, color: "#888" }}>
          {score >= 8
            ? "🏆 ¡Increíble velocidad mental!"
            : score >= 5
              ? "💪 ¡Muy rápido! Puedes mejorar"
              : score >= 2
                ? "👍 ¡Buen intento! Sigue practicando"
                : "📚 ¡No te rindas! Practica y mejora"}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={start} style={pill("linear-gradient(135deg,#f5af19,#f12711)", "#fff")}>
            🔄 Intentar de nuevo
          </button>
          <button onClick={onBack} style={pill("#f0f0f0", "#555")}>
            🏠 Menú
          </button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex % words.length];
  const timerColor = globalTime <= 10 ? "#f12711" : globalTime <= 30 ? "#F9A825" : "#11998e";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Confetti active={confetti} />

      {/* Header with global timer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => { clearInterval(globalTimerRef.current); setStatus("done"); }} style={circ("linear-gradient(135deg,#f5af19,#f12711)")}>⏹</button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#333" }}>⚡ Desafío</div>
            <div style={{ fontSize: 12, color: "#999" }}>Resueltas: {score}</div>
          </div>
        </div>
        <div
          aria-live="assertive"
          aria-atomic="true"
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: timerColor,
            fontVariantNumeric: "tabular-nums",
            animation: globalTime <= 10 ? "pulse-timer 0.5s ease-in-out infinite alternate" : "none",
          }}
        >
          ⏱️ {globalTime}s
        </div>
      </div>

      <WordPuzzle
        key={wordKey}
        wordData={currentWord}
        timeLimit={30}
        showHint={false}
        showCategory={true}
        onSolved={() => {
          setScore((s) => s + 1);
          setConfetti((c) => c + 1);
          setCurrentIndex((i) => i + 1);
          setWordKey((k) => k + 1);
        }}
        onFailed={() => {
          setCurrentIndex((i) => i + 1);
          setWordKey((k) => k + 1);
        }}
      />

      <style>{`
        @keyframes pulse-timer {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}

/* ───────────────── MENÚ PRINCIPAL ───────────────── */

export default function PalabrasRevueltas() {
  const [screen, setScreen] = useState("menu");
  const [floats, setFloats] = useState([]);

  useEffect(() => {
    if (screen !== "menu") return;
    const iv = setInterval(() => {
      setFloats((f) =>
        [
          ...f,
          {
            id: Date.now(),
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            x: Math.random() * 90 + 5,
          },
        ].slice(-8)
      );
    }, 1800);
    return () => clearInterval(iv);
  }, [screen]);

  const screens = {
    explore: ExploreMode,
    learn: LearnMode,
    quiz: QuizMode,
    challenge: ChallengeMode,
  };

  const Screen = screens[screen];

  if (Screen) {
    return (
      <div style={gameCtn}>
        <Screen onBack={() => setScreen("menu")} />
      </div>
    );
  }

  const modes = [
    {
      key: "explore",
      icon: "🗂️",
      title: "Explorar",
      desc: "Descubre las palabras por categoría con tarjetas",
      gradient: "linear-gradient(135deg,#11998e,#38ef7d)",
    },
    {
      key: "learn",
      icon: "📚",
      title: "Aprender",
      desc: "Practica ordenando letras con pistas y tiempo",
      gradient: "linear-gradient(135deg,#6c5ce7,#a29bfe)",
    },
    {
      key: "quiz",
      icon: "🧠",
      title: "Quiz",
      desc: `${QUIZ_TOTAL} palabras aleatorias de todas las categorías`,
      gradient: "linear-gradient(135deg,#f093fb,#f5576c)",
    },
    {
      key: "challenge",
      icon: "⚡",
      title: "Desafío",
      desc: "60 segundos, sin pistas. ¿Cuántas resuelves?",
      gradient: "linear-gradient(135deg,#f5af19,#f12711)",
    },
  ];

  return (
    <div style={gameCtn}>
      {/* Floating emojis */}
      {floats.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.x}%`,
            top: -30,
            fontSize: 22,
            opacity: 0.15,
            pointerEvents: "none",
            animation: "float-up 4s linear forwards",
          }}
        >
          {f.emoji}
        </div>
      ))}

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 56, marginBottom: 4 }}>🔤</div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Palabras Revueltas
        </h1>
        <p style={{ fontSize: 14, color: "#888", margin: "6px 0 0" }}>
          ¡Ordena las letras y forma la palabra correcta!
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <span
              key={cat.name}
              style={{
                background: `${cat.color}22`,
                color: cat.color,
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 20,
              }}
            >
              {cat.emoji} {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Mode buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", position: "relative", zIndex: 1 }}>
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setScreen(m.key)}
            style={{
              background: m.gradient,
              color: "white",
              border: "none",
              borderRadius: 18,
              padding: "18px 20px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
              transition: "transform 0.2s",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span style={{ fontSize: 30 }}>{m.icon}</span>
            <div>
              <div>{m.title}</div>
              <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>{m.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Back to home */}
      <a
        href="/"
        style={{
          fontSize: 13,
          color: "#aaa",
          textDecoration: "none",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        ← Volver al menú principal
      </a>

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0.15; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ───────────────── ESTILOS ───────────────── */

const gameCtn = {
  fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
  maxWidth: 640,
  margin: "0 auto",
  padding: "24px 12px",
  minHeight: "100vh",
  background: "linear-gradient(180deg,#f0f0ff 0%,#fff5f5 50%,#f5f0ff 100%)",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};
