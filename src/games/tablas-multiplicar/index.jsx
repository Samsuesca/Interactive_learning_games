import { useState, Fragment } from "react";
import useGameRewards from "../../hooks/useGameRewards";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { OptionButton } from "../../components/game";
import { pill } from "../../components/game/utils";

/* ───────── DATOS DEL JUEGO ───────── */

const TABLES_DATA = [];
for (let a = 1; a <= 12; a++) {
  for (let b = 1; b <= 12; b++) {
    TABLES_DATA.push({
      a,
      b,
      result: a * b,
      expression: `${a} × ${b}`,
      name: `${a}x${b}`,
    });
  }
}

/* ───────── LEARN DATA (subset: harder facts) ───────── */

const HARD_MULTIPLIERS = [6, 7, 8, 9, 11, 12];
const LEARN_DATA = TABLES_DATA.filter(
  (t) => HARD_MULTIPLIERS.includes(t.a) && HARD_MULTIPLIERS.includes(t.b)
);

/* ───────── COLOR UTILITIES ───────── */

function cellColor(value) {
  const min = 1;
  const max = 144;
  const ratio = (value - min) / (max - min);
  // Light blue → deep orange heat map
  const r = Math.round(66 + ratio * (255 - 66));
  const g = Math.round(165 + ratio * (111 - 165));
  const b = Math.round(245 + ratio * (0 - 245));
  return `rgb(${r},${g},${b})`;
}

function cellTextColor(value) {
  return value > 72 ? "#fff" : "#1a237e";
}

/* ───────── QUESTION TYPES ───────── */

const QUESTION_TYPES = [
  {
    // Type 1: "¿Cuánto es 7 × 8?" → "56"
    prompt: (item) => `¿Cuánto es ${item.a} × ${item.b}?`,
    answer: (item) => String(item.result),
  },
  {
    // Type 2: "Completa: 9 × ___ = 72" → "8"
    prompt: (item) => `Completa: ${item.a} × ___ = ${item.result}`,
    answer: (item) => String(item.b),
  },
  {
    // Type 3: "¿Cuánto es 4 × 11?" → "44" (reverse order variation)
    prompt: (item) => `${item.a} × ${item.b} = ?`,
    answer: (item) => String(item.result),
  },
];

/* ───────── CUSTOM QUESTION RENDERER ───────── */

function renderMathQuestion(q, { selected, pick }) {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg,#1a237e,#283593)",
          borderRadius: 20,
          padding: 24,
          color: "white",
          textAlign: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 1 }}>
          {q.prompt}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {q.options.map((o) => (
          <OptionButton
            key={o}
            text={o}
            selected={selected}
            correct={q.correct}
            onClick={() => pick(o)}
          />
        ))}
      </div>
    </>
  );
}

/* ───────── EXPLORE MODE ───────── */

