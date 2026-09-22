/**
 * Accent themes for the marketing site.
 *
 * Shared by the RebrandDemo specimen (which scopes them to one card) and the
 * BrandSwitcher in the top nav (which applies them to the document). One map,
 * so the demo cannot claim a set of overrides the switcher does not actually
 * apply.
 *
 * Iris is the default theme, so it has no overrides — switching to it means
 * removing the custom properties rather than writing different ones.
 */

export type Accent = "iris" | "pine" | "citron";
export type TokenMap = Record<string, string>;

export const ACCENTS: { id: Accent; label: string; swatch: string }[] = [
    { id: "iris", label: "Iris", swatch: "var(--zabi-brand-500)" },
    { id: "pine", label: "Pine", swatch: "var(--zabi-pine-500)" },
    { id: "citron", label: "Citron", swatch: "var(--zabi-citron-500)" },
];

/** The stylesheet's own values, for scoping a card back to the default theme. */
export const IRIS: { light: TokenMap; dark: TokenMap } = {
    light: {
        "--color-action-primary": "var(--color-brand-600)",
        "--color-action-primary-hover": "var(--color-brand-700)",
        "--color-action-primary-active": "var(--color-brand-800)",
        "--color-action-primary-text": "#ffffff",
        "--color-action-primary-subtle": "var(--color-brand-100)",
        "--color-action-secondary": "rgba(9, 9, 11, 0.07)",
        "--color-action-secondary-hover": "rgba(9, 9, 11, 0.12)",
        "--color-brand-100": "var(--zabi-brand-100)",
        "--color-brand-500": "var(--zabi-brand-500)",
        "--color-brand-600": "var(--zabi-brand-600)",
        "--color-brand-700": "var(--zabi-brand-700)",
        "--color-focus": "var(--color-brand-500)",
        "--color-focus-ring": "var(--color-focus)",
        "--color-link": "var(--color-brand-700)",
    },
    // Only what `.dark` actually restates; the rest resolves through
    // `--color-brand-*`, which is why the light entries above hold in dark too.
    dark: {
        "--color-action-primary-text": "var(--zabi-brand-950)",
        "--color-action-secondary": "rgba(250, 250, 250, 0.09)",
        "--color-action-secondary-hover": "rgba(250, 250, 250, 0.15)",
        "--color-brand-100": "var(--zabi-brand-900)",
        "--color-brand-600": "var(--zabi-brand-400)",
        "--color-brand-700": "var(--zabi-brand-300)",
    },
};

/** Dark entries layer on top of light ones, exactly like a `.dark .brand` rule. */
export const ACCENT_OVERRIDES: Record<
    Exclude<Accent, "iris">,
    { light: TokenMap; dark: TokenMap }
