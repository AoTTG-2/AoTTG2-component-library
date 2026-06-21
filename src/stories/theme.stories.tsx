import type { Meta, StoryObj } from "@storybook/react";
import { Aottg2Theme, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, StatCard } from "@/index";

const meta = {
  title: "Theme/Palettes",
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
          <CardDescription>Website keeps red primary. Workshop swaps primary to cyan and keeps purple secondary.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
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

export const WebsiteLight: Story = {
  render: () => <Aottg2Theme theme="light" palette="website" className="min-h-screen bg-background p-8 text-foreground"><Sample /></Aottg2Theme>,
};

export const WebsiteDark: Story = {
  render: () => <Aottg2Theme theme="dark" palette="website" className="min-h-screen bg-background p-8 text-foreground"><Sample /></Aottg2Theme>,
};

export const WorkshopLight: Story = {
  render: () => <Aottg2Theme theme="light" palette="workshop" className="min-h-screen bg-background p-8 text-foreground"><Sample /></Aottg2Theme>,
};

export const WorkshopDark: Story = {
  render: () => <Aottg2Theme theme="dark" palette="workshop" className="min-h-screen bg-background p-8 text-foreground"><Sample /></Aottg2Theme>,
};

export const PaletteComparison: Story = {
  render: () => (
    <div className="grid min-h-screen md:grid-cols-2">
      <Aottg2Theme theme="light" palette="website" className="bg-background p-8 text-foreground">
        <div className="mb-4 font-primary text-3xl uppercase text-primary">Website</div>
        <Sample />
      </Aottg2Theme>
      <Aottg2Theme theme="light" palette="workshop" className="bg-background p-8 text-foreground">
        <div className="mb-4 font-primary text-3xl uppercase text-primary">Workshop</div>
        <Sample />
      </Aottg2Theme>
    </div>
  ),
};
