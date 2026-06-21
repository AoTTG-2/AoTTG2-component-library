import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "@/index";

const meta = {
  title: "Admin/SearchInput",
  component: SearchInput,
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("titan");
    return <SearchInput value={value} onChange={(event) => setValue(event.target.value)} onClear={() => setValue("")} placeholder="Search users" />;
  },
};
