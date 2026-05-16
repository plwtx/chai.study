import { useEffect, useState } from "react";

interface UseScrollspyOptions {
  sectionIds: string[];
  rootMargin?: string;
}

export function useScrollspy({
  sectionIds,
  rootMargin = "0px 0px -65% 0px",
}: UseScrollspyOptions): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const root = findScrollableAncestor(elements[0]);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((acc, curr) =>
          curr.boundingClientRect.top < acc.boundingClientRect.top ? curr : acc
        );
        setActiveId(topMost.target.id);
      },
      {
        root,
        rootMargin,
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}

function findScrollableAncestor(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element.parentElement;
  while (current && current !== document.body) {
    const overflowY = getComputedStyle(current).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") return current;
    current = current.parentElement;
  }
  return null;
}
