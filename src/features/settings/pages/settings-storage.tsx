import { useState } from "react";
import HeaderDescription from "@/components/ui/header-description";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import StorageBackup from "@/features/settings/components/storage-backup";
import EventLog from "@/features/settings/components/event-log";
import ConfirmModal from "@/features/settings/components/confirm-modal";
import { showSettingsToast } from "@/features/settings/components/settings-toast";
import {
  exportJSON,
  clearAllData,
  clearFocusSessions,
} from "@/lib/storageActions";
import { Trash2 } from "lucide-react";

export default function Settings() {
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const [clearLogModalOpen, setClearLogModalOpen] = useState(false);

  const handleClearAll = async () => {
    await clearAllData();
    showSettingsToast("All data cleared.");
  };

  const handleClearLog = async () => {
    await clearFocusSessions();
    showSettingsToast("Focus log cleared.");
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

        {/* Pie chart + Import/Export buttons */}
        <StorageBackup />

        {/* Divider */}
        <HorizontalDivider />

        {/* Clear storage */}
        <section className="my-6 flex h-fit w-full items-center justify-between">
          <div className="w-2/3">
            <SubHeaderDescription
              header={"Clear storage"}
              description={
                "Delete ALL DATA (NOT JUST FOCUS LOG) from your browser's local storage. Including your client settings, themes and more.This action is irreversible, please be carefull and back up your data prior deletion."
              }
            />
          </div>
          <button
            onClick={() => setClearModalOpen(true)}
            className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all duration-150 hover:bg-red-100 active:scale-95 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950"
          >
            <Trash2 className="size-4" />
            <span>Clear all data</span>
          </button>
        </section>

        {/* Divider */}
        <HorizontalDivider />

        {/* Event log */}
        <div className="flex items-center justify-between">
          <SubHeaderDescription
            header={"Focus session log"}
            description={
              "History of all recorded focus sessions. Click × to remove an entry."
            }
          />
          <button
            onClick={() => setClearLogModalOpen(true)}
            className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-all duration-150 hover:bg-red-100 active:scale-95 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950"
          >
            <Trash2 className="size-3" />
            <span>Clear log</span>
          </button>
        </div>
        {/* Event Log */}
        <section className="dark:bg-dark-900/25 bg-brown-300/10 border-brown-200 dark:border-dark-900/75 my-6 rounded-xl border p-1 px-3">
          <EventLog />
        </section>
      </div>

      <ConfirmModal
        open={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        title="Clear all data?"
        description="This action is irreversible and will permanently remove all your focus sessions, tasks, and settings. Consider downloading a backup first."
        confirmLabel="Delete"
        onConfirm={handleClearAll}
        downloadAction={exportJSON}
      />
      <ConfirmModal
        open={clearLogModalOpen}
        onClose={() => setClearLogModalOpen(false)}
        title="Clear focus log?"
        description="This will permanently remove all recorded focus sessions. Your tasks and settings will not be affected."
        confirmLabel="Clear log"
        onConfirm={handleClearLog}
      />
    </>
  );
}
