import { useEffect, useState } from "react";
import { liveQuery } from "dexie";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { db } from "@/db";
import type { Session } from "@/types";
import { deleteSession } from "@/lib/storageActions";

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default function EventLog() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // liveQuery re-runs automatically on any sessions table change
    // (per-row delete, clear log, clear all, import all trigger this)
    const subscription = liveQuery(() =>
      db.sessions
        .where("mode")
        .equals("focus")
        .reverse()
        .sortBy("completedAt")
    ).subscribe({
      next: (result) => {
        setSessions(result);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteSession(id);
  };

  if (loading) {
    return (
      <p className="text-brown-400 dark:text-dark-100/50 py-4 text-xs">
        Loading...
      </p>
    );
  }

  if (sessions.length === 0) {
    return (
      <p className="text-brown-400 dark:text-dark-100/50 py-4 text-xs">
        No focus sessions recorded yet.
      </p>
    );
  }

  return (
    <div className="flex max-h-64 flex-col gap-3 overflow-y-auto pr-1">
      <AnimatePresence initial={false}>
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="group border-brown-200/50 dark:border-dark-600/50 flex items-center justify-between gap-4 rounded-lg border px-3 py-2"
          >
            <div className="font-fragment-mono flex w-96 items-center justify-stretch gap-6 text-xs">
              <span className="text-brown-500 dark:text-dark-100/50 w-20 text-nowrap">
                {formatDate(session.completedAt)}
              </span>
              <span className="text-brown-500 dark:text-dark-100/50 w-16">
                {formatTime(session.completedAt)}
              </span>
              <span className="text-brown-800 dark:text-dark-100">
                {formatDuration(session.actualDuration)}
              </span>
              {/* Session interrupted */}
              {/* {session.interrupted && (
                <span className="text-[10px] text-amber-600 dark:text-amber-400">
                  interrupted
                </span>
              )} */}
            </div>
            <button
              onClick={() => handleDelete(session.id)}
              className="cursor-pointer opacity-0 transition-opacity duration-150 group-hover:opacity-100"
              title="Delete session"
            >
              <X className="text-brown-400 dark:text-dark-100/40 size-6 hover:text-red-500 dark:hover:text-red-400" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
