import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CommentBox } from "@/index";

const meta = {
  title: "Components/CommentBox",
  component: CommentBox,
  args: {
    value: "Try **bold**, *italic*, ~~strike~~, `code`, and [links](https://aottg2.com).",
    onChange: () => undefined,
    preview: true,
  },
} satisfies Meta<typeof CommentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <CommentBox {...args} value={value} onChange={setValue} onSubmit={() => setValue("")} onCancel={() => setValue("")} />;
  },
};

export const NoPreview: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState("");
    return <CommentBox {...args} value={value} onChange={setValue} preview={false} placeholder="Fast reply..." />;
  },
};

export const CustomLabels: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <CommentBox {...args} value={value} onChange={setValue} submitLabel="Post report" cancelLabel="Discard" onCancel={() => setValue("")} />;
  },
};
