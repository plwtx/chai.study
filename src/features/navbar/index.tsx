import { Clock, CircleCheckBig, ChartPie, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";

export default function Navbar() {
  return (
    <div className={cn("absolute top-5 left-1/2 z-10 -translate-x-1/2")}>
      <div className="flex items-center justify-center gap-3">
        <NavLogo />
        <div className="bg-brown-300/75 shadow-brown-900 border-brown-500 flex w-fit items-center justify-between gap-6 overflow-clip rounded-full border p-3 shadow-inner">
          <NavItem icon={Clock} to="/" />
          {/* <NavItem icon={CircleCheckBig} to="/tasks" /> */}
          {/* Future: Statistics */}
          {/* <ChartPie className="text-brown-700 hover:bg-brown-900/25 size-6 cursor-pointer rounded-full transition-all ease-in-out hover:scale-130 hover:p-px" /> */}
        </div>
        <NavItem icon={Settings} to="/settings" variant="icon" />
      </div>
    </div>
  );
}
