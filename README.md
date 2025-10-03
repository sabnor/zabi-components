# Zabi Components

A comprehensive Svelte component library built with TypeScript and Tailwind CSS, designed for easy integration across multiple Svelte projects.

## Features

- 🎨 **Consistent Design System** - Standardized props, events, and styling across all components
- 🎯 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🎨 **Tailwind CSS Integration** - Built with Tailwind CSS and CSS custom properties for easy theming
- ♿ **Accessibility First** - ARIA compliant components with keyboard navigation support
- 📱 **Responsive Design** - Mobile-first approach with responsive utilities
- 🎭 **Dark Mode Support** - Built-in dark mode support with CSS custom properties
- 🧩 **Slot Support** - Flexible slot system for custom content
- 📦 **Tree Shakeable** - Import only what you need
- ✅ **Production Ready** - Fully tested and optimized for production use

## Installation

```bash
npm install zabi-components
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install svelte@^4.0.0 || ^5.0.0
npm install @sveltejs/kit@^2.0.0  # Optional, for SvelteKit projects
```

## Import Methods

Zabi Components supports multiple import patterns:

### Main Import (All Components)
```typescript
import { Button, Input, Card, Alert, Badge, Modal } from 'zabi-components';
```

### Subpath Imports (Recommended for Tree Shaking)
```typescript
// Import from specific categories
import { Button, Input, Badge } from 'zabi-components/atoms';
import { Alert, Modal, Dropdown } from 'zabi-components/molecules';
import { Navbar, ToastManager } from 'zabi-components/organisms';

// Import types separately
import type { ButtonEvents, InputEvents } from 'zabi-components/types';
```

## Quick Start

```svelte
<script lang="ts">
  import { Button, Input, Card, Alert } from 'zabi-components';
  
  let name = '';
  let showAlert = false;
  
  function handleSubmit(event: CustomEvent) {
    console.log('Form submitted!', event.detail.value);
    showAlert = true;
  }
  
  function handleInput(event: CustomEvent) {
    console.log('Input changed:', event.detail.value);
  }
  
  function handleClose() {
    showAlert = false;
  }
</script>

<Card>
  <div slot="header">
    <h2>User Form</h2>
  </div>
  
  <Input 
    bind:value={name} 
    label="Name" 
    placeholder="Enter your name"
    on:input={handleInput}
  />
  
  <Button on:click={handleSubmit}>
    Submit
  </Button>
  
  <div slot="footer">
    {#if showAlert}
      <Alert variant="success" closable on:close={handleClose}>
        Form submitted successfully!
      </Alert>
    {/if}
  </div>
</Card>
```

## Component API

### Button Component

```svelte
<Button
  variant="primary" | "secondary" | "danger" | "success" | "warning" | "info"
  size="sm" | "md" | "lg"
  disabled={boolean}
  loading={boolean}
  type="button" | "submit" | "reset"
  className={string}
  on:click={(e) => console.log(e.detail.value, e.detail.event)}
>
  Button Content
</Button>
```

**Props:**
- `variant`: Button style variant (default: "primary")
- `size`: Button size (default: "md")
- `disabled`: Disable the button (default: false)
- `loading`: Show loading state (default: false)
- `type`: HTML button type (default: "button")
- `className`: Additional CSS classes

**Events:**
- `click`: Fired when button is clicked - `{ detail: { value: true, event: MouseEvent } }`

### Input Component

```svelte
<Input
  bind:value={string}
  type={string}
  label={string}
  placeholder={string}
  required={boolean}
  disabled={boolean}
  size="sm" | "md" | "lg"
  variant="default" | "error" | "success"
  error={string}
  success={string}
  helpText={string}
  className={string}
  id={string}
  on:input={(e) => console.log(e.detail.value, e.detail.event)}
  on:change={(e) => console.log(e.detail.value, e.detail.event)}
/>
```

**Props:**
- `value`: Input value (bindable)
- `type`: Input type (default: "text")
- `label`: Input label
- `placeholder`: Input placeholder
- `required`: Mark as required (default: false)
- `disabled`: Disable the input (default: false)
- `size`: Input size (default: "md")
- `variant`: Input variant (default: "default")
- `error`: Error message
- `success`: Success message
- `helpText`: Helper text
- `className`: Additional CSS classes
- `id`: Input ID

**Events:**
- `input`: Fired on input - `{ detail: { value: string, event: InputEvent } }`
- `change`: Fired on change - `{ detail: { value: string, event: Event } }`

### Card Component

