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

function QuoteModal() {
  const pendingQuote = useAppStore((s) => s.pendingQuote);
  const setPendingQuote = useAppStore((s) => s.setPendingQuote);

  if (!pendingQuote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm">
      <div className="mx-6 flex max-w-sm flex-col items-center gap-6 rounded-2xl bg-zinc-900 p-8 shadow-2xl shadow-zinc-950">
        <p className="text-center text-sm leading-relaxed font-light text-zinc-300">
          &ldquo;{pendingQuote}&rdquo;
        </p>
        <button
          onClick={() => setPendingQuote(null)}
          className="cursor-pointer rounded-full border border-zinc-700 px-6 py-2 font-mono text-sm text-zinc-400 transition-colors duration-150 hover:border-zinc-500 hover:text-zinc-200"
        >
          continue
        </button>
      </div>
    </div>
  );
}

export default function FocusTimer() {
  const {
    seconds,
    status,
    timerMode,
    phase,
    pomodoroCount,
    start,
    pause,
    reset,
    toggleMode,
  } = useTimer();
  const { hours, minutes } = useDailyTotal();

  const isChaidoro = timerMode === "chaidoro";
  const isFocusPhase = phase === "focus";

  return (
    <>
      <QuoteModal />

      <div className="h-screen w-full bg-pink-950/15">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <DailyFocus hours={hours} minutes={minutes} />

          {/* Mode toggle */}
          <div className="flex gap-1 rounded-full border border-zinc-800 bg-zinc-900/50 p-1">
            {(["focus", "chaidoro"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  if (timerMode !== mode) toggleMode();
                }}
                className={`cursor-pointer rounded-full px-4 py-1 font-mono text-xs transition-all duration-150 ${
                  timerMode === mode
                    ? "bg-zinc-800 text-zinc-50 shadow-sm shadow-zinc-950"
                    : "text-zinc-900 hover:text-zinc-300"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Phase label (Chaidoro only) */}
          {isChaidoro && (
            <p className="font-mono text-xs text-zinc-900">
              {PHASE_LABELS[phase]}
              {isFocusPhase && ` ${pomodoroCount + 1}/4`}
            </p>
          )}

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
                onClick={reset}
                className="cursor-pointer rounded-full border border-zinc-800 px-4 py-2 font-mono text-xs text-zinc-500 transition-all duration-150 hover:border-zinc-600 hover:text-zinc-300"
              >
                reset
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
