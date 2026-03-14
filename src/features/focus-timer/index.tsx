import { lazy } from "react";
import { useAppStore } from "@/store/index";
import Clock from "@/features/focus-timer/components/clock.tsx";
import { useTimer } from "./hooks/useTimer";
import { useDailyTotal } from "./hooks/useDailyTotal";
import { Button } from "@/components/ui/button";
import DailyFocus from "./components/daily-focus";

const DevSpeedToggle = import.meta.env.DEV
  ? lazy(() => import("./components/dev-speed-toggle"))
  : () => null;

function FinishedBanner() {
  const status = useAppStore((s) => s.status);

  if (status !== "finished") return null;

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
  const { seconds, status, focusCount, start, pause, endCycle } =
    useTimer();
  const { hours, minutes } = useDailyTotal();

  return (
    <>
      <FinishedBanner />
      <DevSpeedToggle />
      <div className="bg-brown-100 h-screen w-full">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <DailyFocus hours={hours} minutes={minutes} />

          {/* Phase dots */}
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={
                  i < focusCount
                    ? "bg-brown-600 h-4 w-4 rounded-full"
                    : "bg-brown-300 h-3 w-3 rounded-full"
                }
              />
            ))}
          </div>

          <Clock seconds={seconds} />

          {/* Controls */}
          <div className="flex items-center gap-3">
            {status === "running" ? (
              <button
                onClick={pause}
                className="cursor-pointer rounded-full border border-zinc-900 bg-zinc-900 p-3 px-6 font-mono text-zinc-50 shadow-md shadow-zinc-600 transition-all duration-200 hover:scale-110 hover:bg-transparent hover:text-zinc-900"
              >
                Pause
              </button>
            ) : (
              <Button intent="primary" onClick={start} className="">
                {status === "paused"
                  ? "resume"
                  : status === "finished"
                    ? "next"
                    : "start"}
              </Button>
            )}

            {status !== "idle" && (
              <button
                onClick={endCycle}
                className="cursor-pointer rounded-full border border-zinc-800 px-4 py-2 font-mono text-xs text-zinc-600 transition-all duration-150 hover:border-zinc-600 hover:text-zinc-900"
              >
                End cycle
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
