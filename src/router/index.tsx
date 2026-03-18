import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: null },
      { path: "tasks", element: null },
      { path: "settings", element: null },
    ],
  },
]);
