const COLORS = {
  purple: { bg: "linear-gradient(135deg, #667eea, #764ba2)", glow: "rgba(102,126,234,0.4)" },
  green: { bg: "linear-gradient(135deg, #00ff88, #11998e)", glow: "rgba(0,255,136,0.4)" },
  pink: { bg: "linear-gradient(135deg, #ff1493, #f5576c)", glow: "rgba(255,20,147,0.4)" },
  blue: { bg: "linear-gradient(135deg, #00bfff, #0052d4)", glow: "rgba(0,191,255,0.4)" },
  gold: { bg: "linear-gradient(135deg, #ffd700, #ffa000)", glow: "rgba(255,215,0,0.4)" },
  red: { bg: "linear-gradient(135deg, #ff4444, #f12711)", glow: "rgba(255,68,68,0.4)" },
  dark: { bg: "linear-gradient(135deg, #2a2a4a, #1a1a3e)", glow: "rgba(102,126,234,0.2)" },
};

export default function NeonButton({
  color = "purple",
  children,
  onClick,
  disabled = false,
  size = "md",
  fullWidth = false,
  style: extraStyle,
}) {
  const c = COLORS[color] || COLORS.purple;
  const sizes = {
    sm: { padding: "6px 14px", fontSize: 12, borderRadius: 16 },
    md: { padding: "10px 22px", fontSize: 14, borderRadius: 22 },
    lg: { padding: "14px 32px", fontSize: 16, borderRadius: 28 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        background: disabled ? "#333" : c.bg,
        color: disabled ? "#666" : "#fff",
        border: "none",
        borderRadius: s.borderRadius,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : `0 0 15px ${c.glow}, 0 4px 15px rgba(0,0,0,0.3)`,
        transition: "all 0.2s ease",
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.5 : 1,
        letterSpacing: 0.5,
        ...extraStyle,
      }}
    >
      {children}
    </button>
  );
}

export { COLORS as NEON_COLORS };
