import { useState, type ReactNode } from "react";
import type { Preview } from "@storybook/react";
import { Aottg2Theme, type Aottg2Palette, type Aottg2ThemeMode } from "../src/theme";
import "../src/styles.css";

type StorybookTheme = Aottg2ThemeMode | "both";

const storage = {
  get<T extends string>(key: string, fallback: T): T {
    try {
      return (localStorage.getItem(key) as T) || fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore private-mode storage failures
    }
  },
};

function ThemePanel({ theme, palette, children }: { theme: Aottg2ThemeMode; palette: Aottg2Palette; children: ReactNode }) {
  return (
    <Aottg2Theme theme={theme} palette={palette} className="min-h-screen bg-background p-8 text-foreground">
      {children}
    </Aottg2Theme>
  );
}

function ThemeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={active ? "bg-primary px-3 py-1 text-primary-foreground" : "bg-muted px-3 py-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
    >
      {children}
    </button>
  );
}

function StorybookThemeControls({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<StorybookTheme>(() => storage.get("aottg2-storybook-theme", "light"));
  const [palette, setPalette] = useState<Aottg2Palette>(() => storage.get("aottg2-storybook-palette", "website"));

  const chooseTheme = (value: StorybookTheme) => {
    storage.set("aottg2-storybook-theme", value);
    setTheme(value);
  };

  const choosePalette = (value: Aottg2Palette) => {
    storage.set("aottg2-storybook-palette", value);
    setPalette(value);
  };

  const controls = (
    <div className="sticky top-0 z-[9999] mb-8 flex flex-wrap items-center gap-3 border-b border-border bg-background/95 p-3 text-sm text-foreground backdrop-blur">
      <div className="flex items-center gap-1">
        <span className="mr-1 font-semibold uppercase text-muted-foreground">Theme</span>
        {(["light", "dark", "both"] as const).map((value) => (
          <ThemeButton key={value} active={theme === value} onClick={() => chooseTheme(value)}>
            {value === "both" ? "Both" : value[0].toUpperCase() + value.slice(1)}
          </ThemeButton>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="mr-1 font-semibold uppercase text-muted-foreground">Palette</span>
        {(["website", "workshop"] as const).map((value) => (
          <ThemeButton key={value} active={palette === value} onClick={() => choosePalette(value)}>
            {value[0].toUpperCase() + value.slice(1)}
          </ThemeButton>
        ))}
      </div>
    </div>
  );

  if (theme === "both") {
    return (
      <div className="min-h-screen bg-background">
        {controls}
        <div className="grid md:grid-cols-2">
          <ThemePanel theme="light" palette={palette}>
            <div className="mb-4 font-primary text-2xl uppercase text-primary">Light / {palette}</div>
            {children}
          </ThemePanel>
          <ThemePanel theme="dark" palette={palette}>
            <div className="mb-4 font-primary text-2xl uppercase text-primary">Dark / {palette}</div>
            {children}
          </ThemePanel>
        </div>
      </div>
    );
  }

  return (
    <ThemePanel theme={theme} palette={palette}>
      {controls}
      {children}
    </ThemePanel>
  );
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <StorybookThemeControls>
        <Story />
      </StorybookThemeControls>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
