# AoTTG2 Component Library

Reusable React components for AoTTG2.

## Use

```tsx
import "@aottg2/ui/styles.css";
import { Aottg2Theme, Button } from "@aottg2/ui";

export function Example() {
  return <Aottg2Theme theme="light" palette="website"><Button variant="brush">Start</Button></Aottg2Theme>;
}
```

Or use the class directly:

```tsx
<div className="aottg2-theme dark aottg2-palette-workshop" data-palette="workshop">
  <App />
</div>
```

## Storybook themes

Use the Storybook toolbar to switch any story between `Light`, `Dark`, and `Light + Dark` side-by-side.
Use the Palette toolbar to switch between `Website` and `Workshop` palettes.

## Scripts

```bash
npm run build
npm run storybook
npm run build-storybook
```
