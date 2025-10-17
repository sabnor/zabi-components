# Svelte 5 Build Fix - Undefined Variables Issue

## Problem

When using zabi-components in another project, the following error occurred:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'call')
    at Ct (Heading-DZ_OLcWU.js:776:13)
```

The issue was in the compiled `Heading-DZ_OLcWU.js` file where variables `Sn`, `kn`, and `Cn` were declared but never assigned values:

```javascript
var Sn, kn, Cn;
function Ct(e) {
  return kn.call(e);  // kn is undefined!
}
```

## Root Cause

The build configuration in `vite.lib.config.ts` was using:
- `preserveModules: false` - This caused Vite/Rollup to bundle all modules into single chunks
- Incomplete external configuration - The Svelte internal modules weren't properly externalized

This caused the Svelte 5 compiler's internal functions to be incorrectly bundled, resulting in uninitialized variables.

## Solution

Updated `vite.lib.config.ts` with the following changes:

### 1. Removed `hydratable` option
```diff
- compilerOptions: {
-     css: 'injected',
-     runes: true,
-     hydratable: true
- }
+ compilerOptions: {
+     css: 'injected',
+     runes: true
+ }
```
The `hydratable` option has been removed in Svelte 5 as all components are now hydratable by default.

### 2. Updated external configuration
```diff
- external: ['svelte', 'svelte/store', '@sveltejs/kit', ...]
+ external: [
+     /^svelte($|\/)/,  // Match svelte and all svelte/* imports
+     '@sveltejs/kit',
+     '@sveltejs/adapter-auto',
+     '$app/environment',
+     'react'
+ ]
```
Using a regex pattern ensures ALL Svelte imports (including `svelte/internal/client`, `svelte/internal/disclose-version`, etc.) are properly externalized.

### 3. Enabled module preservation
```diff
- output: {
-     format: 'es',
-     preserveModules: false
- }
+ output: {
+     format: 'es',
+     preserveModules: true,
+     preserveModulesRoot: 'src'
+ }
```
This ensures each module is preserved as a separate file, preventing the bundling issues that caused the undefined variables.

## Results

### Before
```
dist/
  - Heading-DZ_OLcWU.js  (71.43 kB - monolithic bundle with errors)
```

### After
```
dist/
  - components/
    - atoms/
      - Heading.svelte/
        - index.js  (3.07 kB - clean, properly externalized)
```

The new build:
- ✅ Properly imports from `svelte/internal/client`
- ✅ No undefined variables
- ✅ Smaller file sizes per component
- ✅ Better tree-shaking in consuming projects
- ✅ Proper module resolution

## Testing

To verify the fix works:

1. Rebuild the library: `npm run build:lib`
2. Check the Heading component output at `dist/components/atoms/Heading.svelte/index.js`
3. Verify it imports from `svelte/internal/client` (externalized)
4. Test in consuming project - the error should be resolved

## Impact

All components now build correctly with Svelte 5 runes syntax. The consuming project will need to:
- Have `svelte` as a dependency (it's a peer dependency)
- Import components normally: `import { Heading } from 'zabi-components/atoms'`

No breaking changes to the API - only the internal build structure changed.

