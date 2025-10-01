// Storybook Stories Index
// This file exports all stories for easy discovery and organization

// Atoms
export { default as BadgeStories } from './Badge.stories';
export { default as ButtonStories } from './Button.stories';
export { default as CardStories } from './Card.stories';
export { default as CheckboxStories } from './Checkbox.stories';
export { default as ColorPickerStories } from './ColorPicker.stories';
export { default as HeadingStories } from './Heading.stories';
export { default as InputStories } from './Input.stories';
export { default as OptimizedImageStories } from './OptimizedImage.stories';
export { default as PerformanceMonitorStories } from './PerformanceMonitor.stories';
export { default as ScaleDemoStories } from './ScaleDemo.stories';
export { default as SelectStories } from './Select.stories';
export { default as SkeletonStories } from './Skeleton.stories';
export { default as TextAlignmentStories } from './TextAlignment.stories';
export { default as TextareaStories } from './Textarea.stories';
export { default as ThemeToggleStories } from './ThemeToggle.stories';
export { default as ToggleStories } from './Toggle.stories';

// Molecules
export { default as AlertStories } from './Alert.stories';
export { default as DropdownStories } from './Dropdown.stories';
export { default as ImageUploadStories } from './ImageUpload.stories';
export { default as KeyValueFormStories } from './KeyValueForm.stories';
export { default as ModalStories } from './Modal.stories';
export { default as SlideUpStories } from './SlideUp.stories';

// Organisms
export { default as NotificationManagerStories } from './NotificationManager.stories';

// Story Categories
export const storyCategories = {
    atoms: [
        'Badge',
        'Button',
        'Card',
        'Checkbox',
        'ColorPicker',
        'Heading',
        'Input',
        'OptimizedImage',
        'PerformanceMonitor',
        'ScaleDemo',
        'Select',
        'Skeleton',
        'TextAlignment',
        'Textarea',
        'ThemeToggle',
        'Toggle'
    ],
    molecules: [
        'Alert',
        'Dropdown',
        'ImageUpload',
        'KeyValueForm',
        'Modal',
        'SlideUp'
    ],
    organisms: [
        'NotificationManager'
    ]
} as const;

// Component count
export const componentCount = {
    atoms: storyCategories.atoms.length,
    molecules: storyCategories.molecules.length,
    organisms: storyCategories.organisms.length,
    total: storyCategories.atoms.length + storyCategories.molecules.length + storyCategories.organisms.length
};
