import HeaderDescription from "@/components/ui/header-description";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import { Circle, ServerOff, Coffee } from "lucide-react";
export default function Information() {
  return (
    <>
      <main className="font-fragment-mono dark:text-dark-100/80 text-brown-800/80">
        <HeaderDescription
          header={"Hey there !"}
          description={
            "My name is Len / Pluwia whatever you prefer and I am the developer of Chaidoro. Below is my small documentation section for the app."
          }
          kaomoji={"o( ❛ᴗ❛ ) <3"}
        />
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
          <p>
            I made this app because I did not find focus timer that I liked.
            Hence I made this app for myself and thats why it has features and
            style that I chose. I added small customization such as custom
            wallpaper. However I know that it is too little... in the future I
            will add more stuff such as custom colors, fonts, widgets and etc.
            Alternatively if you want to do it yourself then you are free to
            modify any piece of Chaidoro.
          </p>
        </section>
        {/* Social media banner */}
        {/* GitHub */}
      </main>
    </>
  );
}
