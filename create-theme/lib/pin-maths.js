/**
 * The maths createTheme's pin uses to derive a pinned fill's states and to
 * choose its label, kept apart from the theme data so that the public helpers
 * (../color.js: brandContrast, accessibleBrand) run exactly the same rules.
 * createTheme imports these too; there is no second copy to drift.
 *
 * Runtime dependency: culori (through ./ramp-math.js).
 */

import { TARGET_LIGHTNESS, hexAt } from './ramp-math.js';

export const WHITE = '#ffffff';
/** What a label on a solid fill needs against it (WCAG 1.4.3). */
export const LABEL_MIN = 4.5;

/**
 * A pinned colour is the fill; its hover and pressed states and one deeper
 * step are the same hue and chroma moved along L* by the distances the curve
 * puts between steps 600, 700, 800 and 900 in light (darker), and between
 * 400, 300, 200 and 100 in dark (lighter).
 */
export const SHADE_STEPS = {
    light: [700, 800, 900].map((step) => TARGET_LIGHTNESS[step] - TARGET_LIGHTNESS[600]),
    dark: [300, 200, 100].map((step) => TARGET_LIGHTNESS[step] - TARGET_LIGHTNESS[400]),
};
/** No shade is asked to go past these: there is nothing darker or lighter to show. */
const MIN_SHADE_L = 4;
const MAX_SHADE_L = 98;

/**
 * [hover, pressed, deeper] for a pinned fill, going `darker` or `lighter`, or
 * null when the pressed step would leave the range: a colour that near black
 * has nothing darker to show. `colour` is `{ lightness (CIE L*), chroma, hue }`.
 */
export function shades(colour, mode, direction) {
    const sign = direction === 'darker' ? -1 : 1;
    const steps = SHADE_STEPS[mode].map((step) => sign * Math.abs(step));
    const pressed = colour.lightness + steps[1];
    if (pressed < MIN_SHADE_L || pressed > MAX_SHADE_L) return null;
    return steps.map((step) =>
        hexAt(Math.min(MAX_SHADE_L, Math.max(MIN_SHADE_L, colour.lightness + step)), colour.chroma, colour.hue),
    );
}

/** The library's own direction first: darker in light, lighter in dark. */
export const SHADE_DIRECTIONS = { light: ['darker', 'lighter'], dark: ['lighter', 'darker'] };

/**
 * Which state recipe a mode uses. The brand's dark fill is the light recipe
 * (the same steps, darker states) unless it is mirrored; the accent's dark
 * fill is still the pale step.
 */
export const shadeRecipe = (name, mode, darkPrimary = 'brand') =>
    mode === 'dark' && name === 'brand' && darkPrimary === 'brand' ? 'light' : mode;

/**
 * The label candidates in the order they are tried: white first, except the
 * accent in dark, whose fill is the light step so its dark end goes first.
 * White first for the brand in both modes: the library's dark primary is the
 * same mid step as light. A pale dark primary (an app's own override, or
 * darkPrimary: 'mirror') fails white and keeps the ramp's dark end.
 */
export function labelCandidates(name, mode, darkEnd) {
    return mode === 'dark' && name === 'accent' ? [darkEnd, WHITE] : [WHITE, darkEnd];
}

/**
 * The first candidate whose worst ratio reaches 4.5:1; if none does, the one
 * with the best worst ratio (the earlier on a tie). `ratiosOf(candidate)` is
 * the candidate's ratio on each fill the label has to carry.
 */
export function pickLabel(candidates, ratiosOf) {
    let best = null;
    for (const candidate of candidates) {
        const worst = Math.min(...ratiosOf(candidate));
        if (worst >= LABEL_MIN) return candidate;
        if (!best || worst > best.worst) best = { candidate, worst };
    }
    return best.candidate;
}
