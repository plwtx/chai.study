import { useEffect } from "react";
import { useAppStore } from "@/store";

export function useReducedMotionSync() {
  const reducedMotion = useAppStore((s) => s.settings.reducedMotion);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reducedMotion
      ? "true"
      : "false";
  }, [reducedMotion]);
}
