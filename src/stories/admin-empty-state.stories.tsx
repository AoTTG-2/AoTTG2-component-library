import type { Meta, StoryObj } from "@storybook/react";
import { Button, EmptyState } from "@/index";

const meta = {
  title: "Admin/EmptyState",
  component: EmptyState,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EmptyState title="No users" description="Try another filter or create a user." action={<Button variant="brush">Create User</Button>} />,
};
