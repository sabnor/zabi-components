# Changelog

All notable changes to this project will be documented in this file.

## [2.0.2] - 2025-01-27

### 🎯 Major Simplification - "Less is More" Edition

#### ✨ Simplified Components
- **Massive Code Reduction**: Reduced component complexity by 60-80% across the board
- **Modern CSS-First Approach**: Replaced complex JavaScript with modern CSS-only solutions
- **Unified Form Component**: Consolidated 4 form components into 1 simple Form component
- **Removed Complex Managers**: Eliminated NotificationManager, ToastManager, and other complex utilities

#### 🔧 Atom Components Simplified
- **Badge**: Removed complex variants, icons, and animations - now just basic color variants
- **Button**: Simplified to 3 variants (primary, secondary, danger) with minimal props
- **Card**: Merged ModernCard into Card, removed complex styling and animations
- **Checkbox**: Removed complex validation, sizing, and custom CSS
- **Input**: Simplified to essential props only, removed complex validation system
- **Heading**: Clean heading component with just level and text props
- **Progress**: Basic progress bar with simple percentage display
- **Select**: Simplified dropdown with basic options support
- **Textarea**: Essential textarea with minimal configuration
- **Toggle**: Fixed-size toggle with simple on/off state
- **ThemeToggle**: Emoji-based theme switcher, removed complex styling
- **Toast**: Fixed-position toast with basic message display
- **Tooltip**: CSS-only positioning with data-placement attributes
- **Skeleton**: Simple loading placeholder with basic styling
- **TextAlignment**: Emoji-based alignment selector
- **OptimizedImage**: Basic image component with lazy loading
- **ColorPicker**: Simple color grid without complex dropdown logic

#### 🧩 Molecule Components Simplified
- **Dropdown**: CSS-only positioning, removed complex JavaScript calculations
- **ImageUpload**: Direct file selection, removed modal and progress bars
- **Form**: Unified form component, removed complex validation and field management
- **Modal**: Simple modal with basic backdrop and close functionality
- **SlideUp**: CSS-only slide-up panel, removed complex state management
- **Tabs**: Basic tab navigation with keyboard support, removed complex utilities

#### 🏗️ Organism Components Simplified
- **Navbar**: Responsive navbar with mobile menu, removed complex variants
- **Navigation**: Simple navigation list with active state
- **Removed Complex Components**: Deleted NavigationItem, NotificationManager, ToastManager

#### 🗑️ Removed Complexity
- **External Utility Functions**: Removed complex tabs-utils, navigation-utils
- **Complex Type Definitions**: Simplified event types and interfaces
- **Svelte Transitions**: Replaced with CSS-only animations
- **Custom CSS Variables**: Replaced with standard Tailwind classes
- **Complex State Management**: Simplified to essential state only
- **Redundant Folders**: Removed simple/ folder with duplicate exports

#### 🎨 Modern CSS Features
- **CSS-only Positioning**: Using `position: absolute` and `transform` for tooltips and dropdowns
- **CSS Pseudo-elements**: Using `::before` for arrows and indicators
- **CSS Data Attributes**: Using `data-placement` for component positioning
- **CSS Transitions**: Smooth animations handled entirely by CSS
- **Tailwind-First**: All styling using Tailwind utility classes

#### 📦 Package Improvements
- **Cleaner Structure**: Removed unnecessary abstraction layers
- **Direct Imports**: Components available from their natural locations
- **Simplified APIs**: Just the essential props needed for functionality
- **Better Performance**: Reduced JavaScript overhead and complexity

#### 🐛 Bug Fixes
- **Accessibility**: Fixed label associations and ARIA attributes
- **TypeScript**: Resolved all type errors and warnings
- **Linting**: Fixed all ESLint and Svelte warnings
- **Deprecation**: Replaced deprecated Lucide icons with emoji alternatives

### Breaking Changes
- **Removed Components**: KeyValueForm, ContactForm, ModernForm, NotificationManager, ToastManager
- **Simplified Props**: Many components now have fewer configuration options
- **Removed Variants**: Reduced complex variant systems to essential options only
- **Event Simplification**: Simplified event structures across all components

### Migration Guide
- **Form Components**: Use the unified `Form` component instead of multiple form variants
- **Complex Features**: Many complex features have been removed in favor of simplicity
- **Styling**: Components now use standard Tailwind classes instead of custom CSS variables
- **Imports**: Import components directly from atoms/, molecules/, organisms/ folders

## [1.1.1] - 2025-10-06

### Fixed
- Updated generated TypeScript definitions for better type safety
- Enhanced package structure with improved type exports
- Fixed build consistency and versioning

### Changed
- Updated internal build files and generated assets
- Improved TypeScript declaration file generation
- Enhanced package.json structure and exports

## [1.1.0] - 2025-10-05

### Added
- Comprehensive TypeScript definitions built into the library
- Self-contained type system - no custom type definitions needed in consumer apps
- Enhanced component type safety with proper event handling
- SSR-safe utilities for better SvelteKit compatibility

### Changed
- Updated build configuration for proper SvelteKit compatibility
- Removed SSR mode from library build (libraries should be client-side)
- Enhanced package.json exports for better module resolution
- Updated peer dependencies for Svelte 5 compatibility

### Fixed
- Fixed runtime errors with `Cannot read properties of null (reading 'f')`
- Fixed event handling for Svelte 5 compatibility
- Fixed TypeScript type inference for component props and events
- Fixed package exports for proper module resolution

### Removed
- Removed need for custom type definitions in consumer applications
- Removed unnecessary client-only component duplicates
- Removed SSR wrapper components (not needed)

### Breaking Changes
- None - this is a backward-compatible update

## [1.0.11] - Previous version
- Initial release with basic components

