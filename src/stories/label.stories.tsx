import type { Meta, StoryObj } from "@storybook/react";
import { Input, Label } from "@/index";

const meta = {
  title: "Components/Label",
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Captain Levi" />
    </div>
  ),
};
