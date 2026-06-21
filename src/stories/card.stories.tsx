import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/index";

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>AoTTG2 account card.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="scout@aottg2.com" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="brush" size="lg">Continue</Button>
      </CardFooter>
    </Card>
  ),
};
