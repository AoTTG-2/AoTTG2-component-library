import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, ConfirmDialog } from "@/index";

const meta = {
  title: "Admin/ConfirmDialog",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Suspend User</Button>
        <ConfirmDialog open={open} onOpenChange={setOpen} destructive title="Suspend user?" description="This blocks login until an admin reverses it." confirmLabel="Suspend" onConfirm={() => setOpen(false)} />
      </>
    );
  },
};
