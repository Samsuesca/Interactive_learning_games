import { useCallback } from "react";
import useGameProgress from "./useGameProgress";
import usePlayerProfile from "./usePlayerProfile";
import { calculateQuizCoins, calculateChallengeCoins } from "../services/coinService";
import {
  calculateQuizXP,
  calculateChallengeXP,
  calculateLearnXP,
} from "../services/xpService";

/**
 * Wraps useGameProgress with automatic coin/XP rewards.
 * Drop-in replacement: returns the same { saveQuiz, saveChallenge, saveLearned }
 * interface, but also awards coins and XP to the player profile.
 *
 * Returns an extra `lastReward` object for displaying reward popups.
 */
export default function useGameRewards(gameId) {
  const { progress, saveQuiz, saveChallenge, saveLearned } =
    useGameProgress(gameId);
  const { addCoins, addXP } = usePlayerProfile();

  const saveQuizWithRewards = useCallback(
    (score, total, streak) => {
      saveQuiz(score, total, streak);
      const coins = calculateQuizCoins(score, total);
      const xpAmount = calculateQuizXP(score, total);
      addCoins(coins);
      addXP(xpAmount);
    },
    [saveQuiz, addCoins, addXP],
  );

  const saveChallengeWithRewards = useCallback(
    (score) => {
      saveChallenge(score);
      const coins = calculateChallengeCoins(score);
      const xpAmount = calculateChallengeXP(score);
      addCoins(coins);
      addXP(xpAmount);
    },
    [saveChallenge, addCoins, addXP],
  );

  const saveLearnedWithRewards = useCallback(
    (count) => {
      saveLearned(count);
      const xpAmount = calculateLearnXP();
      addXP(xpAmount);
    },
    [saveLearned, addXP],
  );

  return {
    progress,
    saveQuiz: saveQuizWithRewards,
    saveChallenge: saveChallengeWithRewards,
    saveLearned: saveLearnedWithRewards,
  };
}
