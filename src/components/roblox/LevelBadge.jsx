import { getXPProgress } from "../../services/xpService";

export default function LevelBadge({ xp, compact = false }) {
  const { current, progress, xpInLevel, xpNeeded } = getXPProgress(xp);

  if (compact) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: "rgba(102,126,234,0.2)",
          border: "1px solid rgba(102,126,234,0.4)",
          borderRadius: 20,
          padding: "2px 10px",
          fontSize: 13,
          fontWeight: 700,
          color: "#a5b4fc",
        }}
      >
        <span>{current.icon}</span>
        <span>Nv.{current.level}</span>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          boxShadow: "0 0 18px rgba(102,126,234,0.5)",
          fontSize: 24,
          fontWeight: 900,
          color: "#fff",
          position: "relative",
          animation: "levelGlow 2s ease-in-out infinite",
        }}
      >
        {current.level}
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#a5b4fc", marginTop: 4 }}>
        {current.icon} {current.title}
      </div>
      {/* XP Progress bar */}
      <div
        style={{
          width: 120,
          height: 6,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 3,
          overflow: "hidden",
          margin: "6px auto 0",
        }}
      >
        <div
          style={{
            width: `${Math.round(progress * 100)}%`,
            height: "100%",
            background: "linear-gradient(90deg, #667eea, #a855f7)",
            borderRadius: 3,
            transition: "width 0.6s ease",
            boxShadow: "0 0 6px rgba(102,126,234,0.5)",
          }}
        />
      </div>
      <div style={{ fontSize: 10, color: "#8888bb", marginTop: 2 }}>
        {xpNeeded > 0 ? `${xpInLevel}/${xpNeeded} XP` : "MAX"}
      </div>
    </div>
  );
}
