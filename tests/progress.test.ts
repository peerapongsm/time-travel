import { beforeEach, describe, expect, it, vi } from "vitest";
import { completeLesson, loadProgress, PROGRESS_STORAGE_KEY, resetProgress } from "../src/lib/progress";

describe("local lesson progress", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts empty, completes a briefing once, and survives reload reads", () => {
    expect(loadProgress()).toEqual({ completedBriefingIds: [] });
    expect(completeLesson("briefing-a")).toEqual({ completedBriefingIds: ["briefing-a"] });
    expect(completeLesson("briefing-a")).toEqual({ completedBriefingIds: ["briefing-a"] });
    expect(loadProgress()).toEqual({ completedBriefingIds: ["briefing-a"] });
    expect(window.localStorage.getItem(PROGRESS_STORAGE_KEY)).toContain("briefing-a");
  });

  it("returns empty progress for malformed or unavailable storage", () => {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, "not-json");
    expect(loadProgress()).toEqual({ completedBriefingIds: [] });

    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });
    expect(loadProgress()).toEqual({ completedBriefingIds: [] });
    getItem.mockRestore();
  });

  it("fails closed when storage cannot write or reset", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });
    expect(completeLesson("briefing-a")).toEqual({ completedBriefingIds: [] });
    setItem.mockRestore();

    completeLesson("briefing-a");
    const removeItem = vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });
    expect(resetProgress()).toEqual({ completedBriefingIds: [] });
    removeItem.mockRestore();
  });

  it("resets stored completion", () => {
    completeLesson("briefing-a");
    expect(resetProgress()).toEqual({ completedBriefingIds: [] });
    expect(loadProgress()).toEqual({ completedBriefingIds: [] });
  });
});
