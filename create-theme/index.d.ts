/** A hex colour: `#rgb` or `#rrggbb`, with or without the `#`. */
export type HexColor = string;

/** A map of custom property names to values. */
export type TokenMap = Record<string, string>;

/**
 * Either one map for both modes, or `light`, `dark` and `both` maps. The two
 * forms may be mixed: a `--token` key beside them counts as `both`.
 */
export type Overrides = TokenMap | ({ light?: TokenMap; dark?: TokenMap; both?: TokenMap } & { [token: `--${string}`]: string });

/** A brand ramp: every step as a hex colour. All eleven are required. */
export type BrandRampInput = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, HexColor>;

/** The options besides the brand: see CreateThemeOptions. */
export interface CreateThemeBaseOptions {
    /**
     * The check of every guarded role pair at the end. `true` (the default) runs
     * it and fills `warnings` and the header's contrast line. `false` skips only
     * that final check of every pair (a fifth or so of a plain brand's time,
     * measured at 16 ms against 13 ms): `warnings` then holds input notes only and
     * the header says the check was skipped. The checks the generator needs to
     * decide something still run (the label colours, the pin, the control
     * veils), so a pinned or overridden theme costs more than a plain one. The
     * tokens and the CSS body are the same either way. For per-request use,
     * memoise on the options (the saving is the whole call) and run the check
     * in CI.
     */
    check?: boolean;
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
     * What the dark primary and danger fills are. `'brand'` (the default) is
     * what the library does: the same steps as light (600, 700, 800) with a
     * white label, so the main action keeps its colour in dark, and nothing
     * extra is written. `'mirror'` restores the 8.1 behaviour: under the dark
     * selectors the primary is the mirrored `--color-brand-600 | 700 | 800`
     * (pale steps in dark), danger the mirrored `--color-error-600 | 700 | 800`,
     * the label is chosen by the contrast check, and the control veil is the
     * lighten-heavy 22% / 6%. A `dark` or `both` override of any of these roles
     * wins over both settings. With `pin`, dark takes the pinned colour only
     * when no guarded pair fails with it, and otherwise keeps what this option
     * gives.
     */
    darkPrimary?: 'brand' | 'mirror';
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
     * dark keeps the mirrored ramp step, as it does without `pin`. `dark`
     * changes that: `'auto'` (the default) is that rule, `'force'` takes the
     * colour in dark whatever fails (the failures are in `warnings` and in
     * `pinned.<name>.dark.failed`), `'ramp'` never takes it, and
     * `'fill'` takes only the fill: `--color-action-primary`, `-hover` and `-active`
     * (`--color-accent*` for the accent) get light's values when the fill reaches
     * 3:1 on dark's page and card, and nothing else is checked for that decision.
     * The primary tints, focus ring, link and accent text stay as dark has them
     * without `pin`. The dark label is the light one if it reaches 4.5:1 on the
     * three fills, otherwise the other candidate. When the fill is under 3:1 dark
     * keeps the ramp and `pinned.<name>.dark.failed` names the pairs. The control
     * veil is still settled for contrast and may flip in dark. Read
     * `pinned.<name>.dark.pinned` and `.failed` to see what happened.
     *
     * A pair that fails with the pinned colour is reported in `warnings`. The
     * colour is never moved to make it pass, unless you ask: `{ brand: 'nearest-aa' }`
     * pins `accessibleBrand(brand).hex` instead, the nearest fill (same hue) whose
     * label reaches 4.5:1 and which reaches 3:1 on the page and a card, in light and
     * in dark. A colour that already passes is pinned as given. The ramp is still
     * built from `brand`. `pinned.brand.requested` and `.adjusted` say what happened.
     *
     * `{ accent: true }` does the same for `--color-accent` and needs `accent`.
     * Omitted or `false`: the output is exactly what it is without the option.
     */
    pin?: boolean | { brand?: boolean | 'nearest-aa'; accent?: boolean; dark?: 'auto' | 'force' | 'ramp' | 'fill' };
}

/**
 * The brand is given as a colour, as a ramp, or as both. With `brandRamp` the
 * colour is optional (it defaults to the ramp's step 600).
 */
