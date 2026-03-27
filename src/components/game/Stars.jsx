export default function Stars({ score, total }) {
  const n =
    total > 0
      ? score / total >= 0.9
        ? 3
        : score / total >= 0.6
          ? 2
          : score / total > 0
            ? 1
            : 0
      : 0;

  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center", fontSize: 32 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.25 }}>
          {i < n ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
