import { ChevronsRight } from "lucide-react";

export default function Settings() {
  interface SettingsCategories {
    id: number;
    name: string;
    component: React.ComponentType;
  }

  const categoriesList: SettingsCategories[] = [
    { id: 1, name: "General", component: null },
    { id: 2, name: "Clock", component: null },
    { id: 3, name: "Theme", component: null },
    { id: 4, name: "Storage", component: null },
    { id: 5, name: "Information", component: null },
  ];
  return (
    <>
      <div className="bg-brown-50 font-poppins h-dvh w-full p-9">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="mt-19 flex h-dvh w-full max-w-7xl items-center justify-center">
            <div className="flex h-full w-full">
              {/* Settings Navigation Sidebar: */}
              <aside
                className="w-64"
                aria-label="Settings category selection sidebar."
              >
                {/* Title */}
                <h1 className="font-poppins px-3 text-2xl font-semibold">
                  Settings
                </h1>
                {/* Settings categories: */}
                <ul className="my-3 flex w-full flex-col gap-2 px-3 text-sm font-normal">
                  {/* Active style + Active arrows */}
                  <li className="bg-brown-200/45 shadow-brown-500/45 flex items-center justify-between rounded-lg p-2 pl-5 font-medium shadow-md">
                    Active <ChevronsRight />
                  </li>
                  {categoriesList.map((category) => (
                    <li
                      className="hover:bg-brown-100/75 group flex cursor-pointer items-center justify-start rounded-lg p-2 pl-5"
                      key={category.id}
                    >
                      {category.name}
                      <span className="text-brown-500 z-0 -translate-x-9 pl-3 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
                        <ChevronsRight />
                      </span>
                      {/* <category.component /> */}
                    </li>
                  ))}
                </ul>
              </aside>
              {/* Settings menu: */}
              <main className="bg-brown-300/75 shadow-brown-800 h-full w-full rounded-2xl shadow-inner"></main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
