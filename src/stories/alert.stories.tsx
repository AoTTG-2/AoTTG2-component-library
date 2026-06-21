import type { Meta, StoryObj } from "@storybook/react";
import { Bell } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/index";

const meta = {
  title: "Components/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <Bell className="h-4 w-4" />
      <AlertTitle>News</AlertTitle>
      <AlertDescription>Default alert style.</AlertDescription>
    </Alert>
  ),
};
export const Success: Story = {
  render: () => (
    <Alert variant="success" className="max-w-md">
      <AlertTitle>Ready</AlertTitle>
      <AlertDescription>Success alert style.</AlertDescription>
    </Alert>
  ),
};
