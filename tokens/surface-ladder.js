/**
 * Dark-mode surface elevation, derived rather than hand-picked.
 *
 * Shadows don't read on a dark page, so elevation has to come from lightness.
 * The four levels used to be four independently tuned hex values that happened
 * to sit ~6 OKLCH lightness points apart; nothing tied them together, so
 * retuning one meant re-eyeballing the rest.
 *
 * They are now one rule: a single wash colour laid over the page at increasing
 * opacity, so each level is literally the level below with more light on it.
 *
 * The wash is #fafafa because that is already the dark interaction tint
 * (`--color-surface-hover` is `rgba(250, 250, 250, 0.08)`) — the same light,
 * applied at different strengths, whether it is a surface or a hover.
 *
 * The ladder ships as `color-mix()` over the neutral ramp, not as baked hex:
 * the page is `--zabi-base-900` and the wash is `--zabi-base-50`, so an app
 * that overrides `--zabi-base-*` (warm greys, a tinted neutral) gets its own
 * four dark levels with no further tokens. `color-mix(in srgb, wash p%, page)`
 * of two opaque colours is the same arithmetic as the source-over composite
 * below, so the default theme still resolves to the hex it always had
 * (#18181b, #262629, #363638, #454547) and an overlay stays opaque.
 *
 * The static toolchain evaluates the mix itself (scripts/resolve-tokens.js):
 * check-contrast.js still resolves every AA pair against a surface, and
 * check-surface-elevation.js still measures the steps. The trade is unchanged:
 * nesting past the four levels is not automatic — a card inside a card does
 * not self-lighten; it picks the next level up by name.
 */

import { FIXED_LIGHT_SCALE } from './base-scale.js';

/** The neutral step that is the dark page. Every level is this with the wash over it. */
export const DARK_BASE_STEP = 900;

/** The neutral step used as the wash: the same light as the dark hover tint. */
export const WASH_STEP = 50;

/** Default values of those two steps, for the checks and the build log. */
export const DARK_BASE = FIXED_LIGHT_SCALE[DARK_BASE_STEP];
export const WASH = FIXED_LIGHT_SCALE[WASH_STEP];

/**
 * Opacity per level, solved so each step lands ~6 OKLCH lightness points above
 * the last (L 21 → 27 → 33 → 39). check-surface-elevation.js requires every
 * step to fall between 5 and 8 points, so these are not free parameters —
 * re-solve them if the base or the wash changes.
 */
export const SURFACE_ALPHA = {
    'surface-raised': 0.064,
    'surface-elevated': 0.131,
    'surface-overlay': 0.197,
};

function parseHex(hex) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function toHex(channels) {
    return '#' + channels.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');
}

/** Source-over composite of `wash` at `alpha` onto `base`, both opaque. */
export function composite(base, wash, alpha) {
    const b = parseHex(base);
    const w = parseHex(wash);
    return toHex(b.map((channel, i) => channel * (1 - alpha) + w[i] * alpha));
}

/**
 * The four dark surface levels as flat hex, base first.
 *
 * Pass another neutral scale (`{ 50: '#…', 900: '#…' }`) to get the levels an
 * overridden `--zabi-base-*` produces; the default is the library's own greys.
 */
export function generateSurfaceLadder(scale = FIXED_LIGHT_SCALE) {
    const base = scale[DARK_BASE_STEP];
    const wash = scale[WASH_STEP];
    const levels = { 'surface-base': base };
    for (const [name, alpha] of Object.entries(SURFACE_ALPHA)) {
        levels[name] = composite(base, wash, alpha);
    }
    return levels;
}

/** `0.064` → `6.4%`, without floating-point noise (0.131 × 100 is 13.100000000000001). */
function percent(alpha) {
    return `${Number((alpha * 100).toFixed(4))}%`;
}

/**
 * The same four levels as the CSS that ships: the page aliases its ramp step,
 * and each level above it mixes the wash step into the page step.
 */
export function generateSurfaceLadderCss(prefix = '--zabi-base-') {
    const base = `var(${prefix}${DARK_BASE_STEP})`;
    const wash = `var(${prefix}${WASH_STEP})`;
    const levels = { 'surface-base': base };
    for (const [name, alpha] of Object.entries(SURFACE_ALPHA)) {
        levels[name] = `color-mix(in srgb, ${wash} ${percent(alpha)}, ${base})`;
    }
    return levels;
}
