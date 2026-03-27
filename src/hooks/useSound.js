import { useState, useCallback, useRef } from "react";

const STORAGE_KEY = "ilg_sound_enabled";

export default function useSound() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "false";
    } catch {
      return true;
    }
  });
  const ctxRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  };

  const play = useCallback(
    (type) => {
      if (!enabled) return;
      try {
        const ctx = getCtx();

        if (type === "correct") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(523, ctx.currentTime); // C5
          osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
          osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.4);
        } else if (type === "wrong") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(300, ctx.currentTime);
          osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.3);
        } else if (type === "tick") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.05);
        } else if (type === "complete") {
          const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
          notes.forEach((freq, i) => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.connect(g);
            g.connect(ctx.destination);
            o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
            g.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.15);
            g.gain.exponentialRampToValueAtTime(
              0.01,
              ctx.currentTime + i * 0.15 + 0.3
            );
            o.start(ctx.currentTime + i * 0.15);
            o.stop(ctx.currentTime + i * 0.15 + 0.3);
          });
        }
      } catch {
        /* Audio not available */
      }
    },
    [enabled]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  return { enabled, toggle, play };
}
