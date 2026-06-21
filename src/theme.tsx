import type { HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export function Aottg2Theme({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("aottg2-theme", className)} {...props} />;
}
