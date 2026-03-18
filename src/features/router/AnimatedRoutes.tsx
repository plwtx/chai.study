import { memo, useLayoutEffect } from "react";
import { useLocation } from "react-router";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ROUTE_INDEX } from "@/router/routes";
import FocusTimer from "@/features/focus-timer";
import TaskManager from "@/features/task-manager";
import Settings from "@/features/settings";

const SPRING_CONFIG = { stiffness: 350, damping: 30, mass: 0.8 };
const INSTANT_SPRING = { stiffness: 10000, damping: 500 };
const PAGE_COUNT = 3;

const MemoFocusTimer = memo(FocusTimer);
const MemoTaskManager = memo(TaskManager);
const MemoSettings = memo(Settings);

export default function AnimatedRoutes() {
  const { pathname } = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const currentIndex = ROUTE_INDEX[pathname] ?? 0;

  const target = useMotionValue(currentIndex);
  const spring = useSpring(
    target,
    shouldReduceMotion ? INSTANT_SPRING : SPRING_CONFIG
  );
  const x = useTransform(spring, (v) => `${-v * (100 / PAGE_COUNT)}%`);

  useLayoutEffect(() => {
    target.set(currentIndex);
  }, [currentIndex, target]);

  return (
    <div className="bg-brown-100 relative h-full w-full overflow-hidden">
      <motion.div
        className="flex h-full will-change-transform"
        style={{ width: `${PAGE_COUNT * 100}%`, x }}
      >
        <div
          className="relative h-full"
          style={{
            width: `${100 / PAGE_COUNT}%`,
            contain: "paint",
          }}
        >
          <MemoFocusTimer />
        </div>
        <div
          className="relative h-full"
          style={{
            width: `${100 / PAGE_COUNT}%`,
            contain: "paint",
          }}
        >
          <MemoTaskManager />
        </div>
        <div
          className="relative h-full"
          style={{
            width: `${100 / PAGE_COUNT}%`,
            contain: "paint",
          }}
        >
          <MemoSettings />
        </div>
      </motion.div>
    </div>
  );
}
