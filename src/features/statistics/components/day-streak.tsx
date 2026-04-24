import { Bubbles } from "lucide-react";
import { useDayStreak } from "@/features/statistics/hooks/useDayStreak";
export default function OtherStat() {
  const streak = useDayStreak();
  return (
    <>
      {/* Day streak */}
      <section className="bg-brown-600 group dark:bg-dark-900/75 border-brown-900/75 shadow-brown-800 corner-scoop relative z-30 flex h-full w-full flex-col items-center justify-center overflow-clip rounded-xl border p-3 px-6 font-semibold shadow-sm dark:shadow-black">
        <div className="flex w-full items-center justify-center gap-1">
          {streak > 0 && (
            <Bubbles className="stroke-brown-50 z-0 size-6 stroke-1 transition-discrete duration-200 group-hover:size-0" />
          )}
          <span className="text-brown-50 dark:text-brown-200 z-20 text-6xl">
            {streak > 0 ? streak : null}
          </span>
        </div>
        <span className="text-brown-200 dark:text-brown-400 z-20 text-xs">
          {streak > 0 ? "day streak" : "No streak yet..."}
        </span>
        {/* Absolutes (decoration) */}
        <section className="border-brown-">
          {/* Left Side */}
          <div className="border-brown-300 dark:border-brown-100 absolute top-1/2 -left-16 size-32 -translate-y-1/2 rounded-full border transition-all delay-200 duration-300 ease-in-out group-hover:size-0" />
          <div className="border-brown-300 dark:border-brown-100 absolute top-1/2 -left-12 size-24 -translate-y-1/2 rounded-full border transition-all delay-100 duration-300 ease-in-out group-hover:size-0" />
          <div className="border-brown-300 dark:border-brown-100 absolute top-1/2 -left-8 size-16 -translate-y-1/2 rounded-full border transition-all duration-300 ease-in-out group-hover:size-0" />
          <div className="border-brown-100 bg-brown-500 dark:border-brown-100 absolute top-1/2 -left-20 size-32 -translate-y-1/2 rounded-full border blur-3xl transition-all delay-300 duration-700 ease-in-out group-hover:size-0" />
          {/* Right Side */}
          <div className="border-brown-300 dark:border-brown-100 absolute top-1/2 -right-16 size-32 -translate-y-1/2 rounded-full border transition-all delay-200 duration-300 ease-in-out group-hover:size-0" />
          <div className="border-brown-300 dark:border-brown-100 absolute top-1/2 -right-12 size-24 -translate-y-1/2 rounded-full border transition-all delay-100 duration-300 ease-in-out group-hover:size-0" />
          <div className="border-brown-300 dark:border-brown-100 absolute top-1/2 -right-8 size-16 -translate-y-1/2 rounded-full border transition-all duration-300 ease-in-out group-hover:size-0" />
          <div className="border-brown-100 bg-brown-500 dark:border-brown-100 absolute top-1/2 -right-20 size-32 -translate-y-1/2 rounded-full border blur-3xl transition-all delay-300 duration-700 ease-in-out group-hover:size-0" />
        </section>
      </section>
    </>
  );
}
