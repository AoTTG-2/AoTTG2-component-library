import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("aottg2-stagger min-w-48", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-sans text-sm font-semibold uppercase tracking-wide text-muted-foreground [text-wrap:balance]">{label}</CardTitle>
        {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      </CardHeader>
      <CardContent>
        <div className="font-primary text-2xl uppercase text-primary tabular-nums">{value}</div>
        {hint ? <p className="text-xs text-muted-foreground [text-wrap:pretty]">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
