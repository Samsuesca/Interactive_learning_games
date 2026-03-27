import { useEffect, useState } from "react";
import { coinSvg } from "./CoinDisplay";

export default function RewardPopup({ coins = 0, xp = 0, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2700);
    return () => clearTimeout(t);
  }, [onClose]);

  if (coins <= 0 && xp <= 0) return null;

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
        zIndex: 9999,
        background: "rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: visible ? "auto" : "none",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1e1e3f, #2a2a5a)",
          border: "2px solid rgba(102,126,234,0.5)",
          borderRadius: 20,
          padding: "28px 36px",
          textAlign: "center",
          transform: visible ? "scale(1)" : "scale(0.5)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: "0 0 30px rgba(102,126,234,0.3)",
          minWidth: 200,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 16 }}>
          🎉 ¡Recompensas!
        </div>
        {coins > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 22,
              fontWeight: 700,
              color: "#ffd700",
              marginBottom: 10,
              animation: "flyIn 0.5s ease 0.2s both",
            }}
          >
            {coinSvg} +{coins}
          </div>
        )}
        {xp > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 20,
              fontWeight: 700,
              color: "#a5b4fc",
              animation: "flyIn 0.5s ease 0.4s both",
            }}
          >
            ⚡ +{xp} XP
          </div>
        )}
      </div>
    </div>
  );
}
