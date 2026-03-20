import { useState, useEffect } from "react";
import { Confetti, OptionButton, ProgressBar, ScoreScreen } from "../components/game";
import { shuffle, pill, makeQuestions, DIFFICULTIES } from "../components/game/utils";

/**
 * Generic QuizMode - Configurable quiz with multiple-choice questions.
 *
 * Props:
 *   data           - Array of game items
 *   questionTypes  - Array of { prompt: (item) => string, answer: (item) => string }
 *   count          - Number of questions (default 12, overridden by difficulty)
 *   questionGradient - Gradient for question card
 *   progressGradient - Gradient for progress bar
 *   onBack         - Back to menu callback
 *   saveQuiz       - Save quiz progress callback
 *   renderQuestion - Optional custom question renderer: (question, { selected, pick }) => JSX
 */
export default function QuizMode({
  data,
  questionTypes,
  count = 12,
  questionGradient = "linear-gradient(135deg,#6c5ce7,#a29bfe)",
  progressGradient,
  onBack,
  saveQuiz,
  renderQuestion,
}) {
  const [diff, setDiff] = useState(null);
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sc, setSc] = useState(0);
  const [str, setStr] = useState(0);
  const [bStr, setBStr] = useState(0);
  const [conf, setConf] = useState(0);
  const [done, setDone] = useState(false);

  const T = diff ? Math.min(diff.quizCount, data.length) : Math.min(count, data.length);
  const optCount = diff ? diff.options : 4;

  useEffect(() => {
    if (done) saveQuiz?.(sc, T, bStr);
  }, [done]);

  const gen = (d) => {
    const difficulty = d || diff;
    const total = difficulty ? Math.min(difficulty.quizCount, data.length) : Math.min(count, data.length);
    const opts = difficulty ? difficulty.options : 4;
    setQs(makeQuestions({ data, count: total, questionTypes, optionCount: opts }));
    setQi(0);
    setSel(null);
    setSc(0);
    setStr(0);
    setBStr(0);
    setDone(false);
    setConf(0);
  };

  const startWithDifficulty = (d) => {
    setDiff(d);
    gen(d);
  };

  const pick = (o) => {
    if (sel !== null) return;
    setSel(o);
    const ok = o === qs[qi].correct;
    if (ok) {
      setSc((s) => s + 1);
      setStr((s) => {
        const n = s + 1;
        if (n > bStr) setBStr(n);
        return n;
      });
      setConf((c) => c + 1);
    } else {
      setStr(0);
    }
    setTimeout(() => {
      if (qi + 1 >= T) setDone(true);
      else {
        setQi((i) => i + 1);
        setSel(null);
      }
    }, 1200);
  };

  // Difficulty selector screen
  if (diff === null) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 8px" }}>
        <button onClick={onBack} style={{ ...pill("#e0e0e0", "#333"), alignSelf: "flex-start" }}>← Menú</button>
        <div style={{ fontSize: 48 }}>🧠</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#333", margin: 0 }}>Elige dificultad</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 320 }}>
          {DIFFICULTIES.map((d) => (
            <button
              key={d.key}
              onClick={() => startWithDifficulty(d)}
              style={{
                background:
                  d.key === "easy"
                    ? "linear-gradient(135deg,#11998e,#38ef7d)"
                    : d.key === "normal"
                    ? "linear-gradient(135deg,#6c5ce7,#a29bfe)"
                    : "linear-gradient(135deg,#e17055,#d63031)",
                border: "none",
                borderRadius: 16,
                padding: "16px 20px",
                color: "white",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 700,
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span style={{ fontSize: 28 }}>{d.icon}</span>
              <div>
                <div>{d.label}</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>
                  {d.quizCount} preguntas{d.options > 4 ? ` \u00b7 ${d.options} opciones` : ""}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Done screen
  if (done) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize: 48 }}>🎉</div>
        <ScoreScreen
          score={sc}
          total={T}
          onRestart={() => gen()}
          onBack={() => { setDiff(null); setDone(false); }}
        >
          <div style={{ fontSize: 14, color: "#888" }}>🔥 Mejor racha: {bStr}</div>
          <div style={{ fontSize: 13, color: "#aaa" }}>Dificultad: {diff.icon} {diff.label}</div>
        </ScoreScreen>
      </div>
    );
  }

  if (!qs.length) return null;
  const q = qs[qi];
  const gridCols = optCount > 4 ? "1fr 1fr 1fr" : "1fr 1fr";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 420, alignItems: "center" }}>
        <button onClick={onBack} style={pill("#e0e0e0", "#333")}>← Menú</button>
        <div aria-live="polite" style={{ display: "flex", gap: 12, fontSize: 14, fontWeight: 600 }}>
          <span>✅ {sc}</span>
          <span>🔥 {str}</span>
        </div>
      </div>
      <ProgressBar value={qi + 1} max={T} gradient={progressGradient} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 400, alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#999" }}>Pregunta {qi + 1} de {T}</span>
        <span style={{ fontSize: 12, color: "#bbb" }}>{diff.icon} {diff.label}</span>
      </div>

      {renderQuestion ? (
        renderQuestion(q, { selected: sel, pick })
      ) : (
        <>
          <div
            style={{
              background: questionGradient,
              borderRadius: 20,
              padding: 24,
              color: "white",
              textAlign: "center",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 6 }}>{q.prompt}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 10, width: "100%", maxWidth: 400 }}>
            {q.options.map((o, i) => (
              <OptionButton key={i} text={o} selected={sel} correct={q.correct} onClick={() => pick(o)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
