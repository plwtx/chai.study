import SectionHeading from "./section-heading";

export default function AboutDeveloperSection() {
  return (
    <section id="about-developer" className="scroll-mt-9">
      <section className="flex w-full items-center justify-between gap-6">
        <SectionHeading>About developer</SectionHeading>
        {/* Personal Socials */}
        <div className="flex items-center justify-start gap-3">
          {/* Personal */}
          <a href="https://plu.moe/" target="_blank" rel="noopener noreferrer">
            <svg
              className="fill-brown-600 dark:fill-brown-300 size-6 cursor-pointer stroke-0"
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="300"
              viewBox="0 0 300 300"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M150 0C232.843 0 300 67.1573 300 150C300 232.843 232.843 300 150 300C67.1573 300 0 232.843 0 150C0 67.1573 67.1573 0 150 0ZM95.318 207.46C92.7166 209.442 92.2135 213.156 94.1943 215.758C96.1755 218.36 99.8912 218.863 102.493 216.882L150 180.703L197.507 216.882C200.109 218.863 203.825 218.36 205.806 215.758C207.787 213.156 207.283 209.442 204.682 207.46L150 165.818L95.318 207.46ZM77.7196 99.9881C75.1695 97.9412 71.443 98.3488 69.396 100.899C67.3491 103.449 67.7567 107.175 70.3067 109.222L118.781 148.132C121.332 150.179 125.058 149.772 127.105 147.222C129.152 144.671 128.745 140.944 126.194 138.897L77.7196 99.9881ZM230.604 100.899C228.557 98.3488 224.831 97.9412 222.28 99.9881L173.806 138.897C171.255 140.944 170.848 144.671 172.895 147.222C174.942 149.772 178.668 150.179 181.219 148.132L229.693 109.222C232.243 107.175 232.651 103.449 230.604 100.899Z"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M150 0C232.843 0 300 67.1573 300 150C300 232.843 232.843 300 150 300C67.1573 300 0 232.843 0 150C0 67.1573 67.1573 0 150 0ZM95.318 207.46C92.7166 209.442 92.2135 213.156 94.1943 215.758C96.1755 218.36 99.8912 218.863 102.493 216.882L150 180.703L197.507 216.882C200.109 218.863 203.825 218.36 205.806 215.758C207.787 213.156 207.283 209.442 204.682 207.46L150 165.818L95.318 207.46ZM77.7196 99.9881C75.1695 97.9412 71.443 98.3488 69.396 100.899C67.3491 103.449 67.7567 107.175 70.3067 109.222L118.781 148.132C121.332 150.179 125.058 149.772 127.105 147.222C129.152 144.671 128.745 140.944 126.194 138.897L77.7196 99.9881ZM230.604 100.899C228.557 98.3488 224.831 97.9412 222.28 99.9881L173.806 138.897C171.255 140.944 170.848 144.671 172.895 147.222C174.942 149.772 178.668 150.179 181.219 148.132L229.693 109.222C232.243 107.175 232.651 103.449 230.604 100.899Z"
                />
              </svg>
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/plwtx/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="fill-brown-600 dark:fill-brown-300 size-6 cursor-pointer stroke-0"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          {/* Bluesky */}
          <a
            href="https://bsky.app/profile/plu.moe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="fill-brown-600 dark:fill-brown-300 size-6 cursor-pointer stroke-0"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bluesky</title>
              <path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" />
            </svg>
          </a>
        </div>
      </section>
      <div className="mt-3 flex flex-col gap-3 leading-6">
        <p>Hejkaa, my name is Len.</p>

        <p>
          I developed Chaidoro for the reason of privacy. I do not want to pay
          for subscriptions or allow my personal data being sold.
        </p>
        <p>
          At the core, this app is made for myself and thats why it has features
          and style that I chose. I added small customization such as custom
          wallpaper and dark mode. However, I plan to add more stuff such as
          custom theme colors, fonts, widgets and etc. in the future.
        </p>
        <p>
          Alternatively if you want to do it yourself then you are free to
          modify any piece of Chaidoro (ofcourse, you can also contribute it, if
          you would like me to merge it into main branch).
        </p>
        <p>I hope Chaidoro can be of use to you.</p>
      </div>
    </section>
  );
}
