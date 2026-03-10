export type SessionMode = "focus" | "break" | "long-break";
export type SessionType = "focus" | "pomodoro";

export interface Session {
  id: string;
  type: SessionType;
  mode: SessionMode;
  pomodoroSetId: string | null;
  targetDuration: number | null; // seconds; null for open-ended focus mode
  actualDuration: number; // seconds; use this for all stats
  completedAt: string; // ISO timestamp
  taskId: string | null;
}

export interface SessionSliceState {
  sessions: Session[]; // in-memory; hydrated from Dexie on app boot (WILL DO THIS IN FUTURE)
  pendingQuote: string | null; // shown in the post-session modal; cleared on dismiss
}

export interface SessionSliceActions {
  addSession: (session: Session) => void;
  setPendingQuote: (quote: string | null) => void;
}

export type SessionSlice = SessionSliceState & SessionSliceActions;

export const createSessionSlice = (set, _get, _api?): SessionSlice => ({
  sessions: [],
  pendingQuote: null,

  addSession: (session) =>
    set((state) => ({ sessions: [...state.sessions, session] })),

  setPendingQuote: (quote) => set({ pendingQuote: quote }),
});
