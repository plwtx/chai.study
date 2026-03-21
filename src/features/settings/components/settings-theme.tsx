import { useRef, useState } from "react";
import { Check, Cog, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { db } from "@/db";
export default function ThemeSettings() {
  const theme = useAppStore((s) => s.settings.theme);
  const accentColor = useAppStore((s) => s.settings.accentColor);
  const backgroundImageKey = useAppStore(
    (s) => s.settings.backgroundImageKey
  );
  const setTheme = useAppStore((s) => s.setTheme);
  const setAccentColor = useAppStore((s) => s.setAccentColor);
  const setBackgroundImageKey = useAppStore((s) => s.setBackgroundImageKey);

  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Delete old background image if exists
    if (backgroundImageKey) {
      await db.backgroundImages.delete(backgroundImageKey);
    }

    const key = await db.backgroundImages.add({
      blob: file,
      createdAt: Date.now(),
    });
    await setBackgroundImageKey(key as number);

    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveBackground = async () => {
    if (backgroundImageKey) {
      await db.backgroundImages.delete(backgroundImageKey);
      await setBackgroundImageKey(null);
    }
  };

  return (
    <div className="font-poppins h-full w-full text-sm">
      {/* Title */}
      <h1 className="font-poppins text-lg font-medium">Appearance</h1>
      {/* Description */}
      <p className="text-brown-600 font-fragment-mono py-3 leading-6">
        Chaidoro is already themed by me (Len) however feel free to
        customize it to reflect your personality ! ... or perhaps you love
        my picks and do not want to ruin it{" "}
        <span className="bg-brown-200 text-brown-900 border-brown-700 rounded-lg border p-1 px-3 text-xs">
          o( ❛ᴗ❛ )o
        </span>
        .
      </p>
      {/* Divider line */}
      <div className="bg-brown-300 mx-auto my-3 h-px w-full rounded-full" />
      {/* Categories */}
      <div className="flex flex-col gap-6 py-6">
        {/* Color mode */}
        <section>
          <h3 className="text-base font-medium">Color mode</h3>
          <p className="font-fragment-mono text-xs">
            Dark / Light / Auto (system)
          </p>
          {/* Visuals */}
          <div className="flex w-full items-center justify-start gap-3 py-6">
            {/* Light mode */}
            <section
              className="flex cursor-pointer flex-col items-center justify-center"
              onClick={() => setTheme("light")}
            >
              <div
                className={cn(
                  "bg-brown-100 shadow-brown-300 relative flex h-32 w-32 flex-col items-center justify-between rounded-xl border p-3 shadow-md",
                  theme === "light"
                    ? "border-brown-800 border-2"
                    : "border-brown-600"
                )}
              >
                <h6 className="text-[9px] font-light">today</h6>
                <h6 className="text-[10px] font-medium">00 hr. 31 min.</h6>
                <h6 className="text-3xl font-semibold">25:00</h6>
                <h6 className="bg-brown-600 text-brown-50 shadow-brown-600 border-brown-700 w-full rounded-lg border border-b-8 p-1 px-3 text-center text-xs font-medium shadow-md">
                  start
                </h6>
              </div>
              <p className="text-brown-600 mt-3 flex items-center gap-2 font-medium">
                {theme === "light" && <Check size={16} />} Light
              </p>
            </section>
            {/* Dark mode */}
            <section
              className="flex cursor-pointer flex-col items-center justify-center"
              onClick={() => setTheme("dark")}
            >
              <div
                className={cn(
                  "bg-dark-600 text-dark-100 shadow-brown-300 relative flex h-32 w-32 flex-col items-center justify-between rounded-xl border p-3 shadow-md",
                  theme === "dark"
                    ? "border-brown-800 border-2"
                    : "border-brown-600"
                )}
              >
                <h6 className="text-[9px] font-light">today</h6>
                <h6 className="text-[10px] font-medium">00 hr. 31 min.</h6>
                <h6 className="text-3xl font-semibold">25:00</h6>
                <h6 className="bg-dark-900 text-dark-100 shadow-dark-900 w-full rounded-lg border border-b-8 border-black p-1 px-3 text-center text-xs font-medium shadow-md">
                  start
                </h6>
              </div>
              <p className="text-brown-600 mt-3 flex items-center gap-2 font-medium">
                {theme === "dark" && <Check size={16} />} Dark
              </p>
            </section>
            {/* Auto (system) mode */}
            <section
              className="group flex w-md cursor-pointer flex-col items-center justify-center"
              onClick={() => setTheme("system")}
            >
              <div
                className={cn(
                  "bg-brown-100 shadow-brown-300 relative flex h-32 w-full flex-col items-center justify-center overflow-clip rounded-xl border p-3 shadow-md",
                  theme === "system"
                    ? "border-brown-800 border-2"
                    : "border-brown-600"
                )}
              >
                <h6 className="font-fragment-mono z-10 text-sm font-light">
                  system{" "}
                  <span className="bg-dark-600 text-dark-100 shadow-dark-600/45 rounded-lg p-1 px-3 font-semibold shadow-md">
                    AUTO
                  </span>
                </h6>
                <div className="from-brown-300 via-brown-500 to-dark-600 border-brown-900 shadow-brown-700 absolute right-0 h-200 w-1/6 rotate-12 border bg-linear-90 opacity-0 shadow-inner transition-all duration-1000 ease-in-out group-hover:w-4/5 group-hover:opacity-100" />
                {/* Light cog */}
                <Cog className="shadow-brown-700 bg-brown-200 absolute -top-12 -left-12 size-45 rounded-full stroke-[0.3px] shadow-md group-hover:animate-spin" />
                {/* Dark cog */}
                <Cog className="shadow-dark-600 bg-dark-600 text-dark-100 absolute -right-12 -bottom-9 size-32 rotate-45 rounded-full stroke-[0.3px] shadow-md group-hover:animate-spin" />
              </div>
              <p className="text-brown-600 mt-3 flex items-center gap-2 font-medium">
                {theme === "system" && <Check size={16} />} Auto (system
                default)
              </p>
            </section>
          </div>
        </section>

        {/* Accent color */}
        <section>
          <h3 className="text-base font-medium">Accent color</h3>
          <p className="font-fragment-mono text-xs">
            Personalize the accent color used across the app
          </p>
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              className="border-brown-600 shadow-brown-300 flex items-center gap-3 rounded-lg border p-2 px-4 shadow-md"
            >
              <div
                className="h-6 w-6 rounded-full border border-black/10"
                style={{ backgroundColor: accentColor }}
              />
              <span className="font-fragment-mono text-xs">
                {accentColor}
              </span>
            </button>
            {colorPickerOpen && (
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-10 w-10 cursor-pointer border-none bg-transparent"
              />
            )}
          </div>
        </section>

        {/* Background image */}
        <section>
          <h3 className="text-base font-medium">Background image</h3>
          <p className="font-fragment-mono text-xs">
            Set a custom background image for the app
          </p>
          <div className="flex items-center gap-3 py-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="border-brown-600 shadow-brown-300 flex items-center gap-2 rounded-lg border p-2 px-4 text-xs shadow-md"
            >
              <Upload size={14} />
              Upload image
            </button>
            {backgroundImageKey && (
              <button
                onClick={handleRemoveBackground}
                className="border-brown-600 text-brown-600 flex items-center gap-2 rounded-lg border p-2 px-4 text-xs"
              >
                <X size={14} />
                Remove
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
