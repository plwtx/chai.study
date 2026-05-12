import SectionHeading from "./section-heading";

export default function IntroductionSection() {
  return (
    <section id="introduction" className="scroll-mt-9">
      <SectionHeading>Chaidoro</SectionHeading>
      <p className="mt-3 leading-6">
        A focus timer. Chaidoro is a progress tracking, customizable, focus
        timer that works on your browser's local storage. It is designed to help
        you split long work into shorter focus intervals.
      </p>
    </section>
  );
}