function ExploreMode({ onBack }) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const headerStyle = {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 12,
    color: "#fff",
    background: "linear-gradient(135deg,#FF6F00,#F4511E)",
    borderRadius: 6,
    cursor: "pointer",
    transition: "all 0.2s",
    border: "none",
    padding: 0,
    flexShrink: 0,
  };

  const isHighlighted = (r, c) => {
    if (selectedTable !== null) return r === selectedTable || c === selectedTable;
    if (hoveredCell) return hoveredCell.r === r || hoveredCell.c === c;
    return false;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "0 4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 440, alignItems: "center" }}>
        <button onClick={onBack} style={pill("rgba(255,255,255,0.85)", "#333")}>
          ◀ Menú
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
          🔢 Tabla Interactiva
        </h2>
      </div>

      {/* Table filter buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 440 }}>
        <button
          onClick={() => setSelectedTable(null)}
          style={{
            ...pill(
              selectedTable === null
                ? "linear-gradient(135deg,#FF6F00,#F4511E)"
                : "rgba(255,255,255,0.85)",
              selectedTable === null ? "#fff" : "#333"
            ),
            fontSize: 11,
            padding: "6px 12px",
          }}
        >
          Todas
        </button>
        {numbers.map((n) => (
          <button
            key={n}
            onClick={() => setSelectedTable(selectedTable === n ? null : n)}
            style={{
              ...pill(
                selectedTable === n
                  ? "linear-gradient(135deg,#FF6F00,#F4511E)"
                  : "rgba(255,255,255,0.85)",
                selectedTable === n ? "#fff" : "#333"
              ),
              fontSize: 11,
              padding: "6px 10px",
              minWidth: 32,
            }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Selected table detail view */}
      {selectedTable !== null && (
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 20,
            width: "100%",
            maxWidth: 380,
            boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
            animation: "tmFadeIn .3s",
          }}
        >
          <style>{`@keyframes tmFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#1a237e",
              margin: "0 0 14px",
              textAlign: "center",
            }}
          >
            Tabla del {selectedTable}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {numbers.map((n) => {
              const result = selectedTable * n;
              return (
                <div
                  key={n}
                  style={{
                    background: `linear-gradient(135deg, ${cellColor(result)}22, ${cellColor(result)}44)`,
                    borderRadius: 12,
                    padding: "10px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: `2px solid ${cellColor(result)}66`,
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>
                    {selectedTable} × {n}
                  </span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#1a237e" }}>
                    = {result}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive 12×12 grid */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 10,
          boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
          overflowX: "auto",
          width: "100%",
          maxWidth: 440,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "32px repeat(12, 32px)",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {/* Top-left corner */}
          <div
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 14,
              color: "#1a237e",
            }}
          >
            ×
          </div>
          {/* Column headers */}
          {numbers.map((c) => (
            <button
              key={`ch-${c}`}
              onClick={() => setSelectedTable(selectedTable === c ? null : c)}
              style={{
                ...headerStyle,
                background:
                  selectedTable === c
                    ? "linear-gradient(135deg,#1a237e,#283593)"
                    : "linear-gradient(135deg,#FF6F00,#F4511E)",
                transform: selectedTable === c ? "scale(1.1)" : "scale(1)",
              }}
            >
              {c}
            </button>
          ))}

          {/* Rows */}
          {numbers.map((r) => (
            <Fragment key={`row-${r}`}>
              {/* Row header */}
              <button
                onClick={() => setSelectedTable(selectedTable === r ? null : r)}
                style={{
                  ...headerStyle,
                  background:
                    selectedTable === r
                      ? "linear-gradient(135deg,#1a237e,#283593)"
                      : "linear-gradient(135deg,#FF6F00,#F4511E)",
                  transform: selectedTable === r ? "scale(1.1)" : "scale(1)",
                }}
              >
                {r}
              </button>
              {/* Data cells */}
              {numbers.map((c) => {
                const value = r * c;
                const highlighted = isHighlighted(r, c);
                return (
                  <div
                    key={`${r}-${c}`}
                    onMouseEnter={() => setHoveredCell({ r, c })}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: highlighted ? 800 : 600,
                      color: highlighted ? "#fff" : cellTextColor(value),
                      background: highlighted
                        ? "linear-gradient(135deg,#1a237e,#3949ab)"
                        : cellColor(value),
                      borderRadius: 5,
                      cursor: "default",
                      transition: "all 0.15s",
                      transform: highlighted ? "scale(1.08)" : "scale(1)",
                      boxShadow: highlighted
                        ? "0 2px 8px rgba(26,35,126,0.3)"
                        : "none",
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {hoveredCell && (
        <div
          style={{
            background: "linear-gradient(135deg,#1a237e,#283593)",
            color: "#fff",
            borderRadius: 14,
            padding: "10px 20px",
            fontSize: 18,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {hoveredCell.r} × {hoveredCell.c} = {hoveredCell.r * hoveredCell.c}
        </div>
      )}
    </div>
  );
}

/* ───────── WIRED LEARN MODE ───────── */

function TMLearnMode(props) {
  return (
    <LearnMode
      {...props}
      data={LEARN_DATA}
      frontGradient="linear-gradient(135deg,#1a237e,#283593)"
      backGradient="linear-gradient(135deg,#FF6F00,#F4511E)"
      progressGradient="linear-gradient(90deg,#FF6F00,#F4511E)"
      navColor="#1a237e"
      renderFront={(item) => (
        <>
          <div style={{ fontSize: 18, opacity: 0.8, marginBottom: 8 }}>
            ¿Cuánto es...?
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: 2 }}>
            {item.a} × {item.b}
          </div>
          <div style={{ fontSize: 14, opacity: 0.7, marginTop: 12 }}>
            Tabla del {item.a}
          </div>
        </>
      )}
      renderBack={(item) => (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, opacity: 0.9, marginBottom: 8 }}>
            {item.a} × {item.b}
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, marginBottom: 16 }}>
            = {item.result}
          </div>
          {/* Visual dot grid (limited to reasonable size) */}
          {item.a <= 9 && item.b <= 9 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                alignItems: "center",
              }}
            >
              {Array.from({ length: item.a }, (_, r) => (
                <div key={r} style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: item.b }, (_, c) => (
                    <div
                      key={c}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.85)",
                      }}
                    />
                  ))}
                </div>
              ))}
              <div style={{ fontSize: 11, opacity: 0.75, marginTop: 6 }}>
                {item.a} filas × {item.b} columnas = {item.result} puntos
              </div>
            </div>
          )}
          {(item.a > 9 || item.b > 9) && (
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>
              {item.a} grupos de {item.b} = {item.result}
            </div>
          )}
        </div>
      )}
    />
  );
}

/* ───────── WIRED QUIZ MODE ───────── */

function TMQuizMode(props) {
  return (
    <QuizMode
      {...props}
      data={TABLES_DATA}
      questionTypes={QUESTION_TYPES}
      count={15}
      questionGradient="linear-gradient(135deg,#1a237e,#283593)"
      progressGradient="linear-gradient(90deg,#FF6F00,#F4511E)"
      renderQuestion={renderMathQuestion}
    />
  );
}

/* ───────── WIRED CHALLENGE MODE ───────── */

function TMChallengeMode(props) {
  return (
    <ChallengeMode
      {...props}
      data={TABLES_DATA}
      questionTypes={QUESTION_TYPES}
      timeLimit={60}
      poolSize={120}
      questionGradient="linear-gradient(135deg,#1a237e,#283593)"
      renderQuestion={renderMathQuestion}
    />
  );
}

/* ───────── MAIN COMPONENT ───────── */

export default function TablasMultiplicar() {
  const { progress, saveQuiz, saveChallenge, saveLearned } =
    useGameRewards("tablas-multiplicar");

  return (
    <GameShell
      config={{
        id: "tablas-multiplicar",
        title: "Tablas de Multiplicar",
        icon: "✖️",
        gradient:
          "linear-gradient(180deg,#1a237e 0%,#283593 50%,#3949ab 100%)",
        titleGradient: "linear-gradient(135deg,#FF6F00,#F4511E)",
        subtitle: "Domina las tablas del 1 al 12",
        footer: "12 tablas · 144 operaciones · Quiz · Desafío",
        emojis: ["🔢", "➕", "✖️", "🧮", "💯", "🏆"],
        modes: [
          {
            key: "explore",
            icon: "🔢",
            title: "Tabla Interactiva",
            desc: "Explora la tabla del 1 al 12 con cuadrícula de colores",
            gradient: "linear-gradient(135deg,#1a237e,#3949ab)",
            component: ExploreMode,
          },
          {
            key: "learn",
            icon: "📚",
            title: "Aprende",
            desc: "Flashcards con las multiplicaciones más difíciles",
            gradient: "linear-gradient(135deg,#FF6F00,#F4511E)",
            component: TMLearnMode,
          },
          {
            key: "quiz",
            icon: "🧠",
            title: "Quiz",
            desc: "15 preguntas variadas sobre las tablas",
            gradient: "linear-gradient(135deg,#4facfe,#00f2fe)",
            component: TMQuizMode,
          },
          {
            key: "challenge",
            icon: "⚡",
            title: "Desafío Relámpago",
            desc: "¡60 segundos para responder todas las que puedas!",
            gradient: "linear-gradient(135deg,#F9A825,#f12711)",
            component: TMChallengeMode,
          },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}
