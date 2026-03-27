import { describe, it, expect } from "vitest";
import ACHIEVEMENTS from "../data/achievements";

describe("achievements", () => {
  it("exports an array of achievements", () => {
    expect(Array.isArray(ACHIEVEMENTS)).toBe(true);
    expect(ACHIEVEMENTS.length).toBeGreaterThan(15);
  });

  it("each achievement has required properties", () => {
    ACHIEVEMENTS.forEach((a) => {
      expect(a).toHaveProperty("id");
      expect(a).toHaveProperty("icon");
      expect(a).toHaveProperty("title");
      expect(a).toHaveProperty("desc");
      expect(a).toHaveProperty("category");
      expect(a).toHaveProperty("check");
      expect(typeof a.check).toBe("function");
    });
  });

  it("achievement IDs are unique", () => {
    const ids = ACHIEVEMENTS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("no achievements are unlocked with empty progress", () => {
    const emptyProgress = {};
    const unlocked = ACHIEVEMENTS.filter((a) => a.id !== "collector" && a.check(emptyProgress));
    expect(unlocked).toHaveLength(0);
  });

  it("first_quiz unlocks after playing one game", () => {
    const progress = { "test-game": { gamesPlayed: 1, quizBest: 0, quizTotal: 0, challengeBest: 0, bestStreak: 0, learnedCount: 0 } };
    const firstQuiz = ACHIEVEMENTS.find((a) => a.id === "first_quiz");
    expect(firstQuiz.check(progress)).toBe(true);
  });

  it("first_perfect unlocks with perfect score", () => {
    const progress = { "test-game": { gamesPlayed: 1, quizBest: 12, quizTotal: 12, challengeBest: 0, bestStreak: 12, learnedCount: 0 } };
    const perfect = ACHIEVEMENTS.find((a) => a.id === "first_perfect");
    expect(perfect.check(progress)).toBe(true);
  });

  it("streak_5 unlocks with 5+ streak", () => {
    const progress = { "test-game": { gamesPlayed: 1, quizBest: 5, quizTotal: 12, challengeBest: 0, bestStreak: 5, learnedCount: 0 } };
    const streak = ACHIEVEMENTS.find((a) => a.id === "streak_5");
    expect(streak.check(progress)).toBe(true);
  });
});
