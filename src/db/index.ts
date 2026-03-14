import Dexie, { type Table } from "dexie";
import type {
  Session,
  SessionDraft,
  Task,
  Settings,
} from "@/types";

export class ChaidoroDB extends Dexie {
  sessions!: Table<Session, string>;
  sessionDraft!: Table<SessionDraft, string>;
  tasks!: Table<Task, string>;
  settings!: Table<Settings, string>;

  constructor() {
    super("ChaidoroDB");
    this.version(1).stores({
      sessions:
        "id, completedAt, pomodoroSetId, taskId, mode, [mode+completedAt]",
      sessionDraft: "id",
      tasks: "id, status, project",
      settings: "key",
    });
  }
}

export const db = new ChaidoroDB();
