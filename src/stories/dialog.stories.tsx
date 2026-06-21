import type { Meta, StoryObj } from "@storybook/react";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/index";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>Radix dialog with AoTTG2 styling.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};
