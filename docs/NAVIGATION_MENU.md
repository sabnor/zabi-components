# NavigationMenu Component

A compound navigation menu component inspired by [shadcn/ui's Navigation Menu](https://ui.shadcn.com/docs/components/navigation-menu), adapted for Svelte and zabi-components.

## Overview

The NavigationMenu is a flexible, accessible navigation component that supports nested dropdowns with rich content, icons, descriptions, and complex layouts. It follows the compound component pattern for maximum flexibility.

## Components

The NavigationMenu consists of several sub-components that work together:

- **NavigationMenu** - Root container component
- **NavigationMenuList** - Container for menu items
- **NavigationMenuItem** - Individual menu item wrapper
- **NavigationMenuTrigger** - Button that opens/closes dropdown content
- **NavigationMenuContent** - Dropdown content panel
- **NavigationMenuLink** - Link component for navigation

## Features

### ✨ Key Features

- **Compound Component Pattern** - Flexible composition with multiple sub-components
- **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape, etc.)
- **Mobile Responsive** - Automatic mobile viewport detection
- **Click Outside to Close** - Automatically closes when clicking outside
- **Accessible** - ARIA attributes and semantic HTML
- **TypeScript** - Fully typed with TypeScript
- **Tailwind CSS** - Styled with utility classes

### 🎯 Comparison with shadcn/ui

| Feature | shadcn/ui | zabi-components |
|---------|-----------|-----------------|
| Compound Components | ✅ | ✅ |
| Keyboard Navigation | ✅ | ✅ |
| Mobile Viewport | ✅ | ✅ |
| Rich Content Support | ✅ | ✅ |
| Icons Support | ✅ | ✅ |
| Descriptions | ✅ | ✅ |
| Click Outside | ✅ | ✅ |
| TypeScript | ✅ | ✅ |
| Framework | React | Svelte |

## Usage

### Basic Example

```svelte
<script>
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
    <NavigationMenuItem value="home">
      <NavigationMenuTrigger value="home">Home</NavigationMenuTrigger>
      <NavigationMenuContent value="home">
        <NavigationMenuLink href="/">Introduction</NavigationMenuLink>
        <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    
    <NavigationMenuItem value="docs">
      <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### With Rich Content

```svelte
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="components">
      <NavigationMenuTrigger value="components">Components</NavigationMenuTrigger>
      <NavigationMenuContent value="components">
        <ul class="grid gap-2 md:w-[500px] md:grid-cols-2">
          <NavigationMenuLink href="/components/button">
            <div class="text-sm font-medium">Button</div>
            <p class="text-sm text-description">
              A clickable button component with multiple variants.
            </p>
          </NavigationMenuLink>
          <NavigationMenuLink href="/components/input">
            <div class="text-sm font-medium">Input</div>
            <p class="text-sm text-description">
              A form input component with validation support.
            </p>
          </NavigationMenuLink>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### With Icons

```svelte
<script>
  import { CircleCheck, CircleHelp, Circle } from 'lucide-svelte';
</script>

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="status">
      <NavigationMenuTrigger value="status">Status</NavigationMenuTrigger>
      <NavigationMenuContent value="status">
        <ul class="grid gap-4">
          <NavigationMenuLink href="#" className="flex items-center gap-2">
            <CircleHelp class="h-4 w-4" />
            Backlog
          </NavigationMenuLink>
          <NavigationMenuLink href="#" className="flex items-center gap-2">
            <Circle class="h-4 w-4" />
            To Do
          </NavigationMenuLink>
          <NavigationMenuLink href="#" className="flex items-center gap-2">
            <CircleCheck class="h-4 w-4" />
            Done
          </NavigationMenuLink>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## API Reference

### NavigationMenu

Root container component.

**Props:**
- `viewport?: boolean | "mobile"` - Enable viewport for mobile responsiveness (default: `true`)
- `className?: string` - Additional CSS classes

### NavigationMenuList

Container for menu items.

**Props:**
- `className?: string` - Additional CSS classes

### NavigationMenuItem

Individual menu item wrapper.

**Props:**
- `value?: string` - Unique identifier for the menu item
- `className?: string` - Additional CSS classes

### NavigationMenuTrigger

Button that opens/closes dropdown content.

**Props:**
- `value?: string` - Must match the value of the corresponding NavigationMenuItem
- `className?: string` - Additional CSS classes

### NavigationMenuContent

Dropdown content panel.

**Props:**
- `value?: string` - Must match the value of the corresponding NavigationMenuItem
- `className?: string` - Additional CSS classes

### NavigationMenuLink

Link component for navigation.

**Props:**
- `href?: string` - Link URL (default: `"#"`)
- `asChild?: boolean` - Render as child element instead of anchor tag
- `className?: string` - Additional CSS classes

## Keyboard Navigation

- **Enter/Space** - Open/close dropdown
- **Arrow Down** - Open dropdown (when closed)
- **Escape** - Close dropdown
- **Tab** - Navigate between items

## Accessibility

- Proper ARIA attributes (`aria-expanded`, `aria-haspopup`, `role="menubar"`, etc.)
- Keyboard navigation support
- Focus management
- Semantic HTML structure

## Styling

The component uses Tailwind CSS utility classes and follows the zabi-components design system. All colors, spacing, and typography are theme-aware and respect dark mode.

## Examples

See the Storybook stories in `src/stories/molecules/NavigationMenu.stories.ts` for more examples including:
- Default navigation menu
- Simple list menu
- Menu with icons
- Menu with descriptions

## Differences from shadcn/ui

1. **Framework**: Built for Svelte instead of React
2. **Context API**: Uses Svelte's context API instead of React Context
3. **State Management**: Uses Svelte's `$state` and `$derived` instead of React hooks
4. **Styling**: Uses Tailwind CSS classes directly (no CSS variables for viewport width)
5. **Viewport**: Simplified viewport handling (no separate Viewport component)

## Future Enhancements

Potential improvements inspired by shadcn/ui:
- [ ] NavigationMenuViewport component for better positioning
- [ ] NavigationMenuIndicator for visual feedback
- [ ] Animation improvements
- [ ] Better mobile menu handling
- [ ] Sub-menu support (nested navigation)
