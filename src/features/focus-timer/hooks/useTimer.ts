import { useEffect } from "react";
import { useAppStore } from "@/store/index";
import { timerBridge } from "../services/timerBridge";
import quotes from "@/lib/quotes.json";

function randomQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function useTimer() {
  useEffect(() => {
    const unsubTick = timerBridge.onTick((seconds) => {
      useAppStore.getState().setSeconds(seconds);
    });

    const unsubComplete = timerBridge.onComplete(() => {
      const state = useAppStore.getState();
      const {
        timerMode,
        phase,
        sessionStartedAt,
        timerSettings,
        pomodoroSetId,
        advanceChaidoroPhase,
        addSession,
        setPendingQuote,
        setRunning,
      } = state;

      const completedAt = new Date().toISOString();
      const startedAt = sessionStartedAt ?? completedAt;
      const actualDuration = Math.round(
        (Date.now() - new Date(startedAt).getTime()) / 1000,
      );

      if (timerMode === "focus") {
        addSession({
          id: crypto.randomUUID(),
          type: "focus",
          mode: "focus",
          pomodoroSetId: null,
          targetDuration: null,
          actualDuration,
          completedAt,
          taskId: null,
        });
        setPendingQuote(randomQuote());
        setRunning(false);
      } else {
        // Chaidoro mode
        if (phase === "focus") {
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
          setPendingQuote(randomQuote());
        } else {
          // break or long-break completed — record it but no quote
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
        }
        advanceChaidoroPhase();
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
      // Fresh start — tell the worker to begin
      if (store.timerMode === "focus") {
        timerBridge.start("countup", store.seconds);
      } else {
        // Ensure a pomodoroSetId exists before starting the first focus interval
        if (!store.pomodoroSetId && store.phase === "focus") {
          useAppStore.getState().setPomodoroSetId(crypto.randomUUID());
        }
        timerBridge.start("countdown", store.seconds);
      }
      useAppStore.getState().setSessionStartedAt(new Date().toISOString());
    } else {
      // Resuming after a pause
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

  function toggleMode() {
    timerBridge.reset();
    const next = store.timerMode === "focus" ? "chaidoro" : "focus";
    useAppStore.getState().setTimerMode(next);
  }

  return {
    seconds: store.seconds,
    running: store.running,
    status,
    timerMode: store.timerMode,
    phase: store.phase,
    pomodoroCount: store.pomodoroCount,
    start,
    pause,
    reset,
    toggleMode,
  };
}
