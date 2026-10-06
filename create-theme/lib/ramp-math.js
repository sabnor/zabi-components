/**
 * The maths behind every chromatic ramp: one shared lightness curve, one
 * chroma envelope, and a solver that lands a hue and chroma on a CIE L*.
 *
 * It lives here, not in tokens/, because the theme generator ships it: this
 * directory is copied into dist/create-theme/ and runs under plain Node in an
 * app's project. tokens/chromatic-scales.js imports it for the library's own
 * ramps, so the library and a generated brand cannot drift onto two curves.
 *
 * Runtime dependency: culori.
 */

import { converter, formatHex, inGamut } from 'culori';

const toLab = converter('lab');
const toOklch = converter('oklch');
const toRgb = converter('rgb');
const rgbInGamut = inGamut('rgb');

export const RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * The shared lightness curve, in CIE L*.
 *
 * Step 600 sits at L* 47, which is the darkest a fill can be while still
 * reading as "coloured" and the lightest it can be while keeping >= 4.5:1
 * against white. Every semantic token resolves to step 600 in light mode
 * (and mirrors to step 400 in dark).
 */
export const TARGET_LIGHTNESS = {
    50: 97,
    100: 94,
    200: 88,
    300: 80,
    400: 70,
    500: 58,
    600: 47,
    700: 38,
    800: 29,
    900: 20,
    950: 12,
};

/**
 * Chroma envelope across the ramp, as a fraction of peakChroma.
 * Colour is most saturated in the middle and tapers at both ends, which is how
 * a ramp stays usable: near-white tints don't turn neon, near-black shades
 * don't turn muddy.
 */
export const CHROMA_ENVELOPE = {
    50: 0.08,
    100: 0.16,
    200: 0.32,
    300: 0.52,
    400: 0.74,
    500: 0.92,
    600: 1.0,
    700: 0.94,
    800: 0.82,
    900: 0.66,
    950: 0.48,
};

export function cieL(color) {
    return toLab(color).l;
}

/** Pull chroma down until the colour fits in sRGB, keeping L* and hue. */
function fitToGamut(oklchColor) {
    let { l, c, h } = oklchColor;
    if (rgbInGamut({ mode: 'oklch', l, c, h })) return { mode: 'oklch', l, c, h };
    let lo = 0;
    let hi = c;
    for (let i = 0; i < 40; i += 1) {
        const mid = (lo + hi) / 2;
        if (rgbInGamut({ mode: 'oklch', l, c: mid, h })) lo = mid;
        else hi = mid;
    }
    return { mode: 'oklch', l, c: lo, h };
}

/**
 * Solve for the OKLCH lightness that lands on a given CIE L*, at a fixed hue
 * and chroma. OKLCH L and CIE L* are both perceptual but not identical, so a
 * short bisection is the honest way to hit the target.
 */
export function solveForCieL(targetL, chroma, hue) {
    let lo = 0;
    let hi = 1;
    let best = { mode: 'oklch', l: 0.5, c: chroma, h: hue };
    for (let i = 0; i < 48; i += 1) {
        const mid = (lo + hi) / 2;
        const candidate = fitToGamut({ mode: 'oklch', l: mid, c: chroma, h: hue });
        const actual = cieL(candidate);
        best = candidate;
        if (Math.abs(actual - targetL) < 0.01) break;
        if (actual < targetL) lo = mid;
        else hi = mid;
    }
    return best;
}

/** The colour at one CIE L*, hue and chroma, as `#rrggbb`. */
export function hexAt(targetL, chroma, hue) {
    return formatHex(toRgb(solveForCieL(targetL, chroma, hue)));
}

/**
 * One ramp from a seed `{ hue, peakChroma, hueShift }`, as `{ step: '#rrggbb' }`.
 * Hue is in OKLCH degrees; `hueShift` rotates it linearly from step 50 to 950.
 */
export function generateRampFromSeed(seed) {
    const out = {};
    for (const step of RAMP_STEPS) {
        const t = (RAMP_STEPS.indexOf(step)) / (RAMP_STEPS.length - 1);
        const hue = (seed.hue + (seed.hueShift ?? 0) * t + 360) % 360;
        const chroma = seed.peakChroma * CHROMA_ENVELOPE[step];
        out[step] = hexAt(TARGET_LIGHTNESS[step], chroma, hue);
    }
    return out;
}

/** Measured CIE L* of a hex string, to one decimal. */
export function measureLightness(hex) {
    return Math.round(cieL(hex) * 10) / 10;
}

export { toOklch, toLab };
