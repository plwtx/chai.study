import { ChevronDown } from "lucide-react";
export default function DailyFocusPage() {
  return (
    <>
      <div className="h-dvh w-full">
        {/* Daily focus */}
        <div className="relative flex h-[90%] w-full items-center justify-center">
          <section className="text-brown-800 relative z-20 flex size-96 flex-col items-center justify-center p-12 text-9xl font-semibold dark:text-white/75">
            <p className="text-xs font-light">Today you have focused:</p>
            <h6>63</h6>
            <span className="-mt-1 text-xs font-light">min.</span>
          </section>
          {/* Absolutes */}
          <ChevronDown className="stroke-brown-600 absolute bottom-0 left-1/2 size-9 -translate-x-1/2 animate-bounce" />
        </div>
      </div>
    </>
  );
}
