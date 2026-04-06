export default function Statistics() {
  return (
    <>
      <div className="bg-brown-50 dark:bg-dark-600 text-brown-800 dark:text-dark-100 font-poppins flex h-full w-full items-center justify-center p-9">
        <div className="flex h-full w-full max-w-6xl flex-col gap-9 pt-19">
          <h1 className="text-3xl font-semibold">Statistics</h1>
          {/* General stats */}
          <section className="flex items-center justify-start gap-6">
            {/* Daily focus */}
            <section className="bg-dark-900 flex size-40 flex-col items-center justify-center gap-1 rounded-xl border p-9 text-6xl font-semibold shadow-sm dark:border-black dark:shadow-black">
              <h6>63</h6>
              <span className="text-xs font-light">min.</span>
            </section>
            {/* Other stats */}
            <section className="flex flex-col gap-1">
              <h6>Focus cycles:</h6>
              <h6>Break taken:</h6>
              <h6>Time left till end of day:</h6>
            </section>
          </section>
          {/* GitHub Style contribution graph */}
          <section className="bg-dark-900 relative h-64 w-full rounded-3xl border-black shadow-sm shadow-black">
            {/* absolute title */}
            <div className="bg-dark-900 absolute -top-3 left-6 h-6 w-fit rounded-full border border-black px-9 text-sm shadow-xs shadow-black">
              <h3>Focus graph</h3>
            </div>
          </section>
          {/* Other stats */}
          <section className="flex flex-col gap-1">
            <h6>Weekly average focus:</h6>
            <h6>Monthly average focus:</h6>
            <h6>Monthly best focus time & date:</h6>
          </section>
        </div>
      </div>
    </>
  );
}
