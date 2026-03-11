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
}

export interface SessionSliceActions {
  addSession: (session: Session) => void;
}

export type SessionSlice = SessionSliceState & SessionSliceActions;

export const createSessionSlice = (set, _get, _api?): SessionSlice => ({
  sessions: [],

  addSession: (session) =>
    set((state) => ({ sessions: [...state.sessions, session] })),
});
