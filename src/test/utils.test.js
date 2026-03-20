import { describe, it, expect } from "vitest";
import { shuffle, makeQuestions, DIFFICULTIES } from "../components/game/utils";

describe("shuffle", () => {
  it("returns array of same length", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result).toHaveLength(arr.length);
  });

  it("contains the same elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result.sort()).toEqual(arr.sort());
  });

  it("does not mutate original array", () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });

  it("handles empty array", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("handles single element", () => {
    expect(shuffle([42])).toEqual([42]);
  });
});

describe("makeQuestions", () => {
  const data = [
    { name: "A", value: "1" },
    { name: "B", value: "2" },
    { name: "C", value: "3" },
    { name: "D", value: "4" },
    { name: "E", value: "5" },
  ];

  const questionTypes = [
    { prompt: (item) => `What is ${item.name}?`, answer: (item) => item.value },
  ];

  it("generates correct number of questions", () => {
    const qs = makeQuestions({ data, count: 3, questionTypes });
    expect(qs).toHaveLength(3);
  });

  it("each question has required properties", () => {
    const qs = makeQuestions({ data, count: 2, questionTypes });
    qs.forEach((q) => {
      expect(q).toHaveProperty("item");
      expect(q).toHaveProperty("prompt");
      expect(q).toHaveProperty("correct");
      expect(q).toHaveProperty("options");
    });
  });

  it("correct answer is always in options", () => {
    const qs = makeQuestions({ data, count: 5, questionTypes });
    qs.forEach((q) => {
      expect(q.options).toContain(q.correct);
    });
  });

  it("generates 4 options by default", () => {
    const qs = makeQuestions({ data, count: 3, questionTypes });
    qs.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it("respects custom optionCount", () => {
    const qs = makeQuestions({ data, count: 3, questionTypes, optionCount: 3 });
    qs.forEach((q) => {
      expect(q.options).toHaveLength(3);
    });
  });

  it("does not exceed data length", () => {
    const qs = makeQuestions({ data, count: 100, questionTypes });
    expect(qs.length).toBeLessThanOrEqual(data.length);
  });

  it("options have no duplicates", () => {
    const qs = makeQuestions({ data, count: 5, questionTypes });
    qs.forEach((q) => {
      const unique = new Set(q.options);
      expect(unique.size).toBe(q.options.length);
    });
  });
});

describe("DIFFICULTIES", () => {
  it("exports three difficulty levels", () => {
    expect(DIFFICULTIES).toHaveLength(3);
  });

  it("each difficulty has required properties", () => {
    DIFFICULTIES.forEach((d) => {
      expect(d).toHaveProperty("key");
      expect(d).toHaveProperty("label");
      expect(d).toHaveProperty("icon");
      expect(d).toHaveProperty("quizCount");
      expect(d).toHaveProperty("challengeTime");
      expect(d).toHaveProperty("options");
    });
  });

  it("has easy, normal, hard keys", () => {
    const keys = DIFFICULTIES.map((d) => d.key);
    expect(keys).toEqual(["easy", "normal", "hard"]);
  });
});
