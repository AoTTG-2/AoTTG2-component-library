import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type TextureTone = "background" | "card" | "primary" | "secondary" | "muted";

export interface TexturedSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  tone?: TextureTone;
}

const toneClasses: Record<TextureTone, string> = {
  background: "",
  card: "aottg2-texture-card",
  primary: "aottg2-texture-primary",
  secondary: "aottg2-texture-secondary",
  muted: "aottg2-texture-muted",
};

const TexturedSurface = React.forwardRef<HTMLDivElement, TexturedSurfaceProps>(
  ({ asChild = false, tone = "background", className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return <Comp ref={ref} className={cn("aottg2-texture", toneClasses[tone], className)} {...props} />;
  },
);
TexturedSurface.displayName = "TexturedSurface";

export { TexturedSurface };
