# Zabi Components

A clean, minimal Svelte 5 component library built with TypeScript and Tailwind CSS. **Less is more** - focused on essential components that just work.

> **⚠️ Svelte 5 Required**: This library uses Svelte 5 runes syntax (`$props`, `$derived`, `$state`). Make sure you're using Svelte 5.43.8 or later.

## Philosophy

**Clean & Simple**: No unnecessary complexity, just clean components that focus on what matters most. Every component is designed to be intuitive, accessible, and performant. We've simplified everything to use modern CSS and minimal JavaScript.

## Features

- 🎯 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🎨 **Semantic Color System** - Built-in semantic colors with automatic dark mode support
- 🌙 **Dark Mode Ready** - Automatic dark mode switching with CSS custom properties
- ♿ **Accessibility First** - ARIA compliant components with keyboard navigation support
- 📱 **Responsive Design** - Mobile-first approach with responsive utilities
- 🧩 **Clean API** - Simple, intuitive component APIs with minimal props
- 🔧 **Utility Functions** - Reusable variant utilities for consistent styling
- 📦 **Tree Shakeable** - Import only what you need
- ✅ **Production Ready** - Fully tested and optimized for production use
- 🚀 **Modern CSS** - CSS-only positioning, animations, and interactions
- ⚡ **Lightweight** - 60-80% less code than traditional component libraries
- 🎭 **Emoji Icons** - Simple emoji-based icons instead of complex SVG libraries
- 🛡️ **SSR Safe** - 100% server-side rendering compatible with zero runtime errors
- 🔄 **SvelteKit Ready** - Full SvelteKit integration with proper hydration

## Installation

```bash
npm install zabi-components
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install svelte@^5.43.8
npm install @sveltejs/kit@^2.0.0  # Optional, for SvelteKit projects
```

## Theme Setup

Zabi Components includes a comprehensive theme system with Tailwind CSS v4. You need to import the theme before using components.

### Quick Setup

**For projects with existing Tailwind CSS:**

```css
/* app.css */
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/dist/zabi-components.css';
```

**For standalone projects (no Tailwind setup):**

```css
/* app.css */
@import 'zabi-components/theme';
@import 'zabi-components/dist/zabi-components.css';
```

### With Dark Mode

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/theme-dark-only'; /* Add dark mode support */
@import 'zabi-components/dist/zabi-components.css';
```

### Extending the Theme

You can extend the theme with custom colors and fonts:

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';

/* Your custom theme extensions */
@theme {
  --font-family-title: 'Your Font', sans-serif;
  --color-custom-primary: #ff0000;
}

@import 'zabi-components/dist/zabi-components.css';
```

> 📖 **Complete Theme Guide**: See [THEME.md](./THEME.md) for comprehensive documentation on theme usage, customization, dark mode, and advanced patterns.

## Import Methods

Zabi Components supports multiple import patterns:

### Main Import (All Components)
```typescript
import { 
  Button, 
  IconButton,
  Input, 
  Card, 
  CardHeader,
  CardContent,
  CardFooter,
  Alert, 
  Badge, 
  Modal,
  NavigationMenu,
  Section
} from 'zabi-components';
```

### Subpath Imports (Recommended for Tree Shaking)
```typescript
// Import from specific categories
import { 
  Button, 
  IconButton, 
  Input, 
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from 'zabi-components/atoms';
import { 
  Alert, 
  Modal, 
  Dropdown,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  Section,
  Tabs
} from 'zabi-components/molecules';
import { 
  Navbar, 
  Navigation 
} from 'zabi-components/organisms';

// Import types separately
import type { ButtonEvents, InputEvents } from 'zabi-components/types';

// Import utility functions
import { 
  createId, 
  cn, 
  getFormData, 
  validateEmail,
  safeLocalStorage,
  safeDocument 
} from 'zabi-components';
```

## Quick Start

