import Stars from "./Stars";
import { calculateQuizCoins } from "../../services/coinService";
import { calculateQuizXP } from "../../services/xpService";

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

  const earnedCoins = calculateQuizCoins(score, total);
  const earnedXP = calculateQuizXP(score, total);

  return (
    <div style={{ textAlign: "center", padding: 16 }}>
      {title && <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px", color: "#e0e0ff" }}>{title}</h2>}
      <div style={{ fontSize: 20, margin: "8px 0", color: "#e0e0ff" }}>{msg}</div>
      <Stars score={score} total={total} />
      <div style={{ fontSize: 42, fontWeight: 900, margin: "12px 0", color: "#fff" }}>
        {score}/{total}
      </div>
      <div style={{ fontSize: 14, color: "#8888bb", marginBottom: 12 }}>{pct}% de aciertos</div>

      {/* Rewards display */}
      {total > 0 && (
        <div style={rewardsContainer}>
          <div style={rewardItem}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ verticalAlign: "middle" }}>
              <circle cx="9" cy="9" r="8" fill="#ffd700" stroke="#ffa000" strokeWidth="1.5" />
              <text x="9" y="13" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b8860b">★</text>
            </svg>
            <span style={{ color: "#ffd700", fontWeight: 700, fontSize: 16 }}>+{earnedCoins}</span>
          </div>
          <div style={rewardItem}>
            <span style={{ fontSize: 16 }}>⚡</span>
            <span style={{ color: "#a5b4fc", fontWeight: 700, fontSize: 16 }}>+{earnedXP} XP</span>
          </div>
        </div>
      )}

      {children}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
        {onRestart && (
          <button onClick={onRestart} style={btnStyle("linear-gradient(135deg,#667eea,#764ba2)")}>
            🔄 Jugar de Nuevo
          </button>
        )}
        {onBack && (
          <button onClick={onBack} style={btnStyle("rgba(255,255,255,0.1)")}>
            🏠 Menú
          </button>
        )}
      </div>
    </div>
  );
}

const rewardsContainer = {
  display: "flex",
  justifyContent: "center",
  gap: 20,
  margin: "12px 0",
  padding: "10px 16px",
  background: "rgba(102,126,234,0.1)",
  borderRadius: 14,
  border: "1px solid rgba(102,126,234,0.2)",
  animation: "flyIn 0.5s ease 0.3s both",
};

const rewardItem = {
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const btnStyle = (bg) => ({
  background: bg,
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 30,
  padding: "12px 24px",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 12px rgba(102,126,234,0.3)",
  transition: "all 0.2s",
});
