import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-white p-4 shadow-md rounded-md", className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
