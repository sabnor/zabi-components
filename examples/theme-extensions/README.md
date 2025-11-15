# Theme Extension Examples

This directory contains example configurations showing different ways to extend and customize the Zabi Components theme.

## Examples

### 01-basic-extension.css
Basic theme extension with custom fonts. Shows the minimal setup for extending the theme.

### 02-custom-brand-colors.css
Override the brand color palette with your own colors. Useful for rebranding while keeping the semantic color system.

### 03-custom-semantic-colors.css
Customize semantic colors (primary, secondary, etc.) without changing the underlying color scales. Good for quick theme adjustments.

### 04-dark-mode-customization.css
Customize both light and dark mode colors. Shows how to import dark theme and override specific values.

### 05-multiple-variants.css
Create multiple theme variants that can be toggled at runtime. Useful for theme switchers or A/B testing.

## Usage

Copy the example that matches your needs into your `app.css` or main stylesheet. Make sure to:

1. Import Tailwind CSS first (if using `theme-only`)
2. Import the Zabi theme
3. Add your custom `@theme` block
4. Import Zabi components CSS last

## Important Notes

- Always maintain the correct import order
- Use `theme-only` if you already have Tailwind CSS
- Use `theme` if you don't have Tailwind CSS set up
- Dark mode requires importing the dark theme file
- Custom colors should use `var()` for referencing, not `theme()` (unless referencing Tailwind defaults)

