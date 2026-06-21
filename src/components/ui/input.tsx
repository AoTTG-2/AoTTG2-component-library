import * as React from "react";
import InputTexture from "@/assets/images/bg-dark.webp";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, style, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "aottg2-input-engraved flex h-12 w-full rounded-none border-0 bg-input px-4 py-3 text-base font-medium text-foreground transition-[background-color,color,box-shadow,opacity] duration-150 ease-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    style={{
      backgroundImage: `linear-gradient(var(--aottg2-input-overlay-from), var(--aottg2-input-overlay-to)), url(${InputTexture})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      ...style,
    }}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