> = {
    pine: {
        light: {
            "--color-action-primary": "var(--zabi-pine-700)",
            "--color-action-primary-hover": "var(--zabi-pine-600)",
            "--color-action-primary-active": "var(--zabi-pine-500)",
            "--color-action-primary-text": "var(--zabi-pine-50)",
            "--color-action-primary-subtle": "var(--zabi-pine-100)",
            "--color-action-secondary":
                "color-mix(in srgb, var(--zabi-pine-600) 12%, transparent)",
            "--color-action-secondary-hover":
                "color-mix(in srgb, var(--zabi-pine-600) 22%, transparent)",
            "--color-brand-100": "var(--zabi-pine-100)",
            "--color-brand-500": "var(--zabi-pine-400)",
            "--color-brand-600": "var(--zabi-pine-500)",
            "--color-brand-700": "var(--zabi-pine-600)",
            "--color-focus": "var(--zabi-pine-400)",
            "--color-focus-ring": "var(--zabi-pine-400)",
            "--color-link": "var(--zabi-pine-600)",
        },
        dark: {
            "--color-action-primary": "var(--zabi-pine-200)",
            "--color-action-primary-hover": "var(--zabi-pine-100)",
            "--color-action-primary-active": "var(--zabi-pine-300)",
            "--color-action-primary-text": "var(--zabi-pine-950)",
            "--color-action-primary-subtle": "var(--zabi-pine-900)",
            "--color-action-secondary":
                "color-mix(in srgb, var(--zabi-pine-300) 16%, transparent)",
            "--color-action-secondary-hover":
                "color-mix(in srgb, var(--zabi-pine-300) 26%, transparent)",
            "--color-brand-100": "var(--zabi-pine-900)",
            "--color-brand-600": "var(--zabi-pine-300)",
            "--color-brand-700": "var(--zabi-pine-300)",
            "--color-link": "var(--zabi-pine-200)",
            "--color-focus": "var(--zabi-pine-300)",
            "--color-focus-ring": "var(--zabi-pine-300)",
        },
    },
    citron: {
        light: {
            "--color-action-primary": "var(--zabi-citron-800)",
            "--color-action-primary-hover": "var(--zabi-citron-900)",
            "--color-action-primary-active": "var(--zabi-citron-700)",
            "--color-action-primary-text": "var(--zabi-citron-50)",
            "--color-action-primary-subtle": "var(--zabi-citron-100)",
            "--color-action-secondary":
                "color-mix(in srgb, var(--zabi-citron-700) 14%, transparent)",
            "--color-action-secondary-hover":
                "color-mix(in srgb, var(--zabi-citron-700) 24%, transparent)",
            "--color-brand-100": "var(--zabi-citron-100)",
            "--color-brand-500": "var(--zabi-citron-500)",
            "--color-brand-600": "var(--zabi-citron-600)",
            "--color-brand-700": "var(--zabi-citron-700)",
            "--color-focus": "var(--zabi-citron-500)",
            "--color-focus-ring": "var(--zabi-citron-500)",
            "--color-link": "var(--zabi-citron-800)",
        },
        dark: {
            "--color-action-primary": "var(--zabi-citron-300)",
            "--color-action-primary-hover": "var(--zabi-citron-200)",
            "--color-action-primary-active": "var(--zabi-citron-400)",
            "--color-action-primary-text": "var(--zabi-citron-950)",
            "--color-action-primary-subtle": "var(--zabi-citron-900)",
            "--color-action-secondary":
                "color-mix(in srgb, var(--zabi-citron-300) 16%, transparent)",
            "--color-action-secondary-hover":
                "color-mix(in srgb, var(--zabi-citron-300) 26%, transparent)",
            "--color-brand-100": "var(--zabi-citron-900)",
            "--color-brand-600": "var(--zabi-citron-400)",
            "--color-brand-700": "var(--zabi-citron-300)",
            "--color-link": "var(--zabi-citron-300)",
            "--color-focus": "var(--zabi-citron-400)",
            "--color-focus-ring": "var(--zabi-citron-400)",
        },
    },
};

/** Tokens worth printing in the RebrandDemo snippet; the full map is applied. */
export const SNIPPET_TOKENS = [
    "--color-action-primary",
    "--color-brand-600",
    "--color-focus-ring",
    "--color-link",
];

/** Every property any accent can set — needed to clear back to Iris. */
const ALL_TOKEN_NAMES = [
    ...new Set(
        [IRIS, ...Object.values(ACCENT_OVERRIDES)].flatMap(({ light, dark }) => [
            ...Object.keys(light),
            ...Object.keys(dark),
        ]),
    ),
];

export function tokensFor(id: Accent, dark: boolean): TokenMap {
    const { light, dark: darkMap } =
        id === "iris" ? IRIS : ACCENT_OVERRIDES[id];
    return dark ? { ...light, ...darkMap } : light;
}

/**
 * Call `onChange` with the current theme, then on every change to the dark
 * class. Returns the teardown, so it drops straight into an `$effect`.
 *
 * The accent maps differ per theme, so anything scoping an accent has to
 * re-apply when the theme flips.
 */
export function watchDarkMode(
    onChange: (dark: boolean) => void,
): () => void {
    const root = document.documentElement;
    const sync = () => onChange(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
}

/** Inline `style` string, for scoping an accent to one element. */
export function styleFor(id: Accent, dark: boolean): string {
    return Object.entries(tokensFor(id, dark))
        .map(([name, value]) => `${name}: ${value}`)
        .join("; ");
}

/**
 * Apply an accent to an element (the document root, for a site-wide switch).
 *
 * Every property any accent could have set is removed first, so switching
 * pine → citron cannot leave a stale pine token behind, and switching back to
 * iris returns to the stylesheet's own values rather than a third blend.
 */
export function applyAccent(el: HTMLElement, id: Accent, dark: boolean): void {
    for (const name of ALL_TOKEN_NAMES) el.style.removeProperty(name);
    // Iris is the stylesheet's own theme, so clearing is the whole job here -
    // writing its values back would only restate what the cascade already says.
    if (id === "iris") return;
    for (const [name, value] of Object.entries(tokensFor(id, dark))) {
        el.style.setProperty(name, value);
    }
}
