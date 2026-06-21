import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function FilterBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-3 rounded-none border bg-card p-4 md:flex-row md:items-center md:justify-between", className)} {...props} />;
}
