import type { Meta, StoryObj } from "@storybook/react";
import { CommentSection, type CommentItem } from "@/index";

const comments: CommentItem[] = [
  {
    id: "1",
    author: { name: "Mikasa", fallback: "MI" },
    createdAt: "2h ago",
    body: "This looks clean. The left rail makes replies easy to scan without turning the whole thing into a tree maze.",
    actions: [{ label: "Reply" }, { label: "Copy link" }, { label: "Report", destructive: true }],
    replies: [
      {
        id: "1-1",
        author: { name: "Armin", fallback: "AR" },
        createdAt: "1h ago",
        body: "Agreed. One reply level keeps the mobile layout readable.",
        actions: [{ label: "Reply" }, { label: "Copy link" }],
        replies: [
          {
            id: "1-1-1",
            author: { name: "Nested user", fallback: "NU" },
            createdAt: "now",
            body: "This nested reply should not render.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    author: { name: "Levi", fallback: "LV" },
    createdAt: "45m ago",
    editedAt: "30m ago",
    body: "Compact, square, and readable. Good enough.",
    actions: [{ label: "Edit" }, { label: "Delete", destructive: true }],
  },
  {
    id: "3",
    author: { name: "Deleted", fallback: "--" },
    deleted: true,
    actions: [{ label: "Copy link" }],
  },
];

const meta = {
  title: "Components/CommentSection",
  component: CommentSection,
  args: { comments },
} satisfies Meta<typeof CommentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    comments: [],
    empty: "No field reports yet.",
  },
};

export const CustomRendering: Story = {
  args: {
    comments,
    renderMeta: (comment) => (
      <>
        <span className="font-primary text-sm uppercase text-primary">{comment.author?.name ?? "Unknown"}</span>
        {comment.createdAt ? <span className="text-muted-foreground">{comment.createdAt}</span> : null}
      </>
    ),
    renderBody: (comment) => <p>{comment.body}</p>,
  },
};
