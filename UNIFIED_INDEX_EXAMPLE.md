# Unified Index Example

The new unified `index.ts` provides a single entry point for all Zabi Components. Here are the different ways you can import components:

## Method 1: Individual Component Imports (Recommended)

```typescript
// Import specific components you need
import { Button, Input, Card, Form, Modal, Navbar } from 'zabi-components';

// Use in your Svelte component
<Button variant="primary" on:click={handleClick}>
  Click me
</Button>

<Input bind:value={name} label="Name" placeholder="Enter your name" />

<Card title="Welcome" interactive>
  <p>This is a simple card</p>
</Card>
```

## Method 2: Category-based Imports

```typescript
// Import from specific categories
import { Button, Input, Badge } from 'zabi-components/atoms';
import { Form, Modal, Tabs } from 'zabi-components/molecules';
import { Navbar, Navigation } from 'zabi-components/organisms';
```

## Method 3: Default Import (All Components)

```typescript
// Import everything as a namespace
import Zabi from 'zabi-components';

// Use with namespace
<Zabi.Button variant="primary">Click me</Zabi.Button>
<Zabi.Input bind:value={name} label="Name" />
<Zabi.Card title="Welcome">Content</Zabi.Card>
```

## Method 4: Type Imports

```typescript
// Import types for TypeScript
import type { 
  ButtonProps, 
  InputProps, 
  CardProps,
  ButtonEvents,
  InputEvents 
} from 'zabi-components';

// Use in your component
interface MyComponentProps {
  buttonConfig: ButtonProps;
  inputConfig: InputProps;
}
```

## Method 5: Utility Functions

```typescript
// Import utility functions
import { 
  createId, 
  cn, 
  getFormData, 
  validateEmail, 
  validateRequired 
} from 'zabi-components';

// Use utilities
const id = createId('my-component');
const classes = cn('base-class', isActive && 'active', className);
const formData = getFormData(formElement);
const isValidEmail = validateEmail(email);
const isRequired = validateRequired(value);
```

## Complete Example

```svelte
<script lang="ts">
  import { 
    Button, 
    Input, 
    Card, 
    Form, 
    Modal,
    createId,
    cn,
    validateEmail,
    type ButtonProps,
    type InputProps 
  } from 'zabi-components';
  
  let name = '';
  let email = '';
  let showModal = false;
  let errors: Record<string, string> = {};
  
  const formId = createId('contact-form');
  
  function handleSubmit(event: CustomEvent) {
    errors = {};
    
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (email && !validateEmail(email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (Object.keys(errors).length === 0) {
      showModal = true;
    }
  }
  
  function closeModal() {
    showModal = false;
  }
</script>

<Card title="Contact Form" className="max-w-md mx-auto">
  <Form on:submit={handleSubmit}>
    <Input
      bind:value={name}
      label="Name"
      placeholder="Enter your name"
      className={cn('mb-4', errors.name && 'border-red-500')}
    />
    
    <Input
      bind:value={email}
      type="email"
      label="Email"
      placeholder="Enter your email"
      className={cn('mb-4', errors.email && 'border-red-500')}
    />
    
    {#if errors.name}
      <p class="text-red-500 text-sm mb-2">{errors.name}</p>
    {/if}
    
    {#if errors.email}
      <p class="text-red-500 text-sm mb-4">{errors.email}</p>
    {/if}
    
    <Button type="submit" variant="primary" className="w-full">
      Submit
    </Button>
  </Form>
</Card>

<Modal bind:isOpen={showModal} title="Success" onclick={closeModal}>
  <p>Thank you for your submission!</p>
  <p>Name: {name}</p>
  <p>Email: {email}</p>
</Modal>
```

## Benefits of the Unified Index

1. **Single Import Point**: All components available from one place
2. **Tree Shaking**: Only import what you need
3. **Type Safety**: Full TypeScript support with proper types
4. **Utilities Included**: Helper functions for common tasks
5. **Flexible Imports**: Multiple import patterns supported
6. **Backward Compatible**: Existing imports still work
7. **Clean API**: Simple, intuitive component interfaces

## Available Components

### Atoms (21 components)
- Form Controls: Button, Input, Textarea, Select, Checkbox, Toggle, ColorPicker, TextAlignment
- Display: Card, Badge, Heading, Progress, Skeleton, Toast, Tooltip
- Utilities: ThemeToggle, OptimizedImage, InputActions, InputValidation
- Demos: ScaleDemo, PerformanceMonitor

### Molecules (13 components)
- Layout: Form, Layout, Modal, SlideUp, Dropdown
- Navigation: Tabs, Alert, ImageUpload
- Content: Hero, CardsGrid, ColorDemo, SelectedCardInfo

### Organisms (2 components)
- Navigation: Navbar, Navigation

### Utilities (5 functions)
- createId, cn, getFormData, validateEmail, validateRequired
