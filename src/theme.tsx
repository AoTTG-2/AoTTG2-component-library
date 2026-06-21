import { useEffect, type HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export type Aottg2ThemeMode = "light" | "dark";
export type Aottg2Palette = "website" | "workshop";

export type Aottg2ThemeProps = HTMLAttributes<HTMLDivElement> & {
  theme?: Aottg2ThemeMode;
  palette?: Aottg2Palette;
  global?: boolean;
};

export function Aottg2Theme({ theme = "light", palette = "website", global = false, className, ...props }: Aottg2ThemeProps) {
  useEffect(() => {
    if (!global) return;

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.palette = palette;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("aottg2-palette-workshop", palette === "workshop");
    root.classList.toggle("aottg2-palette-website", palette === "website");
  }, [global, theme, palette]);

  return (
    <div
      data-theme={theme}
      data-palette={palette}
      className={cn("aottg2-theme", theme, `aottg2-palette-${palette}`, className)}
      {...props}
    />
  );
}
