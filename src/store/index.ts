import { create } from "zustand";
import { createTimerSlice, type TimerSlice } from "./timerSlice";
import { createSessionSlice, type SessionSlice } from "./sessionSlice";

type AppStore = TimerSlice & SessionSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createTimerSlice(...a),
  ...createSessionSlice(...a),
}));
