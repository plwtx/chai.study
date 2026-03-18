import { Navigate } from "react-router";
import { useAppStore } from "@/store";
import type { Features } from "@/types";

interface ProtectedRouteProps {
  feature: keyof Features;
  children: React.ReactNode;
}

export default function ProtectedRoute({
  feature,
  children,
}: ProtectedRouteProps) {
  const enabled = useAppStore((s) => s.settings.features[feature]);

  if (!enabled) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
