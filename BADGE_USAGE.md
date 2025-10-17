# Badge Component Usage

The Badge component is available for both Svelte and React projects.

## Svelte Usage

### Installation
```bash
npm install zabi-components
```

### Import and Use
```svelte
<script lang="ts">
  import { Badge } from 'zabi-components/atoms';
</script>

<!-- Default badge -->
<Badge>Default</Badge>

<!-- Success badge -->
<Badge variant="success">Success</Badge>

<!-- Warning badge -->
<Badge variant="warning">Warning</Badge>

<!-- Error badge -->
<Badge variant="error">Error</Badge>

<!-- Info badge -->
<Badge variant="info">Info</Badge>

<!-- With custom class -->
<Badge variant="success" className="ml-2">Custom</Badge>
```

## React Usage

### Installation
```bash
npm install zabi-components react
```

### Import and Use
```tsx
import React from 'react';
import { Badge } from 'zabi-components/react';

function App() {
  return (
    <div>
      {/* Default badge */}
      <Badge>Default</Badge>
      
      {/* Success badge */}
      <Badge variant="success">Success</Badge>
      
      {/* Warning badge */}
      <Badge variant="warning">Warning</Badge>
      
      {/* Error badge */}
      <Badge variant="error">Error</Badge>
      
      {/* Info badge */}
      <Badge variant="info">Info</Badge>
      
      {/* With custom class */}
      <Badge variant="success" className="ml-2">Custom</Badge>
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Visual variant of the badge |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `React.ReactNode` (React) / `slot` (Svelte) | - | Content to display inside the badge |

## Styling

The Badge component uses Tailwind CSS classes. Make sure to include Tailwind CSS in your project:

```bash
npm install tailwindcss
```

And include the component styles:
```css
@import 'zabi-components/dist/zabi-components.css';
```

## SSR Compatibility

Both Svelte and React versions are fully SSR-safe and can be used in server-side rendering environments.
