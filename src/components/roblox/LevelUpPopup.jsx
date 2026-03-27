import { useEffect, useState } from "react";

export default function LevelUpPopup({ level, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  if (!level) return null;

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
        zIndex: 10001,
        background: visible ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
        transition: "background 0.4s",
        pointerEvents: visible ? "auto" : "none",
      }}
      onClick={() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }}
    >
      {/* Particle burst */}
      {visible &&
        Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: ["#ffd700", "#ff1493", "#00ff88", "#00bfff", "#a855f7"][i % 5],
              left: "50%",
              top: "50%",
              animation: `particleBurst 1.2s ease-out ${i * 0.05}s forwards`,
              opacity: 0,
              "--angle": `${(i / 20) * 360}deg`,
              "--dist": `${60 + Math.random() * 80}px`,
            }}
          />
        ))}

      <div
        style={{
          textAlign: "center",
          transform: visible ? "scale(1)" : "scale(0)",
          transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div
          style={{
            fontSize: 64,
            lineHeight: 1,
            marginBottom: 8,
            animation: visible ? "levelGlow 1s ease infinite" : "none",
          }}
        >
          {level.icon}
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#a5b4fc",
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          ¡Subiste de nivel!
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#fff",
            textShadow: "0 0 20px rgba(102,126,234,0.8), 0 0 40px rgba(102,126,234,0.4)",
          }}
        >
          Nivel {level.level}
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#ffd700",
            marginTop: 4,
            textShadow: "0 0 10px rgba(255,215,0,0.5)",
          }}
        >
          {level.title}
        </div>
      </div>
    </div>
  );
}
