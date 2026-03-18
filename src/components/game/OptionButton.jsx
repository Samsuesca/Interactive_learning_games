export default function OptionButton({ text, selected, correct, onClick, children }) {
  const isCorrect = text === correct;
  const isSelected = selected === text;

  let bg = "white",
    bd = "#ddd",
    cl = "#333";

  if (selected !== null) {
    if (isCorrect) {
      bg = "#c8e6c9";
      bd = "#66BB6A";
      cl = "#2e7d32";
    } else if (isSelected) {
      bg = "#ffcdd2";
      bd = "#ef5350";
      cl = "#c62828";
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
          ? "0 4px 15px rgba(0,0,0,0.15)"
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {selected !== null && isCorrect && "✅ "}
      {selected !== null && isSelected && !isCorrect && "❌ "}
      {children || text}
    </button>
  );
}