```svelte
<Card
  variant="default" | "elevated" | "outlined"
  density="comfortable" | "compact"
  disabled={boolean}
  loading={boolean}
  className={string}
  on:click={(e) => console.log(e.detail.value, e.detail.event)}
>
  <div slot="header">Header Content</div>
  Main Content
  <div slot="footer">Footer Content</div>
</Card>
```

**Props:**
- `variant`: Card style variant (default: "default")
- `density`: Card density (default: "comfortable")
- `disabled`: Disable interactions (default: false)
- `loading`: Show loading state (default: false)
- `className`: Additional CSS classes

**Slots:**
- `header`: Card header content
- `default`: Main card content
- `footer`: Card footer content

**Events:**
- `click`: Fired when card is clicked - `{ detail: { value: true, event: MouseEvent } }`

### Alert Component

```svelte
<Alert
  variant="info" | "success" | "warning" | "error"
  title={string}
  message={string}
  closable={boolean}
  className={string}
  on:close={(e) => console.log(e.detail.value, e.detail.event)}
>
  Custom Alert Content
</Alert>
```

**Props:**
- `variant`: Alert type (default: "info")
- `title`: Alert title
- `message`: Alert message
- `closable`: Show close button (default: false)
- `className`: Additional CSS classes

**Slots:**
- `default`: Custom alert content (overrides message prop)

**Events:**
- `close`: Fired when alert is closed - `{ detail: { value: true, event: Event } }`

## Theming

Zabi Components uses CSS custom properties for easy theming. You can customize the appearance by overriding these variables:

```css
:root {
  /* Primary Colors */
  --zabi-primary: theme('colors.blue.600');
  --zabi-primary-hover: theme('colors.blue.700');
  --zabi-primary-active: theme('colors.blue.800');
  
  /* Secondary Colors */
  --zabi-secondary: theme('colors.gray.600');
  --zabi-secondary-hover: theme('colors.gray.700');
  
  /* Success Colors */
  --zabi-success: theme('colors.green.600');
  --zabi-success-hover: theme('colors.green.700');
  
  /* Warning Colors */
  --zabi-warning: theme('colors.yellow.600');
  --zabi-warning-hover: theme('colors.yellow.700');
  
  /* Error Colors */
  --zabi-error: theme('colors.red.600');
  --zabi-error-hover: theme('colors.red.700');
  
  /* Info Colors */
  --zabi-info: theme('colors.blue.600');
  --zabi-info-hover: theme('colors.blue.700');
  
  /* Surface Colors */
  --zabi-surface: theme('colors.white');
  --zabi-surface-hover: theme('colors.gray.50');
  
  /* Border Colors */
  --zabi-border: theme('colors.gray.300');
  --zabi-border-hover: theme('colors.gray.400');
  --zabi-border-focus: theme('colors.blue.500');
  
  /* Text Colors */
  --zabi-text: theme('colors.gray.900');
  --zabi-text-muted: theme('colors.gray.600');
  --zabi-text-placeholder: theme('colors.gray.400');
  --zabi-text-inverse: theme('colors.white');
}
```

### Dark Mode

Dark mode is automatically supported through CSS custom properties:

```css
.dark {
  --zabi-surface: theme('colors.gray.900');
  --zabi-surface-hover: theme('colors.gray.800');
  --zabi-text: theme('colors.gray.100');
  --zabi-text-muted: theme('colors.gray.400');
  --zabi-border: theme('colors.gray.700');
}
```

## Event Structure

All components follow a consistent event structure:

```typescript
interface BaseEventDetail<T = any> {
  value: T;
  event?: Event;
}
```

**Examples:**
- Button click: `{ detail: { value: true, event: MouseEvent } }`
- Input change: `{ detail: { value: string, event: Event } }`
- Checkbox change: `{ detail: { value: boolean, event: Event } }`

## TypeScript Support

Full TypeScript definitions are included with proper event typing:

```typescript
import type { ButtonEvents, InputEvents, CardEvents, AlertEvents } from 'zabi-components';

// Event handlers with proper typing
function handleButtonClick(event: CustomEvent<{ value: boolean; event?: MouseEvent }>) {
  console.log('Button clicked:', event.detail.value);
}

function handleInputChange(event: CustomEvent<{ value: string; event?: InputEvent }>) {
  console.log('Input changed:', event.detail.value);
}
```

### Event Types

All components use standardized event types:

