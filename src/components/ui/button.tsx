import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import BrushPrimaryImage from "@/assets/images/brush.webp";
import BrushSecondaryImage from "@/assets/images/brush-secondary.webp";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-primary text-sm font-medium uppercase tracking-wider transition-[transform,background-color,color,opacity,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "aottg2-emboss-bg aottg2-cta-primary text-primary-foreground hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0",
        destructive: "aottg2-emboss-bg aottg2-cta-destructive text-destructive-foreground hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0",
        outline: "border border-input bg-background/70 shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "aottg2-emboss-bg aottg2-cta-secondary text-secondary-foreground hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0",
        textured: "aottg2-emboss-bg aottg2-cta-primary text-primary-foreground hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        account: "border border-neutral-950/20 bg-neutral-950/5 text-neutral-950 shadow-sm hover:bg-neutral-950/10",
        oauthDiscord: "aottg2-emboss-bg aottg2-cta-secondary text-white hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0",
        oauthGoogle: "bg-white text-black shadow-sm hover:bg-white/90",
        brush: "aottg2-brush-button aottg2-brush-button-primary font-primary text-lg text-white shadow-none",
        brushSecondary: "aottg2-brush-button aottg2-brush-button-secondary font-primary text-lg text-white shadow-none",
        brushGoogle: "aottg2-brush-button aottg2-brush-button-google font-primary text-lg text-white shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        account: "h-10 w-full px-3 py-2 text-sm normal-case tracking-normal",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  static?: boolean;
}

const brushImages = {
  brush: BrushPrimaryImage,
  brushSecondary: BrushSecondaryImage,
  brushGoogle: BrushPrimaryImage,
} as const;

let brushInstanceCount = 0;

const tapScale = "active:scale-[0.96]";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, static: isStatic = false, style, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const brushImage = variant ? brushImages[variant as keyof typeof brushImages] : undefined;
    const brushIndexRef = React.useRef<number>();

    if (brushImage && brushIndexRef.current == null) {
      brushIndexRef.current = brushInstanceCount % 8;
      brushInstanceCount += 1;
    }

    const brushStyle = brushImage
      ? ({
          "--button-brush-image": `url(${brushImage})`,
          "--button-brush-delay": `${(brushIndexRef.current ?? 0) * 45}ms`,
        } as React.CSSProperties)
      : undefined;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), !isStatic && tapScale, className)}
        ref={ref}
        style={{ ...brushStyle, ...style }}
        {...props}
      >
        {brushImage && !asChild ? <span className="aottg2-brush-button-content">{children}</span> : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
