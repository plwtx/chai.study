import type { Session } from "@/types";
import { db } from "@/db";

export interface SessionSliceActions {
  getSessionsInRange: (
    start: number,
    end: number,
  ) => Promise<Session[]>;
  recoverDraft: () => Promise<boolean>;
}

export type SessionSlice = SessionSliceActions;

export const createSessionSlice = (): SessionSlice => ({
  getSessionsInRange: async (start, end) => {
    return db.sessions
      .where("[mode+completedAt]")
      .between(["focus", start], ["focus", end], true, true)
      .toArray();
  },

  recoverDraft: async () => {
    const draft = await db.sessionDraft.get("current");
    return draft !== undefined;
  },
});
