import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "text-center font-normal transition-all duration-300 ease-in-out cursor-pointer",
  {
    variants: {
      intent: {
        primary:
          "px-3 p-1 bg-black text-white rounded-full hover:scale-110 hover:bg-transparent hover:text-black capitalize border border-black border-y-0",
        secondary: "",
        copy: "",
      },
      size: {
        xs: "p-1 px-6 text-xs",
        sm: "p-2 px-9 text-sm",
        md: "p-3 px-10 text-base",
        lg: "p-3 px-12 text-lg",
        xl: "p-9 px-16 text-xl",
        copy: "px-3 text-base",
        circle: "aspect-square min-h-3 min-w-3 p-6 rounded-full",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ intent, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
