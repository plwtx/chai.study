import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useGraphStats, type GraphViewMode } from "../hooks/useGraphStats";
import type { ViewMode } from "./stats-view-controls";

interface StatsGraphPanelProps {
  viewMode: ViewMode;
}

const BAR_VARIANTS = { hidden: { scaleY: 0 }, visible: { scaleY: 1 } };
const STAGGER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};
const INSTANT_VARIANTS = { hidden: {}, visible: {} };

function barColorClass(ratio: number): string {
  if (ratio >= 0.85) return "bg-brown-700";
  if (ratio >= 0.65) return "bg-brown-600";
  if (ratio >= 0.4) return "bg-brown-500";
  if (ratio >= 0.15) return "bg-brown-400";
  return "bg-brown-300";
}

export default function StatsGraphPanel({ viewMode }: StatsGraphPanelProps) {
  const [offset, setOffset] = useState(0);
  const reducedMotion = useAppStore((s) => s.settings.reducedMotion);

  useEffect(() => {
    setOffset(0);
  }, [viewMode]);

  const graphMode: GraphViewMode = viewMode === "daily" ? "weekly" : viewMode;
  const { bars, periodLabel, maxMinutes } = useGraphStats(graphMode, offset);

  const barTransition = {
    duration: reducedMotion ? 0 : 0.3,
    ease: "easeOut" as const,
  };
  const containerVariants = reducedMotion ? INSTANT_VARIANTS : STAGGER_VARIANTS;
  const barWidthClass =
    viewMode === "yearly" ? "w-5" : viewMode === "monthly" ? "w-2" : "w-8";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-3">
      {/* Date range navigation */}
      <div className="flex w-full items-center justify-between px-12 py-2 font-light">
        <button onClick={() => setOffset((o) => o - 1)}>
          <ChevronDown className="rotate-90 stroke-[1px]" />
        </button>
        <p className="text-sm">{periodLabel}</p>
        <button
          onClick={() => setOffset((o) => o + 1)}
          disabled={offset === 0}
          className={cn(offset === 0 && "cursor-not-allowed opacity-30")}
        >
          <ChevronDown className="rotate-270 stroke-[1px]" />
        </button>
      </div>

      {/* Bar chart */}
      <div className="flex w-full flex-col px-4">
        <motion.div
          key={`${periodLabel}-${viewMode}`}
          className="flex h-48 w-full items-end"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bars.map((bar, i) => {
            if (bar.isEmpty) {
              const stubH = `${Math.random() * 40 + 15}%`;
              return (
                <motion.div
                  key={i}
                  className="flex h-full flex-1 items-end justify-center"
                  style={{ transformOrigin: "bottom" }}
                  variants={BAR_VARIANTS}
                  transition={barTransition}
                >
                  <div
                    className="bg-brown-300/40 w-0.5"
                    style={{ height: stubH }}
                  />
                </motion.div>
              );
            }

            const ratio = bar.minutes / maxMinutes;
            return (
              <motion.div
                key={i}
                className="flex h-full flex-1 items-end justify-center"
                style={{ transformOrigin: "bottom" }}
                variants={BAR_VARIANTS}
                transition={barTransition}
              >
                <div
                  className={cn(
                    "rounded-full",
                    barColorClass(ratio),
                    barWidthClass
                  )}
                  style={{
                    height: `${Math.max(ratio * 100, 0.2)}%`,
                    minHeight: "2px",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* X-axis labels */}
        <div className="mt-1 flex w-full">
          {bars.map((bar, i) => (
            <div
              key={i}
              className="text-brown-400 dark:text-brown-500 flex-1 text-center text-[10px]"
            >
              {viewMode === "monthly" && i % 2 !== 0 ? "" : bar.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
