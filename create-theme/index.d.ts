/** A hex colour: `#rgb` or `#rrggbb`, with or without the `#`. */
export type HexColor = string;

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
     * Extra declarations written after the ramps, for example
     * `{ "--color-link": "var(--color-brand-800)" }`. They apply in light and in
     * dark, and take part in the contrast check and in the choice of the "on"
     * colours.
     */
    overrides?: Record<string, string>;
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
    /** The stylesheet: a header comment and one `:root { … }` rule. */
    css: string;
    /** Every declaration in `css`, name to value, in output order. */
    tokens: Record<string, string>;
    /** Contrast failures and input notes. Empty when everything passes. */
    warnings: ThemeWarning[];
    closest: { brand: ClosestStep; accent?: ClosestStep; neutral?: ClosestStep };
}

/**
 * Builds the ramps for a brand on the library's lightness curve and checks
 * every guarded role pair in light and dark. Deterministic: the same options
 * give the same bytes.
 *
 * @throws {TypeError} when `brand` is missing or a colour is not a hex value.
 */
export function createTheme(options: CreateThemeOptions): CreateThemeResult;
export default createTheme;

/** The steps of a chromatic ramp: 50, 100 … 900, 950. */
export const RAMP_STEPS: number[];
/** The 21 steps of the neutral ramp, half steps included. */
export const BASE_STEPS: number[];
