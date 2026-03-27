export default function Timer({ time, max = 60 }) {
  const pct = max > 0 ? time / max : 0;
  const color = pct > 0.5 ? "#4CAF50" : pct > 0.25 ? "#FF9800" : "#f44336";

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 36,
          fontWeight: 900,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time}s
      </div>
      <div style={{ width: "100%", height: 6, background: "#e0e0e0", borderRadius: 3, overflow: "hidden", marginTop: 4 }}>
        <div
          style={{
            width: `${pct * 100}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
            transition: "width 1s linear, background 0.5s",
          }}
        />
      </div>
    </div>
  );
}
