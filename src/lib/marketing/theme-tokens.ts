/**
 * The token tables on the theming page.
 *
 * These are the tokens THEMING.md documents as the ones an app may set, and
 * the roles it should read. tests/theming-guide.test.ts checks every name here
 * against the list of published tokens, so the page cannot promise a token the
 * theme does not have.
 */

export const RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const BASE_STEPS = [
    50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
    800, 850, 900, 925, 950,
];

export interface TokenRow {
    /** Every token the row stands for. */
    tokens: string[];
    /** How the row is printed, when that is shorter than listing them. */
    label?: string;
    value?: string;
    follows: string;
}

const ramp = (name: string, steps: number[]) => steps.map((step) => `--zabi-${name}-${step}`);

export const COLOR_TOKENS: TokenRow[] = [
    {
        tokens: ramp("brand", RAMP_STEPS),
        label: "--zabi-brand-50 … 950",
        value: "11 steps",
        follows: "Primary actions, focus rings, links, brand tints",
    },
    {
        tokens: ramp("accent", RAMP_STEPS),
        label: "--zabi-accent-50 … 950",
        value: "11 steps",
        follows: "The accent roles: bg-accent, text-accent, border-accent",
    },
    {
        tokens: ramp("base", BASE_STEPS),
        label: "--zabi-base-50 … 950",
        value: "21 steps",
        follows: "Text, borders, inputs, the page, cards, the dark surface levels",
    },
    {
        tokens: ["--zabi-on-brand", "--zabi-on-brand-dark"],
        value: "#ffffff, brand 950",
        follows: "The label on a primary fill, in light and in dark",
    },
    {
        tokens: ["--zabi-on-accent", "--zabi-on-accent-dark"],
        value: "#ffffff, accent 950",
        follows: "The label on a solid accent fill, in light and in dark",
    },
];

export const TYPE_TOKENS: TokenRow[] = [
    { tokens: ["--font-family-sans"], value: "the platform UI face (San Francisco, Segoe UI, Roboto)", follows: "Body text and every component" },
    { tokens: ["--font-family-heading"], value: "the sans family", follows: "h1 to h6 and the Heading component" },
    { tokens: ["--font-family-mono"], value: "ui-monospace, SF Mono, Menlo, Consolas", follows: "CodeBlock" },
    {
        tokens: [
            "--font-weight-regular",
            "--font-weight-medium",
            "--font-weight-semibold",
            "--font-weight-bold",
        ],
        value: "400, 500, 600, 700",
        follows: "font-normal, font-medium, font-semibold, font-bold",
    },
];

export const SHAPE_TOKENS: TokenRow[] = [
    { tokens: ["--radius-control"], value: "0.5rem", follows: "Buttons, inputs, selects, toggles" },
    { tokens: ["--radius-container"], value: "0.75rem", follows: "Cards, alerts, panels, list items" },
    { tokens: ["--radius-overlay"], value: "1rem", follows: "Modals, sheets, menus, popovers, toasts" },
    { tokens: ["--radius-pill"], value: "9999px", follows: "Badges, avatars, status dots" },
    {
        tokens: ["--shadow-color", "--shadow-opacity"],
        value: "24 24 27, 0.14",
        follows: "The color and strength of both shadows. Three RGB channels, space separated.",
    },
    {
        tokens: [
            "--z-dropdown",
            "--z-sticky",
            "--z-fixed",
            "--z-modal-backdrop",
            "--z-modal",
            "--z-popover",
            "--z-tooltip",
            "--z-toast",
        ],
        label: "--z-dropdown … --z-toast",
        value: "1000 to 1080",
        follows: "The layer of each floating component",
    },
];

export const ROLE_TOKENS: TokenRow[] = [
    {
        tokens: [
            "--color-action-primary",
            "--color-action-primary-hover",
            "--color-action-primary-active",
            "--color-action-primary-text",
        ],
        label: "--color-action-primary, -hover, -active, -text",
        follows: "Primary buttons. The same set exists for secondary and danger.",
    },
    { tokens: ["--color-on-brand", "--color-on-accent"], follows: "Text on a primary fill, and on a solid accent fill" },
    { tokens: ["--color-focus-ring"], follows: "The focus ring" },
    { tokens: ["--color-link", "--color-link-hover"], follows: "Links" },
    {
        tokens: ["--color-headline", "--color-body", "--color-description", "--color-caption"],
        follows: "Text",
    },
    {
        tokens: [
            "--color-surface-base",
            "--color-surface-raised",
            "--color-surface-elevated",
            "--color-surface-overlay",
            "--color-surface-inset",
        ],
        label: "--color-surface-base, -raised, -elevated, -overlay, -inset",
        follows: "The page, cards, nested cards, floating panels, wells",
    },
    { tokens: ["--color-border", "--color-border-strong"], follows: "Borders and dividers" },
    {
        tokens: ["--color-success", "--color-warning", "--color-error", "--color-info"],
        follows: "Status. Each has -subtle, -border and -text beside it.",
    },
];

export const ALL_DOCUMENTED_TOKENS = [
    ...COLOR_TOKENS,
    ...TYPE_TOKENS,
    ...SHAPE_TOKENS,
    ...ROLE_TOKENS,
].flatMap((row) => row.tokens);
