import NeonButton from "./NeonButton";
import { coinSvg } from "./CoinDisplay";
import { DAILY_REWARDS } from "../../services/coinService";

const DAYS = ["L", "M", "X", "J", "V", "S", "D"];

export default function DailyLoginPopup({ streak, reward, onClaim, onDismiss }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        background: "rgba(0,0,0,0.7)",
        animation: "flyIn 0.3s ease",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1e1e3f, #2a2a5a)",
          border: "2px solid rgba(255,215,0,0.4)",
          borderRadius: 24,
          padding: "28px 24px",
          textAlign: "center",
          maxWidth: 340,
          width: "90%",
          boxShadow: "0 0 40px rgba(255,215,0,0.2)",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 8 }}>🎁</div>
        <h2 style={{ color: "#ffd700", fontSize: 22, margin: "0 0 4px", fontWeight: 900 }}>
          ¡Recompensa Diaria!
        </h2>
        <p style={{ color: "#a5b4fc", fontSize: 13, margin: "0 0 16px" }}>
          Racha: {streak} día{streak !== 1 ? "s" : ""} 🔥
        </p>

        {/* 7-day calendar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 6,
            marginBottom: 20,
          }}
        >
          {DAYS.map((day, i) => {
            const dayNum = i + 1;
            const isActive = dayNum <= streak;
            const isCurrent = dayNum === streak;
            return (
              <div
                key={day}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #ffd700, #ffa000)"
                    : "rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  padding: "6px 2px",
                  border: isCurrent
                    ? "2px solid #ffd700"
                    : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: isCurrent ? "0 0 10px rgba(255,215,0,0.5)" : "none",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: isActive ? "#1a1a3e" : "#666",
                  }}
                >
                  {day}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isActive ? "#1a1a3e" : "#888",
                  }}
                >
                  {isActive ? "✓" : DAILY_REWARDS[i]}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 24,
            fontWeight: 900,
            color: "#ffd700",
            marginBottom: 16,
          }}
        >
          {coinSvg} +{reward}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <NeonButton color="gold" onClick={onClaim}>
            ¡Reclamar!
          </NeonButton>
          <NeonButton color="dark" onClick={onDismiss}>
            Después
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