```svelte
<script lang="ts">
  // Clean Components - Less is More
  import { 
    Card, 
    CardHeader, 
    CardContent, 
    CardFooter,
    Form, 
    Navigation, 
    Button, 
    IconButton,
    Input, 
    Textarea,
    Badge,
    Alert
  } from 'zabi-components';
  
  let formData = $state({
    name: '',
    email: '',
    message: '',
  });
  
  function handleFormSubmit(event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);
  }
  
  function handleCardClick(event: MouseEvent) {
    console.log('Card clicked:', event);
  }
  
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
</script>

<div class="min-h-screen bg-gray-50">
  <header class="flex items-center justify-between p-4 bg-white border-b">
    <h1 class="text-xl font-bold">My App</h1>
    <Navigation variant="header" items={navItems} />
  </header>

  <main class="container mx-auto p-6">
    <!-- Card with Compound Components -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <Card variant="elevated" onclick={handleCardClick}>
        <CardHeader>
          <h3 class="text-lg font-semibold">Default Card</h3>
        </CardHeader>
        <CardContent>
          <p>This is a card using compound components.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Learn More</Button>
        </CardFooter>
      </Card>
      
      <Card variant="success" onclick={handleCardClick}>
        <CardHeader>
          <h3 class="text-lg font-semibold">Success Card</h3>
        </CardHeader>
        <CardContent>
          <p>This card indicates a successful action.</p>
        </CardContent>
      </Card>
      
      <Card variant="warning" onclick={handleCardClick}>
        <CardHeader>
          <h3 class="text-lg font-semibold">Warning Card</h3>
        </CardHeader>
        <CardContent>
          <p>This card shows a warning state.</p>
        </CardContent>
      </Card>
    </div>
    
    <!-- Form with Semantic Variants -->
    <Card variant="outlined">
      <CardHeader>
        <h2 class="text-xl font-bold">Contact Form</h2>
      </CardHeader>
      <CardContent>
        <Form onsubmit={handleFormSubmit}>
          <div class="form-field">
            <Input 
              id="name" 
              name="name" 
              value={formData.name}
              oninput={(e) => formData.name = (e.target as HTMLInputElement).value}
              label="Name"
              placeholder="Enter your name" 
              variant="default"
            />
          </div>
          
          <div class="form-field">
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email}
              oninput={(e) => formData.email = (e.target as HTMLInputElement).value}
              label="Email"
              placeholder="Enter your email" 
              variant="success"
            />
          </div>

          <div class="form-field">
            <Textarea 
              id="message" 
              name="message" 
              value={formData.message}
              oninput={(e) => formData.message = (e.target as HTMLTextAreaElement).value}
              label="Message"
              placeholder="Enter your message" 
              variant="default"
            />
          </div>
          
          <div class="form-actions flex gap-2">
            <Button type="submit" variant="primary" className="flex-1">
              Submit
            </Button>
            <IconButton variant="outline" label="Help">
              ❓
            </IconButton>
          </div>
        </Form>
      </CardContent>
    </Card>
    
    <!-- Badges and Alerts -->
    <div class="mt-6 space-y-4">
      <div class="flex gap-2">
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      
      <Alert variant="info" title="Information" message="This is an informational alert." />
    </div>
  </main>
</div>
```

## Component Overview

### Core Components (Clean & Simple)

| Component | Category | Description | Key Features |
|-----------|----------|-------------|--------------|
| **Card** | Atom | Clean card container | Simple, interactive, image support, compound components, 4 variants |
| **CardHeader** | Atom | Card header section | Compound component for card structure |
| **CardContent** | Atom | Card content section | Compound component for card structure |
| **CardFooter** | Atom | Card footer section | Compound component for card structure |
| **Form** | Molecule | Simple form wrapper | FormData handling, clean API |
| **Navigation** | Organism | Clean navigation | Header/sidebar variants, active state |
| **Button** | Atom | Action button | 6 variants (primary, secondary, danger, ghost, outline, link) |
| **IconButton** | Atom | Icon-only button | Icon-only, variants, sizes, accessible label |
| **Input** | Atom | Form input | Essential props, accessibility, semantic variants |
| **Badge** | Atom | Status indicator | 5 color variants, closable, icon support |
| **Modal** | Molecule | Overlay dialog | Focus trap, keyboard navigation, focus return |
| **Tabs** | Molecule | Tab navigation | Keyboard navigation, 2 variants |
| **Dropdown** | Molecule | Dropdown menu | CSS-only positioning, keyboard navigation, ARIA support |
| **ImageUpload** | Molecule | File upload | Direct selection, preview |
| **Navbar** | Organism | Navigation bar | Mobile menu, responsive |
| **NavigationMenu** | Molecule | Advanced navigation menu | Compound components, keyboard navigation |
| **Section** | Molecule | Content section wrapper | Responsive layout, variant support |
| **Sidebar** | Molecule | Sidebar navigation | Collapsible, responsive |

