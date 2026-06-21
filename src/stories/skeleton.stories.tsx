import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/index";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      <Skeleton variant="text" />
      <Skeleton lines={3} />
      <div className="flex items-center gap-3">
        <Skeleton variant="avatar" />
        <div className="flex-1"><Skeleton lines={2} /></div>
      </div>
      <Skeleton variant="card" />
    </div>
  ),
};
