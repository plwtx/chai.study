import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Pencil, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import HeaderDescription from "@/components/ui/header-description";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import ToggleSwitch from "@/components/ui/toggle-switch";

type DurationField =
  | "focusDuration"
  | "shortBreakDuration"
  | "longBreakDuration";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function parseMinutes(value: string): number | null {
  const n = parseInt(value, 10);
  if (isNaN(n) || n < 1 || n > 120) return null;
  return n * 60;
}

function DurationEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: number;
  onSave: (seconds: number) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(String(Math.floor(initial / 60)));

  const handleSubmit = () => {
    const seconds = parseMinutes(value);
    if (seconds !== null) onSave(seconds);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="z-10 flex flex-1 flex-col items-center justify-center gap-1 pt-3">
        {/* Input field */}
        <input
          type="number"
          min={1}
          max={90}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") onCancel();
          }}
          autoFocus
          className="bg-brown-500 shadow-brown-900 dark:bg-dark-600 border-brown-500 dark:border-dark-900 font-poppins text-brown-50 dark:text-dark-100 z-20 flex-1 [appearance:textfield] self-stretch overflow-clip rounded-lg border p-1 text-center text-3xl font-bold shadow-inner outline-none dark:shadow-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="font-fragment-mono text-brown-600 dark:text-dark-100/45 text-sm">
          minutes
        </span>
      </div>

      {/* Buttons */}
      <div className="relative mt-auto mb-3 flex w-full flex-col gap-2 px-3">
        {/* Decoration */}
        <div className="dark:border-dark-100/45 border-brown-600 absolute top-0 left-1/2 z-0 h-24 w-50 -translate-x-1/2 -translate-y-23 rounded-t-lg border border-b-0" />
        {/* Save button */}
        <button
          onClick={handleSubmit}
          className="bg-brown-700 text-brown-50 dark:bg-dark-100 dark:text-dark-900 hover:bg-brown-900 shadow-brown-800 dark:hover:bg-dark-900 dark:hover:text-dark-100 dark:hover:border-dark-100 dark:border-dark-100 border-brown-700 hover:border-brown-900 z-10 w-full cursor-pointer rounded-md border p-3 text-xs font-medium shadow-sm active:scale-95"
        >
          Save
        </button>
        {/* Cancel button */}
        <button
          onClick={onCancel}
          className="border-brown-500 dark:hover:bg-dark-100/5 dark:hover:text-dark-100 dark:border-dark-100/35 hover:bg-brown-300 z-10 w-full cursor-pointer rounded-md border px-3 py-1 text-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function TimerDurationCard({
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
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

function AutomationToggle({
  label,
  description,
  field,
}: {
  label: string;
  description: string;
  field: "autoStartBreak" | "autoStartFocus";
}) {
  const checked = useAppStore((s) => s.settings[field]);
  const toggleAutoStart = useAppStore((s) => s.toggleAutoStart);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-base">
        <h3 className="font-semibold">{label}</h3>
        <p className="text-sm opacity-75">{description}</p>
      </div>
      <ToggleSwitch checked={checked} onChange={() => toggleAutoStart(field)} />
    </div>
  );
}

export default function ClockSettings() {
  const focusDuration = useAppStore((s) => s.settings.focusDuration);
  const shortBreakDuration = useAppStore((s) => s.settings.shortBreakDuration);
  const longBreakDuration = useAppStore((s) => s.settings.longBreakDuration);
  const timerStatus = useAppStore((s) => s.status);

  const isTimerActive = timerStatus !== "idle";
  const [editingField, setEditingField] = useState<DurationField | null>(null);

  return (
    <div className="font-poppins text-brown-800 dark:text-dark-100 h-full w-full text-sm">
      <HeaderDescription
        header={"Mechanics of clock"}
        description={
          "Core mechanics of app. Clock settings such as setting up your focus cycle period, rest period, automation, clock style and other settings."
        }
        kaomoji={null}
      />

      <div className="bg-brown-300 dark:bg-dark-100/20 mx-auto my-6 h-px w-full rounded-full" />

      <SubHeaderDescription
        header={"Timer (minutes)"}
        description={"Focus / Break / Long break"}
      />

      {isTimerActive && (
        <p className="text-brown-600 dark:text-dark-100/60 mt-2 text-xs italic">
          Pause or finish your current cycle to edit durations.
        </p>
      )}

      <div className="text-brown-800 my-3 flex w-full justify-between gap-1">
        <TimerDurationCard
          label="Focus"
          seconds={focusDuration}
          field="focusDuration"
          isTimerActive={isTimerActive}
          bgClass="bg-brown-200 dark:bg-dark-900/75"
          isEditing={editingField === "focusDuration"}
          onStartEdit={setEditingField}
          onClose={() => setEditingField(null)}
        />
        <TimerDurationCard
          label="Break"
          seconds={shortBreakDuration}
          field="shortBreakDuration"
          isTimerActive={isTimerActive}
          bgClass="bg-brown-200/50 dark:bg-dark-900/45"
          isEditing={editingField === "shortBreakDuration"}
          onStartEdit={setEditingField}
          onClose={() => setEditingField(null)}
        />
        <TimerDurationCard
          label="Long break"
          seconds={longBreakDuration}
          field="longBreakDuration"
          isTimerActive={isTimerActive}
          bgClass="bg-brown-200/25 dark:bg-dark-900/15"
          isEditing={editingField === "longBreakDuration"}
          onStartEdit={setEditingField}
          onClose={() => setEditingField(null)}
        />
      </div>

      <HorizontalDivider className="my-9" />

      <SubHeaderDescription
        header={"Automation"}
        description={"Auto start settings and overtime actions."}
        className="mt-6"
      />
      <section className="my-9 space-y-6">
        <AutomationToggle
          label="Break cycle: Auto start"
          description="Automatically start a break cycle when you end a focus session."
          field="autoStartBreak"
        />
        <HorizontalDivider className="opacity-25" />
        <AutomationToggle
          label="Focus cycle: Auto start"
          description="Automatically start the next focus cycle when your break ends."
          field="autoStartFocus"
        />
      </section>
    </div>
  );
}