### Simplified Components

| Component | Category | Description | Key Features |
|-----------|----------|-------------|--------------|
| **Checkbox** | Atom | Checkbox input | Simple on/off state, semantic variants |
| **Select** | Atom | Dropdown select | Basic options support, semantic variants |
| **Textarea** | Atom | Multi-line input | Essential configuration, semantic variants |
| **Toggle** | Atom | Toggle switch | Fixed size, simple state |
| **Progress** | Atom | Progress bar | Percentage display |
| **Heading** | Atom | Text headings | 6 levels, clean styling |
| **ThemeToggle** | Atom | Theme switcher | Emoji-based, simple |
| **Toast** | Atom | Notification toast | Fixed position, basic |
| **Tooltip** | Atom | Hover tooltip | CSS-only positioning |
| **Skeleton** | Atom | Loading placeholder | Simple animation |
| **ColorPicker** | Atom | Color selection | Simple color grid |
| **SlideUp** | Molecule | Slide-up panel | CSS-only animations |
| **CodeBlock** | Atom | Code display | Syntax highlighting support |
| **FeatureCard** | Atom | Feature showcase card | Image, title, description |
| **OptimizedImage** | Atom | Optimized image | Lazy loading, responsive |
| **Alert** | Molecule | Alert notification | Variants, closable, custom content |
| **ContactForm** | Molecule | Contact form | Pre-built form with validation |
| **ComponentDemo** | Molecule | Component showcase | Demo wrapper for examples |

## Semantic Color System

Zabi Components includes a comprehensive semantic color system that automatically supports dark mode and provides consistent styling across all components.

### Available Variants

All components support these semantic color variants:

- **`default`** - Standard appearance with primary colors
- **`success`** - Green colors for positive states
- **`warning`** - Yellow/amber colors for caution states  
- **`error`** - Red colors for error states
- **`info`** - Blue colors for informational states

### Usage Examples

```svelte
<!-- Input variants -->
<Input variant="default" label="Default Input" />
<Input variant="success" label="Success Input" />
<Input variant="warning" label="Warning Input" />
<Input variant="error" label="Error Input" />

<!-- Textarea variants -->
<Textarea variant="default" label="Default Textarea" />
<Textarea variant="success" label="Success Textarea" />

<!-- Card variants -->
<Card variant="default" title="Default Card" />
<Card variant="success" title="Success Card" />
<Card variant="warning" title="Warning Card" />
<Card variant="error" title="Error Card" />
<Card variant="info" title="Info Card" />
```

### Utility Functions

Zabi Components exports several utility functions for common tasks:

```typescript
// Main exports (most utilities)
import { 
  createId,
  cn,
  getFormData,
  validateEmail,
  validateRequired,
  isBrowser,
  safeWindow,
  safeDocument,
  safeLocalStorage,
  generateId
} from 'zabi-components';

// Or import SSR-safe utilities directly
import { 
  safeLocalStorage, 
  safeDocument, 
  safeWindow,
  isBrowser,
  generateId
} from 'zabi-components/lib/ssr-safe';

// ID Generation (SSR-safe)
const uniqueId = createId('input'); // Returns "input-abc123xyz" (client) or "input-ssr-1234567890" (server)

// Class Name Utility
const className = cn('base-class', condition && 'conditional-class', undefined); 
// Returns "base-class conditional-class" (filters out falsy values)

// Form Utilities
const form = document.querySelector('form') as HTMLFormElement;
const data = getFormData(form); // Returns object with form data

// Validation
const isValidEmail = validateEmail('user@example.com'); // Returns true/false
const isRequired = validateRequired('value'); // Returns true/false

// Browser Detection (SSR-safe)
if (isBrowser()) {
  // Safe to use window, document, localStorage, etc.
}

// Safe Browser APIs
const window = safeWindow(); // Returns Window | undefined
const document = safeDocument(); // Returns Document | undefined
const storage = safeLocalStorage(); // Returns Storage | undefined
```

