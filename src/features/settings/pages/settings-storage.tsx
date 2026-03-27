import HeaderDescription from "@/components/ui/header-description";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import StoragePieChart from "@/features/settings/components/storage-pie-chart";

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
          description={"Total used storage in your browser."}
        />

        {/* Pie chart and Imp/Exp buttons */}
        <section className="h-fit w-full">
          {/* Export button */}
          {/* Import button */}

          <StoragePieChart />
        </section>
      </div>
    </>
  );
}
