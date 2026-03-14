import { useEffect } from "react";
import { useAppStore } from "@/store/index";
import { timerBridge } from "../services/timerBridge";
import type { TimerMode } from "@/types";

function getNextMode(
  currentMode: TimerMode,
  focusCount: number,
  longBreakInterval: number,
): TimerMode {
  if (currentMode === "focus") {
    return focusCount >= longBreakInterval ? "long-break" : "break";
  }
  return "focus";
}

function getDuration(mode: TimerMode, settings: { focusDuration: number; shortBreakDuration: number; longBreakDuration: number }): number {
  switch (mode) {
    case "focus":
      return settings.focusDuration;
    case "break":
      return settings.shortBreakDuration;
    case "long-break":
      return settings.longBreakDuration;
  }
}

export function useTimer() {
  useEffect(() => {
    const unsubTick = timerBridge.onTick(() => {
      useAppStore.getState().tick();
    });

    const unsubComplete = timerBridge.onComplete(() => {
      useAppStore.getState().finish();
    });

    return () => {
      unsubTick();
      unsubComplete();
    };
  }, []);

  const store = useAppStore();

  function start() {
    if (store.status === "running") return;

    if (store.status === "paused") {
      timerBridge.resume();
      useAppStore.getState().resume();
      return;
    }

    // idle or finished → determine mode and start
    const state = useAppStore.getState();
    let mode: TimerMode;
    if (state.status === "finished") {
      mode = getNextMode(
        state.mode,
        state.focusCount,
        state.settings.longBreakInterval,
      );
    } else {
      mode = state.mode;
    }

    const duration = getDuration(mode, state.settings);
    timerBridge.start("countdown", duration);
    state.start(mode, duration, state.activeTaskId);
  }

  function pause() {
    if (store.status !== "running") return;
    timerBridge.pause();
    useAppStore.getState().pause();
  }

  function endCycle() {
    const state = useAppStore.getState();
    if (state.status === "idle") return;

    if (state.status !== "finished" && state.elapsed > 0) {
      state.finish();
    }

    timerBridge.reset();
    useAppStore.getState().reset();
  }

  return {
    seconds: Math.max(0, store.targetDuration - store.elapsed),
    status: store.status,
    mode: store.mode,
    elapsed: store.elapsed,
    targetDuration: store.targetDuration,
    focusCount: store.focusCount,
    start,
    pause,
    endCycle,
  };
}
