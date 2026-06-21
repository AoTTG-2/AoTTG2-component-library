import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "text" | "avatar" | "card";
  lines?: number;
};

const variants = {
  default: "h-4 w-full",
  text: "h-4 w-full",
  avatar: "h-10 w-10",
  card: "h-32 w-full",
} as const;

function Skeleton({ className, variant = "default", lines = 1, ...props }: SkeletonProps) {
  if (lines > 1) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className={cn("aottg2-skeleton h-4", index === lines - 1 && "w-2/3")} />
        ))}
      </div>
    );
  }

  return <div className={cn("aottg2-skeleton", variants[variant], className)} {...props} />;
}

export { Skeleton };
