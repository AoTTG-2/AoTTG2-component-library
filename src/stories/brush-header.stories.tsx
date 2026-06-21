import type { Meta, StoryObj } from "@storybook/react";
import { BrushHeader, Button, Card, CardContent, CardHeader } from "@/index";

const meta = {
  title: "Components/BrushHeader",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LatestNews: Story = {
  render: () => <BrushHeader title="Latest News" description="Card-section header matching the AoTTG2 landing page brush overlap." />,
};

export const CardHeaderExample: Story = {
  render: () => (
    <Card className="max-w-xl overflow-hidden">
      <CardHeader>
        <BrushHeader title="Join Community" />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Use this as a stronger card header for news, admin sections, and future workshop panels.</p>
        <Button variant="brush" size="lg">Join Discord</Button>
      </CardContent>
    </Card>
  ),
};

export const PrimaryBrush: Story = {
  render: () => <BrushHeader title="Admin Tools" brush="primary" />,
};