### Variant Utility Functions

For custom components or advanced usage, you can use the built-in variant utility functions:

```typescript
import { 
  getInputVariantClasses, 
  getCardVariantClasses, 
  getVariantClasses 
} from 'zabi-components/lib/variant-utils';

// For input components (Input, Textarea)
const inputClass = getInputVariantClasses('success'); // Returns "input-variant-success"

// For card components
const cardClass = getCardVariantClasses('error'); // Returns "card-variant-error"

// For custom components
const borderClass = getVariantClasses('warning', 'border'); // Returns "variant-border-warning"
const textClass = getVariantClasses('success', 'text'); // Returns "variant-text-success"
const bgClass = getVariantClasses('info', 'bg'); // Returns "variant-bg-info"
```

### Dark Mode Support

The semantic color system automatically adapts to dark mode through CSS custom properties. Simply add the `.dark` class to your document:

```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

All components will automatically switch to their dark mode variants without any additional configuration.

## Component API

### Card Component

```svelte
<Card
  title={string}
  image={string}
  interactive={boolean}
  variant="default" | "success" | "warning" | "error" | "info"
  size="sm" | "md" | "lg"
  className={string}
  on:click={(e) => console.log(e.detail.event)}
>
  Custom Content
</Card>
```

**Props:**
- `title`: Card title
- `image`: Card image URL
- `interactive`: Make card clickable (default: false)
- `variant`: Card variant with semantic colors (default: "default")
- `size`: Card size (default: "md")
- `className`: Additional CSS classes

**Events:**
- `click`: Fired when interactive card is clicked - `{ detail: { event: MouseEvent } }`

### Form Component

```svelte
<Form
  method="get" | "post"
  action={string}
  className={string}
  on:submit={(e) => console.log('Form submitted')}
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
- `submit`: Native form submit event - use `FormData` to get form data

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
  on:click={(e) => console.log('Navigation clicked')}
/>
```

**Props:**
- `variant`: Navigation type (default: "header")
- `items`: Navigation items array
- `currentPath`: Current active path
- `className`: Additional CSS classes

**Events:**
- `click`: Native click event on navigation items

### NavigationMenu Component

Advanced navigation menu system with compound components:

```svelte
<script lang="ts">
  import { 
    NavigationMenu, 
    NavigationMenuList, 
    NavigationMenuItem, 
    NavigationMenuTrigger, 
    NavigationMenuContent, 
    NavigationMenuLink 
  } from 'zabi-components';
</script>

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/products/web">Web</NavigationMenuLink>
        <NavigationMenuLink href="/products/mobile">Mobile</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about">About</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

**Compound Components:**
- `NavigationMenu`: Root container
- `NavigationMenuList`: List wrapper
- `NavigationMenuItem`: Individual menu item
- `NavigationMenuTrigger`: Trigger for dropdown items
- `NavigationMenuContent`: Dropdown content container
- `NavigationMenuLink`: Navigation link component

**Features:**
- Keyboard navigation support
- ARIA compliant
- CSS-only positioning
- Responsive design

### Section Component

```svelte
<Section
  variant="default" | "primary" | "secondary"
  size="sm" | "md" | "lg" | "xl"
  className={string}
>
  Section content
</Section>
```

**Props:**
- `variant`: Section style variant (default: "default")
- `size`: Section size (default: "md")
- `className`: Additional CSS classes

### Button Component

