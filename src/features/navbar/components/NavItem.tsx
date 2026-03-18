import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  to: string;
  variant?: "pill" | "icon";
}

const variantStyles = {
  pill: {
    base: "size-6 cursor-pointer rounded-full",
    active:
      "text-brown-100 bg-brown-700 shadow-brown-700 scale-160 p-1 shadow-md",
    inactive:
      "text-brown-700 hover:bg-brown-900/25 transition-all ease-in-out hover:scale-130 hover:p-px",
  },
  icon: {
    base: "size-6 cursor-pointer",
    active: "text-brown-800",
    inactive: "text-brown-700 hover:text-brown-800 transition-colors",
  },
};

export default function NavItem({
  icon: Icon,
  to,
  variant = "pill",
}: NavItemProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === to;

  const handleClick = useCallback(() => {
    navigate(to);
  }, [navigate, to]);

  const s = variantStyles[variant];

  return (
    <Icon
      className={cn(s.base, isActive ? s.active : s.inactive)}
      onClick={handleClick}
    />
  );
}
