export default function Clock() {
  return (
    <>
      <div className="h-screen w-full bg-pink-950/15">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {/* daily used time */}
          <div className="flex flex-col items-center justify-center space-y-2 text-xs font-light">
            <p>today</p>
            <p className="px-3 text-lg">
              <span className="rounded-lg bg-zinc-800 p-1 px-2 text-zinc-50">
                01
              </span>{" "}
              hr.{" "}
              <span className="rounded-lg bg-zinc-800 p-1 px-2 text-zinc-50">
                32
              </span>{" "}
              min.
            </p>
          </div>
          <h1 className="font-sans text-9xl font-semibold antialiased">
            25:00
          </h1>
          <button className="cursor-pointer rounded-full border border-zinc-900 bg-zinc-900 p-3 px-6 font-mono text-zinc-50 shadow-md shadow-zinc-600 transition-all duration-200 hover:scale-110 hover:bg-transparent hover:text-zinc-900">
            start
          </button>
        </div>
      </div>
    </>
  );
}
