import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Create dist directory if it doesn't exist
mkdirSync('dist', { recursive: true });

// Generate main index.d.ts
const mainDeclaration = `// Main library entry point
// Re-export all components from their respective categories

// Atomic Components
export * from './atoms/index.js';

// Molecular Components  
export * from './molecules/index.js';

// Organism Components
export * from './organisms/index.js';

// Re-export types
export type { FieldConfig } from './molecules/KeyValueForm.types.js';
`;

writeFileSync('dist/index.d.ts', mainDeclaration);

// Generate atoms index.d.ts
const atomsDeclaration = `// Atomic Components - Basic building blocks
export { default as Badge } from './Badge.svelte';
export { default as Button } from './Button.svelte';
export { default as Card } from './Card.svelte';
export { default as Checkbox } from './Checkbox.svelte';
export { default as ColorPicker } from './ColorPicker.svelte';
export { default as Heading } from './Heading.svelte';
export { default as Input } from './Input.svelte';
export { default as OptimizedImage } from './OptimizedImage.svelte';
export { default as DebugPanel } from './PerformanceMonitor.svelte';
export { default as Select } from './Select.svelte';
export { default as Skeleton } from './Skeleton.svelte';
export { default as Textarea } from './Textarea.svelte';
export { default as TextAlignment } from './TextAlignment.svelte';
export { default as Toggle } from './Toggle.svelte';
`;

writeFileSync('dist/atoms/index.d.ts', atomsDeclaration);

// Generate molecules index.d.ts
const moleculesDeclaration = `// Molecular Components - Simple combinations of atoms
export { default as Alert } from './Alert.svelte';
export { default as Modal } from './Modal.svelte';
export { default as FileUpload } from './ImageUpload.svelte';
export { default as DynamicForm } from './KeyValueForm.svelte';
export { default as Dropdown } from './Dropdown.svelte';
export { default as SlideUp } from './SlideUp.svelte';

// Types
export type { FieldConfig } from './KeyValueForm.types';
`;

writeFileSync('dist/molecules/index.d.ts', moleculesDeclaration);

// Generate KeyValueForm.types.d.ts
const keyValueFormTypes = `// Field configuration for DynamicForm component
export interface FieldConfig {
    key: string;
    type: "text" | "email" | "password" | "number" | "textarea" | "select" | "checkbox" | "toggle" | "colorpicker" | "textalignment";
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: Array<{ value: string | number; label: string; disabled?: boolean }>;
    rows?: number;
    flex?: "1" | "full";
}
`;

writeFileSync('dist/molecules/KeyValueForm.types.d.ts', keyValueFormTypes);

// Generate organisms index.d.ts
const organismsDeclaration = `// Organism Components - Complex components with state management
export { default as ToastContainer } from './NotificationManager.svelte';
`;

writeFileSync('dist/organisms/index.d.ts', organismsDeclaration);

console.log('TypeScript declaration files generated successfully!');
