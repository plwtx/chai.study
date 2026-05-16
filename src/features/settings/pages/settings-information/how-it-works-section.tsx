import SectionHeading from "./section-heading";
import DataFlowDiagram from "./data-flow-diagram";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-9">
      <SectionHeading>How it works</SectionHeading>
      <p className="mt-3 leading-6">
        Chaidoro respects your privacy by having no server. Which means the app
        completely runs on your device, using your choice of browser's local
        storage (IndexedDB) without any of your data leaving your device. This
        also means there is no way to synchronize your data online &
        automatically. Which is why there is an option on settings menu for you
        to download re-usable JSON file to then import it on a different
        browser / device. Practically allowing you to manually synchronize your
        progress between multiple devices without use of network.
      </p>
      <DataFlowDiagram />
    </section>
  );
}
