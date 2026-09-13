export const PROGRESS_STORAGE_KEY = "time-travel-progress-v1";

export type Progress = {
  completedBriefingIds: string[];
};

const emptyProgress = (): Progress => ({ completedBriefingIds: [] });

const storage = (): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const loadProgress = (): Progress => {
  const store = storage();
  if (!store) return emptyProgress();

  let raw: string | null;
  try {
    raw = store.getItem(PROGRESS_STORAGE_KEY);
  } catch {
    return emptyProgress();
  }
  if (!raw) return emptyProgress();

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return emptyProgress();
  }
  if (
    !parsed ||
    typeof parsed !== "object" ||
    !Array.isArray((parsed as { completedBriefingIds?: unknown }).completedBriefingIds)
  ) {
    return emptyProgress();
  }

  const ids = (parsed as { completedBriefingIds: unknown[] }).completedBriefingIds;
  if (ids.some((id) => typeof id !== "string")) return emptyProgress();
  const validIds = ids as string[];
  return { completedBriefingIds: [...new Set(validIds.filter((id) => id.length > 0))] };
};

const saveProgress = (progress: Progress): Progress => {
  const store = storage();
  if (!store) return emptyProgress();
  try {
    store.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    return progress;
  } catch {
    return emptyProgress();
  }
};

export const completeLesson = (briefingId: string): Progress => {
  const progress = loadProgress();
  if (!briefingId || progress.completedBriefingIds.includes(briefingId)) return progress;
  return saveProgress({ completedBriefingIds: [...progress.completedBriefingIds, briefingId] });
};

export const resetProgress = (): Progress => {
  const store = storage();
  if (!store) return emptyProgress();
  try {
    store.removeItem(PROGRESS_STORAGE_KEY);
    return emptyProgress();
  } catch {
    return emptyProgress();
  }
};
