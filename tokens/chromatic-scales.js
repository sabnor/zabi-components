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

import {
    RAMP_STEPS,
    TARGET_LIGHTNESS,
    generateRampFromSeed,
    measureLightness,
    toOklch,
} from '../create-theme/lib/ramp-math.js';

// The curve, the chroma envelope and the solver live in
// create-theme/lib/ramp-math.js, because the theme generator ships them to
// apps. They are re-exported here so the library's scripts keep one import.
export { RAMP_STEPS, TARGET_LIGHTNESS, measureLightness };

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
    citron: { hue: 124, peakChroma: 0.16, hueShift: 0 },
    // Pine — deep blue-green, from the original pine-400/500.
    pine: { hue: 160, peakChroma: 0.14, hueShift: -6 },
    // Iris — muted violet, from the original iris-500/600.
    iris: { hue: 283, peakChroma: 0.115, hueShift: -2 },
    // Amber — warms from gold to bronze as it darkens, as the original did.
    warning: { hue: 72, peakChroma: 0.18, hueShift: -12 },
    // Red — from the original error-500/600.
    error: { hue: 24, peakChroma: 0.205, hueShift: 5 },
};

/** Generate one ramp as `{ step: '#rrggbb' }`. */
export function generateRamp(name) {
    const seed = RAMP_SEEDS[name];
    if (!seed) throw new Error(`Unknown ramp: ${name}`);
    return generateRampFromSeed(seed);
}

/** Generate every chromatic ramp. */
export function generateAllRamps() {
    return Object.fromEntries(
        Object.keys(RAMP_SEEDS).map((name) => [name, generateRamp(name)]),
    );
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
