import type { ClosestStep, HexColor } from './index.js';

/** The chromatic ramp's steps. */
export type RampStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** A chromatic ramp: every step as lowercase `#rrggbb`. */
export type BrandRamp = Record<RampStep, string>;

/**
 * The ramp createTheme builds for `brand`, the same values as
 * `--zabi-brand-<step>`. Accepts `#rgb` or `#rrggbb`. The colour supplies hue
 * and chroma; it is not pinned to a step.
 *
 * @throws {TypeError} when `brand` is not a hex colour.
 */
export function generateBrandRamp(brand: HexColor): BrandRamp;

/** Which step of `ramp` is nearest `hex` (CIELAB), as createTheme reports in `closest`. */
export function closestStep(hex: HexColor, ramp: Record<string | number, string>): ClosestStep;

/**
 * WCAG 2.x contrast ratio, 1 to 21. Rounded to two decimals by default, for
 * display (2.996 reads 3); do not compare that with a threshold. With
 * `{ exact: true }` it is unrounded, for pass/fail checks. Order does not
 * matter. Opaque colours only.
 */
export function getContrastRatio(a: HexColor, b: HexColor, options?: { exact?: boolean }): number;

/**
 * The label createTheme chooses for a solid fill: `#ffffff` if it reaches 4.5:1
 * on `fill`, otherwise `darkEnd` (default the library's near-black `#09090b`),
 * and if neither reaches 4.5:1 the one with more contrast.
 */
export function readableOn(fill: HexColor, darkEnd?: HexColor): string;

/** Whether `ratio` meets WCAG AA: 4.5 for `'text'`, 3 for `'ui'`. Pass an exact ratio (`getContrastRatio(a, b, { exact: true })`). */
export function meetsAA(ratio: number, kind: 'text' | 'ui'): boolean;

/** What a pinned brand colour does in one mode, as createTheme writes it. */
export interface ModeReport {
    /** The label createTheme chooses for the fill with its hover and pressed states: `#ffffff` or the ramp's step 950. */
    label: string;
    /** `--color-action-primary-hover` and `-active` as createTheme writes them. */
    states: { hover: string; active: string };
    /** Which way the states go from the fill. */
    direction: 'darker' | 'lighter';
    /** Contrast ratios to two decimals: the label on each fill, and the fill on the page and on a card. */
    ratios: { label: { fill: number; hover: number; active: number }; page: number; card: number };
    passes: {
        /** The label reaches 4.5:1 on the fill, hover and pressed. */
        text: boolean;
        /** The fill reaches 3:1 on the page and on a card. */
        ui: boolean;
    };
    /** Light: always true. Dark: whether createTheme (`pin.dark: 'auto'`) takes the colour there; when false this describes the colour as it would be. */
    pinned: boolean;
}

export interface BrandContrast {
    /** The colour, as lowercase `#rrggbb`. */
    hex: string;
    /** Both modes pass (`text` and `ui`) and dark takes the colour. */
    passes: boolean;
    light: ModeReport;
    dark: ModeReport;
}

/**
 * What `createTheme({ brand: hex, pin: true })` does with `hex`, without
 * building a theme: label, states, ratios and pass/fail per mode. `ramp` is a
 * stored brand ramp (default: the ramp of `hex`); its step 950 is the label's
 * dark end.
 *
 * @throws {TypeError} when `hex` is not a hex colour or `ramp` lacks a step.
 */
export function brandContrast(hex: HexColor, options?: { ramp?: BrandRamp }): BrandContrast;

export interface AccessibleBrand extends BrandContrast {
    /** The nearest passing fill; the input, lowercased, when it already passes. */
    hex: string;
    /** The colour asked for, as lowercase `#rrggbb`. */
    requested: string;
    /** Whether `hex` differs from `requested`. */
    changed: boolean;
    /** False when nothing within the search passes: `hex` is then the best effort and `passes` is false. */
    found: boolean;
}

/**
 * The nearest fill that passes in the given modes: the same OKLCH hue at the
 * nearest lightness (the darker on a tie), chroma reduced only as far as sRGB
 * needs. `createTheme({ brand, pin: { brand: 'nearest-aa' } })` pins this colour.
 * Pass the ramp built from the colour you were given as `ramp` if you store one.
 *
 * @throws {TypeError} when `hex` is not a hex colour, `ramp` lacks a step or `modes` names another mode.
 */
export function accessibleBrand(hex: HexColor, options?: { ramp?: BrandRamp; modes?: ('light' | 'dark')[] }): AccessibleBrand;
