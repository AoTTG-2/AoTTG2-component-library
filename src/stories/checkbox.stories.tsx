import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Label } from "@/index";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="remember" />
      <Label htmlFor="remember">Remember me</Label>
    </div>
  ),
};
