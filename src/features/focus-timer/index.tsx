import Clock from "@/features/focus-timer/components/clock.tsx";

function CurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return (
    <span>
      {day}.{month}.{year}
    </span>
  );
}

export default function FocusTimer() {
  return (
    <>
      <div className="h-screen w-full bg-pink-950/15">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {/* daily used time */}
          <div className="flex flex-col items-center justify-center text-sm font-normal">
            <p>
              Today (<CurrentDate />)
            </p>
            {/* Time focused today: */}
            <p className="rounded-2xl bg-zinc-900/35 p-3 px-3 text-lg font-light shadow-inner shadow-zinc-950">
              <span className="rounded-lg bg-zinc-800 p-1 px-2 font-semibold text-zinc-50 shadow-md shadow-zinc-950">
                01
              </span>{" "}
              hr.{" "}
              <span className="rounded-lg bg-zinc-800 p-1 px-2 font-semibold text-zinc-50 shadow-md shadow-zinc-950">
                32
              </span>{" "}
              min.
            </p>
          </div>
          <Clock />
          <button className="cursor-pointer rounded-full border border-zinc-900 bg-zinc-900 p-3 px-6 font-mono text-zinc-50 shadow-md shadow-zinc-600 transition-all duration-200 hover:scale-110 hover:bg-transparent hover:text-zinc-900">
            start
          </button>
        </div>
      </div>
    </>
  );
}
