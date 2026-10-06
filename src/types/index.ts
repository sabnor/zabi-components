// Types index file for zabi-components
// Re-export all types for easy importing

export * from './events.js';
export * from './variants.js';
export * from './page.types.js';

// Component type definitions
// Enhanced component type with proper event handling for Svelte 5
import type { Component, Snippet } from 'svelte';
import type {
    HTMLAnchorAttributes,
    HTMLAttributes,
    HTMLButtonAttributes,
    HTMLInputAttributes,
    HTMLTextareaAttributes,
} from 'svelte/elements';
import type { BottomTabBarItem } from '../components/util/bottom-tab-bar.js';
import type {
    AppShellNavigationContext,
    AppShellNavigationMode,
} from '../components/util/app-shell.js';
import type { CalendarEvent, CalendarStrings } from '../components/util/calendar.js';
import type {
    Photo,
    PhotoGridSelectDetail,
    PhotoGridStrings,
    PhotoKey,
    PhotoViewerAction,
    PhotoViewerCloseReason,
    PhotoViewerStrings,
} from '../components/util/photo.js';
import type {
    BottomSheetCloseReason,
    BottomSheetSnap,
} from '../components/util/bottom-sheet.js';
import type {
    BadgeVariant,
    ButtonSize,
    ButtonVariant,
    CardVariant,
    OnFillTone,
    ExtendedSemanticVariant,
    SemanticVariant,
    SizeVariant,
} from './variants.js';
import type { AvatarGroupStrings, AvatarPerson, AvatarSize } from '../components/util/avatar.js';
import type { ProgressStrings } from '../components/util/progress.js';
import type { RatingStrings } from '../components/util/rating.js';
import type {
    StepperItem,
    StepperLayout,
    StepperStrings,
} from '../components/util/stepper.js';
import type { SegmentedControlOption } from '../components/util/segmented-control.js';

export type ZabiComponent<T extends Record<string, any> = Record<string, any>, E extends Record<string, any> = Record<string, any>> = Component<T, E>;

/*
 * The `*Props` interfaces below describe what each component accepts today;
 * `tests/exported-types.test.ts` compares them with the component's own
 * `Props`, so they cannot drift again.
 *
 * Members marked `@deprecated` were exported by earlier versions but were
 * never props of the component. They stay so existing code keeps compiling,
 * and do nothing when passed.
 */

// Button component props and events
export interface ButtonProps extends Omit<HTMLButtonAttributes, 'class'> {
    /**
     * `success`, `warning`, `info` and `neutral` are deprecated: Button never
     * styled them, and they render as `primary`.
     */
    variant?: ButtonVariant | 'success' | 'warning' | 'info' | 'neutral';
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    /**
     * Where the link goes. Makes this an `<a>` that looks the same. While
     * `disabled` or `loading` it has no `href` and is `aria-disabled`.
     */
    href?: string;
    /** With `href`: where the link opens. */
    target?: HTMLAnchorAttributes['target'];
    /** With `href`: the link's relationship, such as `noopener`. */
    rel?: HTMLAnchorAttributes['rel'];
    /** With `href`: download the address instead of opening it. */
    download?: HTMLAnchorAttributes['download'];
    hreflang?: HTMLAnchorAttributes['hreflang'];
    referrerpolicy?: HTMLAnchorAttributes['referrerpolicy'];
    ping?: HTMLAnchorAttributes['ping'];
    text?: string;
    /** Stretch to the width of the container. */
    fullWidth?: boolean;
    /** @deprecated use `fullWidth`. */
    isFullWidth?: boolean;
    class?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
    /** @deprecated never accepted by the component; render the icon in `children`. */
    iconLeft?: string | any;
    /** @deprecated never accepted by the component; render the icon in `children`. */
    iconRight?: string | any;
    /** @deprecated never accepted by the component; use `aria-label`. */
    ariaLabel?: string;
    /** @deprecated never accepted by the component; use `aria-describedby`. */
    ariaDescribedBy?: string;
    /** @deprecated never accepted by the component; use `aria-expanded`. */
    ariaExpanded?: boolean;
    /** @deprecated never accepted by the component; use `aria-controls`. */
    ariaControls?: string;
    /** @deprecated never accepted by the component; use `aria-pressed`. */
    ariaPressed?: boolean;
}

export interface ButtonEvents {
    click: { value: boolean; event: MouseEvent };
}