```svelte
<Button
  variant="primary" | "secondary" | "danger" | "ghost" | "outline" | "link"
  size="sm" | "md" | "lg"
  disabled={boolean}
  type="button" | "submit" | "reset"
  className={string}
  onclick={(e) => console.log('Button clicked')}
>
  Button Content
</Button>
```

**Props:**
- `variant`: Button style variant (default: "primary")
  - `primary`: Primary action button with solid background
  - `secondary`: Secondary action button
  - `danger`: Destructive action button (red)
  - `ghost`: Transparent button with hover effect
  - `outline`: Outlined button with border
  - `link`: Text button styled as a link
- `size`: Button size (default: "md")
- `disabled`: Disable the button (default: false)
- `type`: HTML button type (default: "button")
- `className`: Additional CSS classes

**Events:**
- `onclick`: Native click event - `MouseEvent`

### IconButton Component

```svelte
<IconButton
  variant="primary" | "secondary" | "danger" | "ghost" | "outline" | "link"
  size="sm" | "md" | "lg"
  disabled={boolean}
  type="button" | "submit" | "reset"
  label={string}
  onclick={(e) => console.log('Icon clicked', e)}
>
  <!-- Icon content -->
</IconButton>
```

**Props:**
- `variant`: Icon button style (default: "primary")
- `size`: Icon button size (default: "md")
- `disabled`: Disable the button (default: false)
- `type`: HTML button type (default: "button")
- `label`: Accessible label for screen readers

**Events:**
- `onclick`: Native click event - `MouseEvent`

### Input Component

```svelte
<Input
  value={string}
  type={string}
  label={string}
  placeholder={string}
  disabled={boolean}
  size="sm" | "md" | "lg"
  variant="default" | "success" | "warning" | "error"
  className={string}
  on:input={(e) => console.log('Input changed:', e.target.value)}
  on:change={(e) => console.log('Input changed:', e.target.value)}
/>
```

**Props:**
- `value`: Input value (controlled)
- `type`: Input type (default: "text")
- `label`: Input label
- `placeholder`: Input placeholder
- `disabled`: Disable the input (default: false)
- `size`: Input size (default: "md")
- `variant`: Input variant with semantic colors (default: "default")
- `className`: Additional CSS classes

**Events:**
- `input`: Native input event - `InputEvent`
- `change`: Native change event - `Event`

### Textarea Component

```svelte
<Textarea
  value={string}
  label={string}
  placeholder={string}
  disabled={boolean}
  rows={number}
  size="sm" | "md" | "lg"
  variant="default" | "success" | "warning" | "error"
  className={string}
  on:input={(e) => console.log('Textarea changed:', e.target.value)}
  on:change={(e) => console.log('Textarea changed:', e.target.value)}
/>
```

**Props:**
- `value`: Textarea value (controlled)
- `label`: Textarea label
- `placeholder`: Textarea placeholder
- `disabled`: Disable the textarea (default: false)
- `rows`: Number of visible text lines (default: 4)
- `size`: Textarea size (default: "md")
- `variant`: Textarea variant with semantic colors (default: "default")
- `className`: Additional CSS classes

**Events:**
- `input`: Native input event - `InputEvent`
- `change`: Native change event - `Event`

### Card Component

Card component supports two APIs: prop-based (backward compatible) and compound components (recommended).

#### Prop-based API (Backward Compatible)

```svelte
<Card
  title="Card Title"
  description="Card description"
  image="image-url.jpg"
  variant="default" | "elevated" | "outlined" | "flat"
  size="sm" | "md" | "lg"
  fullWidth={boolean}
  onclick={(e) => console.log('Card clicked', e)}
>
  Additional Content
</Card>
```

#### Compound Component API (Recommended)

