import { Bubbles } from "lucide-react";
export default function OtherStat() {
  return (
    <>
      {/* Day streak */}
      <section className="bg-brown-600 dark:bg-dark-900 border-brown-900/75 shadow-brown-800 text-brown-100 corner-squircle relative flex h-fit w-fit flex-col items-center justify-center overflow-clip rounded-3xl border p-3 px-6 font-semibold shadow-md dark:border-black dark:shadow-black">
        <div className="flex w-full items-center justify-center gap-1">
          <Bubbles className="stroke-brown-50 z-0 size-6 stroke-1" />
          <span className="z-20 text-4xl">33</span>
        </div>
        <span className="text-brown-200 z-20 text-xs">day streak</span>
      </section>
    </>
  );
}
