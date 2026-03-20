/** Fisher-Yates shuffle */
export function shuffle(arr) {
  const b = [...arr];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** Pill-shaped button style */
export const pill = (bg, c = "#fff") => ({
  background: bg,
  color: c,
  border: "none",
  borderRadius: 30,
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
});

/** Circular icon button style */
export const circ = (bg) => ({
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 44,
  height: 44,
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
});

/** Difficulty level configurations */
export const DIFFICULTIES = [
  { key: "easy", label: "Fácil", icon: "😊", quizCount: 15, challengeTime: 90, options: 4 },
  { key: "normal", label: "Normal", icon: "🧠", quizCount: 12, challengeTime: 60, options: 4 },
  { key: "hard", label: "Difícil", icon: "🔥", quizCount: 10, challengeTime: 45, options: 6 },
];

/** Generate quiz questions from data array */
export function makeQuestions({ data, count, questionTypes, optionCount = 4 }) {
  const shuffled = shuffle(data);
  const items = shuffled.slice(0, Math.min(count, data.length));

  return items.map((item) => {
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const correct = type.answer(item);
    const pool = data.filter((d) => d !== item);

    const options = [correct];
    while (options.length < optionCount && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length);
      const val = type.answer(pool[idx]);
      if (!options.includes(val)) options.push(val);
      pool.splice(idx, 1);
    }

    return {
      item,
      prompt: type.prompt(item),
      correct,
      options: shuffle(options),
    };
  });
}

/** Game container base style */
export const gameCtn = (gradient) => ({
  fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
  maxWidth: 480,
  margin: "0 auto",
  padding: "24px 12px",
  minHeight: "100vh",
  background: gradient,
  position: "relative",
});