```svelte
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

**Props:**
- `variant`: Card style variant (default: "default")
  - `default`: Standard card with subtle shadow
  - `elevated`: Card with stronger shadow (elevated appearance)
  - `outlined`: Card with border, no shadow
  - `flat`: Card with no shadow, no border (minimal)
- `size`: Card size (default: "md")
- `fullWidth`: Whether card takes full width (default: true)
- `title`: Card title (old API)
- `description`: Card description (old API)
- `image`: Card image URL (old API)
- `onclick`: Click handler for interactive cards

**Compound Components:**
- `CardHeader`: Header section container
- `CardContent`: Main content area
- `CardFooter`: Footer section container
- `CardTitle`: Title component (supports heading levels 1-6)
- `CardDescription`: Description text component

**Events:**
- `onclick`: Native click event - `MouseEvent`

**Keyboard Navigation (Interactive Cards):**
- **Tab**: Focus the card
- **Enter / Space**: Activate card click handler

### Alert Component

```svelte
<Alert
  variant="info" | "success" | "warning" | "error"
  title={string}
  message={string}
  closable={boolean}
  className={string}
  onclick={(e) => console.log('Alert closed', e)}
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
  --zabi-secondary: theme('colors.stone.600');
  --zabi-secondary-hover: theme('colors.stone.700');
  
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
  --zabi-surface-hover: theme('colors.stone.50');
  
  /* Border Colors */
  --zabi-border: theme('colors.stone.300');
  --zabi-border-hover: theme('colors.stone.400');
  --zabi-border-focus: theme('colors.blue.500');
  
  /* Text Colors */
  --zabi-text: theme('colors.stone.900');
  --zabi-text-muted: theme('colors.stone.600');
  --zabi-text-placeholder: theme('colors.stone.400');
  --zabi-text-inverse: theme('colors.white');
}
```

### Dark Mode

Dark mode is automatically supported through CSS custom properties:

```css
.dark {
  --zabi-surface: theme('colors.stone.800');
  --zabi-surface-hover: theme('colors.stone.700');
  --zabi-text: theme('colors.stone.200');
  --zabi-text-muted: theme('colors.stone.500');
  --zabi-border: theme('colors.stone.600');
}
```

## Event Handling

Zabi Components now use **native DOM events** with **event forwarding** for maximum compatibility across frameworks.

### Event Forwarding

All components use `{...$$restProps}` to forward native DOM events, making them compatible with React, Vue, Svelte, and vanilla JavaScript.

```svelte
<!-- All these work the same way -->
<Button on:click={handleClick}>Click me</Button>
<Input on:input={handleInput} on:change={handleChange} />
<Modal on:click={handleClose} on:keydown={handleKeydown} />
```

### Form Components

Form components use **controlled components** pattern instead of two-way binding:

```svelte
<script lang="ts">
  let inputValue = '';
  let checkboxValue = false;
  
  function handleInput(event: Event) {
    inputValue = (event.target as HTMLInputElement).value;
  }
  
  function handleCheckbox(event: Event) {
    checkboxValue = (event.target as HTMLInputElement).checked;
  }
</script>

<Input 
  value={inputValue} 
  on:input={handleInput} 
  label="Name" 
/>
<Checkbox 
  checked={checkboxValue} 
  on:change={handleCheckbox} 
  label="Subscribe" 
/>
```

### Migration from Previous Versions

**Before (v2.0.x):**
```svelte
<Input bind:value={inputValue} />
<Button on:click={handleClick}>Click</Button>
<Modal bind:isOpen onclick={handleClose} />
```

**After (v2.1.x):**
```svelte
<Input value={inputValue} on:input={(e) => inputValue = e.target.value} />
<Button on:click={handleClick}>Click</Button>
<Modal bind:isOpen on:click={handleClose} />
```

### Benefits

- ✅ **SSR Safe**: No more hydration errors in production
- ✅ **Cross-Framework**: Works in React, Vue, Svelte, vanilla JS
- ✅ **Standards Compliant**: Uses native DOM events
- ✅ **Better Performance**: Reduced JavaScript overhead

## TypeScript Support

Full TypeScript definitions are included with comprehensive type safety:

### Event Types

All components now use native DOM events with proper TypeScript typing:

```typescript
// Native event handlers with proper typing
function handleButtonClick(event: MouseEvent) {
  console.log('Button clicked:', event);
}

