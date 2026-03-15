import type { Task, TaskStatus } from "@/types";
import { db } from "@/db";

export interface TaskSliceState {
  tasks: Task[];
  activeTaskId: string | null;
}

export interface TaskSliceActions {
  loadTasks: () => Promise<void>;
  addTask: (
    title: string,
    description?: string,
    project?: string | null,
  ) => Promise<void>;
  updateTask: (id: string, patch: Partial<Task>) => Promise<void>;
  moveTask: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setActiveTask: (id: string | null) => void;
}

export type TaskSlice = TaskSliceState & TaskSliceActions;

export const createTaskSlice = (set, get): TaskSlice => ({
  tasks: [],
  activeTaskId: null,

  loadTasks: async () => {
    const tasks = await db.tasks.orderBy("createdAt").toArray();
    set({ tasks });
  },

  addTask: async (title, description = "", project = null) => {
    const now = Date.now();
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "todo",
      project,
      createdAt: now,
      updatedAt: now,
    };
    await db.tasks.add(task);
    set({ tasks: [...get().tasks, task] });
  },

  updateTask: async (id, patch) => {
    const updatedPatch = { ...patch, updatedAt: Date.now() };
    await db.tasks.update(id, updatedPatch);
    set({
      tasks: get().tasks.map((t) =>
        t.id === id ? { ...t, ...updatedPatch } : t,
      ),
    });
  },

  moveTask: async (id, status) => {
    const now = Date.now();
    await db.tasks.update(id, { status, updatedAt: now });
    set({
      tasks: get().tasks.map((t) =>
        t.id === id ? { ...t, status, updatedAt: now } : t,
      ),
    });
  },

  deleteTask: async (id) => {
    await db.tasks.delete(id);
    set({
      tasks: get().tasks.filter((t) => t.id !== id),
      activeTaskId:
        get().activeTaskId === id ? null : get().activeTaskId,
    });
  },

  setActiveTask: (id) => set({ activeTaskId: id }),
});
