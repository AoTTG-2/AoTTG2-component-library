import type { HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export type Aottg2ThemeMode = "light" | "dark";
export type Aottg2Palette = "website" | "workshop";

export type Aottg2ThemeProps = HTMLAttributes<HTMLDivElement> & {
  theme?: Aottg2ThemeMode;
  palette?: Aottg2Palette;
};

export function Aottg2Theme({ theme = "light", palette = "website", className, ...props }: Aottg2ThemeProps) {
  return (
    <div
      data-theme={theme}
      data-palette={palette}
      className={cn("aottg2-theme", theme, `aottg2-palette-${palette}`, className)}
      {...props}
    />
  );
}