function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log('Input value:', target.value);
}

function handleFormSubmit(event: SubmitEvent) {
  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());
  console.log('Form data:', data);
}
```

### Component Props

All components have proper prop typing with event forwarding:

```typescript
// All components support event forwarding
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  // All native button events are forwarded via {...$$restProps}
}

interface InputProps {
  value?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
  // All native input events are forwarded via {...$$restProps}
}
```

## SSR Safety & SvelteKit Integration

Zabi Components is **100% SSR-safe** and fully compatible with SvelteKit's server-side rendering. All components have been thoroughly tested to eliminate runtime errors and ensure proper hydration.

### ✅ **Zero Runtime Errors**

All components are designed to work seamlessly in both server and client environments:

- **No "Cannot read properties of null" errors**
- **Proper hydration without mismatches**
- **Safe browser API access**
- **Consistent behavior across SSR and client**

### 🛡️ **SSR-Safe Patterns**

Components use consistent SSR-safe patterns:

```svelte
<script lang="ts">
  import { onMount } from "svelte";
  import { safeLocalStorage, safeDocument } from "zabi-components/lib/ssr-safe";
  
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
    // Safe browser API access after mount
    const storage = safeLocalStorage();
    if (storage) {
      // Use localStorage safely
    }
  });
</script>
```

### 🔄 **SvelteKit Integration**

Perfect integration with SvelteKit features:

```svelte
<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from 'zabi-components';
</script>

<!-- SSR-safe navigation -->
<Button onclick={() => goto('/about')}>
  Go to About
