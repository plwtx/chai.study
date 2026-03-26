import { AnimatePresence, motion } from "motion/react";
import { Pencil, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import DurationEditor from "./duration-editor";
import { showSettingsToast } from "./settings-toast";

export type DurationField =
  | "focusDuration"
  | "shortBreakDuration"
  | "longBreakDuration";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const cardTransition = { duration: 0.15, ease: "easeOut" } as const;
const cardVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
} as const;

export default function TimerDurationCard({
  label,
  seconds,
  field,
  isTimerActive,
  bgClass,
  isEditing,
  onStartEdit,
  onClose,
}: {
  label: string;
  seconds: number;
  field: DurationField;
  isTimerActive: boolean;
  bgClass: string;
  isEditing: boolean;
  onStartEdit: (field: DurationField) => void;
  onClose: () => void;
}) {
  const setDuration = useAppStore((s) => s.setDuration);

  const handleSave = async (newSeconds: number) => {
    await setDuration(field, newSeconds);
    showSettingsToast(
      `${label} set to ${Math.floor(newSeconds / 60)} minutes.`
    );
    onClose();
  };

  return (
    <section
      className={cn(
        "border-brown-500 shadow-brown-600 dark:shadow-dark-900 dark:border-dark-900 dark:text-dark-100 relative flex h-64 w-2/7 flex-col items-center justify-center overflow-hidden rounded-xl border shadow-sm",
        !isTimerActive && !isEditing && "group",
        bgClass
      )}
    >
      <h3 className="font-fragment-mono text-brown-600 dark:text-dark-100/45 font-light">
        {label}
      </h3>

      {!isEditing &&
        (isTimerActive ? (
          <button
            aria-label="Locked"
            className="absolute top-2 left-2 flex h-9 w-9 items-center justify-center rounded-full"
          >
            <Lock className="stroke-brown-500 dark:stroke-dark-100/65 size-5 stroke-2" />
          </button>
        ) : (
          <button
            aria-label="Edit duration"
            onClick={() => onStartEdit(field)}
            className="bg-brown-700 text-brown-50 border-brown-800 shadow-brown-800 absolute bottom-0 left-0 flex h-12 w-full translate-y-16 cursor-pointer items-center justify-center rounded-t-full border-t-2 shadow-md transition-all group-hover:translate-y-1 dark:border-black/75 dark:bg-black/45 dark:shadow-black"
          >
            <Pencil className="size-5 stroke-1" />
          </button>
        ))}

      <AnimatePresence mode="wait" initial={false}>
        {isEditing ? (
          <motion.div
            key="editor"
            className="absolute inset-0 flex flex-col items-center justify-center"
            {...cardVariants}
            transition={cardTransition}
          >
            <DurationEditor
              initial={seconds}
              onSave={handleSave}
              onCancel={onClose}
            />
          </motion.div>
        ) : (
          <motion.div
            key="display"
            {...cardVariants}
            transition={cardTransition}
          >
            <p className="font-poppins text-6xl font-bold">
              {formatTime(seconds)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
