# Zabi Components

A clean, minimal Svelte component library built with TypeScript and Tailwind CSS. **Less is more** - focused on essential components that just work.

## Philosophy

**Clean & Simple**: No unnecessary complexity, just clean components that focus on what matters most. Every component is designed to be intuitive, accessible, and performant.

## Features

- 🎯 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🎨 **Tailwind CSS Integration** - Built with Tailwind CSS for consistent styling
- ♿ **Accessibility First** - ARIA compliant components with keyboard navigation support
- 📱 **Responsive Design** - Mobile-first approach with responsive utilities
- 🎭 **Dark Mode Support** - Built-in dark mode support with CSS custom properties
- 🧩 **Clean API** - Simple, intuitive component APIs
- 📦 **Tree Shakeable** - Import only what you need
- ✅ **Production Ready** - Fully tested and optimized for production use
- 🚀 **Modern CSS** - Uses modern CSS features like Container Queries and CSS Grid

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
  // Clean Components - Less is More
  import { Card, Form, Layout, Navigation, Button, Input } from 'zabi-components';
  
  let formData = {
    name: '',
    email: '',
  };
  
  function handleFormSubmit(event: CustomEvent) {
    console.log('Form submitted:', event.detail.data);
  }
  
  function handleCardClick(event: CustomEvent) {
    console.log('Card clicked:', event.detail);
  }
  
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
</script>

<Layout variant="main" className="min-h-screen bg-gray-50">
  <div slot="header" class="flex items-center justify-between p-4 bg-white border-b">
    <h1 class="text-xl font-bold">My App</h1>
    <Navigation variant="header" items={navItems} />
  </div>

  <main class="container mx-auto p-6">
    <Card title="Welcome" description="Clean components that just work" interactive on:click={handleCardClick} />
    
    <Form on:submit={handleFormSubmit}>
      <div class="form-field">
        <label for="name" class="form-label">Name</label>
        <Input id="name" name="name" bind:value={formData.name} placeholder="Enter your name" />
      </div>
      
      <div class="form-field">
        <label for="email" class="form-label">Email</label>
        <Input id="email" name="email" type="email" bind:value={formData.email} placeholder="Enter your email" />
      </div>
      
      <div class="form-actions">
        <Button type="submit" variant="primary" className="flex-1">Submit</Button>
      </div>
    </Form>
  </main>
</Layout>
```

## Component Overview

### Core Components (Clean & Simple)

| Component | Category | Description | Key Features |
|-----------|----------|-------------|--------------|
| **Card** | Atom | Clean card container | Interactive, elevated variants, semantic HTML |
| **Form** | Molecule | Simple form wrapper | FormData handling, validation support |
| **Layout** | Molecule | Page layout system | Header, main, footer slots, responsive |
| **Navigation** | Organism | Clean navigation | Header/sidebar variants, keyboard nav |
| **Button** | Atom | Action button | Multiple variants, loading states |
| **Input** | Atom | Form input | Validation, error states, accessibility |
| **Badge** | Atom | Status indicator | Color variants, closable |
| **Alert** | Molecule | Notification | Dismissible, multiple variants |
| **Modal** | Molecule | Overlay dialog | Focus trap, keyboard navigation |
| **Tabs** | Molecule | Tab navigation | Keyboard navigation, ARIA compliant |

### Advanced Components

| Component | Category | Description | Key Features |
|-----------|----------|-------------|--------------|
| **KeyValueForm** | Molecule | Dynamic form builder | Field types, validation, TypeScript |
| **ImageUpload** | Molecule | File upload | Drag & drop, preview, validation |
| **Dropdown** | Molecule | Select dropdown | Search, keyboard navigation |
| **ToastManager** | Organism | Toast notifications | Queue management, positioning |
| **Navbar** | Organism | Navigation bar | Mobile menu, responsive |

## Component API

### Card Component

```svelte
<Card
  title={string}
  subtitle={string}
  description={string}
  image={string}
  variant="default" | "elevated"
  interactive={boolean}
  className={string}
  on:click={(e) => console.log(e.detail.event)}
>
  Custom Content
</Card>
```

**Props:**
- `title`: Card title
- `subtitle`: Card subtitle  
- `description`: Card description
- `image`: Card image URL
- `variant`: Card style variant (default: "default")
- `interactive`: Make card clickable (default: false)
- `className`: Additional CSS classes

**Events:**
- `click`: Fired when interactive card is clicked - `{ detail: { event: MouseEvent } }`

### Form Component

```svelte
<Form
  method="get" | "post"
  action={string}
  className={string}
  on:submit={(e) => console.log(e.detail.data, e.detail.formData)}
