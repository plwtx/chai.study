import { Clock, Settings, CircleCheckBig } from "lucide-react";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center gap-3">
      <NavLogo />
      <div className="bg-brown-300/75 dark:bg-dark-900 shadow-brown-900 border-brown-500 flex w-fit items-center justify-between gap-6 overflow-clip rounded-full border p-3 shadow-inner dark:border-black dark:shadow-black">
        {/* Clock */}
        <NavItem icon={Clock} to="/" />
        {/* Tasks */}
        {/* <NavItem icon={CircleCheckBig} to="/tasks" /> */}
        {/* Settings */}
        <NavItem icon={Settings} to="/settings" variant="icon" />
      </div>
    </div>
  );
}