```typescript
// Base event structure
interface BaseEventDetail<T = any> {
  value: T;
  event?: Event;
}

// Specific event types
interface ClickEventDetail extends BaseEventDetail<boolean> {
  event?: MouseEvent | KeyboardEvent;
}

interface InputEventDetail extends BaseEventDetail<string> {
  event?: InputEvent;
}

interface ChangeEventDetail extends BaseEventDetail<string> {
  event?: Event;
}
```

### Component Event Interfaces

```typescript
interface ButtonEvents {
  click: ClickEventDetail;
}

interface InputEvents {
  input: InputEventDetail;
  change: ChangeEventDetail;
  focus: { event: FocusEvent };
  blur: { event: FocusEvent };
  keydown: { event: KeyboardEvent };
  keyup: { event: KeyboardEvent };
  clear: { event: Event };
}
```

## Advanced Usage

### Custom Styling

```svelte
<Button 
  variant="primary" 
  size="lg" 
  className="w-full shadow-lg hover:shadow-xl"
  on:click={(e) => console.log('Clicked!', e.detail.value)}
>
  Custom Button
</Button>
```

### Form Integration

```svelte
<script lang="ts">
  import { Button, Input, Card, Alert } from 'zabi-components';
  
  interface FormData {
    name: string;
    email: string;
    message: string;
  }
  
  interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
  }
  
  let formData: FormData = {
    name: '',
    email: '',
    message: ''
  };
  
  let errors: FormErrors = {};
  let showSuccess = false;
  
  function validateForm(): boolean {
    errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    return Object.keys(errors).length === 0;
  }
  
  function handleSubmit(event: CustomEvent) {
    if (validateForm()) {
      showSuccess = true;
      // Submit form
      console.log('Form submitted:', formData);
    }
  }
</script>

<Card>
  <div slot="header">
    <h2>Contact Form</h2>
  </div>
  
  <form on:submit|preventDefault={handleSubmit}>
    <Input
      bind:value={formData.name}
      label="Name"
      placeholder="Enter your name"
      required
      error={errors.name}
    />
    
    <Input
      bind:value={formData.email}
      type="email"
      label="Email"
      placeholder="Enter your email"
      required
      error={errors.email}
    />
    
    <Input
      bind:value={formData.message}
      label="Message"
      placeholder="Enter your message"
      helpText="Tell us what you think"
    />
    
    <Button type="submit" variant="primary">
      Send Message
    </Button>
  </form>
  
  <div slot="footer">
    <Alert variant="success" closable bind:show={showSuccess}>
      Message sent successfully!
    </Alert>
  </div>
</Card>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.5 (Latest)

#### 🐛 Bug Fixes
- **Fixed Package Exports**: Resolved "Package subpath './atoms' is not defined" errors
- **Fixed Runtime Errors**: Eliminated null reference errors that caused application crashes
- **Fixed TypeScript Types**: Properly typed event handlers and component props
- **Fixed Slot Definitions**: Ensured slots work correctly with proper typing
- **Fixed Main Export**: Ensured zabi-components main import works correctly

#### ✨ Improvements
- Enhanced TypeScript support with comprehensive event type definitions
- Improved build configuration for better tree shaking
- Added proper type generation for all component categories
- Standardized event structure across all components

#### 📦 Package Structure
- Added support for subpath imports (`zabi-components/atoms`, `zabi-components/molecules`, etc.)
- Improved type definitions with proper event interfaces
- Enhanced build output with proper ES module exports

## Troubleshooting

### Common Issues

#### Import Errors
If you encounter import errors like "Package subpath './atoms' is not defined", make sure you're using the latest version:

```bash
npm install zabi-components@latest
```

#### TypeScript Event Handler Errors
If you see TypeScript errors with event handlers, make sure to use proper typing:

```typescript
// ✅ Correct
function handleClick(event: CustomEvent) {
  console.log(event.detail.value);
}

// ❌ Incorrect - missing event parameter
function handleClick() {
  console.log('clicked');
}
```

#### Runtime Errors
If you encounter runtime errors, ensure you have the correct peer dependencies:

```bash
npm install svelte@^5.0.0 @sveltejs/kit@^2.0.0
```

### Migration from Previous Versions

If you're upgrading from a previous version, note these changes:

1. **Event Structure**: All events now follow the standardized `{ detail: { value, event? } }` structure
2. **Import Paths**: Subpath imports are now fully supported (`zabi-components/atoms`, etc.)
3. **TypeScript**: Enhanced type definitions with proper event typing

## Support

For support, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ using Svelte, TypeScript, and Tailwind CSS.