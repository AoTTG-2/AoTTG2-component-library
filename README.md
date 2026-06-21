# AoTTG2 Component Library

Reusable React components for AoTTG2.

## Use

```tsx
import "@aottg2/ui/styles.css";
import { Aottg2Theme, Button } from "@aottg2/ui";

export function Example() {
  return <Aottg2Theme><Button variant="brush">Start</Button></Aottg2Theme>;
}
```

Or use the class directly:

```tsx
<div className="aottg2-theme">
  <App />
</div>
```

## Scripts

```bash
npm run build
npm run storybook
npm run build-storybook
```
