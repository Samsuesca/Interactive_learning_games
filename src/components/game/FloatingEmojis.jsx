import { useState, useEffect, useRef } from "react";

export default function FloatingEmojis({ emojis, interval = 1800 }) {
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setItems((prev) => [
        ...prev.slice(-7),
        {
          id: idRef.current++,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          left: Math.random() * 90 + 5,
          size: Math.random() * 16 + 20,
        },
      ]);
    }, interval);
    return () => clearInterval(iv);
  }, [emojis, interval]);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {items.map((v) => (
        <div
          key={v.id}
          style={{
            position: "absolute",
            left: `${v.left}%`,
            bottom: -40,
            fontSize: v.size,
            animation: "floatUp 4s ease-out forwards",
            opacity: 0.3,
          }}
        >
          {v.emoji}
        </div>
      ))}
      <style>{`@keyframes floatUp{0%{transform:translateY(0);opacity:0.3}100%{transform:translateY(-110vh);opacity:0}}`}</style>
    </div>
  );
}
