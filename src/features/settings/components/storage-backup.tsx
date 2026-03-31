import { useRef } from "react";
import { Download, Upload } from "lucide-react";
import StoragePieChart from "@/features/settings/components/storage-pie-chart";
import { exportJSON, importJSON } from "@/lib/storageActions";
import { showSettingsToast } from "@/features/settings/components/settings-toast";

export default function StorageBackup() {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  );
}
