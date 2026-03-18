import { useState, useEffect } from "react";
import { Confetti, OptionButton, Timer, ScoreScreen } from "../components/game";
import { pill, makeQuestions } from "../components/game/utils";
import useTimer from "../hooks/useTimer";

/**
 * Generic ChallengeMode - Timed quiz with configurable duration.
 *
 * Props:
 *   data             - Array of game items
 *   questionTypes    - Array of { prompt, answer }
 *   timeLimit        - Seconds (default 60)
 *   poolSize         - Max questions to generate (default 96)
 *   questionGradient - Gradient for question card
 *   onBack           - Back to menu callback
 *   saveChallenge    - Save challenge progress callback
 *   renderQuestion   - Optional custom question renderer
 */
export default function ChallengeMode({
  data,
  questionTypes,
  timeLimit = 60,
  poolSize = 96,
  questionGradient = "linear-gradient(135deg,#6c5ce7,#a29bfe)",
  onBack,
  saveChallenge,
  renderQuestion,
}) {
  const [phase, setPhase] = useState("ready"); // ready | playing | done
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sc, setSc] = useState(0);
  const [sel, setSel] = useState(null);
  const [conf, setConf] = useState(0);
  const [str, setStr] = useState(0);
  const timer = useTimer(timeLimit);

  useEffect(() => {
    if (timer.status === "done" && phase === "playing") {
      setPhase("done");
    }
  }, [timer.status, phase]);

  useEffect(() => {
    if (phase === "done") saveChallenge?.(sc);
  }, [phase]);

  const start = () => {
    setQs(makeQuestions({ data, count: Math.min(poolSize, data.length * 8), questionTypes }));
    setQi(0);
    setSc(0);
    setSel(null);
    setStr(0);
    setConf(0);
    setPhase("playing");
    timer.start();
  };

  const pick = (o) => {
    if (sel !== null || phase !== "playing") return;
    setSel(o);
    if (o === qs[qi].correct) {
      setSc((s) => s + 1);
      setStr((s) => s + 1);
      setConf((c) => c + 1);
    } else {
      setStr(0);
    }
    setTimeout(() => {
      if (qi + 1 >= qs.length) {
        timer.stop();
        setPhase("done");
      } else {
        setQi((i) => i + 1);
        setSel(null);
      }
    }, 600);
  };

  if (phase === "ready") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "0 8px" }}>
        <button onClick={onBack} style={{ ...pill("#e0e0e0", "#333"), alignSelf: "flex-start" }}>← Menú</button>
        <div style={{ fontSize: 64 }}>⚡</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#333", textAlign: "center" }}>Desafío Relámpago</h2>
        <div
          style={{
            background: "linear-gradient(135deg,#e17055,#d63031)",
            borderRadius: 20,
            padding: 24,
            color: "white",
            textAlign: "center",
            maxWidth: 350,
            width: "100%",
          }}
        >
          <p style={{ fontSize: 16, margin: 0, lineHeight: 1.6 }}>
            ¡Tienes <strong>{timeLimit} segundos</strong> para responder la mayor cantidad! 🏁
          </p>
        </div>
        <button
          onClick={start}
          style={{
            ...pill("#11998e", "#fff"),
            fontSize: 20,
            padding: "14px 40px",
            animation: "challengePulse 1.5s infinite",
          }}
        >
          🚀 ¡Empezar!
        </button>
        <style>{`@keyframes challengePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize: 48 }}>⚡</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#333" }}>¡Tiempo!</h2>
        <ScoreScreen
          score={sc}
          total={Math.max(sc + 3, 10)}
          onRestart={start}
          onBack={onBack}
        >
          <div style={{ fontSize: 16 }}>correctas en {timeLimit}s</div>
        </ScoreScreen>
      </div>
    );
  }

  if (!qs.length) return null;
  const q = qs[qi];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 420, alignItems: "center" }}>
        <Timer time={timer.time} max={timeLimit} />
        <div aria-live="polite" style={{ display: "flex", gap: 12, fontSize: 15, fontWeight: 700 }}>
          <span>✅ {sc}</span>
          <span>🔥 {str}</span>
        </div>
      </div>

      {renderQuestion ? (
        renderQuestion(q, { selected: sel, pick })
      ) : (
        <>
          <div
            style={{
              background: timer.time <= 10
                ? "linear-gradient(135deg,#ff5252,#f44336)"
                : questionGradient,
              borderRadius: 18,
              padding: 20,
              color: "white",
              textAlign: "center",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.85 }}>{q.prompt}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%", maxWidth: 400 }}>
            {q.options.map((o, i) => (
              <OptionButton key={i} text={o} selected={sel} correct={q.correct} onClick={() => pick(o)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
