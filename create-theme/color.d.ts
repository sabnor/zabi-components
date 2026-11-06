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

/** WCAG 2.x contrast ratio, 1 to 21, to two decimals. Order does not matter. Opaque colours only. */
export function getContrastRatio(a: HexColor, b: HexColor): number;

/**
 * The label createTheme chooses for a solid fill: `#ffffff` if it reaches 4.5:1
 * on `fill`, otherwise `darkEnd` (default the library's near-black `#09090b`),
 * and if neither reaches 4.5:1 the one with more contrast.
 */
export function readableOn(fill: HexColor, darkEnd?: HexColor): string;

/** Whether `ratio` meets WCAG AA: 4.5 for `'text'`, 3 for `'ui'`. */
export function meetsAA(ratio: number, kind: 'text' | 'ui'): boolean;
