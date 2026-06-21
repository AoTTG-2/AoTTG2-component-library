import type { Meta, StoryObj } from "@storybook/react";
import { Home, Settings, Shield, User } from "lucide-react";
import { Sidebar, SidebarFooter, SidebarGroup, SidebarHeader, SidebarItem, SidebarSection, SidebarToggle } from "@/index";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Nav = () => (
  <>
    <SidebarHeader>
      <span className="truncate">AoTTG2</span>
      <div className="ml-auto"><SidebarToggle /></div>
    </SidebarHeader>
    <SidebarSection title="Main">
      <SidebarItem icon={<Home className="h-4 w-4" />} active>Dashboard</SidebarItem>
      <SidebarGroup icon={<Settings className="h-4 w-4" />} title="Settings">
        <SidebarItem icon={<User className="h-4 w-4" />}>Profile</SidebarItem>
        <SidebarItem icon={<Shield className="h-4 w-4" />}>Security</SidebarItem>
      </SidebarGroup>
    </SidebarSection>
    <SidebarFooter>
      <SidebarItem icon={<User className="h-4 w-4" />}>Account</SidebarItem>
    </SidebarFooter>
  </>
);

export const Expanded: Story = {
  render: () => <div className="h-96"><Sidebar><Nav /></Sidebar></div>,
};

export const Collapsed: Story = {
  render: () => <div className="h-96"><Sidebar defaultCollapsed><Nav /></Sidebar></div>,
};
