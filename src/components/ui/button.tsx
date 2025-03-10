import * as React from "react";
import { cn } from "../../lib/utils"; // Ensure the import path is correct

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "destructive" | "default"; // Add 'variant' property
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded-md transition",
          variant === "destructive"
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-blue-600 text-white hover:bg-blue-700",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
