// Storybook Stories Index
// This file exports all stories for easy discovery and organization
// One line per *.stories.ts file, in alphabetical order within each layer.

// Atoms
export { default as ActionPanelStories } from './atoms/ActionPanel.stories';
export { default as BadgeStories } from './atoms/Badge.stories';
export { default as ButtonStories } from './atoms/Button.stories';
export { default as CardStories } from './atoms/Card.stories';
export { default as CheckboxStories } from './atoms/Checkbox.stories';
export { default as CodeBlockStories } from './atoms/CodeBlock.stories';
export { default as ColorPickerStories } from './atoms/ColorPicker.stories';
export { default as ContainerStories } from './atoms/Container.stories';
export { default as DateFieldStories } from './atoms/DateField.stories';
export { default as DividerStories } from './atoms/Divider.stories';
export { default as FeatureCardStories } from './atoms/FeatureCard.stories';
export { default as FloatingActionButtonStories } from './atoms/FloatingActionButton.stories';
export { default as HeadingStories } from './atoms/Heading.stories';
export { default as IconButtonStories } from './atoms/IconButton.stories';
export { default as InputStories } from './atoms/Input.stories';
export { default as ListStories } from './atoms/List.stories';
export { default as ListItemStories } from './atoms/ListItem.stories';
export { default as OptimizedImageStories } from './atoms/OptimizedImage.stories';
export { default as ProgressStories } from './atoms/Progress.stories';
export { default as RatingStories } from './atoms/Rating.stories';
export { default as SelectStories } from './atoms/Select.stories';
export { default as SkeletonStories } from './atoms/Skeleton.stories';
export { default as SliderStories } from './atoms/Slider.stories';
export { default as SpinnerStories } from './atoms/Spinner.stories';
export { default as TableStories } from './atoms/Table.stories';
export { default as TextStories } from './atoms/Text.stories';
export { default as TextareaStories } from './atoms/Textarea.stories';
export { default as ThemeToggleStories } from './atoms/ThemeToggle.stories';
export { default as TimeFieldStories } from './atoms/TimeField.stories';
export { default as ToastStories } from './atoms/Toast.stories';
export { default as ToggleStories } from './atoms/Toggle.stories';
export { default as TooltipStories } from './atoms/Tooltip.stories';

// Molecules
export { default as AlertStories } from './molecules/Alert.stories';
export { default as AppBarStories } from './molecules/AppBar.stories';
export { default as BottomSheetStories } from './molecules/BottomSheet.stories';
export { default as BottomTabBarStories } from './molecules/BottomTabBar.stories';
export { default as CalendarStories } from './molecules/Calendar.stories';
export { default as CollapsibleStories } from './molecules/Collapsible.stories';
export { default as ConfirmDialogStories } from './molecules/ConfirmDialog.stories';
export { default as ContactFormStories } from './molecules/ContactForm.stories';
export { default as DrawerStories } from './molecules/Drawer.stories';
export { default as DropdownStories } from './molecules/Dropdown.stories';
export { default as EmptyStateStories } from './molecules/EmptyState.stories';
export { default as FormStories } from './molecules/Form.stories';
export { default as FormFieldStories } from './molecules/FormField.stories';
export { default as ImageUploadStories } from './molecules/ImageUpload.stories';
export { default as MediaGridStories } from './molecules/MediaGrid.stories';
export { default as ModalStories } from './molecules/Modal.stories';
export { default as NavigationMenuStories } from './molecules/NavigationMenu.stories';
export { default as PageStories } from './molecules/Page.stories';
export { default as SectionStories } from './molecules/Section.stories';
export { default as SegmentedControlStories } from './molecules/SegmentedControl.stories';
export { default as SlideUpStories } from './molecules/SlideUp.stories';
export { default as SortableListStories } from './molecules/SortableList.stories';
export { default as StickyActionBarStories } from './molecules/StickyActionBar.stories';
export { default as TabsStories } from './molecules/Tabs.stories';
export { default as ToasterStories } from './molecules/Toaster.stories';
export { default as UnsavedChangesBarStories } from './molecules/UnsavedChangesBar.stories';

// Organisms
export { default as AppShellStories } from './organisms/AppShell.stories';
export { default as AppShellGlassStories } from './organisms/AppShellGlass.stories';
export { default as SidebarNavigationStories } from './organisms/SidebarNavigation.stories';
export { default as SidebarNavigationAccountPanelDemoStories } from './organisms/SidebarNavigationAccountPanelDemo.stories';
export { default as SidebarPanelStories } from './organisms/SidebarPanel.stories';
export { default as TopNavbarStories } from './organisms/TopNavbar.stories';
export { default as TopNavbarInlineNavStories } from './organisms/TopNavbarInlineNav.stories';

// Story Categories
export const storyCategories = {
    atoms: [
        'ActionPanel',
        'Badge',
        'Button',
        'Card',
        'Checkbox',
        'CodeBlock',
        'ColorPicker',
        'Container',
        'DateField',
        'Divider',
        'FeatureCard',
        'FloatingActionButton',
        'Heading',
        'IconButton',
        'Input',
        'List',
        'ListItem',
        'OptimizedImage',
        'Progress',
        'Rating',
        'Select',
        'Skeleton',
        'Slider',
        'Spinner',
        'Table',
        'Text',
        'Textarea',
        'ThemeToggle',
        'TimeField',
        'Toast',
        'Toggle',
        'Tooltip',
    ],
    molecules: [
        'Alert',
        'AppBar',
        'BottomSheet',
        'BottomTabBar',
        'Calendar',
        'Collapsible',
        'ConfirmDialog',
        'ContactForm',
        'Drawer',
        'Dropdown',
        'EmptyState',
        'Form',
        'FormField',
        'ImageUpload',
        'MediaGrid',
        'Modal',
        'NavigationMenu',
        'Page',
        'Section',
        'SegmentedControl',
        'SlideUp',
        'SortableList',
        'StickyActionBar',
        'Tabs',
        'Toaster',
        'UnsavedChangesBar',
    ],
    organisms: [
        'AppShell',
        'AppShellGlass',
        'SidebarNavigation',
        'SidebarNavigationAccountPanelDemo',
        'SidebarPanel',
        'TopNavbar',
        'TopNavbarInlineNav',
    ],
} as const;

// Component count
export const componentCount = {
    atoms: storyCategories.atoms.length,
    molecules: storyCategories.molecules.length,
    organisms: storyCategories.organisms.length,
    total: storyCategories.atoms.length + storyCategories.molecules.length + storyCategories.organisms.length
};
