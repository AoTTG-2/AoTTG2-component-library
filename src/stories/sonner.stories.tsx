import type { Meta, StoryObj } from "@storybook/react";
import { Button, Toaster, toast } from "@/index";

const meta = {
  title: "Components/Sonner",
  component: Toaster,
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Toaster />
      <Button onClick={() => toast("Scout report", { description: "Default textured toast." })}>Default</Button>
      <Button onClick={() => toast.success("Success", { description: "Saved changes." })}>Success</Button>
      <Button onClick={() => toast.error("Error", { description: "Something broke." })}>Error</Button>
      <Button onClick={() => toast.warning("Warning", { description: "Check this before continuing." })}>Warning</Button>
      <Button onClick={() => toast.info("Info", { description: "Useful field intel." })}>Info</Button>
    </div>
  ),
};
