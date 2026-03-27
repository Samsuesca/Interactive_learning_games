import { useState, useEffect } from "react";
import { ProgressBar } from "../components/game";
import { pill, circ } from "../components/game/utils";

/**
 * Generic LearnMode - Flashcard-based learning with flip animation.
 *
 * Props:
 *   data             - Array of game items
 *   renderFront      - (item, index) => JSX for card front
 *   renderBack       - (item, index) => JSX for card back
 *   frontGradient    - Gradient for front side (default green)
 *   backGradient     - Gradient for back side (default purple)
 *   progressGradient - Gradient for progress bar
 *   navColor         - Color for nav buttons (default "#11998e")
 *   onBack           - Back to menu callback
 *   saveLearned      - Save learned count callback
 */
export default function LearnMode({
  data,
  renderFront,
  renderBack,
  frontGradient = "linear-gradient(135deg,#11998e,#38ef7d)",
  backGradient = "linear-gradient(135deg,#6c5ce7,#a29bfe)",
  progressGradient,
  navColor = "#11998e",
  onBack,
  saveLearned,
}) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(new Set());

  useEffect(() => {
    if (learned.size > 0) saveLearned?.(learned.size);
  }, [learned.size]);

  const item = data[idx];

  const cardSide = (gradient, content, extra) => ({
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    background: gradient,
    borderRadius: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    color: "white",
    boxShadow: `0 10px 40px rgba(0,0,0,0.25)`,
    ...extra,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 8px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 420 }}>
        <button onClick={onBack} style={pill("#e0e0e0", "#333")}>← Menú</button>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#666" }}>📚 {learned.size}/{data.length}</span>
      </div>
      <ProgressBar value={learned.size} max={data.length} gradient={progressGradient} />

      <div
        onClick={() => setFlipped(!flipped)}
        style={{ width: "100%", maxWidth: 380, minHeight: 260, perspective: 800, cursor: "pointer" }}
      >
        <div
          style={{
            width: "100%",
            minHeight: 260,
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.5s",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
          }}
        >
          {/* Front */}
          <div style={cardSide(frontGradient)}>
            {renderFront(item, idx)}
            <div style={{ fontSize: 13, opacity: 0.7, marginTop: 12 }}>👆 Toca para ver más</div>
          </div>
          {/* Back */}
          <div style={cardSide(backGradient, null, { transform: "rotateY(180deg)" })}>
            {renderBack(item, idx)}
            <div style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>👆 Toca para voltear</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
        <button
          onClick={() => {
            setFlipped(false);
            setTimeout(() => setIdx((i) => (i - 1 + data.length) % data.length), 150);
          }}
          style={circ(navColor)}
        >
          ◀
        </button>
        <button
          onClick={() =>
            setLearned((s) => {
              const n = new Set(s);
              n.has(idx) ? n.delete(idx) : n.add(idx);
              return n;
            })
          }
          style={{
            ...pill(learned.has(idx) ? "#66BB6A" : "#e0e0e0", learned.has(idx) ? "#fff" : "#333"),
            minWidth: 140,
          }}
        >
          {learned.has(idx) ? "✅ Aprendido" : "Marcar aprendido"}
        </button>
        <button
          onClick={() => {
            setFlipped(false);
            setTimeout(() => setIdx((i) => (i + 1) % data.length), 150);
          }}
          style={circ(navColor)}
        >
          ▶
        </button>
      </div>
      <div style={{ fontSize: 14, color: "#999" }}>Tarjeta {idx + 1} de {data.length}</div>
    </div>
  );
}
