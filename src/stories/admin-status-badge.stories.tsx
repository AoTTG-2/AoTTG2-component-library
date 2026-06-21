import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "@/index";

const meta = {
  title: "Admin/StatusBadge",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="active" />
      <StatusBadge status="pending" />
      <StatusBadge status="suspended" />
      <StatusBadge status="draft" />
    </div>
  ),
};
