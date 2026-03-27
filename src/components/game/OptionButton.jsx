export default function OptionButton({ text, selected, correct, onClick, children }) {
  const isCorrect = text === correct;
  const isSelected = selected === text;

  let bg = "rgba(30,30,63,0.8)",
    bd = "rgba(102,126,234,0.3)",
    cl = "#e0e0ff";

  if (selected !== null) {
    if (isCorrect) {
      bg = "rgba(0,255,136,0.15)";
      bd = "#00ff88";
      cl = "#00ff88";
    } else if (isSelected) {
      bg = "rgba(255,68,68,0.15)";
      bd = "#ff4444";
      cl = "#ff6b6b";
    }
  }

  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border: `2px solid ${bd}`,
        borderRadius: 16,
        padding: "14px 10px",
        fontSize: 15,
        fontWeight: 600,
        color: cl,
        cursor: selected !== null ? "default" : "pointer",
        transition: "all 0.3s",
        transform: isSelected ? "scale(1.04)" : "scale(1)",
        boxShadow: isSelected
          ? `0 0 15px ${isCorrect ? "rgba(0,255,136,0.3)" : "rgba(255,68,68,0.3)"}`
          : "0 0 8px rgba(102,126,234,0.1)",
      }}
    >
      {selected !== null && isCorrect && "✅ "}
      {selected !== null && isSelected && !isCorrect && "❌ "}
      {children || text}
    </button>
  );
}
