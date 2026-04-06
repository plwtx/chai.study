import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import ErrorBoundary from "./ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: null },
      { path: "statistics", element: null },
      { path: "settings", element: null },
    ],
  },
]);
