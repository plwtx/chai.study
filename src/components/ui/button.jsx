import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils.js";

// Variants
const buttonVariants = cva(
  "inline-flex items-center justify-center text-center font-medium transition-all duration-300 ease-in-out font-outfit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-fit m-3 disabled:pointer-events-none cursor-pointer disabled:opacity-50",
  {
    variants: {
      intent: {
        primary:
          "bg-royal-gold text-blax border-blax border hover:border-royal-gold hover:text-royal-gold hover:bg-royal-red",
        secondary: "bg-blax text-white hover:bg-royal-red",
        star: "bg-royal-red duration-500 corner-scoop rounded-full hover:corner-bevel hover:bg-blax text-royal-gold border-royal-gold my-9 cursor-pointer border font-semibold hover:border-x-12",
        copy: "underline font-light hover:text-royal-red p-0 text-blax",
      },
      size: {
        xs: "p-1 px-6 text-xs",
        sm: "p-2 px-9 text-sm",
        md: "p-3 px-10 text-base",
        lg: "p-3  px-12 text-lg",
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

// Button
const Button = React.forwardRef(({ className, intent, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ intent, size, className }))} ref={ref} {...props} />;
});

Button.displayName = "Button";

export { Button, buttonVariants };
