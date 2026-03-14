import type { TimerStatus, TimerMode } from "@/types";
import { db } from "@/db";

export interface TimerSliceState {
  status: TimerStatus;
  mode: TimerMode;
  elapsed: number;
  targetDuration: number;
  pomodoroSetId: string | null;
  taskId: string | null;
  focusCount: number;
  hasDraftToRecover: boolean;
}

export interface TimerSliceActions {
  start: (
    mode: TimerMode,
    targetDuration: number,
    taskId?: string | null,
  ) => void;
  pause: () => void;
  resume: () => void;
  tick: () => void;
  finish: () => void;
  reset: () => void;
  setHasDraftToRecover: (has: boolean) => void;
}

export type TimerSlice = TimerSliceState & TimerSliceActions;

export const createTimerSlice = (set, get): TimerSlice => ({
  status: "idle",
  mode: "focus",
  elapsed: 0,
  targetDuration: 0,
  pomodoroSetId: null,
  taskId: null,
  focusCount: 0,
  hasDraftToRecover: false,

  start: (mode, targetDuration, taskId = null) => {
    const pomodoroSetId =
      get().pomodoroSetId ??
      (mode === "focus" ? crypto.randomUUID() : null);
    const now = Date.now();

    set({
      status: "running",
      mode,
      elapsed: 0,
      targetDuration,
      pomodoroSetId,
      taskId,
    });

    db.sessionDraft.put({
      id: "current",
      startedAt: now,
      mode,
      targetDuration,
      taskId,
      pomodoroSetId,
      lastCheckpointAt: now,
      elapsedAtCheckpoint: 0,
    });
  },

  pause: () => {
    const { elapsed } = get();
    set({ status: "paused" });
    db.sessionDraft.update("current", {
      lastCheckpointAt: Date.now(),
      elapsedAtCheckpoint: elapsed,
    });
  },

  resume: () => {
    set({ status: "running" });
  },

  tick: () => {
    const next = get().elapsed + 1;
    set({ elapsed: next });
    if (next % 60 === 0) {
      db.sessionDraft.update("current", {
        lastCheckpointAt: Date.now(),
        elapsedAtCheckpoint: next,
      });
    }
  },

  finish: () => {
    const {
      mode,
      elapsed,
      targetDuration,
      pomodoroSetId,
      taskId,
      focusCount,
    } = get();
    const interrupted = elapsed < targetDuration;
    const isLongBreak = mode === "long-break";

    db.sessions.add({
      id: crypto.randomUUID(),
      mode,
      targetDuration,
      actualDuration: elapsed,
      completedAt: Date.now(),
      pomodoroSetId,
      taskId,
      interrupted,
    });
    db.sessionDraft.delete("current");

    set({
      status: "finished",
      focusCount:
        mode === "focus"
          ? focusCount + 1
          : isLongBreak
            ? 0
            : focusCount,
      pomodoroSetId: isLongBreak ? null : pomodoroSetId,
    });
  },

  reset: () => {
    set({
      status: "idle",
      elapsed: 0,
      targetDuration: 0,
      taskId: null,
    });
  },

  setHasDraftToRecover: (has) => set({ hasDraftToRecover: has }),
});
