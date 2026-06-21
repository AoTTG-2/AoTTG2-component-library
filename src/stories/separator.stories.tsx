import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/index";

const meta = {
  title: "Components/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div>
        <h3 className="font-primary text-3xl uppercase">AoTTG2</h3>
        <p className="text-sm text-muted-foreground">Component library.</p>
      </div>
      <Separator />
      <p className="text-sm">Separated content.</p>
    </div>
  ),
};
