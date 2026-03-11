export type TimerPhase = "focus" | "break" | "long-break";

export interface TimerSettings {
  pomodoro: number; // minutes
  breakDuration: number; // minutes
  longBreak: number; // minutes
}

export interface TimerSliceState {
  phase: TimerPhase;
  running: boolean;
  seconds: number;
  overtime: boolean; // true when counting up past the focus target
  pomodoroCount: number; // focus intervals completed in current cycle (0–3)
  pomodoroSetId: string | null;
  sessionStartedAt: string | null; // ISO timestamp; null = idle (not yet started or just reset)
  timerSettings: TimerSettings;
}

export interface TimerSliceActions {
  setRunning: (running: boolean) => void;
  setSeconds: (seconds: number) => void;
  setOvertime: (overtime: boolean) => void;
  setSessionStartedAt: (at: string | null) => void;
  setPomodoroSetId: (id: string | null) => void;
  advanceChaidoroPhase: () => void;
  resetTimer: () => void;
}

export type TimerSlice = TimerSliceState & TimerSliceActions;

const DEFAULT_SETTINGS: TimerSettings = {
  pomodoro: 25,
  breakDuration: 5,
  longBreak: 15,
};

export const createTimerSlice = (set, get, _api?): TimerSlice => ({
  phase: "focus",
  running: false,
  seconds: DEFAULT_SETTINGS.pomodoro * 60,
  overtime: false,
  pomodoroCount: 0,
  pomodoroSetId: null,
  sessionStartedAt: null,
  timerSettings: DEFAULT_SETTINGS,

  setRunning: (running) => set({ running }),
  setSeconds: (seconds) => set({ seconds }),
  setOvertime: (overtime) => set({ overtime }),
  setSessionStartedAt: (at) => set({ sessionStartedAt: at }),
  setPomodoroSetId: (id) => set({ pomodoroSetId: id }),

  advanceChaidoroPhase: () => {
    const { phase, pomodoroCount, timerSettings } = get();
    let newPhase: TimerPhase;
    let newPomodoroCount = pomodoroCount;
    let newSetId: string | null = get().pomodoroSetId;

    if (phase === "focus") {
      newPomodoroCount = pomodoroCount + 1;
      if (newPomodoroCount >= 4) {
        newPhase = "long-break";
        newPomodoroCount = 0;
        newSetId = null; // cycle finished
      } else {
        newPhase = "break";
      }
    } else {
      // break or long-break ends → next focus interval
      newPhase = "focus";
      if (!newSetId) {
        newSetId = crypto.randomUUID();
      }
    }

    const newSeconds =
      newPhase === "focus"
        ? timerSettings.pomodoro * 60
        : newPhase === "break"
          ? timerSettings.breakDuration * 60
          : timerSettings.longBreak * 60;

    set({
      phase: newPhase,
      pomodoroCount: newPomodoroCount,
      pomodoroSetId: newSetId,
      seconds: newSeconds,
      running: false,
      overtime: false,
      sessionStartedAt: null,
    });
  },

  resetTimer: () => {
    const { timerSettings } = get();
    set({
      running: false,
      seconds: timerSettings.pomodoro * 60,
      phase: "focus",
      pomodoroCount: 0,
      pomodoroSetId: null,
      sessionStartedAt: null,
      overtime: false,
    });
  },
});
