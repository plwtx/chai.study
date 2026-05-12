import HeaderDescription from "@/components/ui/header-description";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import IntroductionSection from "./introduction-section";
import HowItWorksSection from "./how-it-works-section";
import FeaturesSection from "./features-section";
import DevelopmentSection from "./development-section";
import AboutDeveloperSection from "./about-developer-section";
import ScrollspyToc from "./scrollspy-toc";

export default function Information() {
  return (
    <div className="font-fragment-mono dark:text-dark-100/80 text-brown-800/80 text-sm">
      <div className="flex gap-9">
        {/* Documentation content */}
        <article className="max-w-3xl min-w-0 flex-1">
          <HeaderDescription
            header={"Information"}
            description={
              "Documentation, features, and notes about Chaidoro - your local-first focus timer."
            }
            kaomoji={"o( ❛ᴗ❛ ) <3"}
          />
          <HorizontalDivider />
          <div className="mt-6 flex flex-col gap-9">
            <IntroductionSection />
            <HowItWorksSection />
            <FeaturesSection />
            <DevelopmentSection />
            <AboutDeveloperSection />
            {/* !!! Don't forget to add license information later !!! */}
          </div>
          {/* Empty bottom spacing */}
          <div className="h-9" />
        </article>
        <ScrollspyToc />
      </div>
    </div>
  );
}
