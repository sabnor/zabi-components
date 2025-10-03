# Clean Components - Less is More

A minimal, clean approach to component design that focuses on what matters most.

## Philosophy

- **Less is More**: Remove unnecessary complexity
- **Clean APIs**: Easy to understand and use
- **Clean Code**: Readable and maintainable
- **Focused**: Each component does one thing well

## Components

### Card
A clean, minimal card component with just the essentials.

```svelte
<Card
    title="Card Title"
    description="Card description"
    image="image.jpg"
    variant="elevated"
    interactive={true}
    on:click={handleClick}
/>
```

### Form
A straightforward form wrapper with basic styling.

```svelte
<Form on:submit={handleSubmit}>
    <div class="form-field">
        <label class="form-label">Name</label>
        <Input name="name" bind:value={name} />
    </div>
    <div class="form-actions">
        <Button type="submit">Submit</Button>
    </div>
</Form>
```

### Layout
Clean layout components for common patterns.

```svelte
<Layout variant="main">
    <div slot="header">Header content</div>
    <div slot="main">Main content</div>
    <div slot="footer">Footer content</div>
</Layout>
```

### Navigation
Minimal navigation component.

```svelte
<Navigation
    variant="header"
    items={navItems}
    currentPath={currentPath}
/>
```

## Simple CSS

The simplified CSS approach uses:
- Minimal custom properties
- Clean utility classes
- No complex nesting
- Easy to understand structure

## Usage

```svelte
<script>
    import { Card, Form, Layout } from './components/simple';
</script>

<Layout variant="main">
    <Card title="Hello" description="World" />
    <Form on:submit={handleSubmit}>
        <!-- form content -->
    </Form>
</Layout>
```

## Benefits

1. **Faster Development**: Less code to write and maintain
2. **Easier Debugging**: Clean structure is easier to debug
3. **Better Performance**: Less CSS and JavaScript overhead
4. **Cleaner Code**: More readable and maintainable
5. **Focused Features**: Each component has a clear purpose

## When to Use Clean vs Complex

Use **Clean** components when:
- You need basic functionality
- Speed of development is important
- The component doesn't need advanced features
- You prefer minimal, clean code

Use **Complex** components when:
- You need advanced features
- Customization is critical
- You need specific accessibility features
- The component needs to handle edge cases

## File Structure

```
src/
├── components/
│   ├── simple/
│   │   ├── Card.svelte
│   │   ├── Form.svelte
│   │   ├── Layout.svelte
│   │   ├── Navigation.svelte
│   │   └── index.ts
│   └── ...
├── styles/
│   └── simple.css
└── routes/
    └── simple-showcase.svelte
```

This approach proves that **less is more** - you can build beautiful, functional UIs with minimal code and complexity.
