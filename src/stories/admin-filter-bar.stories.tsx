import type { Meta, StoryObj } from "@storybook/react";
import { Button, FilterBar, SearchInput, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/index";

const meta = {
  title: "Admin/FilterBar",
  component: FilterBar,
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FilterBar>
      <SearchInput placeholder="Search" />
      <div className="flex gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Export</Button>
      </div>
    </FilterBar>
  ),
};
