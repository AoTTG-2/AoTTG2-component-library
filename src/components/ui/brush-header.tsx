import type { HTMLAttributes, ReactNode } from "react";
import BrushPrimaryImage from "@/assets/images/brush.webp";
import BrushSecondaryImage from "@/assets/images/brush-secondary.webp";
import { cn } from "@/lib/utils";

export type BrushHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  description?: ReactNode;
  brush?: "primary" | "secondary";
  tone?: "light" | "dark";
};

export function BrushHeader({ title, description, brush = "secondary", tone = "light", className, ...props }: BrushHeaderProps) {
  return (
    <div className={cn("w-max max-w-full", className)} {...props}>
      <div className="relative inline-block px-2 py-1">
        <img
          src={brush === "primary" ? BrushPrimaryImage : BrushSecondaryImage}
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-1/2 z-0 h-[85%] w-full -translate-x-2 translate-y-0 scale-x-110 object-fill"
        />
        <h2 className={cn("relative z-10 font-primary text-4xl uppercase leading-none lg:text-6xl", tone === "light" ? "text-white" : "text-primary")}>
          {title}
        </h2>
      </div>
      {description ? <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}