>
  <div class="form-field">
    <label for="field" class="form-label">Label</label>
    <Input id="field" name="field" class="form-input" />
  </div>
  <div class="form-actions">
    <Button type="submit">Submit</Button>
  </div>
</Form>
```

**Props:**
- `method`: Form method (default: "post")
- `action`: Form action URL
- `className`: Additional CSS classes

**Events:**
- `submit`: Fired on form submission - `{ detail: { data: Record<string, FormDataEntryValue>, formData: FormData } }`

**CSS Classes:**
- `.form-field`: Field container
- `.form-label`: Field label
- `.form-input`: Field input
- `.form-actions`: Action buttons container

### Layout Component

```svelte
<Layout
  variant="main" | "sidebar" | "grid"
  className={string}
>
  <div slot="header">Header Content</div>
  Main Content
  <div slot="footer">Footer Content</div>
</Layout>
```

**Props:**
- `variant`: Layout type (default: "main")
- `className`: Additional CSS classes

**Slots:**
- `header`: Header content
- `default`: Main content
- `footer`: Footer content

### Navigation Component

```svelte
<Navigation
  variant="header" | "sidebar"
  items={Array<{label: string, href: string, icon?: any}>}
  currentPath={string}
  className={string}
  on:navigate={(e) => console.log(e.detail.item, e.detail.href)}
/>
```

**Props:**
- `variant`: Navigation type (default: "header")
- `items`: Navigation items array
- `currentPath`: Current active path
- `className`: Additional CSS classes

**Events:**
- `navigate`: Fired when navigation item is clicked - `{ detail: { item: NavigationItem, href: string } }`

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

## Modern CSS Features

Zabi Components leverages modern CSS features for better performance and developer experience:

### Container Queries
```css
.card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card-content {
    display: flex;
    flex-direction: row;
  }
}
```

### CSS Grid & Subgrid
```css
.layout-grid {
  display: grid;
  grid-template-columns: subgrid;
  gap: 1rem;
}
```

### CSS Logical Properties
```css
.component {
  margin-inline-start: 1rem;
  padding-block: 0.5rem;
  border-inline-end: 1px solid;
}
```

### CSS Cascade Layers
```css
@layer base, components, utilities;

@layer components {
  .card {
    /* Component styles */
  }
}
```

## Theming

Zabi Components uses CSS custom properties and Tailwind CSS for easy theming. You can customize the appearance by overriding these variables:

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

Full TypeScript definitions are included with comprehensive type safety:

### Event Types
```typescript
import type { 
  ButtonEvents, 
  InputEvents, 
  CardEvents, 
  FormEvents,
  NavigationEvents,
  KeyValueFormEvents 
} from 'zabi-components';

// Properly typed event handlers
function handleButtonClick(event: CustomEvent<{ value: boolean; event?: MouseEvent }>) {
  console.log('Button clicked:', event.detail.value);
}

function handleFormSubmit(event: CustomEvent<{ 
  data: Record<string, FormDataEntryValue>; 
  formData: FormData 
}>) {
  console.log('Form data:', event.detail.data);
}

function handleNavigation(event: CustomEvent<{ 
  item: NavigationItem; 
  href: string 
}>) {
  console.log('Navigate to:', event.detail.href);
}
```

### Component Props
```typescript
// All components have proper prop typing
interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  variant?: "default" | "elevated";
  interactive?: boolean;
  className?: string;
}

interface FormProps {
  method?: "get" | "post";
  action?: string;
  className?: string;
}
```

### Event Dispatchers
```typescript
// Components use typed event dispatchers
const dispatch = createEventDispatcher<{
  click: { event: MouseEvent };
  submit: { data: Record<string, FormDataEntryValue>; formData: FormData };
  navigate: { item: NavigationItem; href: string };
}>();
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

### v1.0.7 (Latest) - "Less is More" Edition

#### 🎯 Philosophy Change
- **Clean & Simple**: Adopted "less is more" philosophy - removed unnecessary complexity
- **Focused Components**: Streamlined to essential components that just work
- **Clean Naming**: Removed "Simple" prefixes - it's just Card, Form, Layout, Navigation

#### ✨ New Clean Components
- **Card**: Clean, semantic card container with interactive support
- **Form**: Simple form wrapper with FormData handling and validation
- **Layout**: Page layout system with header, main, footer slots
- **Navigation**: Clean navigation with header/sidebar variants

#### 🐛 Bug Fixes
- **Fixed TypeScript Errors**: Resolved all event handler type mismatches
- **Fixed Import Paths**: Corrected .js extensions in lib exports
- **Fixed CSS Issues**: Resolved `:global()` selector placement errors
- **Fixed Variant Types**: Corrected component variant type mismatches
- **Fixed Accessibility**: Resolved tabindex warnings for non-interactive elements