export type CreateThemeOptions = CreateThemeBaseOptions &
    (
        | {
              /**
               * The brand colour. Supplies hue and chroma for `--zabi-brand-50 … 950`:
               * primary actions, focus rings, links and brand tints. Required unless
               * `brandRamp` is given.
               */
              brand: HexColor;
              /** A ramp to use as given, instead of building one from `brand`. */
              brandRamp?: BrandRampInput;
          }
        | {
              /** With `brandRamp`: what `pin` pins and `closest` measures. Defaults to the ramp's step 600. */
              brand?: HexColor;
              /**
               * A stored brand ramp, all eleven steps, written as `--zabi-brand-50 … 950`
               * exactly as given (any hex form; written as lowercase `#rrggbb`). The label
               * colour, `pin` and the contrast check run against it. A missing step is a
               * TypeError. Get the library's own ramp for a colour from `generateBrandRamp`.
               */
              brandRamp: BrandRampInput;
          }
    );

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
    /** The pinned colour, as `#rrggbb`: the colour used, which is `requested` unless `adjusted`. */
    hex: string;
    /** Only with `pin.brand: 'nearest-aa'`: the colour that was asked for. */
    requested?: string;
    /** Only with `pin.brand: 'nearest-aa'`: whether `hex` is a different colour from `requested`. */
    adjusted?: boolean;
    light: {
        /** Role groups that took the colour besides the fill: `"focus ring"`, `"link"`, `"accent text"`. */
        followed: string[];
        /** Role groups left on the ramp, because the colour fails a guarded pair there. */
        onRamp: string[];
        /** Which way hover and pressed go from the fill. */
        states: 'darker' | 'lighter';
    };
    dark: {
        /**
         * False when dark keeps the ramp: the colour fails there (`pin.dark: 'auto'`), the
         * fill is under 3:1 (`'fill'`) or `pin.dark` is `'ramp'`. With `'force'` it is true even when pairs fail.
         */
        pinned: boolean;
        /** Set for `pin.dark: 'force'`, `'ramp'` and `'fill'`; absent for `'auto'`. */
        policy?: 'force' | 'ramp' | 'fill';
        followed: string[];
        onRamp: string[];
        states?: 'darker' | 'lighter';
        /**
         * Not pinned: the pairs that would fail with the colour (act on this).
         * `'force'`: the pairs that fail in dark because of the colour; absent when none.
         * `'fill'`, not pinned: the fill's pairs that are under 3:1.
         */
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
     * `neutralChroma`, `darkPrimary: 'mirror'` or `light` / `dark` overrides, two more rules follow, with the dark values of those roles:
     * `.dark, [data-theme="dark"] { … }` and the same declarations for
     * `[data-theme="auto"]` inside `@media (prefers-color-scheme: dark)`.
     */
    css: string;
    /** Every declaration of the `:root` rule, name to value, in output order. */
    tokens: Record<string, string>;
    /** Only with `pin`, `neutralChroma`, `darkPrimary: 'mirror'` or `light` / `dark` overrides: every declaration of the dark rules. */
    darkTokens?: Record<string, string>;
    /**
     * The label colour as `#rrggbb` (lowercase) that the page computes in each
     * mode with these tokens: `--color-on-brand`, and `--color-on-accent` when
     * `accent` was given. `tokens['--zabi-on-brand']` can be `var(--zabi-brand-950)`;
     * this is that resolved. Always present, also without `pin` and with `check: false`.
     */
    labels: { light: { brand: string; accent?: string }; dark: { brand: string; accent?: string } };
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
 * @throws {TypeError} when neither `brand` nor `brandRamp` is given, `brandRamp` lacks a step, `pin.dark` is not `'auto'`, `'force'`, `'ramp'` or `'fill'`, `pin.brand` is not a boolean or `'nearest-aa'`, a colour is not a hex value, `neutralChroma` is not a number from 0 to 0.1 or is given without `neutral`, or `darkPrimary` is not `'brand'` or `'mirror'`.
 */
export function createTheme(options: CreateThemeOptions): CreateThemeResult;
export default createTheme;

/** The steps of a chromatic ramp: 50, 100 … 900, 950. */
export const RAMP_STEPS: number[];
/** The 21 steps of the neutral ramp, half steps included. */
export const BASE_STEPS: number[];

export { generateBrandRamp, closestStep, getContrastRatio, readableOn, meetsAA, brandContrast, accessibleBrand } from './color.js';
export type { BrandRamp, RampStep, BrandContrast, ModeReport, AccessibleBrand } from './color.js';