// Heading component props
export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Visual size, when it should differ from the semantic level. */
    size?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Heading text. Ignored when `children` is provided. */
    text?: string;
    /** Text colour: `headline` by default; `inherit`, `on-brand` or `on-accent` on a filled block. */
    tone?: 'headline' | OnFillTone;
    class?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

// Card component props
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    variant?: CardVariant;
    size?: SizeVariant;
    fullWidth?: boolean;
    class?: string;
    /** @deprecated use `class`. */
    className?: string;
    onclick?: (event: MouseEvent) => void | Promise<void>;
    /** Required when card is interactive (has onclick) for accessibility */
    ariaLabel?: string;
    children?: Snippet;
}

// Input component props and events
export interface InputProps
    extends Omit<
        HTMLInputAttributes,
        | 'class'
        | 'size'
        | 'value'
        | 'type'
        | 'id'
        | 'name'
        | 'placeholder'
        | 'required'
        | 'disabled'
        | 'oninput'
        | 'onblur'
        | 'aria-label'
        | 'aria-describedby'
    > {
    /** Omit to auto-generate. */
    id?: string;
    type?: string;
    value?: string;
    name?: string;
    label?: string;
    /** True when a FormField supplies the visible label. */
    hideLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    loading?: boolean;
    size?: SizeVariant;
    variant?: SemanticVariant;
    /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
    message?: string;
    /** Help text under the field, read out with it. */
    hint?: string;
    /** An error under the field. It marks the field invalid and is announced; it wins over `variant` and `message`. */
    error?: string;
    /** Ids of other elements that describe the field. The hint and the message are added after them. */
    'aria-describedby'?: string | null;
    /** Drawn inside the field, before the text. */
    leading?: Snippet;
    /** Drawn inside the field, after the text. */
    trailing?: Snippet;
    /** With `type="password"`: adds a button that shows the password as text, and hides it again. */
    revealable?: boolean;
    /** Accessible name of that button, the same in both states. */
    revealLabel?: string;
    oninput?: (event: Event) => void;
    onblur?: (event: Event) => void;
    'aria-label'?: string;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface InputEvents {
    input: { value: string; event: Event };
    change: { value: string; event: Event };
    focus: { event: FocusEvent };
    blur: { event: FocusEvent };
}

// Checkbox component props and events
export interface CheckboxProps
    extends Omit<
        HTMLInputAttributes,
        'class' | 'id' | 'name' | 'value' | 'disabled' | 'checked' | 'type' | 'onchange'
    > {
    id?: string;
    name?: string;
    value?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    /**
     * Drawn inside the one label, between the box and the label text. A
     * leading image should have an empty alt: the label names the row.
     */
    leading?: Snippet;
    onchange?: (event: Event) => void;
    /** Same as `onchange`; both are called. */
    onChange?: (event: Event) => void;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface CheckboxEvents {
    change: { checked: boolean; event: Event };
}

// Select component props and events
export interface SelectProps
    extends Omit<
        HTMLButtonAttributes,
        | 'class'
        | 'value'
        | 'name'
        | 'disabled'
        | 'type'
        | 'onchange'
        | 'onclick'
        | 'aria-describedby'
        | 'children'
    > {
    /** Id of the trigger. Omit to auto-generate. */
    id?: string;
    options?: Array<{ value: string | number; label: string; disabled?: boolean }>;
    value?: string | number | undefined;
    searchable?: boolean;
    searchPlaceholder?: string;
    maxMenuHeight?: string;
    menuWidth?: string;
    /** `auto` (the default): a BottomSheet on a phone, under the field elsewhere. */
    presentation?: "auto" | "popover" | "sheet" | "native";
    /** The component's own texts; see `SelectStrings`. The single-text props win over it. */
    strings?: Partial<import("../components/util/select.js").SelectStrings>;
    noResultsText?: string;
    isLoading?: boolean;
    loadingText?: string;
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    emptyStateActionLabel?: string;
    onEmptyStateAction?: () => void;
    placeholder?: string;
    label?: string;
    /** When set, a hidden input submits the selected value with native forms. */
    name?: string;
    required?: boolean;
    disabled?: boolean;
    size?: SizeVariant;
    variant?: 'default' | 'success' | 'warning' | 'error';
    /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
    message?: string;
    /** Help text under the field, read out with it. */
    hint?: string;
    /** An error under the field. It marks the field invalid and is announced; it wins over `variant` and `message`. */
    error?: string;
    /** Ids of other elements that describe the field. The hint and the message are added after them. */
    'aria-describedby'?: string | null;
    onchange?: (event: Event) => void;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface SelectEvents {
    change: { value: string; event: Event };
}

// Textarea component props and events
export interface TextareaProps
    extends Omit<
        HTMLTextareaAttributes,
        | 'class'
        | 'value'
        | 'id'
        | 'name'
        | 'placeholder'
        | 'required'
        | 'disabled'
        | 'rows'
        | 'oninput'
        | 'aria-describedby'
    > {
    id?: string;
    value?: string;
    name?: string;
    label?: string;
    hideLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    disabled?: boolean;
    loading?: boolean;
    size?: SizeVariant;
    variant?: SemanticVariant;
    /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
    message?: string;
    /** Help text under the field, read out with it. */
    hint?: string;
    /** An error under the field. It marks the field invalid and is announced; it wins over `variant` and `message`. */
    error?: string;
    /** Ids of other elements that describe the field. The hint and the message are added after them. */
    'aria-describedby'?: string | null;
    oninput?: (event: Event) => void;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface TextareaEvents {
    input: { value: string; event: Event };
    change: { value: string; event: Event };
}

// Modal component props and events
export interface ModalProps
    extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'class' | 'title' | 'role' | 'onclick' | 'onkeydown' | 'onclose' | 'children'
    > {
    /** Open state. Bindable. */
    isOpen?: boolean;
    title?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    role?: 'dialog' | 'alertdialog';
    showClose?: boolean;
    closeLabel?: string;
    /** CSS selector, inside the panel, of the control that takes focus on open. */
    initialFocus?: string;
    /** Render the overlay in `document.body`. */
    portal?: boolean;
    /** When false, Escape, a backdrop click and the close button do not close the modal. */
    dismissible?: boolean;
    /** Fills the screen: `true` at every width, `'mobile'` below 768px only. */
    fullScreen?: boolean | 'mobile';
    onclose?: (detail: { reason: 'escape' | 'backdrop' | 'close-button' }) => void;
    /** @deprecated for close reporting: use `onclose`. Still called on close. */
    onclick?: (event: Event) => void;
    onkeydown?: (event: Event) => void;
    'data-testid'?: string;
    class?: string;
    children?: Snippet;
    footer?: Snippet;
    /** @deprecated never accepted by the component; use `isOpen`. */
    open?: boolean;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface ModalEvents {
    // Modal now uses onclick prop instead of dispatching close events
}

// Alert component props
export interface AlertProps {
    variant?: ExtendedSemanticVariant;
    title?: string;
    message?: string;
    closable?: boolean;
    /** Accessible name of the dismiss button a `closable` alert has. */
    closeLabel?: string;
    /** Visible state. Bindable. */
    open?: boolean;
    /** Shrink to content instead of filling the container. */
    inline?: boolean;
    onclick?: (event: Event) => void;
    class?: string;
    /** @deprecated use `class`. */
    className?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `variant`. */
    type?: 'success' | 'error' | 'warning' | 'info';
}

// Badge component props
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'class'> {
    variant?: BadgeVariant;
    size?: SizeVariant;
    emphasis?: 'subtle' | 'solid';
    /** Draws the family's edge on a subtle badge. Default `false`. */
    bordered?: boolean;
    /** Label text. Ignored when `children` is provided. */
    text?: string;
    showIcon?: boolean;
    class?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

// Chip component props
export interface ChipProps
    extends Omit<HTMLButtonAttributes, 'class' | 'type' | 'value' | 'onchange' | 'children'> {
    /** Makes the chip a link to this address, which works without scripts. */
    href?: string;
    target?: HTMLAnchorAttributes['target'];
    rel?: HTMLAnchorAttributes['rel'];
    download?: HTMLAnchorAttributes['download'];
    hreflang?: HTMLAnchorAttributes['hreflang'];
    /** With `href`: what `aria-current` says while `selected`. Default `"true"`. */
    current?: 'page' | 'true' | 'step' | 'location' | 'date' | 'time';
    /** `checkbox` or `radio`: a real input under the chip. Without it (and without `href`) the chip is a toggle button. */
    type?: 'checkbox' | 'radio';
    name?: string;
    value?: string;
    /** The chip is chosen. Bindable. */
    selected?: boolean;
    required?: boolean;
    form?: string;
    /** 28, 32 or 40px tall. Default `md`. */
    size?: 'sm' | 'md' | 'lg';
    /** An icon or an avatar before the label. */
    leading?: Snippet;
    /** A check icon before the label while selected. On for a checkbox and a toggle button, off for a link and a radio. */
    checkmark?: boolean;
    /** Called with the new `selected` when a person changes it. */
    onchange?: (selected: boolean) => void;
    class?: string;
    children?: Snippet;
}

// ChipGroup component props
export interface ChipGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'onchange' | 'children'> {
    class?: string;
    /** `wrap` (default) or `row`: one line that scrolls sideways. */
    layout?: 'wrap' | 'row';
    /** The group's accessible name. Not shown unless `showLabel`. */
    label?: string;
    showLabel?: boolean;
    /** `radio` or `checkbox`: the chips are inputs sharing this group's `name` and `value`. */
    type?: 'radio' | 'checkbox';
    name?: string;
    /** Bindable: a string (or `undefined`) for `radio`, an array of strings for `checkbox`. */
    value?: string | string[] | undefined;
    disabled?: boolean;
    /** With `layout="row"`: `fade` (default) or `none`. */
    edge?: 'fade' | 'none';
    /** With `layout="row"`: bring the chosen chip into view on load. Default `true`. */
    scrollSelectedIntoView?: boolean;
    onchange?: (value: string | string[] | undefined) => void;
    children?: Snippet;
}

// Progress component props
export interface ProgressProps {
    value?: number;
    max?: number;
    /** Bar height: 4, 8, 12 and 16px. */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Draws `max` separate segments (a whole number from 2 to 24), `value` of them filled; any other `max` draws the continuous bar. */
    segmented?: boolean;
    /** Overrides for the built-in strings. */
    strings?: Partial<ProgressStrings>;
    label?: string;
    /** Names the progressbar when there is no visible `label`. */
    'aria-label'?: string;
    /** Points the progressbar at another element's id for its name. */
    'aria-labelledby'?: string;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

// Skeleton component props
export interface SkeletonProps {
    variant?: 'text' | 'circle' | 'block';
    width?: string | number;
    height?: string | number;
    class?: string;
    'aria-label'?: string;
}

// Toggle component props and events
export interface ToggleProps
    extends Omit<
        HTMLButtonAttributes,
        'class' | 'id' | 'name' | 'value' | 'disabled' | 'type' | 'role' | 'onclick' | 'onchange' | 'children'
    > {
    /** Omit to auto-generate. */
    id?: string;
    /** When set, a hidden input submits `value` with native forms while checked. */
    name?: string;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    /**
     * Drawn inside the one label, between the switch and the label text. A
     * leading image should have an empty alt: the label names the row.
     */
    leading?: Snippet;
    /** The switch's accessible name when there is no visible `label`. */
    'aria-label'?: string;
    /** The id of an element of the page that names the switch. */
    'aria-labelledby'?: string;
    onclick?: (event: MouseEvent) => void;
    onchange?: (event: { checked: boolean }) => void;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface ToggleEvents {
    change: { checked: boolean; event: Event };
}

// Tooltip component props
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    content?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    disabled?: boolean;
    /** Lay the trigger out as a full-width block. */
    block?: boolean;
    /** Position the bubble against the viewport, so a scrolling ancestor cannot clip it. */
    fixed?: boolean;
    /** Milliseconds a tooltip opened by a tap stays; `0` keeps it until it is dismissed. */
    touchDuration?: number;
    /** `material` (default): thick glass with body text and no arrow. `inverted`: the 8.1 dark bubble with an arrow. */
    tone?: 'material' | 'inverted';
    class?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `placement`. */
    position?: 'top' | 'bottom' | 'left' | 'right';
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

// BottomTabBar component props
export interface BottomTabBarProps extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    /** Three to five destinations. */
    items: BottomTabBarItem[];
    /** The href of the active tab, or the path of the current page. Defaults to the current page. */
    active?: string;
    /** Accessible name of the navigation landmark. */
    label?: string;
    /** What a badge adds to the tab's accessible name, after the label and a comma. */
    badgeLabel?: (count: number, item: BottomTabBarItem) => string;
    /** Counts above this show as `99+`. */
    badgeMax?: number;
    /** Defaults to `fixed`, or to `static` inside an `AppShell`. */
    position?: 'fixed' | 'static';
    /** When the bar shows the glass and the hairline: `auto` follows the scroll position, `always`, `never`. Default `auto`. */
    scrollEdge?: 'auto' | 'always' | 'never';
    /** Draws the bar as a rounded glass capsule inset from the screen edges. Default false. */
    floating?: boolean;
    class?: string;
}

// AppBar component props
export interface AppBarProps extends Omit<HTMLAttributes<HTMLElement>, 'class' | 'title'> {
    /** The name of the screen, as a heading. */
    title?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Shows the back control as a link to this address. */
    backHref?: string;
    /** Called when the back control is activated; on its own it makes the control a button. */
    onback?: (event: MouseEvent) => void;
    /** Accessible name of the back control. */
    backLabel?: string;
    /**
     * Hides the bar while the page scrolls down and brings it back when it scrolls up.
     * Keyboard focus inside the bar holds it and brings it back; focus left by a tap does not.
     */
    collapseOnScroll?: boolean;
    /** How many lines the title may take before it is cut. Default 1. */
    titleLines?: 1 | 2;
    /** Before the title, after the back control. */
    leading?: Snippet;
    /** After the title. At most two icon buttons. */
    actions?: Snippet;
    /** When the bar shows the glass and the hairline: `auto` follows the scroll position, `always`, `never`. Default `auto`. */
    scrollEdge?: 'auto' | 'always' | 'never';
    /** Draws the title large on a second row that scrolls away; the bar then shows it small. */
    largeTitle?: boolean;
    /** The bar's fill: the page colour, none at rest, the brand colour with on-brand content, or none with the colours of the block it sits in (`inherit`). Default `default`. */
    tone?: 'default' | 'transparent' | 'brand' | 'inherit';
    /** `sticky` (default), or `static` for a bar in the flow of the page. */
    position?: 'sticky' | 'static';
    class?: string;
}

// AppShell component props
export interface AppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'style'> {
    /** The top bar, an `AppBar`. */
    header?: Snippet;
    /** The scrolling content, rendered in the element `contentElement` names. */
    children?: Snippet;
    /** The element around the content. Use `div` for a shell inside another `<main>`. */
    contentElement?: 'main' | 'div';
    /** The bottom bar, a `BottomTabBar`. */
    footer?: Snippet;
    /** Paints the shell with the page colour and the brand wash, and lets it show through the header. */
    canvas?: boolean;
    /** One navigation, drawn as tabs, a rail or a sidebar; `AppNavigation` is the ready-made content. */
    navigation?: Snippet<[AppShellNavigationContext]>;
    /** Where the `navigation` goes. `auto` (default): tabs below 48rem, a rail from 48rem, a sidebar from 64rem. */
    navigationPlacement?: AppShellNavigationMode;
    /** Without a `header`, no top safe-area padding on the content: it starts at the top of the screen and handles the safe area itself. */
    flushTop?: boolean;
    class?: string;
    /** Added after the two custom properties the shell sets. */
    style?: string;
}

// AppNavigation component props
export interface AppNavigationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    /** The destinations, as for `BottomTabBar`. */
    items: BottomTabBarItem[];
    /** The href of the active destination, or the path of the current page. Defaults to the current page. */
    active?: string;
    /** Accessible name of the navigation landmark. */
    label?: string;
    /** What a count adds to the link's accessible name, after the label and a comma. */
    badgeLabel?: (count: number, item: BottomTabBarItem) => string;
    /** Counts above this show as `99+`. */
    badgeMax?: number;
    /** Draws the tab bar form as a floating capsule of glass. */
    floating?: boolean;
    /** Above the list in the rail and the sidebar. */
    header?: Snippet<[{ placement: 'rail' | 'sidebar' }]>;
    /** Below the list in the rail and the sidebar. */
    footer?: Snippet<[{ placement: 'rail' | 'sidebar' }]>;
    class?: string;
}

// Rating component props
export interface RatingProps
    extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'class' | 'onchange' | 'aria-label' | 'aria-labelledby'
    > {
    class?: string;
    /** Stars given, or `null` for no rating. Bindable. */
    value?: number | null;
    max?: number;
    /** Names the rating. Shown above the stars unless `hideLabel`. */
    label?: string;
    hideLabel?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    size?: SizeVariant;
    /** Colour of a filled star: the primary action colour, or the app's accent. */
    tone?: 'primary' | 'accent';
    /** Shows a score: one image with one name, and stars can be partly filled. */
    readonly?: boolean;
    /** Adds a clear button; pressing the selected star again never clears. */
    clearable?: boolean;
    disabled?: boolean;
    name?: string;
    /** On by default when `readonly`. */
    showValue?: boolean;
    formatValue?: (value: number) => string;
    strings?: Partial<RatingStrings>;
    onchange?: (value: number | null) => void;
}

// SegmentedControl component props
export interface SegmentedControlProps
    extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'class' | 'onchange' | 'aria-label' | 'aria-labelledby'
    > {
    class?: string;
    /** Two to four choices. */
    options: SegmentedControlOption[];
    /** Selected value. Bindable. */
    value?: string | undefined;
    /** Accessible name of the group. Not shown. */
    label?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    size?: SizeVariant;
    /** Equal-width segments that fill the row. */
    fullWidth?: boolean;
    name?: string;
    /** Look of the selected segment: a card-coloured thumb (`neutral`, default) or the solid primary fill. */
    tone?: 'neutral' | 'primary';
    disabled?: boolean;
    onchange?: (value: string) => void;
}

// FloatingActionButton component props
export interface FloatingActionButtonProps extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    /** What the button does. Its accessible name, and its text when `extended`. */
    label: string;
    /** An icon component, as `@lucide/svelte` icons are. A plus sign by default. */
    icon?: Component<{ size?: number; class?: string }>;
    /** Shows the label as text beside the icon. */
    extended?: boolean;
    /** Makes it a link to this address. Without it, it is a button. */
    href?: string;
    /** The bottom corner it sits in. `bottom-end` follows the writing direction. */
    position?: 'bottom-end' | 'bottom-start' | 'bottom-center';
    class?: string;
}

// StickyActionBar component props
export interface StickyActionBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'style'> {
    /** Accessible name. With it the bar is a group. */
    label?: string;
    /** When the bar shows the glass and the hairline: `auto` follows the scroll position, `always`, `never`. Default `auto`. */
    scrollEdge?: 'auto' | 'always' | 'never';
    class?: string;
    /** Added after the offset and margin the bar sets while the keyboard is up. */
    style?: string;
    /** The main action, and at most one or two beside it. */
    children?: Snippet;
}

// BottomSheet component props
export interface BottomSheetProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'title' | 'onclose' | 'onkeydown'> {
    isOpen?: boolean;
    /** Heading of the sheet, and its accessible name. */
    title: string;
    description?: string;
    /** The heights the sheet can rest at. */
    snapPoints?: BottomSheetSnap[];
    /** The snap point the sheet is at. Bindable. */
    snap?: BottomSheetSnap;
    /** Render the overlay in `document.body`; `false` renders in place. */
    portal?: boolean;
    /** When false, Escape, the backdrop, the close button and a swipe down do not close it. */
    dismissible?: boolean;
    /** Fired when the sheet closes itself, with what the user did. */
    onclose?: (detail: { reason: BottomSheetCloseReason }) => void;
    /** Hears every keydown in the sheet, after the sheet has handled Escape. */
    onkeydown?: (event: KeyboardEvent) => void;
    /** Accessible name of the close button. */
    closeLabel?: string;
    /** Accessible name of the grip while its button takes the sheet up a step. */
    expandLabel?: string;
    /** Accessible name of the grip while its button takes the sheet down a step. */
    collapseLabel?: string;
    /** CSS selector of the control that takes focus when the sheet opens. */
    initialFocus?: string;
    class?: string;
    children?: Snippet;
    /** Pinned to the bottom of the panel, below the scrolling content. */
    footer?: Snippet;
}

// DateField component props
export interface DateFieldProps
    extends Omit<
        HTMLInputAttributes,
        'class' | 'type' | 'value' | 'size' | 'min' | 'max' | 'step' | 'required' | 'disabled' | 'readonly' | 'id' | 'name'
    > {
    /** Omit to auto-generate; pair with FormField's `id` when used inside FormField. */
    id?: string;
    /** The date as `YYYY-MM-DD`, or `""` while empty. Supports `bind:value`. */
    value?: string;
    /** Name the value is submitted under in a form. */
    name?: string;
    label?: string;
    /** True when FormField supplies the visible `<label>`. */
    hideLabel?: boolean;
    /** Help text under the field, read out with it. */
    hint?: string;
    /** An error under the field. It marks the field invalid and is announced. */
    error?: string;
    /** Earliest value that can be picked, in the format of `value`. */
    min?: string;
    /** Latest value that can be picked, in the format of `value`. */
    max?: string;
    /** Steps between dates that can be picked, in days. */
    step?: number | 'any';
    required?: boolean;
    disabled?: boolean;
    /** Shows the value without letting it be changed; it is still submitted. */
    readonly?: boolean;
    /** Height, on the scale Input and Button use. At least 44px on a touch screen. */
    size?: SizeVariant;
    /** Extra classes for the `<input>`. */
    class?: string;
}

// TimeField component props
export interface TimeFieldProps
    extends Omit<
        HTMLInputAttributes,
        'class' | 'type' | 'value' | 'size' | 'min' | 'max' | 'step' | 'required' | 'disabled' | 'readonly' | 'id' | 'name'
    > {
    /** Omit to auto-generate; pair with FormField's `id` when used inside FormField. */
    id?: string;
    /** The time as 24-hour `HH:mm`, or `""` while empty. Supports `bind:value`. */
    value?: string;
    /** Name the value is submitted under in a form. */
    name?: string;
    label?: string;
    /** True when FormField supplies the visible `<label>`. */
    hideLabel?: boolean;
    /** Help text under the field, read out with it. */
    hint?: string;
    /** An error under the field. It marks the field invalid and is announced. */
    error?: string;
    /** Earliest value that can be picked, in the format of `value`. */
    min?: string;
    /** Latest value that can be picked, in the format of `value`. */
    max?: string;
    /** Steps between times that can be picked, in seconds. */
    step?: number | 'any';
    required?: boolean;
    disabled?: boolean;
    /** Shows the value without letting it be changed; it is still submitted. */
    readonly?: boolean;
    /** Height, on the scale Input and Button use. At least 44px on a touch screen. */
    size?: SizeVariant;
    /** Extra classes for the `<input>`. */
    class?: string;
}

// Calendar component props
export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'onselect'> {
    /** The month shown, as `YYYY-MM`. Supports `bind:month`. */
    month?: string;
    /** The selected day, as `YYYY-MM-DD`, or null. Supports `bind:selected`. */
    selected?: string | null;
    /** What happens on which day. A day shows a dot per event, three at most. */
    events?: CalendarEvent[];
    /** First day of the week: 0 for Sunday to 6 for Saturday. */
    weekStartsOn?: number;
    /**
     * Language of the month and day names, as a BCP 47 tag. It does not translate the
     * words the component adds ("today", "selected", ...): pass those in `strings` too.
     */
    locale?: string;
    /** Earliest day that can be selected, as `YYYY-MM-DD`. */
    min?: string;
    /** Latest day that can be selected, as `YYYY-MM-DD`. */
    max?: string;
    /** Return true for a day that cannot be selected. */
    isDateDisabled?: (date: string) => boolean;
    /** The words the calendar says; replace any of them to translate. */
    strings?: Partial<CalendarStrings>;
    /** Called with the day when the user selects another one. */
    onselect?: (date: string) => void;
    /** Called with the month when the user moves to another one. */
    onmonthchange?: (month: string) => void;
    /** Extra classes for the host element. */
    class?: string;
}

// PhotoGrid component props
export interface PhotoGridProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'aria-label' | 'aria-labelledby' | 'onselect'> {
    photos: Photo[];
    /** How many columns. Left out, it follows the width of the grid: 3, 4 from 480px, 5 from 768px. */
    columns?: number;
    /** Shows no more than this many photos; the last tile then says how many more there are. */
    max?: number;
    /** Called with the photo's place in `photos` when one is opened. */
    onopen?: (index: number) => void;
    /** Makes a press select: `single` for one photo, `multiple` for any number. */
    selectable?: 'single' | 'multiple';
    /** Key of the selected photo, or `null`. Supports `bind:selected`. */
    selected?: PhotoKey | null;
    /** Keys of the selected photos. Supports `bind:selectedKeys`. */
    selectedKeys?: PhotoKey[];
    /** Called when a photo is selected or, in `multiple`, its selection is cleared. */
    onselect?: (detail: PhotoGridSelectDetail) => void;
    /** Puts an "Add photo" tile first and is called when it is pressed. */
    onadd?: () => void;
    /** Overrides for the built-in strings. */
    strings?: Partial<PhotoGridStrings>;
    /** Extra classes for the host element. */
    class?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}

// PhotoViewer component props
export interface PhotoViewerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'onclose' | 'aria-label'> {
    photos: Photo[];
    /** Place in `photos` of the photo that is showing. Supports `bind:index`. */
    index?: number;
    isOpen?: boolean;
    /** Things to do with the photo that is showing. */
    actions?: PhotoViewerAction[];
    /** Render the overlay in `document.body`; `false` renders in place. */
    portal?: boolean;
    /** Fired when the viewer closes itself, with what the user did. */
    onclose?: (detail: { reason: PhotoViewerCloseReason }) => void;
    /** Accessible name of the dialog. */
    label?: string;
    /** Overrides for the built-in strings. */
    strings?: Partial<PhotoViewerStrings>;
    /** Extra classes for the dialog panel. */
    class?: string;
}

// Stepper component props
export interface StepperProps extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    class?: string;
    /** The steps, in order: labels, or objects with a label and a description. */
    steps: StepperItem[];
    /**
     * Index of the current step, counted from 0. Bindable. A value outside
     * the steps is shown as the nearest step; the bound value is left as given.
     */
    current?: number;
    /** Size of the markers and the text. */
    size?: SizeVariant;
    /** `auto` is compact while the Stepper itself is narrower than 30rem. */
    layout?: StepperLayout;
    /** Makes the completed steps buttons that go back to that step. */
    interactive?: boolean;
    /** Accessible name of the navigation landmark. */
    label?: string;
    /** Overrides for the built-in strings. */
    strings?: Partial<StepperStrings>;
    /** Called with the index of the step a press went back to. Only with `interactive`. */
    onstepchange?: (index: number) => void;
}

// Avatar component props
export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'class' | 'role' | 'aria-label'> {
    /** The person's name: the accessible name, and where the initials come from. */
    name: string;
    /** Address of the picture. Without it, or when it fails to load, the initials show. */
    src?: string;
    /** Diameter: 24, 32 and 48px. */
    size?: AvatarSize;
    /** Accessible name, when it should differ from `name`. `alt=""` makes the avatar decorative. */
    alt?: string;
    /** Language the initials are upper-cased in. The page's own by default. */
    locale?: string;
    class?: string;
}

// AvatarGroup component props
export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLUListElement>, 'class' | 'aria-label'> {
    /** The people, in the order they are shown. */
    people: AvatarPerson[];
    /** How many are shown before the rest become "+N". */
    max?: number;
    /** Diameter of each avatar: 24, 32 and 48px. */
    size?: AvatarSize;
    /** Accessible name of the list. */
    label?: string;
    /** Overrides for the built-in strings. */
    strings?: Partial<AvatarGroupStrings>;
    /** The language the initials are worked out in; passed to each Avatar. */
    locale?: string;
    class?: string;
}

// Component type definitions
export type Button = ZabiComponent<ButtonProps, ButtonEvents>;
export type Heading = ZabiComponent<HeadingProps>;
export type Card = ZabiComponent<CardProps>;
export type Input = ZabiComponent<InputProps, InputEvents>;
export type Checkbox = ZabiComponent<CheckboxProps, CheckboxEvents>;
export type Select = ZabiComponent<SelectProps, SelectEvents>;
export type Textarea = ZabiComponent<TextareaProps, TextareaEvents>;
export type Modal = ZabiComponent<ModalProps, ModalEvents>;
export type Alert = ZabiComponent<AlertProps>;
export type Badge = ZabiComponent<BadgeProps>;
export type Chip = ZabiComponent<ChipProps>;
export type ChipGroup = ZabiComponent<ChipGroupProps>;
export type Progress = ZabiComponent<ProgressProps>;
export type Skeleton = ZabiComponent<SkeletonProps>;
export type Toggle = ZabiComponent<ToggleProps, ToggleEvents>;
export type Tooltip = ZabiComponent<TooltipProps>;
export type BottomTabBar = ZabiComponent<BottomTabBarProps>;
export type AppBar = ZabiComponent<AppBarProps>;
export type AppShell = ZabiComponent<AppShellProps>;
export type AppNavigation = ZabiComponent<AppNavigationProps>;
export type Rating = ZabiComponent<RatingProps>;
export type SegmentedControl = ZabiComponent<SegmentedControlProps>;
export type FloatingActionButton = ZabiComponent<FloatingActionButtonProps>;
export type StickyActionBar = ZabiComponent<StickyActionBarProps>;
export type BottomSheet = ZabiComponent<BottomSheetProps>;
export type DateField = ZabiComponent<DateFieldProps>;
export type TimeField = ZabiComponent<TimeFieldProps>;
export type Calendar = ZabiComponent<CalendarProps>;
export type PhotoGrid = ZabiComponent<PhotoGridProps>;
export type PhotoViewer = ZabiComponent<PhotoViewerProps>;
export type Avatar = ZabiComponent<AvatarProps>;
export type AvatarGroup = ZabiComponent<AvatarGroupProps>;
export type Stepper = ZabiComponent<StepperProps>;
