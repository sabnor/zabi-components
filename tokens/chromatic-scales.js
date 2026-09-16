/**
 * Chromatic ramp generation for zabi-components.
 *
 * Every chromatic ramp (brand, citron, pine, iris, warning, error) is generated
 * against ONE shared lightness curve, so that `<ramp>-600` means the same
 * perceptual lightness in every ramp. That is what lets the semantic tokens
 * (success / warning / error / info / energetic / neutral) read as one family
 * instead of as six unrelated colours.
 *
 * Lightness is CIE L* (0 = black, 100 = white). Hue and chroma character are
 * taken from the ramp's own seed colours, so each ramp keeps its identity;
 * only the lightness is normalised.
 *
 * The `base` (neutral) ramp is deliberately NOT generated here — it lives in
 * `tokens/base-scale.js` and carries a wider range on purpose, because it also
 * drives text colours, borders and the surface elevation levels. Semantic
 * `neutral` is aliased to the base step whose L* matches the shared curve
 * (see NEUTRAL_ALIAS_STEP below).
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

/** Tolerance used by scripts/check-ramp-lightness.js. */
export const LIGHTNESS_TOLERANCE = 1.5;

/** Max permitted L* gap between adjacent steps (catches ramp cliffs). */
export const MAX_STEP_DELTA = 15;

/**
 * Base (neutral) step whose L* is closest to TARGET_LIGHTNESS[600].
 * base-500 is #71717a at L* 47.9 — the neutral member of the semantic family.
 */
export const NEUTRAL_ALIAS_STEP = 550;

/**
 * Seed colours. Each ramp names the hue it should express and the peak chroma
 * it is allowed to reach. Hue is in OKLCH degrees; chroma is OKLCH chroma.
 *
 * `hueShift` lets warm ramps rotate slightly as they darken, which is what
 * keeps a yellow from turning into grey-brown mud at the dark end.
 */
export const RAMP_SEEDS = {
    // Periwinkle — the product's brand hue, from the original brand-600/700.
    brand: { hue: 274, peakChroma: 0.175, hueShift: -6 },
    // Citron — yellow-green accent, from the original citron-400.
    citron: { hue: 112, peakChroma: 0.135, hueShift: 0 },
    // Pine — deep blue-green, from the original pine-400/500.
    pine: { hue: 170, peakChroma: 0.115, hueShift: -6 },
    // Iris — muted violet, from the original iris-500/600.
    iris: { hue: 283, peakChroma: 0.115, hueShift: -2 },
    // Amber — warms from gold to bronze as it darkens, as the original did.
    warning: { hue: 82, peakChroma: 0.165, hueShift: -24 },
    // Red — from the original error-500/600.
    error: { hue: 24, peakChroma: 0.205, hueShift: 5 },
};

/**
 * Chroma envelope across the ramp, as a fraction of peakChroma.
 * Colour is most saturated in the middle and tapers at both ends, which is how
 * a ramp stays usable: near-white tints don't turn neon, near-black shades
 * don't turn muddy.
 */
const CHROMA_ENVELOPE = {
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

function cieL(color) {
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
function solveForCieL(targetL, chroma, hue) {
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

/** Generate one ramp as `{ step: '#rrggbb' }`. */
export function generateRamp(name) {
    const seed = RAMP_SEEDS[name];
    if (!seed) throw new Error(`Unknown ramp: ${name}`);
    const out = {};
    for (const step of RAMP_STEPS) {
        const t = (RAMP_STEPS.indexOf(step)) / (RAMP_STEPS.length - 1);
        const hue = (seed.hue + seed.hueShift * t + 360) % 360;
        const chroma = seed.peakChroma * CHROMA_ENVELOPE[step];
        const solved = solveForCieL(TARGET_LIGHTNESS[step], chroma, hue);
        out[step] = formatHex(toRgb(solved));
    }
    return out;
}

/** Generate every chromatic ramp. */
export function generateAllRamps() {
    return Object.fromEntries(
        Object.keys(RAMP_SEEDS).map((name) => [name, generateRamp(name)]),
    );
}

/** Measured CIE L* of a hex string — used by the guardrail scripts. */
export function measureLightness(hex) {
    return Math.round(cieL(hex) * 10) / 10;
}

/** `--zabi-<name>-<step>: <hex>;` lines for a ramp. */
export function formatRampLines(name, ramp, indent = '  ') {
    return RAMP_STEPS.map((step) => `${indent}--zabi-${name}-${step}: ${ramp[step]};`).join('\n');
}

/** `--color-<name>-<step>: var(--zabi-<name>-<step>);` aliases (light, 1:1). */
export function formatLightAliasLines(name, indent = '  ') {
    return RAMP_STEPS.map(
        (step) => `${indent}--color-${name}-${step}: var(--zabi-${name}-${step});`,
    ).join('\n');
}

/** `--color-<name>-<step>: var(--zabi-<name>-<1000 - step>);` mirror (dark). */
export function formatDarkMirrorLines(name, indent = '  ') {
    return RAMP_STEPS.map(
        (step) => `${indent}--color-${name}-${step}: var(--zabi-${name}-${1000 - step});`,
    ).join('\n');
}

export { toOklch };
