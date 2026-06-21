import type { Meta, StoryObj } from "@storybook/react";
import { Input, Label } from "@/index";

const meta = {
  title: "Components/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Input className="max-w-sm" placeholder="scout@aottg2.com" />,
};
export const WithLabel: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="scout@aottg2.com" />
    </div>
  ),
};
