import type { Preview } from "@storybook/react";
import { Aottg2Theme } from "../src/theme";
import "../src/styles.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "AoTTG2 theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <Aottg2Theme theme={context.globals.theme === "dark" ? "dark" : "light"} className="min-h-screen bg-background p-8 text-foreground">
        <Story />
      </Aottg2Theme>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
