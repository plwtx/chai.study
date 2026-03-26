import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import type { ClockVariant } from "@/types";
import { showSettingsToast } from "./settings-toast";

const CLOCK_VARIANTS: { value: ClockVariant; label: string }[] = [
  { value: "slide", label: "Slide" },
  { value: "blur", label: "Blur" },
  { value: "morph", label: "Morph" },
  { value: "matrix", label: "Matrix" },
  { value: "default", label: "Default" },
];

export default function ClockStyles() {
  const clockVariant = useAppStore((s) => s.settings.clockVariant);
  const setClockVariant = useAppStore((s) => s.setClockVariant);
  const [open, setOpen] = useState(false);

  const current = CLOCK_VARIANTS.find((v) => v.value === clockVariant);

  const handleSelect = async (variant: ClockVariant) => {
    setOpen(false);
    if (variant === clockVariant) return;
    await setClockVariant(variant);
    showSettingsToast(`Clock style changed to ${variant}.`);
  };

  return (
    <>
      {/* Drop down selector */}
      <div className="relative mt-6 inline-block">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-brown-500 dark:bg-dark-900 text-brown-50 shadow-brown-600 flex cursor-pointer items-center justify-center rounded-xl p-2 px-4 shadow-sm dark:shadow-black"
        >
          {current?.label ?? "Select style"}
          <span className="stroke-1 pl-3">
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform duration-150",
                open && "rotate-180",
              )}
            />
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="bg-brown-50 dark:bg-dark-900 border-brown-200 dark:border-dark-600 shadow-brown-300 dark:shadow-dark-900 absolute z-10 mt-1 w-full overflow-hidden rounded-xl border shadow-md"
            >
              {CLOCK_VARIANTS.map(({ value, label }) => (
                <li key={value}>
                  <button
                    onClick={() => handleSelect(value)}
                    className={cn(
                      "text-brown-800 dark:text-dark-100 hover:bg-brown-100 dark:hover:bg-dark-600 flex w-full cursor-pointer items-center justify-between px-4 py-2 text-sm transition-colors",
                      value === clockVariant && "font-medium",
                    )}
                  >
                    {label}
                    {value === clockVariant && (
                      <Check size={14} className="text-brown-500 dark:text-dark-100" />
                    )}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {/* Old one (will update this in the future and use this one for better visuals) (DO NOT DELETE KEEP IT)  */}
      {/* <div className="my-3 flex w-full items-center justify-between gap-6">
      <div className="bg-brown-400 h-32 w-full rounded-xl" />
      <div className="bg-brown-400 h-32 w-full rounded-xl" />
      <div className="bg-brown-400 h-32 w-full rounded-xl" />
    </div> */}
    </>
  );
}
