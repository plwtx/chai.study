import { create } from "zustand";

export type HydrationStage =
  | "init"
  | "storage"
  | "settings"
  | "timezone"
  | "daily-reset"
  | "tasks"
  | "fonts"
  | "draft"
  | "ready"
  | "error";

interface HydrationState {
  stage: HydrationStage;
  label: string;
  progress: number;
  ready: boolean;
  error: string | null;
  setStage: (stage: HydrationStage, label: string, progress: number) => void;
  finish: () => void;
  fail: (message: string) => void;
}

export const useHydrationStore = create<HydrationState>((set) => ({
  stage: "init",
  label: "Starting up",
  progress: 0,
  ready: false,
  error: null,
  setStage: (stage, label, progress) => set({ stage, label, progress }),
  finish: () =>
    set({
      ready: true,
      stage: "ready",
      label: "Ready",
      progress: 100,
    }),
  fail: (message) =>
    set({
      stage: "error",
      label: message,
      error: message,
    }),
}));
