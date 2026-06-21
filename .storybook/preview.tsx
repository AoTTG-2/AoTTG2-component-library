import type { ReactNode } from "react";
import type { Preview } from "@storybook/react";
import { Aottg2Theme, type Aottg2ThemeMode } from "../src/theme";
import "../src/styles.css";

type StorybookTheme = Aottg2ThemeMode | "both";

function ThemePanel({ theme, children }: { theme: Aottg2ThemeMode; children: ReactNode }) {
  return (
    <Aottg2Theme theme={theme} className="min-h-screen bg-background p-8 text-foreground">
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
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme ?? "light") as StorybookTheme;

      if (theme === "both") {
        return (
          <div className="grid min-h-screen md:grid-cols-2">
            <ThemePanel theme="light">
              <div className="mb-4 font-primary text-2xl uppercase text-primary">Light</div>
              <Story />
            </ThemePanel>
            <ThemePanel theme="dark">
              <div className="mb-4 font-primary text-2xl uppercase text-primary">Dark</div>
              <Story />
            </ThemePanel>
          </div>
        );
      }

      return (
        <ThemePanel theme={theme}>
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
