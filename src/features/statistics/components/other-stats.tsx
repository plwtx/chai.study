import HeaderDescription from "@/components/ui/header-description";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import { Circle, ServerOff, Coffee } from "lucide-react";
export default function OtherStat() {
  return (
    <>
      {/* Other Total Stats */}
      <main className="font-poppins w-full">
        {/* Title and divider */}
        <section className="relative my-6 mb-12 w-full">
          <div className="bg-brown-400 h-px w-full" />
          <h1 className="bg-brown-500 corner-scoop dark:bg-dark-900 absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-12 py-1 text-center font-light text-white">
            Overall focus & sessions stats
          </h1>
          {/* Absolute star corners */}
          <div className="bg-brown-500 corner-scoop absolute -top-3 left-0 size-6 rounded-full" />
          <div className="bg-brown-500 corner-scoop absolute -top-3 right-0 size-6 rounded-full" />
        </section>
        {/* Statistics */}
        <section className="flex flex-col gap-3">
          {/* Overall Focus & Sessions */}
          <section className="grid grid-cols-2 gap-6">
            {/* Hours focused */}
            <section className="bg-brown-200/45 shadow-brown-500 border-brown-500 relative flex aspect-square h-64 w-full flex-col items-start justify-center gap-3 overflow-clip rounded-xl border p-12 shadow-sm">
              <h3 className="text-6xl font-semibold">9.32</h3>
              <h4 className="font-light text-nowrap">Hours focused</h4>
              <div className="corner-scoop border-brown-500 absolute top-1/2 -right-32 size-64 -translate-y-1/2 rotate-25 rounded-full border" />
            </section>
            {/* Sessions completed */}
            <section className="bg-brown-200/45 shadow-brown-500 border-brown-500 relative flex aspect-square h-64 w-full flex-col items-start justify-center gap-3 overflow-clip rounded-xl border p-12 shadow-sm">
              <h3 className="text-6xl font-semibold">35</h3>
              <h4 className="font-light text-nowrap">Sessions completed</h4>
              <div className="corner-scoop border-brown-500 absolute top-1/2 -right-32 size-64 -translate-y-1/2 rotate-25 rounded-full border" />
            </section>
            {/* Days focused */}
            <section className="bg-brown-200/45 shadow-brown-500 border-brown-500 relative flex aspect-square h-64 w-full flex-col items-start justify-center gap-3 overflow-clip rounded-xl border p-12 shadow-sm">
              <h3 className="text-6xl font-semibold">17</h3>
              <h4 className="font-light text-nowrap">Days focused</h4>
              <div className="corner-scoop border-brown-500 absolute top-1/2 -right-32 size-64 -translate-y-1/2 rotate-25 rounded-full border" />
            </section>
            {/* Average daily focused hours */}
            <section className="bg-brown-200/45 shadow-brown-500 border-brown-500 relative flex aspect-square h-64 w-full flex-col items-start justify-center gap-3 overflow-clip rounded-xl border p-12 shadow-sm">
              <h3 className="text-6xl font-semibold">~ 2.3</h3>
              <h4 className="font-light text-nowrap">
                Average daily focused hour
              </h4>
              <div className="corner-scoop border-brown-500 absolute top-1/2 -right-32 size-64 -translate-y-1/2 rotate-25 rounded-full border" />
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