</Button>
```

### 🎯 **Key SSR Features**

- **Safe ID Generation**: Prevents hydration mismatches
- **Browser API Guards**: All browser APIs are safely accessed
- **Consistent State**: Server and client state remain synchronized
- **Theme Persistence**: Dark mode works correctly on first load
- **Form Stability**: Input IDs remain consistent across hydration

### 📋 **SSR Best Practices**

1. **Use SvelteKit Navigation**: Always use `goto()` instead of `window.location.href`
2. **Safe Browser Access**: Use provided SSR-safe utilities
3. **Consistent IDs**: Let components handle ID generation internally
4. **Theme Loading**: Components handle theme loading automatically

## Advanced Usage

### Custom Styling

```svelte
<Button 
  variant="primary" 
  size="lg" 
  className="w-full shadow-lg hover:shadow-xl"
  on:click={(e) => console.log('Clicked!', e)}
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
  
  function handleSubmit(event: SubmitEvent) {
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
      value={formData.name}
      on:input={(e) => formData.name = e.target.value}
      label="Name"
      placeholder="Enter your name"
      required
    />
    
    <Input
      value={formData.email}
      type="email"
      on:input={(e) => formData.email = e.target.value}
      label="Email"
      placeholder="Enter your email"
      required
    />
    
    <Input
      value={formData.message}
      on:input={(e) => formData.message = e.target.value}
      label="Message"
      placeholder="Enter your message"
    />
    
    <Button type="submit" variant="primary">
      Send Message
    </Button>
  </form>
  
  <div slot="footer">
    {#if showSuccess}
      <Alert variant="success" closable>
        Message sent successfully!
      </Alert>
    {/if}
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

### v5.0.21 (Latest) - Current Version

See [CHANGELOG.md](./CHANGELOG.md) for the complete changelog.

### v5.0.18 - "Enhanced Components" Edition

#### ✨ **Component Enhancements**
- **Card Compound Components**: Added CardHeader, CardContent, CardFooter, CardTitle, and CardDescription
- **Button Variants**: Added ghost, outline, and link variants
- **Badge Updates**: Added icon support and enhanced size variants
- **NavigationMenu**: Complete navigation menu system with compound components
- **Section Component**: New responsive section wrapper component
- **Accessibility**: Enhanced focus management and keyboard navigation across all components

### v4.0.0 - "Svelte 5 Runes" Edition

#### 🚀 **MAJOR UPDATE** - Svelte 5 Migration

This version migrates to Svelte 5 with runes syntax for better performance and developer experience.

#### ✅ **What's New**
- **Svelte 5 Runes**: All components now use `$props`, `$derived`, and `$state`
- **Better Performance**: Improved reactivity and reduced bundle size
- **Enhanced TypeScript**: Better type inference and safety
- **Modern Syntax**: Cleaner, more intuitive component APIs

#### 🔄 **Migration Required**
- **Svelte Version**: Requires Svelte 5.43.8 or later
- **Syntax Updates**: Components now use runes syntax
- **Event Handling**: Updated to use `oninput`, `onclick` instead of `on:input`, `on:click`

#### 📋 **Breaking Changes**
1. **Svelte Version**: Must upgrade to Svelte 5.43.8+
2. **Event Syntax**: Use `oninput`, `onclick` instead of `on:input`, `on:click`
3. **Component Props**: All components use Svelte 5 runes syntax

### v2.1.0 - "Cross-Framework Compatible" Edition

#### 🚀 **MAJOR BREAKING CHANGES** - Event Handling Overhaul

This is a **major breaking change** that affects how all components handle events. The refactoring eliminates SSR/production errors and makes components compatible with React, Vue, and vanilla JavaScript applications.

#### ✅ **What's Fixed**
- **SSR/Production Errors**: Eliminated all `createEventDispatcher` hydration errors
- **Cross-Framework Compatibility**: Components now work in React, Vue, Svelte, and vanilla JS
- **Event Forwarding**: All components use `{...$$restProps}` for native DOM events
- **Standards Compliance**: Uses web standards instead of framework-specific events

#### 🔄 **Migration Required**
- **Form Components**: Replace `bind:value` with `value` prop + event handlers
- **Event Names**: Some custom events replaced with native DOM events
- **Event Structure**: Simplified event structures across all components

#### 📋 **Breaking Changes**
1. **Form Components**: Must use `value` prop + event handlers instead of `bind:value`
2. **Event Names**: Some custom events replaced with native DOM events
3. **Event Structure**: Simplified event structures across all components
4. **SSR Compatibility**: Components now work correctly in SSR environments

See the [Migration Guide](#migration-from-previous-versions) above for detailed examples.

### v2.0.2 - "Less is More" Edition

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Svelte 5.43.8+ or SvelteKit 2+

### Local Development
```bash
# Clone the repository
git clone https://github.com/sabnor/zabi-components.git
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
npm install svelte@^5.43.8 @sveltejs/kit@^2.0.0
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

## Compound Components

Zabi Components supports compound component patterns for flexible composition:

### Card Compound Components

```svelte
<script>
  import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, Button } from 'zabi-components';
</script>

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      This is a description using compound components.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area with flexible composition.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Save</Button>
    <Button variant="ghost">Cancel</Button>
  </CardFooter>
</Card>
```

## Accessibility

Zabi Components is built with accessibility in mind:

### WCAG 2.1 AA Compliance
- Comprehensive ARIA attributes
- Proper semantic HTML
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate within components (Tabs, Navigation, Dropdown)
- **Escape**: Close modals and overlays
- **Home/End**: Jump to first/last item in lists

### Focus Management
- Focus trap in modals
- Focus return after closing modals
- Visible focus indicators
- Logical tab order

See [ACCESSIBILITY.md](./docs/ACCESSIBILITY.md) and [KEYBOARD_NAVIGATION.md](./docs/KEYBOARD_NAVIGATION.md) for detailed documentation.

## Variant System

Zabi Components uses a consistent variant system:

### Semantic Variants
Used for state indication: `default`, `success`, `warning`, `error`, `info`

### Style Variants
Used for visual appearance: Button (`primary`, `secondary`, `outline`, `link`, etc.), Card (`elevated`, `outlined`, `flat`)

### Size Variants
Consistent across components: `sm`, `md`, `lg`

See [VARIANTS.md](./docs/VARIANTS.md) for complete variant documentation.

## Support

For support, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ using Svelte, TypeScript, and Tailwind CSS.  
**Less is more** - Clean components that just work.