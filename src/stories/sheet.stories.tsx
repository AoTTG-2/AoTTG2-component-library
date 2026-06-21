import type { Meta, StoryObj } from "@storybook/react";
import { Button, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/index";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet</SheetTitle>
          <SheetDescription>Side panel.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
