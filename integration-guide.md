# AoTTG2 UI integration guide

This repo is the package. Consumers install it straight from GitHub.

## Install

Use a tag when possible:

```bash
npm install github:AoTTG-2/AoTTG2-component-library#v0.1.0
```

For latest `main`:

```bash
npm install github:AoTTG-2/AoTTG2-component-library
```

The installed package name is still `@aottg2/ui` because that is the `name` in `package.json`.

## Peer requirements

Consumer apps must have React:

```bash
npm install react react-dom
```

Everything else needed by the library is installed with the Git dependency.

## Vite React setup

Import the compiled stylesheet once, usually in `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@aottg2/ui/styles.css";
import { Aottg2Theme } from "@aottg2/ui";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Aottg2Theme theme="light" palette="website" global>
      <App />
    </Aottg2Theme>
  </React.StrictMode>,
);
```

Use components anywhere:

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@aottg2/ui";

export function Example() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Loadout</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Save</Button>
      </CardContent>
    </Card>
  );
}
```

## Themes and palettes

Use the wrapper:

```tsx
<Aottg2Theme theme="dark" palette="workshop" global>
  <App />
</Aottg2Theme>
```

Options:

```ts
theme: "light" | "dark"
palette: "website" | "workshop"
```

`global` writes theme attributes to `document.documentElement`, which also lets portals like dialogs, selects, dropdowns, tooltips, and toasts inherit the right theme.

## Toasts / Sonner

Mount one `Toaster` near the app root:

```tsx
import { Aottg2Theme, Toaster } from "@aottg2/ui";

export function Root() {
  return (
    <Aottg2Theme theme="dark" palette="website" global>
      <App />
      <Toaster />
    </Aottg2Theme>
  );
}
```

Trigger toasts from components:

```tsx
import { toast } from "@aottg2/ui";

toast.success("Saved", { description: "Your changes are live." });
toast.error("Failed", { description: "Try again." });
toast.warning("Check this", { description: "This action has side effects." });
toast.info("Heads up", { description: "New intel available." });
```

## Sidebar, loaders, and forms

```tsx
import { Home, Settings } from "lucide-react";
import { Input, Sidebar, SidebarGroup, SidebarHeader, SidebarItem, SidebarSection, SidebarToggle, Skeleton, Spinner } from "@aottg2/ui";

export function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar defaultCollapsed={false}>
        <SidebarHeader>
          AoTTG2
          <div className="ml-auto"><SidebarToggle /></div>
        </SidebarHeader>
        <SidebarSection title="Main">
          <SidebarItem icon={<Home className="h-4 w-4" />} active>Dashboard</SidebarItem>
          <SidebarGroup icon={<Settings className="h-4 w-4" />} title="Settings">
            <SidebarItem>Profile</SidebarItem>
          </SidebarGroup>
        </SidebarSection>
      </Sidebar>

      <main className="flex-1 p-6">
        <Input placeholder="Search" />
        <Spinner label="Loading" />
        <Skeleton lines={3} />
      </main>
    </div>
  );
}
```

## Local development in a consumer app

Fastest local test without publishing:

```bash
# in this component library repo
npm install
npm run build
npm pack

# in the consumer app
npm install ../AoTTG2-complib/aottg2-ui-0.1.0.tgz
```

For GitHub installs, make a version tag:

```bash
git tag v0.1.0
git push origin main --tags
```

Then consumers install that tag:

```bash
npm install github:AoTTG-2/AoTTG2-component-library#v0.1.0
```

## Common gotchas

- Import `@aottg2/ui/styles.css` exactly once.
- Wrap the app in `Aottg2Theme`; use `global` if you use portals/toasts.
- Do not import from `dist` directly. Import from `@aottg2/ui`.
- For stable builds, install a tag instead of `main`.
- If Vite caches an old Git dependency, delete `node_modules` and lockfile entry, then reinstall.

## Maintainer checklist

Before tagging a release:

```bash
npm run build
npm run build-storybook
npm pack --dry-run
```

Commit first, then tag:

```bash
git commit -am "Release v0.1.0"
git tag v0.1.0
git push origin main --tags
```
