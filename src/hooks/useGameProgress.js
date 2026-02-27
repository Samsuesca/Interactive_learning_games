import useLocalStorage from "./useLocalStorage";

const STORAGE_KEY = "ilg_progress";

const empty = {
  quizBest: 0,
  quizTotal: 0,
  challengeBest: 0,
  bestStreak: 0,
  learnedCount: 0,
  gamesPlayed: 0,
};

export default function useGameProgress(gameId) {
  const [all, setAll] = useLocalStorage(STORAGE_KEY, {});

  const progress = all[gameId] || { ...empty };

  const save = (patch) =>
    setAll((prev) => ({
      ...prev,
      [gameId]: { ...(prev[gameId] || { ...empty }), ...patch },
    }));

  const saveQuiz = (score, total, streak) => {
    const cur = all[gameId] || { ...empty };
    const pct = total > 0 ? score / total : 0;
    const curPct = cur.quizTotal > 0 ? cur.quizBest / cur.quizTotal : 0;

    const patch = { gamesPlayed: cur.gamesPlayed + 1 };

    if (pct > curPct) {
      patch.quizBest = score;
      patch.quizTotal = total;
    }
    if (streak > cur.bestStreak) {
      patch.bestStreak = streak;
    }
    save(patch);
  };

  const saveChallenge = (score) => {
    const cur = all[gameId] || { ...empty };
    const patch = { gamesPlayed: cur.gamesPlayed + 1 };
    if (score > cur.challengeBest) {
      patch.challengeBest = score;
    }
    save(patch);
  };

  const saveLearned = (count) => {
    const cur = all[gameId] || { ...empty };
    if (count > cur.learnedCount) {
      save({ learnedCount: count });
    }
  };

  return { progress, saveQuiz, saveChallenge, saveLearned };
}

/** Read all progress (no hook, for use outside React components) */
export function getAllProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
