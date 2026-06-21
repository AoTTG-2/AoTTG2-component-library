import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback } from "@/index";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AG</AvatarFallback>
    </Avatar>
  ),
};
