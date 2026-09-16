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
 * The composite is baked to an opaque hex at build time rather than shipped as
 * `rgba()`. Flat colours keep the whole static toolchain working:
 * check-contrast.js can resolve every AA pair against a surface, and
 * check-surface-elevation.js can measure the steps. Opaque overlay surfaces
 * also mean a modal never lets the page bleed through it. The trade is that
 * nesting past the four levels is not automatic — a card inside a card does
 * not self-lighten; it picks the next level up by name.
 */

/** The dark page itself. Every level is this with the wash over it. */
export const DARK_BASE = '#18181b';

/** Same light as the dark hover tint, at surface strengths. */
export const WASH = '#fafafa';

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

/** The four dark surface levels, base first. */
export function generateSurfaceLadder() {
    const levels = { 'surface-base': DARK_BASE };
    for (const [name, alpha] of Object.entries(SURFACE_ALPHA)) {
        levels[name] = composite(DARK_BASE, WASH, alpha);
    }
    return levels;
}
