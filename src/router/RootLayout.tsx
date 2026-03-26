import { Toaster } from "sonner";
import Navbar from "@/features/navbar";
import AnimatedRoutes from "@/features/router/AnimatedRoutes";
import TimerIsland from "@/features/focus-timer/components/timer-island";
import { useTimerBridge } from "@/features/focus-timer/hooks/useTimer";
import { useThemeSync } from "@/features/settings/hooks/useThemeSync";

export default function RootLayout() {
  useTimerBridge();
  useThemeSync();

  return (
    <div className="bg-brown-50 relative h-screen w-full">
      <div className="absolute top-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <TimerIsland />
        <Navbar />
      </div>
      <AnimatedRoutes />
      <Toaster position="bottom-center" />
    </div>
  );
}
