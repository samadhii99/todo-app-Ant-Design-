import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"; // Corrected the import
import { cn } from "@/lib/utils"; // Ensure this import is correct

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    checked={checked} // Directly use 'checked' prop
    onCheckedChange={onCheckedChange} // Use the 'onCheckedChange' prop correctly
    className={cn(
      "w-5 h-5 border border-gray-400 rounded-md flex items-center justify-center",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="w-3 h-3 bg-blue-600 rounded-sm" />
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = "Checkbox";

export { Checkbox };
