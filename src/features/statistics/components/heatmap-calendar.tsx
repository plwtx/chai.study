import HeaderDescription from "@/components/ui/header-description";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import { Circle, ServerOff, Coffee } from "lucide-react";
export default function FocusHeatmap() {
  return (
    <>
      <main className="bg-brown-100 corner-scoop dark:bg-dark-900 border-brown-300 shadow-brown-400 relative h-64 w-full rounded-xl shadow-xs dark:border-black dark:shadow-black">
        {/* absolute title */}
        <div className="bg-brown-100 dark:bg-dark-900 border-brown-300 shadow-brown-400 corner-b-scoop absolute -top-3 left-6 flex h-6 w-fit items-center justify-center rounded-full border px-9 text-xs font-medium shadow-xs dark:border-black dark:shadow-black">
          <h3>Calendar focus heatmap</h3>
        </div>
      </main>
    </>
  );
}
