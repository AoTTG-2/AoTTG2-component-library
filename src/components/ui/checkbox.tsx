import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer relative h-4 w-4 shrink-0 rounded-none border border-primary shadow transition-[background-color,color,box-shadow,opacity] duration-150 ease-out before:absolute before:left-1/2 before:top-1/2 before:h-10 before:w-10 before:-translate-x-1/2 before:-translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator forceMount className={cn("flex items-center justify-center text-current transition-[opacity,filter,transform] duration-300 ease-out data-[state=checked]:scale-100 data-[state=checked]:opacity-100 data-[state=checked]:blur-0 data-[state=unchecked]:scale-[0.25] data-[state=unchecked]:opacity-0 data-[state=unchecked]:blur-[4px]")}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
