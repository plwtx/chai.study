import { ChevronDown, ScrollText } from "lucide-react";

export type ViewMode = "daily" | "weekly" | "monthly" | "yearly";

const VIEW_MODES: ViewMode[] = ["daily", "weekly", "monthly", "yearly"];

const VIEW_MODE_LABELS: Record<ViewMode, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
};

interface StatsViewControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onViewLogs: () => void;
}

export default function StatsViewControls({
  viewMode,
  onViewModeChange,
  onViewLogs,
}: StatsViewControlsProps) {
  return (
    <section className="flex items-center justify-between">
      {/* View mode toggle */}
      <div className="bg-brown-200/45 dark:bg-dark-900 shadow-brown-600 flex h-fit w-fit gap-3 overflow-clip rounded-full p-2 shadow-inner dark:shadow-black">
        {VIEW_MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className={
              viewMode === mode
                ? "bg-brown-600 shadow-brown-900 text-brown-50 dark:text-dark-900 dark:bg-dark-100 rounded-full p-1 px-9 font-semibold shadow-xs"
                : "rounded-full p-1 px-9"
            }
          >
            {VIEW_MODE_LABELS[mode]}
          </button>
        ))}
      </div>
      {/* View logs button */}
      <button
        onClick={onViewLogs}
        className="bg-brown-600 dark:bg-dark-900 shadow-brown-600 flex gap-3 rounded-full p-3 shadow-sm transition-all active:scale-95 dark:shadow-black"
      >
        <ScrollText className="stroke-brown-50 stroke-[1px]" />
        <ChevronDown className="stroke-brown-50 rotate-270 stroke-[1px]" />
      </button>
    </section>
  );
}
