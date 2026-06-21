import type { Meta, StoryObj } from "@storybook/react";
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/index";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
        <TooltipContent>Useful hint.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
