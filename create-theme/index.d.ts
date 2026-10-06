/** A hex colour: `#rgb` or `#rrggbb`, with or without the `#`. */
export type HexColor = string;

/** A map of custom property names to values. */
export type TokenMap = Record<string, string>;

/**
 * Either one map for both modes, or `light`, `dark` and `both` maps. The two
 * forms may be mixed: a `--token` key beside them counts as `both`.
 */
export type Overrides = TokenMap | ({ light?: TokenMap; dark?: TokenMap; both?: TokenMap } & { [token: `--${string}`]: string });

export interface CreateThemeOptions {
    /**
     * The brand colour. Supplies hue and chroma for `--zabi-brand-50 … 950`:
     * primary actions, focus rings, links and brand tints.
     */
    brand: HexColor;
    /** Second brand colour, for `--zabi-accent-50 … 950`. Omitted: the library's citron. */
    accent?: HexColor;
    /**
     * Tints the neutral ramp, `--zabi-base-50 … 950` (21 steps), toward this
     * hue: text, borders, the page, cards and the dark surface levels. Only the
     * hue and a little chroma are used. Omitted: the library's greys.
     */
    neutral?: HexColor;
    /**
     * The OKLCH chroma at the neutral ramp's peak, `0` to `0.1`. Needs
     * `neutral`, which still supplies the hue. Omitted: the ramp takes the hue
     * of `neutral` at no more than 0.03 chroma, so it stays a tinted grey. For a
     * clearly tinted neutral, such as a blue-slate UI, give 0.04 to 0.06. The
     * profile across the 21 steps is the same; only its peak moves.
     *
     * With it, the translucent ink roles follow the neutral ramp instead of
     * staying grey: `--color-action-secondary` (and `-hover`, `-active`),
     * `--color-surface-hover`, `--color-surface-active` and
     * `--color-border-overlay` become `color-mix()` of `--zabi-base-900` (light)
     * or `--zabi-base-50` (dark) at their usual alphas, and `--shadow-color` is
     * the ramp's step 900 in light. `--color-overlay` (the modal scrim) stays
     * black. Dark values are written under the dark selectors, as with `pin`.
     * Omitted: the output is exactly what it is without the option.
     *
     * The contrast check does not evaluate these translucent roles, with or
     * without the option.
     */
    neutralChroma?: number;
    /**
     * Extra declarations written after the ramps, for example
     * `{ "--color-link": "var(--color-brand-800)" }`. They apply in light and in
     * dark, and take part in the contrast check and in the choice of the "on"
     * colours.
     *
     * Or per mode: `{ light, dark, both }`, each a map of the same shape.
     * `both` is the flat form (flat keys beside the three also count as `both`).
     * A token in `light` goes on `:root`, and the file restates the library's
     * own dark value for it under the dark selectors, so dark does not move; a
     * token in `dark` is written only under the dark selectors. A token set in
     * `both` and in a mode takes the mode's value in that mode. The contrast
     * check uses each mode's own values. A token the library defines no dark
     * value for (or one you invented) cannot be put back in dark: it stays what
     * `light` says there unless you also set it in `dark`.
     *
     * @example
     * overrides: { light: { "--color-surface-raised": "#f8faff" } }
     */
    overrides?: Overrides;
    /**
     * Put the exact colour on the solid fill, where the ramp would use its
     * step 600. `true` pins the brand: in light, `--color-action-primary` is
     * the hex you gave, with hover and pressed states derived from it and a
     * label (white, or the ramp's dark end) that reaches 4.5:1 on all three.
     * The focus ring and links take the colour too where every guarded pair
     * still passes, and stay on the ramp where it would not. The ramp itself,
     * and so every tint and border, is unchanged.
     *
     * Dark takes the colour only if nothing guarded fails with it; otherwise
     * dark keeps the mirrored ramp step, as it does without `pin`.
     *
     * A pair that fails with the pinned colour is reported in `warnings`. The
     * colour is never moved to make it pass.
     *
     * `{ accent: true }` does the same for `--color-accent` and needs `accent`.
     * Omitted or `false`: the output is exactly what it is without the option.
     */
    pin?: boolean | { brand?: boolean; accent?: boolean };
}

/** A role pair below WCAG AA with the generated ramps in place. */
export interface ContrastWarning {
    type: 'contrast';
    /** The pair, as the library's contrast guard names it, e.g. `"link on page"`. */
    pair: string;
    mode: 'light' | 'dark';
    /** Measured ratio, to two decimals. */
    ratio: number;
    /** 4.5 for text, 3 for UI parts and focus rings. */
    required: number;
    foreground: { token: string; value: string };
    background: { token: string; value: string };
    message: string;
}

/** An input that will not give the ramp its author probably expects. */
/** What `pin` did with one colour. */
export interface PinReport {
    /** The pinned colour, as `#rrggbb`. */
    hex: string;
    light: {
        /** Role groups that took the colour besides the fill: `"focus ring"`, `"link"`, `"accent text"`. */
        followed: string[];
        /** Role groups left on the ramp, because the colour fails a guarded pair there. */
        onRamp: string[];
        /** Which way hover and pressed go from the fill. */
        states: 'darker' | 'lighter';
    };
    dark: {
        /** False when the colour fails in dark and dark keeps the ramp. */
        pinned: boolean;
        followed: string[];
        onRamp: string[];
        states?: 'darker' | 'lighter';
        /** When not pinned: the pairs that would fail with the colour. */
        failed?: string[];
    };
}

export interface InputWarning {
    type: 'input';
    option: 'brand' | 'accent' | 'neutral';
    message: string;
}

export type ThemeWarning = ContrastWarning | InputWarning;

/** Where an input colour landed in the ramp built from it. */
export interface ClosestStep {
    step: number;
    hex: string;
    /** CIELAB ΔE*ab between the input and that step, to one decimal. */
    deltaE: number;
    exact: boolean;
}

export interface CreateThemeResult {
    /**
     * The stylesheet: a header comment and one `:root { … }` rule. With `pin`,
     * `neutralChroma` or `light` / `dark` overrides, two more rules follow, with the dark values of those roles:
     * `.dark, [data-theme="dark"] { … }` and the same declarations for
     * `[data-theme="auto"]` inside `@media (prefers-color-scheme: dark)`.
     */
    css: string;
    /** Every declaration of the `:root` rule, name to value, in output order. */
    tokens: Record<string, string>;
    /** Only with `pin`, `neutralChroma` or `light` / `dark` overrides: every declaration of the dark rules. */
    darkTokens?: Record<string, string>;
    /** Only with `pin`: what was pinned and which roles took the colour. */
    pinned?: { brand?: PinReport; accent?: PinReport };
    /** Contrast failures and input notes. Empty when everything passes. */
    warnings: ThemeWarning[];
    closest: { brand: ClosestStep; accent?: ClosestStep; neutral?: ClosestStep };
}

/**
 * Builds the ramps for a brand on the library's lightness curve and checks
 * every guarded role pair in light and dark. Deterministic: the same options
 * give the same bytes.
 *
 * @throws {TypeError} when `brand` is missing, a colour is not a hex value, or `neutralChroma` is not a number from 0 to 0.1 or is given without `neutral`.
 */
export function createTheme(options: CreateThemeOptions): CreateThemeResult;
export default createTheme;

/** The steps of a chromatic ramp: 50, 100 … 900, 950. */
export const RAMP_STEPS: number[];
/** The 21 steps of the neutral ramp, half steps included. */
export const BASE_STEPS: number[];
