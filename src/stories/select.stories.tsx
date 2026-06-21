import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/index";

const meta = {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-44"><SelectValue placeholder="Server" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="na">NA</SelectItem>
        <SelectItem value="eu">EU</SelectItem>
      </SelectContent>
    </Select>
  ),
};
