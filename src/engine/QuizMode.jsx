import { useState, useEffect } from "react";
import { Confetti, OptionButton, ProgressBar, ScoreScreen } from "../components/game";
import { shuffle, pill, makeQuestions } from "../components/game/utils";

/**
 * Generic QuizMode - Configurable quiz with multiple-choice questions.
 *
 * Props:
 *   data           - Array of game items
 *   questionTypes  - Array of { prompt: (item) => string, answer: (item) => string }
 *   count          - Number of questions (default 12)
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
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sc, setSc] = useState(0);
  const [str, setStr] = useState(0);
  const [bStr, setBStr] = useState(0);
  const [conf, setConf] = useState(0);
  const [done, setDone] = useState(false);
  const T = Math.min(count, data.length);

  useEffect(() => {
    if (done) saveQuiz?.(sc, T, bStr);
  }, [done]);

  useEffect(() => {
    gen();
  }, []);

  const gen = () => {
    setQs(makeQuestions({ data, count: T, questionTypes }));
    setQi(0);
    setSel(null);
    setSc(0);
    setStr(0);
    setBStr(0);
    setDone(false);
    setConf(0);
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

  if (done) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize: 48 }}>🎉</div>
        <ScoreScreen score={sc} total={T} onRestart={gen} onBack={onBack}>
          <div style={{ fontSize: 14, color: "#888" }}>🔥 Mejor racha: {bStr}</div>
        </ScoreScreen>
      </div>
    );
  }

  if (!qs.length) return null;
  const q = qs[qi];

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
      <div style={{ fontSize: 13, color: "#999" }}>Pregunta {qi + 1} de {T}</div>

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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 400 }}>
            {q.options.map((o, i) => (
              <OptionButton key={i} text={o} selected={sel} correct={q.correct} onClick={() => pick(o)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
