import * as React from "react";
import InputTexture from "@/assets/images/bg-dark.webp";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, style, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-24 w-full rounded-none border border-input bg-input px-3 py-2 text-sm text-foreground ring-offset-background transition-[background-color,color,box-shadow,opacity] duration-150 ease-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    style={{
      backgroundImage: `linear-gradient(var(--aottg2-input-overlay-from), var(--aottg2-input-overlay-to)), url(${InputTexture})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      ...style,
    }}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
