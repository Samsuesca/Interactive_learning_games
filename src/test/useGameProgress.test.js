import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAllProgress } from "../hooks/useGameProgress";

describe("getAllProgress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty object when no data stored", () => {
    expect(getAllProgress()).toEqual({});
  });

  it("returns stored progress data", () => {
    const data = {
      "test-game": { quizBest: 10, quizTotal: 12, challengeBest: 5, bestStreak: 8, learnedCount: 3, gamesPlayed: 4 },
    };
    localStorage.setItem("ilg_progress", JSON.stringify(data));
    expect(getAllProgress()).toEqual(data);
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("ilg_progress", "not-valid-json{{{");
    expect(getAllProgress()).toEqual({});
  });
});
