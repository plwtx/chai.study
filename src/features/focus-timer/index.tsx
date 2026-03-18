import { lazy } from "react";
import { useAppStore } from "@/store/index";
import Clock from "@/features/focus-timer/components/clock.tsx";
import { useTimer } from "./hooks/useTimer";
import { useDailyTotal } from "./hooks/useDailyTotal";
import DailyFocus from "./components/daily-focus";
import { AnimatePresence, motion } from "motion/react";


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
  const { seconds, status, focusCount, start, pause, endCycle } = useTimer();
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
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === "idle" || status === "finished" ? (
                <motion.button
                  key="start"
                  onClick={start}
                  className="bg-brown-500 font-poppins cursor-pointer rounded-full px-10 py-3 font-semibold tracking-wide text-white"
                  initial={{ scale: 0.5, opacity: 0, filter: "blur(8px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{
                    scale: 1.15,
                    opacity: 0,
                    filter: "blur(6px)",
                    transition: { duration: 0.25, ease: "easeIn" },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status === "finished" ? "next" : "start"}
                </motion.button>
              ) : (
                <motion.div
                  key="split"
                  className="flex items-center gap-3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                    exit: {
                      transition: {
                        staggerChildren: 0.04,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  <motion.button
                    onClick={status === "running" ? pause : start}
                    className="bg-brown-500 font-poppins cursor-pointer rounded-full px-8 py-3 font-semibold tracking-wide text-white"
                    variants={{
                      hidden: {
                        x: 40,
                        scale: 0.3,
                        opacity: 0,
                        filter: "blur(10px)",
                      },
                      visible: {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: {
                        x: 40,
                        scale: 0.3,
                        opacity: 0,
                        filter: "blur(10px)",
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status === "running" ? "pause" : "resume"}
                  </motion.button>

                  <motion.button
                    onClick={endCycle}
                    className="border-brown-400 text-brown-600 hover:border-brown-600 hover:text-brown-800 font-poppins cursor-pointer rounded-full border px-5 py-2.5 text-sm"
                    variants={{
                      hidden: {
                        x: -40,
                        scale: 0.3,
                        opacity: 0,
                        filter: "blur(10px)",
                      },
                      visible: {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: {
                        x: -40,
                        scale: 0.3,
                        opacity: 0,
                        filter: "blur(10px)",
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    end cycle
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
