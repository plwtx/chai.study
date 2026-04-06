import { useLocation } from "react-router";
import { ROUTE_INDEX } from "@/router/routes";
import FocusTimer from "@/features/focus-timer";
import Statistics from "@/features/statistics";
import TaskManager from "@/features/task-manager";
import Settings from "@/features/settings";

const PAGES = [FocusTimer, Statistics, Settings, TaskManager];

export default function AnimatedRoutes() {
  const { pathname } = useLocation();
  const Page = PAGES[ROUTE_INDEX[pathname] ?? 0];
  return <Page />;
}
