import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { TOC_ITEMS } from "./toc-items";
import { useScrollspy } from "./use-scrollspy";

export default function ScrollspyToc() {
  const sectionIds = useMemo(() => TOC_ITEMS.map((item) => item.id), []);
  const activeId = useScrollspy({ sectionIds });

  const handleClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      aria-label="Information page contents"
      className="sticky top-9 hidden h-fit w-44 shrink-0 self-start lg:block"
    >
      <h2 className="font-poppins text-brown-500 dark:text-dark-100/50 mb-3 text-xs tracking-wide uppercase">
        On this page
      </h2>
      <ul className="flex flex-col">
        {TOC_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => handleClick(event, item.id)}
                className={cn(
                  "font-poppins flex items-center gap-3 py-1.5 text-xs transition-colors",
                  isActive
                    ? "text-brown-900 dark:text-dark-100 font-medium"
                    : "text-brown-500/80 dark:text-dark-100/45 hover:text-brown-800 dark:hover:text-dark-100/75"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px transition-all duration-200",
                    isActive
                      ? "bg-brown-900 dark:bg-dark-100 w-5"
                      : "bg-brown-400 dark:bg-dark-100/30 w-3"
                  )}
                />
                <span className="select-none">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
