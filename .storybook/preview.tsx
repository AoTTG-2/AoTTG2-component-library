import type { Preview } from "@storybook/react";
import "../src/styles.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="aottg2-theme min-h-screen bg-background p-8 text-foreground">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
