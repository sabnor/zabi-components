# Storybook Stories

This directory contains Storybook stories for all components in the zabi-components library. The stories are organized by component type and provide comprehensive examples and interactive controls.

## Structure

### Atoms
Basic building blocks of the UI system:

- **Badge** - Status indicators with various styles and states
- **Button** - Interactive buttons with multiple variants and sizes
- **Card** - Container components with different densities and variants
- **Checkbox** - Form input with various states and configurations
- **ColorPicker** - Color selection component with predefined palettes
- **Heading** - Typography component with different levels and styles
- **Input** - Text input with validation states and various types
- **OptimizedImage** - Image component with lazy loading and error handling
- **PerformanceMonitor** - Development tool for monitoring performance metrics
- **Select** - Dropdown selection component with search and clear options
- **Skeleton** - Loading placeholders with customizable dimensions
- **TextAlignment** - Text alignment selector with visual controls
- **Textarea** - Multi-line text input with resize options
- **Toggle** - Switch component for boolean values

### Molecules
Combinations of atoms that form more complex UI elements:

- **Alert** - Notification messages with different types and dismissibility
- **Dropdown** - Contextual menus with positioning options
- **ImageUpload** - File upload component with preview and existing image selection
- **KeyValueForm** - Dynamic form generator with various field types
- **Modal** - Overlay dialogs with backdrop and keyboard navigation
- **SlideUp** - Mobile-friendly bottom sheet component
- **Tabs** - Tabbed interface for organizing content

### Organisms
Complex components that manage state and combine multiple molecules:

- **Navbar** - Sticky navigation bar with brand, menu items, and actions
- **Navigation** - Navigation component with header and sidebar variants

## Usage

Each story provides:

1. **Interactive Controls** - Storybook controls to modify component props
2. **Multiple Variants** - Different states, sizes, and configurations
3. **Real Examples** - Practical usage scenarios
4. **Accessibility** - ARIA attributes and keyboard navigation
5. **Responsive Design** - Mobile-first approach with breakpoints

## Development

To run Storybook locally:

```bash
npm run storybook
```

To build Storybook for production:

```bash
npm run build-storybook
```

## Story Conventions

- Use descriptive story names that explain the purpose
- Include both basic and advanced examples
- Show different states (loading, error, success, disabled)
- Demonstrate responsive behavior
- Include accessibility features
- Use consistent naming for similar patterns across components

## Component Integration

All components are properly typed with TypeScript and follow the established patterns:

- Consistent prop naming and structure
- Event dispatching for user interactions
- Accessibility attributes and keyboard navigation
- Responsive design with Tailwind CSS
- Error handling and validation states
