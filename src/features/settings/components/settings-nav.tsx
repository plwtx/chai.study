import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SettingsCategory {
  id: string;
  name: string;
}

interface SettingsNavProps {
  categories: SettingsCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function SettingsNav({
  categories,
  activeId,
  onSelect,
}: SettingsNavProps) {
  return (
    <aside className="w-64" aria-label="Settings category selection sidebar.">
      <h1 className="font-poppins px-3 text-2xl font-semibold">Settings</h1>
      <ul className="my-3 flex w-full flex-col gap-2 px-3 text-sm font-normal">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <li
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={cn(
                "flex items-center rounded-lg p-2 pl-5",
                isActive
                  ? "bg-brown-200/45 shadow-brown-500/45 justify-between font-medium shadow-md"
                  : "hover:bg-brown-100/75 group cursor-pointer justify-start",
              )}
            >
              {category.name}
              <span
                className={cn(
                  "text-brown-500",
                  !isActive &&
                    "z-0 -translate-x-9 pl-3 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                <ChevronsRight />
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
