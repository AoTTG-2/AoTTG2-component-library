import type { HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export type Aottg2ThemeMode = "light" | "dark";

export type Aottg2ThemeProps = HTMLAttributes<HTMLDivElement> & {
  theme?: Aottg2ThemeMode;
};

export function Aottg2Theme({ theme = "light", className, ...props }: Aottg2ThemeProps) {
  return <div data-theme={theme} className={cn("aottg2-theme", theme, className)} {...props} />;
}
