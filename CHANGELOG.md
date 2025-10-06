# Changelog

All notable changes to this project will be documented in this file.

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
