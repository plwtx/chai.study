import SectionHeading from "./section-heading";

export default function AboutDeveloperSection() {
  return (
    <section id="about-developer" className="scroll-mt-9">
      <SectionHeading>About developer</SectionHeading>
      <div className="mt-3 flex flex-col gap-3 leading-6">
        <p>My name is Len (also Pluwia) and I am the developer of Chaidoro.</p>
        <p>
          I made this app for myself and thats why it has features and style
          that I chose. I added small customization such as custom wallpaper and
          dark mode. I plan to add more stuff such as custom colors, fonts,
          widgets and etc. in the future. Alternatively if you want to do it
          yourself then you are free to modify any piece of Chaidoro (and you
          can contribute it, for me to merge it into main branch).
        </p>
      </div>
    </section>
  );
}
