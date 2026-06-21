import type { Meta, StoryObj } from "@storybook/react";
import { ActionMenu, DataTable, StatusBadge, type DataTableColumn } from "@/index";

type Row = { id: string; name: string; email: string; status: "active" | "pending" | "suspended" };

const rows: Row[] = [
  { id: "1", name: "Mikasa", email: "mikasa@aottg2.com", status: "active" },
  { id: "2", name: "Armin", email: "armin@aottg2.com", status: "pending" },
  { id: "3", name: "Eren", email: "eren@aottg2.com", status: "suspended" },
];

const columns: DataTableColumn<Row>[] = [
  { key: "name", header: "Name", cell: (row) => <strong>{row.name}</strong> },
  { key: "email", header: "Email", cell: (row) => row.email },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { key: "actions", header: "", className: "w-12", cell: () => <ActionMenu items={[{ label: "Edit" }, { label: "Suspend", destructive: true }]} /> },
];

const meta = {
  title: "Admin/DataTable",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DataTable columns={columns} data={rows} getRowKey={(row) => row.id} />,
};

export const Empty: Story = {
  render: () => <DataTable columns={columns} data={[]} getRowKey={(row) => row.id} emptyTitle="No users" emptyDescription="Try another filter." />,
};
