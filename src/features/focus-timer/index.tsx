import { useAppStore } from "@/store/index";
import Clock from "@/features/focus-timer/components/clock.tsx";
import { useTimer } from "./hooks/useTimer";
import { useDailyTotal } from "./hooks/useDailyTotal";
import DailyFocus from "./components/daily-focus";

const PHASE_LABELS: Record<string, string> = {
  focus: "Focus",
  break: "Short Break",
  "long-break": "Long Break",
};

function OvertimeBanner() {
  const overtime = useAppStore((s) => s.overtime);

  if (!overtime) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center bg-zinc-900/90 px-4 py-3 backdrop-blur-sm">
      <p className="font-mono text-sm text-zinc-300">
        You have finished your session. However, you can continue being
        productive !
      </p>
    </div>
  );
}

export default function FocusTimer() {
  const {
    seconds,
    status,
    overtime,
    phase,
    pomodoroCount,
    start,
    pause,
    endCycle,
  } = useTimer();
  const { hours, minutes } = useDailyTotal();

  const isFocusPhase = phase === "focus";

  return (
    <>
      <OvertimeBanner />
      <div className="h-screen w-full bg-stone-600/5">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <DailyFocus hours={hours} minutes={minutes} />

          {/* Phase label */}
          <p className="font-mono text-xs text-zinc-900">
            {overtime ? "overtime" : PHASE_LABELS[phase]}
            {isFocusPhase && !overtime && ` ${pomodoroCount + 1}/4`}
          </p>

          <Clock seconds={seconds} />

          {/* Controls */}
          <div className="flex items-center gap-3">
            {status === "running" ? (
              <button
                onClick={pause}
                className="cursor-pointer rounded-full border border-zinc-900 bg-zinc-900 p-3 px-6 font-mono text-zinc-50 shadow-md shadow-zinc-600 transition-all duration-200 hover:scale-110 hover:bg-transparent hover:text-zinc-900"
              >
                pause
              </button>
            ) : (
              <button
                onClick={start}
                className="cursor-pointer rounded-full border border-zinc-900 bg-zinc-900 p-3 px-6 font-mono text-zinc-50 shadow-md shadow-zinc-600 transition-all duration-200 hover:scale-110 hover:bg-transparent hover:text-zinc-900"
              >
                {status === "paused" ? "resume" : "start"}
              </button>
            )}

            {status !== "idle" && (
              <button
                onClick={endCycle}
                className="cursor-pointer rounded-full border border-zinc-800 px-4 py-2 font-mono text-xs text-zinc-500 transition-all duration-150 hover:border-zinc-600 hover:text-zinc-300"
              >
                end cycle
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
