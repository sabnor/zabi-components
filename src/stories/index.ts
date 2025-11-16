// Storybook Stories Index
// This file exports all stories for easy discovery and organization

// Atoms
export { default as BadgeStories } from './atoms/Badge.stories';
export { default as ButtonStories } from './atoms/Button.stories';
export { default as CardStories } from './atoms/Card.stories';
export { default as CheckboxStories } from './atoms/Checkbox.stories';
export { default as ColorPickerStories } from './atoms/ColorPicker.stories';
export { default as HeadingStories } from './atoms/Heading.stories';
export { default as InputStories } from './atoms/Input.stories';
export { default as OptimizedImageStories } from './atoms/OptimizedImage.stories';
export { default as SelectStories } from './atoms/Select.stories';
export { default as SkeletonStories } from './atoms/Skeleton.stories';
export { default as TextareaStories } from './atoms/Textarea.stories';
export { default as ThemeToggleStories } from './atoms/ThemeToggle.stories';
export { default as ToggleStories } from './atoms/Toggle.stories';
export { default as TooltipStories } from './atoms/Tooltip.stories';

// Molecules
export { default as AlertStories } from './molecules/Alert.stories';
export { default as DropdownStories } from './molecules/Dropdown.stories';
export { default as ImageUploadStories } from './molecules/ImageUpload.stories';
export { default as ModalStories } from './molecules/Modal.stories';
export { default as SlideUpStories } from './molecules/SlideUp.stories';
export { default as TabsStories } from './molecules/Tabs.stories';

// Organisms
export { default as NavbarStories } from './organisms/Navbar.stories';
export { default as NavigationStories } from './organisms/Navigation.stories';

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
        'Select',
        'Skeleton',
        'Textarea',
        'ThemeToggle',
        'Toggle',
        'Tooltip'
    ],
    molecules: [
        'Alert',
        'Dropdown',
        'ImageUpload',
        'Modal',
        'SlideUp',
        'Tabs'
    ],
    organisms: [
        'Navbar',
        'Navigation'
    ]
} as const;

// Component count
export const componentCount = {
    atoms: storyCategories.atoms.length,
    molecules: storyCategories.molecules.length,
    organisms: storyCategories.organisms.length,
    total: storyCategories.atoms.length + storyCategories.molecules.length + storyCategories.organisms.length
};
