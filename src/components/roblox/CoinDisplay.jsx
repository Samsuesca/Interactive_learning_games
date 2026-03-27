import { useEffect, useState } from "react";

const coinSvg = (
  <svg width="18" height="18" viewBox="0 0 18 18" style={{ verticalAlign: "middle" }}>
    <circle cx="9" cy="9" r="8" fill="#ffd700" stroke="#ffa000" strokeWidth="1.5" />
    <text
      x="9"
      y="13"
      textAnchor="middle"
      fontSize="11"
      fontWeight="bold"
      fill="#b8860b"
    >
      ★
    </text>
  </svg>
);

export default function CoinDisplay({ coins, compact = false }) {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    setBounce(true);
    const t = setTimeout(() => setBounce(false), 400);
    return () => clearTimeout(t);
  }, [coins]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "rgba(255,215,0,0.15)",
        border: "1px solid rgba(255,215,0,0.3)",
        borderRadius: 20,
        padding: compact ? "2px 8px" : "4px 12px",
        fontSize: compact ? 13 : 15,
        fontWeight: 700,
        color: "#ffd700",
        transform: bounce ? "scale(1.15)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {coinSvg}
      <span>{coins}</span>
    </div>
  );
}

export { coinSvg };
