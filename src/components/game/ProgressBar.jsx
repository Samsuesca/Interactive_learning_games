const DEFAULT_GRADIENT = "linear-gradient(90deg,#F9A825,#FF6B6B)";

export default function ProgressBar({ value, max, gradient = DEFAULT_GRADIENT }) {
  return (
    <div style={{ width: "100%", height: 10, background: "#e0e0e0", borderRadius: 5, overflow: "hidden" }}>
      <div
        style={{
          width: `${max > 0 ? (value / max) * 100 : 0}%`,
          height: "100%",
          background: gradient,
          borderRadius: 5,
          transition: "width 0.5s",
        }}
      />
    </div>
  );
}
