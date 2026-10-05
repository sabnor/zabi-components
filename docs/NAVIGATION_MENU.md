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
- **Fits narrow screens** - The list wraps onto further rows, and an open panel is kept inside the screen
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
- `viewport?: boolean | "mobile"` - Sets `isMobile` on the menu's context: `true` (the default) makes it true while the window is under 768px wide, `"mobile"` always, `false` never. **It has no effect of its own.** No component in the library reads `isMobile`; it is there for your own children to read with `getContext`. What the menu does on a narrow screen (below) does not depend on it.
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

- **Tab** - Through the triggers and links, and through the links of an open panel
- **Enter/Space** on a trigger - Open or close its panel
- **Arrow Down** on a closed trigger - Open its panel
- **Escape** - Close the panel; from inside it, focus returns to its trigger

There are no arrow keys between the top-level items. That is deliberate: see below.

## Accessibility

NavigationMenu is the **disclosure navigation** pattern, which the WAI-ARIA
Authoring Practices recommend for site navigation: a `<nav>` landmark holding a
list of links and of buttons that each show or hide a panel of links.

- `<nav aria-label="…">` - the landmark; name it with `ariaLabel`
- `NavigationMenuList` - a `<ul role="list">`; each `NavigationMenuItem` is an `<li>`
- `NavigationMenuTrigger` - a `<button>` with `aria-expanded` and `aria-controls`
- `NavigationMenuContent` - the panel the trigger names; its links are plain links
- `NavigationMenuLink` - an `<a>`

It is not a menu bar. Until 8.1.0 the list had `role="menubar"` and its items
`role="none"`, but nothing had `role="menuitem"` and the arrow keys did
nothing, so assistive technology announced a menu bar that did not behave like
one. What changed for a screen reader user:

| | Before | Now |
|---|---|---|
| The list | "menu bar" (often with no items counted) | "list, N items" inside the navigation landmark |
| Each item | not announced (presentational) | a list item |
| A trigger | "button, collapsed / expanded" | the same |
| A link | "link" | the same |
| Arrow keys | expected by the role, did nothing | not expected; Tab moves between items |

Nothing changed for the keyboard or the mouse, and no prop changed. If you
need a real menu bar (an application's File / Edit / View), build it on
`Dropdown`, whose menu has the `menu` and `menuitem` roles and the arrow keys.
`NavigationMenuList` passes other attributes through, so a `role` of your own
still wins.

## Styling

The component uses Tailwind CSS utility classes and follows the zabi-components design system. All colors, spacing, and typography are theme-aware and respect dark mode.

## Examples

See the Storybook stories in `src/stories/molecules/NavigationMenu.stories.ts` for more examples including:
- Default navigation menu
- Simple list menu
- Menu with icons
- Menu with descriptions

## Narrow screens

- **The list wraps.** `NavigationMenuList` is a wrapping row: triggers that do not fit go onto a further row instead of running out of the container. Nothing scrolls sideways.
- **A panel stays on screen.** `NavigationMenuContent` opens below its item from the item's left edge, as before. When that would put it past the edge of the viewport it is slid back, to 8px from the edge, and a panel wider than the screen is limited to the viewport less 16px. It is measured before it is painted and again when the window is resized or scrolled. A panel that fits is not touched: it has no inline style.
- **A box that scrolls does not cut it off.** When the menu sits in a box that scrolls (a header strip that scrolls sideways, say) and the panel would be clipped by it, the panel is placed against the viewport with `position: fixed` and reaches out of the box. It stays where it is in the DOM, so Escape, an outside press and focus work as before. It cannot leave an ancestor that has a `transform`, a `filter` or `contain`; there it is cut where the box ends.
- This uses the same helper as Dropdown and Tooltip, `src/components/util/fit-in-viewport.ts`.

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
