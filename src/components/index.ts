export { default as Toggle } from './atoms/Toggle.svelte';
export { default as Badge } from './atoms/Badge.svelte';
export { default as Button } from './atoms/Button.svelte';
export { default as IconButton } from './atoms/IconButton.svelte';
export { default as Card } from './atoms/Card.svelte';
export { default as CardHeader } from './atoms/CardHeader.svelte';
export { default as CardContent } from './atoms/CardContent.svelte';
export { default as CardFooter } from './atoms/CardFooter.svelte';
export { default as Input } from './atoms/Input.svelte';
export { default as Textarea } from './atoms/Textarea.svelte';
export { default as Select } from './atoms/Select.svelte';
export { default as Slider } from './atoms/Slider.svelte';
export { default as ColorPicker } from './atoms/ColorPicker.svelte';
export { default as List } from './atoms/List.svelte';
export { default as ListItem } from './atoms/ListItem.svelte';
export { default as Heading } from './atoms/Heading.svelte';
export { default as ThemeToggle } from './atoms/ThemeToggle.svelte';
export {
    DEFAULT_THEME_STORAGE_KEY,
    THEME_MODES,
    getStoredThemeMode,
    getThemeMode,
    isThemeDark,
    isThemeMode,
    setThemeMode,
    storeThemeMode,
    themeInitScript,
} from './util/theme-mode.js';
export type { SetThemeModeOptions, ThemeMode, ThemeToggleLabels } from './util/theme-mode.js';
export { default as Divider } from './atoms/Divider.svelte';
export { default as Container } from './atoms/Container.svelte';
export { default as Text } from './atoms/Text.svelte';
export { default as Table } from './atoms/Table.svelte';
export { default as Toast } from './atoms/Toast.svelte';
export { default as Tooltip } from './atoms/Tooltip.svelte';
export { default as Progress } from './atoms/Progress.svelte';
export { default as Skeleton } from './atoms/Skeleton.svelte';
export { default as Checkbox } from './atoms/Checkbox.svelte';
export { default as Radio } from './atoms/Radio.svelte';
export { default as CodeBlock } from './atoms/CodeBlock.svelte';
export { default as FeatureCard } from './atoms/FeatureCard.svelte';
export { default as OptimizedImage } from './atoms/OptimizedImage.svelte';
export { default as ActionPanel } from './atoms/ActionPanel.svelte';
export { default as Spinner } from './atoms/Spinner.svelte';
export { default as Rating } from './atoms/Rating.svelte';
export type { RatingStrings } from './util/rating.js';
export { default as FloatingActionButton } from './atoms/FloatingActionButton.svelte';
export { default as DateField } from './atoms/DateField.svelte';
export { default as TimeField } from './atoms/TimeField.svelte';

