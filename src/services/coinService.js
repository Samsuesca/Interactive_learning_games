const DAILY_REWARDS = [5, 8, 10, 12, 15, 20, 50];

export function getDailyReward(streak) {
  const day = Math.max(0, Math.min(streak - 1, DAILY_REWARDS.length - 1));
  return DAILY_REWARDS[day];
}

export function calculateQuizCoins(score, total) {
  if (total <= 0) return 0;
  return Math.floor((score / total) * 20);
}

export function calculateChallengeCoins(score) {
  return score * 2;
}

const RARITY_COINS = { common: 10, rare: 25, epic: 50, legendary: 100 };

export function calculateAchievementCoins(rarity) {
  return RARITY_COINS[rarity] || 10;
}

export { DAILY_REWARDS };
