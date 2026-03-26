import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { useAppStore } from "@/store";
import { db } from "@/db";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import { showSettingsToast } from "../../components/settings-toast";

export default function BackgroundImageUpload() {
  const backgroundImageKey = useAppStore(
    (s) => s.settings.backgroundImageKey,
  );
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
        description={"Set a custom background image for the app"}
      />

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
          className="border-brown-200/75 shadow-brown-300 dark:bg-dark-900/45 bg-brown-100 dark:border-dark-900 flex cursor-pointer items-center gap-3 rounded-lg border p-2 px-4 shadow-sm active:scale-95 dark:shadow-black"
        >
          <Upload size={14} />
          Upload image
        </button>
        {backgroundImageKey && (
          <button
            onClick={handleRemoveBackground}
            className="border-brown-600 dark:border-dark-100/15 dark:text-dark-100/75 text-brown-600 flex cursor-pointer items-center gap-2 rounded-lg border p-2 px-4 text-xs active:scale-95"
          >
            <X size={14} />
            Remove
          </button>
        )}
      </div>
    </section>
  );
}
