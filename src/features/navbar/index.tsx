import { cn } from "@/lib/utils";
import { Clock, CircleCheckBig, ChartPie, Cog, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <div className={cn("absolute top-5 left-1/2 z-10 -translate-x-1/2")}>
      <div className="flex items-center justify-center gap-3">
        {/* EMPTY PLACEHOLDER FOR LOGO: */}
        <div className="bg-brown-600 size-6 rounded-full"></div>
        {/* Page navigation buttons: */}
        <div className="bg-brown-300/75 shadow-brown-900 border-brown-500 flex w-fit items-center justify-between gap-6 overflow-clip rounded-full border p-3 shadow-inner">
          {/* ACTIVE BUTTON STYLE: Focus (Chaidoro / Pomodoro) timer: */}
          <Clock className="text-brown-100 bg-brown-700 shadow-brown-700 size-6 scale-160 cursor-pointer rounded-full p-1 shadow-md" />
          {/* FUTURE: Task manager */}
          <CircleCheckBig className="text-brown-700 hover:bg-brown-900/25 size-6 cursor-pointer rounded-full transition-all ease-in-out hover:scale-130 hover:p-px" />
          {/* FUTURE: Statistics menu */}
          <ChartPie className="text-brown-700 hover:bg-brown-900/25 size-6 cursor-pointer rounded-full transition-all ease-in-out hover:scale-130 hover:p-px" />
        </div>
        {/* Settings button */}
        <Settings className="text-brown-700 size-6" />
      </div>
    </div>
  );
};

export default Navbar;
