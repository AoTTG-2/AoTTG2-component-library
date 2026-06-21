import type { Meta, StoryObj } from "@storybook/react";
import { Aottg2Theme, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, StatCard } from "@/index";

const meta = {
  title: "Theme/LightDark",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Sample() {
  return (
    <div className="grid gap-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Theme Check</CardTitle>
          <CardDescription>Same components, different CSS variables.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Badge>Badge</Badge>
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme-email">Email</Label>
            <Input id="theme-email" placeholder="scout@aottg2.com" />
          </div>
        </CardContent>
      </Card>
      <StatCard label="Reports" value="7" hint="Needs review" />
    </div>
  );
}

export const Light: Story = {
  render: () => <Aottg2Theme theme="light" className="min-h-screen bg-background p-8 text-foreground"><Sample /></Aottg2Theme>,
};

export const Dark: Story = {
  render: () => <Aottg2Theme theme="dark" className="min-h-screen bg-background p-8 text-foreground"><Sample /></Aottg2Theme>,
};

export const SideBySide: Story = {
  render: () => (
    <div className="grid min-h-screen md:grid-cols-2">
      <Aottg2Theme theme="light" className="bg-background p-8 text-foreground"><Sample /></Aottg2Theme>
      <Aottg2Theme theme="dark" className="bg-background p-8 text-foreground"><Sample /></Aottg2Theme>
    </div>
  ),
};
