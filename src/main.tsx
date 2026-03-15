import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { hydrateStore } from "@/store/hydrate";
import { initDailyResetScheduler } from "@/lib/dailyResetScheduler";

hydrateStore().then(() => {
  initDailyResetScheduler();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
