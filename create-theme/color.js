/**
 * Colour helpers an app can use without building a whole theme, so that what
 * it stores and previews is exactly what createTheme writes.
 *
 *   import { generateBrandRamp, getContrastRatio, readableOn } from 'zabi-components/color';
 *
 * Also exported by name from `zabi-components/create-theme`. Pure functions;
 * runtime dependency: culori, for the ramp (its lightness is solved in OKLCH).
 * The theme data and the contrast pair list are not loaded.
 */

import { toLab } from './lib/ramp-math.js';
import { parseHex, describe, chromaticRamp } from './lib/brand-ramp.js';
import { contrast } from './lib/wcag.js';

/** The label colours the theme chooses between: white, or the ramp's dark end. */
const WHITE = '#ffffff';
/** The library's near-black, the dark end of its neutral ramp (`--zabi-base-950`). */
const NEAR_BLACK = '#09090b';

/** What text needs (WCAG 1.4.3) and what UI parts and focus rings need (1.4.11). */
const AA = { text: 4.5, ui: 3 };

/**
 * The ramp createTheme builds for `brand`: `{ 50, 100 … 900, 950 }`, each
 * `#rrggbb` in lowercase, the same values as `--zabi-brand-<step>`. Accepts
 * `#rgb` or `#rrggbb`. The colour supplies hue and chroma; it is not pinned to
 * a step.
 *
 * @throws {TypeError} when `brand` is not a hex colour.
 */
export function generateBrandRamp(brand) {
    return chromaticRamp(describe(parseHex(brand, 'brand')));
}

/**
 * Which step of `ramp` is nearest `hex` (CIELAB distance), as createTheme
 * reports in `closest`: `{ step, hex, deltaE, exact }`, deltaE to one decimal.
 * `ramp` maps steps to `#rrggbb`, as generateBrandRamp returns.
 */
export function closestStep(hex, ramp) {
    const target = parseHex(hex, 'hex');
    let best = null;
    for (const [step, value] of Object.entries(ramp)) {
        const [x, y] = [toLab(target), toLab(value)];
        const distance = Math.hypot(x.l - y.l, x.a - y.a, x.b - y.b);
        if (!best || distance < best.deltaE) best = { step: Number(step), hex: value, deltaE: distance };
    }
    return { ...best, deltaE: Math.round(best.deltaE * 10) / 10, exact: best.hex === target };
}

/**
 * The WCAG 2.x contrast ratio of two colours (`#rgb` or `#rrggbb`), 1 to 21,
 * rounded to two decimals, the figure the library's contrast guard compares.
 * Order does not matter. Opaque colours only.
 */
export function getContrastRatio(a, b) {
    return contrast(parseHex(a, 'a'), parseHex(b, 'b'));
}

/**
 * The label colour createTheme chooses for a solid fill: white if it reaches
 * 4.5:1 on the fill, otherwise the dark end (`darkEnd`, default the library's
 * near-black `#09090b`; pass a ramp's step 950 to match a theme), and if
 * neither reaches 4.5:1 the one with more contrast. Returns `#rrggbb`. A theme
 * applies the same rule to a fill together with its hover and pressed states,
 * so a label chosen for one fill can differ from the theme's choice for the
 * set.
 */
export function readableOn(fill, darkEnd = NEAR_BLACK) {
    const base = parseHex(fill, 'fill');
    const dark = parseHex(darkEnd, 'darkEnd');
    const white = contrast(WHITE, base);
    if (white >= AA.text) return WHITE;
    return contrast(dark, base) > white ? dark : WHITE;
}

/**
 * Whether a ratio meets WCAG AA: 4.5 for `'text'`, 3 for `'ui'` (UI parts,
 * focus rings, large text).
 *
 * @throws {TypeError} when `kind` is neither.
 */
export function meetsAA(ratio, kind) {
    if (!(kind in AA)) throw new TypeError(`zabi-theme: meetsAA kind must be "text" or "ui" (got ${JSON.stringify(kind)})`);
    return ratio >= AA[kind];
}
