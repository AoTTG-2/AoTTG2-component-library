import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const styles = {
  active: "border-green-700/30 bg-green-700 text-white",
  pending: "border-yellow-700/30 bg-yellow-600 text-black",
  suspended: "border-red-800/30 bg-red-700 text-white",
  draft: "border-neutral-700/30 bg-neutral-600 text-white",
} as const;

export type StatusBadgeStatus = keyof typeof styles;

export function StatusBadge({ status, className, children, ...props }: BadgeProps & { status: StatusBadgeStatus }) {
  return <Badge variant="outline" className={cn(styles[status], className)} {...props}>{children ?? status}</Badge>;
}
