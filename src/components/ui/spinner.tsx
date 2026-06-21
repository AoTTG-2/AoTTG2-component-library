import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "primary" | "destructive" | "muted";
  label?: string;
};

const sizes = {
  sm: "h-4 w-4 border-2",
  default: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-4",
} as const;

const variants = {
  default: "text-foreground",
  primary: "text-primary",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
} as const;

function Spinner({ className, size = "default", variant = "primary", label, ...props }: SpinnerProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 font-primary text-base text-current", variants[variant], className)} {...props}>
      <span className={cn("aottg2-spinner rounded-full border-current border-r-transparent", sizes[size])} aria-hidden="true" />
      {label ? <span>{label}</span> : <span className="sr-only">Loading</span>}
    </div>
  );
}

export { Spinner };
