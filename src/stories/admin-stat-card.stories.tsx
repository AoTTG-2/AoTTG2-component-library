import type { Meta, StoryObj } from "@storybook/react";
import { Download, Users } from "lucide-react";
import { StatCard } from "@/index";

const meta = {
  title: "Admin/StatCard",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Users" value="1,248" hint="32 new this week" icon={<Users className="h-4 w-4" />} />
      <StatCard label="Downloads" value="42k" hint="8% up" icon={<Download className="h-4 w-4" />} />
      <StatCard label="Reports" value="7" hint="Needs review" />
    </div>
  ),
};
