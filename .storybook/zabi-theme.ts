import { create } from 'storybook/theming/create';

/**
 * Storybook's own interface, in Zabi's colours.
 *
 * The manager (sidebar, toolbar) and the docs pages are rendered by Storybook,
 * outside the preview's stylesheet, so they cannot read the CSS tokens. The
 * values are copied from the `--zabi-*` ramps and the semantic tokens in
 * src/app.css; the token each one mirrors is named beside it.
 *
 * A comment that names a `--color-*` token is checked: tests/storybook-theme.test.ts
 * fails when the value beside it is no longer what that token resolves to in
 * that theme.
 */
const shared = {
    brandTitle: 'Zabi Components',
    // Storybook is served from /storybook/ on the site, so one level up is the
    // landing page.
    brandUrl: '../',
    brandTarget: '_self' as const,
    fontBase: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontCode: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    appBorderRadius: 8,
    inputBorderRadius: 8
};

export const light = create({
    base: 'light',
    ...shared,

    colorPrimary: '#4f68da', // brand-600, --color-action-primary
    colorSecondary: '#4f68da',

    appBg: '#ececee', // base-150, --color-surface-base
    appContentBg: '#ffffff', // --color-surface-raised
    appPreviewBg: '#ececee', // --color-surface-base
    appBorderColor: '#d4d4d8', // base-300, --color-border

    textColor: '#18181b', // base-900, --color-headline
    textInverseColor: '#ffffff',
    textMutedColor: '#52525b', // base-600, --color-description

    barBg: '#ffffff',
    barTextColor: '#52525b',
    barHoverColor: '#3c52ba', // brand-700, --color-link
    barSelectedColor: '#4f68da',

    inputBg: '#ffffff',
    inputBorder: '#71717a', // base-500, --color-input-border
    inputTextColor: '#18181b',

    buttonBg: '#ffffff',
    buttonBorder: '#d4d4d8',
    booleanBg: '#e4e4e7', // base-200
    booleanSelectedBg: '#ffffff'
});

export const dark = create({
    base: 'dark',
    ...shared,

    colorPrimary: '#92a9ff', // brand-400, the dark --color-action-primary
    // Selected rows put white text on this, so it stays at brand-600 (4.9:1)
    // instead of following the lighter dark-mode action colour.
    colorSecondary: '#4f68da',

    appBg: '#18181b', // dark --color-surface-base
    appContentBg: '#262629', // dark --color-surface-raised
    appPreviewBg: '#18181b', // dark --color-surface-base
    appBorderColor: '#3f3f46', // base-700

    textColor: '#f4f4f5', // base-100
    textInverseColor: '#18181b',
    textMutedColor: '#d4d4d8', // dark --color-description

    barBg: '#18181b',
    barTextColor: '#a1a1aa',
    barHoverColor: '#b5c6ff', // brand-300
    barSelectedColor: '#92a9ff',

    inputBg: '#262629',
    inputBorder: '#52525b', // base-600
    inputTextColor: '#f4f4f5',

    buttonBg: '#262629',
    buttonBorder: '#3f3f46',
    booleanBg: '#18181b',
    booleanSelectedBg: '#363638' // dark --color-surface-elevated
});

/** Follows the operating system, as the site does before anyone uses its toggle. */
export function prefersDark(): boolean {
    return (
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
}