#### 🚀 Modern CSS Features
- **Container Queries**: Added support for container-based responsive design
- **CSS Grid & Subgrid**: Implemented modern grid layouts
- **CSS Logical Properties**: Added RTL support with logical properties
- **CSS Cascade Layers**: Organized styles with cascade layers
- **CSS Containment**: Added performance optimizations

#### 📦 TypeScript Improvements
- **Event Type Safety**: All components now have proper event typing
- **Component Props**: Comprehensive prop type definitions
- **Event Dispatchers**: Typed event dispatchers for all components
- **Type Generation**: Proper TypeScript declaration generation

#### 🎨 Design System
- **Semantic HTML**: All components use proper semantic elements
- **Accessibility**: ARIA compliant with keyboard navigation
- **Dark Mode**: Built-in dark mode support with CSS custom properties
- **Responsive**: Mobile-first responsive design

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Svelte 4+ or SvelteKit 2+

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/zabi-components.git
cd zabi-components

# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run type checking
npm run check

# Run tests
npm run test
```

### Project Structure
```
src/
├── components/
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Composite components
│   └── organisms/      # Complex components
├── types/              # TypeScript definitions
├── styles/             # CSS and styling
└── lib/                # Library exports
```

## Troubleshooting

### Common Issues

#### TypeScript Errors
If you see TypeScript errors with event handlers, ensure proper typing:

```typescript
// ✅ Correct - properly typed event handlers
function handleClick(event: CustomEvent<{ event: MouseEvent }>) {
  console.log('Clicked:', event.detail.event);
}

function handleFormSubmit(event: CustomEvent<{ 
  data: Record<string, FormDataEntryValue>; 
  formData: FormData 
}>) {
  console.log('Form data:', event.detail.data);
}

// ❌ Incorrect - missing proper typing
function handleClick(event: CustomEvent) {
  console.log(event.detail.value); // May cause type errors
}
```

#### CSS @apply Warnings
If you see "Unknown at rule @apply" warnings in your IDE:

1. Install Tailwind CSS IntelliSense extension
2. Add to your VS Code settings:
```json
{
  "css.customData": [".vscode/tailwind.json"],
  "tailwindCSS.includeLanguages": {
    "svelte": "html"
  }
}
```

#### Import Errors
If you encounter import errors, ensure you're using the latest version:

```bash
npm install zabi-components@latest
```

#### Runtime Errors
If you encounter runtime errors, ensure you have the correct peer dependencies:

```bash
npm install svelte@^4.0.0 || ^5.0.0 @sveltejs/kit@^2.0.0
```

### Migration from Previous Versions

If you're upgrading from a previous version, note these changes:

1. **Clean Components**: New Card, Form, Layout, Navigation components
2. **Event Structure**: All events follow standardized structure
3. **TypeScript**: Enhanced type definitions with proper event typing
4. **Modern CSS**: Uses Container Queries, CSS Grid, and logical properties

## Performance & Best Practices

### Performance Optimizations
- **Tree Shaking**: Import only what you need
- **CSS Containment**: Components use CSS containment for better performance
- **Efficient Animations**: Uses `will-change` and `transform` for smooth animations
- **Lazy Loading**: Components support lazy loading when needed

### Best Practices

#### Component Usage
```svelte
<!-- ✅ Good - Use semantic HTML -->
<Card title="User Profile" interactive on:click={handleClick}>
  <p>User information</p>
</Card>

<!-- ❌ Avoid - Unnecessary complexity -->
<div class="custom-card" on:click={handleClick}>
  <h3>User Profile</h3>
  <p>User information</p>
</div>
```

#### Event Handling
```typescript
// ✅ Good - Proper event typing
function handleFormSubmit(event: CustomEvent<{ 
  data: Record<string, FormDataEntryValue>; 
  formData: FormData 
}>) {
  // Handle form submission
  console.log('Form data:', event.detail.data);
}

// ❌ Avoid - Untyped events
function handleFormSubmit(event: any) {
  console.log(event.detail); // No type safety
}
```

#### Styling
```svelte
<!-- ✅ Good - Use component props and Tailwind -->
<Button variant="primary" size="lg" className="w-full">
  Submit
</Button>

<!-- ❌ Avoid - Inline styles -->
<button style="background: blue; width: 100%;">
  Submit
</button>
```

### Accessibility Guidelines
- Always provide proper labels and ARIA attributes
- Ensure keyboard navigation works correctly
- Use semantic HTML elements
- Test with screen readers
- Maintain proper color contrast ratios

## Support

For support, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ using Svelte, TypeScript, and Tailwind CSS.  
**Less is more** - Clean components that just work.