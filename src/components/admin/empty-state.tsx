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
    <div className={cn("aottg2-stagger flex min-h-48 flex-col items-center justify-center gap-3 rounded-none border border-dashed border-border bg-card p-8 text-center", className)}>
      <div className="font-primary text-xl uppercase text-primary [text-wrap:balance]">{title}</div>
      {description ? <p className="max-w-md text-sm text-muted-foreground [text-wrap:pretty]">{description}</p> : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
