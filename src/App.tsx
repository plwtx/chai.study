import { RouterProvider } from "react-router";
import { router } from "@/router";
import { useHydrationStore } from "@/store/hydration";
import InitialLoading from "@/components/ui/initial-loading";

export default function App() {
  const ready = useHydrationStore((s) => s.ready);

  if (!ready) return <InitialLoading />;
  return <RouterProvider router={router} />;
}
