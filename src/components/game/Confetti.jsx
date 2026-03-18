import { useState, useEffect } from "react";

const COLORS = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#F9A825", "#AB47BC"];

export default function Confetti({ active }) {
  const [p, setP] = useState([]);

  useEffect(() => {
    if (!active) { setP([]); return; }
    setP(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        dl: Math.random() * 0.5,
        c: COLORS[i % 6],
        s: Math.random() * 8 + 4,
      }))
    );
    const t = setTimeout(() => setP([]), 1500);
    return () => clearTimeout(t);
  }, [active]);

  if (!p.length) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }}>
      {p.map((v) => (
        <div
          key={v.id}
          style={{
            position: "absolute",
            left: `${v.x}%`,
            top: -10,
            width: v.s,
            height: v.s,
            borderRadius: "50%",
            background: v.c,
            animation: `confettiFall 1.5s ${v.dl}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`@keyframes confettiFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>
    </div>
  );
}
