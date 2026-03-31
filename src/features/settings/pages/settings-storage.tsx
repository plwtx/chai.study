import { useCallback, useEffect, useRef, useState } from "react";
import HeaderDescription from "@/components/ui/header-description";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import StoragePieChart from "@/features/settings/components/storage-pie-chart";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import { showSettingsToast } from "@/features/settings/components/settings-toast";
import {
  exportJSON,
  importJSON,
  clearAllData,
  deleteSession,
} from "@/lib/storageActions";
import { db } from "@/db";
import type { Session } from "@/types";
import { Download, Upload, Trash2, X, AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function ClearConfirmModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const handleDelete = async () => {
    await clearAllData();
    onClose();
    showSettingsToast("All data cleared.");
  };

  const handleDownloadThenClose = async () => {
    await exportJSON();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-brown-50 dark:bg-dark-600 border-brown-200 dark:border-dark-600 mx-4 w-full max-w-md rounded-xl border p-6 shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="size-5 stroke-red-500" />
              <h3 className="text-brown-900 dark:text-dark-100 text-base font-medium">
                Clear all data?
              </h3>
            </div>
            <p className="text-brown-700 dark:text-dark-100/70 mb-6 text-sm">
              This action is irreversible and will permanently remove all your
              focus sessions, tasks, and settings. Consider downloading a backup
              first.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleDownloadThenClose}
                className="border-brown-200 dark:border-dark-600 dark:bg-dark-900/45 dark:text-dark-100 bg-brown-100 hover:bg-brown-200/55 flex cursor-pointer items-center justify-center gap-3 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95 hover:dark:bg-black/50"
              >
                <Download className="size-4" />
                Download
              </button>
              <button
                onClick={onClose}
                className="border-brown-200 dark:border-dark-600 dark:bg-dark-900/45 dark:text-dark-100 bg-brown-100 hover:bg-brown-200/55 cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95 hover:dark:bg-black/50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all duration-150 hover:bg-red-100 active:scale-95 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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

function EventLog() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSessions = useCallback(async () => {
    const all = await db.sessions
      .where("mode")
      .equals("focus")
      .reverse()
      .sortBy("completedAt");
    setSessions(all);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleDelete = async (id: string) => {
    await deleteSession(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
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
    <div className="mt-3 flex max-h-64 flex-col gap-1 overflow-y-auto pr-1">
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
            <div className="font-fragment-mono flex items-center gap-4 text-xs">
              <span className="text-brown-500 dark:text-dark-100/50 w-20">
                {formatDate(session.completedAt)}
              </span>
              <span className="text-brown-500 dark:text-dark-100/50 w-16">
                {formatTime(session.completedAt)}
              </span>
              <span className="text-brown-800 dark:text-dark-100">
                {formatDuration(session.actualDuration)}
              </span>
              {session.interrupted && (
                <span className="text-[10px] text-amber-600 dark:text-amber-400">
                  interrupted
                </span>
              )}
            </div>
            <button
              onClick={() => handleDelete(session.id)}
              className="cursor-pointer opacity-0 transition-opacity duration-150 group-hover:opacity-100"
              title="Delete session"
            >
              <X className="text-brown-400 dark:text-dark-100/40 size-3.5 hover:text-red-500 dark:hover:text-red-400" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function Settings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clearModalOpen, setClearModalOpen] = useState(false);

  const handleDownload = async () => {
    await exportJSON();
    showSettingsToast("Backup downloaded.");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importJSON(file);
      showSettingsToast("Backup imported successfully.");
    } catch {
      showSettingsToast("Import failed — invalid file format.");
    }
    e.target.value = "";
  };

  return (
    <>
      <div className="font-poppins text-brown-800 dark:text-dark-100 h-full w-full text-sm">
        <HeaderDescription
          header={"Local storage"}
          description={
            "The app runs on your device without ever leaving. It does not collect any data nor track your usage. For this to be possible, it uses your browser storage called IndexedDB. You can check the saved raw data by pressing F12 on your browser,going to the application tab on the opened window, then clicking to IndexedDB. In this page you can see the same data with formatting to make it easier to read."
          }
          kaomoji={null}
        />

        <div className="bg-brown-300 dark:bg-dark-100/20 mx-auto my-6 h-px w-full rounded-full" />
        <SubHeaderDescription
          header={"Used storage"}
          description={
            "Total used storage in your browser's local storage (IndexedDB)."
          }
        />

        {/* Pie chart + Imp/Exp buttons */}
        <section className="flex h-full w-full items-center justify-between">
          <StoragePieChart />

          <div className="flex h-full w-fit flex-col justify-between gap-6">
            {/* Export button */}
            <button
              onClick={handleDownload}
              className="border-brown-200/75 shadow-brown-300 dark:bg-dark-900/45 bg-brown-100 dark:border-dark-900 hover:bg-brown-200/55 flex w-full min-w-45 cursor-pointer items-center justify-between gap-6 rounded-lg border p-2 px-4 text-left font-medium shadow-sm transition-all duration-150 ease-in-out active:scale-95 dark:shadow-black hover:dark:bg-black/50"
            >
              <span>Download</span>
              <Download className="size-4" />
            </button>
            {/* Import button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="border-brown-200/75 shadow-brown-300 dark:bg-dark-900/45 bg-brown-100 dark:border-dark-900 hover:bg-brown-200/55 flex w-full min-w-45 cursor-pointer items-center justify-between gap-6 rounded-lg border p-2 px-4 text-left font-medium shadow-sm transition-all duration-150 ease-in-out active:scale-95 dark:shadow-black hover:dark:bg-black/50"
            >
              <span>Upload</span>
              <Upload className="size-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleUpload}
            />
          </div>
        </section>

        {/* Divider */}
        <HorizontalDivider />

        {/* Clear storage */}
        <SubHeaderDescription
          header={"Clear storage"}
          description={"Delete all data from your browser's local storage."}
        />
        <button
          onClick={() => setClearModalOpen(true)}
          className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all duration-150 hover:bg-red-100 active:scale-95 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950"
        >
          <Trash2 className="size-4" />
          <span>Clear all data</span>
        </button>

        {/* Divider */}
        <HorizontalDivider />

        {/* Event log */}
        <SubHeaderDescription
          header={"Focus session log"}
          description={
            "History of all recorded focus sessions. Click × to remove an entry."
          }
        />
        <section>
          <EventLog />
        </section>
      </div>

      <ClearConfirmModal
        open={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
      />
    </>
  );
}
