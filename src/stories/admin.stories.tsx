import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Download, Users } from "lucide-react";
import {
  ActionMenu,
  Button,
  ConfirmDialog,
  DataTable,
  EmptyState,
  FilterBar,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StatCard,
  StatusBadge,
  Switch,
  Textarea,
  type DataTableColumn,
} from "@/index";

const meta = {
  title: "Admin/Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "suspended";
};

const users: UserRow[] = [
  { id: "1", name: "Mikasa", email: "mikasa@aottg2.com", role: "Admin", status: "active" },
  { id: "2", name: "Armin", email: "armin@aottg2.com", role: "Moderator", status: "pending" },
  { id: "3", name: "Eren", email: "eren@aottg2.com", role: "User", status: "suspended" },
];

const columns: DataTableColumn<UserRow>[] = [
  { key: "name", header: "Name", cell: (row) => <div className="font-medium">{row.name}</div> },
  { key: "email", header: "Email", cell: (row) => row.email },
  { key: "role", header: "Role", cell: (row) => row.role },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { key: "actions", header: "", className: "w-12 text-right", cell: () => <ActionMenu items={[{ label: "Edit" }, { label: "Suspend", destructive: true }]} /> },
];

export const Dashboard: Story = {
  render: () => (
    <div className="mx-auto grid max-w-6xl gap-6">
      <div>
        <h1 className="font-primary text-5xl uppercase text-primary">Admin</h1>
        <p className="text-muted-foreground">Stats, filters, and a boring table.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Users" value="1,248" hint="32 new this week" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Downloads" value="42k" hint="8% up" icon={<Download className="h-4 w-4" />} />
        <StatCard label="Reports" value="7" hint="Needs review" />
      </div>
      <FilterBar>
        <SearchInput placeholder="Search users" />
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="mod">Moderator</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </FilterBar>
      <DataTable columns={columns} data={users} getRowKey={(row) => row.id} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => <EmptyState title="No users" description="Try a different filter or create a user." action={<Button variant="brush">Create User</Button>} />,
};

export const Confirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Suspend User</Button>
        <ConfirmDialog open={open} onOpenChange={setOpen} destructive title="Suspend user?" description="This blocks login until an admin reverses it." confirmLabel="Suspend" onConfirm={() => setOpen(false)} />
      </>
    );
  },
};

export const FormBits: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      <label className="flex items-center justify-between rounded-none border bg-card p-4 text-sm font-medium">
        Maintenance mode
        <Switch />
      </label>
      <Textarea placeholder="Admin notes" />
    </div>
  ),
};
