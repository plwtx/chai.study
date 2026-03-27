import HeaderDescription from "@/components/ui/header-description";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import StoragePieChart from "@/features/settings/components/storage-pie-chart";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import { Download, Upload } from "lucide-react";

export default function Settings() {
  return (
    <>
      <div className="font-poppins text-brown-800 dark:text-dark-100 h-full w-full text-sm">
        <HeaderDescription
          header={"Local storage"}
          description={
            "The app runs on your device without ever leaving. It does not collect any data nor track your usage. For this to be possible, it uses your browser storage called IndexedDB. You can check the saved raw data by pressing F12 on your browser,going to the application tab on the opened window, then clicking to IndexedDB. In this page you can see the same data with formatting to make it easier to read."
          }
          kaomoji={null}
        />

        <div className="bg-brown-300 dark:bg-dark-100/20 mx-auto my-6 h-px w-full rounded-full" />
        <SubHeaderDescription
          header={"Used storage"}
          description={
            "Total used storage in your browser's local storage (IndexedDB)."
          }
        />

        {/* Pie chart and Imp/Exp buttons */}
        <section className="flex h-full w-full items-center justify-between">
          <StoragePieChart />

          <div className="flex h-full w-fit flex-col justify-between gap-6">
            {/* Export button */}
            <button
              // onClick={}
              className="border-brown-200/75 shadow-brown-300 dark:bg-dark-900/45 bg-brown-100 dark:border-dark-900 flex w-full min-w-45 cursor-pointer items-center justify-between gap-6 rounded-lg border p-2 px-4 text-left font-medium shadow-sm active:scale-95 dark:shadow-black"
            >
              <span>Download</span>
              <Download className="size-4" />
            </button>
            {/* Import button */}
            <button
              // onClick={}
              className="border-brown-200/75 shadow-brown-300 dark:bg-dark-900/45 bg-brown-100 dark:border-dark-900 flex w-full min-w-45 cursor-pointer items-center justify-between gap-6 rounded-lg border p-2 px-4 text-left font-medium shadow-sm active:scale-95 dark:shadow-black"
            >
              <span>Upload</span>
              <Upload className="size-4" />
            </button>
          </div>
        </section>
        {/* Divider */}
        <HorizontalDivider />
      </div>
    </>
  );
}
