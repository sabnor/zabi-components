/**
 * Single source of truth for layout-width enforcement.
 * Consumed by: scripts/check-layout-width.js
 *
 * ── Expansion control ─────────────────────────────────────────────────────
 * Do not add utilities or arbitrary literals without:
 *   1. A mapped use case: docs | demo | marketing | app-shell | chrome | intrinsic
 *   2. PR review confirming Container/Section maxWidth is not enough
 *   3. Update to .cursor/rules/layout-width.mdc if the mental model changes
 *
 * Default when unsure: use <Container> or <Section> with maxWidth — not raw max-w-*.
 */

/** @typedef {'docs' | 'demo' | 'marketing' | 'app-shell' | 'chrome' | 'intrinsic' | 'token'} WidthCategory */

/** Files that may contain max-w-* (implementation of tokens, toast, or TopNavbar chrome only) */
export const COMPONENT_IMPLEMENTATION_ALLOWLIST = new Set([
    "src/components/atoms/Container.svelte",
    "src/components/atoms/Toast.svelte",
    "src/components/molecules/Section.svelte",
    "src/components/organisms/TopNavbar.svelte",
]);

/**
 * Fixed Tailwind max-w-* classes allowed outside src/components.
 * Same strings as Container/Section emit for screen-* — prefer those components over pasting classes.
 */
export const ALLOWED_GLOBAL_MAX_W = new Set([
    "max-w-none",
    "max-w-full",
    "max-w-xs",
    "max-w-lg",
    "max-w-3xl",
    "max-w-4xl",
    "max-w-6xl",
    "max-w-7xl",
    "max-w-screen",
    "max-w-screen-sm",
    "max-w-screen-md",
    "max-w-screen-lg",
    "max-w-screen-xl",
    "max-w-screen-2xl",
]);

/**
 * Arbitrary max-w-[…] — kept to a fixed set; each entry documents why it exists.
 * Prefer replacing new needs with ALLOWED_GLOBAL_MAX_W or Container/Section before extending this object.
 *
 * @type {Record<string, { id: string, category: WidthCategory, purpose: string }>}
 */
export const ARBITRARY_MAX_WIDTH = {
    "max-w-[266px]": {
        id: "DOCS_CATALOG_SIDEBAR_CAP",
        category: "app-shell",
        purpose:
            "Mobile drawer width cap for /components catalog sidebar; md:max-w-none when sidebar is static.",
    },
    "max-w-[280px]": {
        id: "SIDEBAR_APP_SHELL_RAIL",
        category: "demo",
        purpose:
            "Realistic app-shell demo: max width of the sidebar column beside main content in showcase.",
    },
    "max-w-[min(24rem,calc(100vw-2rem))]": {
        id: "TOAST_INLINE_VIEWPORT",
        category: "intrinsic",
        purpose:
            "Toast inline layout: readable line length without overflowing small viewports (atoms/Toast only).",
    },
};

export const ALLOWED_ARBITRARY_MAX_W = new Set(Object.keys(ARBITRARY_MAX_WIDTH));

/** Default line appended to every failure output */
export const DEFAULT_IF_UNSURE =
    "If unsure → use <Container> or <Section> with maxWidth (see scripts/layout-width-policy.js).";

export const POLICY_REFERENCE =
    "Policy: scripts/layout-width-policy.js — expand only after review (use case + category).";

/**
 * Known disallowed utilities → short replacement guidance (category + exact swap).
 * @type {Record<string, { category: string, replaceWith: string }>}
 */
export const BANNED_UTILITY_REPLACEMENTS = {
    "max-w-sm": {
        category: "scale (disallowed)",
        replaceWith: "max-w-xs (narrow) or max-w-lg (demo column); or Container maxWidth",
    },
    "max-w-md": {
        category: "scale (disallowed)",
        replaceWith: "max-w-lg (demos/stories) or max-w-4xl (docs reading width)",
    },
    "max-w-xl": {
        category: "scale (disallowed)",
        replaceWith: "max-w-lg or max-w-4xl; or max-w-screen-lg via <Section maxWidth=\"lg\">",
    },
    "max-w-2xl": {
        category: "scale (ambiguous vs screen-2xl)",
        replaceWith: "max-w-4xl or max-w-screen-2xl via <Container maxWidth=\"2xl\">",
    },
    "max-w-5xl": {
        category: "scale (disallowed)",
        replaceWith: "max-w-4xl or max-w-6xl; or Section/Container token",
    },
    "max-w-prose": {
        category: "prose preset",
        replaceWith: "max-w-4xl or Section/Container",
    },
    "max-w-min": {
        category: "intrinsic",
        replaceWith: "max-w-full or explicit approved max-w-*",
    },
    "max-w-max": {
        category: "intrinsic",
        replaceWith: "max-w-full or approved utility",
    },
    "max-w-fit": {
        category: "intrinsic",
        replaceWith: "max-w-full or max-w-xs",
    },
};
