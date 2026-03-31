import HeaderDescription from "@/components/ui/header-description";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import { Circle, ServerOff, Coffee } from "lucide-react";
export default function Information() {
  return (
    <>
      <main className="font-fragment-mono dark:text-dark-100/80 text-brown-800/80">
        <section className="flex h-fit w-full items-center justify-between gap-9">
          <Circle className="min-h-24 min-w-24 stroke-[0.3px] p-1" />
          <HeaderDescription
            header={"Hey there !"}
            description={
              "My name is Len / Pluwia whatever you prefer and I am the developer of Chaidoro. Below is my small documentation section for the app."
            }
            kaomoji={"o( ❛ᴗ❛ ) <3"}
          />
        </section>
        <HorizontalDivider />
        {/* Text */}
        <section className="flex flex-col gap-3">
          <p>
            The app is at very early stages and still under development. Hence
            it is usual to encounter bugs and issues. I would ask you to either
            submit a GitHub issue or mail me any bugs issues you encounter so I
            can fix them. Thank you in advance.
          </p>
          <p>
            Chaidoro is open for contributions and would welcome any input on
            direction of development.
          </p>
        </section>
        {/* Benefits */}
        <section className="my-9 flex flex-col items-start justify-start gap-3 text-sm">
          <div className="border-brown-800 dark:border-dark-100 flex h-fit w-fit items-center justify-center gap-3 rounded-3xl border p-3">
            {/* ICON: */}
            <ServerOff className="stroke-brown-700 dark:stroke-dark-100 min-h-24 min-w-24 stroke-[0.3px] p-1" />
            {/* DIVIDER */}
            <div className="bg-brown-700 dark:bg-dark-100 min-h-20 min-w-px" />
            {/* TEXT */}
            <p>
              Runs on your device. <br /> No network required.
            </p>
          </div>
          <div className="border-brown-800 dark:border-dark-100 flex h-fit w-fit items-center justify-center gap-3 rounded-3xl border p-3">
            {/* ICON: */}
            <Coffee className="stroke-brown-700 dark:stroke-dark-100 min-h-24 min-w-24 stroke-[0.3px] p-1" />
            {/* DIVIDER */}
            <div className="bg-brown-700 dark:bg-dark-100 min-h-20 min-w-px" />
            {/* TEXT */}
            <p>
              100% Open source <br /> with a GPL (v3) license.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
