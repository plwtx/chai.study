export default function DailyFocusBanner() {
  return (
    <>
      {/* Banner (I will add a drawing here) */}
      <section className="bg-brown-200/45 shadow-brown-600/45 z-0 h-full w-64 rounded-xl shadow-inner"></section>
      {/* Daily focus */}
      <section className="bg-brown-100 dark:bg-dark-900 border-brown-400 shadow-brown-400 dark:text-dark-100 text-brown-800 z-20 -ml-24 flex size-40 flex-col items-center justify-center rounded-full border p-9 text-5xl font-semibold shadow-sm dark:border-black dark:shadow-black">
        <h6>63</h6>
        <span className="-mt-1 text-xs font-light">min.</span>
      </section>
    </>
  );
}
