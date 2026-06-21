import type { Meta, StoryObj } from "@storybook/react";
import { Aottg2LogoLight, Aottg2NavbarLogo, Navbar } from "@/index";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WebsiteLike: Story = {
  render: () => (
    <div className="min-h-64 bg-neutral-950 pt-8">
      <Navbar />
    </div>
  ),
};

export const ActiveItem: Story = {
  render: () => (
    <div className="min-h-64 bg-neutral-950 pt-8">
      <Navbar items={[
        { label: "DEVBLOG", id: "devblog" },
        { label: "COMMUNITY", id: "community", active: true },
        { label: "SUPPORT", id: "support" },
        { label: "CREDITS", href: "/credits" },
        { label: "PLAY", id: "home" },
      ]} />
    </div>
  ),
};

export const LogoVariants: Story = {
  render: () => (
    <div className="grid gap-6">
      <Navbar logo="navbar" />
      <Navbar logo="text" logoText="workshop" />
      <div className="grid grid-cols-2 items-center gap-4 rounded-none border bg-card p-4">
        <div className="flex h-28 w-full items-center justify-center">
          <img src={Aottg2NavbarLogo} alt="AoTTG 2 light-mode navbar logo" className="h-20 w-80 object-contain" />
        </div>
        <div className="flex h-28 w-full items-center justify-center bg-neutral-950 p-3">
          <img src={Aottg2LogoLight} alt="AoTTG 2 dark-mode navbar logo" className="h-20 w-80 object-contain" />
        </div>
      </div>
    </div>
  ),
};

export const TextLogo: Story = {
  render: () => (
    <div className="grid gap-6">
      <Navbar logo="text" logoText="workshop" />
      <Navbar logo="text" logoText="admin" />
    </div>
  ),
};