export { default as Alert } from './molecules/Alert.svelte';
export { default as ComponentDemo } from './molecules/ComponentDemo.svelte';
export { default as ContactForm } from './molecules/ContactForm.svelte';
export { default as Dropdown } from './molecules/Dropdown.svelte';
export { default as DropdownItem } from './molecules/DropdownItem.svelte';
export type {
    DropdownItemIcon,
    DropdownItemTone,
    DropdownOption,
} from './util/dropdown.js';
export { default as Form } from './molecules/Form.svelte';
export { default as FormField } from './molecules/FormField.svelte';
export { default as Header } from './molecules/Header.svelte';
export { default as EmptyState } from './molecules/EmptyState.svelte';
export { default as Toaster } from './molecules/Toaster.svelte';
export { default as ImageUpload } from './molecules/ImageUpload.svelte';
export { default as MediaGrid } from './molecules/MediaGrid.svelte';
export type {
    MediaGridItemType,
    MediaGridKey,
    MediaGridSelectDetail,
    MediaGridStrings,
} from './util/media-grid.js';
export { default as Modal } from './molecules/Modal.svelte';
export { default as SlideUp } from './molecules/SlideUp.svelte';
export { default as Tabs } from './molecules/Tabs.svelte';
export { default as RadioGroup } from './molecules/RadioGroup.svelte';
export { default as SegmentedControl } from './molecules/SegmentedControl.svelte';
export type {
    SegmentedControlIcon,
    SegmentedControlOption,
} from './util/segmented-control.js';
export { default as NavigationMenu } from './molecules/NavigationMenu.svelte';
export { default as NavigationMenuList } from './molecules/NavigationMenuList.svelte';
export { default as NavigationMenuItem } from './molecules/NavigationMenuItem.svelte';
export { default as NavigationMenuTrigger } from './molecules/NavigationMenuTrigger.svelte';
export { default as NavigationMenuContent } from './molecules/NavigationMenuContent.svelte';
export { default as NavigationMenuLink } from './molecules/NavigationMenuLink.svelte';
export { default as Page } from './molecules/Page.svelte';
export { default as Section } from './molecules/Section.svelte';
export { default as SidebarBrandHeader } from './molecules/SidebarBrandHeader.svelte';
export { default as SidebarFooter } from './molecules/SidebarFooter.svelte';
export { default as SidebarNavSection } from './molecules/SidebarNavSection.svelte';
export { default as SortableList } from './molecules/SortableList.svelte';
export type {
    SortableListAnnouncement,
    SortableListReorderDetail,
    SortableListRow,
    SortableListStrings,
} from './util/sortable-list.js';
export { default as Collapsible } from './molecules/Collapsible.svelte';
export { default as CollapsibleGroup } from './molecules/CollapsibleGroup.svelte';
export type {
    CollapsibleHeadingLevel,
    CollapsibleTriggerProps,
    CollapsibleTriggerState,
} from './util/collapsible.js';
export { default as ConfirmDialog } from './molecules/ConfirmDialog.svelte';
export type {
    ConfirmDialogCancelReason,
    ConfirmDialogResult,
    ConfirmDialogVariant,
} from './util/confirm-dialog.js';
export { default as Drawer } from './molecules/Drawer.svelte';
export type {
    DrawerCloseReason,
    DrawerSide,
    DrawerSize,
} from './util/drawer.js';
export { default as UnsavedChangesBar } from './molecules/UnsavedChangesBar.svelte';
export { default as AppBar } from './molecules/AppBar.svelte';
export { default as BottomTabBar } from './molecules/BottomTabBar.svelte';
export type {
    BottomTabBarIcon,
    BottomTabBarItem,
} from './util/bottom-tab-bar.js';
export { default as BottomSheet } from './molecules/BottomSheet.svelte';
export type {
    BottomSheetCloseReason,
    BottomSheetSnap,
} from './util/bottom-sheet.js';
export { default as StickyActionBar } from './molecules/StickyActionBar.svelte';
export { default as Calendar } from './molecules/Calendar.svelte';
export type {
    CalendarEvent,
    CalendarStrings,
    CalendarTone,
} from './util/calendar.js';
export { default as PhotoGrid } from './molecules/PhotoGrid.svelte';
export { default as PhotoViewer } from './molecules/PhotoViewer.svelte';
export type {
    Photo,
    PhotoGridSelectDetail,
    PhotoGridStrings,
    PhotoKey,
    PhotoViewerAction,
    PhotoViewerCloseReason,
    PhotoViewerStrings,
} from './util/photo.js';
export { default as Stepper } from './molecules/Stepper.svelte';
export type {
    StepperItem,
    StepperLayout,
    StepperStep,
    StepperStepState,
    StepperStrings,
} from './util/stepper.js';

export {
    toastStore,
    pushToast,
    dismissToast,
    focusToasts,
    type ToastItem,
    type ToastAction,
    type ToastLevel,
} from './molecules/toast-store.js';

export { default as TopNavbar } from './organisms/TopNavbar.svelte';
export { default as SidebarNavigation } from './organisms/SidebarNavigation.svelte';
export { default as SidebarShell } from './organisms/SidebarShell.svelte';
export { default as SidebarAccountPanel } from './organisms/SidebarAccountPanel.svelte';
export { default as SidebarPanel } from './organisms/SidebarPanel.svelte';
export { default as AppShell } from './organisms/AppShell.svelte';

import { generateId } from './util/ssr-safe.js';

export { generateId };

/**
 * Dates and times for reading, in the page's language: what a DateField or a
 * TimeField holds (`2026-10-06`, `19:00`) as "6 okt. 2026" and "19:00".
 */
export { formatDate, formatTime } from './util/date.js';

export const createId = (prefix: string = 'id'): string => generateId(prefix);

export const cn = (...classes: (string | undefined | null | false)[]): string =>
    classes.filter(Boolean).join(' ');

export const getFormData = (form: HTMLFormElement): Record<string, unknown> => {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateRequired = (value: unknown): boolean => {
    return value !== null && value !== undefined && value !== '';
};

export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
};

export const safeWindow = (): Window | undefined => {
    return typeof window !== 'undefined' ? window : undefined;
};

export const safeDocument = (): Document | undefined => {
    return typeof window !== 'undefined' ? document : undefined;
};

export const safeLocalStorage = (): Storage | undefined => {
    return typeof window !== 'undefined' ? localStorage : undefined;
};

export { default as Sun } from '@lucide/svelte/icons/sun';
export { default as Moon } from '@lucide/svelte/icons/moon';
export { default as Monitor } from '@lucide/svelte/icons/monitor';
export { default as Grip } from '@lucide/svelte/icons/grip';
export { default as GripVertical } from '@lucide/svelte/icons/grip-vertical';
export { default as ChevronUp } from '@lucide/svelte/icons/chevron-up';
export { default as ChevronDown } from '@lucide/svelte/icons/chevron-down';
export { default as ChevronRight } from '@lucide/svelte/icons/chevron-right';
export { default as Zap } from '@lucide/svelte/icons/zap';
export { default as Briefcase } from '@lucide/svelte/icons/briefcase';
export { default as Clipboard } from '@lucide/svelte/icons/clipboard';
export { default as Settings } from '@lucide/svelte/icons/settings';
