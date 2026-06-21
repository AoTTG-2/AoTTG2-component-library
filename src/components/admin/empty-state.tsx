import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title = "Nothing here",
  description,
  action,
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-48 flex-col items-center justify-center gap-3 rounded-none border border-dashed bg-card p-8 text-center", className)}>
      <div className="font-primary text-3xl uppercase text-primary">{title}</div>
      {description ? <p className="max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
