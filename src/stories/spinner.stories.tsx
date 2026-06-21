import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@/index";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner size="sm" variant="muted" label="Small" />
      <Spinner variant="primary" label="Loading" />
      <Spinner size="lg" variant="destructive" label="Retrying" />
    </div>
  ),
};
