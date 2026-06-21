import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/index";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
export const Brush: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="brush" size="lg">Brush</Button>
      <Button variant="brushSecondary" size="lg">Brush Secondary</Button>
      <Button variant="brushGoogle" size="lg">Brush Google</Button>
    </div>
  ),
};
