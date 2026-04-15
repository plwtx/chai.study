import HeaderDescription from "@/components/ui/header-description";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import { Circle, ServerOff, Coffee } from "lucide-react";
export default function OtherStat() {
  return (
    <>
      {/* Other stats */}
      <main className="bg-brown-400/90 corner-bevel text-brown-50 flex w-full flex-col gap-1 rounded-3xl p-12">
        {/* Other stats */}
        <section className="flex flex-col gap-1">
          <h6>Focus cycles:</h6>
          <h6>Break taken:</h6>
          <h6>Time left till end of day (12:00 AM):</h6>
        </section>
        <h6>Weekly average focus:</h6>
        <h6>Monthly average focus:</h6>
        <h6>Monthly best focus time & date:</h6>
      </main>
    </>
  );
}
