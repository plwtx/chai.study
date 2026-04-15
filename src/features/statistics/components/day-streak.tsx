import { Bubbles } from "lucide-react";
export default function OtherStat() {
  return (
    <>
      {/* Day streak */}
      <section className="bg-brown-600 dark:bg-dark-900/75 border-brown-900/75 shadow-brown-800 corner-scoop relative z-30 flex h-full w-full flex-col items-center justify-center overflow-clip rounded-xl border p-3 px-6 font-semibold shadow-sm dark:shadow-black">
        <div className="flex w-full items-center justify-center gap-1">
          <Bubbles className="stroke-brown-50 z-0 size-6 stroke-1" />
          <span className="text-brown-50 dark:text-brown-200 z-20 text-6xl">
            33
          </span>
        </div>
        <span className="text-brown-200 dark:text-brown-400 z-20 text-xs">
          day streak
        </span>
      </section>
    </>
  );
}
