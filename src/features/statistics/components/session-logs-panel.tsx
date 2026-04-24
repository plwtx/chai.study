import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Plus, Pencil, Trash2, Check } from "lucide-react";
import { db } from "@/db";
import type { Session } from "@/types";

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDayHeader(ts: number): string {
  const d = new Date(ts);
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const day = d.getDate();
  const month = d.toLocaleDateString("en-US", { month: "long" });
  return `${weekday}, ${day} ${month}`;
}

function toMins(seconds: number): number {
  return Math.round(seconds / 60);
}

function todayStr(): string {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

function groupByDay(
  sessions: Session[]
): { dayKey: string; dayLabel: string; items: Session[] }[] {
  const map = new Map<string, Session[]>();
  for (const s of sessions) {
    const d = new Date(s.completedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, items]) => ({
      dayKey: key,
      dayLabel: formatDayHeader(items[0].completedAt),
      items: items.sort((a, b) => b.completedAt - a.completedAt),
    }));
}

interface SessionLogsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SessionLogsPanel({
  open,
  onClose,
}: SessionLogsPanelProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMinutes, setEditMinutes] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addDate, setAddDate] = useState("");
  const [addMinutes, setAddMinutes] = useState("");

  const load = useCallback(async () => {
    const all = await db.sessions.where("mode").equals("focus").toArray();
    setSessions(all.sort((a, b) => b.completedAt - a.completedAt));
  }, []);

  useEffect(() => {
    if (open) {
      load();
      setEditingId(null);
      setDeletingId(null);
      setShowAdd(false);
    }
  }, [open, load]);

  async function saveEdit(s: Session) {
    const mins = parseInt(editMinutes, 10);
    if (!mins || mins < 1) return;
    const secs = mins * 60;
    await db.sessions.update(s.id, {
      actualDuration: secs,
      targetDuration: secs,
    });
    setEditingId(null);
    await load();
  }

  async function deleteSession(id: string) {
    await db.sessions.delete(id);
    setDeletingId(null);
    setEditingId(null);
    await load();
  }

  async function addSession() {
    const mins = parseInt(addMinutes, 10);
    if (!mins || mins < 1 || !addDate) return;
    const [y, m, d] = addDate.split("-").map(Number);
    const completedAt = new Date(y, m - 1, d, 12, 0, 0, 0).getTime();
    const secs = mins * 60;
    await db.sessions.add({
      id: crypto.randomUUID(),
      mode: "focus",
      targetDuration: secs,
      actualDuration: secs,
      completedAt,
      pomodoroSetId: null,
      taskId: null,
      interrupted: false,
    });
    setAddDate("");
    setAddMinutes("");
    setShowAdd(false);
    await load();
  }

  const groups = groupByDay(sessions);
  const maxDate = todayStr();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding panel */}
          <motion.aside
            className="bg-brown-50 dark:bg-dark-600 font-poppins border-brown-200 dark:border-dark-900 fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col border-l shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="border-brown-200 dark:border-dark-900 flex shrink-0 items-center justify-between border-b px-6 py-4">
              <h2 className="text-brown-900 dark:text-dark-100 text-lg font-semibold">
                All Sessions
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowAdd((v) => !v);
                    setEditingId(null);
                    setDeletingId(null);
                  }}
                  className="bg-brown-600 dark:bg-dark-900 flex size-7 items-center justify-center rounded-full transition-all active:scale-95"
                  title="Add session"
                >
                  <Plus className="stroke-brown-50 dark:stroke-dark-100 size-4" />
                </button>
                <button
                  onClick={onClose}
                  className="text-brown-400 dark:text-dark-300 hover:text-brown-700 dark:hover:text-dark-100 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Add session form */}
            <AnimatePresence>
              {showAdd && (
                <motion.div
                  className="border-brown-200 dark:border-dark-900 bg-brown-100/60 dark:bg-dark-900/40 shrink-0 overflow-hidden border-b"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="px-6 py-4">
                    <p className="text-brown-600 dark:text-dark-300 mb-3 text-xs font-medium">
                      Add Focus Session
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <label className="text-brown-500 dark:text-dark-400 w-16 shrink-0 text-xs">
                          Date
                        </label>
                        <input
                          type="date"
                          max={maxDate}
                          value={addDate}
                          onChange={(e) => setAddDate(e.target.value)}
                          className="border-brown-200 dark:border-dark-900 dark:bg-dark-700 text-brown-800 dark:text-dark-100 flex-1 rounded-lg border bg-white px-3 py-1.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-brown-500 dark:text-dark-400 w-16 shrink-0 text-xs">
                          Duration
                        </label>
                        <div className="flex flex-1 items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            max={480}
                            value={addMinutes}
                            onChange={(e) => setAddMinutes(e.target.value)}
                            placeholder="25"
                            className="border-brown-200 dark:border-dark-900 dark:bg-dark-700 text-brown-800 dark:text-dark-100 w-20 rounded-lg border bg-white px-3 py-1.5 text-xs focus:outline-none"
                          />
                          <span className="text-brown-400 dark:text-dark-400 text-xs">
                            min
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => setShowAdd(false)}
                          className="text-brown-400 dark:text-dark-400 text-xs hover:underline"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addSession}
                          className="bg-brown-600 dark:bg-dark-900 text-brown-50 dark:text-dark-100 rounded-lg px-3 py-1 text-xs transition-all active:scale-95"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Session list */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {groups.length === 0 && (
                <p className="text-brown-400 dark:text-dark-400 mt-16 text-center text-sm">
                  No sessions recorded yet.
                </p>
              )}
              {groups.map(({ dayKey, dayLabel, items }) => (
                <div key={dayKey} className="mb-9">
                  <p className="text-brown-500 dark:text-dark-400 mb-2 text-sm font-semibold">
                    {dayLabel}
                  </p>
                  <div className="flex flex-col gap-3">
                    {items.map((s) => {
                      const isEditing = editingId === s.id;
                      const isDeleting = deletingId === s.id;
                      return (
                        <div
                          key={s.id}
                          className="bg-brown-100 shadow-brown-300 rounded-lg shadow-sm"
                        >
                          {/* Session row */}
                          <div className="flex items-center justify-between p-4">
                            <div className="flex w-full flex-col">
                              <span className="text-xs">Focus</span>
                              <h3 className="text-brown-700 dark:text-dark-200text-left text-xl font-semibold">
                                {toMins(s.actualDuration)}{" "}
                                <span className="text-brown-500 text-xs font-normal">
                                  min.
                                </span>
                              </h3>
                            </div>
                            <span className="text-brown-400 dark:text-dark-400 px-3 text-xs text-nowrap">
                              {formatTime(s.completedAt)}
                            </span>
                            <button
                              onClick={() => {
                                if (isEditing) {
                                  setEditingId(null);
                                  setDeletingId(null);
                                } else {
                                  setEditingId(s.id);
                                  setEditMinutes(
                                    String(toMins(s.actualDuration))
                                  );
                                  setDeletingId(null);
                                }
                              }}
                              className="text-brown-300 dark:text-dark-500 hover:text-brown-600 dark:hover:text-dark-200 transition-colors"
                            >
                              <Pencil className="size-3" />
                            </button>
                          </div>

                          {/* Inline edit strip */}
                          <AnimatePresence>
                            {isEditing && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="overflow-hidden"
                              >
                                <div className="border-brown-200/70 dark:border-dark-900/70 flex items-center gap-2 border-t px-3 pt-2 pb-2.5">
                                  <input
                                    type="number"
                                    min={1}
                                    max={480}
                                    value={editMinutes}
                                    onChange={(e) =>
                                      setEditMinutes(e.target.value)
                                    }
                                    className="border-brown-200 dark:border-dark-900 dark:bg-dark-700 text-brown-800 dark:text-dark-100 w-16 rounded-lg border bg-white px-2 py-1 text-xs focus:outline-none"
                                  />
                                  <span className="text-brown-400 dark:text-dark-400 text-xs">
                                    min
                                  </span>
                                  <button
                                    onClick={() => saveEdit(s)}
                                    className="bg-brown-600 dark:bg-dark-900 ml-1 flex size-5 items-center justify-center rounded-full transition-all active:scale-95"
                                  >
                                    <Check className="stroke-brown-50 dark:stroke-dark-100 size-3" />
                                  </button>
                                  <div className="ml-auto">
                                    {isDeleting ? (
                                      <div className="flex items-center gap-2">
                                        <span className="text-brown-400 dark:text-dark-400 text-xs">
                                          Delete?
                                        </span>
                                        <button
                                          onClick={() => deleteSession(s.id)}
                                          className="text-xs text-red-500 hover:underline"
                                        >
                                          Yes
                                        </button>
                                        <button
                                          onClick={() => setDeletingId(null)}
                                          className="text-brown-400 dark:text-dark-400 text-xs hover:underline"
                                        >
                                          No
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => setDeletingId(s.id)}
                                        className="text-brown-300 dark:text-dark-500 transition-colors hover:text-red-500"
                                      >
                                        <Trash2 className="size-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
