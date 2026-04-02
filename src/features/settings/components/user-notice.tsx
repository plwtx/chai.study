import { ShieldAlert, FlaskConical } from "lucide-react";
import ShuSheChaynik from "@/assets/png/shusheChaynikHD.png";

export default function UserNotice() {
  return (
    <>
      <main className="font-fragment-mono dark:bg-dark-900 group bg-brown-700 text-brown-50 dark:text-dark-100 border-brown-600 shadow-brown-900 relative mb-9 flex h-96 w-full flex-col items-start justify-between gap-3 overflow-clip rounded-3xl border p-12 shadow-sm dark:border-black dark:shadow-black">
        {/* Header */}
        <section className="font-poppins text-brown-200 dark:text-dark-100/95 z-20 flex animate-pulse items-center gap-3 text-sm font-medium">
          <ShieldAlert size={16} />
          <h1>v.0b3</h1>
        </section>
        {/* Notice */}
        <p className="font-poppins flex items-center gap-3 text-xl font-semibold text-nowrap dark:text-white/85">
          <FlaskConical className="size-16 rotate-12 stroke-[0.5px]" />
          You are on beta{" "}
          <span className="-ml-3 pb-3 text-xs font-light italic">
            (test)
          </span>{" "}
          version.
        </p>
        {/* Description */}
        <section className="text-brown-200 dark:text-dark-100/95 z-20 w-150 text-xs">
          <p>
            This app is still under development. This version is at a very early
            stage of production. Please be aware that data structure used on
            this version might be very different than final release. Which can
            cause your current progress to not transfer to new version. Read
            more about it on{" "}
            <a
              className="font-semibold underline"
              href="https://github.com/plwtx/chai.study"
            >
              GitHub
            </a>
            .
          </p>
        </section>
        {/* Styling  */}
        <div className="z-0">
          <img
            src={ShuSheChaynik}
            className="absolute top-1/2 -right-46 z-10 size-115 -translate-y-1/2 transition-transform duration-300 ease-linear group-hover:-rotate-45 dark:brightness-75 dark:saturate-0"
            alt="Glass logo of Chaidoro"
          />
          <div className="absolute top-1/2 -right-32 z-0 size-164 -translate-y-1/2 rounded-full bg-black/45 blur-3xl transition-all duration-300 ease-linear group-hover:-right-96 group-hover:size-237" />
        </div>
      </main>
    </>
  );
}
