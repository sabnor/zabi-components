# Zabi Components

A modern SvelteKit component library with TypeScript and Tailwind CSS support.

## Features

- 🎨 **Modern Design**: Built with Tailwind CSS for consistent, responsive styling
- 🔧 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 📦 **Modular**: Import only what you need with tree-shaking support
- ♿ **Accessible**: Built with accessibility best practices
- 🚀 **Performance**: Optimized for production with minimal bundle size
- 📱 **Responsive**: Mobile-first design approach

## Installation

```bash
npm install zabi-components
```

## Usage

### Import All Components

```typescript
import { Button, Card, Input, Modal } from 'zabi-components';
```

### Import by Category

```typescript
// Atomic components
import { Button, Input, Card } from 'zabi-components/atoms';

// Molecular components  
import { Modal, Alert, Dropdown } from 'zabi-components/molecules';

// Organism components
import { ToastContainer } from 'zabi-components/organisms';
```

### Basic Example

```svelte
<script lang="ts">
  import { Button, Card, Input } from 'zabi-components';
  
  let name = '';
  let showCard = false;
</script>

<Input bind:value={name} placeholder="Enter your name" />
<Button on:click={() => showCard = !showCard}>
  Toggle Card
</Button>

{#if showCard}
  <Card>
    <h2>Hello, {name}!</h2>
  </Card>
{/if}
```

## Component Categories

### Atoms
Basic building blocks of your UI:
- `Badge` - Status indicators and labels
- `Button` - Interactive buttons with variants
- `Card` - Content containers
- `Checkbox` - Form checkboxes
- `ColorPicker` - Color selection input
- `Heading` - Typography headings
- `Input` - Text input fields
- `OptimizedImage` - Performance-optimized images
- `Select` - Dropdown selections
- `Skeleton` - Loading placeholders
- `Textarea` - Multi-line text input
- `TextAlignment` - Text alignment controls
- `Toggle` - Switch controls

### Molecules
Simple combinations of atoms:
- `Alert` - Notification messages
- `Modal` - Overlay dialogs
- `FileUpload` - File upload interface
- `DynamicForm` - Dynamic form builder
- `Dropdown` - Dropdown menus
- `SlideUp` - Slide-up animations

### Organisms
Complex components with state management:
- `ToastContainer` - Notification management system

## TypeScript Support

The library includes comprehensive TypeScript definitions:

```typescript
import type { FieldConfig } from 'zabi-components';

const formConfig: FieldConfig[] = [
  {
    key: 'email',
    type: 'email',
    label: 'Email Address',
    required: true
  }
];
```

## Styling

Components are styled with Tailwind CSS. Make sure to include Tailwind in your project:

```bash
npm install -D tailwindcss
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build:lib

# Run Storybook
npm run storybook
```

## Publishing

To publish your component library:

1. **Update version** in `package.json`
2. **Build the library**: `npm run build:lib`
3. **Test locally**: `npm pack` to create a tarball
4. **Publish**: `npm publish`

## License

MIT