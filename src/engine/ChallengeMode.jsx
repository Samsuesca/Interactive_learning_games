import { useState, useEffect } from "react";
import { Confetti, OptionButton, Timer, ScoreScreen } from "../components/game";
import { pill, makeQuestions, DIFFICULTIES } from "../components/game/utils";
import useTimer from "../hooks/useTimer";

/**
 * Generic ChallengeMode - Timed quiz with configurable duration.
 *
 * Props:
 *   data             - Array of game items
 *   questionTypes    - Array of { prompt, answer }
 *   timeLimit        - Seconds (default 60, overridden by difficulty)
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
  const [phase, setPhase] = useState("select"); // select | ready | playing | done
  const [diff, setDiff] = useState(null);
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sc, setSc] = useState(0);
  const [sel, setSel] = useState(null);
  const [conf, setConf] = useState(0);
  const [str, setStr] = useState(0);
  const timer = useTimer(timeLimit);

  const effectiveTime = diff ? diff.challengeTime : timeLimit;
  const optCount = diff ? diff.options : 4;

  useEffect(() => {
    if (timer.status === "done" && phase === "playing") {
      setPhase("done");
    }
  }, [timer.status, phase]);

  useEffect(() => {
    if (phase === "done") saveChallenge?.(sc);
  }, [phase]);

  const selectDifficulty = (d) => {
    setDiff(d);
    setPhase("ready");
  };

  const start = () => {
    const opts = diff ? diff.options : 4;
    setQs(makeQuestions({ data, count: Math.min(poolSize, data.length * 8), questionTypes, optionCount: opts }));
    setQi(0);
    setSc(0);
    setSel(null);
    setStr(0);
    setConf(0);
    setPhase("playing");
    const t = diff ? diff.challengeTime : timeLimit;
    timer.startWith(t);
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

  // Difficulty selector
  if (phase === "select") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 8px" }}>
        <button onClick={onBack} style={{ ...pill("#e0e0e0", "#333"), alignSelf: "flex-start" }}>← Menú</button>
        <div style={{ fontSize: 48 }}>⚡</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#333", margin: 0 }}>Elige dificultad</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 320 }}>
          {DIFFICULTIES.map((d) => (
            <button
              key={d.key}
              onClick={() => selectDifficulty(d)}
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
                  {d.challengeTime}s{d.options > 4 ? ` \u00b7 ${d.options} opciones` : ""}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Ready screen
  if (phase === "ready") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "0 8px" }}>
        <button onClick={() => setPhase("select")} style={{ ...pill("#e0e0e0", "#333"), alignSelf: "flex-start" }}>← Dificultad</button>
        <div style={{ fontSize: 64 }}>⚡</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#333", textAlign: "center", margin: 0 }}>Desafío Relámpago</h2>
        <div style={{ fontSize: 14, color: "#888" }}>{diff.icon} {diff.label}</div>
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
            ¡Tienes <strong>{effectiveTime} segundos</strong> para responder la mayor cantidad! 🏁
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

  // Done screen
  if (phase === "done") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 8px" }}>
        <Confetti active={conf} />
        <div style={{ fontSize: 48 }}>⚡</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#333", margin: 0 }}>¡Tiempo!</h2>
        <ScoreScreen
          score={sc}
          total={Math.max(sc + 3, 10)}
          onRestart={start}
          onBack={() => { setDiff(null); setPhase("select"); }}
        >
          <div style={{ fontSize: 16 }}>correctas en {effectiveTime}s</div>
          <div style={{ fontSize: 13, color: "#aaa" }}>Dificultad: {diff.icon} {diff.label}</div>
        </ScoreScreen>
      </div>
    );
  }

  if (!qs.length) return null;
  const q = qs[qi];
  const gridCols = optCount > 4 ? "1fr 1fr 1fr" : "1fr 1fr";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "0 8px" }}>
      <Confetti active={conf} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 420, alignItems: "center" }}>
        <Timer time={timer.time} max={effectiveTime} />
        <div style={{ fontSize: 12, color: "#bbb" }}>{diff.icon} {diff.label}</div>
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
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 8, width: "100%", maxWidth: 400 }}>
            {q.options.map((o, i) => (
              <OptionButton key={i} text={o} selected={sel} correct={q.correct} onClick={() => pick(o)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
