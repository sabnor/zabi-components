/**
 * What createTheme's pin decides for a brand colour, computed without the
 * theme data: the direction of the hover and pressed states, the label, and
 * whether dark takes the colour. pinColour (../index.js) decides these by
 * checking every guarded pair of the default theme; the pairs a pinned fill
 * can change are the short list in ./default-surfaces.js, and the rest fail
 * or pass the same with and without the pin, so they never change an answer.
 * The state maths and the label rule are shared with pinColour
 * (./pin-maths.js); the surfaces are held to the theme data by a test.
 *
 * Runtime dependency: culori.
 */

import { contrastExact } from './wcag.js';
import { describe } from './brand-ramp.js';
import { SHADE_DIRECTIONS, shades, shadeRecipe, labelCandidates, pickLabel } from './pin-maths.js';
import { DEFAULT_SURFACES, PINNED_FILL_PAIRS } from './default-surfaces.js';

/** The label for a fill and its two states, as chooseOn picks it. */
function labelFor(mode, ramp, fills) {
    return pickLabel(labelCandidates('brand', mode, ramp[950]), (label) => fills.map((fill) => contrastExact(label, fill)));
}

/** Names of the guarded pairs that fail for a fill, its states and a label. */
function failingPairs(mode, { fill, hover, active }, label) {
    const against = { ...DEFAULT_SURFACES[mode], label };
    const colours = { fill, hover, active };
    const failed = new Set();
    for (const [name, which, other, min] of PINNED_FILL_PAIRS) {
        if (contrastExact(colours[which], against[other]) < min) failed.add(name);
    }
    return failed;
}

/** The fill with the states of the direction that fails fewest pairs, the first on a tie, as bestFill does. */
function bestFill(mode, colour, ramp) {
    let best = null;
    for (const direction of SHADE_DIRECTIONS[shadeRecipe('brand', mode)]) {
        const states = shades(colour, shadeRecipe('brand', mode), direction);
        if (!states) continue;
        const set = { fill: colour.hex, hover: states[0], active: states[1] };
        const label = labelFor(mode, ramp, Object.values(set));
        const failed = failingPairs(mode, set, label);
        if (!best || failed.size < best.failed.size) best = { direction, set, label, failed };
    }
    return best;
}

/**
 * What a pinned brand `hex` becomes in each mode: `{ light, dark }`, each
 * `{ direction, fill, hover, active, label, pinned }`. `ramp` is the brand
 * ramp of the theme (its steps 600, 700, 800 are what dark keeps when it does
 * not take the colour, and its 950 is the label's dark end). Light always
 * takes the colour; dark does when no pair fails with it that does not fail
 * with the ramp's step too (pin.dark 'auto').
 */
export function pinnedFill(hex, ramp) {
    const colour = describe(hex);
    const light = bestFill('light', colour, ramp);
    const dark = bestFill('dark', colour, ramp);
    const library = { fill: ramp[600], hover: ramp[700], active: ramp[800] };
    const unpinned = failingPairs('dark', library, labelFor('dark', ramp, Object.values(library)));
    const pinned = [...dark.failed].every((pair) => unpinned.has(pair));
    const shape = (best, isPinned) => ({ direction: best.direction, ...best.set, label: best.label, pinned: isPinned });
    return { light: shape(light, true), dark: shape(dark, pinned) };
}
