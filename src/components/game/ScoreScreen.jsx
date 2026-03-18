import Stars from "./Stars";

export default function ScoreScreen({ score, total, title, onRestart, onBack, children }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const msg =
    pct >= 90
      ? "🏆 ¡Increíble!"
      : pct >= 70
        ? "🎉 ¡Muy bien!"
        : pct >= 50
          ? "👍 ¡Buen intento!"
          : "💪 ¡Sigue practicando!";

  return (
    <div style={{ textAlign: "center", padding: 16 }}>
      {title && <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>{title}</h2>}
      <div style={{ fontSize: 20, margin: "8px 0" }}>{msg}</div>
      <Stars score={score} total={total} />
      <div style={{ fontSize: 42, fontWeight: 900, margin: "12px 0" }}>
        {score}/{total}
      </div>
      <div style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>{pct}% de aciertos</div>
      {children}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
        {onRestart && (
          <button onClick={onRestart} style={btnStyle("linear-gradient(135deg,#667eea,#764ba2)")}>
            🔄 Jugar de Nuevo
          </button>
        )}
        {onBack && (
          <button onClick={onBack} style={btnStyle("#78909C")}>
            🏠 Menú
          </button>
        )}
      </div>
    </div>
  );
}

const btnStyle = (bg) => ({
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: 30,
  padding: "12px 24px",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
});
