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
      <div className="bg-brown-50 font-poppins h-screen w-full">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="border-brown-700 mt-32 flex h-dvh w-full max-w-7xl items-center justify-center border-x">
            <div className="h-full w-full">
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
                <ul className="my-3 flex w-full flex-col gap-3 px-3 text-sm">
                  {/* Active style */}
                  <li className="bg-brown-300/45 shadow-brown-500/45 rounded-lg p-2 px-6 shadow-md">
                    Active
                  </li>
                  {categoriesList.map((category) => (
                    <li key={category.id}>
                      {category.name}
                      {/* <category.component /> */}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
