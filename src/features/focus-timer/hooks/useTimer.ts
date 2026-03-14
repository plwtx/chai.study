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
      const { phase, timerSettings, pomodoroSetId, addSession, setOvertime } =
        state;

      const completedAt = new Date().toISOString();

      if (phase === "focus") {
        // Countdown hit zero — actual == target (no wall-clock delta, no paused time)
        const targetDuration = timerSettings.pomodoro * 60;
        addSession({
          id: crypto.randomUUID(),
          type: "pomodoro",
          mode: "focus",
          pomodoroSetId,
          targetDuration,
          actualDuration: targetDuration,
          completedAt,
          taskId: null,
        });
        // Switch to overtime: count up from the pomodoro target
        setOvertime(true);
        timerBridge.start("countup", timerSettings.pomodoro * 60);
      } else {
        // break or long-break completed
        const targetDuration =
          phase === "break"
            ? timerSettings.breakDuration * 60
            : timerSettings.longBreak * 60;
        addSession({
          id: crypto.randomUUID(),
          type: "pomodoro",
          mode: phase,
          pomodoroSetId,
          targetDuration,
          actualDuration: targetDuration,
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

  function endCycle() {
    const state = useAppStore.getState();
    const {
      seconds,
      timerSettings,
      pomodoroSetId,
      overtime,
      sessionStartedAt,
      addSession,
    } = state;

    const minimumSeconds = timerSettings.minimumFocusTime * 60;

    if (overtime) {
      // During overtime, seconds counts up from pomodoro * 60
      // The full session (25 min) was already saved when countdown hit zero.
      // Save only the extra overtime portion if it meets the minimum.
      const overtimeSeconds = seconds - timerSettings.pomodoro * 60;
      if (overtimeSeconds >= minimumSeconds) {
        addSession({
          id: crypto.randomUUID(),
          type: "pomodoro",
          mode: "focus",
          pomodoroSetId,
          targetDuration: timerSettings.pomodoro * 60,
          actualDuration: overtimeSeconds,
          completedAt: new Date().toISOString(),
          taskId: null,
        });
      }
    } else if (sessionStartedAt) {
      // Use seconds from the store: it pauses/resumes with the worker, so it
      // accurately reflects running time without counting paused duration.
      const elapsedSeconds = timerSettings.pomodoro * 60 - seconds;
      if (elapsedSeconds >= minimumSeconds) {
        addSession({
          id: crypto.randomUUID(),
          type: "pomodoro",
          mode: "focus",
          pomodoroSetId,
          targetDuration: timerSettings.pomodoro * 60,
          actualDuration: elapsedSeconds,
          completedAt: new Date().toISOString(),
          taskId: null,
        });
      }
    }

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
    timerSettings: store.timerSettings,
    start,
    pause,
    endCycle,
  };
}
