import { useMemo } from "react";
import { getAllProgress } from "./useGameProgress";
import ACHIEVEMENTS from "../data/achievements";

export default function useAchievements() {
  const progress = getAllProgress();

  const unlocked = useMemo(() => {
    const count = ACHIEVEMENTS.filter(
      (a) => a.id !== "collector" && a.check(progress)
    ).length;
    return ACHIEVEMENTS.filter((a) => a.check(progress, count)).map((a) => a.id);
  }, [progress]);

  return {
    achievements: ACHIEVEMENTS,
    unlocked: new Set(unlocked),
    total: ACHIEVEMENTS.length,
    unlockedCount: unlocked.length,
    progress,
  };
}
