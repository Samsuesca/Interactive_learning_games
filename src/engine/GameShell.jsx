import { useState } from "react";
import { FloatingEmojis } from "../components/game";
import { gameCtn } from "../components/game/utils";

/**
 * GameShell - Handles menu rendering and screen navigation.
 *
 * Props:
 *   config.id        - Game ID for progress tracking
 *   config.title     - Display title
 *   config.icon      - Emoji icon
 *   config.gradient  - Background gradient for the game container
 *   config.titleGradient - Gradient for the title text
 *   config.subtitle  - Subtitle under the title
 *   config.footer    - Footer text
 *   config.emojis    - Array of emojis for floating animation
 *   config.modes     - Array of { key, icon, title, desc, gradient, component }
 *   config.extraProps - Extra props passed to all mode components
 */
export default function GameShell({ config, progressHooks }) {
  const [screen, setScreen] = useState("menu");

  const modeMap = {};
  config.modes.forEach((m) => {
    modeMap[m.key] = m.component;
  });

  const Screen = modeMap[screen];

  if (Screen) {
    return (
      <div style={gameCtn(config.gradient)}>
        <Screen
          onBack={() => setScreen("menu")}
          {...(progressHooks || {})}
          {...(config.extraProps || {})}
        />
      </div>
    );
  }

  return (
    <div style={gameCtn(config.gradient)}>
      <div style={{ position: "relative", overflow: "hidden", minHeight: "100%" }}>
        {config.emojis && <FloatingEmojis emojis={config.emojis} />}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: "0 8px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 4 }}>{config.icon}</div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 900,
                margin: 0,
                background: config.titleGradient || config.modes[0]?.gradient || "#333",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {config.title}
            </h1>
            {config.subtitle && (
              <p style={{ fontSize: 15, color: "#ccc", margin: "4px 0 0" }}>{config.subtitle}</p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 380 }}>
            {config.modes.map((m) => (
              <button
                key={m.key}
                onClick={() => setScreen(m.key)}
                style={{
                  background: m.gradient,
                  border: "none",
                  borderRadius: 20,
                  padding: "20px 22px",
                  color: "white",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  boxShadow: "0 0 15px rgba(0,0,0,0.3), 0 6px 25px rgba(0,0,0,0.15)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <span style={{ fontSize: 36 }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{m.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.9 }}>{m.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {config.footer && (
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: 8 }}>
              {config.footer}
            </div>
          )}
          <a href="/" style={{ fontSize: 13, color: "rgba(165,180,252,0.7)", textDecoration: "none", textAlign: "center" }}>
            ← Volver al menú principal
          </a>
        </div>
      </div>
    </div>
  );
}
