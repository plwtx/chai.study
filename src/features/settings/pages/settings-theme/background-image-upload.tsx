import { useRef } from "react";
import { Upload, X, Trash2 } from "lucide-react";
import { useAppStore } from "@/store";
import { db } from "@/db";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import { showSettingsToast } from "../../components/settings-toast";

export default function BackgroundImageUpload() {
  const backgroundImageKey = useAppStore((s) => s.settings.backgroundImageKey);
  const setBackgroundImageKey = useAppStore((s) => s.setBackgroundImageKey);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (backgroundImageKey) {
      await db.backgroundImages.delete(backgroundImageKey);
    }

    const key = await db.backgroundImages.add({
      blob: file,
      createdAt: Date.now(),
    });
    await setBackgroundImageKey(key as number);
    showSettingsToast("Background image updated.");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveBackground = async () => {
    if (backgroundImageKey) {
      await db.backgroundImages.delete(backgroundImageKey);
      await setBackgroundImageKey(null);
      showSettingsToast("Background image removed.");
    }
  };

  return (
    <section>
      <SubHeaderDescription
        header={"Background image"}
        description={
          "Set a custom background image for the clock screen. You can control the opacity and saturation of the background image so it fits as you wish. (Please keep in mind that due to the apps brownish colors it is advised to keep the opacity below ~65%.)"
        }
      />

      <div className="relative flex h-96 w-full items-end justify-center gap-3 py-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="border-brown-600 shadow-brown-300 dark:border-dark-900 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-2 px-4 shadow-inner dark:shadow-black"
        >
          <Upload size={20} />
          Drop image here or click to browse.
        </button>
        {backgroundImageKey && (
          <>
            {/* Opacity slider and remove background button. */}
            <section className="flex h-full w-150 flex-col items-start justify-between gap-3 pl-3">
              {/* Opacity Slider */}
              <div className="flex w-full flex-col gap-3">
                {/* Info */}
                <SubHeaderDescription
                  header={"Opacity & Saturation"}
                  description={
                    "Adjust opacity and saturation of the uploaded background."
                  }
                />
                {/* Sliders */}
                <section className="bg-brown-100/75 border-brown-200/75 shadow-brown-200 font-fragment-mono dark:bg-dark-900 text-brown-700 dark:text-dark-100 flex h-32 w-full flex-col items-center justify-between gap-3 rounded-lg border px-6 py-9 shadow-xs dark:border-black dark:shadow-black">
                  {/* Opacity */}
                  <div className="flex w-full items-center gap-1">
                    <p className="font-black">OPA.</p>
                    {/* Slider */}
                    <div className="bg-brown-200 dark:bg-dark-100 relative ml-6 flex h-1 w-full items-center rounded-full pl-3">
                      <div className="bg-brown-700 dark:border-dark-900 border-brown-100 h-5 w-5 rounded-full border-4 dark:bg-white" />
                    </div>
                    <p className="dark:bg-dark-100 bg-brown-200 corner-l-bevel -translate-x-3 rounded-l-full px-2 pl-4 text-black">
                      03%
                    </p>
                  </div>
                  {/* Saturation */}
                  <div className="flex w-full items-center gap-1">
                    <p className="font-black">SAT.</p>
                    {/* Slider */}
                    <div className="bg-brown-200 dark:bg-dark-100 relative ml-6 flex h-1 w-full items-center rounded-full pl-32">
                      <div className="bg-brown-700 dark:border-dark-900 border-brown-100 h-5 w-5 rounded-full border-4 dark:bg-white" />
                    </div>
                    <p className="dark:bg-dark-100 bg-brown-200 corner-l-bevel -translate-x-3 rounded-l-full px-2 pl-4 text-black">
                      73%
                    </p>
                  </div>
                </section>
              </div>

              {/* Remove button */}

              <button
                onClick={handleRemoveBackground}
                className="mt-3 flex h-16 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 p-2 px-3 text-left text-xs font-medium text-red-700 shadow-sm shadow-red-600 transition-all duration-150 hover:bg-red-100 active:scale-95 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950"
              >
                <X size={20} />
                Remove the current background.
              </button>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
