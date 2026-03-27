const LEVELS = [
  { level: 1, xp: 0, title: "Novato", icon: "🌱" },
  { level: 2, xp: 100, title: "Aprendiz", icon: "📖" },
  { level: 3, xp: 250, title: "Estudiante", icon: "🎓" },
  { level: 4, xp: 500, title: "Explorador", icon: "🧭" },
  { level: 5, xp: 800, title: "Aventurero", icon: "⚔️" },
  { level: 6, xp: 1200, title: "Guerrero", icon: "🛡️" },
  { level: 7, xp: 1700, title: "Mago", icon: "🔮" },
  { level: 8, xp: 2300, title: "Héroe", icon: "🦸" },
  { level: 9, xp: 3000, title: "Campeón", icon: "🏆" },
  { level: 10, xp: 3800, title: "Maestro", icon: "👑" },
  { level: 11, xp: 4800, title: "Gran Maestro", icon: "💎" },
  { level: 12, xp: 6000, title: "Sabio", icon: "🧙" },
  { level: 13, xp: 7500, title: "Leyenda", icon: "⭐" },
  { level: 14, xp: 9200, title: "Mítico", icon: "🌟" },
  { level: 15, xp: 11200, title: "Inmortal", icon: "🔥" },
  { level: 16, xp: 13500, title: "Titán", icon: "⚡" },
  { level: 17, xp: 16200, title: "Divino", icon: "✨" },
  { level: 18, xp: 19500, title: "Celestial", icon: "🌌" },
  { level: 19, xp: 23500, title: "Supremo", icon: "💫" },
  { level: 20, xp: 28000, title: "Omnisciente", icon: "🏅" },
];

export function getLevelForXP(xp) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.xp) current = lvl;
    else break;
  }
  return current;
}

export function getNextLevel(level) {
  const idx = LEVELS.findIndex((l) => l.level === level);
  return idx >= 0 && idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}

export function getXPProgress(xp) {
  const current = getLevelForXP(xp);
  const next = getNextLevel(current.level);
  if (!next) return { current, next: null, progress: 1, xpInLevel: 0, xpNeeded: 0 };
  const xpInLevel = xp - current.xp;
  const xpNeeded = next.xp - current.xp;
  return { current, next, progress: xpInLevel / xpNeeded, xpInLevel, xpNeeded };
}

export function calculateQuizXP(score, total) {
  if (total <= 0) return 0;
  const pct = score / total;
  return Math.round(20 + pct * 30);
}

export function calculateChallengeXP(score) {
  return 15 + score * 3;
}

export function calculateLearnXP() {
  return 5;
}

export function calculateDailyLoginXP() {
  return 10;
}

const RARITY_XP = { common: 25, rare: 50, epic: 75, legendary: 100 };

export function calculateAchievementXP(rarity) {
  return RARITY_XP[rarity] || 25;
}

export { LEVELS };
