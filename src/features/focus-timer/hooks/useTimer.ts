import { useEffect } from "react";
import { useAppStore } from "@/store/index";
import { timerBridge } from "../services/timerBridge";

export function useTimer() {
  useEffect(() => {
    const unsubTick = timerBridge.onTick((seconds) => {
      useAppStore.getState().setSeconds(seconds);
    });

    const unsubComplete = timerBridge.onComplete(() => {
      const state = useAppStore.getState();
      const {
        phase,
        sessionStartedAt,
        timerSettings,
        pomodoroSetId,
        addSession,
        setOvertime,
      } = state;

      const completedAt = new Date().toISOString();
      const startedAt = sessionStartedAt ?? completedAt;
      const actualDuration = Math.round(
        (Date.now() - new Date(startedAt).getTime()) / 1000,
      );

      if (phase === "focus") {
        // Record the completed focus session
        addSession({
          id: crypto.randomUUID(),
          type: "pomodoro",
          mode: "focus",
          pomodoroSetId,
          targetDuration: timerSettings.pomodoro * 60,
          actualDuration,
          completedAt,
          taskId: null,
        });
        // Switch to overtime: count up from the pomodoro target
        setOvertime(true);
        timerBridge.start("countup", timerSettings.pomodoro * 60);
      } else {
        // break or long-break completed
        addSession({
          id: crypto.randomUUID(),
          type: "pomodoro",
          mode: phase,
          pomodoroSetId,
          targetDuration:
            phase === "break"
              ? timerSettings.breakDuration * 60
              : timerSettings.longBreak * 60,
          actualDuration,
          completedAt,
          taskId: null,
        });
        useAppStore.getState().advanceChaidoroPhase();
      }
    });

    return () => {
      unsubTick();
      unsubComplete();
    };
  }, []); // register once; callbacks always read fresh state via getState()

  const store = useAppStore();

  const isIdle = store.sessionStartedAt === null;
  const status = store.running ? "running" : isIdle ? "idle" : "paused";

  function start() {
    if (store.running) return;

    if (status === "idle") {
      if (!store.pomodoroSetId && store.phase === "focus") {
        useAppStore.getState().setPomodoroSetId(crypto.randomUUID());
      }
      timerBridge.start("countdown", store.seconds);
      useAppStore.getState().setSessionStartedAt(new Date().toISOString());
    } else {
      timerBridge.resume();
    }

    useAppStore.getState().setRunning(true);
  }

  function pause() {
    if (!store.running) return;
    timerBridge.pause();
    useAppStore.getState().setRunning(false);
  }

  function reset() {
    timerBridge.reset();
    useAppStore.getState().resetTimer();
  }

  return {
    seconds: store.seconds,
    running: store.running,
    status,
    overtime: store.overtime,
    phase: store.phase,
    pomodoroCount: store.pomodoroCount,
    start,
    pause,
    reset,
  };
}
