import type { ReactNode } from "react";
import type { Preview } from "@storybook/react";
import { Aottg2Theme, type Aottg2Palette, type Aottg2ThemeMode } from "../src/theme";
import "../src/styles.css";

type StorybookTheme = Aottg2ThemeMode | "both";

function ThemePanel({ theme, palette, children }: { theme: Aottg2ThemeMode; palette: Aottg2Palette; children: ReactNode }) {
  return (
    <Aottg2Theme theme={theme} palette={palette} className="min-h-screen bg-background p-8 text-foreground">
      {children}
    </Aottg2Theme>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "AoTTG2 theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "both", title: "Light + Dark" },
        ],
        dynamicTitle: true,
      },
    },
    palette: {
      description: "AoTTG2 color palette",
      defaultValue: "website",
      toolbar: {
        title: "Palette",
        icon: "paintbrush",
        items: [
          { value: "website", title: "Website" },
          { value: "workshop", title: "Workshop" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme ?? "light") as StorybookTheme;
      const palette = (context.globals.palette ?? "website") as Aottg2Palette;

      if (theme === "both") {
        return (
          <div className="grid min-h-screen md:grid-cols-2">
            <ThemePanel theme="light" palette={palette}>
              <div className="mb-4 font-primary text-2xl uppercase text-primary">Light / {palette}</div>
              <Story />
            </ThemePanel>
            <ThemePanel theme="dark" palette={palette}>
              <div className="mb-4 font-primary text-2xl uppercase text-primary">Dark / {palette}</div>
              <Story />
            </ThemePanel>
          </div>
        );
      }

      return (
        <ThemePanel theme={theme} palette={palette}>
          <Story />
        </ThemePanel>
      );
    },
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
