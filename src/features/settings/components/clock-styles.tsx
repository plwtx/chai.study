import { ChevronDown, Lock } from "lucide-react";

export default function ClockStyles() {
  return (
    <>
      {/* Drop down selector */}
      <button className="bg-brown-500 text-brown-50 shadow-brown-600 mt-6 flex items-center justify-center rounded-xl p-2 px-4 shadow-sm">
        Current Clock Style
        <span className="stroke-1 pl-3">
          <ChevronDown />
        </span>
      </button>
      {/* Old one (will update this in the future and use this one for better visuals) (DO NOT DELETE KEEP IT)  */}
      {/* <div className="my-3 flex w-full items-center justify-between gap-6">
      <div className="bg-brown-400 h-32 w-full rounded-xl" />
      <div className="bg-brown-400 h-32 w-full rounded-xl" />
      <div className="bg-brown-400 h-32 w-full rounded-xl" />
    </div> */}
    </>
  );
}
