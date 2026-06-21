import type { Meta, StoryObj } from "@storybook/react";
import { ActionMenu } from "@/index";

const meta = {
  title: "Admin/ActionMenu",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ActionMenu items={[{ label: "Edit" }, { label: "View logs" }, { label: "Delete", destructive: true }]} />,
};
